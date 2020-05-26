//Заносим данные в массив
const galleryList = [{
    id: 1,
    pathPhoto: `photos/gallery/cat1.jpg`
},{
  id: 2,
  pathPhoto: `photos/gallery/cat2.jpg`
},{
  id: 3,
  pathPhoto: `photos/gallery/cat3.jpg`
},{
  id: 4,
  pathPhoto: `photos/gallery/cat4.jpg`
},{
  id: 5,
  pathPhoto: `photos/gallery/cat5.jpg`
},{
  id: 6,
  pathPhoto: `photos/gallery/cat6.jpg`
},{
  id: 7,
  pathPhoto: `photos/gallery/cat7.jpg`
},{
  id: 8,
  pathPhoto: `photos/gallery/cat8.jpg`
},{
  id: 4,
  pathPhoto: `photos/gallery/cat4.jpg`
},{
  id: 5,
  pathPhoto: `photos/gallery/cat5.jpg`
},{
  id: 6,
  pathPhoto: `photos/gallery/cat6.jpg`
},{
  id: 7,
  pathPhoto: `photos/gallery/cat7.jpg`
},{
  id: 8,
  pathPhoto: `photos/gallery/cat8.jpg`
}];


//отрисовываем картинки 
class galleryPhoto{
    constructor(id, pathPhoto) {
    this.id = id;
    this.pathPhoto = pathPhoto;
}
    getInner(){
        return ` <li><img id = "${this.id}" class = "page-block__gallery_photo photo" src="${this.pathPhoto}"
               alt= "Аватар"/></li>`

    }
    draw(){
        const galleryImg = document.getElementsByClassName('page-block__gallery_images')[0];
        galleryImg.innerHTML += this.getInner();
    }
  }

const galleryPhotoObjs = [];

galleryList.forEach((el) => {
    const gallery = new galleryPhoto(el.id, el.pathPhoto);
    gallery.draw();
    galleryPhotoObjs.push(gallery);
});

const getgallery = (id) => {
    for (ph of galleryPhotoObjs){
        if (ph.id == id)
            return ph;
    }
}

const modal = document.getElementById("my_modal");


// получаем все карточки по классу
const personsCollection = document.querySelectorAll('.photo');

//пробегаемся по всем и каждому даем клик  
personsCollection.forEach((el) => {

    el.addEventListener('click', (ev) => {
        
        const gallery = getgallery(el.id);
        const modalPhoto = document.getElementById("modal__photo");  
        modalPhoto.src = gallery.pathPhoto;
        modal.style.display = "flex";

        });
});

const span = document.getElementsByClassName("modal__content_close")[0];
//закрытие картинки
span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



const modalPhoto = document.getElementById("modal__photo");
let to = -1;


function fRight() // Открытие следующей картинки(движение вправо)
{  
  if (to < galleryList.length-1)  to++ ;
   else
     to = 0;
       modalPhoto.src = galleryList[to].pathPhoto;
}
function fLeft() // Открытие предыдущей картинки(движение влево)
{     
  if (to > 0) to--;
    else
      to = galleryList.length-1;
      modalPhoto.src = galleryList[to].pathPhoto;         
}







//Добавляем фотографию в галлерею
function doSomethingWithTextBox()
{
  const textBox = document.getElementById('text_gallery').value;
  let index = galleryList[galleryList.length - 1].id;

  galleryList.push({id: index + 1, pathPhoto: textBox});

  const gallery = document.getElementById("gallery");
  let div = document.createElement('li');
  div.style.position = 'relative';
  div.innerHTML = `<img id="${index + 1}" class="page-block__gallery_photo photo" src="${textBox}" alt= "Аватар"/> <span style="position:absolute;left:0;top:0">6</span>`;
  gallery.appendChild(div);


}
  //Перебираем картинки и заносим в блок для перелистывания
 let i = 1;
  for(let li of carousel.querySelectorAll('li')) {
    li.style.position = 'relative';
    li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
    i++;
  }

if (document.documentElement.clientWidth > 540){

  /* конфигурация */
  let width = 150; // ширина картинки
  let count = 3; // видимое количество изображений


  let position = 0; // положение ленты прокрутки

  carousel.querySelector('.prev').onclick = function() {
    let list = carousel.querySelector('ul');
    let listElems = carousel.querySelectorAll('li');
    // сдвиг влево
    position += width * count;
    // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
    position = Math.min(position, 0)
    list.style.marginLeft = position + 'px';

  };

  carousel.querySelector('.next').onclick = function() {
    let list = carousel.querySelector('ul');
    let listElems = carousel.querySelectorAll('li');
    // сдвиг вправо
    position -= width * count;
    // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
    position = Math.max(position, -width * (listElems.length - count));
    list.style.marginLeft = position + 'px';
  };
} else {


  /* конфигурация */
  let width = 110; // ширина картинки
  let count = 4; // видимое количество изображений


  let position = 0; // положение ленты прокрутки

  carousel.querySelector('.prev').onclick = function() {
    let list = carousel.querySelector('ul');
    let listElems = carousel.querySelectorAll('li');
    // сдвиг влево
    position += width * count;
    // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
    position = Math.min(position, 0)
    list.style.marginLeft = position + 'px';

  };

  carousel.querySelector('.next').onclick = function() {
    let list = carousel.querySelector('ul');
    let listElems = carousel.querySelectorAll('li');
    // сдвиг вправо
    position -= width * count;
    // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
    position = Math.max(position, -width * (listElems.length - count));
    list.style.marginLeft = position + 'px';
}
}
