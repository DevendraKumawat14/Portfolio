(function($) {

	"use strict";

	// ------------------------------------------------------------------------------ //
	// Overlay Menu Navigation
	// ------------------------------------------------------------------------------ //
	var overlayMenu = function () {

		if(!$('.nav-overlay').length) {
		  return false;
		}

		var body = undefined;
		var menu = undefined;
		var menuItems = undefined;
		var init = function init() {
		  body = document.querySelector('body');
		  menu = document.querySelector('.menu-btn');
		  menuItems = document.querySelectorAll('.nav__list-item');
		  applyListeners();
		};
		var applyListeners = function applyListeners() {
		  menu.addEventListener('click', function () {
		    return toggleClass(body, 'nav-active');
		  });
		};
		var toggleClass = function toggleClass(element, stringClass) {
		  if (element.classList.contains(stringClass)) element.classList.remove(stringClass);else element.classList.add(stringClass);
		};
		init();
	}

	// init Chocolat light box
	var initChocolat = function () {
		Chocolat(document.querySelectorAll('.image-link'), {
			imageSize: 'contain',
			loop: true,
		})
	}

	// init Isotope
	var initIsotope = function () {

		$('.grid').each(function () {

			// $('.grid').imagesLoaded( function() {
			// images have loaded
			var $buttonGroup = $('.button-group');
			var $checked = $buttonGroup.find('.is-checked');
			var filterValue = $checked.attr('data-filter');

			var $grid = $('.grid').isotope({
				itemSelector: '.portfolio-item',
				// layoutMode: 'fitRows',
				filter: filterValue
			});

			// bind filter button click
			$('.button-group').on('click', 'a', function (e) {
				e.preventDefault();
				filterValue = $(this).attr('data-filter');
				$grid.isotope({ filter: filterValue });
			});

			// change is-checked class on buttons
			$('.button-group').each(function (i, buttonGroup) {
				$buttonGroup.on('click', 'a', function () {
					$buttonGroup.find('.is-checked').removeClass('is-checked');
					$(this).addClass('is-checked');
				});
			});
			// });

		});
	}

	// Change header background on scroll

	$(document).on('scroll', function(){
	    if ( $(window).scrollTop() > 80) {
	        $('#header-wrap').addClass('change-color');
	    } else {
	        $('#header-wrap').removeClass('change-color');
	    }
	    if ( $(window).scrollTop() > 800) {
	        $('#header-wrap').addClass('change-menu-background');
	    } else {
	        $('#header-wrap').removeClass('change-menu-background');
	    }
	});

 
	// close when click off of container
	$(document).on('click touchstart', function (e){

		var x = document.getElementById("navigation");
		if (x.className === "main-menu") {
		x.className += " menu-bar";
		} else {
		x.className = "main-menu";
		}

	});
	

	$(document).ready(function() {

		overlayMenu();
		initChocolat();

		// Latest Banner Slider
		$('.slider-for').slick({
		    slidesToShow: 1,
		    slidesToScroll: 1,
		    fade: true,
		});
		// Sidebar

		// Tab Section

		const tabs = document.querySelectorAll('[data-tab-target]')
		const tabContents = document.querySelectorAll('[data-tab-content]')

		tabs.forEach(tab => {
		tab.addEventListener('click', () => {
		  const target = document.querySelector(tab.dataset.tabTarget)
		  tabContents.forEach(tabContent => {
		    tabContent.classList.remove('active')
		  })
		  tabs.forEach(tab => {
		    tab.classList.remove('active')
		  })
		  tab.classList.add('active')
		  target.classList.add('active')
		})
		});


		$('.testimonial-slider').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  dots: true,
		  fade: true,
		}); 

	});

	// preloader
	$(window).load(function () {
		$("#overlayer").fadeOut("slow");
		$('body').addClass('loaded');
		initIsotope();
	})


})(jQuery);