const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const LIMIT = 10;
const miStorage = window.localStorage;
let pagination = 0; //null;

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        var template = '<article class="Card">' +
        '<img src="'+product.images[0]+'" /> ' +
        '<h2> ' +
        product.title +
        '  <small>$ '+ product.price.toString() +'</small>' +
        '</h2>' +
        '</article>'
        return template;
      });
      
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output.join('');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

async function loadData(){
  //pagination = parseInt(miStorage.getItem('page'));
  //if (!pagination) {
    //pagination = 5;
  //}else{
    //pagination += 10;
  //}
  //console.log(pagination);
  await getData(API+'?offset='+pagination.toString()+'&limit='+LIMIT.toString());
  
  //miStorage.setItem('page', pagination);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  console.log('scroll',pagination);
  if (pagination == 190) {
    let newItem = document.createElement('section');
    newItem.classList.add('Item');
    newItem.innerHTML = 'Todos los productos Obtenidos';
    $app.appendChild(newItem);
    intersectionObserver.unobserve($observe);
  }
  pagination += 10;
  getData(API+'?offset='+pagination.toString()+'&limit='+LIMIT.toString());
  //miStorage.setItem('page', pagination);
  
}, {
  //root: document.querySelector('#Main'),
  rootMargin: '0px 0px 100% 0px',
  threshold: 1.0
});

intersectionObserver.observe($observe);
loadData();
