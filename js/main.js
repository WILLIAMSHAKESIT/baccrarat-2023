const layout = {
    fullScreen: document.documentElement, 
    fsBool:false,
    welcomeTimer:10,
    tableTimer:10,
    chips:['1k','5k','10k','50k','100k','500k','1m','5m','10m','50m'],
    bottomBool:false,
    selectedChip:null,
    chipValue:'',
    chipOffset:null,
    chipPos:null,
}

const functions = {
    closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    },
    openFullscreen() {
        if (layout.fullScreen.requestFullscreen) {
            layout.fullScreen.requestFullscreen();
        } else if (layout.fullScreen.webkitRequestFullscreen) { /* Safari */
            layout.fullScreen.webkitRequestFullscreen();
        } else if (layout.fullScreen.msRequestFullscreen) { /* IE11 */
            layout.fullScreen.msRequestFullscreen();
        }
    },
    logoAnimation(){
        setInterval(function(){
            layout.welcomeTimer--
            if(layout.welcomeTimer == 6){
                $('header .logo').html('<h1 class="animate__animated animate__flipInX">Welcome</h1>')
            }
            if(layout.welcomeTimer == 3){
                $('header .logo').html('<h1 class="animate__animated animate__flipInX">Enjoy Playing!</h1>')
            }
            if(layout.welcomeTimer == 0){
                layout.welcomeTimer = 10
                $('header .logo').html('<h1 class="animate__animated animate__flipInX">Hilton casino</h1>')
            }
        },1000)
    },
    tableTimer(){
        layout.tableTimer
        let interval = setInterval(function(){
            layout.tableTimer-- 
            $('.timer .count').html(layout.tableTimer)
            if(layout.tableTimer == 0){
                layout.tableTimer == 10
                $('.timer .circle').attr('stroke','#F70849')
                clearInterval(interval)
            }
        },1000)
        $('.timer .circle').css('animation',`stroke ${layout.tableTimer*8.5}s forwards`)
    },
    makeDivisibleBySix(num) {
        if (num % 6 === 0) {
            return num - 6; 
        } else {
            let remainder = num % 6;
            let amountToAdd = 6 - remainder;
            let result = num + amountToAdd;
            return result - 6;
        }
    },
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
    },
    timerRoom(){
        const canvas = document.getElementById('timerRoom');
        const context = canvas.getContext('2d');
        const radius = canvas.width / 2;
        const lineWidth = 15;
        const fillColor = '#221710';
        const time = 10; 
        let elapsed = 10; 
        
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
            if(elapsed == 9){
                $('.board-overlay').removeClass('inactive')
                $('.board-overlay').addClass('active')
            }
            if(elapsed == 5){
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
            if(elapsed == 3){
                $('.board-overlay').addClass('animate__animated animate__fadeOutDownBig')
                $('.mid-result .winner-text').addClass('animate__animated animate__bounceOutUp')
                $('.mid-result .winner-number img').addClass('animate__animated animate__rotateOut')
                $('.mid-result span.player').addClass('animate__animated animate__fadeOutLeft')
                $('.mid-result span.banker').addClass('animate__animated animate__fadeOutRight')
            }
            if(elapsed == 1){
                $('.card-res.player .card').removeClass('animate__animated animate__flip')
                $('.card-res').addClass('face-down')
                $('.board-overlay').removeClass('active')
                $('.board-overlay').addClass('inactive')
            }
            if(elapsed == 0){
                elapsed = 10;
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
    },
    createGrid(){
        $( "ul.bead-road").html('')
        $( "ul.main-road").html('')
        $( "ul.bigeye-road").html('')
        $( "ul.small-road").html('')
        $( "ul.cock-roach").html('')
        if(window.innerWidth > 935){
            let breadRoadCol = 2 * Math.round(( $('ul.bead-road').outerWidth() / 6.9) / 2)
            let mainRoadCol = 2 * Math.round( $('ul.main-road').outerWidth() / (6.8/2) /2)
            for(i=0;i<functions.makeDivisibleBySix(breadRoadCol);i++){
                $( ".results-wrapper ul.bead-road").append(`<li><div class="result red"></div></li>`)
            }
            for(i=0;i<functions.makeDivisibleBySix(mainRoadCol);i++){
                $( ".results-wrapper ul.main-road").append(`<li><div class="result outline-blue"></div></li>`)
            }
            for(i=0;i<functions.makeDivisibleBySix(mainRoadCol)*2;i++){
                $( ".results-wrapper ul.bigeye-road").append(`<li><div class="result outline-blue"></div></li>`)
            }
            for(i=0;i<functions.makeDivisibleBySix(mainRoadCol);i++){
                $( ".results-wrapper ul.small-road").append(`<li><div class="result fill-blue"></div></li>`)
            }
            for(i=0;i<functions.makeDivisibleBySix(mainRoadCol);i++){
                $( ".results-wrapper ul.cock-roach").append(`<li><div class="result line-red"></div></li>`)
            }
        }
        else{
            let mainRoadCol = 2 * Math.round( $('ul.main-road').outerWidth() / (3.5/2) /2)
            for(i=0;i<30;i++){
                $( ".results-wrapper ul.bead-road").append(`<li><div class="result red"></div><div class="pair-banker"></div><div class="pair-player"></div></li>`)
            }
            for(i=0;i<functions.makeDivisibleBySix(mainRoadCol);i++){
                $( ".results-wrapper ul.main-road").append(`<li><div class="result outline-red"></div></li>`)
            }
            for(i=0;i<functions.makeDivisibleBySix(mainRoadCol)*2;i++){
                $( ".results-wrapper ul.bigeye-road").append(`<li></li>`)
            }
            for(i=0;i<functions.makeDivisibleBySix(mainRoadCol);i++){
                $( ".results-wrapper ul.small-road").append(`<li></li>`)
            }
            for(i=0;i<functions.makeDivisibleBySix(mainRoadCol);i++){
                $( ".results-wrapper ul.cock-roach").append(`<li></li>`)
            }
        }
        
        let smallGrids = window.innerWidth > 1458? 14 : window.innerWidth > 700 ? 8 : window.innerWidth <= 400 ? 4 : 6 
        let mainRoadCol = 2 * Math.round( $('ul.main-road').outerWidth() / (smallGrids/2) /2)

        for(i=0;i<30;i++){
            $(".results-wrapper-card ul.bead-road").append(`<li><div class="result blue"></div></li>`)
        }
        for(i=0;i<functions.makeDivisibleBySix(mainRoadCol);i++){
            $(".results-wrapper-card ul.main-road").append(`<li><div class="result outline-red"></div></li>`)
        }
        for(i=0;i<functions.makeDivisibleBySix(mainRoadCol)*2;i++){
            $(".results-wrapper-card ul.bigeye-road").append(`<li></li>`)
        }
        for(i=0;i<functions.makeDivisibleBySix(mainRoadCol);i++){
            $(".results-wrapper-card ul.small-road").append(`<li></li>`)
        }
        for(i=0;i<functions.makeDivisibleBySix(mainRoadCol);i++){
            $(".results-wrapper-card ul.cock-roach").append(`<li></li>`)
        }
    }
}

$(document).ready(function(){
    functions.logoAnimation()
    functions.tableTimer()
    functions.createGrid()
    functions.timer();
    // functions.timerRoom();
    $(window).on('resize',function(){
        functions.createGrid()
    })
    
    $('.toggleFull').on('click',function(){
        if(!layout.fsBool){
            layout.fsBool = true
            functions.openFullscreen()
            $(this).html('<i class="fa-solid fa-compress"></i>')
        }else{
            layout.fsBool = false
            functions.closeFullscreen()
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
    $('#chip-settings').on('click',function(){
        $('#chipModal').addClass('show')
    })

    //toggle bottom menu
    $('#toggleBottomMenu').on('click',function(){
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
    console.log('test')
    //filter table
    $('.table-filter button').on('click',function(){
        let el = $(this).data('tval')
        console.log('test')
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
    })

    //betting area highlight
    $('.bet-area .area').on('click',function(){
        layout.selectedBet = $(this).attr('class')
        layout.chipPos = $(this).offset()
        $('.bet-area .area').removeClass('active')
        $(this).toggleClass('active')
        $(this).append(`<div class="btn-chip chip-${layout.selectedChip}" value="${layout.chipValue}"></div>`)
        $(`.bet-area .area .btn-chip.chip-${layout.selectedChip}`).css({left:0,top:0})
        $(this).find(`.chip-${layout.selectedChip}`).css({left:layout.chipOffset.left,top:layout.chipOffset.top,position:'fixed'}).animate({
            "left": `${layout.chipPos.left + $(this).outerWidth()/2}px`,
            "top": `${layout.chipPos.top + $(this).outerHeight()/2 + 20}px`,
        },"slow", function() {
            $(this).css({position:'absolute',left:'50%',top:'70%'})
        });
    })

    //room chips replace
    $('#prevChip').on('click',function(){
        $('.chips').html('')
        layout.chips.forEach((el,index)=>{
            if(index<6)
                $('.chips').append(`<button class="btn-chip chip-${index+1} animate__animated animate__fadeInDown" value="${el}" data-val="${el}"></button>`)
        })
    })

    $('#nextChip').on('click',function(){
        $('.chips').html('')
        layout.chips.forEach((el,index)=>{
            if(index>3)
                $('.chips').append(`<button class="btn-chip chip-${index+1} animate__animated animate__fadeInDown" value="${el}" data-val="${el}"></button>`)
        })
    })
    
    $(document).on('click','button.btn-chip',function(){
        layout.chipValue = $(this).data("val")
        layout.selectedChip = layout.chips.indexOf(layout.chipValue)+1
        layout.chipOffset = $(this).offset()
        $('.btn-chip').removeClass('active animate__animated animate__pulse animate__fadeInDown')
        $(this).addClass('active animate__animated animate__pulse')  
    })
})