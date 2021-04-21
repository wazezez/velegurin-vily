const App = {
    /**
     * Application Custmo Select Initalization Function
     * 
     */
    initNiceSelect: function() {
        $('select').niceSelect();
    },
    /**
     * Application Sliders Initalization Function
     * 
     */
    initSliders: function() {
        
        $('#hero-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            variableWidth: true
         });  

        $('.js-posts-slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1
         });  

         $('.js-products-slider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1
         });        
         
    },

    /**
     * Application Handlers Initalization Function
     * 
     */
    initHandlers: function() {

        /**
         * Кнопка свайпа значения aria-opened
         */
        $('.js-swap-aria-opened').on('click',function(){            
            let container = $(this).attr('data-swap');
            $(container).attr('aria-opened',true);
        });

        $(document).mouseup(function(e){
            let container = $('.js-swap-aria-opened').attr('data-swap');
            if (!$(container).is(e.target) && $(container).has(e.target).length === 0){
                $(container).attr('aria-opened',false);
            }
        });
       

        /**
         * Slick slider «prev» navigation button
         */
         $('.js-slider-prev').on('click', function(){
            var slider = $(this).attr('data-slider');
            if(slider.length == 0) return;
            $(slider).slick("slickPrev");
        });

        /**
         * Slick slider «next» navigation button
         */
        $('.js-slider-next').on('click', function(){
            var slider = $(this).attr('data-slider');
            if(slider.length == 0) return;
            $(slider).slick("slickNext");
        });

        /**
         * Searchnox results handler
         */
        $('.searchbox input').on('keyup ',function() {
            let searchbox = $(this).closest('.searchbox');
            let searchboxResults = searchbox.find('.searchbox__results');
            let value = $(this).val();
            if(value.length > 0) {
                searchboxResults.addClass('searchbox__results_visible');
            } else {
                searchboxResults.removeClass('searchbox__results_visible');
            }
        });

        /**
         * Catalog toggle button
         */
        $('.js-catalog-toggle').on('click', function() {
            let burger = $(this).find('.burger-menu');
            $(burger).addClass('open');
        });

        $(document).mouseup(function(e){
            let container = $('.burger-menu');
            if (!$(container).is(e.target) && $(container).has(e.target).length === 0){
                $(container).removeClass('open')
            }
        });

    },
    
    /**
     * Application Main Initializer
     * 
     */
    init: function() {
        this.initNiceSelect();
        this.initSliders();
        this.initHandlers();
        console.log('App has been initialized.');
    }
};

$(document).ready(function () {
    App.init();
});


