import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { renderGallery } from './js/render-functions';
import { refs } from './js/refs';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.loader-btn');


let page = 1;
let perPage = 15;
let searchQuery;
refs.loadBtn.style.display = 'none';
refs.loader.style.display = 'none';

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;
  gallery.innerHTML = '';
  searchQuery = refs.form.elements.search.value.trim();
  if (searchQuery === '') {
    iziToast.show({
      message: 'Please write search image',
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
    return;
  }

  refs.loader.style.display = 'inline-block';
  try {
    const { hits, totalHits } = await fetchImage(searchQuery, page);
    if (totalHits === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FAFAFB',
        backgroundColor: '#EF4040',
        position: 'topRight',
      });
      refs.loader.style.display = 'none'; 
      return;
    }
    renderGallery(hits);
    if (totalHits < perPage) {
      notification(); 
      refs.loadBtn.style.display = 'none';
    } else {
      refs.loadBtn.style.display = 'block'; 
    }
  } catch (error) {

    iziToast.show({
      message: `Sorry, ${error}`,
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  } finally {
    refs.form.reset();   
  }
});

loadBtn.addEventListener('click', async () => {
  page += 1;
  refs.loadBtn.style.display = 'block'; 
  refs.loader.style.display = 'inline-block'; 
  try {
    const { hits, totalHits } = await fetchImage(searchQuery, page);
    renderGallery(hits);
    scroll();
    if (perPage * page > totalHits) {
      notification();
    }
  } catch (error) {
    iziToast.show({
      message: `Sorry, ${error}`,
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'bottomCenter',
    });
    refs.loadBtn.style.display = 'none';
  } finally {
    refs.form.reset(); 
  }
});

async function fetchImage(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const searchParams = {
    key: '42093583-bfe36716eb3593f6644c471e3',
    q: searchQuery,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
  };

  const urlparams = new URLSearchParams(searchParams);
  const { data } = await axios.get(`${BASE_URL}${END_POINT}?${urlparams}`);
  return data;
}

function notification() {
  refs.loadBtn.style.display = 'none';
  refs.loader.style.display = 'none';
  iziToast.show({
    message: 'We are sorry, but you have reached the end of search results.',
    messageColor: '#FAFAFB',
    backgroundColor: '#1DB8F5',
    position: 'topRight',
  });
}

function scroll() {
  const listItem = document.querySelector('.gallery-item');
  const heightScroll = listItem.getBoundingClientRect().height * 2;
  window.scrollBy({
    top: heightScroll,
    left: 0,
    behavior: 'smooth',
  });
}