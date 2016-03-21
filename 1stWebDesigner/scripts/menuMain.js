function Menu (sSelector) {
var m = this;

m.menu = $(sSelector);
m.menuItem = m.menu.find(".b-menu__item");


m.showSubmenu = function () { 
	$(this).children(".b-submenu").show();
}; 

m.hideSubmenu = function () {
	$(this).children(".b-submenu").hide();
}; 

m.menuItem.mouseover(m.showSubmenu);
m.menuItem.mouseout(m.hideSubmenu);

}

function SubMenu (sSelector) {
var m = this;

m.menu = $(sSelector);
m.menuItem = m.menu.find(".b-submenu__item");


m.showSubmenu = function () { 
	$(this).children(".b-subSubmenu").show();
}; 

m.hideSubmenu = function () {
	$(this).children(".b-subSubmenu").hide();
}; 

m.menuItem.mouseover(m.showSubmenu);
m.menuItem.mouseout(m.hideSubmenu);

}