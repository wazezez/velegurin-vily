export const MenuCropper = {
    /**
     * Container class which will be cropped
     * 
     * @var string
     */
    containerClass: 'js-crop-menu',

    /**
     * Container class which will be appended to cropped menu
     * 
     * @var string
     */
    appendedContainerClass: 'menu-crop appended-list-item',

    /**
     * Menu class which will be appended to cropped menu
     * 
     * @var string
     */
     appendedMenuClass: 'appended-menu-item',
     
    /**
     * @var current window width
     */
    windowWidth: $(window).width() + 16,

    /**
     * Return current mediabreakpoint
     * 
     * @return HTMLUListElement
     */
    currentMediaBreakPoint() {              
        if (this.windowWidth < 575) return 'xs';
        if (this.windowWidth < 768) return 'sm';
        if (this.windowWidth < 991) return 'md';
        if (this.windowWidth < 1199) return 'lg';
    },

    /**
     * Get SVG icon to button
     * 
     * @return HTMLUListElement
     */
    getButtonIcon() {
        let svg = document.createElement( 'svg' );
        svg.innerHTML = `<svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 0C1.39543 0 0.5 0.89543 0.5 2C0.5 3.10457 1.39543 4 2.5 4C3.60457 4 4.5 3.10457 4.5 2C4.5 0.89543 3.60457 0 2.5 0ZM9 0C7.89543 0 7 0.89543 7 2C7 3.10457 7.89543 4 9 4C10.1046 4 11 3.10457 11 2C11 0.89543 10.1046 0 9 0ZM15.5 0C14.3954 0 13.5 0.89543 13.5 2C13.5 3.10457 14.3954 4 15.5 4C16.6046 4 17.5 3.10457 17.5 2C17.5 0.89543 16.6046 0 15.5 0Z" fill="#333333"/>
        </svg>`;
        return svg;
    },

    /**
     * Generate button to expand list
     * 
     * @return HTMLUListElement
     */
     generateExpandButton() {        
        let button = document.createElement('button');
        button.append(this.getButtonIcon());
        return button;
    },

    /**
     * Generate list item to append
     * 
     * @return HTMLUListElement
     */
     generateAppendedListItem(menu) {        
        let li = document.createElement('li');
        li.className = this.appendedContainerClass;
        li.append(this.generateExpandButton());
        li.append(menu);
        return li;
    },

    /**
     * Generate menu to append
     * 
     * @return HTMLUListElement
     */
    generateAppendedMenu() {
        let menu = document.createElement('ul');
        menu.className = this.appendedMenuClass;
        return menu;
    },
 
    /**
     * Init handlers
     * 
     * @return void
     */   
    initHandlers() {
        $(document).on('click',`.menu-crop button`,function(){
            $(this).parent().find(`.appended-menu-item`).addClass('visible');
        });

        $(document).mouseup(function(e){
            let container = $(`.appended-menu-item`);
            if (!$(container).is(e.target) && $(container).has(e.target).length === 0){
                $(container).removeClass('visible');
            }
        });     
    },

    /**
     * Crop menu
     * @param menu any
     * @return void
     */ 
    crop(menu) {
        let $menu = $(menu);
        let numbersToShowBreakpoints = {
            xs: $menu.attr('data-xs-show') || null,
            sm: $menu.attr('data-sm-show') || null,
            md: $menu.attr('data-md-show') || null,
            lg: $menu.attr('data-lg-show') || null,
        }
        let numberToShow = numbersToShowBreakpoints[this.currentMediaBreakPoint()];

        // Generate Menu
        let appendedMenu = this.generateAppendedMenu();

        $menu.children().each(function(index, el) {
            if(index + 1 > numberToShow) {
                $(appendedMenu).append(`<li>${$(el).html()}</li`);
                el.remove();
            }            
        });
        let li = this.generateAppendedListItem(appendedMenu);
        $menu.append(li);
    },

    /**
     * @module       MenuCropper
     * @description  Module Init
     */
    init() {
        $(`.${this.containerClass}`).each((i,el) => this.crop(el));
        this.initHandlers();
    }
}
