define(['Base/Component', 'css!Avatar/Ava'], function (Component) {
    'use strict';

    class Ava extends Component {
        render() {
            return `
            <div class="user-ava">
                    <img class="user-ava__photo" src="" alt="Ава" />
                    <div class="user-ava__footer"></div>
                    <img class="user-ava__edit-icon" src="./images/pen.png" alt="edit icon" />
                </div>
            <div class="modal-overlay" id="modal-overlay">
            <img class="popup-ava__close-button close-button" id="close-button" title="Закрыть" alt="Кнопка закрыть"
                src="./images/close_x.png" />
        </div>
        <div class="popup-ava" id="popup-ava">
            <img class="popup-ava__photo" id="popup-ava__photo" src="" alt="Ава" />
        </div>
        <div class="edit-user-ava">
            <div class="edit-box">
                <img class="edit-box__image" src="" alt="" id="image">
                <div class="edit-box__input">
                <input class="edit-box__input_select-file" type="file" id="fileAva"/>
                <input class="edit-box__input_img-url" id="img-url" type="text"
                        placeholder="Введите директорию или URL картинки для загрузки" value="">
                </div>
            </div>
            <div class="box-settings">
                <div class="box-settings__sliders">
                    <div class="box-settings__slider">
                        <label for="grayscale">Оттенки серого</label>
                        <input class="box-settings__slider_width" type="range" min="0" max="100" value="0"
                            id="grayscale">
                    </div>
                    <div class="box-settings__slider">
                        <label for="contrast">Контраст</label>
                        <input class="box-settings__slider_width" type="range" min="50" max="200" value="100"
                            id="contrast">
                    </div>
                    <div class="box-settings__slider">
                        <label for="brightness">Яркость</label>
                        <input class="box-settings__slider_width" type="range" min="50" max="200" value="100"
                            id="brightness">
                    </div>
                    <div class="box-settings__slider">
                        <label for="sepia">Сепия</label>
                        <input class="box-settings__slider_width" type="range" min="0" max="100" value="0" id="sepia">
                    </div>
                    <div class="box-settings__slider">
                        <label for="saturate">Насыщенность</label>
                        <input class="box-settings__slider_width" type="range" min="0" max="200" value="100"
                            id="saturate">
                    </div>
                </div>
                <div class="edit-user-ava__buttons">
                    <button class="edit-user-ava__btn" id="reset" disabled>Сбросить</button>
                    <button class="edit-user-ava__btn edit-user-ava__btn_margin" id="save" disabled>Сохранить</button>
                </div>
            </div>
        </div>
            `;
        }

        afterMount() {
            this.getLinkToAva();
            this.clsBtn();
            this.modallAva();
            this.editAva();
            this.addAvaPhoto();
        }
        /*
             Получаем путь к фото данного пользователя и меняем все изображения
             Если картинки аватарки нету на сервере, то грузим локально
         */
        getLinkToAva() {
            let img = document.querySelector('#image'),
                avaPhoto = document.querySelector(".user-ava__photo"),
                pageHeaderImg = document.querySelector(".page-header__avatar_small");
            let pathToAvaUrl;
            let pathToAva = 'http://tensor-school.herokuapp.com';
            fetch('http://tensor-school.herokuapp.com/user/current', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    response.json().then(data => {
                        pathToAvaUrl = data.computed_data.photo_ref;
                        if (pathToAvaUrl != null && pathToAvaUrl != '' && pathToAvaUrl != 'null') {
                            // Меняем ссылку всех картинок на ссылку с сервера
                            pathToAva = pathToAva + pathToAvaUrl;
                            img.src = pathToAva;
                            avaPhoto.src = pathToAva;
                            pageHeaderImg.src = pathToAva;
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        addAvaPhoto() {
            let img = document.querySelector('#image'),
                fileAva = document.getElementById("fileAva"),
                avaPhoto = document.querySelector(".user-ava__photo"),
                pageHeaderImg = document.querySelector(".page-header__avatar_small");
            // headerMiniAva = document.querySelector(".header__mini-ava");
            fileAva.addEventListener('change', function () {
                img.src = URL.createObjectURL(fileAva.files[0]);
                fetch('http://tensor-school.herokuapp.com/user/upload_photo', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            "Content-Type": 'image/png'
                        },
                        body: fileAva.files[0]
                    }).then(
                        response => {
                            return response.json();
                        })
                    .catch((err) => {
                        console.log(err);
                    });
                avaPhoto.src = img.src;
                pageHeaderImg.src = img.src;
                img.style.display = "block";
                console.log(URL.createObjectURL(fileAva.files[0]));
            });
        }
        
        clsBtn() {
            let popupAva = document.querySelector("#popup-ava"),
                modalOverlay = document.querySelector("#modal-overlay"),
                closeButton = document.querySelector("#close-button"),
                editUserAva = document.querySelector(".edit-user-ava");

            // closeButton.addEventListener("click", function () {
            //     popupAva.style.display = "none";
            //     editUserAva.style.display = "none";
            //     modalOverlay.classList.toggle("closed");
            //     console.log("Закрыто")
            // });

            modalOverlay.addEventListener("click", function () {
                popupAva.style.display = "none";
                editUserAva.style.display = "none";
                modalOverlay.classList.toggle("closed");

            });

            // window.onclick = function (event) {
            //     if (event.target == modalOverlay) {
            //         popupAva.style.display = "none";
            //         editUserAva.style.display = "none";
            //         modalOverlay.classList.toggle("closed");
            //         console.log("Закрыто")
            //     }
            // };
        }

        // ------Модальное окно (Ава)------

        modallAva() {
            let popupAva = document.querySelector("#popup-ava"),
                modalOverlay = document.querySelector("#modal-overlay"),
                openButton = document.querySelector(".user-ava__photo"),
                popupAvaPhoto = document.querySelector(".popup-ava__photo");

            const img = document.querySelector('#image');

            modalOverlay.classList.toggle("closed");
            popupAva.style.display = "none";

            openButton.addEventListener("click", function () {
                popupAvaPhoto.style.filter = `
            grayscale(${grayscale.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            saturate(${saturate.value}%)
          `
                popupAvaPhoto.setAttribute('src', img.src);
                popupAva.style.display = "block";
                modalOverlay.classList.toggle("closed");
            });
        }

        //  ------Редактирование авы------

        editAva() {
            const grayscale = document.querySelector('#grayscale'),
                contrast = document.querySelector('#contrast'),
                brightness = document.querySelector('#brightness'),
                sepia = document.querySelector('#sepia'),
                saturate = document.querySelector('#saturate');

            const img = document.querySelector('#image'),
                reset = document.querySelector('#reset'),
                save = document.querySelector('#save'),
                imgUrl = document.querySelector('#img-url');

            let editUserAva = document.querySelector(".edit-user-ava"),
                editButton = document.querySelector(".user-ava__edit-icon"),
                avaPhotoSrc = document.querySelector(".user-ava__photo").getAttribute('src'),

                modalOverlay = document.querySelector("#modal-overlay"),
                avaPhoto = document.querySelector(".user-ava__photo"),
                popupAvaPhoto = document.querySelector(".popup-ava__photo"),
                pageHeaderImg = document.querySelector(".page-header__avatar_small");

            editUserAva.style.display = "none";

            img.src = avaPhotoSrc;

            editButton.addEventListener("click", function () {
                editUserAva.style.display = "grid";
                modalOverlay.classList.toggle("closed");
            });

            const defaults = {
                grayscale: 0,
                contrast: 100,
                brightness: 100,
                sepia: 0,
                saturate: 100
            }

            grayscale.addEventListener('input', updateFilterValue)
            contrast.addEventListener('input', updateFilterValue)
            brightness.addEventListener('input', updateFilterValue)
            sepia.addEventListener('input', updateFilterValue)
            saturate.addEventListener('input', updateFilterValue)

            reset.addEventListener('click', resetFilterValue)
            save.addEventListener('click', saveFilterValue)

            imgUrl.addEventListener('change', updateImageUrl)

            save.disabled = false

            function updateFilterValue() {
                reset.disabled = false
                img.style.filter = `
            grayscale(${grayscale.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            saturate(${saturate.value}%)
          `
            }

            function resetFilterValue() {
                img.style.filter = `
            grayscale(${defaults.grayscale}%)
            contrast(${defaults.contrast}%)
            brightness(${defaults.brightness}%)
            sepia(${defaults.sepia}%)
            saturate(${defaults.saturate}%)
          `
                grayscale.value = defaults.grayscale
                contrast.value = defaults.contrast
                brightness.value = defaults.brightness
                sepia.value = defaults.sepia
                saturate.value = defaults.saturate

                reset.disabled = true
            }

            function saveFilterValue() {
                avaPhoto.style.filter = `
            grayscale(${grayscale.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            saturate(${saturate.value}%)
          `
                pageHeaderImg.style.filter = `
            grayscale(${grayscale.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            saturate(${saturate.value}%)
          `
                editUserAva.style.display = "none";
                modalOverlay.classList.toggle("closed");
            }

            function updateImageUrl() {
                const imageUrl = imgUrl.value;
                if (imageUrl.length > 8) {
                    img.setAttribute('src', imageUrl);
                    avaPhoto.setAttribute('src', imageUrl);
                    popupAvaPhoto.setAttribute('src', imageUrl);
                    pageHeaderImg.setAttribute('src', imageUrl);
                    resetFilterValue();
                    saveFilterValue()
                };
            }
        }
    }

    return Ava;
});
