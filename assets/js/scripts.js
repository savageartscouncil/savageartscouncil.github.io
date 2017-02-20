// SavageArtsCouncil.org Javascript Overrides

//jQueryWrapper... Sanity.
(function($) {


$(document).ready(function() {
//magic, have at it.

  var dh = $(document).height();
  var wh = $(window).height();

  if ( wh >= (((dh/3)*2)+100)  ) {
    $('.arrow-wrap').hide();
  }
  
  //Main nav top breadcrumbs
  $('ul.menu.nav.navbar-nav > li:not(.first),ul.menu.nav.navbar-nav > li:not(.first) li ').each(function() {
    (location.pathname).indexOf($(' a',this).attr('href')) >= 0 ? 
        $('> a',this).parent().addClass('active') :  $('> a',this).parent().removeClass('aac');
  });

  //Sets a Dark overlay on menu toggle for mobile
  $('.navbar-toggle').on('click',function(e){
    $('.bg').toggleClass('active');
    $('.navbar-toggle').toggleClass('navbar-toggle-hover');
  });

  //Sets Paypal GA Click event.
	$('.paypal button').on('click', function(e) {
		ga('send', 'event', 'button', 'click', $(this).html());
	});

  $('.btn-jacs-register').on('click', function(e) {
		ga('send', 'event', 'button', 'click', 'Juried Art Show Registration');
	});

	//Wrap content images in figure, add caption
	$('.in-content-image').each(function() {
  	  $(this).wrap('<figure class=in-content-image-wrapper></figure');
  	  $(this).after('<figcaption>'+$(this).prop('alt').replace(' | ' ,'<br/> ')+'</figcaption>');
  	  if ($(this).width() >= $(this).height()) {
    	  $(this).addClass('is-landscape');
  	  } else {
    	  $(this).addClass('is-portrait');
  	  };
	});

	//show hide caption
	$('.in-content-image-wrapper').hover(function(){
  	  $(' figcaption', this).fadeIn(500);
  	 },function(){
  	  $(' figcaption', this).fadeOut(500);
	});

	//init right-nav
	$('#block-menu-menu-juried-art-menu ul').each(function() {
  	  $(this).addClass('nav-pills nav-stacked');
	});

	//artist record header
	$('.node-type-artist-record h1.page-header').removeClass('sr-only');
  $('.artist-image-wrapper figcaption').each(function() {
  	 if ($(this).html()=='') $(this).remove();
	});

/*
  //Change Logo/Nav behavior on homepage
  $('.front .navbar-collapse').each(function() {
    $(this).removeClass('collapse');
    $('.navbar-toggle').addClass('hide');
    $('#navbar').css('position','relative');
  });
*/
});

$(window).scroll( function(){

  //get scroll position
  var topWindow = $(window).scrollTop();
  //multiply by 1.5 so the arrow will become transparent half-way up the page
  var topWindow = topWindow * 7;

  //get height of window
  var windowHeight = $(window).height();

  //set position as percentage of how far the user has scrolled
  var position = topWindow / windowHeight;
  //invert the percentage
  position = 1 - position;

  //define arrow opacity as based on how far up the page the user has scrolled
  //no scrolling = 1, half-way up the page = 0
  if (position >= 0) {
    $('.arrow-wrap').css('opacity', position);
  } else {
    $('.arrow-wrap').remove();
  }

});

function buildArtistThumbnail(image) {
  var thumbnailStruct;
  return thumbnailStruct;
}

function buildEmailAddress(email) {
  var emailStruct;
  emailStruct = '<span><a href="mailto:'+email+'">'+email+'</a></span>';
  return emailStruct;
}

function buildWebUrl(url) {
  var urlStruct;
  urlStruct = '<span><a href="'+url+'">'+url+'</a></span>';
  return urlStruct;
}

//Artist Directory
$(document).ready(function() {
  $('#artistDirectory').each(function() {
    $.ajax({
      type: 'POST',
      crossDomain: true,
      dataType: 'json',
      url: '/assets/js/artists.json',
      success: function(data) {
        var jsonData = (data.data);
        for(var i=0; i < jsonData.length; i++) {
          var artist = jsonData[i];
          var artistEmail, artistURL, thumbnail;
          var artistFullName = '<span>' + artist.firstname + ' ' + artist.lastname + '</span>';
          artist.image.url != '' ? thumbnail = '<figure><img src="'+artist.image.url+'" alt="'+ artist.firstname + ' ' + artist.lastname +' work sample" /><figcaption>'+artist.image.title+'</figcaption></figure>' : thumbnail = '';
          artist.email != '' ? artistEmail = buildEmailAddress(artist.email) : artistEmail = '';
          artist.url != '' ? artistURL = buildWebUrl(artist.url) : artistURL = '';
          $('#artistDirectory').append('<li>' + thumbnail + artistFullName + artistEmail + artistURL + '</li>');
          //$('#artistDirectory').append('<div class="col-xs-4 col-sm-3 col-md-2" style="overflow:hidden;"><a href="' + igo.link + '" target="_blank" class="thumbnail"><img src="' + igo.images.thumbnail.url + '" title="' + igo.caption.text + '" alt="instagram post " /><span><span class="glyphicon glyphicon-heart"></span> ' + igo.likes.count + '</span> <span style="float:right"><span class="glyphicon glyphicon-comment"></span> ' + igo.comments.count + '</span> </a></div>' );
        }
      }
    });
  });
  
});


}(jQuery));
