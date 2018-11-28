let _makeHtml = ({
	id,
	name,
	image_url,
	description,
	price,
	special_price,
}) => {
	let $productView = $(`<div class="container  production" data-product-id="${id}" 
		data-product-price="${price}"  data-product-special="${special_price}"
		data-product-img="${image_url}" data-product-name="${name}">`);
	let $image = $(`<div class="container photo_description col-xs-12 col-md-4 col-xl-4">`);
	$productView.append($(`<h1 class="product-title">`).text(name));
	$image.append($(`<img src="${image_url}" alt="${name}" class="col-12">`));
    $image.append($(`<span class="special_price">`).text(special_price));
    if(special_price==null){
    $image.append($(`<span class="price">`).text(price));
} else {
	  $image.append($(`<span class="price special">`).text(price));
}
    $image.append($(`<button class="product-buy btn btn-outline-success col-12">`).text("Купити"));

    $productView.append($image);


	$productView.append($(`<p class="product-description">`).text(description));
  //	$product.append('<span class="product-title">gjd</span>');
	return $productView;
};

module.exports = _makeHtml;