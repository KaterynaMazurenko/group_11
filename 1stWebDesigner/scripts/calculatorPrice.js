function Calculator (sSelector) {
var c = this;

c.calculateData = $(sSelector);
c.design = c.calculateData.find("#design");
c.crossbrauser = c.calculateData.find("#crossbrauser");
c.responsive = c.calculateData.find("#responsive");
c.cms = c.calculateData.find("#cms");
c.seo = c.calculateData.find("#seo");
c.siteTypes = c.calculateData.find("#siteTypes");
c.calcBtn = c.calculateData.find("#calc_btn");
c.returnBtn = c.calculateData.find("#return_btn");
c.priceSum = c.calculateData.find("#b-price_sum");


c.result = function () {
	var sum = 0
		,k = 0
		,services = 0;
	
	if (c.siteTypes.val() == "landPage") {k = 1}
	if (c.siteTypes.val() == "busCard") {k = 1.5}
	if (c.siteTypes.val() == "compSite") {k = 2.5}
	if (c.siteTypes.val() == "webShop") {k = 5}	

	if (c.design.prop('checked')){services+=3}
	if (c.crossbrauser.prop('checked')){services+=1}
	if (c.responsive.prop('checked')){services+=1}
	if (c.cms.prop('checked')){services+=3}
	if (c.seo.prop('checked')){services+=3}
	
	sum = k * 5000 + services * 2000; 
	c.priceSum.html(sum+" грн");
	$(".b-windowTab__result").show();
}; 

c.returning = function () {
	c.priceSum.html("");
	$(".b-windowTab__result").hide();
}; 

c.calcBtn.click(c.result);
c.returnBtn.click(c.returning);

}