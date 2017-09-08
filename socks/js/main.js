$(function() {
	masonryGrid();
	$(window).on('load', function(){
		masonryGrid();
	})
})

function masonryGrid(){
	$('.grid').masonry({
	  // set itemSelector so .grid-sizer is not used in layout
	  itemSelector: '.grid-item',
	  // // use element for option
	  // columnWidth: '.grid-sizer',
	  // percentPosition: true
	})
}