export const MenuToggle = {
    initHandlers() {
        $('[data-toggle-menu]').on('click',function(e){
            e.preventDefault();
            $(this).siblings('.menu-screen').addClass('visible');
        });

        $('.menu-screen button[role=back]').on('click',function(){
            $(this).closest('.menu-screen').removeClass('visible');
        });
    },
    init() {
        this.initHandlers();
    }
}