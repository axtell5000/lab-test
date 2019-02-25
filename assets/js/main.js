(function($) {
  $(document).ready(function(){ 
    
    //FOOTER CAROUSEL
    $('#hero-area').owlCarousel({
      autoplay:true,
      autoplayTimeout:5000,
      dots: true,
      items: 1,
      loop: true,
      margin:0,
      nav: false
    });

    //FOOTER CAROUSEL
    $('.awards-item-holder').owlCarousel({
      dots: false,
      loop:false,
      margin:0,
      nav:true,
      responsive:{
          0:{
            items:1
          },
          600:{
            items:3
          },
          1000:{
            items:6
          }
      }
    });

    // RANGE / SLIDER FOR HAPPINESS SECTION
    var leftArrow = document.getElementById('happy-left');
    var rightArrow = document.getElementById('happy-right');
    var slider = document.getElementById('slider');

  
    noUiSlider.create(slider, {
      behaviour: 'tap',
      end: [5],
      step: 1,
      start: [3],
      range: {
        'min': 1,
        'max': 5
      }
    });

    function calcHappyFace(value) {
       
        switch(value) {
          case 1: 
          case 2:
            $('#happy-face').prop('src', 'assets/images/sad-face.svg');            
            break;
          case 3:
            $('#happy-face').prop('src', 'assets/images/neutral-face.svg');            
            break;
          case 4:
          case 5:
            $('#happy-face').prop('src', 'assets/images/happy-face.svg');            
            break;
          default:
            break; 
        }
    }

    // function on clicking
    function leftArrowClick() {
      var value = slider.noUiSlider.get();
      if (value >= 2) {
        value--;
        slider.noUiSlider.set(value);
        calcHappyFace(value);
      }
    }

    // function on clicking
    function rightArrowClick() {
      var value = slider.noUiSlider.get();
      if (value < 5) {
        value++;
        slider.noUiSlider.set(value);
        calcHappyFace(value);
      }
    }

    calcHappyFace(3); // setting the initial value

    // chnaging things when dragging on the handle
    slider.noUiSlider.on('update', function (values, handle) {  
      var value = values[handle];
      calcHappyFace(Number(value, 10)); // converting the string to number so we can send it through the case
    });

    // When clicking left arrow
    leftArrow.addEventListener('click', leftArrowClick);

    // When clicking right arrow
    rightArrow.addEventListener('click', rightArrowClick);

    //fOR FORM VALIDATION

    // rettrieving variables from form
    function parsingForm() {
      var formDetails = {
        fullName :$('#full-name').val(),
        email :$('#email').val(),
        contactNum: $('#contact-num').val(),
        services:  $('#services option:selected').val(),
        happinessScale: Number(slider.noUiSlider.get(), 10)
      };

      return formDetails;
     
    }

    function displayingValue(data) {
      console.log('Dear ', data.fullName);
      console.log('Email address ', data.email);
      console.log('Contact number: ', data.contactNum);
      console.log('Thank you for enquiring about our ' + data.services + ' service.');
      switch(data.happinessScale) {
        case 1:
        case 2:
          console.log('Your happiness rating of ' + data.happinessScale + ' We are sorry you were not happy with our service. We are endeavor to improve');
          break;
        case 3:
          console.log('Your happiness rating of ' + data.happinessScale + ' We thank you for your response');
          break;
        case 4:
        case 5:
          console.log('Your happiness rating of ' + data.happinessScale + ' We are happy that you liked our service');
          break;
        default:
        break;
      }
    }
    

    $('#happy-form').parsley().on('field:validated', function() {
      var ok = $('.parsley-error').length === 0;
      // $('.bs-callout-info').toggleClass('hidden', !ok);
      // $('.bs-callout-warning').toggleClass('hidden', ok);
    })
    .on('form:submit', function() {
      var parsedForm = parsingForm();
      displayingValue(parsedForm);
      return false;
    });


  });
})(jQuery);