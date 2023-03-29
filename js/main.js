
$(document).ready(function(){
    const layout = new Layout()
    const timers = document.querySelectorAll('.count-down .timer')
    timers.forEach((canvas) => {
        const timer = new CountdownTimer(canvas, 'timerValue', 40);
        timer.countdown();
    });
    layout.logoAnimation()
    layout.createGrid()

    $('#soundSettings :checkbox').each(function(){
        layout.setupSound(this)
    })

    $(window).on('resize',function(){
        layout.createGrid()
    })
    //filter table
    $('.table-filter button').on('click',function(){
        layout.filterTable(this)
    })

    $('.toggleFull').on('click',function(){
        layout.toggleFullScreen(this)
    })

    //modal events
    $('.closeModal').on('click',function(){
        layout.modalClose()
    })
    //modal open
    $('.toggle-history').on('click',function(){
        layout.historyModal()
    })
    $('.toggle-contact').on('click',function(){
        layout.toggleContact()
    })
    $('.toggle-settings').on('click',function(){
        layout.toggleSettings()
    })
    $('.toggle-tables').on('click',function(){
        $('#tablesModal').addClass('show')
        layout.createGrid()
    })
    // event for multi betting room select
    $('.multi-rooms .room').on('click',function(event){
        layout.roomSelect(this)
    })
    //selected table for multi-betting
    $('#tablesModal .main-content .card-board').on('click',function(){
       layout.selectTable()
    })
    $('.toggle-menu').on('click',function(){
        layout.toggleMenu()
    })
    $('.toggle-chips').on('click',function(){
       layout.toggleChipSettings()
    })

    //toggle bottom menu
    $('.toggleBottomMenu').on('click',function(){
        layout.toggleBottomMenu(this)
    })

    //betting area highlight
    $('.bet-area .area').one('click',function(){
        layout.appendChipAreaBool = true
    })

    $('.bet-area .area').on('click',function(){
        let _this = this
        let chip = JSON.parse(localStorage.getItem("selectedChip"))
        layout.selectedBet = $(_this).attr('class')
        layout.chipPos = $(_this).offset()
        $('.bet-area .area').removeClass('active')
        $(_this).toggleClass('active')
        layout.chipStack = layout.chipStack+.4
        if(chip.chipNo){
            if(window.innerWidth > 935){
                if(layout.appendChipAreaBool){
                    layout.appendChipAreaBool = false
                    $(_this).append(`<div class="btn-chip chip-${chip.chipNo}" value="${chip.chipValue}"></div>`)
                    $(_this).find(`div.chip-${chip.chipNo}`).css({left:layout.chipOffset.left,top:layout.chipOffset.top,position:'fixed'}).animate({
                        "left": `${layout.chipPos.left + $(_this).outerWidth()/2}px`,
                        "top": `${layout.chipPos.top + $(_this).outerHeight()/2 + 20}px`,
                    },"slow", function() {
                        layout.appendChipAreaBool = true
                        $(this).css({position:'absolute',left:`50%`,top:`${75 - layout.chipStack}%`})
                        $(_this).append(`<a style="position:absolute;left:50%;top:${75 - layout.chipStack}%" class="btn-chip chip-${chip.chipNo}" value="${chip.chipValue}"></a>`)
                    });
                }
            }else{
                $(_this).append(`<div class="btn-chip chip-${chip}" style="position:absolute;left:50%;top:${75 - layout.chipStack}%" value="${chip.chipValue}"></div>`)
                $(_this).append(`<a style="position:absolute;left:50%;top:${75 - layout.chipStack}%" class="btn-chip chip-${chip.chipNo}" value="${chip.chipValue}"></a>`)
            }
        }
    })

    $('#soundSettings :checkbox').on('click',function(){
        layout.setupSound(this)
    })
    //room chips replace
    $('.prevChip').on('click',function(){
        layout.prevChip()
    })

    $('.nextChip').on('click',function(){
        layout.nextChip()
    })

    $('.btn, input, select, .card-board').on('click',function(){
        layout.toggleClickSound()
    })

    $('#toggleVideo').on('click',function(){
        $('#roomVideo').toggleClass('hidden')
        $(this).html($('#roomVideo').is(":hidden")?'<i class="fa-solid fa-video"></i>':'<i class="fa-solid fa-video-slash"></i>')
    })

    $(document).on('click','button.btn-chip',function(){
       layout.chipSelect(this)
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
        this.tableColNumber = 0,
        this.multiBetRoom = null,
        this.roomId = null,
        this.appendChipAreaBool = false,
        this.chipStack = 1,
        this.clickSound = new Audio("/sound/click.mp3");
        this.bgm = new Audio("/sound/bgm.mp3");
        this.masterSound = true,
        this.sfx = true,
        this.music = true
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

        let smallBoxEl = '.card-board .card-body .results-wrapper-card ul.bead-road'
        let smallBoxElOne = '.card-board .card-body .results-wrapper-card ul.main-road'
        let smallBoxElTwo = '.card-board .card-body .results-wrapper-card ul.bigeye-road'
        let smallBoxElThree = '.card-board .card-body .results-wrapper-card ul.small-road'
        let smallBoxElFour = '.card-board .card-body .results-wrapper-card ul.cock-roach'
        
        let bigBoxEl = '.room .bottom .results-wrapper ul.bead-road'
        let bigBoxElOne = '.room .bottom .results-wrapper ul.main-road'
        let bigBoxElTwo = '.room .bottom .results-wrapper ul.bigeye-road'
        let bigBoxElThree = '.room .bottom .results-wrapper ul.small-road'
        let bigBoxElFour = '.room .bottom .results-wrapper ul.cock-roach'

        if(window.innerWidth > 935){
            let breadRoadCol = 2 * Math.round(( $('ul.bead-road').outerWidth() / 7) / 2)
            let mainRoadCol = 2 * Math.round( $('ul.main-road').outerWidth() / (7.5/2) /2)
            for(let i=0;i<this.makeDivisibleBySix(breadRoadCol);i++){
                $(`${bigBoxEl}`).append(`<li class="blink"><div class="result red"></div></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                $(`${bigBoxElOne}`).append(`<li><div class="result outline-blue"></div><div class="tie-result"></div><div class="pair-banker"></div><div class="pair-player"></div></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol)*2;i++){
                $(`${bigBoxElTwo}`).append(`<li><div class="result outline-blue"></div></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                $(`${bigBoxElThree}`).append(`<li><div class="result fill-blue"></div></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                $( `${bigBoxElFour}`).append(`<li><div class="result line-red"></div></li>`)
            }
        }
        else{
            let mainRoadCol = 2 * Math.round( $('ul.main-road').outerWidth() / (3.5/2) /2)
            for(let i=0;i<30;i++){
                $(`${bigBoxEl}`).append(`<li><div class="result red"></div><div class="pair-banker"></div><div class="pair-player"></div></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                $(`${bigBoxElOne}`).append(`<li><div class="result outline-red"></div></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol)*2;i++){
                $(`${bigBoxElTwo}`).append(`<li></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                $(`${bigBoxElThree}`).append(`<li></li>`)
            }
            for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                $(`${bigBoxElFour}`).append(`<li><div class="result line-blue"></div></li>`)
            }
        }

        let bigBeadRoadItemSize = Math.round($(`${bigBoxEl} li`).outerHeight() - 2)
        let bigMainRoadItemSize = Math.round($(`${bigBoxElOne} li`).outerHeight() - 1)
        let bigBigeyeRoadItemSize = Math.round($(`${bigBoxElTwo} li`).outerHeight())
        let bigSmallRoadItemSize = Math.round($(`${bigBoxElThree} li`).outerHeight() - 1)
        let bigCockRoadItemSize = Math.round($(`${bigBoxElFour} li`).outerHeight() - 1)
        
        $(`${bigBoxEl} li`).find('.result').css({width:`${bigBeadRoadItemSize}px`,height:`${bigBeadRoadItemSize}px`})
        $(`${bigBoxElOne} li`).find('.result').css({width:`${bigMainRoadItemSize}px`,height:`${bigMainRoadItemSize}px`})
        $(`${bigBoxElTwo} li`).find('.result').css({width:`${bigBigeyeRoadItemSize}px`,height:`${bigBigeyeRoadItemSize}px`})
        $(`${bigBoxElThree} li`).find('.result').css({width:`${bigSmallRoadItemSize}px`,height:`${bigSmallRoadItemSize}px`})
        $(`${bigBoxElFour} li`).find('.result').css({width:`${bigCockRoadItemSize}px`,height:`${bigCockRoadItemSize}px`})

        this.tableColNumber = 3

        let mainRoadColSmall = 2 * Math.round( $(`${smallBoxElOne}`).outerWidth() / (this.tableColNumber/2) /2)

        for(let i=0;i<30;i++){
            $(`${smallBoxEl}`).append(`<li><div class="result blue"></div></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadColSmall);i++){
            $(`${smallBoxElOne}`).append(`<li><div class="result outline-red"></div><div class="tie-result" total="1"></div></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadColSmall)*2;i++){
            $(`${smallBoxElTwo}`).append(`<li><div class="result outline-blue"></div></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadColSmall);i++){
            $(`${smallBoxElThree}`).append(`<li><div class="result fill-red"></div></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadColSmall);i++){
            $(`${smallBoxElFour}`).append(`<li><div class="result line-red"></div></li>`)
        }

        let beadRoadItemSize = Math.round($(`${smallBoxEl} li`).outerHeight() - 2)
        let mainRoadItemSize = Math.round($(`${smallBoxElOne} li`).outerHeight() - 1)
        let bigeyeRoadItemSize = Math.round($(`${smallBoxElTwo} li`).outerHeight())
        let smallRoadItemSize = Math.round($(`${smallBoxElThree} li`).outerHeight() - 1)
        let cockRoadItemSize = Math.round($(`${smallBoxElFour} li`).outerHeight() - 1)

        $(`${smallBoxEl} li`).find('.result').css({width:`${beadRoadItemSize}px`,height:`${beadRoadItemSize}px`})
        $(`${smallBoxElOne} li`).find('.result').css({width:`${mainRoadItemSize}px`,height:`${mainRoadItemSize}px`})
        $(`${smallBoxElTwo} li`).find('.result').css({width:`${bigeyeRoadItemSize}px`,height:`${bigeyeRoadItemSize}px`})
        $(`${smallBoxElThree} li`).find('.result').css({width:`${bigeyeRoadItemSize}px`,height:`${smallRoadItemSize}px`})
        $(`${smallBoxElFour} li`).find('.result').css({width:`${cockRoadItemSize}px`,height:`${cockRoadItemSize}px`})
    }
    chipSelect(_this){
        this.chipValue = $(_this).data("val")
        this.selectedChip = this.chips.indexOf(this.chipValue)+1
        this.chipOffset = $(_this).offset()
        $('.btn-chip').removeClass('active animate__animated animate__pulse animate__bounceInLeft')
        $('.btn-chip').removeClass('active animate__animated animate__pulse animate__bounceInRight')
        $(_this).addClass('active animate__animated animate__pulse') 
        localStorage.setItem("selectedChip",JSON.stringify({chipNo:this.selectedChip,chipValue:this.chipValue}));
    }
    prevChip(){
        $('.chips').html('')
        this.chips.forEach((el,index)=>{
            if(index<6)
                $('.chips').append(`<button class="btn-chip chip-${index+1} animate__animated animate__bounceInRight" value="${el}" data-val="${el}"></button>`)
        })
    }
    nextChip(){
        $('.chips').html('')
        this.chips.forEach((el,index)=>{
            if(index>3)
                $('.chips').append(`<button class="btn-chip chip-${index+1} animate__animated animate__bounceInLeft" value="${el}" data-val="${el}"></button>`)
        })
    }
    toggleBottomMenu(_this){
        $('.bottom-menu').toggleClass('show')
        this.bottomBool = !this.bottomBool
        if(this.bottomBool){
            $(_this).html('<i class="fa-solid fa-angle-right"></i>')
            $('.bottom-menu').addClass('animate__animated animate__fadeInRight')
        }else{
            $(_this).html('<i class="fa-solid fa-angle-left"></i>')
            $('.bottom-menu').removeClass('animate__animated animate__fadeInRight')
        }
    }
    filterTable(_this){
        let el = $(_this).data('tval')
        switch(el){
            case 'two':
                $('.table-grid').removeClass('col-three')
                $('.table-grid').removeClass('col-four')
                $('.table-grid').addClass('col-two')
                $('.table-grid button img').addClass('inactive')
                $(_this).find('img').removeClass('inactive')
            break;
            case 'three':
                $('.table-grid').removeClass('col-two')
                $('.table-grid').removeClass('col-four')
                $('.table-grid').addClass('col-three')
                $('.table-grid button img').addClass('inactive')
                $(-this).find('img').removeClass('inactive')
            break;
            case 'four':
                $('.table-grid').removeClass('col-two')
                $('.table-grid').removeClass('col-three')
                $('.table-grid').addClass('col-four')
                $('.table-grid button img').addClass('inactive')
                $(_this).find('img').removeClass('inactive')
            break;
        }
        this.createGrid()
    }
    toggleFullScreen(_this){
        if(!this.fsBool){
            this.fsBool = true
            this.openFullscreen()
            $(_this).html('<i class="fa-solid fa-compress"></i>')
        }else{
            this.fsBool = false
            this.closeFullscreen()
            $(_this).html('<i class="fa-solid fa-expand"></i>')
        }
    }
    modalClose(){
        $('.modal-wrapper').removeClass('show')
    }
    historyModal(){
        $('#historyModal').addClass('show')  
        $('.modal-wrapper.side').removeClass('show')
    }
    toggleSettings(){
        $('#settingsModal').addClass('show')
        $('.modal-wrapper.side').removeClass('show')
    }
    toggleContact(){
        $('#contactModal').addClass('show')
    }
    selectTable(){
        this.createGrid()
        $('.modal-wrapper').removeClass('show')
        $(this.multiBetRoom).html(`<iframe src="multi-room.html" id="${this.roomId}" height="700" width="300" title="Multi-Betting Room 1"></iframe>`)
    }
    toggleMenu(){
        $('#menuModal').addClass('show')
    }
    toggleChipSettings(){
        $('#chipModal').addClass('show')
    }
    roomSelect(_this){
        $('#tablesModal').addClass('show')
        this.multiBetRoom = _this
        this.roomId = $(this.multiBetRoom).data('room')
    }
    toggleClickSound(){
        if(this.masterSound && this.sfx)
            this.clickSound.play()
    }
    setupSound(_this){
        let val = $(_this).val()
        let checkStat = _this.checked
        if(val == 'master'){
            if(checkStat){
                this.masterSound = true
                this.bgm.play()
                $('#soundSettings :checkbox')[1].disabled = false
                $('#soundSettings :checkbox')[2].disabled = false
                $('#soundSettings :checkbox')[3].disabled = false
                $('#soundSettings :checkbox')[1].checked = true
                $('#soundSettings :checkbox')[2].checked = true
                $('#soundSettings :checkbox')[3].checked = true
            }else{
                this.masterSound = false
                this.bgm.pause()
                $('#soundSettings :checkbox')[1].disabled = true
                $('#soundSettings :checkbox')[2].disabled = true
                $('#soundSettings :checkbox')[3].disabled = true
                $('#soundSettings :checkbox')[1].checked = false
                $('#soundSettings :checkbox')[2].checked = false
                $('#soundSettings :checkbox')[3].checked = false
            }
        }
        if(val == 'sfx'){
            if(checkStat){
                this.sfx = true
            }else{
                this.sfx = false
            }
        }
        if(val == 'music'){
            if(checkStat){
                this.music = true
                this.bgm.play()
            }else{
                this.music = false
                this.bgm.pause()
            }
        }
    }
}
