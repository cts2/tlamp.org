function parallax() {
	var scrollPosition = $(window).scrollTop();
	$('#parallax').css('top',(72 - (scrollPosition * 0.3))+'px' ); // bg image moves at 30% of scrolling speed
}

$(document).ready(function() {

	/* ========== PARALLAX BACKGROUND ========== */

	$(window).on('scroll', function(e) {
		parallax();
	});


	/* ========== FITVIDS PLUGIN ========== */
	
	$('.fitvids').fitVids();


	/* ========== BOOTSTRAP CAROUSEL ========== */

	$('.carousel').carousel({
	  interval: 4000
	});



	/* ========== BOOTSTRAP SCROLLSPY ========== */
	
	$('section').scrollspy();



	/* ========== SMOOTH SCROLLING BETWEEN SECTIONS ========== */
	
	$('a[href*=#]:not([href=#])').not('#myCarousel a, #testimonials a, .modal-trigger a, .panel a').click(function(o) {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	        || location.hostname == this.hostname) {

	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	           	if ($(".navbar").css("position") == "fixed" ) {
	             $('html,body').animate({
	                 scrollTop: target.offset().top-72
	            }, 700, 'swing');
	         } else {
	             $('html,body').animate({
	                 scrollTop: target.offset().top
	            }, 700, 'swing');
	         }
	            return false;
	        }
	    }
	});



	/* ========== NEWSLETTER SIGNUP ========== */


    $('#newsletter-signup').submit(function() {
	
 		if($('#e-mail').val() == '')
 		{
 			$('#error-info').html('Please fill in your e-mail address!');
 			return false;
 		}
 		
 		// build data from input fields
 		var jsdata = {type: "signup", mail: $('#e-mail').val()};
 		var jsonStr = JSON.stringify(jsdata);

 		$("#signupbtn").attr('disabled','disabled'); 		
 		$('#error-info').html("Sending...");
 		$.ajax({
			type : 'POST',
			dataType : 'json',
			data: { jsondata : jsonStr},
			url : '/sendemail',
			timeout : 15000,
			success : function(data, textStatus) {
				if(textStatus == 'success') {
					$('#error-info').html("Thanks for signing up!");
			  	} else {
			  		$('#error-info').html("Something went wrong :( Please, try again!");
			  		setTimeout("location.reload(true);",4000);
			  	}
			},
			error : function(xhr, textStatus, errorThrown) {
				$('#error-info').html(errorThrown);
				$("#signupbtn").removeAttr('disabled');
			}
		});
 		return false;
 	});

	/* ========== CONTACT FORM ========== */

    $("#contact-form").submit(function() {
    	var jsdata = {type: "signup",
    			name: $('#name').val(), 
    			mail: $('#email').val(),
    			message: $('#message').val()};
    	var jsonStr = JSON.stringify(jsdata);
	
 		if($('#name').val() == '' || $('#email').val() == '' || $('#message').val() == '')
 		{
 			$('#contact-error').html('Please fill in all the fields!');
 			return false;
 		}
 		
 		$("#contactbtn").attr('disabled','disabled'); 		
 		$('#contact-error').html("Sending...");
 		$.ajax({
			type : 'POST',
			dataType : 'json',
			data: { jsondata : jsonStr},
			url : '/sendemail',
			timeout : 15000,
			success : function(data, textStatus) {
				if(textStatus == 'success') {
					$('#contact-error').html("Thanks for submitting your questions, we'll be in touch!");
			  	} else {
			  		$('#contact-error').html("Something went wrong :( Please, try again!");
			  		setTimeout("location.reload(true);",4000);
			  	}
			},
			error : function(xhr, textStatus, errorThrown) {
				$('#contact-error').html(errorThrown);
				$("#contactbtn").removeAttr('disabled');
			}
		});
 		
 		return false;
	});



	/* ========== TWITTER FEED ========== */
	
	$("#tweets-feed").tweet({
	  join_text: false,
	  username: "envato", // Change username here
	  modpath: './assets/twitter/', 
	  avatar_size: false,
	  count: 1, // number of tweets
	  loading_text: "loading tweets...",
	  seconds_ago_text: "about %d seconds ago",
	  a_minutes_ago_text: "about a minute ago",
	  minutes_ago_text: "about %d minutes ago",
	  a_hours_ago_text: "about an hour ago",
	  hours_ago_text: "about %d hours ago",
	  a_day_ago_text: "about a day ago",
	  days_ago_text: "about %d days ago",
	  view_text: "view tweet on twitter"
	});

	

	/* =========== CUSTOM STYLE FOR SELECT DROPDOWN ========== */

	$("select").selectpicker({style: 'btn-hg btn-primary', menuStyle: 'dropdown'});

	// style: select toggle class name (which is .btn)
	// menuStyle: dropdown class name

	// You can always select by any other attribute, not just tag name.
	// Also you can leave selectpicker arguments blank to apply defaults.



	/* ========== TOOLTIPS & POPOVERS =========== */

	$("[data-toggle=tooltip]").tooltip();

	$('.popover-trigger').popover('hide');




    /* ========== MAGNIFIC POPUP ========== */

    $('.gallery-item, .gallery-popup').magnificPopup({
	  	delegate: 'a', // child items selector, by clicking on it popup will open
	  	type: 'image',
	  	closeOnContentClick: 'true',
		mainClass: 'mfp-with-zoom', // this class is for CSS animation below
	  	zoom: {
		    enabled: true, // By default it's false, so don't forget to enable it
		    duration: 300, // duration of the effect, in milliseconds
		    easing: 'ease-in-out', // CSS transition easing function 

		    // The "opener" function should return the element from which popup will be zoomed in
		    // and to which popup will be scaled down
		    // By defailt it looks for an image tag:
		    opener: function(openerElement) {
		      // openerElement is the element on which popup was initialized, in this case its <a> tag
		      // you don't need to add "opener" option if this code matches your needs, it's defailt one.
		      return openerElement.is('img') ? openerElement : openerElement.find('img');
		    }
		}
	});



	/* ========== END OF SCRIPTS ========== */

});


/* ========== ISOTOPE FILTERING ========== */

$(window).load(function(){

	var $container = $('#gallery-items'),
        $select = $('#filters select');

    $container.isotope({
        itemSelector: '.gallery-item'
    });

    $select.change(function() {
        var filters = $(this).val();
;
        $container.isotope({
            filter: filters
        });
    });
    
})