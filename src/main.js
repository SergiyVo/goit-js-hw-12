import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { renderGallery } from './js/render-functions';
import { refs } from './js/refs';
import { fetchImage } from './js/pixabay-api';

let page = 1;
let perPage = 15;
let searchQuery;

refs.loadBtn.style.display = 'none';
refs.loader.style.display = 'none';

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;
  refs.loader.style.display = 'none';
  refs.gallery.innerHTML = '';
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

refs.loadBtn.addEventListener('click', async () => {
  page += 1;

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
  } 
});

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
