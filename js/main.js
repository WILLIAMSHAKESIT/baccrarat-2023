
$(document).ready(function(){
    const layout = new Layout()
    const timers = document.querySelectorAll('.count-down .timer')
    timers.forEach((canvas) => {
        const timer = new CountdownTimer(canvas, 'timerValue', 40);
        timer.countdown();
    });
    layout.logoAnimation()
    layout.createGrid()
    // layout.createGrid2()

    $(window).on('resize',function(){
        layout.createGrid()
        // layout.createGrid2()
    })

    //filter table
    $('.table-filter button').on('click',function(){
        let el = $(this).data('tval')
        switch(el){
            case 'two':
                $('.table-grid').removeClass('col-three')
                $('.table-grid').removeClass('col-four')
                $('.table-grid').addClass('col-two')
                $('.table-grid button img').addClass('inactive')
                $(this).find('img').removeClass('inactive')
            break;
            case 'three':
                $('.table-grid').removeClass('col-two')
                $('.table-grid').removeClass('col-four')
                $('.table-grid').addClass('col-three')
                $('.table-grid button img').addClass('inactive')
                $(this).find('img').removeClass('inactive')
            break;
            case 'four':
                $('.table-grid').removeClass('col-two')
                $('.table-grid').removeClass('col-three')
                $('.table-grid').addClass('col-four')
                $('.table-grid button img').addClass('inactive')
                $(this).find('img').removeClass('inactive')
            break;
        }
        layout.createGrid2()
    })

    $('.toggleFull').on('click',function(){
        if(!layout.fsBool){
            layout.fsBool = true
            layout.openFullscreen()
            $(this).html('<i class="fa-solid fa-compress"></i>')
        }else{
            layout.fsBool = false
            layout.closeFullscreen()
            $(this).html('<i class="fa-solid fa-expand"></i>')
        }
    })

    //modal events
    $('.closeModal').on('click',function(){
        $('.modal-wrapper').removeClass('show')
    })

    //modal open
    $('.toggle-history').on('click',function(){
        $('#historyModal').addClass('show')  
        $('.modal-wrapper.side').removeClass('show')
    })
    $('.toggle-contact').on('click',function(){
        $('#contactModal').addClass('show')
    })
    $('.toggle-settings').on('click',function(){
        $('#settingsModal').addClass('show')
        $('.modal-wrapper.side').removeClass('show')
    })
    $('.toggle-tables').on('click',function(){
        $('#tablesModal').addClass('show')
    })
    $('.toggle-menu').on('click',function(){
        $('#menuModal').addClass('show')
    })
    $('.chip-settings').on('click',function(){
        $('#chipModal').addClass('show')
    })

    //toggle bottom menu
    $('.toggleBottomMenu').on('click',function(){
        $('.bottom-menu').toggleClass('show')
        layout.bottomBool = !layout.bottomBool
        if(layout.bottomBool){
            $(this).html('<i class="fa-solid fa-angle-right"></i>')
            $('.bottom-menu').addClass('animate__animated animate__fadeInRight')
        }else{
            $(this).html('<i class="fa-solid fa-angle-left"></i>')
            $('.bottom-menu').removeClass('animate__animated animate__fadeInRight')
        }
    })
    let top = 1
    //betting area highlight
    let bool = false
    $('.bet-area .area').one('click',function(){
        bool = true
    })
    $('.bet-area .area').on('click',function(){
        let _this = this
        layout.selectedBet = $(this).attr('class')
        layout.chipPos = $(this).offset()
        $('.bet-area .area').removeClass('active')
        $(this).toggleClass('active')
        top = top+.4
        if(layout.selectedChip){
            if(window.innerWidth > 935){
                if(bool){
                    bool = false
                    $(_this).append(`<div class="btn-chip chip-${layout.selectedChip}" value="${layout.chipValue}"></div>`)
                    $(this).find(`div.chip-${layout.selectedChip}`).css({left:layout.chipOffset.left,top:layout.chipOffset.top,position:'fixed'}).animate({
                        "left": `${layout.chipPos.left + $(this).outerWidth()/2}px`,
                        "top": `${layout.chipPos.top + $(this).outerHeight()/2 + 20}px`,
                    },"slow", function() {
                        bool = true
                        $(this).css({position:'absolute',left:`50%`,top:`${80 - top}%`})
                        $(_this).append(`<a style="position:absolute;left:50%;top:${80 - top}%" class="btn-chip chip-${layout.selectedChip}" value="${layout.chipValue}"></a>`)
                    });
                }
            }else{
                $(_this).append(`<div class="btn-chip chip-${layout.selectedChip}" style="position:absolute;left:50%;top:${80 - top}%" value="${layout.chipValue}"></div>`)
                $(_this).append(`<a style="position:absolute;left:50%;top:${80 - top}%" class="btn-chip chip-${layout.selectedChip}" value="${layout.chipValue}"></a>`)
            }
        }
    })

    //room chips replace
    $('.prevChip').on('click',function(){
        $('.chips').html('')
        layout.chips.forEach((el,index)=>{
            if(index<6)
                $('.chips').append(`<button class="btn-chip chip-${index+1} animate__animated animate__bounceInRight" value="${el}" data-val="${el}"></button>`)
        })
    })

    $('.nextChip').on('click',function(){
        $('.chips').html('')
        layout.chips.forEach((el,index)=>{
            if(index>3)
                $('.chips').append(`<button class="btn-chip chip-${index+1} animate__animated animate__bounceInLeft" value="${el}" data-val="${el}"></button>`)
        })
    })

    $(document).on('click','button.btn-chip',function(){
        layout.chipValue = $(this).data("val")
        layout.selectedChip = layout.chips.indexOf(layout.chipValue)+1
        layout.chipOffset = $(this).offset()
        $('.btn-chip').removeClass('active animate__animated animate__pulse animate__bounceInLeft')
        $('.btn-chip').removeClass('active animate__animated animate__pulse animate__bounceInRight')
        $(this).addClass('active animate__animated animate__pulse')  
    })
})

  

class CountdownTimer {
    constructor(canvasId, timerDivId, totalTime) {
      this.canvas = canvasId;
      this.context = this.canvas.getContext('2d');
      this.timerDiv = $('.timerValue');
      this.totalTime = totalTime;
      this.remainingTime = 10;
      this.radius = this.canvas.width / 2;
      this.startAngle = 1.5 * Math.PI; // start at the top
      this.endAngle = 0; // end at the top again
      this.lineWidth = 15;
    }
  
    drawCircle(color, lineWidth, percent) {
      this.context.beginPath();
      this.context.strokeStyle = color;
      this.context.lineWidth = lineWidth;
      this.context.arc(
        this.radius,
        this.radius,
        this.radius,
        this.startAngle,
        this.startAngle - 2 * Math.PI * percent,
        true
      );
      this.context.stroke();
    }

    updateTimer() {
      const seconds = this.remainingTime % 60;
      this.timerDiv.text(`${seconds.toString().padStart(2, '0')}`)
    }
  
    countdown() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawCircle('#ccc', this.lineWidth, 1); // gray background
      const percent = this.remainingTime / this.totalTime;
      this.drawCircle('#00b344', this.lineWidth, percent); // red progress bar
      this.updateTimer();
      this.remainingTime--;
      if (this.remainingTime >= 0) {
        setTimeout(() => this.countdown(), 1000); // call countdown again in 1 second
        if(this.remainingTime == 9){
            $('.board-overlay').removeClass('inactive')
            $('.board-overlay').addClass('active')
        }
        if(this.remainingTime < 5){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawCircle('#ccc', this.lineWidth, 1); // gray background
            this.drawCircle('#f00', this.lineWidth, percent);
        }
        if(this.remainingTime == 5){
            $('.card-res').removeClass('face-down')
            $('.card-res.player .card').not(':first').addClass('animate__animated animate__flip')
            $('.card-res.player .horizontal, .card-res.banker .horizontal').addClass('animate__animated animate__flip')
            $('.card-res.banker .card').not(':last').addClass('animate__animated animate__flip')
            //remove classes
            $('.board-overlay').removeClass('animate__animated animate__fadeOutDownBig')
            $('.mid-result .winner-text').removeClass('animate__animated animate__bounceOutUp')
            $('.mid-result .winner-number img').removeClass('animate__animated animate__rotateOut')
            $('.mid-result span.player').removeClass('animate__animated animate__fadeOutLeft')
            $('.mid-result span.banker').removeClass('animate__animated animate__fadeOutRight')
            //add classes
            $('.mid-result').addClass('show')
            $('.mid-result .winner-text').addClass('animate__animated animate__bounceInDown')
            $('.mid-result .winner-number img').addClass('animate__animated animate__rotateIn')
            $('.mid-result span.player').addClass('animate__animated animate__fadeInLeft')
            $('.mid-result span.banker').addClass('animate__animated animate__fadeInRight')
        }
        if(this.remainingTime == 3){
            $('.board-overlay').addClass('animate__animated animate__fadeOutDownBig')
            $('.mid-result .winner-text').addClass('animate__animated animate__bounceOutUp')
            $('.mid-result .winner-number img').addClass('animate__animated animate__rotateOut')
            $('.mid-result span.player').addClass('animate__animated animate__fadeOutLeft')
            $('.mid-result span.banker').addClass('animate__animated animate__fadeOutRight')
        }
        if(this.remainingTime == 1){
            $('.card-res.player .card').removeClass('animate__animated animate__flip')
            $('.card-res').addClass('face-down')
            $('.board-overlay').removeClass('active')
            $('.board-overlay').addClass('inactive')
        }
      } else {
        this.remainingTime = 10;
        this.countdown()
      }
    }
}

class Layout{
    constructor(){
        this.fullScreen = document.documentElement, 
        this.fsBool = false,
        this.welcomeTimer = 10,
        this.tableTimer = 10,
        this.chips = ['1k','5k','10k','50k','100k','500k','1m','5m','10m','50m'],
        this.bottomBool = false,
        this.selectedChip = null,
        this.chipValue = '',
        this.chipOffset = null,
        this.chipPos= null,
        this.tableColNumber = 0
    
    }
    closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
    openFullscreen() {
        if (this.fullScreen.requestFullscreen) {
            this.fullScreen.requestFullscreen();
        } else if (this.fullScreen.webkitRequestFullscreen) { /* Safari */
            this.fullScreen.webkitRequestFullscreen();
        } else if (this.fullScreen.msRequestFullscreen) { /* IE11 */
            this.fullScreen.msRequestFullscreen();
        }
    }
    logoAnimation(){
        setInterval(function(){
            this.welcomeTimer--
            if(this.welcomeTimer == 6){
                $('header .logo').html('<h1 class="animate__animated animate__flipInX">Welcome</h1>')
            }
            if(this.welcomeTimer == 3){
                $('header .logo').html('<h1 class="animate__animated animate__flipInX">Enjoy Playing!</h1>')
            }
            if(this.welcomeTimer == 0){
                this.welcomeTimer = 10
                $('header .logo').html('<h1 class="animate__animated animate__flipInX">Hilton casino</h1>')
            }
        },1000)
    }
    makeDivisibleBySix(num) {
        if (num % 6 === 0) {
            return num - 6; 
        } else {
            let remainder = num % 6;
            let amountToAdd = 6 - remainder;
            let result = num + amountToAdd;
            return result - 6;
        }
    }
    timer(){

        let divs = document.querySelectorAll('.count-down .timer');

        [].forEach.call(divs, function(canvas) {
            const context = canvas.getContext('2d');
            const radius = canvas.width / 2;
            const lineWidth = 15;
            const fillColor = '#221710';
            const time = 40; 
            let elapsed = 40; 
            
            let timer = setInterval(() => {
                elapsed--;
                const endAngle = 2 * Math.PI * (elapsed / time) - 0.5 * Math.PI;
                context.beginPath();
                context.arc(radius, radius, radius - lineWidth / 2, -0.5 * Math.PI, 1.5 * Math.PI);
                context.fillStyle = fillColor;
                context.fill();
                context.beginPath();
                context.arc(radius, radius, radius - lineWidth / 2, -0.5 * Math.PI, endAngle);
                context.lineWidth = lineWidth;
                context.strokeStyle = '#169A2C';
                context.stroke();
                if(elapsed == 0){
                    elapsed = 40;
                    const endAngle2 = 2 * Math.PI * (elapsed / time) - 0.5 * Math.PI;
                    context.beginPath();
                    context.arc(radius, radius, radius - lineWidth / 2, -0.5 * Math.PI, 1.5 * Math.PI);
                    context.fillStyle = fillColor;
                    context.fill();
                    context.beginPath();
                    context.arc(radius, radius, radius - lineWidth / 2, -0.5 * Math.PI, endAngle2);
                    context.lineWidth = lineWidth;
                    context.strokeStyle = '#FF3B3B';
                    context.stroke();
                }
                $('.timerValue').html(`${elapsed}`)
            }, 1000);
        })
    }
    createGrid(){
        $( "ul.bead-road").html('')
        $( "ul.main-road").html('')
        $( "ul.bigeye-road").html('')
        $( "ul.small-road").html('')
        $( "ul.cock-roach").html('')
        if(window.innerWidth > 935){
            let breadRoadCol = 2 * Math.round(( $('ul.bead-road').outerWidth() / 6.9) / 2)
            let mainRoadCol = 2 * Math.round( $('ul.main-road').outerWidth() / (6.8/2) /2)
            for(let i=0;i<this.makeDivisibleBySix(breadRoadCol);i++){
                $( ".room .bottom .results-wrapper ul.bead-road").append(`<li><div class="result red"></div></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                $( ".room .bottom .results-wrapper ul.main-road").append(`<li><div class="result outline-blue"></div></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol)*2;i++){
                $( ".room .bottom .results-wrapper ul.bigeye-road").append(`<li><div class="result outline-blue"></div></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                $( ".room .bottom .results-wrapper ul.small-road").append(`<li><div class="result fill-blue"></div></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                $( ".room .bottom .results-wrapper ul.cock-roach").append(`<li><div class="result line-red"></div></li>`)
            }
        }
        else{
            let mainRoadCol = 2 * Math.round( $('ul.main-road').outerWidth() / (3.5/2) /2)
            for(let i=0;i<30;i++){
                $( ".room .bottom .results-wrapper ul.bead-road").append(`<li><div class="result red"></div><div class="pair-banker"></div><div class="pair-player"></div></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                $( ".room .bottom .results-wrapper ul.main-road").append(`<li><div class="result outline-red"></div></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol)*2;i++){
                $( ".room .bottom .results-wrapper ul.bigeye-road").append(`<li></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                $( ".room .bottom .results-wrapper ul.small-road").append(`<li></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                $( ".room .bottom .results-wrapper ul.cock-roach").append(`<li></li>`)
            }
        }
        
        this.tableColNumber = 3

        let mainRoadColSmall = 2 * Math.round( $('ul.main-road').outerWidth() / (this.tableColNumber/2) /2)

        for(let i=0;i<30;i++){
            $(".card-board .card-body .results-wrapper-card ul.bead-road").append(`<li><div class="result blue"></div></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadColSmall);i++){
            $(".card-board .card-body .results-wrapper-card ul.main-road").append(`<li><div class="result outline-red"></div></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadColSmall)*2;i++){
            $(".card-board .card-body .results-wrapper-card ul.bigeye-road").append(`<li></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadColSmall);i++){
            $(".card-board .card-body .results-wrapper-card ul.small-road").append(`<li></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadColSmall);i++){
            $(".card-board .card-body .results-wrapper-card ul.cock-roach").append(`<li></li>`)
        }
    }
    createGrid2(){
        $( "ul.bead-road").html('')
        $( "ul.main-road").html('')
        $( "ul.bigeye-road").html('')
        $( "ul.small-road").html('')
        $( "ul.cock-roach").html('')

        this.tableColNumber = 3

        let mainRoadCol = 2 * Math.round( $('ul.main-road').outerWidth() / (this.tableColNumber/2) /2)

        for(let i=0;i<30;i++){
            $(".results-wrapper-card ul.bead-road").append(`<li><div class="result blue"></div></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
            $(".results-wrapper-card ul.main-road").append(`<li><div class="result outline-red"></div></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadCol)*2;i++){
            $(".results-wrapper-card ul.bigeye-road").append(`<li></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
            $(".results-wrapper-card ul.small-road").append(`<li></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
            $(".results-wrapper-card ul.cock-roach").append(`<li></li>`)
        }
    }
}
