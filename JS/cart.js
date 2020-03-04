'use strict';

var cartsNew = [];

function itemRestore() {

    cartsNew = JSON.parse(localStorage.getItem("newItem"));
    for (var i = 0; i < cartsNew.length; i++) {
        var newCat = new Cart(cartsNew[i].name, cartsNew[i].quantity);
        console.log(newCat);
    }
}

itemRestore();

function myFunction() {

}

var cartTable = document.getElementById('cart');
var tableHead = document.getElementById('head');





function tableRender() {

    for (var i = 0; i < cartsNew.length; i++) {
        var trE1 = document.createElement('tr')
        trE1.setAttribute('id', 'removeTr')
        cartTable.appendChild(trE1);
        trE1.textContent = "X";
        var tdE1 = document.createElement('td');
        trE1.appendChild(tdE1);
        tdE1.textContent = `${cartsNew[i].quantity }`;
        var tdE2 = document.createElement('td');
        trE1.appendChild(tdE2);
        tdE2.textContent = `${cartsNew[i].name }`;
    }
}
tableRender();

function tableRefresh() {
    var table2 = JSON.stringify(cartsNew);
    localStorage.setItem('mytable', table2);
    tableRender();
}
tableRefresh();

cartTable.addEventListener('click', deleteTrow);

function deleteTrow(event) {

    if (event.target.id == 'removeTr') {
        alert("you will remove the first cart!!");

        var x = document.getElementById('cart').deleteRow(1);
    }
}