define(['Base/Component'],
function (Component) {
    
    /**
    * компонент новостей
    */
    class News extends Component {
        constructor({item}) {
            super();
            this.state.item = item;
        }

        render(options, {item}) {
            return `
                    <div class="lenta_news">
                        <div class="news__info_about_user">
                            <img class="news__user_avatar" src="${item.author_avatar}" alt="Аватар ${item.title}" />
                            <p class="news__author" title="${item.author || ''}">${item.author || ''}</p>
                            <p class="news__date" title="${item.createNewsStr || ''}">${item.createNewsStr || ''}</p>
                            <img class="news__delete" src="images/ui/basket.png"/>
                        </div>
                        <p class="news__text" title="${item.text || ''}">${item.text || ''}</p>
                        <img class="news__image" src="${item.image}"/> 
                    </div>`;
        }
    }
    
    return News;
});
