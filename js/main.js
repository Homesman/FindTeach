(function ($) {

    "use strict";

    var cfg = {        
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'  // mailchimp url
    },    

    $WIN = $(window);    

    // Add the User Agent to the <html>
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    /* Preloader 
     * -------------------------------------------------- */
    var ssPreloader = function () {
        $WIN.on('load', function () {    
            $('html, body').animate({ scrollTop: 0 }, 'normal');
            $("#preloader").delay(500).fadeOut('slow');
        });
    };

    /* Mobile Menu
     * ---------------------------------------------------- */ 
    var ssMobileMenu = function () {
        var toggleButton = $('.header-menu-toggle'),
            nav = $('#header-nav-wrap');

        toggleButton.on('click', function (event) {
            event.preventDefault();
            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $(window).resize(function () {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        $('#header-nav-wrap').find('a').on("click", function () {  
            if (nav.hasClass('mobile')) {           
                toggleButton.toggleClass('is-clicked'); 
                nav.slideToggle();           
            }     
        });
    }; 

    /* FitVids
     * ---------------------------------------------------- */
    var ssFitVids = function () {
        $(".fluid-video-wrapper").fitVids();
    }; 

    /* Owl Carousel
     * ------------------------------------------------------ */
    var ssOwlCarousel = function () {
        $(".owl-carousel").owlCarousel({    
            loop: true,
            nav: false,
            autoHeight: true,
            items: 1
        });
    };      

    /* Highlight the current section in the navigation bar
     * ------------------------------------------------------ */
    var ssWaypoints = function () {
        var sections = $("section"),
            navigation_links = $(".header-main-nav li a");    

        sections.waypoint({
            handler: function (direction) {
                var active_section;
                active_section = $('section#' + this.element.id);

                if (direction === "up") active_section = active_section.prev();

                var active_link = $('.header-main-nav li a[href="#' + active_section.attr("id") + '"]');            

                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");
            }, 
            offset: '25%'
        });
    };

    /* Smooth Scrolling
     * ------------------------------------------------------ */
    var ssSmoothScroll = function () {
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);
     
            e.preventDefault();
            e.stopPropagation();      

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing', function () {
                window.location.hash = target;
            });
        });
    };

    /* Placeholder Plugin Settings
     * ------------------------------------------------------ */
    var ssPlaceholder = function () {
        $('input, textarea, select').placeholder();  
    };

    /* Alert Boxes
     * ------------------------------------------------------- */
    var ssAlertBoxes = function () {
        $('.alert-box').on('click', '.close', function () {
            $(this).parent().fadeOut(500);
        }); 
    };      

    /* Animate On Scroll
     * ------------------------------------------------------ */
    var ssAOS = function () {
        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });
    };

    /* AjaxChimp
     * ------------------------------------------------------ */
    var ssAjaxChimp = function () {
        $('#mc-form').ajaxChimp({
            language: 'es',
           url: cfg.mailChimpURL
        });

        $.ajaxChimp.translations.es = {
            'submit': 'Submitting...',
            0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
            1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
            2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
        } 
    };

    /* Back to Top
     * ------------------------------------------------------ */
    var ssBackToTop = function () {
        var pxShow  = 500,        
            fadeInTime  = 400,         
            fadeOutTime = 400,        
            scrollSpeed = 300,        
            goTopButton = $("#go-top");

        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };  

    /* Login and Register Form Functionality
     * ------------------------------------------------------ */
	var ssLoginRegister = function() {
		const mainContent = document.getElementById('main-content');
		const wrapper = document.querySelector('.wrapper');
		const loginForm = document.querySelector('.form-box-login');
		const registerForm = document.querySelector('.form-box-register');
		const loginLink = document.querySelector('.login-link');
		const registerLink = document.querySelector('.register-link');
		const closeIcon = document.querySelector('.icon-close ion-icon');
		const toggleLoginButton = document.querySelector('.btnLogin-popup');
		const loadingOverlay = document.getElementById('loadingOverlay');
	
		// Mostrar pantalla de carga
		function showLoadingOverlay() {
			loadingOverlay.classList.add('active');
			setTimeout(() => {
				loadingOverlay.classList.remove('active');
			}, 1000); // Ocultar después de 1 segundo
		}
	
		// Abrir el formulario de inicio de sesión
		if (toggleLoginButton) {
			toggleLoginButton.addEventListener('click', function () {
				showLoadingOverlay();
				setTimeout(() => {
					wrapper.classList.add('active');
					mainContent && mainContent.classList.add('hidden'); // Ocultar contenido principal si existe
				}, 1000);
			});
		}
	
		// Cambiar entre login y register
		if (registerLink) {
			registerLink.addEventListener('click', function (event) {
				event.preventDefault();
				loginForm.style.transform = 'translateX(400px)';
				registerForm.style.transform = 'translateX(0)';
			});
		}
	
		if (loginLink) {
			loginLink.addEventListener('click', function (event) {
				event.preventDefault();
				registerForm.style.transform = 'translateX(400px)';
				loginForm.style.transform = 'translateX(0)';
			});
		}
	
		// Cerrar el formulario
		if (closeIcon) {
			closeIcon.addEventListener('click', function () {
				wrapper.classList.remove('active');
				mainContent && mainContent.classList.remove('hidden'); // Mostrar contenido principal
			});
		}
	};

    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {
        ssPreloader();
        ssMobileMenu();
        ssFitVids();
        ssOwlCarousel();
        ssWaypoints();
        ssSmoothScroll();
        ssPlaceholder();
        ssAlertBoxes();
        ssAOS();
        ssBackToTop();
        ssLoginRegister(); 
    })();

})(jQuery);
