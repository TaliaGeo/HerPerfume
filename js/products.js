$(document).ready(function () {
  const productGrid = $('#product-grid');
  const searchInput = $('#search-input');

 
  let products = [
    {
      id: 1,
      name: 'Chanel Chance Vibrant',
      description: 'Energizing citrus and subtle floral notes...',
      price: 180.0,
      image: '9.webp'
    },
    {
      id: 2,
      name: 'Flowerbomb Viktor & Rolf Delight',
      description: 'A sweet floral explosion with warm undertones...',
      price: 180.0,
      image: '4.webp'
    },
    {
      id: 3,
      name: 'Marc Jacobs Bloom',
      description: 'A fresh bouquet of daisies and garden blossoms...',
      price: 85.0,
      image: '5.webp'
    },
    {
      id: 4,
      name: 'Zara Oceanic Spirit',
      description: 'Refreshing aquatic breeze meets subtle woody undertones...',
      price: 380.0,
      image: '26.webp'
    },
    {
      id: 5,
      name: 'La vie est Belle Bold & Blue',
      description: 'Invigorating notes of the sea layered with a twist of musk.',
      price: 300.0,
      image: '3.webp'
    },
    {
      id: 6,
      name: 'Zara Midnight Fresh',
      description: 'Deep ocean currents with a crisp, late-night vibe...',
      price: 300.0,
      image: '46.jpeg'
    },
    {
      id: 7,
      name: 'Zara Ultimate Essence',
      description: 'A powerful blend of marine accords and earthy base notes...',
      price: 420.0,
      image: '37.webp'
    },
    {
      id: 8,
      name: 'Chanel Coco Twist',
      description: 'An iconic fragrance reimagined with modern hints of citrus and rosewood.',
      price: 320.0,
      image: '10.webp'
    },
    {
      id: 9,
      name: 'Coco Classic',
      description: 'Warm, sophisticated, and elegantly floral—a timeless go-to.',
      price: 220.0,
      image: '40.webp'
    },
    {
      id: 10,
      name: '2/1 Premium Blue',
      description: 'Rich marine essence combined with a smooth woody heart for a refined aura.',
      price: 380.0,
      image: '25.webp'
    },
    {
      id: 11,
      name: 'Coco Royal Spirit',
      description: 'Regal blend of fresh ocean air and light spices for a royal feel.',
      price: 280.0,
      image: '90.jpeg'
    },
    {
      id: 12,
      name: 'OLombia Aqua Vibe',
      description: 'Bright aquatic notes topped with citrus for a vibrant fragrance.',
      price: 290.0,
      image: '99.webp'
    },
    {
      id: 13,
      name: 'Zara Breeze',
      description: 'Laid-back summer vibes with saltwater and gentle green undertones.',
      price: 90.0,
      image: '30.jpeg'
    },
    {
      id: 14,
      name: 'Jadore Crisp Tone',
      description: 'Clean and crisp with understated floral hints—perfect for everyday freshness.',
      price: 80.0,
      image: '20.jpeg'
    },
    {
      id: 15,
      name: 'Zara Earthy Aromatic',
      description: 'Grounding herbal nuances and subtle oceanic hints.',
      price: 90.0,
      image: '22.jpeg'
    },
    {
      id: 16,
      name: 'Scandl Fresh Impact',
      description: 'A dynamic wave of aquatic freshness balanced with a woody base.',
      price: 180.0,
      image: '34.webp'
    }
  ];


  function renderProducts(productsList) {
    productGrid.empty(); 
    productsList.forEach((product) => {
      const productHTML = `
        <div class="product-item">
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <span>$${product.price}</span>
          <button
            class="btn add-to-cart"
            data-id="${product.id}"
            data-name="${product.name}"
            data-price="${product.price}"
            data-image="${product.image}"
          >
            Add to Cart
          </button>
          <div class="cart-alert"></div>
        </div>
      `;
      productGrid.append(productHTML);
    });

  
    $('.add-to-cart').off('click').on('click', function () {
      let productId    = $(this).data('id');
      let productName  = $(this).data('name');
      let productPrice = $(this).data('price');
      let productImage = $(this).data('image');

      const alertBox = $(this).siblings('.cart-alert');
      alertBox.text(`${productName} added to cart!`).fadeIn(300);
      setTimeout(() => {
        alertBox.fadeOut(300);
      }, 2000);

      $(document).trigger('itemAddedToCart', {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
      });
    });
  }

 
  renderProducts(products);

  
  searchInput.on('keyup', function () {
    const searchTerm = $(this).val().toLowerCase();

    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm)
    );


    renderProducts(filtered);
  });
});
