define(['Base/Model'], function(Model) {
    'use strict';
    class PersonModel extends Model {
        constructor(data) {
            super({
                id : data.id ?? '',
                name : data.data.name ?? '',
                status : data.data.status ?? '',
               // photos : data.data.photos,
                avatar : data.domain + data.computed_data.photo_ref ?? '',
                family : data.data.family_state ?? '',
                city : data.data.city ?? '',
                birthday :new Date(data.data.birth_date) ?? null,
                education : data.data.education ?? '',
                active: new Date(+new Date(data.computed_data.last_activity) - (new Date().getTimezoneOffset() * 60 * 1000))  || '',
                work : data.data.job ?? '',
            });
        }

        get bdayStr() {
            return this.renderBDay(this.birthday || null);
        }
    
        get activeStr() {
            return this.renderTextDate(this.active || null);
        }
        
        /**
         * Возращает дату в текстовом виде по формату ''|Вчера|Позавчера в HH:MM или 'DD.MM.YYYY в HH:MM'
         * 'Неизвестно', если null
         * @param {Date|null} date - дата
         */
        renderTextDate(date) {
            let out = 'неизвестно';
            
            if (date) {
                const now = new Date();
                const days = Math.floor((date - now) / 86400000) * -1;
                const daysStr = ['сегодня', 'вчера', 'позавчера'];
                if (now - date < 15 * 60 * 1000) {
                    out = '🐱‍🏍 В сети';
                } else {
                    out = ` 🐱‍👤 Был(а)  ${daysStr[days - 1] || date.toLocaleDateString()} в ${date.toTimeString().replace(/:[0-9]{2,2} .*/, '')}`;
                }

            }
    
            return out;
        }
    
            /**
         * Возвращает дату по формату 'D месяц, N лет'
         * 'скрыто' в случае если пришел null
         * @param {Date|null} date - дата
         */
        renderBDay(date) {
            if(date.toString() != "Invalid Date"){
            let out = 'скрыто';
            const months = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа','сентября', 'октября', 'ноября', 'декабря'];
            if (date) {
                const now = new Date();
                const years = now.getFullYear() - date.getFullYear();
                let year = 'года'
                if((years > 4) && (years < 21)) 
                    year = 'лет';
                else if((years % 10) == 0)    
                    year = 'лет';
                else if((years % 10) == 1)    
                    year = 'год';
                else if(((years % 10) > 1) && ((years % 10) < 5))
                year = 'года';
                else if(((years % 10) > 4) && ((years % 10) < 10))
                year = 'лет';   

                out = `${date.getDate()} ${months[date.getMonth()]}, ${years} ${year}`;
            }

            return out;
        } return 'неизвестно';
        }

        renderZodiac(){
            let date = this.birthday.getDate();
            let month = this.birthday.getMonth() + 1;
    
            if (month==1 && date>=20 || month==2 && date<=18) return "&#9810";
            else if (month==2 && date>=19 || month==3 && date<=20) return "&#9811";
            else if (month==3 && date>=21 || month==4 && date<=19) return "&#9800";
            else if (month==4 && date>=20 || month==5 && date<=20) return "&#9801";
            else if (month==5 && date>=21 || month==6 && date<=21) return "&#9802";
            else if (month==6 && date>=22 || month==7 && date<=22) return "&#9803";
            else if (month==7 && date>=23 || month==8 && date<=22) return "&#9804";
            else if (month==8 && date>=23 || month==9 && date<=22) return "&#9805";
            else if (month==9 && date>=23 || month==10 && date<=22) return "&#9806";
            else if (month==10 && date>=23 || month==11 && date<=21) return "&#9807";
            else if (month==11 && date>=22 || month==12 && date<=21) return "&#9808";
            else if (month==12 && date>=22 || month==1 && date<=19) return "&#9809";
           
            else return " ";
        }

        }

    return PersonModel;
});