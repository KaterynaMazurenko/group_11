function ActiveTab (sSelector) {

var a = this;

a.showActiveTab = function () {
	a.index = $(a.tabMenuItem).index(this);
		
	a.changeImage();
	
	a.i = a.index;
	
	a.tabContent.removeClass("b-tabs__activeTab_shown");
	a.tabMenuItem.removeClass("b-menuTabs__headerTabs_active");
	

	$(a.item[a.index]).find(".b-menuTabs__headerTabs").addClass("b-menuTabs__headerTabs_active");
	$(a.item[a.index]).find(".b-tabs__activeTab").addClass("b-tabs__activeTab_shown");

	
};

	

a.changeImage = function () {
		var n = $(a.tabMenuItem).eq(a.i).find(".b-headerTabs__image").attr("src").replace(/fc/,"wb")
			,m = $(a.tabMenuItem).eq(a.i).find(".b-headerTabs__image").attr("src",n)
			,nameImageActive = $(a.tabMenuItem).eq(a.index).find(".b-headerTabs__image").attr("src").replace(/wb/,"fc")
			,imageActive = $(a.tabMenuItem).eq(a.index).find(".b-headerTabs__image").attr("src",nameImageActive)
			
			;
		
		
		
		}
	
	
	
	// for (i=0; i=2; i++) {
// 		var imageCurrent = $(a.tabMenuItem).eq(i).find(".b-headerTabs__image")
// 		,nameImageCurrent = imageCurrent.attr("src")
// 		// ,nameImagePassive = nameImageCurrent.replace(/wb/,"fc")
// // 		,imagePassive = imageCurrent.attr("src",nameImagePassive)
// 	;
// 	console.log(nameImageCurrent);
// 	}



a.main = function () {
	a.init(sSelector);
	a.menu = a.find(".b-menuTabs");
	a.item = a.find(".b-menuTabs__item");
	a.tabContent = a.find(".b-tabs__activeTab");
	a.tabMenuItem = a.find(".b-menuTabs__headerTabs");
	a.imageMenu = a.find(".b-headerTabs__image");
	
	a.index = 0;
	a.i = 0;
	
	
		a.tabMenuItem.click(a.showActiveTab);
}

$(document).ready(a.main);
}

ActiveTab.prototype = new Component();




function ReadMore (sSelector) {
var b = this;

b.readMore = $(sSelector);
b.readMoreBtn = b.readMore.find(".b-punctsTab__link");


b.showReadMore = function () { 
	$(this).children(".b-punctsTab__definition").show();
}; 

b.hideReadMore = function () {
	$(this).children(".b-punctsTab__definition").hide();
}; 

b.readMoreBtn.mouseover(b.showReadMore);
b.readMoreBtn.mouseout(b.hideReadMore);

}




