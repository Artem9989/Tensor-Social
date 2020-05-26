define(['Base/Component','css!PopupFriends/PopupFriends',], function (Component) {
   'use strict';
   class PopupFriends extends Component{
      constructor(options){
         super(options);
         this.setState({
            person: this.options.person
         })
      }

      render(){
         return `
         <div class="popupFriends">
            <span class="popupFriends__close">X</span>
            <div class="popupFriends__content">
               <span class="popupFriends__id">Ваш ID - ${this.state.person.id}</span>
               <span class="popupFriends__caption">Поиск друга по ID:</span>
               
               <form class="popupFriends__search">
                  <input class="popupFriends__input" type="text" value="">
                  <button class="popupFriends__button" >Найти</button>
               </form>
               <div class="popupFriends__sections">
                  <div class="popupFriends__sections__friends">Друзья</div>
                  <div class="popupFriends__sections__requests">Запросы</div>
               </div>
            </div>
         </div>
         `;
      }

      afterMount() {
         const close = this.getContainer().querySelector('.popupFriends__close');
         close.addEventListener("click", this.close.bind(this));
      }

      close() {
         this.unmount();
      }

      addFriends(){
         
      }
   }

   return PopupFriends;
});