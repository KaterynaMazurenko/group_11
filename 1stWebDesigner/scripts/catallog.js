function Good (oGoodElement) { // tr с данными о товаре
	var g = this;
	g.elem = oGoodElement;
	
	if (g.elem.prop("tagName") == "IMG") {
		g.getId = function () {
			var imageNumber = g.elem.attr("src").match(/([0-9]{1,3})./)[1]
				,imageId = "id_"+imageNumber
				;
			return  imageId;
			//return g.elem.attr("src");
			};
	}
	else {
		g.getId = function () {
			return g.elem.attr("class").match(/(id_[0-9]{1,11})/)[1]; // метод возвратит массив, первым элементов которого будет вся строка, соответствующая РВ, а вторым - то, что в скобках, и далее берем второй (с номером 1) элемент этого массива 
		};
	}
	
}





function CartCatallog (sMenuSelector, sCatallogSelector, sCartSelector) {
var c = this;



// ОБЩИЕ МЕТОДЫ КЛАССА
	
	// При открытии загрузка cookies, если они есть, или назначение пустого массива
c.loadCookies = function () {
	c.templates = $.cookie("cartTemplates");
		if (c.templates) {
			$.each(c.templates, function (imageId, q) {
			// некорректный код
			var imageName = imageId.match(/id_([0-9]{1,3})/)[1]
				,imageSrc = "../images/content/" + imageName + ".jpg"
				;
			
		
			var currentItemId = ".b-sliderMenu__item_"+imageId
				,currentItem = c.menu.find(currentItemId)
				,newPositionClassId = "b-list__row_" + imageId
				,newPosition = c.list.find(".b-list__row:first-child").clone()
				,newPositionDescriptionCart = newPosition.find(".b-description")
				;		
		
			newPosition.addClass(newPositionClassId);
			c.copyData(currentItem, newPositionDescriptionCart, [".b-description__header",".b-description__price"]);
			newPosition.find(".b-goodView__image").attr("src",imageSrc);
			c.list.find(".b-list").append(newPosition); 
			c.totalQuantity += 1;
			c.quantity.html("There are "+c.totalQuantity+" templates in cart");
			c.cartOpen.html("("+c.totalQuantity+") Cart");
			c.totalPrice += +(newPosition.find(".b-description__price").html());
			c.total.html("Total: " + c.totalPrice);
			newPosition.find(".b-deleteBtn").addClass("b-deleteBtn_shown");
		})
	}
		else {
			c.templates = {};
		}
}

	// Извлечение из imageSlider его Id
c.currentImageId = function () {
	var image = new Good(c.imageSlider)
		,imageId = image.getId()
		;
	c.imageId = imageId;
}

	// Проверка на статус (наличие) в массиве добавленных товаров
c.checkTemplates = function (imageId) {
	var inCart = false;
		$.each(c.templates, function (template, q) {
			if (template == imageId) {
				inCart = true;
			}
		});
	return inCart;
}

	// Вид кнопок состояния товара 
c.catallogView = function (imageId) {
	var checking = c.checkTemplates(imageId)
		;
	if (checking) {
		c.find(".b-goodInform__inCart").addClass("b-goodInform__inCart_shown");
		c.find(".b-orderForm__cart").addClass("b-orderForm__cart_noActive");
	}
	else {
		c.find(".b-goodInform__inCart").removeClass("b-goodInform__inCart_shown");
		c.find(".b-orderForm__cart").removeClass("b-orderForm__cart_noActive");
	}
}




// МЕТОДЫ ОТКРЫТИЯ И ЗАКРЫТИЯ ОКОН
	
	// Методы открытия и закрытия корзины 
c.showCart= function () {
	c.cart.addClass("b-container__cart_shown");
	c.total.html("Total: " + c.totalPrice);
	c.quantity.html("There are "+c.totalQuantity+" templates in cart");
};
c.closeCart = function (event) {
	if (!event || $(event.target).hasClass("b-container__cart")) {
		c.cart.removeClass("b-container__cart_shown");
	};
};
c.closeXCart = function () {
	c.cart.removeClass("b-container__cart_shown");
} 

	// Методы открытия и закрытия каталога 
c.showCatallog = function () {
	c.find(".b-slide__catallog").addClass("b-slide__catallog_shown");
} 
c.closeXCatallog = function () {
	c.find(".b-slide__catallog").removeClass("b-slide__catallog_shown");
};
c.closeCatallog = function (event) {
	if (!event || $(event.target).hasClass("b-slide__catallog")) {
		c.find(".b-slide__catallog").removeClass("b-slide__catallog_shown");
	};
};
	
	// Открытие и закрытие каталога с помощью клавиатуры
c.keyBoard = function (event) {
	if (event.which == 27) { // esc
		c.closeCatallog();
	}
	else if (event.which == 13) {  // enter
		c.showCatallog();
	}
};




// 	МЕТОДЫ ЗАГРУЗКИ КАТАЛОГА
	
	// Метод копирования картинки из слайдера в каталог
c.copyImage = function (){
	var srcImage = c.imageSlider.attr("src");
	c.imageCatallog.attr("src",srcImage);
}

	// Метод копирования информации из соответствующего идентификатору пункта меню
c.copyInfo = function (imageId) {
	var currentItemId = ".b-sliderMenu__item_"+imageId
		,currentItem = c.menu.find(currentItemId)
		;
	c.copyData(currentItem, c.descriptionCatallog, [".b-description__header",".b-description__text",".b-description__priceBlock"]);
	c.sign.html(currentItem.html());
}
	
	// Метод вставки информации в каталлог
c.pastInfo = function () {
	c.currentImageId();
	c.catallogView(c.imageId);
	c.copyInfo(c.imageId);
	c.copyImage();
	c.showCatallog();
}




// МЕТОДЫ ДОБАВЛЕНИЯ ТОВАРА В КОРЗИНУ

	// Изменение вида кнопок при добавлении товара в массив
c.addedView = function () {
	c.find(".b-goodInform__inCart").addClass("b-goodInform__inCart_shown");
	c.find(".b-orderForm__cart").addClass("b-orderForm__cart_noActive");
}

	// Метод копирования содержимого каталога в корзину
c.copyToCart = function (newPosition) {
	var currentTemplate = c.find(".b-description")
		,currentImageBlock = c.find(".b-goodView")
		,newPositionDescriptionCart = newPosition.find(".b-description")
		,newPositionImageBlockCart = newPosition.find(".b-goodView")
		;

	c.copyData(currentTemplate, newPositionDescriptionCart, [".b-description__header",".b-description__priceBlock"]);
	c.copyData(currentImageBlock, newPositionImageBlockCart, [".b-goodView__image"]);
}
	
	// Метод создания новой строки в корзине
c.newPositionInCart = function (newPositionClassId) {
			var newPosition = c.list.find(".b-list__row:first-child").clone()
				;
			newPosition.addClass(newPositionClassId);
			c.copyToCart(newPosition);
			c.list.find(".b-list").append(newPosition); 
			c.totalQuantity += 1;
			c.quantity.html("There are "+c.totalQuantity+" templates in cart");
			c.cartOpen.html("("+c.totalQuantity+") Cart");
			c.totalPrice += +(newPosition.find(".b-description__price").html());
			c.total.html("Total: " + c.totalPrice);
			newPosition.find(".b-deleteBtn").addClass("b-deleteBtn_shown");
			c.bindCartEvents(newPosition);
}

	// Метод добавления товара в корзину 	
c.addToCart = function (event) {
	event.preventDefault();
	var newPositionClassId = "b-list__row_" + c.imageId
		,existingPosition = c.list.find("." + newPositionClassId)
		;
		if(existingPosition.length) {
			alert("This template is already in Cart!");
		}
		else {
			c.newPositionInCart(newPositionClassId);
			c.templates[c.imageId] = "0";
			$.cookie("cartTemplates",c.templates,{"expires":7,"path":"/"});
			c.addedView();
		}	
}


			


// МЕТОДЫ ИЗМЕНЕНИЯ КОЛИЧЕСТВА ТОВАРА 
c.bindCartEvents = function (newPosition) {
	newPosition.find(".b-deleteBtn").bind("click", c.delPosition).end();
}

c.delPosition = function () {
	var delItem = $(this).closest(".b-list__row")
		,delPosition = new Good (delItem)
		,imageId = delPosition.getId()
		;
			delete c.templates[c.imageId];
			$.cookie("cartTemplates",c.templates,{"expires":7,"path":"/"});
			c.totalPrice -= +(delItem.find(".b-description__price").html());
			c.total.html("Total: " + c.totalPrice);
			c.totalQuantity -= 1;
			c.cartOpen.html("("+c.totalQuantity+") Cart");
			c.quantity.html("There are "+c.totalQuantity+" templates in cart");
			delItem.remove();
			$(this).removeClass("b-deleteBtn_shown");
}

	


// ОСНОВНОЙ МЕТОД КЛАССА
c.main = function () {

c.init(sCatallogSelector);
	c.catallog = c.find(".b-slide__catallog");
	c.imageSlider = c.find(".b-slide__image_active");
	c.cartOpen = c.find(".b-container__cartButton");
	c.descriptionCatallog = c.find(".b-description");
	c.imageCatallog = c.find(".b-goodView__image");
	c.sign = c.find(".b-goodView__sign");
	c.closeCatallogBut = c.find(".b-container__close");
	c.addCartButton = c.find(".b-orderForm__cart");

c.menu = $(sMenuSelector);

c.cart = $(sCartSelector);
	c.list = c.cart.find(".b-cart__list"); // див, содержащий весь список товаров корзины
	c.descriptionCart = c.cart.find(".b-description");
	c.imageCart = c.cart.find(".b-goodView");
	c.order = c.cart.find(".b-cart__order"); // кнопка заказать
	c.total = c.cart.find(".b-cart__total"); // общая стоимость
	c.quantity = c.cart.find(".b-cart__quantity"); // общее количество товаров
	c.closeCartBut = c.cart.find(".b-container__close"); // кнопка зыкрытия корзины
	
$.cookie.json = true;
c.totalPrice = 0;
c.totalQuantity = 0;
c.imageId = "";
c.templates = {};
	
	//$.cookie("cartTemplates",c.templates,{"expires":7,"path":"/"});
	c.loadCookies();
	c.catallogView(c.imageID);
	c.imageSlider.click(c.pastInfo);
	c.catallog.click(c.closeCatallog);
	c.closeCatallogBut.click(c.closeXCatallog);
	c.cartOpen.click(c.showCart);
	c.closeCartBut.click(c.closeXCart);
	c.cart.click(c.closeCart);
	c.addCartButton.click(c.addToCart);
}

	
$("body").keyup(c.keyBoard);
$(document).ready(c.main);

}

CartCatallog.prototype = new Component ();





// 
// 
// function Cart (sCatallogSelector,sCartSelector) {
// var c = this;
// 
// // Метод добавления товара в корзину
// c.add = function (event) { 
// 	event.preventDefault();
// 	var orderForm = $(this) // при событии submit в this попадает вся форма, а не только кнопка (как, например, при клике)
// 		,currentGood = orderForm.closest(".b-good") // строка таблицы с товаром, соответствующим форме, на которую кликнули
// 		,addedGood = c.put(currentGood) // используя метод c.put, добавляем соответствующий товар в корзину
// 		;
// // 	c.list.stop().slideDown(); // разворачиваем список товаров корзины
// 	c.list.show();
// 	c.goods[addedGood.getId()] = orderForm.find(".b-order-form__quantity").val(); // дополняем наш некий массив элементом с ключом-идентификатором и значением-количеством
// 	$.cookie("cartGoods",c.goods,{"expires":7,"path":"/"}); // записывает в куки наш товар
// 
// // 	c.cart.find('.b-goods_total-price').html('Total: ' + c.totalPrice);
// }
// 
// // Метод размещения в списке корзины
// c.put = function (currentGood) { 
// 	var addedGood = new Good (currentGood) // получаем доступ к классу Good и его методам
// 		,good_id_class = "b-good_id_" + addedGood.getId()
// 		,existingGood = c.list.find("."+good_id_class)
// 		;
// 	currentGood.addClass("b-good_in-cart");
// 		if (existingGood.length) { // если этот товар уже существует, просто перезаписываем его
// // 			c.totalPrice -= (existingGood.find('.b-order-form__quantity').val() * existingGood.find('.b-good__price').html());
//             c.copyData(currentGood, existingGood, ['.b-order-form__quantity']);
// //          c.totalPrice += (existingGood.find('.b-order-form__quantity').val() * existingGood.find('.b-good__price').html());
// 		}
// 		else {
// 			var newGood = c.list.find(".b-good:first-child").clone() // если такого товара еще нет, то дублируем первую пустую строку корзины и начинаем записывать в нее информацию
// 				;
// 			newGood.addClass(good_id_class);
// 			c.copyData(currentGood, newGood, [".b-good__image",".b-good__name",".b-good__price",".b-order-form__quantity"]);
// 			c.list.find(".b-goods_cart").append(newGood); // в корзине находим в списке товаров саму таблицу и последним элементом таблицы добавляем нашу новую строку, новый товар
// 			c.bindMinicartEvents(newGood);
// // 			c.totalPrice += (newGood.find('.b-order-form__quantity').val() * newGood.find('.b-good__price').html());
// 		}
// 	
// 	return addedGood;
// }
// 
// // Загрузка товара из cookie
// c.load = function () {
// 	c.goods = $.cookie("cartGoods");
// 	console.log(c.goods);
// 	if (c.goods) {
// 		$.each(c.goods, function(goods_id, quantity) {
//                 var currentGood = c.find('.b-good_id_' + goods_id);
//                 currentGood.find('.b-order-form__quantity').val(quantity);
//                 c.put(currentGood);
//             });
// 		
// 	}
// 	else {c.goods = {};}
// }
// 

// c.del = function () {
// 	var currentGood = $(this).closest(".b-good")
// 		,delGood = new Good (currentGood)
// 		,goodId = delGood.getId()
// 	;
// // 	c.totalPrice -= (currentGood.find('.b-order-form__quantity').val() * currentGood.find('.b-good__price').html());
// //  c.cart.find('.b-goods_total-price').html('Total: ' + c.totalPrice);
// 	c.list.find('.b-good_id_' + goodId).remove();
// 	c.find('.b-good_id_' + goodId).removeClass("b-good_in-cart");
// 	delete c.goods[goodId];
// 	$.cookie("cartGoods",c.goods,{"expires":7,"path":"/"});
// }
// 
// 
// c.bindMinicartEvents = function(newGood){
//  // 58. назначаем на элементы первой строки корзины (муляж - всё пустое) методы, как и в каталоге (+,-), и плюс к этому - удаление товара
//  
//  //59 .end() - встроенный метод jQuery, который позволяет не дублировать объект newGood? в котором ищем элемент и назначаем на него метод
//  newGood
//   .find('.b-good__delete').bind('click', c.del).end() // встроенный метод, который позволяет не дублировать объект newGood в котором ищем элемент и назанчаем на него метод
//   .find('.b-order-form__plus').bind('click', c.increaseQuantity).end()
//   .find('.b-order-form__minus').bind('click', c.decreaseQuantity).end()
//   .find('.b-order-form').bind('submit',c.add).end()
//   ;
//  }
// 
// 
// c.main = function () {
// 	c.init(sCatallogSelector); // попадает в компонент и его методы
// 	
// 	
// 	c.cart = $(sCartSelector); // напрямую обращаемся к корзине
// 	c.list = c.cart.find(".b-cart__list"); // див, содержащий весь список товаров корзины
// //	c.button = c.cart.find(".b-cart__button"); // кнопка, показывающая и скрывающая корзину
// 	c.order = c.cart.find(".b-cart__order"); // кнопка заказать
// 	c.total = c.cart.find(".b-cart__total"); // общая стоимость
// 	c.quantity = c.cart.find(".b-cart__quantity"); // общее количество товаров
// 	
// 	c.totalPrice = 0;
// 	$.cookie.json = true;
// 	c.goods = {};
// 	
// 		
// 	// 	c.load();
// // 		c.find(".b-order-form").bind("submit", c.add);
// // 		c.button.click(c.openCart);
// // 		c.find(".b-order-form__plus").bind("click",c.increaseQuantity);
// // 		c.find(".b-order-form__minus").bind("click",c.decreaseQuantity);
// // 		
// }
// 
// 	
// $(document).ready(c.main);
// 
// }
// 
// Cart.prototype = new Component ();
// 








