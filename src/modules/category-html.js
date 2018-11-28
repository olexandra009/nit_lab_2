let _makeHtml = ({
	id,
	name,
	
	description,

}) => {

	let $category = $(`<div class="drop-item category_list" data-category-id="${id}">`);
	
	$category.append($(`<p>`).text(name));
	return $category;
};

module.exports = _makeHtml;