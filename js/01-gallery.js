import { galleryItems } from './gallery-items.js';
// Change code below this line



  
const gallery = document.querySelector('.gallery');
const galleryItemEls = document.querySelectorAll('.gallery__item');
const galleryImages = document.querySelectorAll('.gallery__image');

const createGalleryItemMarkup = ({ original, preview, description }) => {
  return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
    </a>
  </li>`;
};
const galleryItemsMarkup = galleryItems.map(createGalleryItemMarkup).join('');

gallery.insertAdjacentHTML('beforeend', galleryItemsMarkup);

gallery.addEventListener('click', event => {
  event.preventDefault();
  
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const originalUrl = event.target.dataset.source;
  const instance = basicLightbox.create(`
    <img src="${originalUrl}" width="800" height="600">
  `);

  instance.show();
});



// Додаємо обробник подій для кожного зображення в галереї
galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        // Отримуємо URL великого зображення з атрибуту 'data-source'
        const largeImageURL = image.dataset.source;

        // Створюємо модальне вікно з великим зображенням
        const modal = basicLightbox.create(`<img src="${largeImageURL}" alt="Image">`);

        // Відкриваємо модальне вікно
        modal.show();
    });
});

  

