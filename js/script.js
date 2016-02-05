$(document).ready(function() {
	var chosen_product = {
		color: "",
		size: "",
		price: 0,
		guantity: 1
	};

	var timeout = 0;

	var chosen_products = [];

	var products = [
	{
		color: '#000000',
		price: '39',
		color_name: 'Black',
		available_sizes: ['s', 'l'],
		images: ['images/black1.jpg', 'images/black2.jpg', 'images/black3.jpg']
	},
	{
		color: '#DB8C57',
		price: '45',
		discount_price: '19',
		color_name: 'Taupe',
		available_sizes: ['xs', 's', 'm', 'l'],
		images: ['images/yellow1.jpg', 'images/yellow2.jpg', 'images/yellow3.jpg']
	},
	{
		color: '#0C5754',
		price: '39',
		discount_price: '19',
		color_name: 'Green',
		available_sizes: ['m'],
		images: ['images/green1.jpg', 'images/green2.jpg', 'images/green3.jpg', 'images/green1.jpg', 'images/green2.jpg', 'images/green3.jpg']
	}
	];

	init();

	function init() {
		loadColors();
		loadImages();
	};

	function loadImages() {
		$(".color_selector").first().click();
	};

	function loadColors() {
		for (var i = 0; i < products.length; i++) {
      var new_color_div = $("<div></div>").addClass("color_selector").attr("data-id", i); //$('div')
      var new_child_div = $("<div></div>").css("background-color", products[i].color);
      new_color_div.append(new_child_div);
      $('.color-selector-parent').append(new_color_div);
    }

    $('.color_selector').click(function(){
      //clear all images
      $('.goods>.row').empty();

      //claer .active
      $('.color_selector').removeClass('active');

      //clear style of size
      $('.sizes .available').removeClass('hover');
      $('.color_selector').removeClass('hover');

      // generate new images
      var id = $(this).attr('data-id');
      $(this).addClass('active'); //зачем?????????????????????????????????????????
      $(this).addClass('hover');

      for (var i = 0; i < products[id].images.length; i++) {
      	var new_div_image = $("<div></div>").addClass('col-md-4');
      	var new_image = $("<img>").attr("src", products[id].images[i]);
      	var j=i+1;
      	$('.goods>.row').append(new_div_image);
      	$('.goods>.row>.col-md-4:nth-child('+j+')').append(new_image);
      }

      //show color_name
      $('.color-name').html(products[id].color_name);

      //show price
      $('.product-price').html(" &pound;"+products[id].price);

      if(products[id].discount_price) {
      	$('.product-price').addClass('striked');
      	$('.discount-price').html(" &pound;"+products[id].discount_price);
      } else {
      	$('.product-price').removeClass('striked');
      	$('.discount-price').empty();
      }

      //show available sizes
      var all_sizes = $('.sizes li').removeClass('available'); //.data('size')

      for (var i = 0; i < all_sizes.length; i++) {
        //var size_element = all_sizes.get(i);
        var size_element = $(all_sizes[i]);
        
        if(products[id].available_sizes.indexOf(size_element.attr('data-size')) >= 0) {
        	size_element.addClass('available');
        }
      };

      //save color
      chosen_product.color = products[id].color_name;

      //save price
      chosen_product.price = products[id].discount_price ? products[id].discount_price : products[id].price;
    });
};

  //save size
/*  $('.sizes .available').on("click", function() {
  	$(this).css('box-shadow', '0 0 0 2px #fff,0 0 0 3px #999');
  	chosen_product.size = $(this).attr('data-size');
  });*/

$('.sizes').on('click', '.available', function() {
  	//clear style of size
  	// $('.sizes .available').css('box-shadow','');
  	$('.sizes .available').removeClass('hover');

  	$(this)/*.css('box-shadow', '0 0 0 2px #fff,0 0 0 3px #999')*/.addClass('hover');
		chosen_product.size = $(this).attr("data-size");//всеравно не стирает прошлый размер!!!!!!!!!!!!!!!!!!!!!
	});

  //save guantity
  $('select.quantity_selector').on("change", function() {
    chosen_product.guantity = $(this).val(); //this.value;
  });

  var total_price = 0;
	var guantity_items = 0;

  //print cart
  $('.add_to_cart').on("click", function() {
  	if (timeout) {
  		clearTimeout(timeout);
  	}

  	chosen_products.push(chosen_product);

		//print cart-small
			var shopping_cart = $('.shopping-cart');
			shopping_cart.find('h3').html($('.product-name').html());
			shopping_cart.find('ul').first().hide();

			var ul = shopping_cart.find('ul').first().clone().show();
			ul.find('.chosen-product-price').html(" &pound;"+chosen_product.price);
			ul.find('.chosen-product-guantity').html(chosen_product.guantity);
			ul.find('.chosen-product-color').html(chosen_product.color);
			ul.find('.chosen-product-size').html(chosen_product.size);
			shopping_cart.append(ul);

		//print cart-big
			var shopping_cart_big = $('.shopping-cart-big table');
			shopping_cart_big.find('.name').html($('.product-name').html());
			shopping_cart_big.find('tbody>tr').first().hide();

			var tr = shopping_cart_big.find('tbody>tr').first().clone().show();
			tr.find('.chosen-product-price').html(" &pound;"+chosen_product.price*chosen_product.guantity);
			tr.find('.chosen-product-guantity').html(chosen_product.guantity);
			tr.find('.chosen-product-color').html(chosen_product.color);
			tr.find('.chosen-product-size').html(chosen_product.size);
			shopping_cart_big.append(tr);

			total_price += parseInt(chosen_product.price*chosen_product.guantity);
			$('.total-price').html(" : &pound; "+total_price);

			guantity_items += parseInt(chosen_product.guantity);
			$('.guantity-items').html(guantity_items);


		$('.remove-item').click(function() {
			// $(this).parent('.chosen-product-price');
			// $(this).parent('.total-price').html();

			// $(this).parent('.guantity-items');
			// $(this).parent('.total-price').html();
			
			$(this).parent().remove();
		});

    shopping_cart.addClass('visible');

    timeout = setTimeout(function() {
    	shopping_cart.removeClass('visible');
    }, 2000);
  });

$('.basket').on("click", function() {
	$('.popup').show();
});

$('.close').on("click", function() {
	$(this).parents('.hiden-cart').hide();
});






  // Hide the toTop button when the page loads.
  $("#toTop").css("display", "none");

  // This function runs every time the user scrolls the page.
  $(window).scroll(function(){

    // Check weather the user has scrolled down (if "scrollTop()"" is more than 0)
    if($(window).scrollTop() > 500){
      // If it's more than or equal to 500, show the toTop button.
      // console.log("is more");
      $("#toTop").fadeIn("slow");
    } else {
      // If it's less than 0 (at the top), hide the toTop button.
      // console.log("is less");
      $("#toTop").fadeOut("slow");
    }});

  // When the user clicks the toTop button, we want the page to scroll to the top.
  $("#toTop").click(function(){
    // Disable the default behaviour when a user clicks an empty anchor link.
    // (The page jumps to the top instead of // animating)
    event.preventDefault();
    // Animate the scrolling motion.
    $("html, body").animate({
    	scrollTop:0
    },"slow");
  });

  
  // при наведении и отведении курсора от элемента <p> будем "переключать" наличие класса over
  $("li").on("mouseenter mouseleave", function(){
  	$(this).toggleClass("over");
  });

});