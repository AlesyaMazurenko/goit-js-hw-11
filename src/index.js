import ApiServicePixaby from './js/fetch';
import axios from "axios";
const refs = {
    searchInput: document.querySelector('input'),
    searchButton: document.querySelector('.get'),
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'), 
    btnLoad: document.querySelector('load-more')
};
const textSearch = "";

console.log(refs.searchForm);

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29288692-4de5473bca5fca6278995f222';
const API_Properties = 'image_type=photo&orientation=horizontal&safesearch=true'

async function getPicture() {
  try {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=cat&${API_Properties}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

//getPicture();

// const getPicture = async () => {
    
//     try {
//         const responce = await axios.get(`${BASE_URL}?key=${API_KEY}&q=cat&${API_Properties}`);
//         console.log(responce);
//     } catch (error) {
//         console.log(error);
//     }
// };

// const getPicture = () => {
//     fetch('https://pixabay.com/api/?key=29288692-4de5473bca5fca6278995f222&q=yellow')
//         .then((responce) => responce.json)
//         .then((data) => console.log(data))
//         .catch((error) => (console.log(error)));
    
// }
refs.searchButton.addEventListener("click", onSearchClick);

function onSearchClick(evt) {
    evt.preventDefault();

    textSearch = evt.currentTarget;
    console.log(textSearch);


   // getPicture);
}