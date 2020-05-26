define (['Base/Component','css!Dialogue/Dialogue'],
function(Component){
    'use strict';
    class Dialogue extends Component {
        beforeMount() {
            
        }
        
        render(){
            return `
                    <div class="popup-dialogue">
                        <div class="popup-dialogue__header">
                            <span class="popup-dialogue__header-text-nchange" title="Сообщения с ">Сообщения с </span>
                            <span class="popup-dialogue__header-text-change" title="person?"></span>
                            <img class="popup-dialogue__header-img" src="images/close_x.png" alt="X">
                        </div>
                        <div class="popup-dialogue__body">
                            <div class="popup-dialogue__body-messages">
                                <div class="popup-dialogue__message popup-dialogue__message_disp_grid">
                                    <img class="popup-dialogue__message-ava" src="" alt="ava">
                                    <div class="popup-dialogue__message-body popup-dialogue__message-body_disp_grid">
                                        <div class="popup-dialogue__message-body-header">
                                            <span class="popup-dialogue__message-body-who" title="from person">Name</span>
                                            <span class="popup-dialogue__message-body-when" title="from person">Name</span>
                                        </div>
                                        <span class="popup-dialogue__message-body-text" title="message"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="popup-dialogue__body-writing">
                            </div>
                        </div>
                    </div>
                `;
        }
    }
    
    return Dialogue;
});