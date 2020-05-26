define(['Base/Model'],
function(Model) {
    
    /**
    * Модель новостей
    */
    class NewsModel extends Model{

        //возвращает дату создания новости
        get createNewsStr() {
            return this.renderTextDate(this.date || null);
        }
    
        /**
         * Возращает дату в текстовом виде по формату 'сегодня в HH:MM' или 'DD.MM.YY в HH:MM' если было давно
         * 'неизвестно' в случае если пришел null
         * @param {Date|null} date - дата
         */
        renderTextDate(date) {
            let out = 'неизвестно';
            const now = new Date();
            const days = Math.floor((date - now) / 86400000)*-1;
            const daysStr = ['сегодня', 'вчера'];
            if (date) {
                out = `${daysStr[days-1] || date.toLocaleDateString()} ${date.toTimeString().replace(/:[0-9]{2,2} .*/, '')}`;
            }
    
            return out;
        }
    }
    
    return NewsModel;
});
