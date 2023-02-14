import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import LOADMORE from './js/loadmorebtn.js'
import SERCH from './js/serch.js'

const input = document.querySelector('#search-form input');
const requestButton = document.querySelector('#search-form');
const loadMoretButton = new LOADMORE('.load-more');
const gallery = document.querySelector('.gallery');
const serch = new SERCH;

let inputValue = "";

requestButton.addEventListener("submit", onSubmit);
loadMoretButton.button.addEventListener("click", onLoadMore);

async function onSubmit(e) {
    e.preventDefault();
    serch.resetQueryPage();
    loadMoretButton.hide();
    clearHtml();
    
    inputValue = input.value.trim();
    
    if (inputValue === '') {
      return ;
    }

    await serch.responseToRequest(inputValue)
        .then((data) => {
            let images = data.hits;
            let quantity = data.totalHits;
            
            if (quantity === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                loadMoretButton.hide();
                return 
            }

            if (images.length < 40) {
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
                loadMoretButton.hide();
                return images.reduce((markup, image) =>
                    creatMarkUp(image) + markup, "");
            }

            else {
                Notiflix.Notify.success(`Hooray! We found ${quantity} images.`);
                loadMoretButton.show();
                return images.reduce((markup, image) =>
                    creatMarkUp(image) + markup, "");
            }
        })
        .then(updList);
};
   
async function onLoadMore(e) {

    await serch.responseToRequest(inputValue)
        .then((data) => {
            const images = data.hits;
            const quantity = data.totalHits;
            
            if (quantity === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                return 
            }

            if (images.length < 40) {
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
                loadMoretButton.hide();
                return images.reduce((markup, image) =>
                    creatMarkUp(image) + markup, "");
            }

            else {
                Notiflix.Notify.success(`Hooray! We found ${quantity} images.`);
                return images.reduce((markup, image) =>
                    creatMarkUp(image) + markup, "");
            }
        })
        .then(updList);
};

function creatMarkUp(image) {
    return `<div class="photo-card">
            <a href="${image.webformatURL}">
            <img src="${image.largeImageURL}" alt="${image.tags}" loading="lazy" width="300" height="200"/>
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes: ${image.likes}</b>
                </p>
                <p class="info-item">
                    <b>Views: ${image.views}</b>
                </p>
                <p class="info-item">
                    <b>Comments: ${image.comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads: ${image.downloads}</b>
                </p>
            </div>
            </div>`
};

function updList(markup) {
    gallery.innerHTML += markup;
    new SimpleLightbox('.gallery a').refresh();
};

function clearHtml() {
  gallery.innerHTML = '';
}