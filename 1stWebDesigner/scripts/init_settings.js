var _regexps_settings = {
	"regexps" : {
    	"name" : "^[А-ЯҐЄІЇA-Z][а-яА-ЯґҐЄєІіЇїa-zA-Z\\- ]{1,25}$"
    	,"surname" : "^[А-ЯҐЄІЇA-Z][а-яА-ЯґҐЄєІіЇїa-zA-Z\\- ]{1,25}$"
    	,"email" : "^[a-zA-Z0-9][a-zA-Z0-9_\\.\\-]{5,25}@[a-z]{1,15}\\.[a-z]{1,4}$"
    	,"phone" : "^\\+[1-9]{2}\\([0-9]{3}\\)[0-9]{3}((\\-)?[0-9]{2}){2}$"
    	,"quastion" : "^[а-яА-ЯґҐЄєІіЇїa-zA-Z0-9_\\.\\?\\,\\:\\;\\!\\%\\$\\*\\@\\=\\+\\)\\(\\- \n]{3,150}$"
    	,"brand" : "^[a-zA-Z0-9\\- _]{1,20}$"
    	,"price" : "^[0-9]{1,5}(\\.[0-9]{1,2})?$"
    	,"description" : "^[а-яА-ЯґҐЄєІіЇїa-zA-Z0-9\\- _\n]{0,150}$"
    }
};
settings.init(_regexps_settings);

var _message_settings = {
	"en" : {
			"error" : "Error!"
			,"sucsess" : "Sucsess!"
			,"agree" : "Are you sure?"
			,"worning" : "Attention! The action is irreversible!"
			}
	,"ru" : {
			"error" : "Ошибка!"
			,"sucsess" : "Действие успешно завершено"
			,"agree" : "Вы уверены?"
			,"worning" : "Внимание! Действие необратимо"
			}
	,"ua" : {
			"error" : "Помилка!"
			,"sucsess" : "Дія успішно виконана!"
			,"agree" : "Ви упевнені?"
			,"worning" : "Увага! Дію не можливо відмінити!"
			}
}
messages.init(_message_settings);
