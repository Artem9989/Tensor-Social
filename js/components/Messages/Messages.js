define(['Base/Component', 'Messages/messageModel', 'Messages/message'], 
       function (Component, messageModel, message) {
    'use strict';
    
    class dialogue extends Component {

        beforeMount() {
            this.setState({
                items: [
                    new messageModel({
                        author: 'Почемучкин Андрей',
                        author_avatar: 'images/users/NoAvatar.png',
                        date: new Date('2020-04-27T20:00:00'),
                        lastMessage: `Привет! Как твои дела? Давно не видел тебя! Слушай,
                        я кушать хочу, есть молочко для хлопушек? 
                        А то выйти в последнее время не получается(99(`
                    }),
                    
                    new messageModel({
                        author: 'Подвижный попег',
                        author_avatar: 'images/users/ava5.png',
                        date: new Date('2020-03-03T16:00:00'),
                        lastMessage: `Чирик чирик! Как ты?`
                    }),
                    
                    new messageModel({
                        author: 'МастерНаВсе руки',
                        author_avatar: 'images/users/ava4.png',
                        date: new Date('2020-04-23T12:30:00'),
                        lastMessage: `Записала тебя на наготочки, завтра или послезавтра тебе удобнее всего?`
                    }),
                    
                    new messageModel({
                        author: 'Твой Папа',
                        author_avatar: 'images/users/ava6.png',
                        date: new Date('2020-04-26T04:00:00'),
                        lastMessage: `Почему не спим???`
                    })
                ]
            });
        }

        render(options, {items}) {
            return ` <div class = "page-block__tape"> 
            <div class="profile__dialogues profile__dialogues_disp_flex profile__dialogues_size profile__dialogues_margin">
                <div class="profile__dialogues-header profile__dialogues-header_disp_flex">
                    <span class="profile__dialogues-header-name profile__dialogues-header-name_position">Сообщения</span>
                </div>
                <div class="profile__dialogues-messages profile__dialogues-messages_disp_flex">
                ${items.map((item) => this.childrens.create(message, {item})).join('\n')}
                </div>
            </div>
            </div>
            `
        }
    }

    return dialogue;
});
