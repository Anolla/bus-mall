'use strict'
 
var productsName = [
  "bag.jpg",
  "banana.jpg",
  "bathroom.jpg",
  "boots.jpg",
  "breakfast.jpg",
  "bubblegum.jpg",
  "chair.jpg",
  "cthulhu.jpg",
  "dog-duck.jpg",
  "dragon.jpg",
  "pen.jpg",
  "pet-sweep.jpg",
  "scissors.jpg",
  "shark.jpg",
  "sweep.png",
  "tauntaun.jpg",
  "unicorn.jpg",
  "usb.gif",
  "water-can.jpg",
  "wine-glass.jpg",
] ;
var clicks = [];
var products = [];
var diff = [];
var howmanyviews=[];

//(1) get the images
var leftImage = document.querySelector('#leftImage');
var rightImage = document.querySelector('#rightImage');
var middleImage= document.querySelector('#middleImage');
var imageSection = document.querySelector('#imagesSection');

//(2) add src,alt,title to the images to test if everything is working
leftImage.src = `Images/${productsName[0]}`;
leftImage.alt = productsName[0];
leftImage.title = productsName[0];

middleImage.setAttribute('src',`Images/${productsName[1]}`);
middleImage.setAttribute('alt',productsName[1]);
middleImage.setAttribute('title',productsName[1]);

rightImage.setAttribute('src',`Images/${productsName[2]}`);
rightImage.setAttribute('alt',productsName[2]);
rightImage.setAttribute('title',productsName[2]);


//(3_1) create constructor function for the products
function Photo(name) {
    this.name = name;
    this.clicks = 0;
    this.views = 0;
    this.imagePath = `Images/${this.name}`;
    Photo.all.push(this);
  }
  Photo.all =[];
function updateChart() {
  var productString = JSON.stringify(Photo.all);
  localStorage.setItem('myChart', productString); }

  function getProducts() {
    var productString = localStorage.getItem('myChart');
    console.log(productString);
    if(productString) {
      Photo.all = JSON.parse(productString);
      console.log(Photo.all);
    render3(); }
     }




  //(3_2) instantiate objects for all the products one shot
for(var i =0; i<productsName.length; i++) {
    new Photo(productsName[i]);
  }

  //(4) render 3 random images
var leftProduct, rightProduct, middleProduct;
function render () {
   leftProduct = Photo.all[randomNumber(0,Photo.all.length-1)];
  console.log(leftProduct);
  middleProduct = Photo.all[randomNumber(0,Photo.all.length-1)];
  console.log(middleProduct);
   rightProduct = Photo.all[randomNumber(0,Photo.all.length-1)];
  console.log(rightProduct);
 




  if(leftProduct === rightProduct|| rightProduct=== middleProduct || middleProduct===leftProduct || diff.includes(leftProduct.imagePath) || diff.includes(middleProduct.imagePath) ||diff.includes(rightProduct.imagePath) ) {
    render () ; 
    // leftProduct = Photo.all[randomNumber(0,Photo.all.length-1)];
    // console.log(leftProduct);
    // middleProduct = Photo.all[randomNumber(0,Photo.all.length-1)];
    // console.log(middleProduct);
    //  rightProduct = Photo.all[randomNumber(0,Photo.all.length-1)];
    // console.log(rightProduct);
   }
    

  leftImage.setAttribute('src',leftProduct.imagePath);
  leftImage.setAttribute('alt',(leftProduct.name).split(".", 1));
  leftImage.setAttribute('title',(leftProduct.name).split(".", 1));
  
  middleImage.setAttribute('src',middleProduct.imagePath);
  middleImage.setAttribute('alt',(middleProduct.name).split(".", 1));
  middleImage.setAttribute('title',(middleProduct.name).split(".", 1));

  rightImage.setAttribute('src',rightProduct.imagePath);
  rightImage.setAttribute('alt',(rightProduct.name).split(".", 1));
  rightImage.setAttribute('title',(rightProduct.name).split(".", 1))


  if(leftProduct === rightProduct|| rightProduct=== middleProduct || middleProduct===leftProduct ) {
    render () ;

 }//conflict
    
  // var A = leftProduct;
  // var B= middleProduct;
  // var C=rightProduct

  // if (A === leftProduct && C === rightProduct && B ===middleProduct ) {
  //   console.log("khdbhcjd")
  // }

  diff[0]= leftProduct.imagePath;
  diff[1]= rightProduct.imagePath;
  diff[2]= middleProduct.imagePath;
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
    /////////////////////conflict
    render2();
  // render3();
    // render2();
  render3();
  // updateChart () ;
  }
}

function render2() {
    var ulE1 = document.getElementById('summary');
    for (var i =0; i<Photo.all.length ; i++) {
      var liE1 = document.createElement('li');
      Photo.all[i].name=(Photo.all[i].name).split(".")[0];
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

function editTheChart (){
 
for (var i=0 ; i< Photo.all.length ; i++)
{
  products.push(Photo.all[i].name);
  clicks.push(Photo.all[i].clicks);
  howmanyviews.push(Photo.all[i].views);

}
}

function render3() {
var ctx = document.getElementById('myChart').getContext('2d');
editTheChart ();
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productsName,
        datasets: [{
            label: '# of Votes',
            data: clicks,
            backgroundColor: [
                'rgba(200, 99, 132, 3)',
                'rgba(54, 162, 235, 3)',
                'rgba(82, 206, 86, 3)',
                'rgba(93, 192, 192, 3)',
                'rgba(342, 102, 255, 3)',
                'rgba(222, 94, 64, 3)',
                'rgba(423, 29, 132, 3)',
                'rgba(54, 45, 235, 3)',
                'rgba(255, 200, 86, 3)',
                'rgba(75,109, 192, 3)',
                'rgba(153, 34, 255, 3)',
                'rgba(53, 324, 64, 3)',
                'rgba(97, 99, 132, 3)',
                'rgba(54, 87, 235, 3)',
                'rgba(255, 65, 86, 3)',
                'rgba(75, 34, 192, 3)',
                'rgba(153, 96, 255, 3)',
                'rgba(90, 84, 64, 3)',
                'rgba(63, 36, 255,3)',
                'rgba(245, 95, 64, 3)'

                

            ],
            borderColor: [
                // 'rgba(255, 99, 132, 3)',
                // 'rgba(54, 162, 235, 3)',
                // 'rgba(255, 206, 86,3)',
                // 'rgba(75, 192, 192, 3)',
                // 'rgba(153, 102, 255, 3)',
                // 'rgba(255, 159, 64, 3)'
            ],
            borderWidth: 1
        },{
          label: '# of Views',
          data: howmanyviews ,
          backgroundColor: [
            'rgba(200, 99, 132, 3)',
            'rgba(54, 162, 235, 3)',
            'rgba(82, 206, 86, 3)',
            'rgba(93, 192, 192, 3)',
            'rgba(342, 102, 255, 3)',
            'rgba(222, 94, 64, 3)',
            'rgba(423, 29, 132, 3)',
            'rgba(54, 45, 235, 3)',
            'rgba(255, 200, 86, 3)',
            'rgba(75,109, 192, 3)',
            'rgba(153, 34, 255, 3)',
            'rgba(53, 324, 64, 3)',
            'rgba(97, 99, 132, 3)',
            'rgba(54, 87, 235, 3)',
            'rgba(255, 65, 86, 3)',
            'rgba(75, 34, 192, 3)',
            'rgba(153, 96, 255, 3)',
            'rgba(90, 84, 64, 3)',
            'rgba(63, 36, 255,3)',
            'rgba(245, 95, 64, 3)'

          ],
          borderColor: [
              // 'rgba(98, 99, 132, 3)',
              // 'rgba(54, 162, 235, 3)',
              // 'rgba(65, 206, 86,3)',
              // 'rgba(75, 192, 192, 3)',
              // 'rgba(153, 102, 255, 3)',
              // 'rgba(34, 159, 64, 3)'
          ],
          borderWidth: 1
      }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}



      
      
      // getProducts ();

     

