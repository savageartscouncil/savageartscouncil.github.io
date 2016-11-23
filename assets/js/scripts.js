/* scottcountyartcrawl.com JavaScript Override */
$(document).ready(function() {
//magic  
  $('.artcrawl-navbar li.dropdown').hover(function() {
      $(this).addClass('open');
  }, function() {
      $(this).removeClass('open');
  });
  $('.cafe-link').on('click',function(event){ga('send','pageview','/gotocafe');event.preventDefault();window.location.href=$(this).prop('href');});
});