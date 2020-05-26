define(['Base/Component', 'Comp/Carousel/Carousel', 'Information/Information', 'Avatar/Ava',
'LentaNews/LentaNews', 'Messages/Messages', 'Model/PersonModel', 'Popup/Popup','PopupFriends/PopupFriends','PopupDialogue/PopupDialogue'],
    function (Component, Carousel, Information, Ava, LentaNews, Messages, PersonModel, Popup, PopupFriends,PopupDialogue) {
        'use strict';
        class Page extends Component {
            constructor(options) {
                super(options);
                this.setState({
                    personModel: factory.create(PersonModel, this.options.data)
                });
            }
            render({
                domain,
                data
            }) {
                this.setState({
                    information: this.childrens.create(Information, {
                        person: data,
                        domain: domain,
                    }),
                    avatar: this.childrens.create(Ava),
                    carousel: this.childrens.create(Carousel, {
                        domain,
                        data
                    }),
                    lentaNews: this.childrens.create(LentaNews, {
                        domain,
                        data
                    }),
                    messages: this.childrens.create(Messages, {
                        domain,
                        data
                    }),

                })
                return `<div class="page font"> 
                            ${this.renderHeader()}
                        <div class="page-main-content page-main-conten_disp_grid">
                            <div class="page-main-content-left">
                                    ${this.state.information}
                                    ${this.state.carousel}
                                    ${this.state.lentaNews}
                            </div>
                            <div class="page-main-content-right">
                                    ${this.state.avatar}
                                    ${this.renderSections()}
                                    ${this.state.messages}

                            </div>
                        </div>
                        </div>`;
            }
            renderWall() {
                return `<div class = "page-block__wall">
                            <img class = "page-info__basket" src= "images/basket.png" alt= "Корзина">
                            <div class="page_block__wall_tape no_posts">
                            <div class="no_posts_cover"></div>
                На стене пока нет ни одной записи
                </div>
                </div> `
            }

            renderSections() {
                return `<div class = "page-block__sections">
                            <div class="section-fanbase section-options">
                                <img class = "page-block__fanbase sections" src= "images/widgets/fav.png" alt= "Поклонники"/>
                                <span class = "page-block__fanbase_text sections_text">Поклонники</span>
                            </div>
                            <div class="section-friends section-options">
                                <img class = "page-block__friends sections" src= "images/widgets/friends.png" alt= "Друзья"/>
                                <span class = "page-block__friends_text sections_text">Друзья</span>
                            </div>
                            <div class="section-interesting section-options">
                                <img class = "page-block__interesting sections" src= "images/widgets/int.png" alt= "Интересное"/>
                                <span class = "page-block__interesting_text sections_text">Интересное</span>
                            </div>
                            <div class="section-music section-options">
                                <img class = "page-block__music sections" src= "images/widgets/music.png" alt= "Музыка"/>
                                <span class = "page-block__music_text sections_text">Музыка</span>
                            </div>
                            <div class="section-photo section-options">
                                <img class = "page-block__photo sections" src= "images/widgets/photo.png" alt= "Фотки"/>
                                <span class="page-block__photo_text sections_text">Фотографии</span>
                            </div>
                            <div class="section-video section-options">
                                <img class = "page-block__video sections" src= "images/widgets/video.png" alt= "Видео"/>
                                <span class="page-block__video_text sections_text">Видео</span>
                            </div>
                        </div>`
            }

            renderHeader() {
                return `
            <header class="header">
                <span class="page-header__back"></span>
                <div class="page-header">
                    <img class= "page-header__avatar_small" src="photos/user_photo.png" alt= "Аватар маленький"/>
                    <a class="page-header__edit" title="Редактировать">Редактировать</a>
                    <span class= "page-header__online" title="Последний раз в сети" >${this.state.personModel.activeStr}</span>
                    <img id="exit" class="page-header__exit" src="https://img2.freepng.ru/20180406/iiw/kisspng-computer-icons-download-and-5ac733d9b96c20.1185976015230043777595.jpg" alt= "Выход"/>
                </div>     
            </header>`
            }

            afterMount() {
                const edit = document.querySelector('.page-header__edit');
                edit.addEventListener("click", this.editInformation.bind(this))

                const music = document.querySelector('.section-music');
                music.addEventListener("click", () => {
                    window.open("https://music.yandex.ru");
                })

                const video = document.querySelector('.section-video');
                video.addEventListener("click", () => {
                    window.open("https://www.youtube.com");
                })

                const fanbase = document.querySelector('.section-fanbase');
                fanbase.addEventListener("click", () => {
                    window.open("https://www.instagram.com");
                })

                const interesting = document.querySelector('.section-interesting');
                interesting.addEventListener("click", () => {
                    window.open("https://github.com/Artem9989/Social-network-Tensor");
                })

                const photo = document.querySelector('.section-photo');
                photo.addEventListener("click", this.showPopup.bind(this));

                const friends = document.querySelector('.page-block__friends');
                //friends.addEventListener("click", this.showPopupFriends.bind(this));
                friends.addEventListener("click", this.showPopupDialogue.bind(this));
            }

            editInformation() {
                const edit = document.querySelector('.page-header__edit');

                if (edit.textContent == "Редактировать") {
                    this.state.information.setState({
                        mode: 'edit'
                    });
                    edit.textContent = "Сохранить";
                    this.state.information.update();
                } else if (edit.textContent == "Сохранить") {
                    this.state.information.setState({
                        mode: 'view'
                    });
                    edit.textContent = "Редактировать";
                    this.state.information.saveInformation();
                }
            }

            showPopup() {
                const popupGallery = this.childrens.create(Popup, {
                    person: this.state.personModel,
                    domain: this.options.domain,
                });

                popupGallery.mount(this.getContainer())
            }
            
            showPopupFriends(){
                const popup = this.childrens.create(PopupFriends, {
                    person: this.state.personModel
                });

                popup.mount(this.getContainer())
            }

            showPopupDialogue(){
                const popup = this.childrens.create(PopupDialogue);

                popup.mount(this.getContainer())
            }
        }
        return Page;
    });
