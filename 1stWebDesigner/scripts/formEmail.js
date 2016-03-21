//не работает: изменение css-свойств f.agree; возвращение фокуса на неправильно заполненное поле

function Form (sSelector) {
var f=this;
	
// метод для отображения данных формы
	f.showInfo = function() {
		var text = "";
		f.informationField.each(function() {
				var informationField = $(this);
				 text += f.val(informationField) + "; " 
			}
		);
		console.log(text);
	};
	
//	метод для считывания данных формы в зависимости от типа
	f.val = function (oJqElem) {
		var type = oJqElem.attr("type") 
			,tagName = oJqElem.prop("tagName") 
			;
		if (type == "radio" 
			|| type == "text" 
			|| type == "password" 
			|| type == "fail" 
			|| tagName == "OPTION" 
			|| tagName == "SELECT"
			|| tagName == "TEXTAREA" ) {
				return oJqElem.val();
		}
		else if (type == "checkbox"){
			var checkboxVals = "";
				oJqElem.each(function(){
						var checkboxVal = $(this); 
						checkboxVals += checkboxVal.val() + " "; 
						}
					);
			return checkboxVals;
		}
	}
	
//	метод проверки правильности ввода информации в поля формы по шаблону	
	f.check = function (event) {
		event.preventDefault(); 
		var informationField = $(this)
			,regexps = settings.get("regexps")
			,re = new RegExp(regexps[informationField.attr("name")])
			,textFieldError = !informationField.val().match(re)
			;
				if (textFieldError){
					informationField.next(".b-information__check").removeClass("b-information__check_ok");
					informationField.next(".b-information__check").addClass("b-information__check_no");
					informationField.addClass("b-information__red");
					//messages.display("en","error");
					// informationField.focus();
				}
				else if (!textFieldError){
					informationField.removeClass("b-information__red");
					informationField.next(".b-information__check").removeClass("b-information__check_no");
					informationField.next(".b-information__check").addClass("b-information__check_ok");
				}
	}
	
//	метод проверки согласия на обработку данных	
	f.agreeChecker = function () {
		if (f.val(f.agree.filter(":checked"))) {
			f.agreeChecked = true;
		}
		else {
			//f.agree.addClass("b-information__red");
			f.agree.focus();
		}
	}
	
//	метод проверки правильности заполнения формы в целом и в зависимости от этого дальнейшей отправки информации 
	f.formChecker = function () {
		
		var formFieldsChecked = 0
			,fieldMax = 0
			;
		f.informationCheck.each(function () {
				var informationCheck = $(this)
					,fieldCheck = informationCheck.hasClass("b-information__check_ok")
					;
				fieldMax += 1;
				if (fieldCheck) {
					formFieldsChecked += 1;
					}
			}
		)
		if (formFieldsChecked == fieldMax) {
			f.formChecked = true;
		}
		else {
			//messages.display("en","error");
		};
	}

//	метод отправки формы на сервер после проверки ее правильности
	f.formSend = function (event) {
		event.preventDefault();
		f.agreeChecker();
		f.formChecker();
		if (f.formChecked && f.agreeChecked) {
			f.showInfo();
			messages.display("en","sucsess");
		}
		console.log("ok");
		
	}
	
//	основной метод формы, содержащий ее свойства и обработчики событий 	
	f.main = function () {
		f.init(sSelector);
		f.informationField = f.find(".b-information__field");
		f.informationCheck = f.find(".b-information__check");
		f.sendButton = f.find(".b-information__btn");
		f.name = f.find(".b-information__name");
		f.surname = f.find(".b-information__surname");
		f.mail = f.find(".b-information__email");
		f.phone = f.find(".b-information__phone");
		f.agree = f.find(".b-information__checkbox");
		
		f.formChecked = false;
		f.agreeChecked = false;

	f.informationField.blur(f.check);
	f.elem.bind("submit", f.formSend); // на саму форму f.elem вешается событие аналогичное клику на баттон, но позволяет совершить отправку формы на сервер
}

//	обработчик формы по мере загрузки страницы
$(document).ready(f.main);

}

Form.prototype = new Component();








// function Form (sSelector) {
// var f=this;
// 	
// // логика
// 	// метод для отображения данных формы
// 	f.showInfo = function() {
// 		var text = "";
// 		// f.informationField.each(function() {
// // 				var informationField = $(this);
// // 				 text += f.val(this) + "; " 
// // 			}
// // 		);
// 		f.hidePunctsTab();
// 		console.log(informationField);
// 	};
// 	
// 	// метод для считывания данных формы	
// 	f.val = function (oJqElem) {
// 		var type = oJqElem.attr("type") 
// 			,tagName = oJqElem.prop("tagName") 
// 			;
// 		if (type == "radio" 
// 			|| type == "text" 
// 			|| type == "password" 
// 			|| type == "fail" 
// 			|| tagName == "OPTION" 
// 			|| tagName == "SELECT"
// 			|| tagName == "TEXTAREA" ) {
// 				return oJqElem.val();
// 		}
// 		else if (type == "checkbox"){
// 			var checkboxVals = "";
// 				oJqElem.each(function(){
// 						var checkboxVal = $(this); 
// 						checkboxVals += checkboxVal.val() + " "; 
// 						}
// 					);
// 			return checkboxVals;
// 		}
// 		else {alert("Нет такого элемента управления");};
// 	}
// 	
// 	// метод для отображения формы, соответствующей тематике задаваемого вопроса
// 	f.showPunctsTab = function () {
// 		f.punctsSelected = f.otherQuestions;
// 			if (f.val(f.questions) == "technical") {
// 				f.punctsSelected = f.technical;}
// 			else if (f.val(f.questions) == "finance") {
// 				f.punctsSelected = f.finance;}
// 			else if (f.val(f.questions) == "services") {
// 				f.punctsSelected = f.services;}
// 			else if (f.val(f.questions) == "partnership") {
// 				f.punctsSelected == f.partnership;}
// 			else {
// 				f.punctsSelected = f.otherQuestions;};
// 		f.punctsSelected.show();
// 		
// 	}
// 	// метод для скрытия формы, соответствующей тематике задаваемого вопроса
// 	f.hidePunctsTab = function () {
// 		f.punctsSelected.hide();
// 	//f.punctsSelected.attr('class');
// 	}
// 	
// 	f.main = function () {
// 
// // данные
// 		f.init(sSelector);
// 		f.informationField = f.find(".b-information__field");
// 
// 		// f.name = f.find("#name");
// // 		f.surname = f.find("#surname");
// // 		f.mail = f.find("#mail");
// // 		f.phone = f.find("#phone");
// // 		f.agree = f.find("#agree");
// 		f.questions = f.find("#questions");
// 		f.questionsButton = f.find(".b-questions__btn");
// 		f.technical = f.find("#technical");
// 		f.finance = f.find("#finance");
// 		f.services = f.find("#services");
// 		f.partnership = f.find("#partnership");
// 		f.otherQuestions = f.find("#otherQuestions");
// 		
// 		f.punctsSelected = 0;
// 
// 
// // представление
// 	f.questionsButton.click(f.showPunctsTab);
// 	//f.sendButton.click(f.showInfo);
// 	//f.sendButton.click(f.hidePunctsTab);
// 
// 
// 	f.elem.submit(f.showInfo); // на саму форму f.elem вешается событие аналогичное клику на баттон, но позволяет совершить отправку формы на сервер
// }
// 
// $(document).ready(f.main);
// 
// }
// 
// Form.prototype = new Component();







