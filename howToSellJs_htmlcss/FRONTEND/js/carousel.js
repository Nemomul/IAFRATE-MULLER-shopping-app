const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const images = document.querySelectorAll('.carousel img');

let counter = 0;

nextBtn.addEventListener('click', () => {
  if (counter < images.length - 1) {
    images[counter].classList.remove('active');
    images[counter].classList.add('hidden');
    counter++;
    images[counter].classList.remove('hidden');
    images[counter].classList.add('active');
  } else {
    images[counter].classList.remove('active');
    images[counter].classList.add('hidden');
    counter = 0;
    images[counter].classList.remove('hidden');
    images[counter].classList.add('active');
  }
});

prevBtn.addEventListener('click', () => {
  if (counter > 0) {
    images[counter].classList.remove('active');
    images[counter].classList.add('hidden');
    counter--;
    images[counter].classList.remove('hidden');
    images[counter].classList.add('active');
  } else {
    images[counter].classList.remove('active');
    images[counter].classList.add('hidden');
    counter = images.length - 1;
    images[counter].classList.remove('hidden');
    images[counter].classList.add('active');
  }
});
