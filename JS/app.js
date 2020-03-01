'use strict'
 
var productsName = [
    'bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dog-duck',
    'dragon',
    'pen',
    'pet-sweep',
    'scissors',
    'shark',
    'sweep',
    'tauntaun',
    'unicorn',
    'usb',
    'water-can',
    'wine-glass'
] ;

//(1) get the images
var leftImage = document.querySelector('#leftImage');
var rightImage = document.querySelector('#rightImage');
var middleImage= document.querySelector('#middleImage');
var imageSection = document.querySelector('#imagesSection');

//(2) add src,alt,title to the images to test if everything is working
leftImage.src = `Images/${productsName[0]}.jpg`;
leftImage.alt = productsName[0];
leftImage.title = productsName[0];

middleImage.setAttribute('src',`Images/${productsName[1]}.jpg`);
middleImage.setAttribute('alt',productsName[1]);
middleImage.setAttribute('title',productsName[1]);

rightImage.setAttribute('src',`Images/${productsName[2]}.jpg`);
rightImage.setAttribute('alt',productsName[2]);
rightImage.setAttribute('title',productsName[2]);


//(3_1) create constructor function for the goats
function Photo(name) {
    this.name = name;
    this.clicks = 0;
    this.views = 0;
    this.imagePath = `Images/${this.name}.jpg`;
    Photo.all.push(this);
  }
  Photo.all =[];

  //(3_2) instantiate objects for all the goats one shot
for(var i =0; i<productsName.length; i++) {
    new Photo(productsName[i]);
  }

  //(4) render 2 random images
var leftProduct, rightProduct, middleProduct;
function render () {
   leftProduct = Photo.all[randomNumber(0,Photo.all.length-1)];
  console.log(leftProduct);
  middleProduct = Photo.all[randomNumber(0,Photo.all.length-1)];
  console.log(middleProduct);
   rightProduct = Photo.all[randomNumber(0,Photo.all.length-1)];
  console.log(rightProduct);
 

  leftImage.setAttribute('src',leftProduct.imagePath);
  leftImage.setAttribute('alt',leftProduct.name);
  leftImage.setAttribute('title',leftProduct.name);
  
  middleImage.setAttribute('src',middleProduct.imagePath);
  middleImage.setAttribute('alt',middleProduct.name);
  middleImage.setAttribute('title',middleProduct.name);

  rightImage.setAttribute('src',rightProduct.imagePath);
  rightImage.setAttribute('alt',rightProduct.name);
  rightImage.setAttribute('title',rightProduct.name);


  if(leftImage.src === rightImage.src|| rightImage.src === middleImage.src || middleImage.src===leftImage.src ) {
    render () ;

 }


}

render ();


//(5) add the event listener to render new images
imageSection.addEventListener('click',trackClicksOnPhoto);
var totalClicks =0;
function trackClicksOnPhoto(event) {
  if(totalClicks <25 ) {
    if(event.target.id !== 'imagesSection') {
      if(event.target.id === 'leftImage') {
        leftProduct.clicks++;
    } else if(event.target.id === 'middleImage') {
        middleProduct.clicks++; }
     else if(event.target.id === 'rightImage') {
      rightProduct.clicks++;}
        

      
      totalClicks++;
      leftProduct.views++;
      middleProduct.views++;
      rightProduct.views++;

      render();
    }
  }  else {
    console.log('more than 25 clicks');
    imageSection.removeEventListener('click',trackClicksOnPhoto);
    render2();
  }
}

function render2() {
    var ulE1 = document.getElementById('summary');
    for (var i =0; i<Photo.all.length ; i++) {
      var liE1 = document.createElement('li');
      liE1.textContent = `${Photo.all[i].name} has ${Photo.all[i].clicks} clicks and ${Photo.all[i].views} views`;
      ulE1.appendChild(liE1);
    }
  }

//   function render3() {
// for ( i=0 ; i< products.length ; i++) {
// for ( j=0 ; j<products.length ; j++) {
    

    



//helper functions
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }





