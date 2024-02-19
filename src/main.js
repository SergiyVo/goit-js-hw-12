import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.loader-btn');


let page = 1;
let perPage = 15;
let searchQuery;
loadBtn.style.display = 'none';
loader.style.display = 'none';

form.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;
  loadBtn.style.display = 'none';
  gallery.innerHTML = '';
  searchQuery = form.elements.search.value.trim();
  if (searchQuery === '') {
    iziToast.show({
      message: 'Please write search image',
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
    return;
  }

  loader.style.display = 'inline-block';
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
      loader.style.display = 'none'; 
      return;
    }
    renderGallery(hits);
    if (totalHits < perPage) {
      notification();
    } else {
      loadBtn.style.display = 'block'; 
    }
  } catch (error) {
    iziToast.show({
      message: `Sorry, ${error}`,
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  } finally {
    form.reset();   
  }
});

loadBtn.addEventListener('click', async () => {
  page += 1;
  loadBtn.style.display = 'none';
  loader.style.display = 'inline-block'; 
  try {
    const { hits, totalHits } = await fetchImage(searchQuery, page);
    renderGallery(hits);
    scroll();
    if (perPage * page > totalHits) {
      loadBtn.style.display = 'block'; 
      notification();
    }
  } catch (error) {
    iziToast.show({
      message: `Sorry, ${error}`,
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'bottomCenter',
    });
  } finally {
    
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

function galleryTemplate(element) {   //Робимо розмітку, забираємо з інформації яка прийшла те що нам потрібно за допомогою деструкторизації
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = element;
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
 
export function renderGallery(images) {   // Візуалізуємо інформацію яку приніс посильний
    const markup = images.map(element => {
        return galleryTemplate(element)
    }).join('\n');       
    gallery.insertAdjacentHTML('beforeend', markup);

    new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
    });

    loader.style.display = 'none';
}

function notification() {
  iziToast.show({
    message: 'We are sorry, but you have reached the end of search results.',
    messageColor: '#FAFAFB',
    backgroundColor: '#1DB8F5',
    position: 'topRight',
  });
  loadBtn.style.display = 'none';
  loader.style.display = 'none';
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