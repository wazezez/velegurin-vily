try {
    window.$ = window.jQuery = require('jquery');
    window.Cookies = require('js-cookie');
    require('bootstrap');
    require('slick-carousel');
    require('jquery-nice-select');
    

    //require('more-packages-installed-with-npm-install');

} catch (e) {}

require('./main');
