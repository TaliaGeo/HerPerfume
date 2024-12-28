$(document).ready(function () {
    
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
        price: parseFloat(productPrice),
        image: productImage
      });
    });
  });
  