if(navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
    var userMobile = true;
}


(function($) {
    //	jQuery.noConfict();
    $("body").addClass("overWrap");
    var sizeSet = function(aniTime){
        let windowH = $(window).height();
        let headH = $("header.navigation").closest(".container-fluid").height();
        let tabH = $(".objetcollection-tabs").height();
        let activeContIdx = $(".objet_slide_cont.is_active").attr("data-cont-idx");
        let mainContH;
        if(activeContIdx == 0){
            mainContH = windowH - headH - tabH;
            $("body, html").animate({"scrollTop":0},aniTime);
            if(aniTime != 0){
                setTimeout(function(){$("body, html").animate({"scrollTop":0},aniTime);},200);
            }

        }else{
            mainContH = windowH;
            $("body, html").animate({"scrollTop":headH},aniTime);

        }
        $(".objet_cont_wrap").animate({"height":mainContH},aniTime);
        $(".objet_slide_cont:not([data-cont-idx=0])").animate({"height":(windowH - tabH)},aniTime);
        $(".objet_slide_cont[data-cont-idx=0]").animate({"height":(windowH - headH - tabH)},aniTime);
        $("#innerSimulator").css({"min-height":(windowH - tabH)});
        $("#innerSimulator .simulator_area").css({"height":(windowH - tabH)});
        $("#innerSimulator .simulator").css({"height":(windowH - tabH)});
    }
    let aniVar = true;
    var objetVSlide = function(){
        $(".objet_cont_wrap").on("mousewheel DOMMouseScroll",function(e){
            var e = window.event || e;
            /*console.log("e",e);
            console.log("e.wheelDelta",e.wheelDelta);
            console.log("-e.detail",-e.detail);*/
            let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail || -e.deltaY)));

            let isT = parseInt($(".objet_slide_cont.is_active").css("height"));
            let activeI = $(".objet_slide_cont.is_active").index();
            let maxLength = $(".objet_slide_cont").length;
            if(aniVar == false){
                e.preventDefault();
                e.stopPropagation();
            }else{
                let innerT = parseInt($(".objet_cont_wrap > .inner").css("top"));
                let nextActiveI;
                let nextT;
                //console.log("delta",delta);
                if (delta == -1) {
                    nextActiveI = activeI + 1;
                    nextT = innerT - isT;
                    if(activeI < (maxLength - 1)){
                        goSlideIdx(nextActiveI,200);
                    }

                }else if(delta == 1){
                    nextActiveI = activeI - 1;
                    nextT = innerT + isT;
                    if(activeI == (maxLength-1)){
                        if($(".objet_slide_cont:eq("+activeI+")").scrollTop() <= 0){
                            if($("#innerSimulator").hasClass("simul_open")){
                                //console.log('$("#objet_select_slider .swiper-wrapper").css("transform")',$("#objet_select_slider .swiper-wrapper").css("transform"));
                                if($("#objet_select_slider .swiper-wrapper").css("transform") == "matrix(1, 0, 0, 1, 0, 0)" || $("#objet_select_slider .swiper-wrapper").css("transform") == "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"){
                                    goSlideIdx(nextActiveI,200);
                                }
                            }else{
                                goSlideIdx(nextActiveI,200);
                            }

                        }
                    }else if(activeI > 0){
                        goSlideIdx(nextActiveI,200);
                    }
                }
            }
        });
        let touchStartY, touchMoveY, touchMovingY, touchEndY, touchDelta;
        let $objetObj = $(".objet_cont_wrap");
        $objetObj.on({
            "touchstart" : function(e){//터치 시작
                let event = e.originalEvent;
                touchStartY = event.targetTouches[0].pageY;//터치 시작 Y좌표
                //console.log("touchStartY",touchStartY);
            },
            "touchmove" : function(e){//터치 이동
                let event = e.originalEvent;
                touchMoveY = event.targetTouches[0].pageY;//움직이는 현재 Y위치
                touchMovingY = touchMoveY - touchStartY;//이동한 Y거리
                //console.log("touchMoveY",touchMoveY);
                //console.log("touchMovingY",touchMovingY);
            },
            "touchend" : function(e){//터치 완료
                let event = e.originalEvent;
                //touchEndY = event.targetTouches[0].pageY;//움직이는 현재 Y위치
                let isT = parseInt($(".objet_slide_cont.is_active").css("height"));
                let activeI = $(".objet_slide_cont.is_active").index();
                let maxLength = $(".objet_slide_cont").length;
                let innerT = parseInt($(".objet_cont_wrap > .inner").css("top"));
                let nextActiveI;
                let nextT;
                //console.log("touchEndY",touchEndY);
                if(touchMoveY > touchStartY){
                    //touchDelta = "down";
                    if(touchMovingY > 50){
                        nextActiveI = activeI - 1;
                        nextT = innerT + isT;
                        if(activeI == (maxLength-1)){
                            if($(".objet_slide_cont:eq("+activeI+")").scrollTop() == 0){
                                goSlideIdx(nextActiveI,200);

                            }
                        }else if(activeI > 0){
                            goSlideIdx(nextActiveI,200);
                        }
                    }

                }else if(touchMoveY < touchStartY){
                    if(touchMovingY > 50){
                        //touchDelta = "up";
                        nextActiveI = activeI + 1;
                        nextT = innerT - isT;
                        if(activeI < (maxLength - 1)){
                            goSlideIdx(nextActiveI,200);
                        }
                    }

                }else{
                    touchDelta = "";
                }
            }
        });
    }
    var goSlideIdx = function(idx,aniTime){
        aniVar = false;
        let headH = $("header.navigation").closest(".container-fluid").height();
        let tabH = $(".objetcollection-tabs").outerHeight();
        $(".objet_slide_cont").removeClass("is_active");
        $(".objet_slide_cont:eq("+idx+")").addClass("is_active");
        if(idx != 2){
            $(".objetcollection-tabs .tabs li").removeClass("on");
            $(".objetcollection-tabs .tabs li:eq("+idx+")").addClass("on");
        }else{
            if($(".objet_slide_cont:last-child").scrollTop() == 0 || $(".objet_slide_cont:last-child").scrollTop() == "0px"){
                $(".objetcollection-tabs .tabs li").removeClass("on");
                $(".objetcollection-tabs .tabs li:eq("+idx+")").addClass("on");
            }
        }
        if(idx == 1){
            $(".objet_slide_cont:eq(1) .video_area video").get(0).play();
        }else{
            $(".objet_slide_cont:eq(1) .video_area video").get(0).pause();
        }
        let goT = 0;
        for(let i=0;i<idx;i++){
            goT += $(".objet_slide_cont:eq("+idx+")").outerHeight();
        }
        if(goT == 0){
            $("body, html").animate({"scrollTop":0},aniTime);
        }else if(goT != 0){
            //$("body, html").animate({"scrollTop":(-headH)},aniTime);
            goT = goT - headH;
        }
        $(".objet_cont_wrap > .inner").animate({"top":(-goT)},{
            duration:(aniTime*5),
            complete:function(){
                aniVar = true;

            }
        });


        sizeSet(aniTime);

    }
    /*var mGallery = function(){
        let activeGIdx = $("#innerGallery .gallery_list > ul li.is_active").index();
        let gLength = $("#innerGallery .gallery_list > ul li").length;
        $("#innerGallery .gallery_navi .btn_next").on("click",function(){
            activeGIdx = $("#innerGallery .gallery_list > ul li.is_active").index();
            if(activeGIdx < gLength-1){
                $("#innerGallery .gallery_list > ul li:not(:eq("+(activeGIdx+1)+"))").removeClass("is_active");
                $("#innerGallery .gallery_list > ul li:eq("+(activeGIdx+1)+")").addClass("is_active");
            }
        });
        $("#innerGallery .gallery_navi .btn_prev").on("click",function(){
            activeGIdx = $("#innerGallery .gallery_list > ul li.is_active").index();
            if(activeGIdx > 0){
                $("#innerGallery .gallery_list > ul li:not(:eq("+(activeGIdx-1)+"))").removeClass("is_active");
                $("#innerGallery .gallery_list > ul li:eq("+(activeGIdx-1)+")").addClass("is_active");
            }
        });
    }*/
    var mainVisual = function(){
        let windowH = $(window).height();
        let headH = $("header.navigation").closest(".container-fluid").height();
        let tabH = $(".objetcollection-tabs").height();
        let winH = windowH - headH - tabH;
        let windowW = $(window).width();
        let winRate = windowW/winH;
        //console.log("winRate",winRate);
        $(".objet_slide_cont[data-cont-idx='0'] .cont_inner").css({"height":winH});
        if(winRate < 2){
            $(".objet_slide_cont[data-cont-idx='0'] .video_wrap .only_pc").css({"height":winH,"width":"auto"});
            $(".objet_slide_cont[data-cont-idx='0'] .video_wrap .only_pc video, .objet_slide_cont[data-cont-idx='0'] .video_wrap .only_pc img").css({"min-height":winH,"width":"auto","max-width":"4000px"});
        }else{
            $(".objet_slide_cont[data-cont-idx='0'] .video_wrap .only_pc").css({"height":"auto","width":windowW});
            $(".objet_slide_cont[data-cont-idx='0'] .video_wrap .only_pc video, .objet_slide_cont[data-cont-idx='0'] .video_wrap .only_pc img").css({"height":"auto","min-width":windowW,"max-width":"4000px"});
        }
        if(winRate < .64){
            $(".objet_slide_cont[data-cont-idx='0'] .video_wrap .only_mobile").css({"height":winH,"width":"auto"});
            $(".objet_slide_cont[data-cont-idx='0'] .video_wrap .only_mobile video, .objet_slide_cont[data-cont-idx='0'] .video_wrap .only_mobile img").css({"min-height":winH,"width":"auto","max-width":"4000px"});
        }else{
            $(".objet_slide_cont[data-cont-idx='0'] .video_wrap .only_mobile").css({"height":"auto","width":windowW});
            $(".objet_slide_cont[data-cont-idx='0'] .video_wrap .only_mobile video, .objet_slide_cont[data-cont-idx='0'] .video_wrap .only_mobile img").css({"height":"auto","min-width":windowW,"max-width":"4000px"});
        }

    }

    sizeSet(200);
    objetVSlide();
    //mGallery();
    mainVisual();
    $(window).on("resize",function(){
        sizeSet(0);
        let activeI = $(".objet_slide_cont.is_active").index();
        goSlideIdx(activeI,0);
        mainVisual();
    });
    $(".next_arr_wrap button").on("click",function(){
        let idx = $(this).attr("data-next-idx");
        goSlideIdx(idx,200);
    });
    $(".style_select_area .style_list ul li button").on("click",function(){
        let styleId = $(this).attr("data-id");
        let styleIdx = $(this).closest("li").index();
        let offsetTop = $("#innerSimulator").offset().top;
        let scrollTop = $(".objet_slide_cont:last-child").scrollTop();
        let headH = $("header.navigation").closest(".container-fluid").height();
        let tabH = $(".objetcollection-tabs").height();
        let moveScroll = scrollTop + offsetTop - headH - tabH;
        /*console.log("offsetTop",offsetTop);
        console.log("scrollTop",scrollTop);
        console.log("moveScroll",moveScroll);*/
        $(this).closest(".inner_contents").addClass("simul_open");
        $("#s_kitchen").trigger("click");
        $(".simulator_area").css({"opacity":1,"z-index":6});
        $(".objet_slide_cont:last-child").animate({"scrollTop":moveScroll},500);
        $("#objet_select_slider .swiper-slide").each(function(idx){
            let imgName = "bg_"+styleId+"_0";
            $(this).find(">img").attr("src",$(this).find(">img").attr("src").replace("bg_modern_0",imgName));
        });
        $("#simulator_dw").css("display","block");
        $(".type02 .objet-bx ul li:not(:eq("+styleIdx+")) .btn-style").removeClass("active");
        $(".type02 .objet-bx ul li:eq("+styleIdx+") .btn-style:eq(0)").addClass("active");
    });
    $(".objet_slide_cont:last-child").on("scroll",function(){//피럴럭스 효과 추가
        let scTop = $(this).scrollTop();
        //console.log("scTop",scTop);
        let sumContHArry = [0];
        $(this).find(".inner_contents").each(function(){
            sumContHArry.push($(this).height());
        });
        if(scTop > sumContHArry[2]){
            $(this).find(".inner_contents:eq("+2+")").addClass("is_active");
        }
        if(scTop > (sumContHArry[1] -50)){
            $(this).find(".inner_contents:eq("+1+") .style_select_area").addClass("is_active");
        }
        //console.log("sumContHArry",sumContHArry);
    });
    $(".component.KRP0016 .tooltip-box.list .btn-close").on("click",function(){
        $(this).closest(".tooltip-box.list").removeClass("active");
    });
    $(".layer_popup .btn_close").on("click",function(){
        $(this).closest(".layer_popup").fadeOut();
    });
    $("#innerSimulatorPrev .body-copy button").on("click",function(){
        //let scH = $("#innerSimulatorPrev").outerHeight();
        //$(".objet_slide_cont:last-child").animate({"scrollTop":scH},1000);
        $("#innerSimulatorPrev").css("display","none");
        $("#innerSimulator").show().css("display","flex");
        setTimeout(function(){$("#innerSimulator .style_select_area").addClass("is_active");},500);
        $(".objet_slide_cont:last-child").animate({"scrollTop":0},1000);
    });
    //console.log("userMobile",userMobile);
    if(userMobile == true){
        let startX,startY, endX,endY;
        let isT = parseInt($(".objet_slide_cont.is_active").css("height"));
        let activeI = $(".objet_slide_cont.is_active").index();
        let maxLength = $(".objet_slide_cont").length;
        $(".objet_cont_wrap").on("touchstart",function(event){
            startX = event.originalEvent.changedTouches[0].screenX;
            startY = event.originalEvent.changedTouches[0].screenY;
            isT = parseInt($(".objet_slide_cont.is_active").css("height"));
            activeI = $(".objet_slide_cont.is_active").index();
            //console.log("startY",startY);
        });
        $(".objet_cont_wrap").on("touchmove",function(event){

        });
        $(".objet_cont_wrap").on("touchend",function(event){
            endX=event.originalEvent.changedTouches[0].screenX;
            endY=event.originalEvent.changedTouches[0].screenY;
            //console.log("endY",endY);
            //console.log("startY-endY",startY-endY);
            //console.log("aniVar",aniVar);
            if(aniVar == false){
                event.preventDefault();
                event.stopPropagation();
            }else{
                let innerT = parseInt($(".objet_cont_wrap > .inner").css("top"));
                let nextActiveI;
                let nextT;
                if(startY-endY>50){
                    nextActiveI = activeI + 1;
                    nextT = innerT - isT;
                    if(activeI < (maxLength - 1)){
                        goSlideIdx(nextActiveI,200);
                    }
                }else if(endY-startY>50){
                    nextActiveI = activeI - 1;
                    nextT = innerT + isT;
                    if(activeI == (maxLength-1)){
                        if($(".objet_slide_cont:eq("+activeI+")").scrollTop() == 0){
                            goSlideIdx(nextActiveI,200);
                        }
                    }else if(activeI > 0){
                        goSlideIdx(nextActiveI,200);
                    }
                }else if(startY-endY<50 || endY-startY<50 ){}
            }
        });

    }
    $(".objetcollection-tabs .tabs button").on("click",function(){
        let naviIdx = $(this).attr("data-navi-idx");
        let naviH = [];
        let naviTH = 0;
        $(".objet_slide_cont .cont_inner .inner_contents").each(function(){
            let idx = $(this).index();
            let thisH = $(this).outerHeight();
            if($("#innerSimulatorPrev").css("display") == "none"){
                if(idx == 0){
                    thisH = 0;
                }
            }else{
                if(idx == 1){
                    thisH = 0;
                }
            }
            naviTH = naviTH + thisH;
            naviH.push(naviTH);
        });
        //console.log("naviH",naviH);
        if(naviIdx == "0"){
            goSlideIdx(0,200);
            $(".objet_slide_cont:last-child").scrollTop(0);
            $(this).closest("li").siblings().removeClass("on");
            $(this).closest("li").addClass("on");
        }else if(naviIdx == "1"){
            goSlideIdx(1,200);
            $(".objet_slide_cont:last-child").scrollTop(0);
            $(this).closest("li").siblings().removeClass("on");
            $(this).closest("li").addClass("on");
        }else if(naviIdx == "2"){
            goSlideIdx(2,200);
            $(".objet_slide_cont:last-child").animate({"scrollTop":"0px"},1000);
        }else if(naviIdx == "3"){
            goSlideIdx(2,200);
            $(".objet_slide_cont:last-child").animate({"scrollTop":naviH[0]},1000);
        }else if(naviIdx == "4"){
            goSlideIdx(2,200);
            $(".objet_slide_cont:last-child").animate({"scrollTop":naviH[1]},1000);
        }else if(naviIdx == "5"){
            goSlideIdx(2,200);
            $(".objet_slide_cont:last-child").animate({"scrollTop":naviH[2]},1000);
        }
        swiperTab.slideTo(naviIdx);

    });

    $(".objet_slide_cont:last-child").on("scroll",function(){
        if($(".objet_slide_cont[data-cont-idx=2]").hasClass("is_active")){
            let scrollT = $(this).scrollTop();
            let scrollArry = [];
            let scrollTH = 0;
            $(".objet_slide_cont .cont_inner .inner_contents").each(function(){
                let idx = $(this).index();
                let thisH = $(this).outerHeight();
                if($("#innerSimulatorPrev").css("display") == "none"){
                    if(idx == 0){
                        thisH = 0;
                    }
                }else{
                    if(idx == 1){
                        thisH = 0;
                    }
                }
                scrollTH = scrollTH + thisH;
                scrollArry.push(scrollTH);
            });
            //console.log("scrollArry",scrollArry);
            if(scrollT < scrollArry[1]){
                $(".objetcollection-tabs .tabs li:eq(2)").siblings().removeClass("on");
                $(".objetcollection-tabs .tabs li:eq(2)").addClass("on");
            }else if(scrollT < scrollArry[2]){
                $(".objetcollection-tabs .tabs li:eq(3)").siblings().removeClass("on");
                $(".objetcollection-tabs .tabs li:eq(3)").addClass("on");
            }else if(scrollT < scrollArry[3]){
                $(".objetcollection-tabs .tabs li:eq(4)").siblings().removeClass("on");
                $(".objetcollection-tabs .tabs li:eq(4)").addClass("on");
            }/*else if(scrollT < scrollArry[3]){
				$(".objetcollection-tabs .tabs li:eq(5)").siblings().removeClass("on");
				$(".objetcollection-tabs .tabs li:eq(5)").addClass("on");
			}*/
        }
    });

    var swiperTab = new Swiper(".objetcollection-tabs .tabs-wrap", {
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: true,
        grabCursor: true,
        /*pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },*/
    });
    var thumbsSwiper = new Swiper(".thumbs_slider", {
        spaceBetween: 10,
        slidesPerView: 3,
        //freeMode: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: ".gallery_list .swiper-button-next",
            prevEl: ".gallery_list .swiper-button-prev",
        },
        breakpoints: {
            767:{
                spaceBetween: 20,
            }
        }
    });
    var gallerySwiper = new Swiper(".main_slider", {
        spaceBetween: 10,
        thumbs: {
            swiper: thumbsSwiper,
        },
    });
    var keyVisual= new Swiper(".mainKeyVisual", {
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    });
    $(document).on("click",".mainKeyVisual .swiper-button-pause",function(){
        keyVisual.autoplay.stop();
        $(".mainKeyVisual .swiper-button-pause").removeClass("is_active");
        $(".mainKeyVisual .swiper-button-play").addClass("is_active");
    });
    $(document).on("click",".mainKeyVisual .swiper-button-play",function(){
        keyVisual.autoplay.start();
        $(".mainKeyVisual .swiper-button-pause").addClass("is_active");
        $(".mainKeyVisual .swiper-button-play").removeClass("is_active");
    });
    keyVisual.on("slideChangeTransitionEnd", function () {
        keyVisual.autoplay.start();
        $(".mainKeyVisual .swiper-button-pause").addClass("is_active");
        $(".mainKeyVisual .swiper-button-play").removeClass("is_active");
    });


    $(document).ready(function() {

    }); //end : document ready
    $(window).on("load",function(){
        $("body, html").scrollTop(0);
        goStepL(getParameterByName("goStep"));
    });
})(jQuery);
function snsOpen(){
    if($(".component.KRP0016 .tooltip-box.list").hasClass("active")){
        $(".component.KRP0016 .tooltip-box.list").removeClass("active");
    }else{
        $(".component.KRP0016 .tooltip-box.list").addClass("active");
    }

}
function comingSoon(){
    $("#coming_popup").fadeIn();
}

function noSale(){
    $("#noSale_popup").fadeIn();
}
function getParameterByName(name) {
    //console.log("dddddddd");
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    //console.log("results",results);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function goStepL(goStepLev){
    //console.log("goStepLev",goStepLev);
    if(goStepLev != ""){
        $(".objetcollection-tabs .tabs li:nth-child("+goStepLev+") button").trigger("click");
    }
}