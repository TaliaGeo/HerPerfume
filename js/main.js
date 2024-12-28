$(document).ready(function () {
 
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  function updateCartCount() {
    let totalQty = 0;
    cartItems.forEach(item => {
      totalQty += item.quantity;
    });
    $('#cart-count').text(totalQty);
  }
  updateCartCount();

  
  $(document).on('itemAddedToCart', function (e, productData) {
    
    addOrUpdateItem(productData);
    updateCartCount();
  });

  function addOrUpdateItem(newItem) {
    let existing = cartItems.find(i => i.id === newItem.id);
    let qtyToAdd = newItem.quantity ? newItem.quantity : 1; 
    if (existing) {
     
      existing.quantity += qtyToAdd;
    } else {
      cartItems.push({
        id: newItem.id,
        name: newItem.name,
        price: newItem.price,
        image: newItem.image,
        quantity: qtyToAdd
      });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }


  if ($('body').find('.cart-page').length > 0) {
    renderCartItems();
  }

  function renderCartItems() {
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const $cartTableBody = $('#cart-table tbody');
    const $cartTotal = $('#cart-total');

    $cartTableBody.empty();
    let totalPrice = 0;

    cartItems.forEach((item, idx) => {
      const itemSubtotal = item.price * item.quantity;
      totalPrice += itemSubtotal;

      const row = `
        <tr>
          <td>
            <img
              src="${item.image}"
              alt="${item.name}"
              style="width: 80px; border-radius: 4px;"
            />
          </td>
          <td>${item.name}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>
            <button class="btn qty-minus" data-index="${idx}">-</button>
            <span style="margin: 0 8px;">${item.quantity}</span>
            <button class="btn qty-plus" data-index="${idx}">+</button>
          </td>
          <td>$${itemSubtotal.toFixed(2)}</td>
          <td>
            <button class="btn remove-item" data-index="${idx}">Remove</button>
          </td>
        </tr>
      `;
      $cartTableBody.append(row);
    });

    $cartTotal.text(`Total: $${totalPrice.toFixed(2)}`);

    
    $('.qty-minus').off('click').on('click', function () {
      const i = $(this).data('index');
      if (cartItems[i].quantity > 1) {
        cartItems[i].quantity--;
      } else {
        cartItems.splice(i, 1);
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartCount();
      renderCartItems();
    });

    
    $('.qty-plus').off('click').on('click', function () {
      const i = $(this).data('index');
      cartItems[i].quantity++;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartCount();
      renderCartItems();
    });

    $('.remove-item').off('click').on('click', function () {
      const i = $(this).data('index');
      cartItems.splice(i, 1);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      updateCartCount();
      renderCartItems();
    });
  }

  
  $('#contact-form').on('submit', function (event) {
    event.preventDefault();

    const firstName = $('#firstName').val().trim();
    const lastName  = $('#lastName').val().trim();
    const email     = $('#email').val().trim();
    const mobile    = $('#mobile').val().trim();
    const address   = $('#address').val().trim();
    const age       = $('#age').val().trim();
    const country   = $('#country').val().trim();
    const message   = $('#message').val().trim();

    if (!firstName || !lastName || !email || !mobile ||
        !address   || !age     || !country || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    $('#form-feedback').text('Thank you for contacting us! We’ll respond soon.');
    $(this)[0].reset();
  });
});
