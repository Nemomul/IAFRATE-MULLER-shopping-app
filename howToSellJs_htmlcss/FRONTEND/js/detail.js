fetch('http://localhost:3000/sneakers')
  .then(response => response.json())
  .then(data => {
    data = data.sneakers
    console.log(data)
    const products = [...data.shoes, ...data.sweaters, ...data.jackets];
    const productId = getProductIdFromUrl();
    const product = products.find(p => p.id === parseInt(productId, 10));
    if (product) {
      displayProductDetails(product);
    } else {
      console.error('Product not found');
    }
  })
.catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));

function getProductIdFromUrl() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get('productId');
}

function displayProductDetails(product) {
  // Ajouter le titre du produit au conteneur du titre
  const titleContainer = document.getElementById('title-container');
  const titleElement = document.createElement('p');
  titleElement.textContent = product.name;
  titleElement.classList.add('titre-detail');
  titleContainer.appendChild(titleElement);

  

  // Afficher la description dans la div 'description'
  const descriptionContainer = document.getElementById('description');
  
  // Créer et ajouter la description du produit
  const productDescription = document.createElement('p');
  productDescription.textContent = product.description; // Utilisez la propriété 'description' de l'objet produit
  descriptionContainer.appendChild(productDescription);

  // Créer et ajouter la couleur du produit
  const productColor = document.createElement('p');
  productColor.textContent = 'Couleur: ' + product.colors; // Utilisez la propriété 'colors' de l'objet produit
  descriptionContainer.appendChild(productColor);

  const productCompo = document.createElement('p');
  productCompo.textContent = 'Composition: ' + product.compo; // Utilisez la propriété 'colors' de l'objet produit
  descriptionContainer.appendChild(productCompo);


  // Créer un conteneur pour les images
  const productContainer = document.createElement('div');
  productContainer.classList.add('product-container');
  const productContainerElement = document.getElementById('product-container');
  productContainerElement.appendChild(productContainer);

  // Créer un tableau avec les images du produit
  const images = [product.img_1, product.img_2, product.img_3].map(imgPath => imgPath);

  // Créer la div englobante
  const mainImageContainer = document.createElement('div');
  mainImageContainer.classList.add('main-image-container');

  // Afficher l'image principale
  const mainImageElement = document.createElement('img');
  mainImageElement.src =`http://localhost:3000/img/${images[0]}`;
  mainImageElement.classList.add('main-image');
  mainImageContainer.appendChild(mainImageElement);
  

  // Créer un conteneur pour les miniatures
  const thumbnailsContainer = document.createElement('div');
  thumbnailsContainer.style.display = 'flex';
  thumbnailsContainer.style.marginLeft= '615px';
  thumbnailsContainer.style.marginTop = '10px';

  // Créer et afficher les miniatures
  for (let i = 0; i < images.length; i++) {
    const thumbnailElement = document.createElement('img');
    thumbnailElement.classList.add('thumbnail');
    console.log(images[i])
    thumbnailElement.src = `http://localhost:3000/img/${images[i]}`;
    thumbnailElement.classList.add('thumbnail');
    thumbnailElement.style.cursor = 'pointer';
    thumbnailsContainer.appendChild(thumbnailElement);

    // Mettre à jour l'image principale lorsqu'on clique sur une miniature
    thumbnailElement.addEventListener('click', () => {
      mainImageElement.src = `http://localhost:3000/img/${images[i]}`;
    });
  }

  // Ajoutez les éléments mainImageContainer et thumbnailContainer au conteneur productContainer
  productContainer.appendChild(mainImageContainer);
  productContainer.appendChild(thumbnailsContainer);
  
  const buttonsContainer = document.getElementById("product-size-buttons");
  const shoeSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'];
  const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // différent le tableau de tailles en fonction du type de produit
  const sizes = product.type === 'shoes' ? shoeSizes : clothingSizes;

  let selectedButton = null;

  sizes.forEach((size) => {
    const button = document.createElement("button");
    button.textContent = size;
    button.addEventListener("click", () => {
      if (selectedButton !== null) {
        selectedButton.classList.remove("selected");
        
      }
      selectedButton = button;
      selectedButton.classList.add("selected");
    });
    buttonsContainer.appendChild(button);
  });
}

const plusButton = document.querySelector('.increment-button');
const minusButton = document.querySelector('.decrement-button');
const counterDisplay = document.querySelector('.cart-item-counter');

// Ajouter un écouteur d'événements au bouton '+'
plusButton.addEventListener('click', function() {
  let count = parseInt(counterDisplay.textContent);
  count++;
  counterDisplay.textContent = count;
});

// Ajouter un écouteur d'événements au bouton '-'
minusButton.addEventListener('click', function() {
  let count = parseInt(counterDisplay.textContent);
  if (count > 0) { // Assurer que le nombre ne descende pas en dessous de 0
    count--;
  }
  counterDisplay.textContent = count;
});