fetch('http://localhost:3000/sneakers')
  .then(response => response.json())
  .then(data => {
    data = data.sneakers
      const products = [...data.shoes, ...data.sweaters, ...data.jackets];
      shuffleArray(products); 
      displayCards(products);
  })
.catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));

function createCard(product) {
  const card = document.createElement('div');
  card.className = 'boite';
  
  const isShoe = product.type === 'shoe';
  const imgClass = isShoe ? 'img_carte shoe' : 'img_carte';

  const hasDiscount = product.reduction_as_number && product.reduction_as_number > 0;
  const discountedPrice = product.price - (product.price * product.reduction_as_number) ;
  const priceHTML = hasDiscount
      ? `<p class="prix_carte"><del>${product.price} €</del> <span class="reduced-price">${discountedPrice.toFixed(2)} €</span></p>`
      : `<p class="prix_carte">${product.price} €</p>`;

  card.innerHTML = `
      <div class="ctn_img">
        <img src="http://localhost:3000/img/${product.img_1}" class="${imgClass}" alt="${product.name}">
    </div>
    <div class="card-footer">
        <div class="box_text">
            <p class="titre_carte">${product.name}</p>
            ${priceHTML}
          </div>
          <div class="bouton_carte">
              <button class="bouton_panier" onclick="addToCart(event)">
                  <i class="mdi mdi-basket-plus-outline"></i>
                  Ajouter au panier
              </button>
              <button class="bouton" onclick="window.location.href='detail.html?productId=${product.id}'">
                  
                  <i class="mdi mdi-information-outline"></i>
                  Voir la fiche produit
                  
              </button>
          </div>
      </div>
  `;

  const imgElement = card.querySelector('.img_carte');
  imgElement.addEventListener('mouseover', () => {
      imgElement.src = `http://localhost:3000/img/${product.img_2}`;
  });
  imgElement.addEventListener('mouseout', () => {
      imgElement.src = `http://localhost:3000/img/${product.img_1}`;
  });

  return card;
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayCards(productsData) {
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = ''; 
  productsData.forEach(productData => {
    const card = createCard(productData);
    cardsContainer.appendChild(card);
  });
}

function filterByType(products, type) {
  if (type === 'all') {
    return products;
  }
  return products.filter(product => product.type === type);
}

document.getElementById('type').addEventListener('change', (event) => {
  const selectedType = event.target.value;
  fetch('BACKEND/data.json')
    .then(response => response.json())
    .then(data => {
      const products = [...data.shoes, ...data.sweaters, ...data.jackets];
      const filteredProducts = filterByType(products, selectedType);
      displayCards(filteredProducts);
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
});


function filterBySexe(products, sexe) {
  if (sexe === 'all') {
    return products;
  }
  return products.filter(product => product.sexe === sexe);
}

document.getElementById('sexe').addEventListener('change', (event) => {
  const selectedSexe = event.target.value;
  fetch('BACKEND/data.json')
    .then(response => response.json())
    .then(data => {
      const products = [...data.shoes, ...data.sweaters, ...data.jackets];
      const filteredProducts = filterBySexe(products, selectedSexe);
      displayCards(filteredProducts);
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
});


function filterByColor(products, colors) {
  if (colors === 'all') {
    return products;
  }
  return products.filter(product => product.colors === colors);
}

document.getElementById('color').addEventListener('change', (event) => {
  const selectedColor = event.target.value;
  fetch('BACKEND/data.json')
    .then(response => response.json())
    .then(data => {
      const products = [...data.shoes, ...data.sweaters, ...data.jackets];
      const filteredProducts = filterByColor(products, selectedColor);
      displayCards(filteredProducts);
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
});

function filterByAvailable(products, available) {
  if (available === 'all') {
    return products;
  }
  return products.filter(product => product.available === available);
}

document.getElementById('available').addEventListener('change', (event) => {
  const selectedAvailable = event.target.value;
  fetch('BACKEND/data.json')
    .then(response => response.json())
    .then(data => {
      const products = [...data.shoes, ...data.sweaters, ...data.jackets];
      const filteredProducts = filterByAvailable(products, selectedAvailable);
      displayCards(filteredProducts);
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
});


function applyFilters() {
  const selectedType = document.getElementById('type').value;
  const selectedSexe = document.getElementById('sexe').value;
  const selectedColor = document.getElementById('color').value;
  const selectedAvailable = document.getElementById('available').value;

  fetch('http://localhost:3000/sneakers')
    .then(response => response.json())
    .then(data => {
      data = data.sneakers
      let products = [...data.shoes, ...data.sweaters, ...data.jackets];
      products = filterByType(products, selectedType);
      products = filterBySexe(products, selectedSexe);
      products = filterByColor(products, selectedColor);
      products = filterByAvailable(products, selectedAvailable);
      displayCards(products);
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));
}

document.getElementById('type').addEventListener('change', applyFilters);
document.getElementById('sexe').addEventListener('change', applyFilters);
document.getElementById('color').addEventListener('change', applyFilters);
document.getElementById('available').addEventListener('change', applyFilters);

function addToCart(event) {
  const product = event.target.closest('.boite');
  const productImageSrc = product.querySelector('.img_carte').src;
  const productTitle = product.querySelector('.titre_carte').innerText;
  const productPrice = parseFloat(product.querySelector('.prix_carte').innerText);
  const productHasReduction = product.querySelector('.reduced-price') !== null;

  const produit = {
      image: productImageSrc,
      title: productTitle,
      price: productHasReduction ? parseFloat(product.querySelector('.reduced-price').innerText) : productPrice,
      quantity: 1
  };

  addToCartFromDetail(produit);
}