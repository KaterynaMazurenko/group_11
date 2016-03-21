function Good (oGoodElement) { // tr с данными о товаре
	var g = this;
	g.elem = oGoodElement;
	
	g.getId = function () {
		return g.elem.attr("class").match(/id_([0-9]{1,11})/)[1]; // метод возвратит массив, первым элементов которого будет вся строка, соответствующая РВ, а вторым - то, что в скобках, и далее берем второй (с номером 1) элемент этого массива 
	};
}



function Cart (sCatallogSelector,sCartSelector) {
var c = this;
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
// c.increaseQuantity = function () {
// 	c.changeQuantity(this,1);
// }
// 
// c.decreaseQuantity = function () {
// 	c.changeQuantity(this,-1);
// }
// 
// c.openCart = function(event) {
//         c.list.stop().slideToggle();
// };
// 
// c.changeQuantity = function (oBtn,iShift) {
// 	var quantityTextField = $(oBtn).siblings(".b-order-form__quantity")
// 		,currentQuantity = parseInt(quantityTextField.val()) + iShift;
// 		;
// 		if (currentQuantity > 0) {
// 			quantityTextField.val(currentQuantity);
// 			}
// 		else{
// 			alert("Error!");
// 		}
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
// 	c.list = c.cart.find(".b-minicart__list"); // див, содержащий весь список товаров корзины
// 	c.button = c.cart.find(".b-minicart__button"); // кнопка, показывающая и скрывающая корзину
// 	c.order = c.cart.find(".b-minicart__order"); // кнопка заказать
// 	c.total = c.cart.find(".b-minicart__total"); // общая стоимость
// 	c.quantity = c.cart.find(".b-minicart__quantity"); // общее количество товаров
// 	
// 	c.totalPrice = 0;
// 	$.cookie.json = true;
// 	c.goods = {};
// 	
// 		
// 		c.load();
// 		c.find(".b-order-form").bind("submit", c.add);
// 		c.button.click(c.openCart);
// 		c.find(".b-order-form__plus").bind("click",c.increaseQuantity);
// 		c.find(".b-order-form__minus").bind("click",c.decreaseQuantity);
// 		
// }

	
$(document).ready(c.main);

}

Cart.prototype = new Component ();