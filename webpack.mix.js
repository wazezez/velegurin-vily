let mix = require('laravel-mix');
require('mix-html-builder');
mix.options({
        processCssUrls: false,
        autoprefixer: {
            enabled: true,
            options: {
                overrideBrowserslist: ['last 2 versions', '> 1%'],
                cascade: true,
                grid: true,
            }
        },
    })
    .setPublicPath('/')
    .sass('src/scss/app.scss', 'assets/css/styles.css')
    .sass('src/scss/base/_fonts.scss', 'assets/css/fonts.css')
    .js('src/js/app.js', 'assets/js/scripts.js')
    .version()
    .html({
        htmlRoot: './src/*.html', // Your html root file(s)
        output: 'dist', // The html output folder
        partialRoot: './src/partials',    // default partial path
        layoutRoot: './src/layouts',    // default partial path
        minify: {
            removeComments: false
        }
    });

mix.browserSync({
    proxy: 'http://velegurin-vily.test/dist',
    files: [
        "*.htm",
        "**/*.htm",
        "**/**/*.css",
        "assets/css/*.css"
    ]
});
