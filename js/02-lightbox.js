import { galleryItems } from './gallery-items.js';
// Change code below this line
 
const gallery = document.querySelector('.gallery');

const galleryImages = document.querySelectorAll('.gallery__image');

const createGalleryItemMarkup = ({ original, preview, description }) => {
  return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
     <img class="gallery__image" src="${preview}" alt="${description}" />
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
  const instance = simpleLightbox.create(`
    <img src="${originalUrl}" width="800" height="600">
  `);

  instance.show();
  // додаємо прослуховувач події keydown для документа
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      instance.close(); // закриваємо модальне вікно
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  // додаємо флаг, який позначає, що відкрите модальне вікно
  let isModalOpen = true;

  // додаємо обробник події закриття модального вікна
  instance.element().addEventListener('click', event => {
    if (event.target.nodeName !== 'IMG') {
      isModalOpen = false;
      document.removeEventListener('keydown', handleKeyDown); // видаляємо прослуховувач події keydown
    }
  });
});


// Забороняємо перенаправлення користувача на іншу сторінку при кліку на посилання
const galleryLinks = document.querySelectorAll('.gallery__link');
galleryLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
  });
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

console.log(galleryItems);
