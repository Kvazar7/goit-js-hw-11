import axios from "axios";

const SERCH_URL = 'https://pixabay.com/api/';
const API_KEY = '33569562-dd32e440d8f662096afc537ab'

export default class SERCH {
    constructor() {
        this.page = 1;
    }
    async responseToRequest(inputValue) {
        try {
            const responce = await axios.get(
                `${SERCH_URL}/?key=${API_KEY}&q=${inputValue}&per_page=40&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`);
            console.log(responce.data);
            return responce.data
        }
        catch (error) {
            console.log(error);
        }
    }
}