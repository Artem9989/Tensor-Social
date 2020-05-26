define(['Model/GalleryModel','Base/Component','css!Popup/Popup',], function (GalleryModel,Component) {
   'use strict';
   class Popup extends Component{
      constructor(options){
         super(options);
         this.setState({
            galleryModel: new GalleryModel(this.options.person.id, this.options.domain),
         })
      }

      render(){
         return `
            <div class="popup">
               <div class="popup__content">
                  <span class="popup__caption"> Все фотографии</span>
                  <span class="popup__close"> X</span>
                  <div class="popup__photos"></div>
               </div>
            </div>
         `;
      }

      renderPhoto(photo){
         return `<img class="popup__photo" src="${photo}">`;
      }

      afterMount() {
         const close = this.getContainer().querySelector('.popup__close');
         close.addEventListener("click", this.close.bind(this));

         this.loadPhotos();
      }

      async loadPhotos(){
         const list = await this.state.galleryModel.listPhoto(this.state.galleryModel.userid);

         let html = '';
         list.forEach(photo => {
            html += this.renderPhoto(photo.pathPhoto);
         });
         const photos = this.getContainer().querySelector('.popup__photos');
         photos.innerHTML = html;

      }

      close() {
         this.unmount();
      }
   }

   return Popup;
});