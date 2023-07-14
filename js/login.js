$(document).ready(function(){
    const login = new Login()
    login.handleMobileLandscape()
    $(window).on('resize',function(){
        login.handleMobileLandscape()
        login.createGrid();
    })
})


class Login{
    constructor(){
        this.$el = $('body')
        this.elHeight = this.$el.outerHeight()
        this.elWidth = this.$el.outerWidth()
        this.$wrapper = $('html')
        this.startData = {
            size:{
                width:this.$wrapper.width(),
                height:this.$wrapper.width()
            }
        }
    }
    handleMobileLandscape(){
        if(window.innerHeight < window.innerWidth){
            $('.mobileCss').attr('href','#')
            var scale;

            scale = Math.min(
                this.$wrapper.width() / 1920,    
                this.$wrapper.height() / 1080
            );
            this.$el.css({
                transform: "translate(-50%, -50%) " + "scale(" + scale + ")",minWidth:'1920px',minHeight:'1080px',left:'50%',top:'50%',maxWidth:'100%',maxHeight:'100%',zoom: '1'
            });
        }else{
            $('.mobileCss').attr('href','css/mobile.css')
            this.$el.css({
                transform: "translate(0, 0) scale(1)",minWidth:'100%',minHeight:'100%',maxWidth:'100%',maxHeight:'100%',left:'0',top:'0',zoom: '1'
            });
        }
    }
}