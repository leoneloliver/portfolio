/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
   $(window).load(function() {

      // will first fade out the loading animation
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(100).fadeOut("slow");

      });

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	}

       	// trigger once only
       	this.destroy();

		},

		offset: "90%"

	});


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {
		  	itemSelector: '.folio-item',
		  	resize: true
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   // $('.item-wrap a').magnificPopup({

   //    type:'inline',
   //    fixedContentPos: false,
   //    removalDelay: 300,
   //    showCloseBtn: false,
   //    mainClass: 'mfp-fade'

   // });

   // $(document).on('click', '.popup-modal-dismiss', function (e) {
   // 	e.preventDefault();
   // 	$.magnificPopup.close();
   // });


	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {

   	// update the toggle button
   	toggleButton.toggleClass('is-clicked');
   	// fadeout the navigation panel
   	nav.fadeOut();

  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {

	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});


   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */
	$('input, textarea, select').placeholder()


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() {

		      	sLoader.fadeIn();

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut();
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();
	            }
	            // There was an error
	            else {
	            	sLoader.fadeOut();
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut();
		      	$('#message-warning').html("Something went wrong. Please try again.");
		         $('#message-warning').fadeIn();

		      }

	      });
  		}

	});


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}

	});

})(jQuery);


// traking google events
var trackClickEvent = function(event,category,label) {
	gtag('event', event, {
		'event_category': category,
		'event_label': label
		//'event_callback': function(){document.location = url;}
	});
}


const listSkills = [
	{ icon: 'devicon-html5-plain', text: 'html5' },
	{ icon: 'devicon-css3-plain', text: 'css3' },
	{ icon: 'devicon-javascript-plain', text: 'javascript' },
	{ icon: 'devicon-typescript-plain', text: 'typescript' },
	{ icon: 'devicon-jquery-plain', text: 'jquery' },
	{ icon: 'devicon-bootstrap-plain', text: 'bootstrap' },
	{ icon: 'devicon-tailwindcss-plain', text: 'tailwindcss' },
	{ icon: 'devicon-sass-plain', text: 'sass' },
	{ icon: 'devicon-storybook-plain', text: 'storybook' },
	{ icon: 'devicon-jamstack-original', text: 'jamstack' },
	{ icon: 'devicon-react-plain', text: 'reactjs' },
	{ icon: 'devicon-nextjs-original-wordmark', text: 'nextjs' },
	{ icon: 'devicon-vuejs-plain', text: 'vuejs' },
	{ icon: 'devicon-npm-original-wordmark', text: 'npm' },
	{ icon: 'devicon-gulp-plain', text: 'gulp' },
	{ icon: 'devicon-git-plain', text: 'git' },
	{ icon: 'devicon-github-plain', text: 'github' },
	{ icon: 'devicon-php-plain', text: 'php' },
	{ icon: 'devicon-mysql-plain', text: 'mysql' },
	{ icon: 'devicon-rails-plain-wordmark', text: 'ruby on rails' },
	{ icon: 'devicon-firebase-plain-wordmark', text: 'firebase' },
	{ icon: 'devicon-html5-plain', text: 'html5' },
	{ icon: 'devicon-css3-plain', text: 'css3' },
	{ icon: 'devicon-javascript-plain', text: 'javascript' },
	{ icon: 'devicon-typescript-plain', text: 'typescript' },
	{ icon: 'devicon-jquery-plain', text: 'jquery' },
	{ icon: 'devicon-bootstrap-plain', text: 'bootstrap' },
	{ icon: 'devicon-tailwindcss-plain', text: 'tailwindcss' },
	{ icon: 'devicon-sass-plain', text: 'sass' },
	{ icon: 'devicon-storybook-plain', text: 'storybook' },
	{ icon: 'devicon-jamstack-original', text: 'jamstack' },
	{ icon: 'devicon-react-plain', text: 'reactjs' },
	{ icon: 'devicon-nextjs-original-wordmark', text: 'nextjs' },
	{ icon: 'devicon-vuejs-plain', text: 'vuejs' },
	{ icon: 'devicon-npm-original-wordmark', text: 'npm' },
	{ icon: 'devicon-gulp-plain', text: 'gulp' },
	{ icon: 'devicon-git-plain', text: 'git' },
	{ icon: 'devicon-github-plain', text: 'github' },
	{ icon: 'devicon-php-plain', text: 'php' },
	{ icon: 'devicon-mysql-plain', text: 'mysql' },
	{ icon: 'devicon-rails-plain-wordmark', text: 'ruby on rails' },
	{ icon: 'devicon-firebase-plain-wordmark', text: 'firebase' },
	{ icon: 'devicon-html5-plain', text: 'html5' },
	{ icon: 'devicon-css3-plain', text: 'css3' },
	{ icon: 'devicon-javascript-plain', text: 'javascript' },
	{ icon: 'devicon-typescript-plain', text: 'typescript' },
	{ icon: 'devicon-jquery-plain', text: 'jquery' },
	{ icon: 'devicon-bootstrap-plain', text: 'bootstrap' },
	{ icon: 'devicon-tailwindcss-plain', text: 'tailwindcss' },
	{ icon: 'devicon-sass-plain', text: 'sass' },
	{ icon: 'devicon-storybook-plain', text: 'storybook' },
	{ icon: 'devicon-jamstack-original', text: 'jamstack' },
	{ icon: 'devicon-react-plain', text: 'reactjs' },
	{ icon: 'devicon-nextjs-original-wordmark', text: 'nextjs' },
	{ icon: 'devicon-vuejs-plain', text: 'vuejs' },
	{ icon: 'devicon-npm-original-wordmark', text: 'npm' },
	{ icon: 'devicon-gulp-plain', text: 'gulp' },
	{ icon: 'devicon-git-plain', text: 'git' },
	{ icon: 'devicon-github-plain', text: 'github' },
	{ icon: 'devicon-php-plain', text: 'php' },
	{ icon: 'devicon-mysql-plain', text: 'mysql' },
	{ icon: 'devicon-rails-plain-wordmark', text: 'ruby on rails' },
	{ icon: 'devicon-firebase-plain-wordmark', text: 'firebase' },

]

function showAlertWhenDivReachesTop() {
	const myDiv = document.querySelector('.intro-social'); // Replace 'myDiv' with the ID of your target div
	const avatar = document.querySelector('.intro-info img');

	const divRect = myDiv.getBoundingClientRect();
	const isDivAtTop = divRect.top <= 0;

	if (isDivAtTop) {
		avatar.classList.remove('zoom');
	}
  }

  // Attach event listener to the scroll event of the window
  window.addEventListener('scroll', showAlertWhenDivReachesTop);



//   marquee

document.addEventListener('DOMContentLoaded', function() {
	const marquee = document.getElementById('marquee');
	const content = marquee.innerHTML;

	// Calculate animation duration based on content width
	function updateDuration() {
		const contentWidth = marquee.offsetWidth / 2;
		const speed = 90;
		const duration = contentWidth / speed;
		marquee.style.animationDuration = `${duration}s`;
	}

	updateDuration();
	window.addEventListener('resize', updateDuration);
});
