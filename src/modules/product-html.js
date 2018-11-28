let _makeHtml = ({
	id,
	name,
	image_url,
	description,
	price,
	special_price,
}) => {
	let $product = $(`<div class="card production col-xs-12 col-sm-4 col-md-3" data-product-id="${id}" 
		data-product-price="${price}"  data-product-special="${special_price}"
		data-product-img="${image_url}" data-product-name="${name}">`);
	$product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
	$product.append($(`<span class="product-title">`).text(name));
	let $prices = $(`<div class="price row">`);

	$prices.append($(`<span class="product-special-price">`).text(special_price));
	if(special_price!=null){
			$prices.append($(`<span class="product-price special">`).text(price));
	} else{
			$prices.append($(`<span class="product-price">`).text(price));
	}
	$product.append($prices);
	$product.append($(`<button class="product-buy btn btn-outline-success ">`).text("Купити"));
//    $product.append($(`<button class="product-want btn btn-outline-secondary ">`).text("Бажання"));


	return $product;
};

module.exports = _makeHtml;