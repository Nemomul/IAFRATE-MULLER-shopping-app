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
        fetch('http://localhost:3000/sneakers')
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
        fetch('http://localhost:3000/sneakers')
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
        fetch('http://localhost:3000/sneakers')
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
        fetch('http://localhost:3000/sneakers')
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
      