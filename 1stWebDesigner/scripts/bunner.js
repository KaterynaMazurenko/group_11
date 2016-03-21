function Slider (sSelector) {
var s = this;


s.slideGo = function () {
	s.ticker = window.setInterval(s.changeImageNext, s.tickerPeriod*1000);
	window.clearInterval(s.timer);
}

s.next = function () {
	s.slideStop();
	s.changeImageNext();
	s.slideAgain();
}

s.previous = function () {
	s.slideStop();
	s.changeImagePrevious();
	s.slideAgain();
}

s.changeImage = function () {
	var nameNew = "../images/content/"+s.counter+".jpg"
		,nameNewPrev = "../images/content/"+ s.counterPrev +".jpg"
		,nameNewPost = "../images/content/"+ s.counterPost +".jpg"
		;
	s.img.attr("src",nameNew);
	s.imgPrev.attr("src",nameNewPrev);
	s.imgPost.attr("src",nameNewPost);
	
	
	
	}

s.changeImageNext = function () {
	s.changeImage();
 	s.indicatorChange();
 	
 	
	// s.countersCirle(s.counter,"next");
// 	s.countersCirle(s.counterPrev,"next");
// 	s.countersCirle(s.counterPost,"next");
// 	
	
	
	
	
	if (s.counter <= s.max-1) {
	 s.counter ++;
		}
	else {s.counter = 1};
	if (s.counterPrev <= s.max-1) {
	 s.counterPrev ++;
		}
	else {s.counterPrev = 1};
	if (s.counterPost <= s.max-1) {
	 s.counterPost ++;
		}
	else {s.counterPost = 1};
}


s.changeImagePrevious = function () {
	s.changeImage();
	s.indicatorChange();
	
	// s.countersCirle(s.counter,"previous");
// 	s.countersCirle(s.counterPrev,"previous");
// 	s.countersCirle(s.counterPost,"previous");
	
	if (s.counter > 1) {
	 s.counter --;
		}
	else {s.counter = s.max};
	if (s.counterPrev > 1) {
	 s.counterPrev --;
		}
	else {s.counterPrev = s.max};
	if (s.counterPost > 1) {
	 s.counterPost --;
		}
	else {s.counterPost = s.max};
}


s.countersCirle = function (dCounter, sDirection) {
	if(sDirection == "next") {
		if (dCounter <= s.max-1) {
			 dCounter ++;
		}
		else {dCounter = 1};
	}
	else if (sDirection == "previous") {
		if (dCounter > 1) {
	 		dCounter --;
		}
		else {dCounter = s.max};
	};
	
	console.log(dCounter, s.max);
}

s.indicatorChange = function () {
	$(s.indicators).removeClass("b-sliderMenu__item_active");
	$(s.indicators[s.counter-1]).addClass("b-sliderMenu__item_active");
	}



s.slideStop = function () {
	window.clearInterval(s.ticker);
	window.clearInterval(s.timer);
}

s.slideAgain = function () {
	s.timer = window.setInterval(s.slideGo, s.timerPeriod*1000);
}

s.changeImageByIndicator = function () {
	s.slideStop();
	s.counter = $(s.indicators).index(this)+1;
	s.changeImage();
	s.indicatorChange();
	s.slideAgain();
}

s.main = function () {
	s.init(sSelector);
	s.arrowPrev = s.find(".b-controls__arrow_left");
	s.arrowNext = s.find(".b-controls__arrow_right");
	s.img = s.find(".b-slide__image_active");
	s.imgPrev = s.find(".b-slide__image_prev");
	s.imgPost = s.find(".b-slide__image_post");
	s.indicators = s.find(".b-sliderMenu__item");

	s.ticker = null; 
	s.tickerPeriod = 3; 
	s.counter = 3;
	s.counterPrev = 2;
	s.counterPost = 4;
	s.timer = null;
	s.timerPeriod = 9;
	s.max = 4;


		s.slideGo();
		s.arrowPrev.click(s.previous);
		s.arrowNext.click(s.next);
		s.indicators.click(s.changeImageByIndicator);
}

$(document).ready(s.main);



}

Slider.prototype = new Component();
