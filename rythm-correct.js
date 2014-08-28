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

(function( $ ) {
	var baselineHeight = 24; //define your baseline height, in pixels, here.
	var unitOfMeasurement = 'rem' //put your unit of measurement here. Either 'px' or 'rem'. Defaults to px.

	getSetUp =  function( jqueryElement ) {
		var setUpObject = {};
		setUpObject.currentHeight = jqueryElement.outerHeight(true);
		setUpObject.marginbottom = parseInt( jqueryElement.css( 'margin-bottom' ) );
		return setUpObject;
	};
	adjustRythmCss =  function( jqueryElement, setUpObject ) {
		if( setUpObject.currentHeight % baselineHeight !== 0 ) {
			var difference = baselineHeight - ( setUpObject.currentHeight % baselineHeight );
			var newMargin = setUpObject.marginbottom + difference;
			if( unitOfMeasurement == 'rem' ) {
				var remBase = parseInt( $( 'html' ).css( 'font-size' ) );
				newMargin = newMargin / remBase;
				jqueryElement.css( 'margin-bottom', newMargin + 'rem' );
			} else {
				jqueryElement.css( 'margin-bottom', newMargin + 'px' );
			}
		} 
	};
	adjustMargin = function( jqueryElement ) {
		var setUpObject = getSetUp( jqueryElement );
		adjustRythmCss( jqueryElement, setUpObject );
	}
	addResizeListener = function( jqueryElement ) {
		jqueryElement.resize( function() {
			adjustMargin( jqueryElement );
		}, 50)
	}
	$.fn.correctRythm = function() {
		this.each( function() {
			if( $( this )[0].localName == 'img' ) {
				$( this ).load( function() {
					adjustMargin( $( this ) );
					addResizeListener( $( this ) );
				} );
			} else {
				adjustMargin( $( this ) );
				addResizeListener( $( this ) );
			}
		} );
		return this;
	};
} (jQuery) );

jQuery( window ).ready( function($) {
	$( '.rythm-correct' ).correctRythm();
} );