/*
 *This script assumes a few things about your css.
 * It assumes you have implemented a vertical baseline, which is a set number
 * It assumes that your font-size and line-heights have a specific 
 * relationship.
 * It assumes that you have used margin-bottom, with said typography, to 
 * make sure the page stays consistent with your vertical rythm.
 * It assumes you are using padding to add whitespace below elements, not
 * margin.
 *
 *The aim of this script is to add margin to elements with flexible heights, 
 *in order to maintain vertical rythm.
*/

var baselineHeight = 24; //define your baseline height, in pixels, here.
var unitOfMeasurement = 'rem' //put your unit of measurement here. Either 'px' or 'rem'. Defaults to px.

$( window ).ready( function() {
	$( '.rythm-correct' ).correctRythm();
} );

jQuery.fn.extend( function() {
	//return an object containing the 
	getSetUp: function() {
		var setUpObject;
		setUpObject.currentHeight = $( this ).outerHeight(true);
		// setUpObject.fontsize = parseInt( $( this ).css( 'font-size' ) );
		// setUpObject.lineheight = parseInt( $( this ).css( 'line-height' ) );
		setUpObject.marginbottom = parseInt( $(this).css( 'margin-bottom' ) );
		return setUpObject;
	}
	adjustRythmCss: function( setUpObject ) {
		if( setUpObject.currentHeight % baselineHeight !== 0 ) {
			var difference = setUpObject.currentHeight % baselineHeight;
			var newMargin = setUpObject.marginbottom + difference;
			if( unitOfMeasurement == 'rem' ) {
				var remBase = $( 'html' ).css( 'font-size' );
				newMargin = newMargin / remBase;
				$( this ).css( 'margin-bottom', newMargin + 'rem' );
			} else {
				$( this ).css( 'margin-bottom', newMargin + 'px' );
			}
		} 
	}
	correctRythm: function() {
		var setUpObject = $( this ).getSetUp();
		$( this ).adjustRythmCss( setUpObject );
		$( this ).addResizeListener( setUpObject );
	}
	addResizeListener: function( setUpObject ) {
		$( window ).resize( function() {
			$( this ).adjustRythm( setUpObject );
		}, 50 );
	}
} );