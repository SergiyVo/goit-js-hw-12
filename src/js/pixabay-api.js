<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Homework 12</title>
    <link rel="stylesheet" href="./css/styles.css" />
  </head>
  <body>
    <form class="search-images">
      <input
        type="text"
        class="query-images"
        name="query"
        placeholder="Search images..."
      />
      <button type="submit" class="btn-search">Search</button>
    </form>

    <ul class="gallery"></ul>

    <span class="loader hidden"></span>

    <div class="container-btn">
      <button
        type="button"
        class="btn-load js-btn-load hidden"
        data-action="load-more"
      >
        <span class="label">Load more</span>
      </button>
    </div>

    <script type="module" src="./main.js"></script>
  </body>
</html>



=================================main.js=====================================================================

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { renderGallery } from "./js/render-function";
import { refs } from "./js/refs";
import { getGallery } from "./js/pixabay-api";
import { scroll } from "./js/scroll";
import { hideLoader, showLoader } from "./js/show-hide-loader";
import { checkDataHitsLength, checkQuery } from "./js/notification";
import { checkLastPage } from "./js/last-page";

export let lightBox = new SimpleLightbox('.gallery-link', {
  captionsData: "alt",
  captionDelay: 500
});

export let page = 1;
export const per_page = 15;
export let query = '';
export let totalPages = 0;

refs.form.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault();

  page = 1;
  query = e.target.elements.query.value.trim();
    
  if (query === '') {
    checkQuery()      
    return;
  }

  refs.galleryList.innerHTML = '';
  
  showLoader()
  
  try {
    const data = await getGallery();
    totalPages = data.totalHits;
   
    if (data.hits.length === 0) {
      checkDataHitsLength()
      refs.loadElem.classList.add('hidden');
      e.target.reset();
      return
    } else {
      renderGallery(data);
      checkLastPage()
    }

  } catch (error) {
    console.log(error);
  }
  
  hideLoader()
  
  e.target.reset();
}

async function onBtnLoadMoreClick(e) {
  e.preventDefault();
  page += 1;
  
  showLoader()

  try {
    const data = await getGallery(query);
    
    renderGallery(data);
   
    hideLoader()
    
    checkLastPage()
    
  } catch (error) {
    console.log(error.message);
  }
    
  scroll()
}

=============================pixabay-api.js=========================================================================


import axios from 'axios';
import { page, per_page, query } from '../main';

export async function getGallery() {
    const BASE_URL = 'https://pixabay.com';
    const END_POINT = '/api/';
    
    const url = `${BASE_URL}${END_POINT}`;
     
    const response = await axios.get(url, {
        params: {
        key: "42112521-3ff4dfc201bab0977369cd2bc",
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',  
        page: page,
        per_page: per_page
        }
    });
       
    return response.data;
}
// fetch


=============================refs.js=========================================================================

export const refs = {
    form: document.querySelector('.search-images'),
    input: document.querySelector('.query-images'),
    galleryList: document.querySelector('.gallery'),
    loadElem: document.querySelector('.loader'),
    btnLoadMore: document.querySelector('.js-btn-load')
}




=============================render-function.js=========================================================================


import { lightBox } from "../main";
import { refs } from "./refs";

export function galleryTemplate(element) {
    const {largeImageURL, webformatURL, tags, likes, views, comments, downloads} = element;
    return `
   <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
      </a>
      <ul class="gallery-body">
        <li class="gallery-info">
          <h3>Likes:</h3>
          <p>${likes}</p>
        </li>
        <li class="gallery-info">
          <h3>Views:</h3>
          <p>${views}</p>
        </li>
        <li class="gallery-info">
          <h3>Comments:</h3>
          <p>${comments}</p>
        </li>
        <li class="gallery-info">
          <h3>Downloads:</h3>
          <p>${downloads}</p>
        </li>
      </ul>
    </li>`
}

export function renderGallery(elements) {
    const markup = elements.hits.map((element)=>{return galleryTemplate(element)})
        .join('\n');
       
    refs.galleryList.insertAdjacentHTML('beforeend', markup);
    
    lightBox.refresh();   
}


=============================render-function.js==============================================================


import { page, per_page, totalPages } from "../main";
import { checkIsLastPage } from "./notification";
import { refs } from "./refs";

export function checkLastPage() {
  
  const maxPage = Math.ceil(totalPages / per_page);
  
  const isLastPage = maxPage <= page;
  
  if (isLastPage) {
    refs.btnLoadMore.classList.add('hidden');
    checkIsLastPage()
  } else {
    refs.btnLoadMore.classList.remove('hidden');
  }
}

=============================notification.js==============================================================

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function checkQuery() {
    iziToast.show({
      message: 'Please enter a search query name!',
      messageColor: 'white',
      backgroundColor: 'red',
      position: 'topRight',
    });
}

export function checkDataHitsLength() {
    iziToast.show({
      message: 'Please enter a search query name!',
      messageColor: 'white',
      backgroundColor: 'red',
      position: 'topRight',
    });
} 

export function checkIsLastPage() {
    iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        messageColor: 'white',
        backgroundColor: 'red',
        position: 'topRight',
      });
}


=============================scroll.js==============================================================



export function scroll() {
  const elemImg = document.querySelector('.gallery-item');
  const heightScroll = elemImg.getBoundingClientRect().height;
  
  window.scrollBy({
    top: heightScroll * 2,
    behavior: "smooth"
  });
}


=============================show-hide-loader.js==============================================================


import { refs } from "./refs";

export function showLoader() {
  refs.loadElem.classList.remove('hidden');
  refs.btnLoadMore.classList.add('hidden');
}

export function hideLoader() {
  refs.loadElem.classList.add('hidden');
  refs.btnLoadMore.classList.remove('hidden');
}