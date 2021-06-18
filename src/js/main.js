import {MenuCropper} from './modules/menucropper';
import {MenuToggle} from './modules/menutoggle';
import {convertImages} from './modules/convertimages';
import copy from 'copy-to-clipboard';
import 'jquery-zoom';
const App = {
    /**
     * Application Image Zoom Initalization Function
     * 
     */
    initImageZoom: function() {
        $('.js-zoom-image').zoom();
    },  
    /**
     * Application Custom Select Initalization Function
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
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                      slidesToShow: 3,
                    }
                },
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                    breakpoint: 767,
                    settings: {
                      slidesToShow: 1,
                    }
                }
            ]
        });  

        $('.js-products-slider').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                      slidesToShow: 3,
                    }
                },
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                    breakpoint: 767,
                    settings: {
                      slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                      slidesToShow: 1,
                    }
                }
            ]
        });    
         
        $('.js-fullproduct-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            // verticalSwiping: false
        });   
        
        
        let xCoordStart,
            yCoordStart,
            xSlideTrigger = 10,
            slickElement = $(".slick-slider");

        slickElement.on('touchstart', function (e){
            xCoordStart = e.originalEvent.touches[0].clientX;
            yCoordStart = e.originalEvent.touches[0].clientY;
        });

        slickElement.on('touchend', function (e){
            var xCoordEnd = e.originalEvent.changedTouches[0].clientX;
            var yCoordEnd = e.originalEvent.changedTouches[0].clientY;

            var deltaX = Math.abs(xCoordEnd - xCoordStart)
            var deltaY = Math.abs(yCoordEnd - yCoordStart)

            if(deltaX > deltaY){  // prevent slide while scrolling vertically
                if(xCoordStart > xCoordEnd + xSlideTrigger){
                    slickElement.slick('slickNext');
                }
                else if(xCoordStart < xCoordEnd + xSlideTrigger){
                    slickElement.slick('slickPrev');
                }
            }

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
            let menu = $(this).attr('data-toggle-menu');
            if(burger.hasClass('open')) {
                $(burger).removeClass('open');
                $(menu).attr('aria-opened',false);
            } else {
                $(burger).addClass('open');
                $(menu).attr('aria-opened',true);
            }
        });

        $(document).mouseup(function(e){
            let button = $('.js-catalog-toggle');
            let menu = button.attr('data-toggle-menu');            
            if ((!$(button).is(e.target) && $(button).has(e.target).length === 0) || ($(menu).is(e.target)) ){
                $(button).find('.burger-menu').removeClass('open');
                $(menu).attr('aria-opened',false);
            }
        });

        /**
         * @description  Кнопка прокрутки до конкретного элемента
         */
         $('.js-scroll-to').on('click',function(e) {
            let element = $(this).attr('data-scroll-to');
            if (element == '') return false;
            e.preventDefault();    
            $('html, body').stop().animate({
                scrollTop: $(element).offset().top
            }, 1000);              
        });

        /**
         * Input Counter
         */
        $('.js-input-counter button').on('click', function(e) {
            e.preventDefault();
            const operations = {
                add: (x) => {
                    if (!Number.isInteger(x)) return x;
                    if (x <= 0) return 1;
                    return ++x;
                },
                remove: (x) => {
                    if (!Number.isInteger(x)) return x;
                    if (x <= 0) return 1;
                    if (x === 1) return x;
                    return --x;
                },
            }
            let action  = $(this).attr('data-action');
            let input  = $(this).closest('.js-input-counter').find('input[type=number]');
            let currentValue = parseInt(input.val());

            input.val(operations[action](currentValue));         
        });
        
        $('.js-input-counter input[type=number]').on('change',function() {
            if (this.value <=0) this.value = 1;
        });

        /**
         * Product Thumbnails
         */ 
        $('.js-product-thumbnails a').on('click',function(e) {
            let index = $(this).attr('data-index');
            let sliderId = $(this).closest('.js-product-thumbnails').attr('data-slider')
            $(sliderId).slick('slickGoTo',index);
            e.preventDefault();
        });

        /**
         * Show Catalog Sidebar on mobile devices
         */ 
        $('.js-show-catalog-sidebar').on('click',function(e) {
            $('#catalog-sidebar').addClass('catalog-sidebar_visible');
            $('body').addClass('overflow-hidden');
            e.preventDefault();
        });
        $('.catalog-sidebar__close').on('click',function(){
            $(this).parent('.catalog-sidebar').removeClass('catalog-sidebar_visible');
        });
        $(document).mouseup(function(e){
            let container = $('#catalog-sidebar');
            if (!$(container).is(e.target) && $(container).has(e.target).length === 0 && $('.catalog-sidebar').hasClass('catalog-sidebar_visible')){
                $(container).removeClass('catalog-sidebar_visible');
                $('body').removeClass('overflow-hidden');
            }
        });        

        /**
         * Convert images to svg
         */    
        convertImages('.svg');

        /**
         * Like Button Active Toggle
         */    
        $('.button_like').on('click',function(e) {
            e.preventDefault();
            $(this).toggleClass('button_like_active');
        })

        /**
         * Reinit Slick Slider in modal
         */  
        $('#productQuickView').on('shown.bs.modal',function(){
            $(this).find('.js-fullproduct-slider').slick('setPosition');
        });

        /**
         * Show Product Preview on button click
         */    
         $('.js-show-product-preview').on('click',function(e) {
            e.preventDefault();
        })

        /**
         * Copy to clipboard handler
         */ 
        $('.js-copy-to-clipboard').on('click', function() {
            let text = $(this).attr('data-link');
            copy(text);
        });

        $('.js-show-cart-widget').on('mouseover',function(){
            $('#cart-widget').addClass('cart-widget_visible');
        });

        $('.js-show-cart-widget').on('mouseout',function(){
            $('#cart-widget').removeClass('cart-widget_visible');
        });

        /**
         * Show Mobile Search On Button Click
         */ 
        $('.js-show-mobilesearch').on('click', function(){
            $('.mobile-header__search').toggleClass('visible');
        });

        /**
         * Show Mobile Menu On Bar Click
         */ 
        $('.js-show-mobile-menu').on('click', function(){
            $('.mobile-menu').addClass('visible');
            $('body').addClass('overflow-hidden');
            $('body').append('<div class="mobile-menu-overlay"></div>');
        });        

        $('.menu-screen__close').on('click', function(){
            $('#mobile-menu').removeClass('visible');
            $('body').removeClass('overflow-hidden');
            $('.mobile-menu-overlay').remove();
        });        

        $(document).mouseup(function(e){
            let container = $('#mobile-menu');
            if (!container.is(e.target) && container.has(e.target).length === 0 && container.hasClass('visible')){
                container.removeClass('visible');
                $('body').removeClass('overflow-hidden');
                $('.mobile-menu-overlay').remove();
            }
        });  

        $('.js-show-product-popup').on('click',function(){
            let popup = $(this).find('.product-card__popup');
            if(popup.hasClass('visible')) {
                popup.removeClass('visible');
            } else {
                popup.addClass('visible');
            }            
        });

        $(document).mouseup(function(e){
            let container = $('.product-card__popup');
            if (!container.is(e.target) && container.has(e.target).length === 0){
                container.removeClass('visible');
            }
        });  

        $('.js-show-product-sizes').on('click',function(){
            let toggled = $(this).attr('aria-toggle');
            if (toggled == 'false') {
                $(this).siblings('.product-card__sizes').addClass('product-card__sizes_active');
                $(this).attr('aria-toggle',true);
            } else {
                $(this).siblings('.product-card__sizes').removeClass('product-card__sizes_active');
                $(this).attr('aria-toggle',false);
            }
        });

        $(document).mouseup(function(e){
            let container = $('.product-card__sizes');
            if (!container.is(e.target) && container.has(e.target).length === 0  && !$('.js-show-product-sizes').is(e.target) && $('.js-show-product-sizes').has(e.target).length === 0){
                container.removeClass('product-card__sizes_active');
                container.siblings('.js-show-product-sizes').attr('aria-toggle',false);
            }
        });  



        /**
         * Show Only Current Opened Modal
         */         
         $('.modal').on('show.bs.modal', function () {
            $('.modal').not($(this)).each(function () {
                $(this).modal('hide');
            });
        });

        /**
         * Show page action on mobile
         */     
        (function(){
            if ($('.js-page-action').length == 0 ) return false;

            let element_id = $('.js-page-action').attr('data-show-after').replace('#','');

            let element = document.getElementById(element_id);
            
            $(window).on('scroll',function() {
                if(window.scrollY - $('.js-page-action').height() > (element.offsetTop + element.offsetHeight)){
                    $('#page-action').addClass('visible'); 
                } else {
                    $('#page-action').removeClass('visible'); 
                }
            });
        })();


        $('.button_addtocart').on('click',function(){
            $(this).toggleClass('button_active');
        })

    },
    /**
     * @module Cookie Message
     * @description  Инициализация блока о принятии куки
     */
    initCookieMessage: () => {

        let showCookieMessage = Cookies.get('show-cookie-message');

        if (typeof showCookieMessage === "undefined" || showCookieMessage == false)  {
            $('#cookie-notification').addClass('cookie-notification_visible');
        };

        $('.js-cookie-notify-close').on('click',function(){
            Cookies.set('show-cookie-message',true,{expires: 365});
            $('#cookie-notification').removeClass('cookie-notification_visible');
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
        this.initImageZoom();
        this.initCookieMessage();
        MenuCropper.init();
        MenuToggle.init();
    }
};

$(document).ready(function () {
    App.init();
});


