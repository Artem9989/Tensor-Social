define(['Base/Component','css!PopupDialogue/PopupDialogue',], function (Component) {
   'use strict';
   class PopupDialogue extends Component{
      constructor(options){
         super(options);
         this.setState({
            //
         })
      }

      render(){
         return `
            <div class="popupDialogue">
               <div class="popupDialogue__content">
                  <span class="popupDialogue__close"> X</span>
               </div>
            </div>
         `;
      }

      afterMount() {
         const close = this.getContainer().querySelector('.popupDialogue__close');
         close.addEventListener("click", this.close.bind(this));
      }

      close() {
         this.unmount();
      }
   }

   return PopupDialogue;
});