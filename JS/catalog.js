/* global Product, Cart */

'use strict';

var cartForm = document.getElementById('catalog');
var quntityNumber = document.getElementById('quantity');
// Set up an empty cart for use on this page.
// var cart = new Cart([]);
function Cart(name, quantity) {

    this.name = name;
    this.quantity = quantity;
    Cart.all.push(this);
}
Cart.all = [];


// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

    //TODO: Add an <option> tag inside the form's select for each product
    var myItem = document.getElementById('items');
    for (var i = 0; i < productsName.length; i++) {
        var userOptions = document.createElement('option');
        myItem.appendChild(userOptions);
        userOptions.textContent = productsName[i].split(".", 1);
    }
}


Cart.prototype.renderCart = function() {
    var CartAlert = document.getElementById('cartA');
    var h3E1 = document.createElement('h3');
    CartAlert.appendChild(h3E1);
    h3E1.textContent = "your carts are ready";
    var cartUrl = document.createElement('a');
    cartUrl.setAttribute('href', 'cart.html');
    cartUrl.textContent = 'Cart Page';
    h3E1.appendChild(cartUrl);

};
// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
var cartForm = document.getElementById('catalog');
cartForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    var name = event.target.items.value;
    var quantity = event.target.quantity.value;
    var newCart = new Cart(name, quantity);
    document.getElementById("cartA").innerHTML = "";
    updateChart();
    cartForm.reset();
    newCart.renderCart();
    // TODO: Prevent the page from reloading
    // Do all the things ...
    // addSelectedItemToCart();
    // cart.saveToLocalStorage();
    // updateCounter();
    // updateCartPreview();
}

function updateChart() {
    var itemsPurches = JSON.stringify(Cart.all);
    // console.log(newCart);
    localStorage.setItem('newItem', itemsPurches);
}

populateForm();