// Autosize 1.13 - jQuery plugin for textareas
// (c) 2012 Jack Moore - jacklmoore.com
// license: www.opensource.org/licenses/mit-license.php

(function ($) {
	var hiddenDivCss = {
  		'display': 'none',
  		'white-space': 'pre-wrap',
    	//'min-height': '50px',
    	'word-wrap': 'break-word'
	};

	var hiddenDivClass = 'autosize-hidden';

	$.fn.autosize = function (options) {
		// options = $.extend({}, defaults, options || {});

		return $(this).each(function () {
			var $textarea = $(this);

			if($textarea.next('.'+hiddenDivClass).length) {
				return;
			}

			var hiddenDiv = $('<div></div>')
								.css(hiddenDivCss)
								.addClass(hiddenDivClass);

			// initializing the copy div
			hiddenDiv.css({
				// box-sizing: border-box
				'min-height': $textarea.outerHeight(),
				'width': $textarea.outerWidth(),

				'font-size': $textarea.css('font-size'),
				'font-family': $textarea.css('font-family'),
				'padding': $textarea.css('padding'),
				'border': $textarea.css('border')
			});

			hiddenDiv.data('original', $textarea.height());

			$textarea.css({
				'margin': '0px',
				'overflow': 'hidden'
			});

			hiddenDiv.insertAfter($textarea);
			$textarea.keyup(function() {
				var content = $(this).val();
		        content = content.replace(/\n/g, '<br />');
		        hiddenDiv.html(content + '<br />');
		        // hiddenDiv.html(content);

		        // box-sizing: border-box
		        $(this).css('height', hiddenDiv.outerHeight());
		        console.log(hiddenDiv.height());
			});
		});
	};

	$.fn.autosizeReset = function() {
		return $(this).each(function() {
			var $textarea = $(this);
			var originalHeight = $textarea.next('.'+hiddenDivClass).data('original');
			$textarea.val('').height(originalHeight);
		});
	};
	
	// initialization with data attribute
	$(document).ready(function() {
		$('textarea[data-size=auto]').autosize();
		$('body').on('keyup', 'textarea[data-size=auto]', function() {
			$(this).autosize();
		});
	});


} (window.jQuery));