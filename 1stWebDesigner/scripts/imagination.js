function Imagination (sSelector) {
	var i = this;
	
	i.backgroundShow = function () {
		i.elem.stop().animate({opacity:0.9},i.tickerPeriod*1000);	
	}
	
	i.timerCreation = function () {
		i.ticker = window.setInterval(i.creation, i.tickerPeriod*1000);
	}
	
	i.creation = function () {
		var currentElem = $(i.missionItem.eq(i.current));
			currentElem.stop().animate({opacity:1},i.tickerPeriod*1000);
		i.current +=1;
		if (i.max == i.current) {
				window.clearInterval(i.ticker);
				i.ask();
			}
	}
	
	i.ask = function () {
		i.aboutUs.stop().animate({opacity:1},i.tickerPeriod*1000);
		
	}
	
	i.showInformation = function () {
		i.information.addClass("b-imagination__informAbout_shown");
		i.elem.stop().animate({opacity:1},100);
	}
	
	i.closeInformation = function (event) {
		if (!event || $(event.target).hasClass("b-imagination__informAbout_shown")) {
			i.information.removeClass("b-imagination__informAbout_shown");
			i.elem.stop().animate({opacity:0.9},100);
		}
	}
	
	i.closeInformationX = function () {
		i.information.removeClass("b-imagination__informAbout_shown");
		i.elem.stop().animate({opacity:0.9},100);
	}
	
	
	i.main = function () {
		i.init(sSelector);
		i.mission = i.find(".b-mission");
		i.missionItem = i.find(".b-mission__item");
		i.aboutUs = i.find(".b-imagination__aboutUs");
		i.information = i.find(".b-imagination__informAbout");
		i.informationClose = i.find(".b-container__close");
		
		i.tickerPeriod = 2;
		i.max = 4;
		i.current = 0;
		i.ticker = null; 
		i.tickerAskB = null; 
		i.tickerAskW = null; 
		
			i.backgroundShow();
			i.timerCreation();
			i.aboutUs.click(i.showInformation);
			i.information.click(i.closeInformation);
			i.informationClose.click(i.closeInformationX);
			
	}
	
	$(document).ready(i.main);
}

Imagination.prototype = new Component;