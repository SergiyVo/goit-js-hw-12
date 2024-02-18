import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
    form: document.querySelector('.form'),
    gallery: document.querySelector('.gallery'),
    loader: document.querySelector('.loader')
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

export function renderGallery(elements) {   // Візуалізуємо інформацію яку приніс посильний
    const markup = elements.hits.map(element => {
        return galleryTemplate(element)
    }).join('\n');       
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
});
}