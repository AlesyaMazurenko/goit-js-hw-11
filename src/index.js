import ApiServicePixaby from './js/fetch';
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchInput: document.querySelector('input'),
    searchButton: document.querySelector('.get'),
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'), 
    btnLoad: document.querySelector('.load-more'),
};

let textSearch = "";
let totalHits = '';

console.log(refs.btnLoad);

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29288692-4de5473bca5fca6278995f222';
const API_Properties = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
let page_counter = 1;


async function getPicture(textSearch) {
 try {
      const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${textSearch}&${API_Properties}`);
      console.log(response.data);
      return response.data;
  } catch (error) {
    Notify.failure('Error finding, please try later');
  }
}

refs.searchInput.addEventListener('input', onSearchInput);
refs.searchButton.addEventListener("click", onSearchClick);

async function onSearchClick(evt) {
    evt.preventDefault();
    refs.gallery.innerHTML = '';

    textSearch = refs.searchInput.value;//.trim();
    console.log(textSearch);

    try {
        const responce = await getPicture(textSearch);

        if (responce.totalHits === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        } else {
            Notify.info(`Hooray! We found ${responce.totalHits} images.`);
            refs.btnLoad.classList.remove('is-hidden');
            console.log(responce.hits);
            markupImages(responce.hits);
        }
    } catch (error) {
        console.log(error);  
    } 
}

function onSearchInput() {
    refs.gallery.innerHTML = '';
    page_counter = 1;
    refs.btnLoad.classList.add('is-hidden');

}

/*В ответе будет массив изображений удовлетворивших критериям параметров запроса. Каждое изображение описывается объектом, из которого тебе интересны только следующие свойства:

webformatURL - ссылка на маленькое изображение для списка карточек.
largeImageURL - ссылка на большое изображение.
tags - строка с описанием изображения. Подойдет для атрибута alt.
likes - количество лайков.
views - количество просмотров.
comments - количество комментариев.
downloads - количество загрузок.*/

function markupImages(images) {
    const markup = images.map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `<div class="photo-card">
  <a class="image-link" href="${largeImageURL}">  
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes </b>${likes}
    </p>
    <p class="info-item">
      <b>Views </b>${views}
    </p>
    <p class="info-item">
      <b>Comments </b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads </b>${downloads}
    </p>
  </div>
</div>`;
        }
    ).join('');

    refs.gallery.insertAdjacentHTML("beforeend", markup);
    //lightboxGallery.refrech();

}