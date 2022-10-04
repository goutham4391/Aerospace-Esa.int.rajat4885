// NAVIGATION TOGGLE

$(function() {
  $('.menu-open').click(function() {
    $('.wrapper').toggleClass('open');
    setTimeout(function() {
      $('body').toggleClass( 'noscroll' );
    }, 1000);
  });

  $('.menu-close').click(function() {
    $('.wrapper').toggleClass('open');
    setTimeout(function() {
      $('body').toggleClass( 'noscroll' );
    }, 1000);
  });

  $('nav .language').click(function() {
    $('.languages').toggleClass('open');
    $('nav .language').toggleClass('active');
    $('.searchbox').removeClass('open');
    $('nav .search').removeClass('active');
  });

  $('nav .search').click(function() {
    $('.searchbox').toggleClass('open');
    $('nav .search').toggleClass('active');
    $('.languages').removeClass('open');
    $('nav .language').removeClass('active');
  });

	$('body').append('<div id="overlay"><span></span><img src=""><b>&times;</b></div>');
	$('img.over').click(function() {
		src = $(this).attr('src');
		$('#overlay img').attr('src', src);
		$('body').css('overflow', 'hidden');
		$('#overlay').show();
	});
	$('#overlay img, #overlay b').click(function() {
		$('body').css('overflow', 'auto');
		$('#overlay').hide();
	});
});


// STICKY NAVIGATION

$(window).scroll(function() {
	//var windowHeight = $(window).height();
  if ($(this).scrollTop() > 100){
    $('.header').addClass('sticky');
  }
  else{
    $('.header').removeClass('sticky');
  }
});


// STELLAR
stellar_config = {
    // Set scrolling to be in either one or both directions
    horizontalScrolling: false,
    verticalScrolling: true,

    // Set the global alignment offsets
    horizontalOffset: 0,
    verticalOffset: 200,

    // Refreshes parallax content on window load and resize
    responsive: false,

    // Select which property is used to calculate scroll.
    // Choose 'scroll', 'position', 'margin' or 'transform',
    // or write your own 'scrollProperty' plugin.
    scrollProperty: 'scroll',

    // Select which property is used to position elements.
    // Choose between 'position' or 'transform',
    // or write your own 'positionProperty' plugin.
    positionProperty: 'position',

    // Enable or disable the two types of parallax
    parallaxBackgrounds: true,
    parallaxElements: true,

    // Hide parallax elements that move outside the viewport
    //bf hideDistantElements: true,
    hideDistantElements: false,

    // Customise how elements are shown and hidden
    hideElement: function($elem) { $elem.hide(); },
    showElement: function($elem) { $elem.show(); }
};
/*
$(function() {
  $.stellar(stellar_config);
});
*/
