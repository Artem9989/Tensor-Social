define (['Base/Component', 'LentaNews/NewsModel', 'LentaNews/News'],
function(Component, NewsModel, News){
    'use strict';
    
    /**
     * * Компонент ленты новостей
    */
    class LentaNews extends Component {
        beforeMount() {
            this.setState({
                items: [
                    new NewsModel({
                        author: 'Мария Золотова',
                        author_avatar: 'images/users/ava1.png',
                        date: new Date('2020-04-15T15:30:00'),
                        text: 'Объявлены дополнительные меры поддержки бизнеса',
                        image: 'images/news/news1.png'
                    }),
                    new NewsModel({
                        author: 'Анастасия Краско',
                        author_avatar: 'images/users/ava2.png',
                        date: new Date('2020-03-03T20:00:00'),
                        text: 'Нет худа без добра. Вот и короновирус помог решить проблему России с утечкой мозгов. Теперь мозги не утекают, а консервируются.',
                        image: 'images/news/news2.png'
                    })
                ]
            });
        }
        render(options, {items}) {
            return `<div class="page-block__wall">
                ${items.map((item) => this.childrens.create(News, {item})).join('\n')}
            </div>`;
        }
    }
    
    return LentaNews;
});
