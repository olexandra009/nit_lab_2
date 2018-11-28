import 'bootstrap';
import './scss/main.scss'; 

console.log(`The time is ${new Date()}`);
require('./modules/hello')('NIT');
var _foo = require('./modules/hello');
_foo('user1');
_foo('user2');
// 	// with JS!!
// import 'bootstrap/dist/css/bootstrap.min.css';	// only minified CSS

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
let _makeProduct = require('./modules/product-html');

jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/product/list',
	method: 'get',
	dataType: 'json',
	success: function(json){
		console.log('Loaded via AJAX!');
		// console.log(json);
		console.table(json);
		json.forEach(product => $('.product-grid').append(_makeProduct(product)));
		console.log('Added to grid');
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},

});

let _makeCategory = require('./modules/category-html');

jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/category/list',
	method: 'get',
	dataType: 'json',
	success: function(json){
		console.log('Loaded via AJAX!');
		// console.log(json);
		console.table(json);
		json.forEach(category => $('.category').append(_makeCategory(category)));
		console.log('Added to grid');
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},

});

let _makeCategoryDescription = require('./modules/category-description-html');

$(document).on('click', '.category_list', function(){
    var categoryId =$(this).data('categoryId'); 
    console.log(categoryId);
$( ".product-grid" ).empty();
$( ".insite" ).empty();


jQuery.ajax({
	url: ('https://nit.tron.net.ua/api/category/'+categoryId),
	method: 'get',
	dataType: 'json',
	success: function(json){
		console.log('Loaded via AJAX!');
		// console.log(json);
		console.table(json);
	   $('.insite').append(_makeCategoryDescription(json));
		 
		console.log('Added to grid');
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
		console.log('Loaded via AJAX!');
		// console.log(json);
		console.table(json);
		json.forEach(product => $('.product-grid').append(_makeProduct(product)));
		console.log('Added to grid');
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},

});
});

//


$(document).on('click', '.product-image', function(){
    var productID =$(this).closest('.card').data('productId'); 
    console.log( productID);
let _makeProductView = require('./modules/product-window-html');

$( ".product-grid" ).empty();
$( ".insite" ).empty();
jQuery.ajax({
	url: ('https://nit.tron.net.ua/api/product/'+productID),
	method: 'get',
	dataType: 'json',
	success: function(json){
		console.log('Loaded via AJAX!');
		// console.log(json);
		console.table(json);
	   $('.insite').append(_makeProductView(json));
		 
		console.log('Added to grid');
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},

});



});



$(document).on('click', '.product-buy', function(){
	var productArray=[];
	var prod ={
		id: $(this).closest('.production').data('productId'), 
	    name:  $(this).closest('.production').data('productName'), 
	    image_url: $(this).closest('.production').data('productImg'), 
	    price: $(this).closest('.production').data('productPrice'), 
	    special_price: $(this).closest('.production').data('productSpecial'), 
	}
	console.log("HERE products "+prod);
	if(localStorage.getItem('productToCart')!==null){
			console.log("HERE products "+ localStorage.getItem('productToCart'));
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
   //localStorage.setItem('prod', JSON.stringify(product));
   });

var div = document.getElementById('cart');
$(document).on('click', '.cart_button', function(){
	createCart();
	div.className= "cart_background visible";
});
$(document).on('click', '.shopping_button', function(){
	
	div.className= "cart_background hidden";
});

let _makeCart = require('./modules/cart-html'); 

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

$(document).on('click', '.cancel', function(){
	  var productID =$(this).closest('.production').data('productId'); 
	  if(localStorage.getItem('productToCart')!==null){
       var products = JSON.parse(localStorage.getItem('productToCart'));
	  }
	  var newProducts =[];
	  for (var i =products.length - 1; i >= 0; i--) {
	  	//console.log(products[i]);
	  	//console.log(productID);
	    //console.log(products[i].id);
	    if(products[i].id!==productID){
	    	console.log('TRUE');
	    	newProducts.push(products[i]);
	    }
	  }
	 localStorage.setItem('productToCart', JSON.stringify(newProducts));
	 createCart();
	});
var firstButton = document.getElementById('except');
	var secondButton = document.getElementById('send');

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