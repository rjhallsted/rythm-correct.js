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
	var baselineHeight, unitOfMeasurement;
	//unitOfMeasurement defaults to px

	function getSetUp( jqueryElement ) {
		var setUpObject = {};
		setUpObject.transformSettings = jqueryElement.css('transform');

		if( setUpObject.transformSettings ) {
			jqueryElement.css('transform', 'none' );
		}

		setUpObject.currentHeight = jqueryElement.outerHeight();
		setUpObject.marginbottom = parseInt( jqueryElement.css( 'margin-bottom' ) );
		return setUpObject;
	}

	function adjustRythmCss( jqueryElement, setUpObject ) {
		jqueryElement.css('display', 'block');

		if( setUpObject.currentHeight % baselineHeight !== 0 ) {
			var difference = baselineHeight - ( setUpObject.currentHeight % baselineHeight );
			var newMargin = setUpObject.marginbottom + difference;

			if( unitOfMeasurement == 'rem' ) {
				var remBase = parseInt( $( 'html' ).css( 'font-size' ) );
				newMargin /= remBase;
				jqueryElement.css( 'margin-bottom', newMargin + 'rem' );
			} else {
				jqueryElement.css( 'margin-bottom', newMargin + 'px' );
			}
		}

		if( setUpObject.transformSettings ) {
			jqueryElement.css('transform', setUpObject.transformSettings );
		}
	}

	function adjustMargin( jqueryElement ) {
		var setUpObject = getSetUp( jqueryElement );
		adjustRythmCss( jqueryElement, setUpObject );
	}

	function addResizeListener( jqueryElement ) {
		jqueryElement.resize( function() {
			setTimeout(function (element) {
				adjustMargin( element );
			}, 50, jqueryElement);
		});
	}

	function adjust( jqueryElement ) {
		adjustMargin( jqueryElement );
		addResizeListener( jqueryElement );
	}

	$.fn.correctRythm = function( passedBaselineHeight, passedUnitOfMeasurement) {
		baselineHeight = passedBaselineHeight;
		unitOfMeasurement = passedUnitOfMeasurement;

		this.one('load', function() {
			adjust( $(this) );
		});
		$.each(this, function() {
			if( this.complete ) $(this).trigger('load');
		});

		return this;
	};

} (jQuery) );

jQuery( document ).ready( function($) {
	$( '.rythm-correct' ).correctRythm( 24, 'rem' );
} );
