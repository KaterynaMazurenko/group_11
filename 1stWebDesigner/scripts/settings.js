//Форма записи статического класса

// var myObject = {};
// myObject.myProperty = 1;
// myObject.myFunction = function () {};


//статический класс

var settings = {};

// свойство, в которое будет сохраняться многомерный ассоциативный массив
settings.data = {};


// метод, который записывает многомерный ассоциативный массив в свойство settings.data
settings.init = function (oSettings) {
	settings.data = oSettings;
};

// метод, который по названию ключа ассоциативного массива, будет получать значение (массив) из settings.data, соответствующее ему и возвращать его
settings.get = function (sSettingsName) {
	return settings.data[sSettingsName];
}



var messages = {};

messages.data = {};

messages.init = function (oMessages) {
	messages.data = oMessages;
};

messages.change = function (oMessages) {
	oMessages = messages.data
	return oMessages;
}

messages.display = function (lang,sMessagesType) {
	var messageOnLang = messages.data[lang];
	if (sMessagesType == "error" || sMessagesType == "sucsess") {
		alert(messageOnLang[sMessagesType]);
	}
	else if (sMessagesType == "agree" || sMessagesType == "worning") {
		confirm(messageOnLang[sMessagesType]);
	};
}

messages.addMessage = function (sLang,sType,sText) {
	messages.data.sLang = sType;
// 	messages.data[sLang] = [sType];
}

messages.deleteMessage = function (sSettingsKey,sSettingsMeaning) {
	messages.data.unshift(sSettingsKey);
	messages.data.unshift(sSettingsKey) = sSettingsMeaning;
}