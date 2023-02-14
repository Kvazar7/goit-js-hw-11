import axios from "axios";

const SERCH_URL = 'https://pixabay.com/api/';
const API_KEY = '33569562-dd32e440d8f662096afc537ab'

export default class SERCH {
    constructor() {
    this.queryPage = 1;
    this.searchQuery = '';
    this.perPage = 40;
    this.lastSearchQuery = '';
    this.orientation = 'horizontal';
    this.image_type = 'photo';
    this.safesearch = true;
    }
    async responseToRequest(inputValue) {

        try {
            const responce = await axios.get(
                `${SERCH_URL}/?key=${API_KEY}&q=${inputValue}&per_page=${this.perPage}&page=${this.queryPage}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}`);
            console.log(responce.data);

            this.queryPage += 1;

            return responce.data
        }
        catch (error) {
            console.log(error)
        }
    }

    resetQueryPage() {
    this.queryPage = 1;
  }
};