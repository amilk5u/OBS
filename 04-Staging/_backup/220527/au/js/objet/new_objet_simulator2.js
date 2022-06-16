
//console.log("objSimulator"+ objSimulator);

if (objSimulator !== 'undefined') {
   var simulator = new objSimulator();
   simulator.init();


   //배경 변경 부
   var queryURL = window.location.search;
   //var urlParams = new URLSearchParams(queryURL);

   var bgID = new RegExp('[\?&]bgID=([^&#]*)').exec(window.location.href);

   if (bgID !== null) { //bgID 파라미터 존재 시 바로 시뮬레이터 편집화면 진입
      bgID = decodeURI(bgID[1]) || 0;
      if (simulator.setBackgrounds(bgID)) { //배경 로드 이 후로 타이밍 변경
         document.querySelector('.simulator').classList.add('full', 'no_ani');
         simulator.objSwiperInit(0);
      }
      //$(".simul-start-div, .opacity-mask").hide();
   } else {
      simulator.setBackgrounds('modern');
      //bgID 없을 시 기본 섹션 선택 화면으로 이동
      var objSwiper = new Swiper('.obj-swiper-container',
         {
            preventClicks: true,
            preventClicksPropagation: false,
            observer: true,
            observeParents: true,
            spaceBetween: 0,
            slidesPerView: 1,
            centeredSlides: true,
            loop: false,
            mousewheel: false,
            keyboard: true,
            preventClicks: true,
            loopedSlides: 4,
            speed: 500,
            pagination: {
               el: '.obj-swiper-pagination',
               clickable: true,
            },
            navigation: {
               nextEl: '.obj-swiper-button-next',
               prevEl: '.obj-swiper-button-prev',
            },
            on: {
               init: function () {
                  //var activeSlideImgSrc = this.slides[this.activeIndex].querySelector('img').src;
                  // if( activeSlideImgSrc !== null )
                  // 	dummyImgEL.src = activeSlideImgSrc;
                  //this.update();
               },
               slideChangeTransitionEnd: function (swiper) {
                  //var activeSlideImgSrc = this.slides[this.activeIndex].querySelector('img').src;
                  // if( activeSlideImgSrc !== null )
                  // 	dummyImgEL.src = activeSlideImgSrc;
                  //this.update();
               },
               click: function (swiper, event) {

                  this.update(); //간혹 swiper 내부 세팅값이 반영안되는 케이스가 존재함
                  console.log(this.activeIndex);

                  var clickedEl = this.clickedSlide;
                  if (clickedEl.classList.contains('swiper-slide-active')) {
                     document.querySelector('.simulator').classList.add('full');
                     var selectedIndex = this.realIndex;
                     //dummyImgEL.classList.add('active');
                     this.destroy(false, true);

                     var selectedSlideIndex = selectedIndex;
                     simulator.objSwiperInit(selectedSlideIndex);
                  } else {
                     this.slideToClickedSlide();
                  }
               },
            },
         }
      );

      objSwiper.destroy();

      $(".simulator_area .swiper-slide").on("click", function () {
         if ($(".simulator").hasClass("full")) {

         } else {
            $(this).addClass("swiper-slide-active");
            $(".swiper-wrapper").removeClass("divp");
            $(".swiper-slide").removeClass("divpn");
            objSwiper.update(); //간혹 swiper 내부 세팅값이 반영안되는 케이스가 존재함

            if ($(".simulator_area .swiper-slide").hasClass('swiper-slide-active')) {
               var index = $(this).index();
               document.querySelector('.simulator').classList.add('full');
               simulator.objSwiperInit(index);
            } else {
               this.slideToClickedSlide();
            }
            /*if (guide_yn!="N")
                {
                    $(".control-bx").fadeIn();
                }*/
            var swiperBg = new Swiper(".type02 .objet-bx", {
               slidesPerView: "auto",
               spaceBetween: 40,
               freeMode: true,
               grabCursor: true,
               pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
               },
            });
         }
      });

   }
}

// 배경 선택 부
$(".btn-style").on("click", function () {
   $(".btn-style").removeClass("active");
   $(this).addClass("active");
   if (simulator) {
      //simulator.setBackgrounds(this.dataset.id); //배경 modern, nature, nordic 중 택일
   }
   let bgType = $(this).closest("li").attr("data-bgType");
   let bgIdx = $(this).index();
   $("#objet_select_slider .swiper-slide").each(function (idx) {
      let bgT = "";
      if (bgIdx == 0) {
         bgT = "";
      } else if (bgIdx == 1) {
         bgT = "B_";
      } else if (bgIdx == 2) {
         bgT = "C_";
      }
      let imgW = $(this).find("img").width();
      let bgUrlFront = "/au/images/objet/simulator/bg/";
      let bgUrl = "bg_" + bgType + "_" + bgT + "0" + (idx + 1) + ".png"
      $(this).find("img").attr("src", (bgUrlFront + bgUrl));
   });

});

//인기 조합 선택 부
$(".btn-favo").on("click", function () {
   $(".btn-favo").removeClass("active");
   $(this).addClass("active");

   if (simulator) {
      //simulator.setBackground(this.dataset.id); //배경 modern, nature, nordic 중 택일
   }
});

//기기 선택 부
$(".lg-appliances input[type=checkbox]").on("click", function () {
   if (this.checked) {
      if (this.value == "refrigerator_convertible") { $('.rf-con').show(); } //컨버터블 냉장고일 때 툴팁 노출
      else { $('.rf-con').hide(); }

      simulator.selectObject(this.value, null);

      //기기 변경 시 마다 컬러 선택 알림 초기화
      var colorWarningPopup = document.querySelector('.color_warning_popup') !== null ?
         document.querySelector('.color_warning_popup') : false;

      if (colorWarningPopup.classList.contains('actived')) colorWarningPopup.classList.remove('actived');

      //기기 변경 시 마다 컬러 선택 알림 초기화
      var selectedObjetCheckbox = document.querySelector('.editing');
      if (selectedObjetCheckbox !== null) selectedObjetCheckbox.classList.remove('editing');

      selectedObjetCheckbox = document.querySelector('input#' + this.value + '-select') !== null ?
         document.querySelector('input#' + this.value + '-select') : null;

      if (selectedObjetCheckbox !== null) selectedObjetCheckbox.classList.add('editing');

   } else {
      simulator.hideRightSideOptions();
   }
});

//기기 직접 선택 부
$(".object-app").on("click", function () {
   $(".object-app").removeClass("active");
   $(this).addClass("active");
   //this.slides[navindex].classList.add('active-background');
});

//우측 사이드 바 닫기
$(".select_objet .btn-close").on("click", function () {
   //$(".img-download").fadeIn();
   simulator.hideRightSideOptions();
});

//우측 사이드바 오브제 타입 선택
$(".btn-objet-type").on("click", function () {
   simulator.updateSideBar();
   $(".select_objet > ul > li").removeClass("active");
   $(this).parent("li").addClass("active");
});


function tooltipOpen(e) {
   var thisA = $(e).attr("value");

   if (thisA == "FENIX") {
      var title = "FENIX";
      var ptext = "감각적인 디자인을 완성하는 프리미엄 신소재로 손 끝은 스치는 부드러움과 스스로 재생되는 신비로움을 경험할 수 있습니다.";
      var img = "<img src='/au/images/objet/img-fenix.jpg' />";
   } else if (thisA == "Calming") {
      var title = "Calming";
      var ptext = "It is strong as well as light weight, and has a unique transparency and smooth finish to create a neat, tidy and calm space.";
      var img = "<img src='/au/images/objet/img-Calming.jpg' />";
      //@2022-05-18 스테인레스, 글라스 소재 타이틀 / 소재 내용 수정 (s)
   } else if (thisA == "Stainless Steel") {
      var title = "Stainless Steel";
      var ptext = "Boldy modern, luxurious colours in matte stainless.";
      var img = "<img src='/au/images/objet/img-Solid.jpg' />";
   } else if (thisA == "Mist Glass") {
      var title = "Mist Glass";
      var ptext = "Calming, forest inspired colours in mist glass.";
      var img = "<img src='/au/images/objet/img-Mist.jpg' />";
      //@2022-05-18 스테인레스, 글라스 소재 타이틀 / 소재 내용 수정 (e)
   } else if (thisA == "Nature Metal") {
      var title = "Nature Metal";
      var ptext = "It is a metal material with a texture following nature, and shows a calm and relaxing sense regardless of a space.";
      var img = "<img src='/au/images/objet/img-Nature.jpg' />";
   }

   $(".objet_popup, .mask").fadeIn();
   $(".objet_popup strong").html(title);
   $(".objet_popup .text2").html(ptext);
   $(".objet_popup .img").html(img);

}

$(".layer_popup .btn-close").on("click", function () {
   $(".layer_popup, .mask").fadeOut();
});

$("#save").on("click", function () {

   simulator.updateObjetSelected();
   //console.log('$("#refrigerator_convertible_L").val()',$("#refrigerator_convertible_L").val());
   //console.log('$("#refrigerator_convertible_M").val()',$("#refrigerator_convertible_M").val());
   if ($("#refrigerator_convertible_L").val() != "" || $("#refrigerator_convertible_M").val() != "" || ($("#refrigerator_LT").val() != "" && $("#refrigerator_LB").val() != "" && $("#refrigerator_RB").val() != "") /*|| ($("#wash_T").val() != "" && $("#wash_B").val() != "") || $("#clean").val() != "" *//*|| $("#styler").val() != "" */) {
      let popCont = '';
      let imgUrl = 'images/objet/simulator/appliances/';
      if ($("#refrigerator_convertible_L").val() != "") {//larder
         let nm = "rf_con";
         let nmTxt = "larder";
         let colorNm = $("#refrigerator_convertible_L").val();
         let mixNm = imgUrl + nm + "/ico/" + nm + "_" + colorNm + ".png";
         let tarLinkA = '';
         let tarLinkF = '';
         let arLink = '';
         let target = 'target="_blank"';
         if (colorNm == "mg_pink") {
            tarLinkA = "https://www.lg.com/au/refrigerators/lg-a381pk";
            tarLinkF = "https://www.lg.com/au/refrigerators/lg-f381pk";
            arLink = 'https://lgarexperience.com/ha/objet/onedoor/gps';
         } else if (colorNm == "mg_mint") {
            tarLinkA = "https://www.lg.com/au/refrigerators/lg-a381mn";
            tarLinkF = "https://www.lg.com/au/refrigerators/lg-f381mn";
            arLink = 'https://lgarexperience.com/ha/objet/onedoor/gms';
         } else if (colorNm == "mg_silver") {
            tarLinkA = "https://www.lg.com/au/refrigerators/lg-a381gs";
            tarLinkF = "https://www.lg.com/au/refrigerators/lg-f381gs";
            arLink = 'https://lgarexperience.com/ha/objet/onedoor/gss';
         } else if (colorNm == "mg_beige") {
            tarLinkA = "https://www.lg.com/au/refrigerators/lg-a381be";
            tarLinkF = "https://www.lg.com/au/refrigerators/lg-f381be";
            arLink = 'https://lgarexperience.com/ha/objet/onedoor/gb';
         } else if (colorNm == "st_silver") {
            tarLinkA = "javascript:noSale();";
            tarLinkF = "javascript:noSale();";
            arLink = 'https://lgarexperience.com/ha/objet/onedoor/sss';
            target = '';
         } else {
            tarLinkA = "javascript:noSale();";
            tarLinkF = "javascript:noSale();";
            arLink = 'https://lgarexperience.com/ha/objet/onedoor/sss';
            target = '';
         }
         popCont += '';
         popCont += '<li>';
         popCont += '	<div class="pic_box">';
         popCont += '		<a href="' + arLink + '" target="_blank" class="go_ar" data-link-name="move to larder ar"></a>';
         popCont += '		<img src="' + mixNm + '" alt="larder" />';
         //popCont += '		<span class="nm">'+nmTxt+'</span>';
         popCont += '	</div>';
         popCont += '	<p class="direct_txt">Learn more</p>';

         //@2022-05-18 장바구니 CTA 버튼추가 및 PDP 버튼 숨김처리 (s)
         // popCont += '	<a href="' + tarLinkA + '" ' + target + ' class="go_detail au_go_detail_btn1" data-link-name="move to larder Learn more"><span>Single Door<br>Fridge</span></a>';
         // popCont += '	<a href="' + tarLinkF + '" ' + target + ' class="go_detail au_go_detail_btn2" data-link-name="move to freezer Learn more"><span>Upright<br>Freezer</span></a>';
         popCont += '	<button type="button" class="btn_cta" data-objet-id="refrigerator_convertible_L">Add To Cart</button>';
         //@2022-05-18 장바구니 CTA 버튼추가 및 PDP 버튼 숨김처리 (e)

         popCont += '</li>';
      }
      if ($("#refrigerator_convertible_M").val() != "") {//freezer
         let nm = "rf_con";
         let nmTxt = "freezer";
         let colorNm = $("#refrigerator_convertible_M").val();
         let mixNm = imgUrl + nm + "/ico/" + nm + "_" + colorNm + ".png";
         let tarLinkA = '';
         let tarLinkF = '';
         let arLink = '';
         let target = 'target="_blank"';
         if (colorNm == "mg_pink") {
            tarLinkA = "https://www.lg.com/au/refrigerators/lg-a381pk";
            tarLinkF = "https://www.lg.com/au/refrigerators/lg-f381pk";
            arLink = 'https://lgarexperience.com/ha/objet/onedoor/gps';
         } else if (colorNm == "mg_mint") {
            tarLinkA = "https://www.lg.com/au/refrigerators/lg-a381mn";
            tarLinkF = "https://www.lg.com/au/refrigerators/lg-f381mn";
            arLink = 'https://lgarexperience.com/ha/objet/onedoor/gms';
         } else if (colorNm == "mg_silver") {
            tarLinkA = "https://www.lg.com/au/refrigerators/lg-a381gs";
            tarLinkF = "https://www.lg.com/au/refrigerators/lg-f381gs";
            arLink = 'https://lgarexperience.com/ha/objet/onedoor/gss';
         } else if (colorNm == "mg_beige") {
            tarLinkA = "https://www.lg.com/au/refrigerators/lg-a381be";
            tarLinkF = "https://www.lg.com/au/refrigerators/lg-f381be";
            arLink = 'https://lgarexperience.com/ha/objet/onedoor/gb';
         } else if (colorNm == "st_silver") {
            tarLinkA = "javascript:noSale();";
            tarLinkF = "javascript:noSale();";
            arLink = 'https://lgarexperience.com/ha/objet/onedoor/sss';
            target = '';
         } else {
            tarLinkA = "javascript:noSale();";
            tarLinkF = "javascript:noSale();";
            arLink = 'https://lgarexperience.com/ha/objet/onedoor/sss';
            target = '';
         }
         popCont += '';
         popCont += '<li>';
         popCont += '	<div class="pic_box">';
         popCont += '		<a href="' + arLink + '" target="_blank" class="go_ar" data-link-name="move to freezer ar"></a>';
         popCont += '		<img src="' + mixNm + '" alt="freezer" />';
         //popCont += '		<span class="nm">'+nmTxt+'</span>';
         popCont += '	</div>';
         popCont += '	<p class="direct_txt">Learn more</p>';

         //@2022-05-18 장바구니 CTA 버튼추가 및 PDP 버튼 숨김처리 (s)
         // popCont += '	<a href="' + tarLinkA + '" ' + target + ' class="go_detail au_go_detail_btn1" data-link-name="move to larder Learn more"><span>Single Door<br>Fridge</span></a>';
         // popCont += '	<a href="' + tarLinkF + '" ' + target + ' class="go_detail au_go_detail_btn2" data-link-name="move to freezer Learn more"><span>Upright<br>Freezer</span></a>';
         popCont += '	<button type="button" class="btn_cta" data-objet-id="refrigerator_convertible_M">Add To Cart</button>';
         //@2022-05-18 장바구니 CTA 버튼추가 및 PDP 버튼 숨김처리 (e)

         popCont += '</li>';
      }

      if ($("#refrigerator_LT").val() != "" && $("#refrigerator_LB").val() != "" && $("#refrigerator_RB").val() != "") {//상냉장고
         let nm = "rf";
         let nmTxt = "Next6";
         let colorNmLT = $("#refrigerator_LT").val();
         let colorNmLB = $("#refrigerator_LB").val();
         let colorNmRB = $("#refrigerator_RB").val();
         let mixNm = imgUrl + nm + "/ico/rf_default.png";

         //@2022-05-18 선택값에 따른 냉장고 이미지 추출 변수선언 (s)
         //ex) images/objet/simulator/appliances/rf/ico/rf_st_green_st_silver_st_silver.png
         let userSelectImg = imgUrl + nm + "/ico/rf_" + colorNmLT + "_" + colorNmLB + "_" + colorNmRB + ".png";
         //@2022-05-18 선택값에 따른 냉장고 이미지 추출 변수선언 (e)

         let tarLink = 'javascript:noSale();';
         let arLink = 'https://lgarexperience.com/ha/objet/M870/stsgreensliver';
         let target = '';
         //let target = 'target="_blank"';
         popCont += '';
         popCont += '<li>';
         popCont += '	<div class="pic_box">';
         popCont += '		<a href="' + arLink + '" target="_blank" class="go_ar" data-link-name="move to Next6 ar"></a>';

         //@2022-05-18 선택값에 따른 냉장고 이미지 추출 (s)
         // popCont += '		<img src="' + mixNm + '" alt="" class="rf_default" />';
         popCont += '		<img src="' + userSelectImg + '" alt="" class="rf_userSelectImage" />';
         //@2022-05-18 선택값에 따른 냉장고 이미지 추출 (e)

         popCont += '	</div>';

         //@2022-05-18 장바구니 CTA 버튼추가 및 PDP 버튼 숨김처리 (s)
         // popCont += '	<a href="'+tarLink+'" '+target+' class="go_detail au_go_detail_btn3" data-link-name="move to Next6 Learn more"><span>InstaView®<br>French Door Fridge</span></a>';
         popCont += '	<button type="button" class="btn_cta" data-objet-id="refrigerator">Add To Cart</button>';
         //@2022-05-18 장바구니 CTA 버튼추가 및 PDP 버튼 숨김처리 (e)

         popCont += '</li>';
      }

      /*if($("#wash_T").val() != "" && $("#wash_B").val() != ""){//워시타워
            let nm = "wash";
            let nmTxt = "wash";
            let colorNmT = $("#wash_T").val();
            let colorNmB = $("#wash_B").val();
            let mixNm = imgUrl+nm+"/ico/wash_default.png";
            let tarLink = 'https://www.lg.com/au/washing-machines/lg-fn351qh';
            let arLink = 'https://lgarexperience.com/ha/objet/washtower/bg';
            let target = 'target="_blank"';
            popCont += '';
            popCont += '<li>';
            popCont += '	<div class="pic_box">';
            popCont += '		<a href="'+arLink+'" target="_blank" class="go_ar" data-link-name="move to wash ar"></a>';
            popCont += '		<img src="'+mixNm+'" alt="" class="wash" />';
            popCont += '	</div>';
            popCont += '	<a href="'+tarLink+'" '+target+' class="go_detail" data-link-name="move to wash Learn more"><span>Learn more</span></a>';
            popCont += '</li>';
        }

        if($("#clean").val() != ""){//청소기
            let nm = "clean";
            let nmTxt = "clean";
            let colorNm = $("#clean").val();
            let mixNm = imgUrl+nm+"/ico/"+nm+"_"+colorNm+".png";
            let tarLink = 'javascript:noSale();';
            let arLink = '';
            let target = '';
            //let target = 'target="_blank"';
            if(colorNm == "calm_green"){
                tarLink = "";
                arLink = 'https://lgarexperience.com/ha/objet/allinonetower/green';
            }else if(colorNm == "calm_beige"){
                tarLink = "";
                arLink = 'https://lgarexperience.com/ha/objet/allinonetower/beige';
            }
            popCont += '';
            popCont += '<li>';
            popCont += '	<div class="pic_box">';
            popCont += '		<a href="'+arLink+'" target="_blank" class="go_ar" data-link-name="move to clean ar"></a>';
            popCont += '		<img src="'+mixNm+'" alt="" class="clean" />';
            popCont += '	</div>';
            popCont += '	<a href="'+tarLink+'" '+target+' class="go_detail" data-link-name="move to clean Learn more"><span>Learn more</span></a>';
            popCont += '</li>';
        }

        if($("#styler").val() != ""){//스타일러
            let nm = "styler";
            let nmTxt = "styler";
            let colorNm = $("#styler").val();
            let mixNm = imgUrl+nm+"/ico/"+nm+"_"+colorNm+".png";
            let tarLink = '';
            let arLink = '';
            if(colorNm == "mg_green"){
                tarLink = "https://www.lg.com/au/styler/lg-s5goc";
                arLink = 'https://lgarexperience.com/ha/objet/styler/green';
            }else if(colorNm == "mg_beige"){
                tarLink = "https://www.lg.com/au/styler/lg-s5boc";
                arLink = 'https://lgarexperience.com/ha/objet/styler/beige';
            }
            popCont += '';
            popCont += '<li>';
            popCont += '	<div class="pic_box">';
            popCont += '		<a href="'+arLink+'" target="_blank" class="go_ar" data-link-name="move to styler ar"></a>';
            popCont += '		<img src="'+mixNm+'" alt="" class="styler" />';
            popCont += '	</div>';
            popCont += '	<a href="'+tarLink+'" target="_blank" class="go_detail" data-link-name="move to styler Learn more"><span>Learn more</span></a>';
            popCont += '</li>';
        }*/


      $("#purchase_popup .purchase_list ul").html("").append(popCont);
      $("#purchase_popup").fadeIn();



   } else {
      $("#empty_popup").fadeIn();
   }



   /*document.getElementById('loading').style.display = '';

    $("#simulator_dw .objet_bg").html($(".swiper-wrapper").html());
    $("#simulator_dw .swiper-slide").css("width", "auto");
    $("#simulator_dw .objet_bg .objet_resize").each(function() {
        var itemT =$(this).attr("itemt") + "px";
        var itemL = $(this).attr("iteml") + "px";
        var itemw =$(this).attr("itemw") + "px";
        var itemh = $(this).attr("itemh") + "px";
        $(this).css({
            top: itemT,
            left: itemL,
            width: itemw,
            height: itemh
        });
    });*/

   /*html2canvas(document.querySelector("#simulator_dw"), {scale: '1', logging: false, useCORS: true } ).then(function(canvas) {

        //alert(canvas.width);
        var imgDataUrl = canvas.toDataURL('image/jpeg');

        var blobBin = atob(imgDataUrl.split(',')[1]);	// base64 데이터 디코딩
        var array = [];
        for (var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        var file = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});	// Blob 생성


        var formdata = new FormData();	// formData 생성
        formdata.append("file", file);	// file data 추가
        formdata.append("jsa_bg0", $("#jsa_bg0").val());
        formdata.append("jsa_bg1", $("#jsa_bg1").val());
        formdata.append("jsa_bg2", $("#jsa_bg2").val());
        formdata.append("jsa_bg3", $("#jsa_bg3").val());
        formdata.append("refrigerator_LT", $("#refrigerator_LT").val());
        formdata.append("refrigerator_LB", $("#refrigerator_LB").val());
        formdata.append("refrigerator_RB", $("#refrigerator_RB").val());
        formdata.append("refrigerator_convertible_L", $("#refrigerator_convertible_L").val());
        formdata.append("refrigerator_convertible_M", $("#refrigerator_convertible_M").val());
        formdata.append("refrigerator_convertible_R", $("#refrigerator_convertible_R").val());
        formdata.append("dish", $("#dish").val());
        formdata.append("oven", $("#oven").val());
        formdata.append("water", $("#water").val());
        formdata.append("refrigerator_T", $("#refrigerator_T").val());
        formdata.append("refrigerator_M", $("#refrigerator_M").val());
        formdata.append("refrigerator_B", $("#refrigerator_B").val());
        formdata.append("wash_T", $("#wash_T").val());
        formdata.append("wash_B", $("#wash_B").val());
        formdata.append("styler", $("#styler").val());
        formdata.append("clean", $("#clean").val());
        formdata.append("aroot", "M");
        //alert($("#refrigerator_LT").val());
        $.ajax({
            type : 'post',
            url : '/canvas_save.jsp',
            data : formdata,
            dataType:"json",
            processData : false,	// data 파라미터 강제 string 변환 방지!!
            contentType : false,	// application/x-www-form-urlencoded; 방지!!
            success : function (data) {
                if (data.err == "0") {
                  //alert("정상적으로 등록되었습니다.");
                  update_file_name = data.seq;
                  //alert(update_file_name);
                  setTimeout($('#final_img').attr('src', "/nfsimg/"+update_file_name.substring(10,18)+"/canvas_img_"+update_file_name+".jpg"), 1000);
                  document.getElementById('loading').style.display = 'none';
                  $(".sns_popup, .mask").fadeIn();
                }
            },
            error: function (e) {
                alert(e.responseText);
                console.log("ERROR : ", e);
                //$("#btnSubmit").prop("disabled", false);
            }
        });
    });*/
});

//@2022-05-18 장바구니 API 연동 (s)
var cartDataArr_refrigerator = [];
var cartDataArr_refrigerator_convertible_L = [], cartDataArr_refrigerator_convertible_M = [];

// 객체값 체크
function isEmptyObj(obj) {
   if (obj.constructor === Object
      && Object.keys(obj).length === 0) {
      return true;
   }
   return false;
}

// 장바구니 화면내에 CTA 클릭시
//@2022-05-18 장바구니 데이터 (s)
$("body").on("click", ".btn_cta", function () {
   let mutationDataR;
   let mutationDataL;
   let mutationDataM;
   var $this = $(this);
   var $objetId = $this.data("objet-id");
   console.log("userSelectedModelData", userSelectedModelData);

   for (var itemIdx = 0; itemIdx < userSelectedModelData.length; itemIdx++) {
      if (userSelectedModelData[itemIdx].selectedObject_id == "refrigerator") {
         //냉장고 모델명 (양문형은 3개가 동일)
         var productModelId = userSelectedModelData[itemIdx].selectedObject_modelIds[itemIdx].selectedObject_modelId;
         var productModelCode = userSelectedModelData[itemIdx].selectedObject_modelIds[itemIdx].selectedObject_modelCode;
         var userSelectData = {};

         for (var descIdx = 0; descIdx < userSelectedModelData[itemIdx].selectedObject_desc.length; descIdx++) {
            if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelection_id === "refrigerator_LT" && userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface !== "st_green") {
               // 판넬 모델명
               // userSelectData.refrigerator_LT = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
               userSelectOpts = {};
               userSelectOpts.modelId = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
               userSelectOpts.modelCode = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelCode;
               userSelectOpts.modelColor = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface;
               userSelectData.refrigerator_LT = userSelectOpts;
            }
            if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelection_id === "refrigerator_LB" && userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface !== "st_silver") {
               // 판넬 모델명
               // userSelectData.refrigerator_LB = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
               userSelectOpts = {};
               userSelectOpts.modelId = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
               userSelectOpts.modelCode = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelCode;
               userSelectOpts.modelColor = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface;
               userSelectData.refrigerator_LB = userSelectOpts;
            }
            if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelection_id === "refrigerator_RB" && userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface !== "st_silver") {
               // 판넬 모델명
               // userSelectData.refrigerator_RB = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
               userSelectOpts = {};
               userSelectOpts.modelId = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
               userSelectOpts.modelCode = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelCode;
               userSelectOpts.modelColor = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface;
               userSelectData.refrigerator_RB = userSelectOpts;
            }
         }

         cartDataArr_refrigerator = [];
         let finalData;

         if (isEmptyObj(userSelectData)) {
            var cartData = {
               data: { sku: productModelId, qty: 1 },
               zipcode: "2000"
            }
            cartDataArr_refrigerator.push(cartData);

            let defaultData = [];
            defaultData.push("{ data: { sku: " + JSON.stringify(cartDataArr_refrigerator[0].data.sku) + ", qty: 1 }, zipcode: \"2000\"}")
            finalData = defaultData;
         } else {
            for (var key in userSelectData) {
               // console.log(key, userSelectData[key]);
               if (userSelectData.refrigerator_LT !== undefined || userSelectData.refrigerator_LB !== undefined || userSelectData.refrigerator_RB !== undefined) {
                  var _selectColorInfo, _selectColorInfoArr;
                  var _selectCode, _selectLocation, _selectColor, _selectType;
                  if (key === "refrigerator_LT") {
                     _selectLocation = "upper left";
                     // _selectLocation = "top";
                     _selectCode = userSelectData.refrigerator_LT.modelCode;
                     _selectColorInfo = userSelectData.refrigerator_LT.modelColor;
                     _selectColorInfoArr = _selectColorInfo.split('_');
                     (_selectColorInfoArr[0] == "st") ? _selectType = "stainless" : _selectType = "glass";
                     (_selectColorInfoArr[1] == "black") ? _selectColor = "matte Black" : _selectColor = _selectColorInfoArr[1];
                  }
                  if (key === "refrigerator_LB") {
                     _selectLocation = "lower left";
                     // _selectLocation = "bottom";
                     _selectCode = userSelectData.refrigerator_LB.modelCode;
                     _selectColorInfo = userSelectData.refrigerator_LB.modelColor;
                     _selectColorInfoArr = _selectColorInfo.split('_');
                     (_selectColorInfoArr[0] == "st") ? _selectType = "stainless" : _selectType = "glass";
                     (_selectColorInfoArr[1] == "black") ? _selectColor = "matte Black" : _selectColor = _selectColorInfoArr[1];
                  }
                  if (key === "refrigerator_RB") {
                     _selectLocation = "lower right";
                     // _selectLocation = "bottom";
                     _selectCode = userSelectData.refrigerator_RB.modelCode;
                     _selectColorInfo = userSelectData.refrigerator_RB.modelColor;
                     _selectColorInfoArr = _selectColorInfo.split('_');
                     (_selectColorInfoArr[0] == "st") ? _selectType = "stainless" : _selectType = "glass";
                     (_selectColorInfoArr[1] == "black") ? _selectColor = "matte Black" : _selectColor = _selectColorInfoArr[1];
                  }

                  var userSelectOptList = "";
                  userSelectOptList = _selectCode + ',' + _selectLocation + ',' + _selectColor + ',' + _selectType;
                  // console.log(userSelectOptList);

                  var cartData = {
                     data: { sku: userSelectData[key].modelId, qty: 1 },
                     zipcode: "2000",
                     lg_custom_options: {
                        objet_sales_options: userSelectOptList,
                        parent_sku: productModelId
                     }
                  }
                  cartDataArr_refrigerator.push(cartData);
               }
            }

            let defaultData = [];
            for (let i = 0; i < cartDataArr_refrigerator.length; i++) {
               defaultData.push("{ data: { sku: " + JSON.stringify(cartDataArr_refrigerator[i].data.sku) + ", qty: 1 }, zipcode: \"2000\", lg_custom_options: { objet_sales_options: " + JSON.stringify(cartDataArr_refrigerator[i].lg_custom_options.objet_sales_options) + ", parent_sku: " + JSON.stringify(cartDataArr_refrigerator[i].lg_custom_options.parent_sku) + " } }")
            }
            finalData = defaultData;
         }
         mutationDataR = JSON.stringify({
            "query": "mutation { addObjetSalesToCart( input: { cartItems: [ " + finalData + "] }) {redirectUrl cart { items { product { sku } qty } } } }",
            "variables": null,
            "operationName": null
         })
      }

      if (userSelectedModelData[itemIdx].selectedObject_id == "refrigerator_convertible") {
         var productModelId_L, productModelId_M;
         var productModelCode_L, productModelCode_M;
         var userSelectData_L = {}, userSelectData_M = {};

         for (var descIdx = 0; descIdx < userSelectedModelData[itemIdx].selectedObject_desc.length; descIdx++) {
            if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelection_id === "refrigerator_convertible_L") {
               // 냉장고 모델명
               productModelId_L = userSelectedModelData[itemIdx].selectedObject_modelIds[descIdx].selectedObject_modelId;
               productModelCode_L = userSelectedModelData[itemIdx].selectedObject_modelIds[descIdx].selectedObject_modelCode;
               if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface !== "st_silver") {
                  // 판넬 모델명
                  // userSelectData_L.refrigerator_convertible = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
                  userSelectOpts = {};
                  userSelectOpts.modelId = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
                  userSelectOpts.modelCode = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelCode;
                  userSelectOpts.modelColor = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface;
                  userSelectData_L.refrigerator_convertible = userSelectOpts;
               }
            }

            if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelection_id === "refrigerator_convertible_M") {
               // 냉장고 모델명
               productModelId_M = userSelectedModelData[itemIdx].selectedObject_modelIds[descIdx].selectedObject_modelId;
               productModelCode_M = userSelectedModelData[itemIdx].selectedObject_modelIds[descIdx].selectedObject_modelCode;
               if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface !== "st_silver") {
                  // 판넬 모델명
                  // userSelectData_M.refrigerator_convertible = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
                  userSelectOpts = {};
                  userSelectOpts.modelId = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
                  userSelectOpts.modelCode = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelCode;
                  userSelectOpts.modelColor = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface;
                  userSelectData_M.refrigerator_convertible = userSelectOpts;
               }
            }
         }

         cartDataArr_refrigerator_convertible_L = [], cartDataArr_refrigerator_convertible_M = [];

         if (isEmptyObj(userSelectData_L)) {
            var cartData = {
               data: { sku: productModelId_L, qty: 1 },
               zipcode: "2000"
            }
            cartDataArr_refrigerator_convertible_L.push(cartData);
            mutationDataL = JSON.stringify({
               // "query": "mutation { addObjetSalesToCart( input: { cartItems: [{ data :{ sku :\"MD07545595\", qty :1}, zipcode :\"2000\"}] }) {redirectUrl cart { items { product { sku } qty } } } }",
               "query": "mutation { addObjetSalesToCart( input: { cartItems: [{ data :{ sku : " + JSON.stringify(cartDataArr_refrigerator_convertible_L[0].data.sku) + " , qty :1}, zipcode :\"2000\"}] }) {redirectUrl cart { items { product { sku } qty } } } }",
               "variables": null,
               "operationName": null
            })
         } else {
            var _selectColorInfo, _selectColorInfoArr;
            var _selectCode, _selectColor, _selectType;

            _selectCode = userSelectData_L.refrigerator_convertible.modelCode;
            _selectColorInfo = userSelectData_L.refrigerator_convertible.modelColor;
            _selectColorInfoArr = _selectColorInfo.split('_');
            (_selectColorInfoArr[0] == "st") ? _selectType = "stainless" : _selectType = "glass";
            (_selectColorInfoArr[1] == "black") ? _selectColor = "matte Black" : _selectColor = _selectColorInfoArr[1];

            var userSelectOptList = "";
            userSelectOptList = _selectCode + ',full cover,' + _selectColor + ',' + _selectType;
            // console.log(userSelectOptList);

            var cartData = {
               data: { sku: userSelectData_L.refrigerator_convertible.modelId, qty: 1 },
               zipcode: "2000",
               lg_custom_options: {
                  objet_sales_options: userSelectOptList,
                  parent_sku: productModelId_L
               }
            }
            cartDataArr_refrigerator_convertible_L.push(cartData);

            mutationDataL = JSON.stringify({
               // "query": "mutation { addObjetSalesToCart( input: { cartItems: [{ data :{ sku :\"MD07545595\", qty :1}, zipcode :\"2000\"}] }) {redirectUrl cart { items { product { sku } qty } } } }",
               "query": "mutation { addObjetSalesToCart( input: { cartItems: [ { data: { sku: "
                  + JSON.stringify(cartDataArr_refrigerator_convertible_L[0].data.sku) + ", qty: 1 }, zipcode: \"2000\" lg_custom_options: { objet_sales_options: "
                  + JSON.stringify(cartDataArr_refrigerator_convertible_L[0].lg_custom_options.objet_sales_options)
                  + " parent_sku:" + JSON.stringify(cartDataArr_refrigerator_convertible_L[0].lg_custom_options.parent_sku) + " } }] }) { redirectUrl cart { items { product { sku } qty } } } }",
               "variables": null,
               "operationName": null
            })
         }

         if (isEmptyObj(userSelectData_M)) {
            var cartData = {
               data: { sku: productModelId_M, qty: 1 },
               zipcode: "2000"
            }
            cartDataArr_refrigerator_convertible_M.push(cartData);

            mutationDataM = JSON.stringify({
               "query": "mutation { addObjetSalesToCart( input: { cartItems: [{ data :{ sku : " + JSON.stringify(cartDataArr_refrigerator_convertible_M[0].data.sku) + " , qty :1}, zipcode :\"2000\"}] }) {redirectUrl cart { items { product { sku } qty } } } }",
               "variables": null,
               "operationName": null
            })

         } else {
            var _selectColorInfo, _selectColorInfoArr;
            var _selectCode, _selectColor, _selectType;

            _selectCode = userSelectData_M.refrigerator_convertible.modelCode;
            _selectColorInfo = userSelectData_M.refrigerator_convertible.modelColor;
            _selectColorInfoArr = _selectColorInfo.split('_');
            (_selectColorInfoArr[0] == "st") ? _selectType = "stainless" : _selectType = "glass";
            (_selectColorInfoArr[1] == "black") ? _selectColor = "matte Black" : _selectColor = _selectColorInfoArr[1];

            var userSelectOptList = "";
            userSelectOptList = _selectCode + ',full cover,' + _selectColor + ',' + _selectType;
            // console.log(userSelectOptList);

            var cartData = {
               data: { sku: userSelectData_M.refrigerator_convertible.modelId, qty: 1 },
               zipcode: "2000",
               lg_custom_options: {
                  objet_sales_options: userSelectOptList,
                  parent_sku: productModelId_M
               }
            }
            cartDataArr_refrigerator_convertible_M.push(cartData);

            mutationDataM = JSON.stringify({
               "query": "mutation { addObjetSalesToCart( input: { cartItems: [ { data: { sku: "
                  + JSON.stringify(cartDataArr_refrigerator_convertible_M[0].data.sku) + ", qty: 1 }, zipcode: \"2000\" lg_custom_options: { objet_sales_options: "
                  + JSON.stringify(cartDataArr_refrigerator_convertible_M[0].lg_custom_options.objet_sales_options)
                  + " parent_sku:" + JSON.stringify(cartDataArr_refrigerator_convertible_M[0].lg_custom_options.parent_sku) + " } }] }) { redirectUrl cart { items { product { sku } qty } } } }",
               "variables": null,
               "operationName": null
            })
         }
      }
   }

   if ($objetId == "refrigerator") {
      console.log(mutationDataR)

      $.ajax({
         url: 'https://wwwstg.lg.com/au/shop/graphql',
         method: "POST",
         timeout: 0,
         headers: {
            "Store": "au",
            "Content-Type": "application/json",
            // "Cookie": "LG5_CartID=M7ICVhGLMnnrtId3qnLkyV0mKgvuav9y;PHPSESSID=c7349369611ebe937a8f4eff7ae598d9;private_content_version=acdcf890c5504abcb8766f67a98aa381"
         },
         data: mutationDataR,
         success: function (data) {
            console.log('success');
            console.log(data);
         }
      })
   }

   if ($objetId == "refrigerator_convertible_L") {
      console.log(mutationDataL)

      $.ajax({
         url: 'https://wwwstg.lg.com/au/shop/graphql',
         method: "POST",
         timeout: 0,
         headers: {
            "Store": "au",
            "Content-Type": "application/json",
            // "Cookie": "LG5_CartID=M7ICVhGLMnnrtId3qnLkyV0mKgvuav9y;PHPSESSID=c7349369611ebe937a8f4eff7ae598d9;private_content_version=acdcf890c5504abcb8766f67a98aa381"
         },
         data: mutationDataL,
         success: function (data) {
            console.log('success');
            console.log(data);
         }
      })
   }

   if ($objetId == "refrigerator_convertible_M") {
      console.log(mutationDataM)

      $.ajax({
         url: 'https://wwwstg.lg.com/au/shop/graphql',
         method: "POST",
         timeout: 0,
         headers: {
            "Store": "au",
            "Content-Type": "application/json",
            // "Cookie": "LG5_CartID=M7ICVhGLMnnrtId3qnLkyV0mKgvuav9y;PHPSESSID=c7349369611ebe937a8f4eff7ae598d9;private_content_version=acdcf890c5504abcb8766f67a98aa381"
         },
         data: mutationDataM,
         success: function (data) {
            console.log('success');
            console.log(data);
         }
      })
   }

   $("#addToCartSuccess").addClass("show"); //장바구니 팝업 생성
});

// 장바구니 팝업 삭제
$(".btn-secondary").on("click", function () {
   $("#addToCartSuccess").removeClass("show");
});

// 본품컬러 선택화면내에있는 CTA 클릭시
$("body").on("click", ".btn_modelRestBtn", function () {
   var $this = $(this);
   var $objetId = $this.data("objet-id");
   // console.log("userSelectedModelData",userSelectedModelData);

   /* for (var itemIdx = 0; itemIdx < userSelectedModelData.length; itemIdx++) {
        if (userSelectedModelData[itemIdx].selectedObject_id == "refrigerator") {
            //냉장고 모델명 (양문형은 3개가 동일)
            var productModelId = userSelectedModelData[itemIdx].selectedObject_modelIds[itemIdx].selectedObject_modelId;
            var userSelectData = {};

            for (var descIdx = 0; descIdx < userSelectedModelData[itemIdx].selectedObject_desc.length; descIdx++) {
                if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelection_id === "refrigerator_LT" && userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface !== "st_green") {
                    // 판넬 모델명
                    userSelectData.refrigerator_LT = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
                }
                if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelection_id === "refrigerator_LB" && userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface !== "st_silver") {
                    // 판넬 모델명
                    userSelectData.refrigerator_LB = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
                }
                if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelection_id === "refrigerator_RB" && userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface !== "st_silver") {
                    // 판넬 모델명
                    userSelectData.refrigerator_RB = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
                }
            }

            cartDataArr_refrigerator = [];
            if (isEmptyObj(userSelectData)) {
                var cartData = {
                    data: { sku: productModelId, qty: 1 },
                    lg_custom_options: {
                        is_object_sale_product: true,
                    }
                }
                cartDataArr_refrigerator.push(cartData);
            } else {
                // console.log("본품컬러와 다른값", userSelectData);
                for (var key in userSelectData) {
                    // console.log(key, userSelectData[key]);
                    if (userSelectData.refrigerator_LT !== undefined || userSelectData.refrigerator_LB !== undefined || userSelectData.refrigerator_RB !== undefined) {
                        var _selectLocation;
                        if (key === "refrigerator_LT") _selectLocation = "top-left";
                        if (key === "refrigerator_LB") _selectLocation = "bottom-left";
                        if (key === "refrigerator_RB") _selectLocation = "bottom-right";
                        var cartData = {
                            data: { sku: productModelId, qty: 1 },
                            lg_custom_options: {
                                is_object_sale_product: true,
                                position: _selectLocation,
                                parent_sku: userSelectData[key]
                            }
                        }
                        cartDataArr_refrigerator.push(cartData);
                    }
                }
            }
            // console.log("refrigerator(Model)",productModelId, "\nrefrigerator(df_Panel*)",userSelectData);
        }

        if (userSelectedModelData[itemIdx].selectedObject_id == "refrigerator_convertible") {
            var productModelId_L, productModelId_M;
            var userSelectData_L = {};
            var userSelectData_M = {};

            for (var descIdx = 0; descIdx < userSelectedModelData[itemIdx].selectedObject_desc.length; descIdx++) {
                if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelection_id === "refrigerator_convertible_L") {
                    // 냉장고 모델명
                    productModelId_L = userSelectedModelData[itemIdx].selectedObject_modelIds[descIdx].selectedObject_modelId;
                    if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface !== "st_silver") {
                        // 판넬 모델명
                        userSelectData_L.refrigerator_convertible = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
                    }
                }

                if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelection_id === "refrigerator_convertible_M") {
                    // 냉장고 모델명
                    productModelId_M = userSelectedModelData[itemIdx].selectedObject_modelIds[descIdx].selectedObject_modelId;
                    if (userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedSurface !== "st_silver") {
                        // 판넬 모델명
                        userSelectData_M.refrigerator_convertible = userSelectedModelData[itemIdx].selectedObject_desc[descIdx].selectedObjectSelectedModelId;
                    }
                }
            }

            console.log(
                "refrigerator_convertible_L(Model)",productModelId_L,"\nrefrigerator_convertible_L(df_Panel*)",userSelectData_L,
                "\nrefrigerator_convertible_M(Model)",productModelId_M,"\nrefrigerator_convertible_M(df_Panel*)",userSelectData_M
            );

            cartDataArr_refrigerator_convertible_L = [];
            cartDataArr_refrigerator_convertible_M = [];

            if (isEmptyObj(userSelectData_L)) {
                var cartData = {
                    data: { sku: productModelId_L, qty: 1 },
                    lg_custom_options: {
                        is_object_sale_product: true,
                    }
                }
                cartDataArr_refrigerator_convertible_L.push(cartData);
            } else {
                // console.log("본품컬러와 다른값", userSelectData_L);
                var cartData = {
                    data: { sku: productModelId_L, qty: 1 },
                    lg_custom_options: {
                        is_object_sale_product: true,
                        // position: _selectLocation,
                        parent_sku: userSelectData_L.refrigerator_convertible
                    }
                }
                cartDataArr_refrigerator_convertible_L.push(cartData);
            }

            if (isEmptyObj(userSelectData_M)) {
                var cartData = {
                    data: { sku: productModelId_M, qty: 1 }, //sku : MD07553654
                    lg_custom_options: {
                        is_object_sale_product: true,
                    }
                }
                cartDataArr_refrigerator_convertible_M.push(cartData);
            } else {
                // console.log("본품컬러와 다른값", userSelectData_M);
                var cartData = {
                    data: { sku: productModelId_M, qty: 1 },
                    lg_custom_options: {
                        is_object_sale_product: true,
                        // position: _selectLocation,
                        parent_sku: userSelectData_M.refrigerator_convertible
                    }
                }
                cartDataArr_refrigerator_convertible_M.push(cartData);
            }
        }
    } */

   if ($objetId == "refrigerator") {
      let mutationDataR = JSON.stringify({ "query": "mutation { addObjetSalesToCart( input: { cartItems: [ { data: { sku: \"MD07545595\", qty: 1 }, zipcode: \"2000\"}] }) {redirectUrl cart { items { product { sku } qty } } } }", "variables": null, "operationName": null })
      console.log(mutationDataR)

      $.ajax({
         url: 'https://wwwstg.lg.com/au/shop/graphql',
         method: "POST",
         timeout: 0,
         headers: {
            "Store": "au",
            "Content-Type": "application/json",
            // "Cookie": "LG5_CartID=M7ICVhGLMnnrtId3qnLkyV0mKgvuav9y;PHPSESSID=c7349369611ebe937a8f4eff7ae598d9;private_content_version=acdcf890c5504abcb8766f67a98aa381"
         },
         data: mutationDataR,
         success: function (data) {
            console.log('success');
            console.log(data);
         }
      })
   }

   if ($objetId == "refrigerator_convertible_L") {
      let mutationDataL = JSON.stringify({ "query": "mutation { addObjetSalesToCart( input: { cartItems: [{ data :{ sku : \"MD07553654\" , qty :1}, zipcode :\"2000\"}] }) {redirectUrl cart { items { product { sku } qty } } } }", "variables": null, "operationName": null })
      console.log(mutationDataL)
      $.ajax({
         url: 'https://wwwstg.lg.com/au/shop/graphql',
         method: "POST",
         timeout: 0,
         headers: {
            "Store": "au",
            "Content-Type": "application/json",
            // "Cookie": "LG5_CartID=M7ICVhGLMnnrtId3qnLkyV0mKgvuav9y;PHPSESSID=c7349369611ebe937a8f4eff7ae598d9;private_content_version=acdcf890c5504abcb8766f67a98aa381"
         },
         data: mutationDataL,
         success: function (data) {
            console.log('success');
            console.log(data);
         }
      })

   }

   if ($objetId == "refrigerator_convertible_M") {
      let mutationDataM = JSON.stringify({ "query": "mutation { addObjetSalesToCart( input: { cartItems: [{ data :{ sku : \"MD07553636\" , qty :1}, zipcode :\"2000\"}] }) {redirectUrl cart { items { product { sku } qty } } } }", "variables": null, "operationName": null })
      console.log(mutationDataM)

      $.ajax({
         url: 'https://wwwstg.lg.com/au/shop/graphql',
         method: "POST",
         timeout: 0,
         headers: {
            "Store": "au",
            "Content-Type": "application/json",
            // "Cookie": "LG5_CartID=M7ICVhGLMnnrtId3qnLkyV0mKgvuav9y;PHPSESSID=c7349369611ebe937a8f4eff7ae598d9;private_content_version=acdcf890c5504abcb8766f67a98aa381"
         },
         data: mutationDataM,
         success: function (data) {
            console.log('success');
            console.log(data);
         }
      })
   }

   $("#addToCartSuccess").addClass("show"); //장바구니 팝업 생성
});
//@2022-05-18 장바구니 데이터 (e)
//@2022-05-18 장바구니 API 연동 (e)

//색상 경고 팝업 @pck 2020-10-19
$(".color_warning_popup button").on("click", function () {
   if ($(this).hasClass('btn-cancel')) {
      $(".color_warning_popup").hide();
   }
   if ($(this).hasClass('btn-confirm-select')) {
      simulator.confirmColorSelect($(".btn-objet.pre-active"));
      $(".color_warning_popup").hide();
   }
});

//소재 다른 제품 구매 안내 팝업
function showShopLinkAlert() {
   $(".shop_reservation_popup").fadeIn();

   $(".shop_reservation_popup button").on("click", function () {
      $(".shop_reservation_popup").fadeOut();
   });
}

//냉장고 용량 선택
function showShopLinkAlert() {
   $(".shop_reservation_popup").fadeIn();

   $(".shop_reservation_popup button").on("click", function () {
      $(".shop_reservation_popup").fadeOut();
   });
}

//냉장고 용량 선택
function showSelectVolume() {
   $(".refrigerator_reservation_popup").fadeIn();

   $(".refrigerator_reservation_popup button").on("click", function () {
      $(".refrigerator_reservation_popup").fadeOut();
   });
}

$(".opacity-mask, .btn-simul-start-close").click(function () {
   $(".simul-start-div, .opacity-mask").fadeOut();
});

$(".btn-simul-start-close2").click(function () {
   $(".control-bx").fadeOut();
});

//툴팁 선택 시 hide
$(".simul-info.rf-con").on('click', function () {
   $(this).hide();
});

Scrollbar.initAll(); //팝업 내 스크롤바 생성
function go_shop(tp) {
   $(".refrigerator_reservation_popup, .mask").fadeOut();
   var refrigerator_model = "0";
   if (tp == "1") {
      if ($("#refrigerator_LT").val() == "fn_botanic" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6323990";
      } else if ($("#refrigerator_LT").val() == "fn_botanic" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_sand") {
         refrigerator_model = "6322578";
      } else if ($("#refrigerator_LT").val() == "fn_botanic" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6323991";
      } else if ($("#refrigerator_LT").val() == "fn_botanic" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6323992";
      } else if ($("#refrigerator_LT").val() == "fn_botanic" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_sand") {
         refrigerator_model = "6334835";
      } else if ($("#refrigerator_LT").val() == "fn_botanic" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6323993";
      } else if ($("#refrigerator_LT").val() == "fn_botanic" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_sand") {
         refrigerator_model = "6323994";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6323995";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6323997";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6323998";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6323999";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324000";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_sand") {
         refrigerator_model = "6335023";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_sand") {
         refrigerator_model = "6324009";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324008";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6324007";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324006";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6324005";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_sand") {
         refrigerator_model = "6324004";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324003";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6324002";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_sand") {
         refrigerator_model = "6324001";
      }

      if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324031";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324030";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324029";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324028";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324027";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324026";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324025";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324024";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324023";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324022";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324021";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324020";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324019";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324018";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324017";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324016";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324015";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324014";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324013";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324012";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324011";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324010";
      }

      if ($("#refrigerator_LT").val() == "nm_gray" && $("#refrigerator_LB").val() == "nm_gray" && $("#refrigerator_RB").val() == "nm_gray") {
         refrigerator_model = "6334836";
      }


      if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324103";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324102";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324101";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324100";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324099";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324098";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324097";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324096";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324095";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324094";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324093";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324092";
      }

      if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324091";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324090";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324089";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324088";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324087";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324086";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324085";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324084";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324083";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324082";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324081";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324080";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324079";
      }


      if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324078";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324077";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324076";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6334838";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324075";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324074";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324073";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324072";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324071";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324070";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324069";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324068";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324067";
      }

      if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324066";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324065";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324064";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324063";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324062";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324061";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324060";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324059";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324058";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324057";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324056";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324055";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6334837";
      }
   } else {
      if ($("#refrigerator_LT").val() == "fn_botanic" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6324539";
      } else if ($("#refrigerator_LT").val() == "fn_botanic" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324540";
      } else if ($("#refrigerator_LT").val() == "fn_botanic" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6324541";
      } else if ($("#refrigerator_LT").val() == "fn_botanic" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324542";
      } else if ($("#refrigerator_LT").val() == "fn_botanic" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_sand") {
         refrigerator_model = "6324543";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324544";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_sand") {
         refrigerator_model = "6324545";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6324546";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324547";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6324548";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324549";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324550";
      } else if ($("#refrigerator_LT").val() == "fn_sand" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6324551";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324552";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_sand") {
         refrigerator_model = "6324553";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_botanic" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6324554";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324555";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_sand" && $("#refrigerator_RB").val() == "fn_stone") {
         refrigerator_model = "6324556";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_botanic") {
         refrigerator_model = "6324557";
      } else if ($("#refrigerator_LT").val() == "fn_stone" && $("#refrigerator_LB").val() == "fn_stone" && $("#refrigerator_RB").val() == "fn_sand") {
         refrigerator_model = "6324558";
      }

      if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324580";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324579";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324578";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324577";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324576";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324575";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324574";
      } else if ($("#refrigerator_LT").val() == "st_black" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324573";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324572";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324571";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324570";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324569";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324568";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324567";
      } else if ($("#refrigerator_LT").val() == "st_green" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324566";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324565";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324564";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_black" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324563";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324562";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_green" && $("#refrigerator_RB").val() == "st_silver") {
         refrigerator_model = "6324561";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_black") {
         refrigerator_model = "6324560";
      } else if ($("#refrigerator_LT").val() == "st_silver" && $("#refrigerator_LB").val() == "st_silver" && $("#refrigerator_RB").val() == "st_green") {
         refrigerator_model = "6324559";
      }


      if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324652";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324651";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324650";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324649";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324648";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324647";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324646";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324645";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324644";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324643";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324642";
      } else if ($("#refrigerator_LT").val() == "mg_mint" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324641";
      }
      if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324640";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324639";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324638";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324637";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324636";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324635";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324634";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324633";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324632";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324631";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324630";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324629";
      } else if ($("#refrigerator_LT").val() == "mg_pink" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324628";
      }

      if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324627";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324626";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324625";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324624";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324623";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324622";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324621";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324620";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324619";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324618";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324617";
      } else if ($("#refrigerator_LT").val() == "mg_silver" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324616";
      }

      if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324615";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324614";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_mint" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324613";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324612";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324611";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_pink" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324610";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324609";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324608";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_silver" && $("#refrigerator_RB").val() == "mg_beige") {
         refrigerator_model = "6324607";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_mint") {
         refrigerator_model = "6324606";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_pink") {
         refrigerator_model = "6324605";
      } else if ($("#refrigerator_LT").val() == "mg_beige" && $("#refrigerator_LB").val() == "mg_beige" && $("#refrigerator_RB").val() == "mg_silver") {
         refrigerator_model = "6324604";
      }
   }
   if (refrigerator_model == "0") {
      showShopLinkAlert();
   } else {
      var urlencode = encodeURIComponent("BestMall/Shop/Item/?key=" + refrigerator_model);
      window.open("https://m.lgbestshopmall.co.kr/lgeobs/OpenLink/1683/?redirectUrl=" + urlencode, "_blank");
      $(".layer_popup, .mask").fadeOut();
   }
}

function goshop(ord) {
   var refrigerator_model = "0";
   if (ord == "1") {

      if ($("#refrigerator_T").val() == "fn_botanic" && $("#refrigerator_M").val() == "fn_botanic" && $("#refrigerator_B").val() == "fn_stone") {
         refrigerator_model = "6324421";
      } else if ($("#refrigerator_T").val() == "fn_botanic" && $("#refrigerator_M").val() == "fn_botanic" && $("#refrigerator_B").val() == "fn_sand") {
         refrigerator_model = "6324420";
      } else if ($("#refrigerator_T").val() == "fn_botanic" && $("#refrigerator_M").val() == "fn_sand" && $("#refrigerator_B").val() == "fn_botanic") {
         refrigerator_model = "6324422";
      } else if ($("#refrigerator_T").val() == "fn_botanic" && $("#refrigerator_M").val() == "fn_sand" && $("#refrigerator_B").val() == "fn_stone") {
         refrigerator_model = "6324423";
      } else if ($("#refrigerator_T").val() == "fn_botanic" && $("#refrigerator_M").val() == "fn_stone" && $("#refrigerator_B").val() == "fn_botanic") {
         refrigerator_model = "6324424";
      } else if ($("#refrigerator_T").val() == "fn_botanic" && $("#refrigerator_M").val() == "fn_stone" && $("#refrigerator_B").val() == "fn_sand") {
         refrigerator_model = "6324425";
      } else if ($("#refrigerator_T").val() == "fn_sand" && $("#refrigerator_M").val() == "fn_botanic" && $("#refrigerator_B").val() == "fn_botanic") {
         refrigerator_model = "6324426";
      } else if ($("#refrigerator_T").val() == "fn_sand" && $("#refrigerator_M").val() == "fn_botanic" && $("#refrigerator_B").val() == "fn_sand") {
         refrigerator_model = "6324427";
      } else if ($("#refrigerator_T").val() == "fn_sand" && $("#refrigerator_M").val() == "fn_botanic" && $("#refrigerator_B").val() == "fn_stone") {
         refrigerator_model = "6324428";
      } else if ($("#refrigerator_T").val() == "fn_sand" && $("#refrigerator_M").val() == "fn_sand" && $("#refrigerator_B").val() == "fn_botanic") {
         refrigerator_model = "6324429";
      } else if ($("#refrigerator_T").val() == "fn_sand" && $("#refrigerator_M").val() == "fn_sand" && $("#refrigerator_B").val() == "fn_stone") {
         refrigerator_model = "6324430";
      } else if ($("#refrigerator_T").val() == "fn_sand" && $("#refrigerator_M").val() == "fn_stone" && $("#refrigerator_B").val() == "fn_botanic") {
         refrigerator_model = "6324431";
      } else if ($("#refrigerator_T").val() == "fn_stone" && $("#refrigerator_M").val() == "fn_stone" && $("#refrigerator_B").val() == "fn_sand") {
         refrigerator_model = "6324440";
      } else if ($("#refrigerator_T").val() == "fn_stone" && $("#refrigerator_M").val() == "fn_stone" && $("#refrigerator_B").val() == "fn_botanic") {
         refrigerator_model = "6324439";
      } else if ($("#refrigerator_T").val() == "fn_stone" && $("#refrigerator_M").val() == "fn_sand" && $("#refrigerator_B").val() == "fn_stone") {
         refrigerator_model = "6324438";
      } else if ($("#refrigerator_T").val() == "fn_stone" && $("#refrigerator_M").val() == "fn_sand" && $("#refrigerator_B").val() == "fn_botanic") {
         refrigerator_model = "6324437";
      } else if ($("#refrigerator_T").val() == "fn_stone" && $("#refrigerator_M").val() == "fn_botanic" && $("#refrigerator_B").val() == "fn_stone") {
         refrigerator_model = "6324436";
      } else if ($("#refrigerator_T").val() == "fn_stone" && $("#refrigerator_M").val() == "fn_botanic" && $("#refrigerator_B").val() == "fn_sand") {
         refrigerator_model = "6324435";
      } else if ($("#refrigerator_T").val() == "fn_stone" && $("#refrigerator_M").val() == "fn_botanic" && $("#refrigerator_B").val() == "fn_botanic") {
         refrigerator_model = "6324434";
      } else if ($("#refrigerator_T").val() == "fn_sand" && $("#refrigerator_M").val() == "fn_stone" && $("#refrigerator_B").val() == "fn_stone") {
         refrigerator_model = "6324433";
      } else if ($("#refrigerator_T").val() == "fn_sand" && $("#refrigerator_M").val() == "fn_stone" && $("#refrigerator_B").val() == "fn_sand") {
         refrigerator_model = "6324432";
      }

      if ($("#refrigerator_T").val() == "st_black" && $("#refrigerator_M").val() == "st_black" && $("#refrigerator_B").val() == "st_green") {
         refrigerator_model = "6324461";
      } else if ($("#refrigerator_T").val() == "st_black" && $("#refrigerator_M").val() == "st_black" && $("#refrigerator_B").val() == "st_silver") {
         refrigerator_model = "6324460";
      } else if ($("#refrigerator_T").val() == "st_black" && $("#refrigerator_M").val() == "st_green" && $("#refrigerator_B").val() == "st_black") {
         refrigerator_model = "6324459";
      } else if ($("#refrigerator_T").val() == "st_black" && $("#refrigerator_M").val() == "st_green" && $("#refrigerator_B").val() == "st_green") {
         refrigerator_model = "6324458";
      } else if ($("#refrigerator_T").val() == "st_black" && $("#refrigerator_M").val() == "st_green" && $("#refrigerator_B").val() == "st_silver") {
         refrigerator_model = "6324457";
      } else if ($("#refrigerator_T").val() == "st_black" && $("#refrigerator_M").val() == "st_silver" && $("#refrigerator_B").val() == "st_black") {
         refrigerator_model = "6324456";
      } else if ($("#refrigerator_T").val() == "st_black" && $("#refrigerator_M").val() == "st_silver" && $("#refrigerator_B").val() == "st_green") {
         refrigerator_model = "6324455";
      } else if ($("#refrigerator_T").val() == "st_green" && $("#refrigerator_M").val() == "st_black" && $("#refrigerator_B").val() == "st_black") {
         refrigerator_model = "6324454";
      } else if ($("#refrigerator_T").val() == "st_green" && $("#refrigerator_M").val() == "st_black" && $("#refrigerator_B").val() == "st_green") {
         refrigerator_model = "6324453";
      } else if ($("#refrigerator_T").val() == "st_green" && $("#refrigerator_M").val() == "st_black" && $("#refrigerator_B").val() == "st_silver") {
         refrigerator_model = "6324452";
      } else if ($("#refrigerator_T").val() == "st_green" && $("#refrigerator_M").val() == "st_green" && $("#refrigerator_B").val() == "st_black") {
         refrigerator_model = "6324451";
      } else if ($("#refrigerator_T").val() == "st_green" && $("#refrigerator_M").val() == "st_green" && $("#refrigerator_B").val() == "st_silver") {
         refrigerator_model = "6324450";
      } else if ($("#refrigerator_T").val() == "st_green" && $("#refrigerator_M").val() == "st_silver" && $("#refrigerator_B").val() == "st_black") {
         refrigerator_model = "6324449";
      } else if ($("#refrigerator_T").val() == "st_green" && $("#refrigerator_M").val() == "st_silver" && $("#refrigerator_B").val() == "st_green") {
         refrigerator_model = "6324448";
      } else if ($("#refrigerator_T").val() == "st_silver" && $("#refrigerator_M").val() == "st_black" && $("#refrigerator_B").val() == "st_black") {
         refrigerator_model = "6324447";
      } else if ($("#refrigerator_T").val() == "st_silver" && $("#refrigerator_M").val() == "st_black" && $("#refrigerator_B").val() == "st_green") {
         refrigerator_model = "6324446";
      } else if ($("#refrigerator_T").val() == "st_silver" && $("#refrigerator_M").val() == "st_black" && $("#refrigerator_B").val() == "st_silver") {
         refrigerator_model = "6324445";
      } else if ($("#refrigerator_T").val() == "st_silver" && $("#refrigerator_M").val() == "st_green" && $("#refrigerator_B").val() == "st_black") {
         refrigerator_model = "6324444";
      } else if ($("#refrigerator_T").val() == "st_silver" && $("#refrigerator_M").val() == "st_green" && $("#refrigerator_B").val() == "st_silver") {
         refrigerator_model = "6324443";
      } else if ($("#refrigerator_T").val() == "st_silver" && $("#refrigerator_M").val() == "st_silver" && $("#refrigerator_B").val() == "st_black") {
      } else if ($("#refrigerator_T").val() == "st_silver" && $("#refrigerator_M").val() == "st_silver" && $("#refrigerator_B").val() == "st_black") {
         refrigerator_model = "6324442";
      } else if ($("#refrigerator_T").val() == "st_silver" && $("#refrigerator_M").val() == "st_silver" && $("#refrigerator_B").val() == "st_green") {
         refrigerator_model = "6324441";
      }



      if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324534";
      } else if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_silver") {
         refrigerator_model = "6324533";
      } else if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_beige") {
         refrigerator_model = "6324532";
      } else if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324531";
      } else if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324530";
      } else if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_silver") {
         refrigerator_model = "6324529";
      } else if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_beige") {
         refrigerator_model = "6324528";
      } else if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_silver" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324527";
      } else if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_silver" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324526";
      } else if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_silver" && $("#refrigerator_B").val() == "mg_beige") {
         refrigerator_model = "6324525";
      } else if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_beige" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324524";
      } else if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_beige" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324523";
      } else if ($("#refrigerator_T").val() == "mg_mint" && $("#refrigerator_M").val() == "mg_beige" && $("#refrigerator_B").val() == "mg_silver") {
         refrigerator_model = "6324522";
      }

      if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324521";
      } else if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324520";
      } else if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_silver") {
         refrigerator_model = "6324519";
      } else if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_beige") {
         refrigerator_model = "6324518";
      } else if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324517";
      } else if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_silver") {
         refrigerator_model = "6324516";
      } else if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_beige") {
         refrigerator_model = "6324515";
      } else if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_silver" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324514";
      } else if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_silver" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324513";
      } else if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_silver" && $("#refrigerator_B").val() == "mg_beige") {
         refrigerator_model = "6324512";
      } else if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_beige" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324511";
      } else if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_beige" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324510";
      } else if ($("#refrigerator_T").val() == "mg_pink" && $("#refrigerator_M").val() == "mg_beige" && $("#refrigerator_B").val() == "mg_silver") {
         refrigerator_model = "6324509";
      }
      if ($("#refrigerator_T").val() == "mg_silver" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324508";
      } else if ($("#refrigerator_T").val() == "mg_silver" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_silver") {
         refrigerator_model = "6324507";
      } else if ($("#refrigerator_T").val() == "mg_silver" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_beige") {
         refrigerator_model = "6324506";
      } else if ($("#refrigerator_T").val() == "mg_silver" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324505";
      } else if ($("#refrigerator_T").val() == "mg_silver" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_silver") {
         refrigerator_model = "6324504";
      } else if ($("#refrigerator_T").val() == "mg_silver" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_beige") {
         refrigerator_model = "6324503";
      } else if ($("#refrigerator_T").val() == "mg_silver" && $("#refrigerator_M").val() == "mg_silver" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324502";
      } else if ($("#refrigerator_T").val() == "mg_silver" && $("#refrigerator_M").val() == "mg_silver" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324501";
      } else if ($("#refrigerator_T").val() == "mg_silver" && $("#refrigerator_M").val() == "mg_silver" && $("#refrigerator_B").val() == "mg_beige") {
         refrigerator_model = "6324500";
      } else if ($("#refrigerator_T").val() == "mg_silver" && $("#refrigerator_M").val() == "mg_beige" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324499";
      } else if ($("#refrigerator_T").val() == "mg_silver" && $("#refrigerator_M").val() == "mg_beige" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324498";
      } else if ($("#refrigerator_T").val() == "mg_silver" && $("#refrigerator_M").val() == "mg_beige" && $("#refrigerator_B").val() == "mg_silver") {
         refrigerator_model = "6324497";
      }

      if ($("#refrigerator_T").val() == "mg_beige" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324496";
      } else if ($("#refrigerator_T").val() == "mg_beige" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_silver") {
         refrigerator_model = "6324495";
      } else if ($("#refrigerator_T").val() == "mg_beige" && $("#refrigerator_M").val() == "mg_mint" && $("#refrigerator_B").val() == "mg_beige") {
         refrigerator_model = "6324494";
      } else if ($("#refrigerator_T").val() == "mg_beige" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324493";
      } else if ($("#refrigerator_T").val() == "mg_beige" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_silver") {
         refrigerator_model = "6324492";
      } else if ($("#refrigerator_T").val() == "mg_beige" && $("#refrigerator_M").val() == "mg_pink" && $("#refrigerator_B").val() == "mg_beige") {
         refrigerator_model = "6324491";
      } else if ($("#refrigerator_T").val() == "mg_beige" && $("#refrigerator_M").val() == "mg_silver" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324490";
      } else if ($("#refrigerator_T").val() == "mg_beige" && $("#refrigerator_M").val() == "mg_silver" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324489";
      } else if ($("#refrigerator_T").val() == "mg_beige" && $("#refrigerator_M").val() == "mg_silver" && $("#refrigerator_B").val() == "mg_beige") {
         refrigerator_model = "6324488";
      } else if ($("#refrigerator_T").val() == "mg_beige" && $("#refrigerator_M").val() == "mg_beige" && $("#refrigerator_B").val() == "mg_mint") {
         refrigerator_model = "6324487";
      } else if ($("#refrigerator_T").val() == "mg_beige" && $("#refrigerator_M").val() == "mg_beige" && $("#refrigerator_B").val() == "mg_pink") {
         refrigerator_model = "6324486";
      } else if ($("#refrigerator_T").val() == "mg_beige" && $("#refrigerator_M").val() == "mg_beige" && $("#refrigerator_B").val() == "mg_silver") {
         refrigerator_model = "6324485";
      }
   } else if (ord == "3") {
      if ($("#dish").val() == "st_green") {
         refrigerator_model = "5565762";
      } else if ($("#dish").val() == "mg_beige") {
         refrigerator_model = "5565761";
      } else if ($("#dish").val() == "st_silver") {
         refrigerator_model = "6334839";
      }
   } else if (ord == "4") {
      if ($("#oven").val() == "st_green") {
         refrigerator_model = "6222053";
      } else if ($("#oven").val() == "mg_beige") {
         refrigerator_model = "5565763";
      } else if ($("#oven").val() == "st_silver") {
         refrigerator_model = "6222054";
      }
   } else if (ord == "5") {
      refrigerator_model = "0";
   } else if (ord == "6") {
      if ($("#wash_T").val() == "nm_beige" && $("#wash_B").val() == "nm_beige") {
         refrigerator_model = "5782229";
      } else if ($("#wash_T").val() == "nm_beige" && $("#wash_B").val() == "nm_pink") {
         refrigerator_model = "5782226";
      } else if ($("#wash_T").val() == "nm_beige" && $("#wash_B").val() == "nm_green") {
         refrigerator_model = "5782216";
      } else if ($("#wash_T").val() == "nm_pink" && $("#wash_B").val() == "nm_pink") {
         refrigerator_model = "5782239";
      } else if ($("#wash_T").val() == "nm_pink" && $("#wash_B").val() == "nm_beige") {
         refrigerator_model = "5782220";
      } else if ($("#wash_T").val() == "nm_pink" && $("#wash_B").val() == "nm_green") {
         refrigerator_model = "5782242";
      } else if ($("#wash_T").val() == "nm_green" && $("#wash_B").val() == "nm_green") {
         refrigerator_model = "5782223";
      } else if ($("#wash_T").val() == "nm_green" && $("#wash_B").val() == "nm_beige") {
         refrigerator_model = "5782232";
      } else if ($("#wash_T").val() == "nm_green" && $("#wash_B").val() == "nm_pink") {
         refrigerator_model = "5782235";
      }
   } else if (ord == "8") {
      if ($("#styler").val() == "mg_green") {
         refrigerator_model = "5565764";
      } else if ($("#styler").val() == "mg_beige") {
         refrigerator_model = "5565765";
      }
   } else if (ord == "9") {
      refrigerator_model = "6427006";
   } else if (ord == "7") {
      if ($("#clean").val() == "calm_green") {
         refrigerator_model = "6463221";
      } else if ($("#clean").val() == "calm_beige") {
         refrigerator_model = "6463218";
      }
   }

   //1-김치, 3-식기, 4-광파, 5-정수기, 6-워시타워, 7-청소기,8-스타일러
   if (refrigerator_model == "0") {
      showShopLinkAlert();
   } else {
      var urlencode = encodeURIComponent("BestMall/Shop/Item/?key=" + refrigerator_model);
      window.open("https://m.lgbestshopmall.co.kr/lgeobs/OpenLink/1683/?redirectUrl=" + urlencode, "_blank");
      $(".layer_popup, .mask").fadeOut();
   }
}
function go_shop2(ord) {
   $(".refrigerator_convertible_popup").fadeOut();
   var refrigerator_model = "0";
   if (ord == "1") {
      if ($("#refrigerator_convertible_L").val() == "st_silver") {
         refrigerator_model = "6216088";
      } else if ($("#refrigerator_convertible_L").val() == "st_green") {
         refrigerator_model = "5565777";
      } else if ($("#refrigerator_convertible_L").val() == "st_black") {
         refrigerator_model = "6216109";
      } else if ($("#refrigerator_convertible_L").val() == "mg_beige") {
         refrigerator_model = "6216078";
      } else if ($("#refrigerator_convertible_L").val() == "mg_silver") {
         refrigerator_model = "6216076";
      } else if ($("#refrigerator_convertible_L").val() == "mg_pink") {
         refrigerator_model = "6216077";
      } else if ($("#refrigerator_convertible_L").val() == "mg_mint") {
         refrigerator_model = "5878436";
      }
   } else if (ord == "2") {
      if ($("#refrigerator_convertible_M").val() == "st_silver") {
         refrigerator_model = "5565774";
      } else if ($("#refrigerator_convertible_M").val() == "st_black") {
         refrigerator_model = "6216091";//
      } else if ($("#refrigerator_convertible_M").val() == "mg_beige") {
         refrigerator_model = "5672974";
      } else if ($("#refrigerator_convertible_M").val() == "mg_silver") {
         refrigerator_model = "6216106";
      } else if ($("#refrigerator_convertible_M").val() == "mg_pink") {
         refrigerator_model = "6216112";
      } else if ($("#refrigerator_convertible_M").val() == "mg_mint") {
         refrigerator_model = "6216094";
      } else if ($("#refrigerator_convertible_M").val() == "st_green") {
         refrigerator_model = "6335020";
      }
   } else if (ord == "3") {
      if ($("#refrigerator_convertible_R").val() == "st_silver") {
         refrigerator_model = "5565771";
      } else if ($("#refrigerator_convertible_R").val() == "st_green") {
         refrigerator_model = "6216103";
      } else if ($("#refrigerator_convertible_R").val() == "st_black") {
         refrigerator_model = "6216085";
      } else if ($("#refrigerator_convertible_R").val() == "mg_beige") {
         refrigerator_model = "6216075";
      } else if ($("#refrigerator_convertible_R").val() == "mg_silver") {
         refrigerator_model = "5878435";
      } else if ($("#refrigerator_convertible_R").val() == "mg_pink") {
         refrigerator_model = "6216097";
      } else if ($("#refrigerator_convertible_R").val() == "mg_mint") {
         refrigerator_model = "6216100";
      }
   }
   if (refrigerator_model == "0") {
      showShopLinkAlert();
   } else {
      var urlencode = encodeURIComponent("BestMall/Shop/Item/?key=" + refrigerator_model);
      window.open("https://m.lgbestshopmall.co.kr/lgeobs/OpenLink/1683/?redirectUrl=" + urlencode, "_blank");
      //$(".layer_popup, .mask").fadeOut();
   }
}


