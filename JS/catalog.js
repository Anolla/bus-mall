/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
// var cart = new Cart([]);

var carts = [];

var Cart = function (item, quantity) {
  this.item = item;
  this.quantity = quantity;
  carts.push(this);
}


// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
//TODO: Add an <option> tag inside the form's select for each product
function populateForm() {
  var selectElement = document.getElementById('items');
  for (var i =0; i < productsName.length; i++) {
    var dropDownMenu = document.createElement('option');
    selectElement.appendChild(dropDownMenu);
    dropDownMenu.textContent = productsName[i].split('.')[0];
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  // TODO: Prevent the page from reloading
  event.preventDefault();
  var itemSelected = event.target.items.value;
  var itemQuantity = event.target.quantity.value;
  var newCart = new Cart(itemSelected, itemQuantity);
  newCart.saveToLocalStorage();
  catalogForm.reset();
  newCart.submition();
  // Do all the things ...
  // addSelectedItemToCart();
  // cart.saveToLocalStorage();
  // updateCounter();
  // updateCartPreview();

}

Cart.prototype.submition = function () {
  var confirmationMessage = document.getElementById("cartContents");
  confirmationMessage.textContent =   '    successfully submitted  '
  var cartLink = document.createElement('a');
  confirmationMessage.appendChild(cartLink);
  cartLink.setAttribute('href', 'cart.html');
  cartLink.textContent = '   click to see your cart items'
  var ul = document.createElement ('ul');
  confirmationMessage.appendChild(ul);
  for (var j=0 ; j< carts.length ; j++) {
  var lis = document.createElement('li');
  ul.appendChild(lis);
  lis.textContent = ` you ordered ${carts[j].quantity} ${carts[j].item} ` ;
}
}



Cart.prototype.saveToLocalStorage = function () {
  var stringCarts = JSON.stringify(carts);
  localStorage.setItem('newItem', stringCarts);
}
// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() { }

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();