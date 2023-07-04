
var progress = 20;

function incrementProgress() {
if (progress != 100) {
    progress = progress + 10;
    console.log(progress);
    setProgress();
}
}


function decrementProgress() {
if (progress != 0) {
    progress = progress - 10;
    setProgress();
}
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
}

function setProgress() {
    document.getElementsByClassName("progress-spinner")[0].style.background =
        "conic-gradient(rgb(0, 175, 39) " +
        progress +
        "%,rgb(242, 242, 242) " +
        progress +
        "%)";
        
    document.getElementsByClassName("middle-circle")[0].innerHTML =
        progress.toString();
        
    document.getElementsByClassName("progress-spinner")[1].style.background =
    "conic-gradient(rgb(0, 175, 39) " +
    progress +
    "%,rgb(242, 242, 242) " +
    progress +
    "%)";
        
    document.getElementsByClassName("middle-circle")[1].innerHTML =
        progress.toString();

    document.getElementsByClassName("progress-spinner")[2].style.background =
    "conic-gradient(rgb(0, 175, 39) " +
    progress +
    "%,rgb(242, 242, 242) " +
    progress +
    "%)";
        
    document.getElementsByClassName("middle-circle")[2].innerHTML =
        progress.toString();    
}
// window.onload = function () {
//     setProgress();
// };
$(document).ready(function(){
    const layout = new Layout()
    const timers = document.querySelectorAll('.count-down .timer')
    timers.forEach((canvas) => {
        const timer = new CountdownTimer(canvas, 'timerValue', 40);
        timer.countdown();
    });
    layout.logoAnimation()
    layout.createGrid()
    layout.handleLoadingPage()
    layout.handleMobileLandscape()

    $(window).on('resize',function(){
        layout.createGrid()
        setTimeout(layout.handleMobileLandscape(), 300); 
    })
      
    $("iframe#roomVideo").contents().find("remoteVideo").css("object-fit", "fill");
    $('.toggle-limit').click(function(){
        layout.toggleRoomLimit()
    })
    $('.chips').on('mousedown',function(e){
        layout.mouseIsDown(e)
    })
    $('.chips').on('mouseup',function(e){
        layout.mouseUp(e)
    })
    $('.chips').on('mouseleave',function(e){
        layout.mouseLeave(e)
    })
    $('.chips').on('mousemove',function(e){
        layout.mouseMove(e)
    })
    $('body, html').on('click',function(e){
        layout.openFullscreen()
    })
    // disable right click
    // document.addEventListener("contextmenu", (event) => {
    //     event.preventDefault();
    // });
    //modal events
    $('body').click(function(){
        $('.btn-chip').removeClass('active')
    })
    $('.closeModal, .modal-wrapper').on('click',function(e){
        // e.stopPropagation()
        layout.modalClose()
    })
    $('.modal-container').on('click',function(e){
        // e.stopPropagation()
        return false
    })
    $('.buttons-chips .chips .btn-chip, .control-area-mobile .chips .btn-chip').on('touchstart',function(e){
        e.stopImmediatePropagation()
        layout.chipSelect(this)
    })
    $('.buttons-chips .chips, .control-area-mobile .chips, .top-control .chips').on('touchmove',function(e){
        console.log("MOVING")
        layout.isDragging = true
        // e.stopPropagation() 
       layout.handleTouchMove(this,e)
    })
    $('.buttons-chips .chips, .control-area-mobile .chips,  .top-control .chips').on('touchstart',function(e){
        console.log("START")
      //  layout.handleTouchStart(this,e)
    })
    $('.buttons-chips .chips, .control-area-mobile .chips').on('touchend',function(e){
        console.log("END")
        console.log(e,"EEEEEEEE")
       
        
        const targetElement = document.getElementById('TestChip');
        console.log(targetElement, "ZDXZXCCZCX")
        // Create a touch event+
                // Get the current position of the mouse cursor+

        var touch = e.changedTouches[0];  
        console.log(touch,"touch")
        var lastTouchX =  touch.clientX;
        var lastTouchY = touch.clientY;
        console.log(lastTouchX)
        const touchEvent = new TouchEvent('click', {
        bubbles: true,
        cancelable: true,
        touches: [
            new Touch({
            identifier: Date.now(),
            target: targetElement,
            clientX: lastTouchX,
            clientY: lastTouchY,
            pageX: lastTouchX,
            pageY: lastTouchY,
            }),
        ],
        changedTouches: [
            new Touch({
            identifier: Date.now(),
            target: targetElement,
            clientX: lastTouchX,
            clientY: lastTouchY,
            pageX: lastTouchX,
            pageY: lastTouchY,
            }),
        ],
        });
        // Find the element at the mouse position
        var element = document.elementFromPoint(lastTouchX, lastTouchY);

        // Dispatch the click event on the element
        if (element) {
            console.log(element)
        element.dispatchEvent(touchEvent);
    }
        // Dispatch the touch event to trigger it at the last touch location
        //targetElement.dispatchEvent(touchEvent);

    })

    // function mobileCLick(){
    //         const targetElement = document.getElementById('TestChip');
    //         console.log(targetElement, "ZDXZXCCZCX")
    //         // Create a touch event+
    //                 // Get the current position of the mouse cursor+

    //         var touch = e.touches[0];   
    //         console.log(touch,"touch")
    //         var lastTouchX =  touch.clientX;
    //         var lastTouchY = touch.clientY;
    //         console.log(lastTouchX)
    //         const touchEvent = new TouchEvent('touchstart', {
    //         bubbles: true,
    //         cancelable: true,
    //         touches: [
    //             new Touch({
    //             identifier: Date.now(),
    //             target: targetElement,
    //             clientX: lastTouchX,
    //             clientY: lastTouchY,
    //             pageX: lastTouchX,
    //             pageY: lastTouchY,
    //             }),
    //         ],
    //         changedTouches: [
    //             new Touch({
    //             identifier: Date.now(),
    //             target: targetElement,
    //             clientX: lastTouchX,
    //             clientY: lastTouchY,
    //             pageX: lastTouchX,
    //             pageY: lastTouchY,
    //             }),
    //         ],
    //         });

    //         // Dispatch the touch event to trigger it at the last touch location
    //         targetElement.dispatchEvent(touchEvent);
    //     }
    
    // $('.buttons-chips .chips, .control-area-mobile .chips').on('touchend',function(){
    //     console.log("END")
    //     $('.bet-area .area').mouseenter(function(){
            
    //             layout.isDragging = false
    //             layout.detectParentDiv(this)
    //             console.log("ZZZ")
           
    //     })
    //    // layout.handleTouchEnd()
    // })
    // $('.buttons-chips .chips, .top-control .chips').on('dragstart',function(e){
    //     layout.handleDragStart(this,e)
    // })
    // $('.buttons-chips .chips, .top-control .chips').on('drag',function(e){
    //     layout.handleDragMove(this,e)
    // })
    // $('.buttons-chips .chips, .top-control .chips').on('dragend',function(e){
    //     layout.handleDragEnd(this,e)
    // })
    $('.buttons-chips .chips, .top-control .chips .btn-chip').on('dragstart',function(e){
        layout.isDragging = true
        $('.buttons-chips .chips, .top-control .chips').attr('draggable',false)
        // e.stopPropagation()
    })
    $('.buttons-chips .chips, .top-control .chips .btn-chip').on('drag',function(e){
        $(this).css('cursor','drag')
        $('.buttons-chips .chips, .top-control .chips').attr('draggable',false)
        $('.buttons-chips .chips, .top-control .chips').css('left','0')
        $('.buttons-chips .chips, .top-control .chips').css('right','0')
        // e.stopPropagation()
    })

    $('.buttons-chips .chips, .top-control .chips .btn-chip').on('dragend',function(e){
        $('.bet-area .area').mouseenter(function(){
            if(layout.selectedChip !== null && layout.isDragging){
                layout.isDragging = false
                layout.detectParentDiv(this)
            }
        })
    })
    
    // $('.limit-toggle').on('touchstart',function(e){
    //     e.preventDefault()
    //     layout.showLimitDetails(this)
    // })
    // $('.limit-toggle').on('touchend',function(e){
    //     e.preventDefault()
    //     layout.hideLimitDetails(this)
    // })
    $('.limit-toggle').on('click',function(e){
        e.preventDefault()
        // e.stopPropagation()
        layout.toggleLimitDetails(this)
    })
    $('.limit-toggle').mouseenter(function(event){
        event.preventDefault()
        event.stopPropagation()
        layout.showLimitDetails(this)
    })
    $('.limit-toggle').mouseleave(function(event){
        event.preventDefault()
        event.stopPropagation()
        layout.hideLimitDetails(this)
    })
    $('a.card-board').click(function(e){
        // e.preventDefault()
        // e.stopPropagation()
    })
    $('#soundSettings :checkbox').each(function(){
        layout.setupSound(this)
    })
    $('.chips .btn-chip').each(function(){
        if(!$(this).hasClass('active')){
            localStorage.setItem("selectedChip",null);
        }
    })
    $('#chipsForm input').click(function(){
        layout.chips = []
        $('#chipsForm :checkbox').each(function () {
            if(this.checked){
                let item = $(this).attr('id')
                layout.chips.push(item)
            }
        });
        layout.setUpChips()
    })
    //filter table
    $('.table-filter button').on('click',function(){
        layout.filterTable(this)
    })

    $('.toggleFull').on('click',function(){
        layout.toggleFullScreen(this)
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
    $('#tablesModal .main-content .card-board').on('click',function(e){
       layout.selectTable()
    })
    //close multi betting room
    $('.close-room').on('click',function(e){
        // e.stopPropagation()
        layout.closeMultiRoom(this)
    })
    $('.toggle-menu').on('click',function(){
        console.log('test')
        layout.toggleMenu()
    })
    $('.toggle-chips').on('click',function(){
       layout.toggleChipSettings()
    })
    //custom alert
    $("#btnAlert").click(function() {
        layout.customAlert() 
    });
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
        $('.chips').animate({scrollLeft:0},800)
    })

    $('.nextChip').on('click',function(){
        $('chips').animate({scrollLeft:$('.chips')[0].scrollWidth},800)
    })

    $('.btn, input, select, .card-board').on('click',function(){
        layout.toggleClickSound()
    })

    $('#toggleVideo').on('click',function(){
        $('#roomVideo').toggleClass('hidden')
        $(this).html($('#roomVideo').is(":hidden")?'<i class="fa-solid fa-video"></i>':'<i class="fa-solid fa-video-slash"></i>')
    })
    $('#videoExpand').on('click',function(){
        $('.room .top .left').toggleClass('full-screen')
        if($('.room .top .left').css('position') == 'fixed'){
            $(this).html('<i class="fa-solid fa-compress"></i>')
        }else{
            $(this).html('<i class="fa-solid fa-expand"></i>')
        }
    })

    
    $(document).on('click','button.btn-chip',function(e){
        // e.stopPropagation()
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
            $('.card-res.player .card').not(':first').addClass('animate__animated animate__flip')
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
            $('.card-res.player .card').not(':first').removeClass('animate__animated animate__flip')
            $('.card-res.player .horizontal, .card-res.banker .horizontal').removeClass('animate__animated animate__flip')
            $('.card-res.player .card').not(':first').removeClass('animate__animated animate__flip')
            $('.card-res.banker .card').not(':last').removeClass('animate__animated animate__flip')
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
        this.music = true,
        this.chipsOffset = 0,
        this.startX = 0,
        this.endX = 0,
        this.touchMoveThis =  null,
        this.scrollContainer = document.querySelector('.chips');
        this.startY = null;
        this.startX = null;
        this.scrollLeft = null;
        this.scrollTop = null;
        this.isDown = null;
        this.isDragging =false;
        this.loadingWidth = 0 
        this.hey = 0
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
    handleLoadingPage(){
        let loadingInterval = setInterval(()=>{
            this.loadingWidth += 0.1
            $('.loading-page-wrapper .loading-bar-bg .loading-bar').css('width',`${this.loadingWidth}%`)
            if(Math.round(this.loadingWidth) >= 100){
                clearInterval(loadingInterval)
                this.loadingWidth = 0
                this.handleLoadingPage()
            }
        },10)
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
        console.log($('ul.bead-road').outerWidth(true))
            if(window.innerWidth > window.innerHeight){
                //land
                let breadRoadCol = 2 * Math.round(( $('ul.bead-road').outerWidth(true) / 7) / 2)
                let mainRoadCol = 2 * Math.round( $('ul.main-road').outerWidth(true) / (7.5/2) /2)
                for(let i=0;i<this.makeDivisibleBySix(breadRoadCol);i++){
                    $(`${bigBoxEl}`).append(`<li class="blink"><div class="result red"><div class="pair-banker"></div></div></li>`)
                    // $(`${bigBoxEl}`).append(`<li class="blink"></li>`)
                }
                for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                    $(`${bigBoxElOne}`).append(`<li><div class="result outline-blue"><div class="tie-result"></div></div></li>`)
                    // $(`${bigBoxElOne}`).append(`<li></li>`)
                }
                for(let i=0;i<this.makeDivisibleBySix(mainRoadCol)*2;i++){
                    $(`${bigBoxElTwo}`).append(`<li><div class="result outline-red-small"></div></li>`)
                    // $(`${bigBoxElTwo}`).append(`<li></li>`)
                }
                for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                    // $(`${bigBoxElThree}`).append(`<li><div class="result fill-blue"></div></li>`)
                    $(`${bigBoxElThree}`).append(`<li></li>`)
                }
                for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                    // $( `${bigBoxElFour}`).append(`<li><div class="result line-red"></div></li>`)
                    $( `${bigBoxElFour}`).append(`<li></li>`)
                }
            }else{
                //por
                let mainRoadCol = 2 * Math.round( $('ul.main-road').outerWidth(true) / (3.5/2) /2)
                for(let i=0;i<30;i++){
                    $(`${bigBoxEl}`).append(`<li><div class="result red"><div class="pair-banker"></div></div></li>`)
                    // $(`${bigBoxEl}`).append(`<li></li>`)
                }
                for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                    $(`${bigBoxElOne}`).append(`<li><div class="result outline-blue"><div class="tie-result"></div></div></li>`)
                    // $(`${bigBoxElOne}`).append(`<li></li>`)
                }
                for(let i=0;i<this.makeDivisibleBySix(mainRoadCol)*2;i++){
                    $(`${bigBoxElTwo}`).append(`<li><div class="result outline-red-small"></div></li>`)
                    // $(`${bigBoxElTwo}`).append(`<li></li>`)
                }
                for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                    $(`${bigBoxElThree}`).append(`<li><div class="result fill-blue"></div></li>`)
                    // $(`${bigBoxElThree}`).append(`<li></li>`)
                }
                for(let i=0;i<this.makeDivisibleBySix(mainRoadCol);i++){
                    $(`${bigBoxElFour}`).append(`<li><div class="result line-blue"></div></li>`)
                    // $(`${bigBoxElFour}`).append(`<li></li>`)
                }
            }

        let bigBeadRoadItemSize = Math.round($(`${bigBoxEl} li`).outerHeight(true) - 2)
        let bigMainRoadItemSize = Math.round($(`${bigBoxElOne} li`).outerHeight(true) - 1)
        let bigBigeyeRoadItemSize = Math.round($(`${bigBoxElTwo} li`).outerHeight(true))
        let bigSmallRoadItemSize = Math.round($(`${bigBoxElThree} li`).outerHeight(true) - 1)
        let bigCockRoadItemSize = Math.round($(`${bigBoxElFour} li`).outerHeight(true) - 1)
        
        $(`${bigBoxEl} li`).find('.result').css({width:`${bigBeadRoadItemSize}px`,height:`${bigBeadRoadItemSize}px`})
        $(`${bigBoxElOne} li`).find('.result').css({width:`${bigMainRoadItemSize}px`,height:`${bigMainRoadItemSize}px`})
        $(`${bigBoxElTwo} li`).find('.result').css({width:`${bigBigeyeRoadItemSize}px`,height:`${bigBigeyeRoadItemSize}px`})
        $(`${bigBoxElThree} li`).find('.result').css({width:`${bigSmallRoadItemSize}px`,height:`${bigSmallRoadItemSize}px`})
        $(`${bigBoxElFour} li`).find('.result').css({width:`${bigCockRoadItemSize}px`,height:`${bigCockRoadItemSize}px`})

        this.tableColNumber = 4.2

        let mainRoadColSmall = 2 * Math.round( $(`${smallBoxElOne}`).outerWidth() / (this.tableColNumber/2) /2)

        for(let i=0;i<30;i++){
            $(`${smallBoxEl}`).append(`<li><div class="result red"><div class="pair-banker"></div></div></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadColSmall);i++){
            $(`${smallBoxElOne}`).append(`<li></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadColSmall)*2;i++){
            $(`${smallBoxElTwo}`).append(`<li></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadColSmall);i++){
            $(`${smallBoxElThree}`).append(`<li></li>`)
        }
        for(let i=0;i<this.makeDivisibleBySix(mainRoadColSmall);i++){
            $(`${smallBoxElFour}`).append(`<li></li>`)
        }

        let beadRoadItemSize = Math.round($(`${smallBoxEl} li`).outerHeight() - 2)
        let mainRoadItemSize = Math.round($(`${smallBoxElOne} li`).outerHeight() - 1)
        let bigeyeRoadItemSize = Math.round($(`${smallBoxElTwo} li`).outerHeight())
        let smallRoadItemSize = Math.round($(`${smallBoxElThree} li`).outerHeight() - 1)
        let cockRoadItemSize = Math.round($(`${smallBoxElFour} li`).outerHeight() - 1)

        $(`${smallBoxEl} li`).find('.result').css({width:`${beadRoadItemSize}px`,height:`${beadRoadItemSize}px`})
        $(`${smallBoxElOne} li`).find('.result').css({width:`${mainRoadItemSize}px`,height:`${mainRoadItemSize}px`})
        $(`${smallBoxElTwo} li`).find('.result').css({width:`${bigeyeRoadItemSize}px`,height:`${bigeyeRoadItemSize}px`})
        $(`${smallBoxElThree} li`).find('.result').css({width:`${smallRoadItemSize}px`,height:`${smallRoadItemSize}px`})
        $(`${smallBoxElFour} li`).find('.result').css({width:`${cockRoadItemSize}px`,height:`${cockRoadItemSize}px`})
    }
    chipSelect(_this){
        this.chipValue = $(_this).data("val")
        this.selectedChip = $(_this).data("val")
        this.chipOffset = $(_this).offset()
        $('.btn-chip').removeClass('active animate__animated animate__pulse animate__fadeInLeft')
        $('.btn-chip').removeClass('active animate__animated animate__pulse animate__fadeInRight')
        $('.btn-chip').removeClass('active animate__animated animate__pulse animate__fadeInDown')
        $(_this).addClass('active animate__animated animate__pulse') 
        localStorage.setItem("selectedChip",JSON.stringify({chipNo:this.selectedChip,chipValue:this.chipValue}));
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
        $('.table-filter button img').addClass('inactive')
        switch(el){
            case 'two':
                $('.table-grid').removeClass('col-three')
                $('.table-grid').removeClass('col-four')
                $('.table-grid').addClass('col-two')
                $('.table-filter button[data-tval = '+'two'+'] img').removeClass('inactive')
            break;
            case 'three':
                $('.table-grid').removeClass('col-two')
                $('.table-grid').removeClass('col-four')
                $('.table-grid').addClass('col-three')
                $('.table-filter button[data-tval = '+'three'+'] img').removeClass('inactive')
            break;
            case 'four':
                $('.table-grid').removeClass('col-two')
                $('.table-grid').removeClass('col-three')
                $('.table-grid').addClass('col-four')
                $('.table-filter button[data-tval = '+'four'+'] img').removeClass('inactive')
            break;
        }
        this.createGrid()
    }
    toggleFullScreen(_this){
        if(!this.fsBool){
            this.fsBool = true
            this.openFullscreen()
            $(_this).html('<i class="fa-solid fa-compress"></i>Exit Full</a>')
        }else{
            this.fsBool = false
            this.closeFullscreen()
            $(_this).html('<i class="fa-solid fa-expand"></i>Toggle Full</a>')
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
        $(this.multiBetRoom).find('.room-content').html(`<iframe src="multi-room.html" id="${this.roomId}" height="700" width="300" title="Multi-Betting Room 1"></iframe>`)
        $(this.multiBetRoom).find('.close-room').removeClass('hide')
    }
    closeMultiRoom(_this){
        $(_this).siblings('.room-content').html('<button class="btn btn-blue toggle-tables"><i class="fa-solid fa-plus"></i>Add Table</button>')
        $(_this).addClass('hide')
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
    setUpChips(){
        $('.chips').html('')
        if(this.chips.length < 6){
            $('.prevChip').css({visibility:'hidden'})
            $('.nextChip').css({visibility:'hidden'})
        }else{
            $('.prevChip').css({visibility:'visible'})
            $('.nextChip').css({visibility:'visible'})
        }

        this.chips.forEach((el,index)=>{
            if(index<6)
            $('.chips').append(`<button class="btn-chip chip-${el} animate__animated animate__fadeInDown" value="${el}" data-val="${el}"></button>`)
        })
    }
    prevChip(){
        $('.chips').html('')
        this.chips.forEach((el,index)=>{
            if(index<6)
                $('.chips').append(`<button class="btn-chip chip-${el} animate__animated animate__fadeInRight" draggable="true" value="${el}" data-val="${el}"></button>`)
        })
    }
    nextChip(){
        $('.chips').html('')
        this.chips.forEach((el,index)=>{
            if(index>3)
                $('.chips').append(`<button class="btn-chip chip-${el} animate__animated animate__fadeInLeft" draggable="true" value="${el}" data-val="${el}"></button>`)
        })
    }
    customAlert(){
        // $.alert({
        //   title: '',
        //   content: 'Start Betting!',
        //   buttons: { 
        //     ok: {
        //         btnClass: 'btn-blue',
        //     }
        //   }
        // });
        $.confirm({
            text: "sds",
            title: '',
            content: 'In publishing and graphic design!',
            confirm: function(button) {
                alert("You just confirmed.");
            },
            cancel: function(button) {
                alert("You cancelled.");
            },
            buttons: { 
                confirm: {
                    btnClass: 'btn-blue',
                },
                cancel: {
                    btnClass: 'btn-red',
                }
            }
        });
    }
    toggleRoomLimit(){
        $('.bet-limit-table').toggle()
    }
    showLimitDetails(_this){
        $(_this).parent().parent().siblings('.card-body').find('.limit-details').show()
    }
    hideLimitDetails(_this){
        $(_this).parent().parent().siblings('.card-body').find('.limit-details').hide()
    }
    toggleLimitDetails(_this){  
        $(_this).parent().parent().siblings('.card-body').find('.limit-details').toggle()
    }
    handleDragStart(_this,event){
        this.chipsOffset = 0
        this.startX = event.clientX;
    }
    handleDragMove(_this,event){
        this.touchMoveThis = _this
        if(this.startX < this.endX){
            $(_this).css('left',`${this.chipsOffset++}px`)
        }else{
            $(_this).css('left',`${this.chipsOffset--}px`)
        }
        this.endX = event.clientX;
    }
    handleDragEnd() {
        const threshold = 50; // Minimum swipe distance threshold

        // Calculate the distance swiped
        const distance = this.endX - this.startX;
        if (Math.abs(distance) >= threshold) {
            if (this.chipsOffset > 0) {
            // Swipe righthandleTouchMove
            console.log('Swipe right');
            this.nextChip()
            } else {
            // Swipe left
            console.log('Swipe left');
            this.prevChip()
            }
        }
        // $(this.touchMoveThis).css('left',`${0}px`)
    }
    handleTouchStart(_this,event){
        this.chipsOffset = 0
        this.startX = event.touches[0].clientX;
    }
    handleTouchMove(_this,event){
        this.touchMoveThis = _this
        // if(this.startX < this.endX){
        //     $(_this).css('left',`${this.chipsOffset++}px`)
        // }else{
        //     $(_this).css('left',`${this.chipsOffset--}px`)
        // }
        this.endX = event.touches[0].clientX;
    }
    handleTouchEnd() {
        // $(this.touchMoveThis).css('left',`${0}px`)
        const threshold = 100; // Minimum swipe distance threshold

        // Calculate the distance swiped
        const distance = this.endX - this.startX;

        if(this.chipsOffset != 0){
            if (Math.abs(distance) >= threshold) {
                if (distance > 0) {
                // Swipe righthandleTouchMove
                console.log('Swipe right');
                this.nextChip()
                } else {
                // Swipe left
                console.log('Swipe left');
                this.prevChip()
                }
            }
        }
    }
    handleDevicePrompt(){
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            $('html.not-multi,body.not-multi').addClass('mobile')
        }else{
            $('html.not-multi,body.not-multi').removeClass('mobile')
        }
    }
    detectParentDiv(_this){
        let chip = JSON.parse(localStorage.getItem("selectedChip"))
        this.chipStack = this.chipStack+.4
        $('.chips .btn-chip').removeClass('active')
        this.selectedChip = null
        $(_this).append(`<div class="btn-chip chip-${chip}" style="position:absolute;left:50%;top:${75 - this.chipStack}%" value="${chip.chipValue}"></div>`)
        $(_this).append(`<a style="position:absolute;left:50%;top:${75 - this.chipStack}%" class="btn-chip chip-${chip.chipNo}" value="${chip.chipValue}"></a>`)

    }
    mouseMove(e){
        if(this.isDown){
          e.preventDefault();
          //Move vertcally
          const y = e.pageY - this.scrollContainer.offsetTop;
          const walkY = y - this.startY;
          this.scrollContainer.scrollTop = this.scrollTop - walkY;
      
          //Move Horizontally
          const x = e.pageX - this.scrollContainer.offsetLeft;
          const walkX = x - this.startX;
          this.scrollContainer.scrollLeft = this.scrollLeft - walkX;
      
        }
    }
    mouseIsDown(e){
        this.isDown = true;
        this.startY = e.pageY - this.scrollContainer.offsetTop;
        this.startX = e.pageX - this.scrollContainer.offsetLeft;
        this.scrollLeft = this.scrollContainer.scrollLeft;
        this.scrollTop = this.scrollContainer.scrollTop; 
    }
    mouseLeave(e){
        this.isDown = false;
    }
    mouseUp(e){
        this.isDown = false;
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