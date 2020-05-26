define(['Base/Component', 'Model/GalleryModel', 'css!Carousel/style'], function (Component, GalleryModel) {
    'use strict';


    let galleryList = [];

    class Carousel extends Component {
        constructor(data){
            super(data);
            this.domain = data.domain;
            this.dataPerson = data.data;
            this.galleryModel = new GalleryModel(this.dataPerson.id, this.domain);
        }

        //<input class="page-block__gallery_text" type="text" id="text_gallery"/>
        //<img class="page-block__gallery_button" type="button" value="Добавить фотографию" src='https://xenforotest.ru/data/resource_icons/3/3796.jpg?1533422713' onclick="doSomethingWithTextBox()"/>
                            

        render() {
            return `
                    <div id="carousel" class = "page-block__carousel">
                        <button class="page-block__carousel_arrow prev">⇦</button>
                        <div class="page-block__gallery">
                            <form name="upload" enctype="multipart/form-data">
                                <input type="file" name="upload" id="uploadPhoto">
                            </form>
                            <ul id="gallery" class="page-block__gallery_images"></ul>
                        </div>
                        <button class="page-block__carousel_arrow next">⇨</button>
                    <div id="my_modal" class="modal">
                        <div class="modal__content">            
                            <input class="modal__content_prev" id="modal__prev" type="button" value="<">
                            <img class = "modal__content_photo" id="modal__photo" alt="Картинка"/>
                            <input class="modal__content_next" id="modal__next" type="button" value=">" >
                        </div>
                        <span class="modal__content_close modal__text_font">×</span>
                    </div>
                </div>
                `;
        }

        afterMount() {
            let galleryPromis = this.galleryModel.listPhoto(this.dataPerson.id);
            galleryPromis.then(data => {
                galleryList = data
                console.log(galleryList);
                this.gallery();
                this.galleryCore();
                this.modalShow();
                this.deleteClick();
            });
            this.uploadPhoto();
        }

        uploadPhoto(){
            let file = document.getElementById("uploadPhoto");
            let galleryUpload = this.galleryModel;
            let domainPhoto = this.domain;
            file.onchange = function() {
                let upload_file = file.files[0];
                let newPhoto = galleryUpload.photoUpload(upload_file);
                newPhoto.then(data => {
                    galleryList.push({id: data.id, pathPhoto: data.path});
                    const galleryImg = document.getElementsByClassName('page-block__gallery_images')[0];
                    galleryImg.innerHTML += ` <li><img id = "${data.id}" class = "page-block__gallery_photo photo" src="${domainPhoto + data.path}" alt= "Фотография"/></li>`;
                });
            }
        }
        

        gallery() {
            //const galleryPhotoObjs = [];
            galleryList.forEach((el) => {
                //const gallery = new galleryPhoto(el.id, el.pathPhoto);
                this.draw(el.id, el.pathPhoto);
                //galleryPhotoObjs.push(gallery);
            });

        }

        getInner(id, pathPhoto){
            return ` <li><img id = "${id}" class = "page-block__gallery_photo photo" src="${pathPhoto}"
                   alt= "Фотография"/> <div class="page-block__gallery_delete" id="delete_photo">x</div></li>`
    
        }

        deleteClick(){
            const photoDelete = document.querySelectorAll('.page-block__gallery_delete');

            photoDelete.forEach((el) => {
                el.addEventListener('click', (ev) => {
                        let res = this.galleryModel.photoDelete(el.previousElementSibling.id);
                        if(res != undefined){
                            const myNode = document.getElementsByClassName('page-block__gallery_images')[0];
                            myNode.innerHTML = '';
                            galleryList = galleryList.filter(function( obj ) {
                                return obj.id != el.previousElementSibling.id;
                            });
                            this.gallery();
                        }
                    });
            });
        }


        draw(id, pathPhoto){
            const galleryImg = document.getElementsByClassName('page-block__gallery_images')[0];
            galleryImg.innerHTML += this.getInner(id, pathPhoto);
        }

        galleryCore() {
              //Перебираем картинки и заносим в блок для перелистывания
            let i = 1;
            for(let li of carousel.querySelectorAll('li')) {
                li.style.position = 'relative';
                li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
                i++;
            }

            if (document.documentElement.clientWidth > 540){

                /* конфигурация */
                let width = 135; // ширина картинки
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

        }

        modalShow(id,pathPhoto){
            const modal = document.getElementById("my_modal");
            const photo = [];
            // получаем все карточки по классу
            const personsCollection = document.querySelectorAll('.photo');
            const modalPhoto = document.getElementById("modal__photo");

            let to = 0;
            personsCollection.forEach((item) => {
                photo.push({ id: item.id, src: item.src});
            });
            //пробегаемся по всем и каждому даем клик  
            personsCollection.forEach((el) => {
                el.addEventListener('click', (ev) => {
                    modalPhoto.src = ev.srcElement.src;
                    to = galleryList.findIndex(item => item.id == ev.srcElement.id);
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

            const next = document.getElementById("modal__next");
            const prev = document.getElementById("modal__prev");

            
            // Открытие следующей картинки(движение вправо)
            next.onclick = function (){
                if (to < galleryList.length-1)  to++ ;
                    else
                        to = 0;
                        modalPhoto.src = galleryList[to].pathPhoto;
            }
            prev.onclick = function (){ // Открытие предыдущей картинки(движение влево)    
                if (to > 0) to--;
                    else
                        to = galleryList.length-1;
                        modalPhoto.src = galleryList[to].pathPhoto;         
            }
        }
    }

    return Carousel;
});
