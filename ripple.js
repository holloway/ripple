(function(){
	"use strict";

	var colour = "#4285f4";
	var opacity = 0.3;
	var ripple_within_elements = ['input', 'button', 'a'];
	var ripple_without_diameter = 50;

	var overlays = {
		items: [],
		get: function(){
			var $element;
			for(var i = 0; i < overlays.items.length; i++){
				$element = overlays.items[i];
				if($element.transition_phase === false) {
					$element.transition_phase = 0;
					return $element;
				}
			}
<<<<<<< HEAD
			$element = document.createElement("div");
			$element.style.position = "absolute";
			$element.style.opacity = opacity;
			//$element.style.outline = "10px solid red";
			$element.style.pointerEvents = "none";
			$element.style.background = "-webkit-radial-gradient(" + colour + " 64%, rgba(0,0,0,0) 65%) no-repeat";
			$element.style.background = "radial-gradient(" + colour + " 64%, rgba(0,0,0,0) 65%) no-repeat";
			$element.style.transform = "translateZ(0)";
			$element.transition_phase = 0;
			$element.rid = overlays.items.length;
			$element.next_transition = overlays.next_transition_generator($element);
			document.body.appendChild($element);
			overlays.items.push($element);
			return $element;
		},
		next_transition_generator: function($element){
			return function(){
				$element.transition_phase++;
				switch($element.transition_phase){
					case 1:
						$element.style[transition] = "all 0.2s ease-in-out";
						$element.style.backgroundSize = $element.ripple_backgroundSize;
						$element.style.backgroundPosition = $element.ripple_backgroundPosition;
						setTimeout($element.next_transition, 0.2 * 1000); //now I know transitionend is better but it fires multiple times when multiple properties are animated, so this is simpler code and (imo) worth tiny delays
						break;
					case 2:
						$element.style[transition] = "opacity 0.15s ease-in-out";
						$element.style.opacity = 0;
						setTimeout($element.next_transition, 0.15 * 1000);
						break;
					case 3:
						overlays.recycle($element);
						break;
				}
=======
		},
		"ripple-blue-radial": {
			size: 400,
			init: function(){
				$overlay.style.backgroundPosition = click_details.x + "px " + click_details.y + "px";
				$overlay.style.backgroundSize = "10px 10px";
			},
			soon: function(){
				var radial = ripple_effects["ripple-blue-radial"];
				radial.size = click_details.width * 2;
				$overlay.classList.add("move");
				$overlay.style.backgroundSize = radial.size + "px " + radial.size + "px";
				$overlay.style.backgroundPosition = (click_details.x - radial.size / 2) + "px " + (click_details.y - radial.size / 2) + "px";
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
>>>>>>> a20ad6fbc070701db983c06b2359f93099cc5a25
			};
		},
		recycle: function($element){
			$element.style.display = "none";
			$element.style[transition] = "none";
			if($element.timer) clearTimeout($element.timer);
			$element.transition_phase = false;
		}
	};

	var transition = function(){
		var i,
			el = document.createElement('div'),
			transitions = {
				'WebkitTransition':'webkitTransition',
				'transition':'transition',
				'OTransition':'otransition',
				'MozTransition':'transition'
			};
		for (i in transitions) {
			if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
				return transitions[i];
			}
		}
	}();

	var click = function(event){
<<<<<<< HEAD
		var $element = overlays.get(),
			touch,
			x,
			y;

		touch = event.touches ? event.touches[0] : event;

		$element.style[transition] = "none";
		$element.style.backgroundSize = "3px 3px";
		$element.style.opacity = opacity;
		if(ripple_within_elements.indexOf(touch.target.nodeName.toLowerCase()) > -1) {
			x = touch.offsetX;
			y = touch.offsetY;
			
			var dimensions = touch.target.getBoundingClientRect();
			if(!x || !y){
				x = (touch.clientX || touch.x) - dimensions.left;
				y = (touch.clientY || touch.y) - dimensions.top;
			}
			$element.style.backgroundPosition = x + "px " + y + "px";
			$element.style.width = dimensions.width + "px";
			$element.style.height = dimensions.height + "px";
			$element.style.left = (dimensions.left + document.body.scrollLeft) + "px";
			$element.style.top = (dimensions.top + document.body.scrollTop) + "px";
			var computed_style = window.getComputedStyle(event.target);
			for (var key in computed_style) {
				if (key.toString().indexOf("adius") > -1) {
					if(computed_style[key]) {
						$element.style[key] = computed_style[key];
					}
				} else if(parseInt(key, 10).toString() === key && computed_style[key].indexOf("adius") > -1){
					$element.style[computed_style[key]] = computed_style[computed_style[key]];
				}
			}
			$element.style.backgroundPosition = x + "px " + y + "px";
			$element.ripple_backgroundPosition = (x - dimensions.width)  + "px " + (y - dimensions.width) + "px";
			$element.ripple_backgroundSize = (dimensions.width * 2) + "px " + (dimensions.width * 2) + "px";
		} else { //click was outside of ripple element
			x = touch.clientX || touch.x || touch.pageX;
			y = touch.clientY || touch.y || touch.pageY;
			
			$element.style.borderRadius = "0px";
			$element.style.left = (x - ripple_without_diameter / 2) + "px";
			$element.style.top = (document.body.scrollTop + y - ripple_without_diameter / 2) + "px";
			$element.ripple_backgroundSize = ripple_without_diameter + "px " + ripple_without_diameter + "px";
			$element.style.width = ripple_without_diameter + "px";
			$element.style.height = ripple_without_diameter + "px";
			$element.style.backgroundPosition = "center center";
			$element.ripple_backgroundPosition = "center center";
			$element.ripple_backgroundSize = ripple_without_diameter + "px " + ripple_without_diameter + "px";
=======
		if(!event.target.classList.contains("ripple")) return;
		
		var dimensions = {},
			clientRect = event.target.getBoundingClientRect();

		dimensions.width  = event.target.offsetWidth;
		dimensions.height = event.target.offsetHeight;
		
		dimensions.top = clientRect.top + document.body.scrollTop;
		dimensions.left = clientRect.left + document.body.scrollLeft;
		var ripple_style = event.target.className.replace(/[\w-]+\b/g, function(word){
			if(word.substr(0, "ripple-".length) !== "ripple-") return "";
			return word;
		}).replace(/ /g, '');
		var computed_style = window.getComputedStyle(event.target);
		$overlay.style.backgroundPosition = "center center";
		$overlay.style.backgroundSize = "100% 100%";
		$overlay.style.width = dimensions.width + "px";
		$overlay.style.height = dimensions.height + "px";
		$overlay.style.top = dimensions.top + "px";
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
			console.log("fadeout-finished");
		} else {
			$overlay.classList.add("ripple-overlay-fadeout");
			console.log("fadeout");
>>>>>>> a20ad6fbc070701db983c06b2359f93099cc5a25
		}
		$element.ripple_x = x;
		$element.ripple_y = y;
		$element.style.display = "block";
		setTimeout($element.next_transition, 20);
	};

	if('ontouchstart' in window || 'onmsgesturechange' in window){
		document.addEventListener("touchstart", click, false);
	} else {
		document.addEventListener("click", click, false);
	}
}());