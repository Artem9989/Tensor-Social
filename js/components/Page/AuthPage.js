define(['Base/Component', 'AuComp/Authentication'], 
function (Component, Auth) {
    'use strict';
    class AuthPage extends Component {
        render() {
            return `
                ${this.childrens.create(Auth)}
            `;
        }
    }
    return AuthPage;
});