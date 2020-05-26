'use strict';

requirejs.config({
    baseUrl: 'js',
    paths: {
        // плагины для require
        text: 'lib/requirejs/text',
        css: 'lib/requirejs/native-css',

        // пути проекта для удобства подключения зависимостей
        Comp: 'components',
        Base: 'components/Base',
        Carousel: 'components/Carousel',
        AuComp: 'components/Auth',
        Page: 'components/Page',
        Model: 'Models',
        LentaNews: 'components/LentaNews',
        Messages: 'components/Messages',
        Information: 'components/Information',
        Avatar: 'components/Avatar',
        Popup: 'components/Popup',
        PopupFriends: 'components/PopupFriends',
        PopupDialogue: 'components/PopupDialogue'
    }
});

/**
 * Абстрактная фабрика для удобного создания контролов
 */
class AbstractFactory {
    create(component, options) {
        return new component(options || {});
    }
}
const factory = new AbstractFactory();

const url = 'http://tensor-school.herokuapp.com';

//const data = null;

//Страница
let pathPage = document.defaultView.location.pathname.split('/').pop();

//console.log(pathPage);
//Авторизация
const start = function(Page, LentaNews, Messages, Component){ 
    let promis = fetch(url + '/user/current', { method: 'GET', credentials: 'include'}).then(
        responce => {
            if(responce.status == 401){
                document.location.href = 'login.html';
            }
            return responce.json();
        }) 
        .catch((err) => {
            console.log(err);
        });    

    promis.then(data =>{
        const page = factory.create(Page, {domain: url, data: data});
        page.mount(document.body);

        const exit = document.getElementById("exit");

        exit.onclick = function() {
            let responce = fetch(url + '/user/logout', { method: 'GET', credentials: 'include'}).then(
                responce => {
                    if(responce.status >= 200 && responce.status < 300){
                        location.reload()
                    }
                }
            );  
        };       
    });
}

if(pathPage === 'index.html' || pathPage === '' ){
    requirejs(['Page/Page', 'Base/Component'], start);
}
else if (pathPage === 'login.html'){
    requirejs(['Page/AuthPage'], function (Page) {
        'use strict';
        const page = factory.create(Page);
        page.mount(document.body);
    });
}

// requirejs(['LentaNews/LentaNews', 'Base/Component'], function (LentaNews, Component) {
//     'use strict';

//     const module = factory.create(LentaNews, {});
//     module.mount(document.body);
// });


// requirejs(['Messages/Messages'], function (Messages) {
//     'use strict';

//     const messages = factory.create(Messages);
//     messages.mount(document.querySelector(".page-block__tape"));
// });
