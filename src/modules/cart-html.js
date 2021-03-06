let _makeHtml = ({
	id,
	name,
	image_url,
	price,
    special_price,
}) => {
	let $cart_product = $(`<div class="production" data-product-id="${id}">`);
	let $product_row = $(`<div class="product_row row">`);
	let $image =  $(`<div class="cart_img_cont">`);
	$image.append($(`<img src="${image_url}" class="cart_img product-click-image" alt="${name}">`));
	$product_row.append($image);
	$product_row.append($(`<span class="cart_product-title title-on-card">`).text(name));
	let $prices = $(`<div class="cart_price row col-3">`);

	$prices.append($(`<span class="cart_product-special-price">`).text(special_price));
	if(special_price!=null){
			$prices.append($(`<span class="cart_product-price special">`).text(price));
	} else{
			$prices.append($(`<span class="cart_product-price">`).text(price));
	}
	$product_row.append($(`<input type="number" value="1" class="input_value" id= "value_${id}">`));
	$product_row.append($prices);
	$product_row.append($(`<button type="button" class="cancel btn btn-outline-danger">`).text("Відмінити"));
	$cart_product.append($product_row);

	return $cart_product;
};
module.exports = _makeHtml;