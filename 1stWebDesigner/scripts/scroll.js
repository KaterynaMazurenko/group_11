function ScrollUp (sSelector) {
	var s = this;
	
	s.showHideTopBtn = function () {
		
		if ($(window).scrollTop() > $(window).height()) { // считываем высоту экрана
			s.topBtn.fadeTo(100,0.8); // через 100 миллисекунд появится з прозрачностью 0.8
			
		}
		else {
			s.topBtn.fadeTo(100,0);
		}
		
	}
		
	s.slowScroll = function (event) {
		event.preventDefault();
		$("html,body")
			.stop()
			.animate({scrollTop:0},"slow");
	}
		
	s.main = function () {
		s.init(sSelector);
		s.topBtn = s.find(".b-container__topBtn");
		
		$(window).scroll(s.showHideTopBtn); 
		s.topBtn.click(s.slowScroll); 
	}
	
	
	$(document).ready(s.main);
}

ScrollUp.prototype = new Component();




function ScrollMenu (sSelector) {
	var s = this;
	
	s.goToMenuPunct = function (event) {
		event.preventDefault();
		var currentMenu = $(this)
			,currentMenuLink = currentMenu.find(".b-menu__link")
			,id = currentMenuLink.attr('href')
			,top = $(id).offset().top;
			;
		s.slowScroll(top);
	}
	
	s.goToSubMenuPunct = function (event) {
		event.preventDefault();
		var currentMenu = $(this)
			,currentMenuLink = currentMenu.find(".b-submenu__link")
			,id = currentMenuLink.attr('href')
			,top = $(id).offset().top;
			;
		s.tabs.find(".b-tabs__activeTab").removeClass("b-tabs__activeTab_shown");
		s.tabs.find(id).addClass("b-tabs__activeTab_shown");
		s.slowScroll(top);
	}
		
	s.slowScroll = function (top) {
		$("html,body")
			.stop()
			.animate({scrollTop:top},"slow");
	}
		
	s.main = function () {
		s.init(sSelector);
		s.menu = s.find("#menu1");
		s.currentMenuItem = s.menu.find(".b-menu__item");
		s.currentSubMenuItem = s.menu.find(".b-submenu__item");
		s.tabs = s.find(".b-menuTabs");
		
		s.currentMenuItem.click(s.goToMenuPunct); 
		s.currentSubMenuItem.click(s.goToSubMenuPunct);
	}
	
	
	$(document).ready(s.main);
}

ScrollMenu.prototype = new Component();

// $(document).ready(function(){
// 	$("#menu").on("click","a", function (event) {
// 		//отменяем стандартную обработку нажатия по ссылке
// 		event.preventDefault();
// 
// 		//забираем идентификатор бока с атрибута href
// 		var id  = $(this).attr('href'),
// 
// 		//узнаем высоту от начала страницы до блока на который ссылается якорь
// 			top = $(id).offset().top;
// 		
// 		//анимируем переход на расстояние - top за 1500 мс
// 		$('body,html').animate({scrollTop: top}, 1500);
// 	});
// });