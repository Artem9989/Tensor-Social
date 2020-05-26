define(['Base/Component'], function (Component) {
    
    class message extends Component {
        
        /**
         * компонент сообщений
        */
        
        constructor({item}) {
            super();
            this.state.item = item;
        }

        render(options, {item}) {
            return `<div class="profile__dialogues-friend profile__dialogues-friend_size profile__dialogues-friend_disp_grid profile__dialogues-friend_line_before profile__dialogues-friend-margin">
                            <div class="profile__dialogues-friend-photo profile__dialogues-friend-photo_size profile__dialogues-friend-photo_position">
                                <img class="profile__dialogues-friend-photo-img profile__dialogues-friend-photo-img_size" src=${item.author_avatar} alt="img" />
                            </div>
                            <div class="profile__dialogues-friend-information profile__dialogues-friend-information_disp_grid profile__dialogues-friend-information_size">
                                <div class="profile__dialogues-friend-header profile__dialogues-friend-header_disp_flex">
                                    <span class="profile__dialogues-friend-who">${item.author}</span>
                                    <span class="profile__dialogues-friend-last-time">${item.createLastTimeStr}</span>
                                </div>
                                <span class="profile__dialogues-friend-message">${item.lastMessage}</span>
                            </div>
                        </div>
                 
            `;
        }
        
    }
    
    return message;
});
