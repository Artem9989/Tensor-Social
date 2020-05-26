define(['Base/Component', 'Model/PersonModel', 'css!Information/Information'], function(Component,PersonModel) {
    'use strict';
    class Information extends Component {
        constructor({person, domain}){
            super({person, domain});

            const model = factory.create(PersonModel, person);
            this.setState({ 
                mode : 'view',
                person: model,
            });
        }
        update() {
            this.beforeUpdate();

            this.unsubscribeAll();
            this.unmountChildren()
            this._beforeMount();
            const temp = document.createElement('div');
            temp.innerHTML = this.toString();
            this.getContainer().replaceWith(temp.firstElementChild);
            temp.remove();
            this.container = undefined;
            this._afterMount();
            this.afterUpdate();
        }
        
        render() {
           switch ( this.state.mode) {
               case 'view':
                   return this.renderInformation();
                case 'edit':
                    return this.renderInformationChange();          
               default:
                   return "<div></div>";
           }
        }
        
        renderInformation(){
            return `<div class="information information__color">
            <div class="information__container">
                <div class="information__name">${this.state.person.name}</div>
                <div class="information__status">${this.state.person.status}</div>
                ${this.renderParamRow('День рождения:', this.renderBirthDay(this.state.birthday) + ' ' + this.state.person.renderZodiac())}
                ${this.renderParamRow( 'Город:', this.state.person.city || 'неизвестно')}
                ${this.renderParamRow ('Семейное положение:', this.state.person.family || 'неизвестно')}
            </div>
            <div class="information__hide">Показать подробности</div>
            <div class="information__container__mini">
                ${this.renderParamRow( 'Образование:', this.state.person.education || 'неизвестно')}
                ${this.renderParamRow( 'Место работы:', this.state.person.work || 'неизвестно')}
            </div>
        </div>`;
        }

        renderInformationChange(){
            return `<form class="information information__color information__change">
            <legend class="information__name">${this.state.person.name}</legend>
            <div class="information__container">
            <textarea class="information__status information__status__textarea" name="0" id="" rows="2">${this.state.person.status}</textarea>
                ${this.renderFormParamRow(1, 'date','День рождения:',this.renderInputDate(this.state.person.birthday))}
                ${this.renderFormParamRow(2, 'text', 'Город:', this.state.person.city)}
                ${this.renderDropdown(3, 'text','Семейное положение:',this.state.person.family)}
            </div>
            <div class="information__hide">Показать подробности</div>
            <div class="information__container__mini">
                ${this.renderFormParamRow(4, 'text', 'Образование:', this.state.person.education)}
                ${this.renderFormParamRow(5, 'text', 'Место работы:', this.state.person.work)}
            </div>
        </form>`;
        }

        renderParamRow(name, value) {
            return `<div class="information__label">${name}</div>
            <div class="information__value">${value}</div>`;
        }

        renderDropdown(index,type, name,family){
            return `<label for="input${index}" class="information__change__label">${name}</label>
            <div class="dropdown">
            <input type="${type}" name="${index}" id="input${index}" class="information__change__input" readonly value="${family}">
            <button class="dropdown__button">Изменить</button>
            <div class="dropdown__content">
                <div class="dropdown__option">В браке</div>
                <div class="dropdown__option">Встречаюсь </div>
                <div class="dropdown__option">Ищу тебя</div>
                <div class="dropdown__option">Все сложно</div>
            </div>`;
        }

        renderFormParamRow(index,type, name , value) {
            return `<label for="input${index}" class="information__change__label">${name}</label>
            <input type="${type}" name="${index}" id="input${index}" class="information__change__input" value="${value}">`;
        }

        renderBirthDay(date) {
            return this.state.person.bdayStr;
        }

        renderInputDate(date) {
            return `${date.getFullYear()}-${date.getMonth() < 11 ? '0'+(date.getMonth()+1) : date.getMonth()+1}-${date.getDate() < 10 ? '0'+ (date.getDate()) : date.getDate()}`;
        }

        informationMiniHide() {
            const infomin = this.getContainer().querySelector(".information__container__mini");
            let hide = this.getContainer().querySelector(".information__hide");
            
            if(hide.textContent == "Скрыть подробности"){
                infomin.style.display='none';
                hide.textContent = "Показать подробности"
            }
            else if(hide.textContent == "Показать подробности"){
                infomin.style.display='grid';
                hide.textContent = "Скрыть подробности"
            }
        }
        showDropdown(event) {
            event.preventDefault();
            let content = this.getContainer().querySelector('.dropdown__content');
            content.style.display='block';
        }

        changeОption(event) {
            let dropdown = this.getContainer().querySelector(".dropdown");
            let input = dropdown.querySelector('.information__change__input');
            input.value = event.target.textContent;
            let content = dropdown.querySelector('.dropdown__content');
            content.style.display='none';
        }
        
        afterMount() {
            this.getContainer().querySelector(".information__hide").addEventListener("click", this.informationMiniHide.bind(this));
            
            if(this.state.mode == 'edit'){
            let dropdown = this.getContainer().querySelector(".dropdown");
            dropdown.querySelector(".dropdown__button").addEventListener("click", this.showDropdown.bind(this));

            let options =  this.getContainer().querySelectorAll(".dropdown__option");
                for (let index = 0; index < options.length; index++) {
                    options[index].addEventListener("click", this.changeОption.bind(this));
                    
                }
            }
        }

        saveInformation(){
            const form = new FormData(this.getContainer())
    
            this.state.person.status =  form.get('0');
            this.state.person.family = form.get('3');
            this.state.person.city = form.get('2');
            this.state.person.birthday = new Date(form.get('1'));
            this.state.person.education = form.get('4');
            this.state.person.active = new Date();
            this.state.person.work = form.get('5');

            let requestOptions = {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: this.state.person.name,
                    status : this.state.person.status,
                    family_state : this.state.person.family,
                    city : this.state.person.city ,
                    birth_date : this.state.person.birthday,
                    education : this.state.person.education,
                    job : this.state.person.work,
                }),
                credentials : "include"  
            };

           fetch(this.options.domain + "/user/update", requestOptions)
            .then(response => response.text())
            .then(result => {this.update()});
        }

        setState(newState) {
            const oldState = this.state;
            this.state = {...this.state, ...newState};
        }

    }
    return Information; 
});