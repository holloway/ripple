(function(){
	"use strict";

	var $overlay = document.createElement("div");
	$overlay.className = "ripple-overlay";

	var click_details = {
		x: undefined,
		y: undefined,
		width: undefined,
		height: undefined
	};

	var ripple_effects = {
		"ripple-radial": {
			init: function(){
				$overlay.style.backgroundPosition = click_details.x + "px " + click_details.y + "px";
				$overlay.style.backgroundSize = "1% 1%";
			},
			soon: function(){
				$overlay.classList.add("move");
				$overlay.style.backgroundSize = "100% 100%";
				$overlay.style.backgroundPosition = (click_details.x - click_details.width / 2) + "px " + (click_details.y - click_details.height / 2) + "px";
			}
		}
	};

	var init = function(){
		document.body.appendChild($overlay);
		if(animationend) $overlay.addEventListener(animationend, end, false);
		if(transitionend) $overlay.addEventListener(transitionend, end, false);
	};

	var transitionend = function(){
		var i,
			el = document.createElement('div'),
			transitions = {
				'transition':'transitionend',
				'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
				'MozTransition':'transitionend',
				'WebkitTransition':'webkitTransitionEnd'
			};

		for (i in transitions) {
			if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
				return transitions[i];
			}
		}
	}();

	var animationend = function(){
		var i,
			el = document.createElement('div'),
			transitions = {
				'animation': 'animationend',
				'-o-animation': 'oAnimationEnd',
				'-moz-animation': 'animationend',
				'-webkit-animation': 'webkitAnimationEnd'
			};

		for (i in transitions) {
			if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
				return transitions[i];
			}
		}
	}();

	var click = function(event){
		if(!event.target.classList.contains("ripple")) return;
		
		var dimensions = event.target.getBoundingClientRect();
		dimensions.width  = event.target.offsetWidth;
		dimensions.height = event.target.offsetHeight;
		
		dimensions._top = dimensions.top + document.body.scrollTop;
		var ripple_style = event.target.className.replace(/[\w-]+\b/g, function(word){
			if(word.substr(0, "ripple-".length) !== "ripple-") return "";
			return word;
		}).replace(/ /g, '');
		var computed_style = window.getComputedStyle(event.target);
		$overlay.style.backgroundPosition = "center center";
		$overlay.style.backgroundSize = "100% 100%";
		$overlay.style.width = dimensions.width + "px";
		$overlay.style.height = dimensions.height + "px";
		$overlay.style.top = dimensions._top + "px";
		$overlay.style.left = dimensions.left + "px";
		$overlay.style.borderRadius = computed_style.borderRadius;
		$overlay.className = "ripple-overlay " + ripple_style;
		click_details.x = event.offsetX;
		click_details.y = event.offsetY;
		click_details.width = dimensions.width;
		click_details.height = dimensions.height;
		if(ripple_effects[ripple_style] && ripple_effects[ripple_style].init) {
			ripple_effects[ripple_style].init();
			setTimeout(ripple_effects[ripple_style].soon, 1);
		}
		$overlay.style.display = "block";
	};

	var end = function(event){
		if(event.target.classList.contains("ripple-overlay-fadeout")){
			$overlay.className = "ripple-overlay";
			$overlay.style.display = "none";
		} else {
			$overlay.classList.add("ripple-overlay-fadeout");
		}
	};

	document.addEventListener("click", click, false);
	document.addEventListener("DOMContentLoaded", init, false);
}());