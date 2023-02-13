import './css/styles.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import SERCH from './js/request.js'

const input = document.querySelector('#search-form input');
const requestButton = document.querySelector('#search-form');
const loadMoretButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const serch = new SERCH

requestButton.addEventListener("submit", onSubmit);

function onSubmit(e) {
    e.preventDefault();
    const inputValue = input.value;
    console.log(inputValue);
    serch.responseToRequest(inputValue)
        .then((data) => {
            const images = data.hits;
            const quantity = data.totalHits;
            
            if (data.totalHits === 0) {
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                return 
            }
            else {
                Notiflix.Notify.success(`Hooray! We found ${quantity} images.`);
                console.log(images);
                return images.reduce((markup, image) =>
                    creatMarkUp(image) + markup, "");
            }
                
        })
        .then(updList);
    }

function creatMarkUp(image) {
    // console.log(image)
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
    gallery.innerHTML = "";
    if (markup !== undefined)
        gallery.innerHTML = markup;
        new SimpleLightbox('.gallery a').refresh();;
        loadMoretButton.classList.toggle('hide');
};
