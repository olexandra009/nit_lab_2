import 'bootstrap';
import './scss/main.scss'; 

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
let _makeProduct = require('./modules/product-html');

//create list of all products
function makingAllProductsList(){
jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/product/list',
	method: 'get',
	dataType: 'json',
	success: function(json){
		
		json.forEach(product => $('.product-grid').append(_makeProduct(product)));
	
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},

});
}
makingAllProductsList();

let _makeCategory = require('./modules/category-html');
//make list categories
jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/category/list',
	method: 'get',
	dataType: 'json',
	success: function(json){
	
		json.forEach(category => $('.category').append(_makeCategory(category)));
		
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},

});

let _makeCategoryDescription = require('./modules/category-description-html');
$(document).on('click','.navbar-brand', function(){
	$('.insite').empty();
	$( ".product-grid" ).empty();
	$(".category_description").empty();

	makingAllProductsList();
})
//make list products of category all
$(document).on('click', '.category_list_all_products', function(){
	$('.insite').empty();
	$( ".product-grid" ).empty();
	$(".category_description").empty();
makingAllProductsList();
	});
//make list products of category
$(document).on('click', '.category_list', function(){
    var categoryId =$(this).data('categoryId'); 
    console.log(categoryId);
$( ".product-grid" ).empty();
$( ".insite" ).empty();
$(".category_description").empty();

jQuery.ajax({
	url: ('https://nit.tron.net.ua/api/category/'+categoryId),
	method: 'get',
	dataType: 'json',
	success: function(json){
		
	   $('.insite').append(_makeCategoryDescription(json));
	
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},

});



jQuery.ajax({
	url: ('https://nit.tron.net.ua/api/product/list/category/'+categoryId),
	method: 'get',
	dataType: 'json',
	success: function(json){
		
		json.forEach(product => $('.product-grid').append(_makeProduct(product)));
		
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},

});
});

//open product in window
$(document).on('click', '.product-click-image', function(){
    var productID =$(this).closest('.production').data('productId'); 
 wishDiv.className= "cart_background hidden";
	div.className= "cart_background hidden";
windowViewProduct(productID);

});
$(document).on('click', '.title-on-card', function(){
    var productID =$(this).closest('.production').data('productId'); 
 wishDiv.className= "cart_background hidden";
	div.className= "cart_background hidden";
windowViewProduct(productID);

});
//function for opening product in window
function windowViewProduct(productID){

 let _makeProductView = require('./modules/product-window-html');
    $('.insite').empty();
	$( ".product-grid" ).empty();
	$(".category_description").empty();
jQuery.ajax({
	url: ('https://nit.tron.net.ua/api/product/'+productID),
	method: 'get',
	dataType: 'json',
	success: function(json){
		
	   $('.insite').append(_makeProductView(json));
		
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},

});


}
//add product to cart
$(document).on('click', '.product-buy', function(){
	var productArray=[];
	var prod ={
		id: $(this).closest('.production').data('productId'), 
	    name:  $(this).closest('.production').data('productName'), 
	    image_url: $(this).closest('.production').data('productImg'), 
	    price: $(this).closest('.production').data('productPrice'), 
	    special_price: $(this).closest('.production').data('productSpecial'), 
	}

	if(localStorage.getItem('productToCart')!==null){
		productArray=JSON.parse(localStorage.getItem('productToCart'));}
		var f = true;
	    for (var i = productArray.length - 1; i >= 0; i--) {
	    	if(parseInt(productArray[i].id)==parseInt(prod.id)){ f = false; break;}
	    }
	    if(f){
	     alert('Add to cart');
		productArray.push(prod);
		localStorage.setItem('productToCart', JSON.stringify(productArray));
	}else{
	alert('had already added to cart');}
   });
//add products to wish-list
$(document).on('click', '.product-want', function(){
	var productWantArray=[];
	var prod ={
		id: $(this).closest('.production').data('productId'), 
	    name:  $(this).closest('.production').data('productName'), 
	    image_url: $(this).closest('.production').data('productImg'), 
	    price: $(this).closest('.production').data('productPrice'), 
	    special_price: $(this).closest('.production').data('productSpecial'), 
	}
	if(localStorage.getItem('productToWishList')!==null){
		productWantArray=JSON.parse(localStorage.getItem('productToWishList'));}
		var f = true;
	    for (var i = productWantArray.length - 1; i >= 0; i--) {
	    	if(parseInt(productWantArray[i].id)==parseInt(prod.id)){ f = false; break;}
	    }
	    if(f){
	     alert('Add to wish-list');
		productWantArray.push(prod);
		localStorage.setItem('productToWishList', JSON.stringify(productWantArray));
	}else{
	alert('had already added to wish-list');}
  
   });

//containers for cart and wish-list
var div = document.getElementById('cart');
var wishDiv = document.getElementById('wish');
//product in cart view
$(document).on('click', '.cart_button', function(){
	createCart();
	div.className= "cart_background visible";
});
//product in wish-list view
$(document).on('click', '.wish_button', function(){
	createWishCart();
	wishDiv.className= "cart_background visible";
});
//button for hidden wish-list and cart view
$(document).on('click', '.shopping_button', function(){
	wishDiv.className= "cart_background hidden";
	div.className= "cart_background hidden";
});

let _makeCart = require('./modules/cart-html'); 
//function for creating cart
function createCart(){
	$( ".products-cart-grid" ).empty();
	var priceAll = 0;
	if(localStorage.getItem('productToCart')!==null){
  var products = JSON.parse(localStorage.getItem('productToCart'));
 if(products.length!==0){
  products.forEach(cart_product => {$('.products-cart-grid').append(_makeCart(cart_product)); if(cart_product.special_price!=null){priceAll+=parseInt(cart_product.special_price);}else{priceAll+=parseInt(cart_product.price);} }); 
}else{
	$('.products-cart-grid').append(`<span>NO PRODUCTS</span>`);
}
}else {
	$('.products-cart-grid').append(`<span>NO PRODUCTS</span>`);
}
$('.summary_class').empty();
 $('.summary_class').text(priceAll);
}

let _makeWish = require('./modules/wish-html')
//function for creating wish-list
function createWishCart(){
	$( ".products-wish-grid" ).empty();

	if(localStorage.getItem('productToWishList')!==null){
  var products = JSON.parse(localStorage.getItem('productToWishList'));
 if(products.length!==0){
  products.forEach(cart_product => $('.products-wish-grid').append(_makeWish(cart_product))); 
}else{
	$('.products-wish-grid').append(`<span>NO PRODUCTS</span>`);
}
}else {
	$('.products-wish-grid').append(`<span>NO PRODUCTS</span>`);
}
}
//to delete product from cart
$(document).on('click', '.cancel', function(){
	  var productID =$(this).closest('.production').data('productId'); 
	  if(localStorage.getItem('productToCart')!==null){
       var products = JSON.parse(localStorage.getItem('productToCart'));
	  }
	  var newProducts =[];
	  for (var i =products.length - 1; i >= 0; i--) {
	    if(products[i].id!==productID){
	    	console.log('TRUE');
	    	newProducts.push(products[i]);
	    }
	  }
	 localStorage.setItem('productToCart', JSON.stringify(newProducts));
	 createCart();
	});
//to delete product from wish-list
$(document).on('click', '.cancel_wish', function(){
	  var productID =$(this).closest('.production').data('productId'); 
	  if(localStorage.getItem('productToWishList')!==null){
       var products = JSON.parse(localStorage.getItem('productToWishList'));
	  }
	  var newProducts =[];
	  for (var i =products.length - 1; i >= 0; i--) {
	    if(products[i].id!==productID){
	    	console.log('TRUE');
	    	newProducts.push(products[i]);
	    }
	  }
	 localStorage.setItem('productToWishList', JSON.stringify(newProducts));
	 createWishCart();
	});

var firstButton = document.getElementById('except');
var secondButton = document.getElementById('send');
//function for making order
$(document).on('click', '.checkout_button', function(){
  if(localStorage.getItem('productToCart')===null||JSON.parse(localStorage.getItem('productToCart')).length===0){	
	alert('No products in the cart');
	}else{
	var form = document.getElementById('form');
	
	form.className= "form visible";
	firstButton.className = "btn btn-outline-success my-2 my-sm-0 checkout_button hidden";
	secondButton.className = "btn btn-outline-success my-2 my-sm-0 send_button visible";

}
});


//function for send order and check form
$(document).on('click', '.send_button', function(){
if(localStorage.getItem('productToCart')===null||JSON.parse(localStorage.getItem('productToCart')).length===0){	
	alert('No products in the cart');
return;}
var formName =document.getElementById('name');
var name = formName.value;
if(name==''||name==null) {alert('Write your name'); return;}
var formTel =  document.getElementById('tel')
var tel =formTel.value;
if(tel.length == 13){
	if(tel[0]!=='+') {alert('Wrong number'); return;}
	else{
		for (var i = tel.length - 1; i >0; i--) {
			if(isNaN(tel[i])){alert('Wrong number'); return;}
					}
	}
} else  {alert('Wrong number. Please write in format +38000000000'); return;}
console.log(email);

var formEmail = document.getElementById('email');
var email = formEmail.value;

if(email==''||email==null||email.length<3){
	alert('Write your email in format *@*');
	return;}

if(email[email.length-1]=='@'||email[0]=='@'){alert('Write your email in format *@*'); return;}

var so = true;
for (var i = email.length - 1; i >= 0; i--) {
	if(email[i]=='@'){so=false; break;}

} 
if(so) {alert('Write your email in format *@*'); return;}
if(JSON.parse(localStorage.getItem('productToCart'))==''&&localStorage.getItem('productToCart')==null){alert('No products'); return;}
var lineName='name='+name+'&';
var lineEmail='email='+email+'&';
var phone='phone='+tel+'&';
   var array = JSON.parse(localStorage.getItem('productToCart'));
   var prod='';
   for (var i = array.length - 1; i > 0; i--) {
   	var value = document.getElementById('value_'+array[i].id).value;
   	prod+='product['+array[i].id+']='+value+'&';
   	
   }
   var value = document.getElementById('value_'+array[0].id).value;
   prod+='products['+array[0].id+']='+value;
   var token ='token=8zDfvZgvv_v8s6eq0GlI&';
var data=token+lineName+lineEmail+phone+prod;
console.log(data);
$.ajax({
    url: 'https://nit.tron.net.ua/api/order/add',
    method: 'post',
    data: data,
    dataType: 'json',
    success: function(json){
        console.log(json);
        if(json.status == "error"){
        	console.log(json.errors);
        	  if(json.errors.email!=null){
        		alert(json.errors.email);
        	} else{
        		alert("Smth went wrong");
        	}
        }else{
        	alert("Thank you for your order");
        	localStorage.removeItem('productToCart');
        	createCart();
            formName.value="";
            formEmail.value="";
            formTel.value="";
            form.className= "form hidden";
	firstButton.className = "btn btn-outline-success my-2 my-sm-0 checkout_button visible";
	secondButton.className = "btn btn-outline-success my-2 my-sm-0 send_button hidden";

        }

    },

    error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},

});

	});