let _makeHtml = ({
	id,
	name,
	description,

}) => {
	let $productView = $(`<p data-product-id="${id}">`);
	$productView.append($(`<span class="product-title">`).text(name));
	//$productView.append($(`<button class="product-buy btn btn-outline-success ">`).text("Купити"));
  //	$product.append('<span class="product-title">gjd</span>');
	return $productView;
};

module.exports = _makeHtml;