import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getGallery } from "./js/pixabay-api";
import { renderGallery } from "./js/render-functions";
import { refs } from "./js/render-functions";

refs.loader.style.display = 'none';

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();

    refs.gallery.innerHTML = '';
    refs.loader.style.display = 'flex';
    const query = e.target.elements.input.value.trim(); //Звертаємося до інпута
            
        getGallery(query).then(data => {
            if (data.hits.length === 0) {
                iziToast.show({
                    message: 'Sorry, there are no images matching your search query. Please, try again!',
                    messageColor: 'white',
                    backgroundColor: 'red',
                    position: 'topRight',
                });
            } else {
                renderGallery(data); // Відправляємо посильного на getGallery
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            refs.loader.style.display = 'none';  
        });
        
    e.target.reset();    
};


