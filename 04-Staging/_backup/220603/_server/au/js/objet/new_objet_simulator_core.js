
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

			/* @2022-05-27 Learn more 버튼 삭제 (s) */
			// popCont += '	<p class="direct_txt">Learn more</p>';
			/* @2022-05-27 Learn more 버튼 삭제 (e) */

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


			/* @2022-05-27 Learn more 버튼 삭제 (s) */
			// popCont += '	<p class="direct_txt">Learn more</p>';
			/* @2022-05-27 Learn more 버튼 삭제 (e) */

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

			/* @2022-05-29 AR 링크 수정 (s) */
			let arLink = 'https://lgarexperience.com/ha/objet/M870/stsgreensilver';
			/* @2022-05-29 AR 링크 수정 (e) */

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
							_selectLocation = "top left";
							// _selectLocation = "top";
							_selectCode = userSelectData.refrigerator_LT.modelCode;
							_selectColorInfo = userSelectData.refrigerator_LT.modelColor;
							_selectColorInfoArr = _selectColorInfo.split('_');
							(_selectColorInfoArr[0] == "st") ? _selectType = "stainless" : _selectType = "glass";
							(_selectColorInfoArr[1] == "black") ? _selectColor = "matte Black" : _selectColor = _selectColorInfoArr[1];
						}
						if (key === "refrigerator_LB") {
							_selectLocation = "bottom left";
							// _selectLocation = "bottom";
							_selectCode = userSelectData.refrigerator_LB.modelCode;
							_selectColorInfo = userSelectData.refrigerator_LB.modelColor;
							_selectColorInfoArr = _selectColorInfo.split('_');
							(_selectColorInfoArr[0] == "st") ? _selectType = "stainless" : _selectType = "glass";
							(_selectColorInfoArr[1] == "black") ? _selectColor = "matte Black" : _selectColor = _selectColorInfoArr[1];
						}
						if (key === "refrigerator_RB") {
							_selectLocation = "bottom right";
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

				/* @2022-05-27 본품 Code 추가 (s) */
				let defaultData = [];
				defaultData.push("{ data: { sku: " + JSON.stringify(productModelId) + ", qty: 1 }, zipcode: \"2000\" }")
				/* @2022-05-27 본품 Code 추가 (e) */
				for (let i = 0; i < cartDataArr_refrigerator.length; i++) {
					defaultData.push("{ data: { sku: "
						+ JSON.stringify(cartDataArr_refrigerator[i].data.sku) + ", qty: 1 }, zipcode: \"2000\", lg_custom_options: { objet_sales_options: "
						+ JSON.stringify(cartDataArr_refrigerator[i].lg_custom_options.objet_sales_options) + ", parent_sku: "
						+ JSON.stringify(cartDataArr_refrigerator[i].lg_custom_options.parent_sku) + " } }")
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

				/* @2022-05-27 본품 Code 추가 (s) */
				mutationDataL = JSON.stringify({
					"query": "mutation { addObjetSalesToCart( input: { cartItems: [ { data: { sku: " + JSON.stringify(productModelId_L) + ", qty: 1 }, zipcode: \"2000\" }, { data: { sku: "
						+ JSON.stringify(cartDataArr_refrigerator_convertible_L[0].data.sku) + ", qty: 1 }, zipcode: \"2000\" lg_custom_options: { objet_sales_options: "
						+ JSON.stringify(cartDataArr_refrigerator_convertible_L[0].lg_custom_options.objet_sales_options)
						+ " parent_sku:" + JSON.stringify(cartDataArr_refrigerator_convertible_L[0].lg_custom_options.parent_sku) + " } }] }) { redirectUrl cart { items { product { sku } qty } } } }",
					"variables": null,
					"operationName": null
				})
				/* @2022-05-27 본품 Code 추가 (e) */
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

				/* @2022-05-27 본품 Code 추가 (s) */
				mutationDataM = JSON.stringify({
					"query": "mutation { addObjetSalesToCart( input: { cartItems: [  { data: { sku: " + JSON.stringify(productModelId_M) + ", qty: 1 }, zipcode: \"2000\" }, { data: { sku: "
						+ JSON.stringify(cartDataArr_refrigerator_convertible_M[0].data.sku) + ", qty: 1 }, zipcode: \"2000\" lg_custom_options: { objet_sales_options: "
						+ JSON.stringify(cartDataArr_refrigerator_convertible_M[0].lg_custom_options.objet_sales_options)
						+ " parent_sku:" + JSON.stringify(cartDataArr_refrigerator_convertible_M[0].lg_custom_options.parent_sku) + " } }] }) { redirectUrl cart { items { product { sku } qty } } } }",
					"variables": null,
					"operationName": null
				})
				/* @2022-05-27 본품 Code 추가 (e) */
			}
		}
	}
	TweenMax.to($(".loading-circle"), .2 , { display:"block", opacity:1 })
	if ($objetId == "refrigerator") {

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
		}).done(function (data, textStatus, xhr) {
			TweenMax.to($(".loading-circle"), .2 , { display:"none", opacity:0 })
			if ( data.errors !== undefined ) {
				$(".inquiry_modal").addClass("show"); //문의하기 팝업
			} else {
				$(".basket_modal").addClass("show"); //장바구니 팝업 
			}
		}).fail(function (data, textStatus, errorThrown) {
			TweenMax.to($(".loading-circle"), .2 , { display:"none", opacity:0 })
			$(".inquiry_modal").addClass("show"); //문의하기 팝업
		});
	}

	if ($objetId == "refrigerator_convertible_L") {
		$.ajax({
			url: 'https://wwwstg.lg.com/au/shop/graphql',
			method: "POST",
			timeout: 0,
			headers: {
				"Store": "au",
				"Content-Type": "application/json",
				// "Cookie": "LG5_CartID=M7ICVhGLMnnrtId3qnLkyV0mKgvuav9y;PHPSESSID=c7349369611ebe937a8f4eff7ae598d9;private_content_version=acdcf890c5504abcb8766f67a98aa381"
			},
			data: mutationDataL
		}).done(function (data, textStatus, xhr) {
			TweenMax.to($(".loading-circle"), .2 , { display:"none", opacity:0 })
			if ( data.errors !== undefined ) {
				$(".inquiry_modal").addClass("show"); //문의하기 팝업
			} else {
				$(".basket_modal").addClass("show"); //장바구니 팝업 
			}
		}).fail(function (data, textStatus, errorThrown) {
			TweenMax.to($(".loading-circle"), .2 , { display:"none", opacity:0 })
			$(".inquiry_modal").addClass("show"); //문의하기 팝업
		});
	}

	if ($objetId == "refrigerator_convertible_M") {

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
		}).done(function (data, textStatus, xhr) {
			TweenMax.to($(".loading-circle"), .2 , { display:"none", opacity:0 })
			if ( data.errors !== undefined ) {
				$(".inquiry_modal").addClass("show"); //문의하기 팝업
			} else {
				$(".basket_modal").addClass("show"); //장바구니 팝업 
			}
		}).fail(function (data, textStatus, errorThrown) {
			TweenMax.to($(".loading-circle"), .2 , { display:"none", opacity:0 })
			$(".inquiry_modal").addClass("show"); //문의하기 팝업
		});
	}	
});

// 장바구니 팝업 삭제
$(".btn-secondary").on("click", function () {
	$(".basket_modal").removeClass("show");
});
// 문의하기 팝업 삭제
$(".btn-close").on("click", function () {
	$(".inquiry_modal").removeClass("show");
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
	 TweenMax.to($(".loading-circle"), .2 , { display:"block", opacity:1 });
	if ($objetId == "refrigerator") {
		let mutationDataR = JSON.stringify({ "query": "mutation { addObjetSalesToCart( input: { cartItems: [ { data: { sku: \"MD07545595\", qty: 1 }, zipcode: \"2000\"}] }) {redirectUrl cart { items { product { sku } qty } } } }", "variables": null, "operationName": null })
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
		}).done(function (data, textStatus, xhr) {
			TweenMax.to($(".loading-circle"), .2 , { display:"none", opacity:0 })
			if ( data.errors !== undefined ) {
				$(".inquiry_modal").addClass("show"); //문의하기 팝업
			} else {
				$(".basket_modal").addClass("show"); //장바구니 팝업 
			}
		}).fail(function (data, textStatus, errorThrown) {
			TweenMax.to($(".loading-circle"), .2 , { display:"none", opacity:0 })
			$(".inquiry_modal").addClass("show"); //문의하기 팝업
		});
	}

	if ($objetId == "refrigerator_convertible_L") {
		let mutationDataL = JSON.stringify({ "query": "mutation { addObjetSalesToCart( input: { cartItems: [{ data :{ sku : \"MD07553654\" , qty :1}, zipcode :\"2000\"}] }) {redirectUrl cart { items { product { sku } qty } } } }", "variables": null, "operationName": null })
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
		}).done(function (data, textStatus, xhr) {
			TweenMax.to($(".loading-circle"), .2 , { display:"none", opacity:0 })
			if ( data.errors !== undefined ) {
				$(".inquiry_modal").addClass("show"); //문의하기 팝업
			} else {
				$(".basket_modal").addClass("show"); //장바구니 팝업 
			}
		}).fail(function (data, textStatus, errorThrown) {
			TweenMax.to($(".loading-circle"), .2 , { display:"none", opacity:0 })
			$(".inquiry_modal").addClass("show"); //문의하기 팝업
		});
	}

	if ($objetId == "refrigerator_convertible_M") {
		let mutationDataM = JSON.stringify({ "query": "mutation { addObjetSalesToCart( input: { cartItems: [{ data :{ sku : \"MD07553636\" , qty :1}, zipcode :\"2000\"}] }) {redirectUrl cart { items { product { sku } qty } } } }", "variables": null, "operationName": null })
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
		}).done(function (data, textStatus, xhr) {
			TweenMax.to($(".loading-circle"), .2 , { display:"none", opacity:0 })
			if ( data.errors !== undefined ) {
				$(".inquiry_modal").addClass("show"); //문의하기 팝업
			} else {
				$(".basket_modal").addClass("show"); //장바구니 팝업 
			}
		}).fail(function (data, textStatus, errorThrown) {
			TweenMax.to($(".loading-circle"), .2 , { display:"none", opacity:0 })
			$(".inquiry_modal").addClass("show"); //문의하기 팝업
		});
	}	
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


/**
 * 2020/09/08
 * author : 박춘기
 * b.marino
 * marino@bymarino.com
 */
 var jsa_bgindex = 0;
 var go_shop_model = "";
 
 // 장바구니 API 데이터 담을 변수
 var userSelectedModelData = [];
 
 (function (objSimulator) {
	 'use strict';
 
	 typeof define === 'function' && define.amd ?
		 define("objSimulator", [], function () {
			 return objSimulator();
		 })
		 : window["objSimulator"] = objSimulator();
 
 })(function () {
	 'use strict';
 
	 var Simulator = function () { } // objSimulator
	 var _self;
	 var bgSliderImages = {},
		 bgSliderObject = {};
 
	 var backgroundImageURL = '/au/images/objet/simulator/bg/', //배경 이미지 저장경로
		 objectImageURL = '/au/images/objet/simulator/'; //오브제 이미지 저장경로
 
	 //stage 사전 정의 부
	 var stageSetting = {
		 width: 7680,
		 height: 1080,
		 configJsonURL: '../content/data.json',
		 backgroundSliderEl: {
			 targetElementSelector: (typeof document.querySelector('[data-simulator-background-slider]') !== 'undefined') ?
				 document.querySelector('[data-simulator-background-slider]') : null,
			 targetImagesSelector: '[data-simulator-background-image]',
			 totalLength: 0,
		 },
		 backgroundImageURL: backgroundImageURL,
		 container: 'simulator-wrapper',
		 parentContainer: '#stage-parent',
		 objectArea: (typeof document.querySelector('[data-simulator-object-area]') !== 'undefined') ?
			 document.querySelector('[data-simulator-object-area]') : null,
		 simulatorSidebar: (typeof document.querySelector('[data-simulator-sidebar]') !== 'undefined') ?
			 document.querySelector('[data-simulator-sidebar]') : null,
		 appliacncesListArea: (typeof document.querySelector('[data-appliances-list]') !== 'undefined') ?
			 document.querySelector('[data-appliances-list]') : null,
		 objetSelectedListArea: (typeof document.querySelector('[data-objet-selected-list]') !== 'undefined') ?
			 document.querySelector('[data-objet-selected-list]') : null,
		 isIE11: !!window.MSInputMethodContext && !!document.documentMode,
		 totalObjet: 0,
		 totalSelection: 0
	 };
 
	 var configData = { //환경 설정값 저장, JSON 정상 로딩 시 override 됨
		 backgroundDefault: 'modern',
		 backgroundImages: [
			 {
				 name: 'modern',
				 images: ['bg_modern_01.png', /*'bg_modern_02.png', 'bg_modern_03.png'*//*, 'bg_modern_04.jpg'*/]
			 },
			 {
				 name: 'nature',
				 images: ['bg_nature_01.png', /*'bg_nature_02.png', 'bg_nature_03.png'*//*, 'bg_nature_04.jpg'*/]
			 },
			 {
				 name: 'nordic',
				 images: ['bg_nordic_01.png', /*'bg_nordic_02.png', 'bg_nordic_03.png'*//*, 'bg_nordic_04.jpg'*/]
			 }
		 ],
		 object: [
			 {
				 id: 'refrigerator',
				 name: 'InstaViewTM',
				 icon: { default: 'Thumb_01.png', focus: 'Thumb_01_selected.png' },
				 offset: { top: 328, left: 295, },
				 size: { width: 244, height: 492, },
				 selectedImage: 'appliances/rf/rf_selected.png',
				 slideIndex: 0,
				 shop_link: 'https://lgobjetcollection.co.kr/',
				 spotButton: {
					 offset: { top: 12, left: 12, },
				 },
				 price: {
					 product: "5,999 AUD",
					 panel: "299 AUD"
				 },
				 selections: [ // 가전 별 선택 가능한 영역
					 {
						 id: 'refrigerator_LT',
						 offset: { top: 328, left: 295, },
						 size: { width: 121, height: 266, },
						 placeholder: 'appliances/rf/rf_door01_nomal.png',
						 defaultImage: 'appliances/rf/rf_door01_nomal.png', //첫 오브제 기기 init 시 보여줄 selection 이미지
						 productInfo: { modelId: 'MD07545595', modelCode: 'MF-B664.AGERGAP' }, //장바구니 API - 제품모델명 추가 (Surface 컬러별 판넬 모델명 추가)
						 Surface: [
							 { colorCode: 'fn_botanic', filename: 'appliances/rf/rf_door01_01fn_botanic.png' },
							 { colorCode: 'fn_sand', filename: 'appliances/rf/rf_door01_01fn_sand.png' },
							 { colorCode: 'fn_stone', filename: 'appliances/rf/rf_door01_01fn_stone.png' },
							 { colorCode: 'st_black', filename: 'appliances/rf/rf_door01_02st_black.png', modelId: 'MD07553647', modelCode: 'AGF30133401' },
							 { colorCode: 'st_silver', filename: 'appliances/rf/rf_door01_02st_silver.png', modelId: 'MD07553651', modelCode: 'AGF30133468' },
							 { colorCode: 'st_green', filename: 'appliances/rf/rf_door01_02st_green.png', modelId: 'MD07553644', modelCode: 'AGF30133461' },
							 { colorCode: 'mg_beige', filename: 'appliances/rf/rf_door01_03mg_beige.png', modelId: 'MD07553575', modelCode: 'AGF30133424' },
							 { colorCode: 'mg_pink', filename: 'appliances/rf/rf_door01_03mg_pink.png', modelId: 'MD07553583', modelCode: 'AGF30133435' },
							 { colorCode: 'mg_mint', filename: 'appliances/rf/rf_door01_03mg_mint.png', modelId: 'MD07553578', modelCode: 'AGF30133441' },
							 { colorCode: 'mg_silver', filename: 'appliances/rf/rf_door01_03mg_silver.png', modelId: 'MD07553586', modelCode: 'AGF30133402' },
							 { colorCode: 'nm_gray', filename: 'appliances/rf/rf_door01_04nm_gray.png' },
							 { colorCode: 'nm_black', filename: 'appliances/rf/rf_door01_04nm_black.png' },
							 { colorCode: 'nm_white', filename: 'appliances/rf/rf_door01_04nm_white.png' },
						 ],
					 },
					 {
						 id: 'refrigerator_LB',
						 offset: { top: 607, left: 295, },
						 size: { width: 121, height: 208, },
						 placeholder: 'appliances/rf/rf_door02_nomal.png',
						 defaultImage: 'appliances/rf/rf_door02_nomal.png',
						 productInfo: { modelId: 'MD07545595', modelCode: 'MF-B664.AGERGAP' }, //장바구니 API - 제품모델명 추가 (Surface 컬러별 판넬 모델명 추가)
						 Surface: [
							 { colorCode: 'fn_botanic', filename: 'appliances/rf/rf_door02_01fn_botanic.png' },
							 { colorCode: 'fn_sand', filename: 'appliances/rf/rf_door02_01fn_sand.png' },
							 { colorCode: 'fn_stone', filename: 'appliances/rf/rf_door02_01fn_stone.png' },
							 { colorCode: 'st_black', filename: 'appliances/rf/rf_door02_02st_black.png', modelId: 'MD07553646', modelCode: 'AGF30133403' },
							 { colorCode: 'st_silver', filename: 'appliances/rf/rf_door02_02st_silver.png', modelId: 'MD07553649', modelCode: 'AGF30133469' },
							 { colorCode: 'st_green', filename: 'appliances/rf/rf_door02_02st_green.png', modelId: 'MD07553635', modelCode: 'AGF30133462' },
							 { colorCode: 'mg_beige', filename: 'appliances/rf/rf_door02_03mg_beige.png', modelId: 'MD07553574', modelCode: 'AGF30133425' },
							 { colorCode: 'mg_pink', filename: 'appliances/rf/rf_door02_03mg_pink.png', modelId: 'MD07553580', modelCode: 'AGF30133436' },
							 { colorCode: 'mg_mint', filename: 'appliances/rf/rf_door02_03mg_mint.png', modelId: 'MD07553577', modelCode: 'AGF30133404' },
							 { colorCode: 'mg_silver', filename: 'appliances/rf/rf_door02_03mg_silver.png', modelId: 'MD07553584', modelCode: 'AGF30133429' },
							 { colorCode: 'nm_gray', filename: 'appliances/rf/rf_door02_04nm_gray.png' },
							 { colorCode: 'nm_black', filename: 'appliances/rf/rf_door02_04nm_black.png' },
							 { colorCode: 'nm_white', filename: 'appliances/rf/rf_door02_04nm_white.png' },
						 ],
					 },
					 {
						 id: 'refrigerator_RB',
						 offset: { top: 607, left: 418, },
						 size: { width: 121, height: 208, },
						 placeholder: 'appliances/rf/rf_door03_nomal.png',
						 defaultImage: 'appliances/rf/rf_door03_nomal.png',
						 productInfo: { modelId: 'MD07545595', modelCode: 'MF-B664.AGERGAP' }, //장바구니 API - 제품모델명 추가 (Surface 컬러별 판넬 모델명 추가)
						 Surface: [
							 { colorCode: 'fn_botanic', filename: 'appliances/rf/rf_door03_01fn_botanic.png' },
							 { colorCode: 'fn_sand', filename: 'appliances/rf/rf_door03_01fn_sand.png' },
							 { colorCode: 'fn_stone', filename: 'appliances/rf/rf_door03_01fn_stone.png' },
							 { colorCode: 'st_black', filename: 'appliances/rf/rf_door03_02st_black.png', modelId: 'MD07553646', modelCode: 'AGF30133403' },
							 { colorCode: 'st_silver', filename: 'appliances/rf/rf_door03_02st_silver.png', modelId: 'MD07553649', modelCode: 'AGF30133469' },
							 { colorCode: 'st_green', filename: 'appliances/rf/rf_door03_02st_green.png', modelId: 'MD07553635', modelCode: 'AGF30133462' },
							 { colorCode: 'mg_beige', filename: 'appliances/rf/rf_door03_03mg_beige.png', modelId: 'MD07553574', modelCode: 'AGF30133425' },
							 { colorCode: 'mg_pink', filename: 'appliances/rf/rf_door03_03mg_pink.png', modelId: 'MD07553580', modelCode: 'AGF30133436' },
							 { colorCode: 'mg_mint', filename: 'appliances/rf/rf_door03_03mg_mint.png', modelId: 'MD07553577', modelCode: 'AGF30133404' },
							 { colorCode: 'mg_silver', filename: 'appliances/rf/rf_door03_03mg_silver.png', modelId: 'MD07553584', modelCode: 'AGF30133429' },
							 { colorCode: 'nm_gray', filename: 'appliances/rf/rf_door03_04nm_gray.png' },
							 { colorCode: 'nm_black', filename: 'appliances/rf/rf_door03_04nm_black.png' },
							 { colorCode: 'nm_white', filename: 'appliances/rf/rf_door03_04nm_white.png' },
						 ],
					 },
				 ],
				 supportedSurface: [   //지원 가능한 색상 정보, sidebar 에서 활용
					 /*{ name : 'FENIX',
							colors : [
								  { name : '페닉스<br />보타닉', colorChip : 'color_01fn_botanic.png', colorCode : 'fn_botanic'},
								  { name : '페닉스<br />샌드', colorChip : 'color_01fn_sand.png', colorCode : 'fn_sand'},
								  { name : '페닉스<br />스톤', colorChip : 'color_01fn_stone.png', colorCode : 'fn_stone'},
							],
					 },*/
					 //@2022-05-29 재질 네임 삭제 (s)
					 {
						 name: 'Stainless Steel',
						 colors: [
							 { name: 'Matte Black', colorChip: 'color_02st_black.png', colorCode: 'st_black' },
							 { name: 'Silver', colorChip: 'color_02st_silver.png', colorCode: 'st_silver' },
							 { name: 'Green', colorChip: 'color_02st_green.png', colorCode: 'st_green' },
						 ],
						 price: '$299', //판넬가격 표기
					 },
					 {
						 name: 'Mist Glass',
						 colors: [
							 { name: 'Beige', colorChip: 'color_03mg_beige.png', colorCode: 'mg_beige' },
							 { name: 'Pink', colorChip: 'color_03mg_pink.png', colorCode: 'mg_pink' },
							 { name: 'Mint', colorChip: 'color_03mg_mint.png', colorCode: 'mg_mint' },
							 { name: 'Silver', colorChip: 'color_03mg_silver.png', colorCode: 'mg_silver' },
						 ],
						 price: '$299', //판넬가격 표기
					 },
					 //@2022-05-29 재질 네임 삭제 (e)
					 /*
							/*{ name : '네이쳐',
								 colors : [
									  { name : '네이쳐<br />그레이', colorChip : 'color_04nm_gray.png', colorCode : 'nm_gray'},
									  { name : '네이쳐<br />블랙', colorChip : 'color_04nm_black.png', colorCode : 'nm_black'},
									  { name : '네이쳐<br />화이트', colorChip : 'color_04nm_white.png', colorCode : 'nm_white'},
								 ],
							},*/
				 ],
				 // 본품가격 표기
				 mainColor: [
					 {
						 price: '$2999',
					 },
				 ]
			 },
			 /*{
					id :        'refrigerator_kimchi',
					name :      '김치 냉장고',
					icon :      { default : 'Thumb_06.png', focus : 'Thumb_06_selected.png'},
					offset :    { top : 328, left : 540, },
					size :      { width : 174, height : 488, },
					selectedImage : 'appliances/rf_kimchi/rf_kim_selected.png',
					slideIndex : 0,
					shop_link : 'https://lgobjetcollection.co.kr/',
					spotButton : {
						  offset :    { top : 12, left : 12, },
					},
					selections : [ // 가전 별 선택 가능한 영역
						  {
								  id :        'refrigerator_T',
								  offset :    { top : 328, left : 540, },
								  size :      { width : 174, height : 266, },
								  placeholder : 'appliances/rf_kimchi/rf_kim_door01_nomal.png',
								  defaultImage: 'appliances/rf_kimchi/rf_kim_door01_nomal.png', //첫 오브제 기기 init 시 보여줄 selection 이미지
								  Surface : [
										 {colorCode : 'fn_botanic', filename : 'appliances/rf_kimchi/rf_kim_door01_01fn_botanic.png'},
										 {colorCode : 'fn_sand', filename : 'appliances/rf_kimchi/rf_kim_door01_01fn_sand.png'},
										 {colorCode : 'fn_stone', filename : 'appliances/rf_kimchi/rf_kim_door01_01fn_stone.png'},
										 {colorCode : 'st_black', filename : 'appliances/rf_kimchi/rf_kim_door01_02st_black.png'},
										 {colorCode : 'st_silver', filename : 'appliances/rf_kimchi/rf_kim_door01_02st_silver.png'},
										 {colorCode : 'st_green', filename : 'appliances/rf_kimchi/rf_kim_door01_02st_green.png'},
										 {colorCode : 'mg_beige', filename : 'appliances/rf_kimchi/rf_kim_door01_03mg_beige.png'},
										 {colorCode : 'mg_pink', filename : 'appliances/rf_kimchi/rf_kim_door01_03mg_pink.png'},
										 {colorCode : 'mg_mint', filename : 'appliances/rf_kimchi/rf_kim_door01_03mg_mint.png'},
										 {colorCode : 'mg_silver', filename : 'appliances/rf_kimchi/rf_kim_door01_03mg_silver.png'},
										 {colorCode : 'nm_gray', filename : 'appliances/rf_kimchi/rf_kim_door01_04nm_gray.png'},
										 {colorCode : 'nm_black', filename : 'appliances/rf_kimchi/rf_kim_door01_04nm_black.png'},
										 {colorCode : 'nm_white', filename : 'appliances/rf_kimchi/rf_kim_door01_04nm_white.png'},
								  ],
						  },
						  {
								  id :        'refrigerator_M',
								  offset :    { top : 606, left : 540, },
								  size :      { width : 174, height : 84, },
								  placeholder : 'appliances/rf_kimchi/rf_kim_door02_nomal.png',
								  defaultImage: 'appliances/rf_kimchi/rf_kim_door02_nomal.png',
								  Surface : [
										 {colorCode : 'fn_botanic', filename : 'appliances/rf_kimchi/rf_kim_door02_01fn_botanic.png'},
										 {colorCode : 'fn_sand', filename : 'appliances/rf_kimchi/rf_kim_door02_01fn_sand.png'},
										 {colorCode : 'fn_stone', filename : 'appliances/rf_kimchi/rf_kim_door02_01fn_stone.png'},
										 {colorCode : 'st_black', filename : 'appliances/rf_kimchi/rf_kim_door02_02st_black.png'},
										 {colorCode : 'st_silver', filename : 'appliances/rf_kimchi/rf_kim_door02_02st_silver.png'},
										 {colorCode : 'st_green', filename : 'appliances/rf_kimchi/rf_kim_door02_02st_green.png'},
										 {colorCode : 'mg_beige', filename : 'appliances/rf_kimchi/rf_kim_door02_03mg_beige.png'},
										 {colorCode : 'mg_pink', filename : 'appliances/rf_kimchi/rf_kim_door02_02mg_pink.png'},
										 {colorCode : 'mg_mint', filename : 'appliances/rf_kimchi/rf_kim_door02_03mg_mint.png'},
										 {colorCode : 'mg_silver', filename : 'appliances/rf_kimchi/rf_kim_door02_03mg_silver.png'},
										 {colorCode : 'nm_gray', filename : 'appliances/rf_kimchi/rf_kim_door02_04nm_gray.png'},
										 {colorCode : 'nm_black', filename : 'appliances/rf_kimchi/rf_kim_door02_04nm_black.png'},
										 {colorCode : 'nm_white', filename : 'appliances/rf_kimchi/rf_kim_door02_04nm_white.png'},
								  ],
						  },
						  {
								  id :        'refrigerator_B',
								  offset :    { top : 701, left : 540, },
								  size :      { width : 174, height : 115, },
								  placeholder : 'appliances/rf_kimchi/rf_kim_door03_nomal.png',
								  defaultImage: 'appliances/rf_kimchi/rf_kim_door03_nomal.png',
								  Surface : [
										 {colorCode : 'fn_botanic', filename : 'appliances/rf_kimchi/rf_kim_door03_01fn_botanic.png'},
										 {colorCode : 'fn_sand', filename : 'appliances/rf_kimchi/rf_kim_door03_01fn_sand.png'},
										 {colorCode : 'fn_stone', filename : 'appliances/rf_kimchi/rf_kim_door03_01fn_stone.png'},
										 {colorCode : 'st_black', filename : 'appliances/rf_kimchi/rf_kim_door03_02st_black.png'},
										 {colorCode : 'st_silver', filename : 'appliances/rf_kimchi/rf_kim_door03_02st_silver.png'},
										 {colorCode : 'st_green', filename : 'appliances/rf_kimchi/rf_kim_door03_02st_green.png'},
										 {colorCode : 'mg_beige', filename : 'appliances/rf_kimchi/rf_kim_door03_03mg_beige.png'},
										 {colorCode : 'mg_pink', filename : 'appliances/rf_kimchi/rf_kim_door03_03mg_pink.png'},
										 {colorCode : 'mg_mint', filename : 'appliances/rf_kimchi/rf_kim_door03_03mg_mint.png'},
										 {colorCode : 'mg_silver', filename : 'appliances/rf_kimchi/rf_kim_door03_03mg_silver.png'},
										 {colorCode : 'nm_gray', filename : 'appliances/rf_kimchi/rf_kim_door03_04nm_gray.png'},
										 {colorCode : 'nm_black', filename : 'appliances/rf_kimchi/rf_kim_door03_04nm_black.png'},
										 {colorCode : 'nm_white', filename : 'appliances/rf_kimchi/rf_kim_door03_04nm_white.png'},
								  ],
						  },
					],
					supportedSurface : [   //지원 가능한 색상 정보, sidebar 에서 활용
						  { name : 'FENIX',
								  colors : [
										 { name : '페닉스<br />보타닉', colorChip : 'color_01fn_botanic.png', colorCode : 'fn_botanic'},
										 { name : '페닉스<br />샌드', colorChip : 'color_01fn_sand.png', colorCode : 'fn_sand'},
										 { name : '페닉스<br />스톤', colorChip : 'color_01fn_stone.png', colorCode : 'fn_stone'},
								  ],
						  },
						  { name : '솔리드',
								  colors : [
										 { name : '솔리드<br />맨해튼 미드나잇', colorChip : 'color_02st_black.png', colorCode : 'st_black'},
										 { name : '솔리드<br />실버', colorChip : 'color_02st_silver.png', colorCode : 'st_silver'},
										 { name : '솔리드<br />그린', colorChip : 'color_02st_green.png', colorCode : 'st_green'},
								  ],
						  },
						  { name : '미스트',
								  colors : [
										 { name : '미스트<br />베이지', colorChip : 'color_03mg_beige.png', colorCode : 'mg_beige'},
										 { name : '미스트<br />핑크', colorChip : 'color_03mg_pink.png', colorCode : 'mg_pink'},
										 { name : '미스트<br />민트', colorChip : 'color_03mg_mint.png', colorCode : 'mg_mint'},
										 { name : '미스트<br />실버', colorChip : 'color_03mg_silver.png', colorCode : 'mg_silver'},
								  ],
						  },
						  { name : '네이쳐',
								  colors : [
										 { name : '네이쳐<br />그레이', colorChip : 'color_04nm_gray.png', colorCode : 'nm_gray'},
										 { name : '네이쳐<br />블랙', colorChip : 'color_04nm_black.png', colorCode : 'nm_black'},
										 { name : '네이쳐<br />화이트', colorChip : 'color_04nm_white.png', colorCode : 'nm_white'},
								  ],
						  },
					],
			 },*/
			 {
				 id: 'refrigerator_convertible',
				 name: 'convertible',
				 icon: { default: 'Thumb_02_01.png', focus: 'Thumb_02_01_selected.png' },
				 offset: { top: 327, left: 1009, },
				 size: { width: 316/*478*/, height: 492, },
				 selectedImage: 'appliances/rf_con/rf_con_selected.png',
				 slideIndex: 0,
				 shop_link: 'https://lgobjetcollection.co.kr/',
				 spotButton: {
					 offset: { top: 12, left: 12, },
				 },
				 price: {
					 product: "2,999 AUD",
					 panel: "399 AUD"
				 },
				 selections: [
					 {
						 id: 'refrigerator_convertible_L',
						 offset: { top: 327, left: 1009, },
						 size: { width: 158, height: 492, },
						 placeholder: 'appliances/rf_con/ct_door_nomal.png',
						 defaultImage: 'appliances/rf_con/ct_door_nomal.png',
						 productInfo: { modelId: 'MD07553654', modelCode: 'MP-L386.ASVRGAP' }, //장바구니 API - 제품모델명 추가 (Surface 컬러별 판넬 모델명 추가)
						 Surface: [
							 { colorCode: 'st_black', filename: 'appliances/rf_con/rf_con_02st_black.png', modelId: 'MD07553552', modelCode: 'AGF30133506' },
							 { colorCode: 'st_silver', filename: 'appliances/rf_con/rf_con_02st_silver.png', modelId: 'MD07553558', modelCode: 'AGF30133501' },
							 { colorCode: 'st_green', filename: 'appliances/rf_con/rf_con_02st_green.png', modelId: 'MD07553550', modelCode: 'AGF30133502' },
							 { colorCode: 'mg_beige', filename: 'appliances/rf_con/rf_con_03mg_beige.png', modelId: 'MD07553522', modelCode: 'AGF30133412' },
							 { colorCode: 'mg_pink', filename: 'appliances/rf_con/rf_con_03mg_pink.png', modelId: 'MD07553528', modelCode: 'AGF30133495' },
							 { colorCode: 'mg_mint', filename: 'appliances/rf_con/rf_con_03mg_mint.png', modelId: 'MD07553539', modelCode: 'AGF30133496' },
							 { colorCode: 'mg_silver', filename: 'appliances/rf_con/rf_con_03mg_silver.png', modelId: 'MD07553564', modelCode: 'AGF30133494' },
							 { colorCode: 'nm_gray', filename: 'appliances/rf_con/rf_con_04nm_gray.png' },
							 { colorCode: 'nm_black', filename: 'appliances/rf_con/rf_con_04nm_black.png' },
							 { colorCode: 'nm_white', filename: 'appliances/rf_con/rf_con_04nm_white.png' },
						 ],
					 },
					 {
						 id: 'refrigerator_convertible_M',
						 offset: { top: 327, left: 1169, },
						 size: { width: 158, height: 492, },
						 placeholder: 'appliances/rf_con/ct_door_nomal.png',
						 defaultImage: 'appliances/rf_con/ct_door_nomal.png',
						 productInfo: { modelId: 'MD07553636', modelCode: 'MP-F324.ASVRGAP' }, //장바구니 API - 제품모델명 추가 (Surface 컬러별 판넬 모델명 추가)
						 Surface: [
							 { colorCode: 'st_black', filename: 'appliances/rf_con/rf_con_02st_black.png', modelId: 'MD07553552', modelCode: 'AGF30133506' },
							 { colorCode: 'st_silver', filename: 'appliances/rf_con/rf_con_02st_silver.png', modelId: 'MD07553558', modelCode: 'AGF30133501' },  
							 { colorCode: 'st_green', filename: 'appliances/rf_con/rf_con_02st_green.png', modelId: 'MD07553550', modelCode: 'AGF30133502' },
							 { colorCode: 'mg_beige', filename: 'appliances/rf_con/rf_con_03mg_beige.png', modelId: 'MD07553522', modelCode: 'AGF30133412' },
							 { colorCode: 'mg_pink', filename: 'appliances/rf_con/rf_con_03mg_pink.png', modelId: 'MD07553528', modelCode: 'AGF30133495' },
							 { colorCode: 'mg_mint', filename: 'appliances/rf_con/rf_con_03mg_mint.png', modelId: 'MD07553539', modelCode: 'AGF30133496' },
							 { colorCode: 'mg_silver', filename: 'appliances/rf_con/rf_con_03mg_silver.png', modelId: 'MD07553564', modelCode: 'AGF30133494' },  
							 { colorCode: 'nm_gray', filename: 'appliances/rf_con/rf_con_04nm_gray.png' },
							 { colorCode: 'nm_black', filename: 'appliances/rf_con/rf_con_04nm_black.png' },
							 { colorCode: 'nm_white', filename: 'appliances/rf_con/rf_con_04nm_white.png' },
						 ],
					 }/*,
									 {
										  id :        'refrigerator_convertible_R',
										  offset :    { top : 327, left : 1329, },
										  size :      { width : 158, height : 492, },
										  placeholder : 'appliances/rf_con/ct_door_nomal.png',
										  defaultImage: 'appliances/rf_con/ct_door_nomal.png',
										  Surface : [
												{colorCode : 'st_black', filename : 'appliances/rf_con/rf_con_02st_black.png'},
												{colorCode : 'st_silver', filename : 'appliances/rf_con/rf_con_02st_silver.png'},
												{colorCode : 'st_green', filename : 'appliances/rf_con/rf_con_02st_green.png'},
												{colorCode : 'mg_beige', filename : 'appliances/rf_con/rf_con_03mg_beige.png'},
												{colorCode : 'mg_pink', filename : 'appliances/rf_con/rf_con_03mg_pink.png'},
												{colorCode : 'mg_mint', filename : 'appliances/rf_con/rf_con_03mg_mint.png'},
												{colorCode : 'mg_silver', filename : 'appliances/rf_con/rf_con_03mg_silver.png'},
												{colorCode : 'nm_gray', filename : 'appliances/rf_con/rf_con_04nm_gray.png'},
												{colorCode : 'nm_black', filename : 'appliances/rf_con/rf_con_04nm_black.png'},
												{colorCode : 'nm_white', filename : 'appliances/rf_con/rf_con_04nm_white.png'},
										  ],
									 },*/
				 ],
				 supportedSurface: [
					 //@2022-05-29 재질 네임 삭제 (s)
					 {
						 name: 'Stainless Steel',
						 colors: [
							 { name: 'Matte Black', colorChip: 'color_02st_black.png', colorCode: 'st_black' },
							 { name: 'Silver', colorChip: 'color_02st_silver.png', colorCode: 'st_silver' },
							 { name: 'Green', colorChip: 'color_02st_green.png', colorCode: 'st_green' },
						 ],
						 price: '$399', //판넬가격 표기
					 },
					 {
						 name: 'Mist Glass',
						 colors: [
							 { name: 'Beige', colorChip: 'color_03mg_beige.png', colorCode: 'mg_beige' },
							 { name: 'Pink', colorChip: 'color_03mg_pink.png', colorCode: 'mg_pink' },
							 { name: 'Mint', colorChip: 'color_03mg_mint.png', colorCode: 'mg_mint' },
							 { name: 'Silver', colorChip: 'color_03mg_silver.png', colorCode: 'mg_silver' },
						 ],
						 price: '$399', //판넬가격 표기
					 }
					 //@2022-05-29 재질 네임 삭제 (e)
					 /*,
								  { name : '네이쳐',
										colors : [
											 { name : '네이쳐<br />그레이', colorChip : 'color_04nm_gray.png', colorCode : 'nm_gray'},
											 { name : '네이쳐<br />블랙', colorChip : 'color_04nm_black.png', colorCode : 'nm_black'},
											 { name : '네이쳐<br />화이트', colorChip : 'color_04nm_white.png', colorCode : 'nm_white'},
										],
								  },*/
				 ],
				 // 본품가격 표기
				 mainColor: [
					 {
						 price: '$5999',
					 },
				 ]
			 },
			 /*{
					id :        'dish',
					name :      '식기세척기',
					icon :      { default : 'Thumb_03.png', focus : 'Thumb_03_selected.png'},
					offset :    { top : 673, left : 2061, },
					size :      { width : 248, height : 278, },
					selectedImage : 'appliances/dish/dish_selected.png',
					slideIndex : 1,
					shop_link : 'https://lgobjetcollection.co.kr/',
					spotButton : {
						  offset :    { top : 16, left : 208, },
					},
					selections : [
						  {
								  id :        'dish',
								  offset :    { top : 673, left : 2061, },
								  size :      { width : 248, height : 278, },
								  placeholder : 'appliances/dish/dw_nomal.png',
								  defaultImage: 'appliances/dish/dw_nomal.png',
								  Surface : [
										 {colorCode : 'st_silver', filename : 'appliances/dish/dish_02st_silver.png'},
										 {colorCode : 'st_green', filename : 'appliances/dish/dish_02st_green.png'},
										 {colorCode : 'nm_beige', filename : 'appliances/dish/dish_04_beige.png'},
								  ],
						  },
					],
					supportedSurface : [
						  { name : '솔리드',
								  colors : [
										 { name : '솔리드<br />실버', colorChip : 'color_02st_silver.png', colorCode : 'st_silver'},
										 { name : '솔리드<br />그린', colorChip : 'color_02st_green.png', colorCode : 'st_green'},
								  ],
						  },
						  { name : '네이쳐',
								  colors : [
										 { name : '네이쳐<br />베이지', colorChip : 'color_04nm_beige.png', colorCode : 'nm_beige'},
								  ],
						  },
					],
			 },*/
			 /*{
					id :        'oven',
					name :      '광파오븐',
					icon :      { default : 'Thumb_04.png', focus : 'Thumb_04_selected.png'},
					offset :    { top : 499, left : 2527, },
					size :      { width : 191, height : 139, },
					selectedImage : 'appliances/oven/oven_selected.png',
					slideIndex : 1,
					shop_link : 'https://lgobjetcollection.co.kr/',
					spotButton : {
						  offset :    { top : 4, left : 163, },
					},
					selections : [
						  {
								  id :        'oven',
								  offset :    { top : 499, left : 2527, },
								  size :      { width : 191, height : 139, },
								  placeholder : 'appliances/oven/ov_nomal.png',
								  defaultImage: 'appliances/oven/ov_nomal.png',
								  Surface : [
										 {colorCode : 'st_silver', filename : 'appliances/oven/oven_02st_silver.png'},
										 {colorCode : 'st_green', filename : 'appliances/oven/oven_02st_green.png'},
										 {colorCode : 'mg_beige', filename : 'appliances/oven/oven_02mg_beige.png'},
								  ],
						  },
					],
					supportedSurface : [
						  { name : '솔리드',
								  colors : [
										 { name : '솔리드<br />실버', colorChip : 'color_02st_silver.png', colorCode : 'st_silver'},
										 { name : '솔리드<br />그린', colorChip : 'color_02st_green.png', colorCode : 'st_green'},
								  ],
						  },
						  { name : '미스트',
								  colors : [
										 { name : '미스트<br />베이지', colorChip : 'color_03mg_beige.png', colorCode : 'mg_beige'},
								  ],
						  },
					],
			 },*/
			 /*{
					id :        'water',
					name :      '정수기',
					icon :      { default : 'Thumb_05.png', focus : 'Thumb_05_selected.png'},
					offset :    { top : 479, left : 2837, },
					size :      { width : 76, height : 160, },
					selectedImage : 'appliances/water/water_selected.png',
					slideIndex : 1,
					shop_link : 'https://lgobjetcollection.co.kr/',
					spotButton : {
						  offset :    { top : 14, left : 38, },
					},
					selections : [
						  {
								  id :        'water',
								  offset :    { top : 479, left : 2837, },
								  size :      { width : 76, height : 160, },
								  placeholder : 'appliances/water/wp_normal.png',
								  defaultImage: 'appliances/water/wp_normal.png',
								  Surface : [
										 {colorCode : 'calm_green', filename : 'appliances/water/water_05ca_green.png'},
										 {colorCode : 'calm_beige', filename : 'appliances/water/water_05ca_beige.png'},
								  ],
						  },
					],
					supportedSurface : [
						  { name : '카밍',
								  colors : [
										 { name : '카밍<br />그린', colorChip : 'color-04-calm-green.png', colorCode : 'calm_green'},
										 { name : '카밍<br />베이지', colorChip : 'color-04-calm-beige.png', colorCode : 'calm_beige'},
								  ],
						  },
					],
			 },*/
			 /*{
					id :        'wash',
					name :      'WashTowerTM',
					icon :      { default : 'Thumb_07.png', focus : 'Thumb_07_selected.png'},
					offset :    { top : 336, left : 4871, },
					size :      { width : 177, height : 478, },
					selectedImage : 'appliances/wash/wt_selected.png',
					slideIndex : 1,
					shop_link : 'https://lgobjetcollection.co.kr/',
					spotButton : {
						  offset :    { top : 12, left : 140, },
					},
					selections : [
						  {
								  id :        'wash_T',
								  offset :    { top : 336, left : 4871, },
								  size :      { width : 177, height : 207, },
								  placeholder : 'appliances/wash/wt_top_nomal.png',
								  defaultImage: 'appliances/wash/wt_top_nomal.png',
								  Surface : [
										 {colorCode : 'nm_green', filename : 'appliances/wash/wt_door01_04nm_green.png'},
										 {colorCode : 'nm_beige', filename : 'appliances/wash/wt_door01_04nm_beige.png'},
										 {colorCode : 'nm_pink', filename : 'appliances/wash/wt_door01_04nm_pink.png'},
								  ],
						  },
						  {
								  id :        'wash_B',
								  offset :    { top : 569, left : 4871, },
								  size :      { width : 177, height : 244, },
								  placeholder : 'appliances/wash/wt_bottom_nomal.png',
								  defaultImage: 'appliances/wash/wt_bottom_nomal.png',
								  Surface : [
										 {colorCode : 'nm_green', filename : 'appliances/wash/wt_door02_04nm_green.png'},
										 {colorCode : 'nm_beige', filename : 'appliances/wash/wt_door02_04nm_beige.png'},
										 {colorCode : 'nm_pink', filename : 'appliances/wash/wt_door02_04nm_pink.png'},
								  ],
						  },
					],
					supportedSurface : [
						  { name : 'Nature Metal',
								  colors : [
										 { name : 'Nature<br>Green', colorChip : 'color_04nm_green.png', colorCode : 'nm_green'},
										 { name : 'Nature<br>Beige', colorChip : 'color_04nm_beige.png', colorCode : 'nm_beige'},
										 /*{ name : '네이쳐<br />핑크', colorChip : 'color_04nm_pink.png', colorCode : 'nm_pink'},
								  ],
						  },
					],
			 },*/
			 /*{
					id :        'clean',
					name :      'All-in-one TowerTM',
					icon :      { default : 'Thumb_09.png', focus : 'Thumb_09_selected.png'},
					offset :    { top : 537, left : 6117, },
					size :      { width : 81, height : 328, },
					selectedImage : 'appliances/clean/ct_selected.png',
					slideIndex : 2,
					shop_link : 'https://lgobjetcollection.co.kr/',
					spotButton : {
						  offset :    { top : 5, left : 43, },
					},
					selections : [
						  {
								  id :        'clean',
								  offset :    { top : 537, left : 6117, },
								  size :      { width : 81, height : 328, },
								  placeholder : 'appliances/clean/ct_nomal.png',
								  defaultImage: 'appliances/clean/ct_nomal.png',
								  Surface : [
										 {colorCode : 'calm_green', filename : 'appliances/clean/clean_05ca_green.png'},
										 {colorCode : 'calm_beige', filename : 'appliances/clean/clean_05ca_beige.png'},
								  ],
						  },
					],
					supportedSurface : [
						  { name : 'Calming',
								  colors : [
										 /*{ name : 'calming<br>green', colorChip : 'color-04-calm-green.png', colorCode : 'calm_green'},
										 { name : 'Calming<br>Beige', colorChip : 'color-04-calm-beige.png', colorCode : 'calm_beige'},
								  ],
						  },
					],
			 },*/
			 /*{
					id :        'styler',
					name :      'StylerTM',
					icon :      { default : 'Thumb_08.png', focus : 'Thumb_08_selected.png'},
					offset :    { top : 266, left : 4402, },
					size :      { width : 183, height : 597, },
					selectedImage : 'appliances/styler/styler_selected.png',
					slideIndex : 2,
					shop_link : 'https://lgobjetcollection.co.kr/',
					spotButton : {
						  offset :    { top : 16, left : 143, },
					},
					selections : [
						  {
								  id :        'styler',
								  offset :    { top : 266, left : 4402, },
								  size :      { width : 183, height : 597, },
								  placeholder : 'appliances/styler/st_nomal.png',
								  defaultImage: 'appliances/styler/st_nomal.png',
								  Surface : [
										 {colorCode : 'mg_green', filename : 'appliances/styler/styler_03mg_green.png'},
										 {colorCode : 'mg_beige', filename : 'appliances/styler/styler_03mg_beige.png'},
								  ],
						  },
					],
					supportedSurface : [
						  { name : 'Mist Glass',
								  colors : [
										 { name : 'Mist<br>Green', colorChip : 'color_03mg_green.png', colorCode : 'mg_green'},
										 { name : 'Mist<br>Beige', colorChip : 'color_03mg_beige.png', colorCode : 'mg_beige'},
								  ],
						  },
					],
			 },*/
			 /*{//20210129 에어콘 추가
					id :        'aircon',
					name :      '에어콘',
					icon :      { default : 'Thumb_10.png', focus : 'Thumb_10_selected.png'},
					offset :    { top : 268, left : 6978, },
					size :      { width : 125, height : 592, },
					selectedImage : 'appliances/aircon/ac_selected.png',
					slideIndex : 3,
					shop_link : 'https://lgobjetcollection.co.kr/',
					spotButton : {
						  offset :    { top : 13, left : 90, },
					},
					selections : [
						  {
								  id :        'aircon',
								  offset :    { top : 268, left : 6978, },
								  size :      { width : 125, height : 592, },
								  placeholder : 'appliances/aircon/ac_nomal.png',
								  defaultImage: 'appliances/aircon/ac_nomal.png',
								  Surface : [
										 //{colorCode : 'mg_green', filename : 'appliances/aircon/aircon_03mg_green.png'},
										 {colorCode : 'mg_beige', filename : 'appliances/aircon/ac_03mg_beige.png'},
								  ],
						  },
					],
					supportedSurface : [
						  { name : '미스트',
								  colors : [
										 //{ name : '미스트<br />그린', colorChip : 'color_03mg_green.png', colorCode : 'mg_green'},
										 { name : '미스트<br />베이지', colorChip : 'color_03mg_beige.png', colorCode : 'mg_beige'},
								  ],
						  },
					],
			 }*/
		 ],
	 };
 
	 // 사용자 선택 데이터 취합용
	 var userSelected = {
		 selectedObjet: [],
		 selectedBackground: []
	 };
 
	 var proposeSetObjetSelections = [     // 인기 조합 데이터
		 {
			 id: 'refrigerator', // 1026
			 objet_set: [
				 {
					 name: 'Best',
					 sets: [
						 {
							 setName: 'M870FBS451',
							 setCoverImage: 'appliances/rf/popular/3-01.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'fn_botanic' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'fn_sand' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'fn_sand' },
							 ]
						 },
						 {
							 setName: 'M870SGS451',
							 setCoverImage: 'appliances/rf/popular/3-02.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'st_green' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'st_silver' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'st_silver' },
							 ]
						 },
						 {
							 setName: 'M870G3T451S',
							 setCoverImage: 'appliances/rf/popular/3-03.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_pink' },
							 ]
						 },
					 ]
				 },
				 {
					 name: 'FENIX',
					 sets: [
						 {
							 setName: 'M870FBB451S',
							 setCoverImage: 'appliances/rf/popular/1-02.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'fn_botanic' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'fn_botanic' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'fn_botanic' },
							 ]
						 },
						 {
							 setName: 'M870FSS451S',
							 setCoverImage: 'appliances/rf/popular/1-01.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'fn_sand' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'fn_sand' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'fn_sand' },
							 ]
						 },
						 {
							 setName: 'M870FTT451S',
							 setCoverImage: 'appliances/rf/popular/1-03.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'fn_stone' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'fn_stone' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'fn_stone' },
							 ]
						 },
						 {
							 setName: 'M870FBS451',
							 setCoverImage: 'appliances/rf/popular/3-01.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'fn_botanic' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'fn_sand' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'fn_sand' },
							 ]
						 },
						 {
							 setName: 'M870FBT451S',
							 setCoverImage: 'appliances/rf/popular/2-02.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'fn_botanic' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'fn_stone' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'fn_stone' },
							 ]
						 },
						 {
							 setName: 'M870FTS451S',
							 setCoverImage: 'appliances/rf/popular/2-01.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'fn_stone' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'fn_sand' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'fn_sand' },
							 ]
						 },
					 ]
				 },
				 {
					 name: 'SOLID',
					 sets: [
						 {
							 setName: 'M870SGG451S',
							 setCoverImage: 'appliances/rf/popular/1-05.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'st_green' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'st_green' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'st_green' },
							 ]
						 },
						 {
							 setName: 'M870SSS451S',
							 setCoverImage: 'appliances/rf/popular/1-04.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'st_silver' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'st_silver' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'st_silver' },
							 ]
						 }, {
							 setName: 'M870SMM451S',
							 setCoverImage: 'appliances/rf/popular/1-06.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'st_black' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'st_black' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'st_black' },
							 ]
						 },
						 {
							 setName: 'M870SGS451',
							 setCoverImage: 'appliances/rf/popular/3-02.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'st_green' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'st_silver' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'st_silver' },
							 ]
						 },
						 {
							 setName: 'M870SSG451S',
							 setCoverImage: 'appliances/rf/popular/2-03.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'st_silver' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'st_green' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'st_green' },
							 ]
						 },
					 ]
				 },
				 {
					 name: 'MIST',
					 sets: [
						 {
							 setName: 'M870GBB451',
							 setCoverImage: 'appliances/rf/popular/1-07.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_beige' },
							 ]
						 },
						 {
							 setName: 'M870GBM451S',
							 setCoverImage: 'appliances/rf/popular/2-10.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_mint' },
							 ]
						 },
						 {
							 setName: 'M870GBP451S',
							 setCoverImage: 'appliances/rf/popular/2-09.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_pink' },
							 ]
						 },
						 {
							 setName: 'M870GBS451S',
							 setCoverImage: 'appliances/rf/popular/2-13.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_silver' },
							 ]
						 },
						 {
							 setName: 'M870GSS451S',
							 setCoverImage: 'appliances/rf/popular/1-08.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_silver' },
							 ]
						 },
						 {
							 setName: 'M870GSB451S',
							 setCoverImage: 'appliances/rf/popular/2-08.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_beige' },
							 ]
						 },
						 {
							 setName: 'M870GSM451',
							 setCoverImage: 'appliances/rf/popular/2-12.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_mint' },
							 ]
						 },
						 {
							 setName: 'M870GSP451S',
							 setCoverImage: 'appliances/rf/popular/2-11.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_pink' },
							 ]
						 },
						 {
							 setName: 'M870GMM451S',
							 setCoverImage: 'appliances/rf/popular/1-10.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_mint' },
							 ]
						 },
						 {
							 setName: 'M870GMB451S',
							 setCoverImage: 'appliances/rf/popular/2-05.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_beige' },
							 ]
						 },
						 {
							 setName: 'M870GMS451S',
							 setCoverImage: 'appliances/rf/popular/2-07.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_silver' },
							 ]
						 },
						 {
							 setName: 'M870G3T451S',
							 setCoverImage: 'appliances/rf/popular/3-03.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_pink' },
							 ]
						 },
						 {
							 setName: 'M870GPP451S',
							 setCoverImage: 'appliances/rf/popular/1-09.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_pink' },
							 ]
						 },
						 {
							 setName: 'M870GPB451',
							 setCoverImage: 'appliances/rf/popular/2-04.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_beige' },
							 ]
						 },
						 {
							 setName: 'M870GPS451S',
							 setCoverImage: 'appliances/rf/popular/2-06.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'mg_silver' },
							 ]
						 },
					 ]
				 },
				 {
					 name: 'NATURE',
					 sets: [
						 {
							 setName: 'M870MBB451S',
							 setCoverImage: 'appliances/rf/popular/1-13.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'nm_black' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'nm_black' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'nm_black' },
							 ]
						 },
						 {
							 setName: 'M870MGG451',
							 setCoverImage: 'appliances/rf/popular/1-12.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'nm_gray' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'nm_gray' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'nm_gray' },
							 ]
						 },
						 {
							 setName: 'M870MWW451S',
							 setCoverImage: 'appliances/rf/popular/1-11.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'nm_white' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'nm_white' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'nm_white' },
							 ]
						 },
						 {
							 setName: 'M870BGG451S',
							 setCoverImage: 'appliances/rf/popular/2-14.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_LT', objetSelection_colorCode: 'nm_black' },
								 { objetSelection_id: 'refrigerator_LB', objetSelection_colorCode: 'nm_gray' },
								 { objetSelection_id: 'refrigerator_RB', objetSelection_colorCode: 'nm_gray' },
							 ]
						 },
					 ]
				 },
			 ],
		 },
		 {
			 id: 'refrigerator_kimchi', //1026
			 objet_set: [
				 {
					 name: 'Best',
					 sets: [
						 {
							 setName: 'Z330FTS151',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_3-01.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'fn_stone' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'fn_sand' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'fn_sand' },
							 ]
						 },
						 {
							 setName: 'Z330SGS151',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_3-02.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'st_green' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'st_silver' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'st_silver' },
							 ]
						 },
						 {
							 setName: 'Z330GPB151',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_3-03.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_beige' },
							 ]
						 },
					 ]
				 },
				 {
					 name: 'FENIX',
					 sets: [
						 {
							 setName: 'Z330FBB151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-02.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'fn_botanic' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'fn_botanic' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'fn_botanic' },
							 ]
						 },
						 {
							 setName: 'Z330FSS151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-01.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'fn_sand' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'fn_sand' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'fn_sand' },
							 ]
						 },
						 {
							 setName: 'Z330FTT151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-03.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'fn_stone' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'fn_stone' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'fn_stone' },
							 ]
						 },
						 {
							 setName: 'Z330FBS151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-01.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'fn_botanic' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'fn_sand' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'fn_sand' },
							 ]
						 },
						 {
							 setName: 'Z330FBT151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-02.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'fn_botanic' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'fn_stone' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'fn_stone' },
							 ]
						 },
						 {
							 setName: 'Z330FTS151',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_3-01.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'fn_stone' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'fn_sand' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'fn_sand' },
							 ]
						 },
					 ]
				 },
				 {
					 name: 'SOLID',
					 sets: [
						 {
							 setName: 'Z330SGG151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-05.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'st_green' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'st_green' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'st_green' },
							 ]
						 },
						 {
							 setName: 'Z330SSS151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-04.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'st_silver' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'st_silver' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'st_silver' },
							 ]
						 },
						 {
							 setName: 'Z330SMM151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-06.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'st_black' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'st_black' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'st_black' },
							 ]
						 },
						 {
							 setName: 'Z330SMS151',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_3-04.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'st_black' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'st_silver' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'st_silver' },
							 ]
						 },
						 {
							 setName: 'Z330SSG151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-03.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'st_silver' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'st_green' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'st_green' },
							 ]
						 },
						 {
							 setName: 'Z330SGS151',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_3-02.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'st_green' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'st_silver' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'st_silver' },
							 ]
						 },
					 ]
				 },
				 {
					 name: 'MIST',
					 sets: [
						 {
							 setName: 'Z330GBB151',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-07.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_beige' },
							 ]
						 },
						 {
							 setName: 'Z330GBM151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-10.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_mint' },
							 ]
						 },
						 {
							 setName: 'Z330GBP151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-09.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_pink' },
							 ]
						 },
						 {
							 setName: 'Z330GBS151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-13.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_silver' },
							 ]
						 },
						 {
							 setName: 'Z330GSS151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-08.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_silver' },
							 ]
						 },
						 {
							 setName: 'Z330GMM151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-10.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_mint' },
							 ]
						 },
						 {
							 setName: 'Z330GMS151',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-07.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_silver' },
							 ]
						 },
						 {
							 setName: 'Z330GMB151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-05.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_beige' },
							 ]
						 },
						 {
							 setName: 'Z330GSM151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-12.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_mint' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_mint' },
							 ]
						 },
						 {
							 setName: 'Z330GSB151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-08.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_beige' },
							 ]
						 },
						 {
							 setName: 'Z330GPP151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-09.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_pink' },
							 ]
						 },
						 {
							 setName: 'Z330GPB151',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_3-03.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_beige' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_beige' },
							 ]
						 },
						 {
							 setName: 'Z330GPS151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-06.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_silver' },
							 ]
						 },
						 {
							 setName: 'Z330GSP151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-11.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'mg_silver' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'mg_pink' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'mg_pink' },
							 ]
						 },
					 ]
				 },
				 {
					 name: 'NATURE',
					 sets: [
						 {
							 setName: 'Z330MBB151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-13.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'nm_black' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'nm_black' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'nm_black' },
							 ]
						 },
						 {
							 setName: 'Z330MGG151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-12.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'nm_gray' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'nm_gray' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'nm_gray' },
							 ]
						 },
						 {
							 setName: 'Z330MWW151S',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_1-11.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'nm_white' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'nm_white' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'nm_white' },
							 ]
						 },
						 {
							 setName: 'Z330MBG151',
							 setCoverImage: 'appliances/rf_kimchi/popular/kim_2-14.png',
							 objetSelection: [
								 { objetSelection_id: 'refrigerator_T', objetSelection_colorCode: 'nm_black' },
								 { objetSelection_id: 'refrigerator_M', objetSelection_colorCode: 'nm_gray' },
								 { objetSelection_id: 'refrigerator_B', objetSelection_colorCode: 'nm_gray' },
							 ]
						 },
					 ]
				 },
			 ],
		 }
	 ];
 
	 //배열 내 오브젝트 index 참조용 함수
	 function findIndexByKeyValue(_array, key, value) {
		 if (_array.length == 'undefined')
			 return -1;
		 for (var i = 0; i < _array.length; i++) {
			 if (_array[i][key] == value) {
				 return i;
			 }
		 }
		 return -1;
	 }
 
	 // @pck 2020-10-19 컬러코드로 그룹 찾기
	 function findGroupIndexByColorCode(objectIndex, colorCode) {
		 if (configData.object[objectIndex].supportedSurface.length == 'undefined')
			 return -1;
		 var _array = configData.object[objectIndex].supportedSurface;
 
		 for (var i = 0; i < _array.length; i++) {
			 for (var j = 0; j < _array[i].colors.length; j++) {
				 if (_array[i].colors[j].colorCode == colorCode) {
					 // console.log('(_array[i].colors[j].colorCode) ' +_array[i].colors[j].colorCode);
					 return i;
				 }
			 }
		 }
		 return -1;
	 }
 
	 function countTotalObjet() {
		 var totalObjet = 0,
			 totalSelection = 0;
		 for (var i = 0; i < configData.object.length; i++) {
			 totalObjet++;
 
			 for (var j = 0; j < configData.object[i].selections.length; j++) {
				 totalSelection++;
			 }
		 }
 
		 stageSetting.totalObjet = totalObjet;
		 stageSetting.totalSelection = totalSelection;
	 }
 
	 Simulator.prototype = {
		 init: function () {
			 _self = this;
 
			 countTotalObjet(); //전체 오브제, 셀렉션 카운트 추가
 
			 this.isSideScrollBarButtonClickEvent = false; //sidebar 스크롤 다운 이벤트 중복 방지
 
			 //배경 유효성 체크 및 자식 노드 개수 확인 및 초기값 정의
			 if (typeof document.querySelector(stageSetting.backgroundSliderEl.targetElement) !== "undefined") {
				 bgSliderObject = document.querySelector(stageSetting.backgroundSliderEl.targetElement);
				 bgSliderImages = document.querySelectorAll(stageSetting.backgroundSliderEl.targetImagesSelector)
 
				 stageSetting.backgroundSliderEl.totalLength = bgSliderImages.length;
				 userSelected.selectedBackground = new Array(bgSliderImages.length);
				 //updateActiveIndex();
			 }
 
			 // 제품 목록 업데이트
			 _self.updateAppliancesList();
			 // 체험 완료 결과 선택 부 제품 목록 업데이트
			 _self.updateObjetSelected();
 
 
			 //초기 설정 부 load,
			 /* 연동 대기
			 var xhr = new XMLHttpRequest();
			 xhr.open('POST', stageSetting.configJsonURL, true);
			 xhr.setRequestHeader('Content-Type', 'application/json');
			 xhr.withCredentials = true;
			 xhr.onload = function() {
					var status = xhr.status;
					if (status === 200) {
						  //내부 정의 값 override
						  configData = xhr.response;
					} else {
						  //오류 발생 시 json 대신 내부 변수 사용
						  console.log(status, xhr.response); //err status 발생
					}
			 };
			 xhr.send();
			 */
			 //_self.initObjects();
 
			 // 첫 화면용 슬라이더
			 /* 시작 시 init 해야하는 부 소스
			 objSwiper = new Swiper('.obj-swiper-container',
					{
						  observer: true,
						  observeParents: true,
						  spaceBetween: 0,
						  slidesPerView: 1,
						  centeredSlides: true,
						  loop: false,
						  mousewheel: true,
						  keyboard: true,
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
						  on : {
								  init : function(){
										 var activeSlideImgSrc = this.slides[this.activeIndex].querySelector('img').src;
										 if( activeSlideImgSrc !== null )
												dummyImgEL.src = activeSlideImgSrc;
										 this.update();
								  },
								  slideChangeTransitionEnd : function (swiper){
										 var activeSlideImgSrc = this.slides[this.activeIndex].querySelector('img').src;
										 if( activeSlideImgSrc !== null )
												dummyImgEL.src = activeSlideImgSrc;
										 this.update();
								  },
								  click : function(swiper, event) {
										 this.update(); //간혹 swiper 내부 세팅값이 반영안되는 케이스가 존재함
										 console.log(this.activeIndex);
  
										 var clickedEl = this.clickedSlide;
										 if(clickedEl.classList.contains('swiper-slide-active')) {
												var selectedIndex = this.realIndex;
  
												dummyImgEL.classList.add('active');
												this.destroy(false, true);
  
												document.querySelector('.simulator').classList.add('full');
  
												var selectedSlideIndex = selectedIndex;
												_self.objSwiperInit(selectedSlideIndex);
										 }else{
												this.slideToClickedSlide();
										 }
								  },
						  },
					}
			 );
			  */
 
			 console.log('objSimulator loaded');
		 },
 
		 setBackground: function (styleName) {
			 var selectedStyleName = styleName;
			 if (selectedStyleName == '' || selectedStyleName == null)
				 return false;
			 if (bgSliderImages.length == 0)
				 return false;
 
			 var imageSrc = '';
			 var selectedStyleIndex = findIndexByKeyValue(configData.backgroundImages, 'name', selectedStyleName);
 
			 if (selectedStyleIndex == -1) {
				 selectedStyleIndex = 0; //스타일 이름이 존재 하지 않을 때는 기본 값 'modern' index선택
				 selectedStyleName = 'modern';
			 }
 
			 for (var i = 0; i < bgSliderImages.length; i++) {
				 if (bgSliderImages[i].classList.contains('active-background')) { //@pck 2020-10-24 배경 선택자 변경
					 imageSrc = configData.backgroundImages[selectedStyleIndex].images[i];
					 if (imageSrc !== '')
						 bgSliderImages[i].querySelector('img').src = backgroundImageURL + imageSrc;
					 userSelected.selectedBackground[i] = { section: bgSliderImages[i].dataset.simulatorBackgroundImage, style: selectedStyleName };
				 } else {
					 // 사용자 선택이 없는 배경은 저장할지 말지 확인이 필요함
					 // userSelected.selectedBackground[i] = { section : bgSliderImages[i].dataset.simulatorBackgroundImage, style : configData.backgroundDefault };
				 }
			 }
			 return true;
		 },
 
		 setBackgrounds: function (styleName) {
			 console.log('(styleName) ' + styleName);
 
			 var selectedStyleName = styleName;
			 console.log('(selectedStyleName) ' + selectedStyleName)
			 if (selectedStyleName == '' || selectedStyleName == null)
				 return false;
			 if (bgSliderImages.length == 0)
				 return false;
 
			 var imageSrc = '';
			 var selectedStyleIndex = findIndexByKeyValue(configData.backgroundImages, 'name', selectedStyleName);
 
			 if (selectedStyleIndex == -1) {
				 selectedStyleIndex = 0; //스타일 이름이 존재 하지 않을 때는 기본 값 'modern' index선택
				 selectedStyleName = 'modern';
			 }
 
 
			 for (var i = 0; i < bgSliderImages.length; i++) {
				 imageSrc = configData.backgroundImages[selectedStyleIndex].images[i];
				 if (imageSrc !== '')
					 bgSliderImages[i].querySelector('img').src = backgroundImageURL + imageSrc;
				 userSelected.selectedBackground[i] = { section: bgSliderImages[i].dataset.simulatorBackgroundImage, style: selectedStyleName };
				 if (i == bgSliderImages.length - 1) {
					 return true;
				 }
			 }
		 },
 
		 initObjects: function () {
			 if (stageSetting.objectArea !== null) {
 
				 /*
						sample html
						<div id="objet_object01" class="objet01_base base01 obj01" itemw="214" itemh="439" itemt="213" iteml="485" data-id="objType01_Fenix01" data-object-select-area="">
							  <a href="#">
									  <p><img src="../content/images/simulator_img/rf_door01_01fn_botanic.png" alt="" /></p>
							  </a>
						</div>
				  */
				 var outputHtml = '';
 
				 for (var i = 0; i < configData.object.length; i++) {
 
					 outputHtml += '<div class="objet" data-objet-id="' + configData.object[i].id + '">' +
						 '<input type="checkbox" class="objet-selected" name="objet-selected" value="' + configData.object[i].id + '" id="' + configData.object[i].id + '-select" data-slide-index="' + configData.object[i].slideIndex + '">';
 
					 for (var j = 0; j < configData.object[i].selections.length; j++) {
 
						 outputHtml += '<div id="' + configData.object[i].id + '_objet-' + i + j + '" class="objet_base objet_resize"' + // @pck 2020-10-23 오브제 선택 시 화면 센터로 스크롤 fix
							 ' itemw="' + configData.object[i].selections[j].size.width +
							 '" itemh="' + configData.object[i].selections[j].size.height +
							 '" itemt="' + configData.object[i].selections[j].offset.top +
							 '" iteml="' + configData.object[i].selections[j].offset.left +
							 '" >' +
							 //'" style="background-image:url(' + objectImageURL + configData.object[i].selections[j].placeholder + ');">' +
							 '<a href="#none" class="object-app" data-object="' + configData.object[i].id + '" data-object-selector="' + configData.object[i].selections[j].id + '" ' +
							 //'style="background-image:url(' + objectImageURL + configData.object[i].selections[j] + ');"' +
							 '>' +
							 '<p><img src="' + objectImageURL + configData.object[i].selections[j].defaultImage + '" ' +
							 'id="' + configData.object[i].selections[j].id + '" ' +
							 'alt="' + configData.object[i].selections[j].id + '" /></p>' +
							 '</a>' +
							 '</div>';
					 }
 
					 outputHtml += '<label class="objet_resize ' + configData.object[i].id + '" for="' + configData.object[i].id + '-select"' +
						 ' itemw="' + configData.object[i].size.width +
						 '" itemh="' + configData.object[i].size.height +
						 '" itemt="' + configData.object[i].offset.top +
						 '" iteml="' + configData.object[i].offset.left +
						 '">' +
						 '<img class="selected"' +
						 ' id="' + configData.object[i].id + '"' +
						 ' src="' + objectImageURL + configData.object[i].selectedImage + '">' +
						 '<span>' + configData.object[i].name + '</span>' +
						 '<img class="spot objet_resize"' +
						 ' itemw="24" itemh="24"' +
						 ' itemt="' + configData.object[i].spotButton.offset.top +
						 '" iteml="' + configData.object[i].spotButton.offset.left +
						 '" src="' + objectImageURL + 'spot.png" />' +
						 '</label>' +
						 '</div>';
				 }
 
				 stageSetting.objectArea.innerHTML = outputHtml;
 
				 //@2022-05-27 simulator load 시, 본품컬러 default 세팅 (s)
				 // refrigerator
				 // $("#refrigerator_LT").val("st_green");
				 // $("#refrigerator_LB").val("st_silver");
				 // $("#refrigerator_RB").val("st_silver");
				 // simulator.setObject('refrigerator', 'refrigerator_LT', 'st_green');
				 // simulator.setObject('refrigerator', 'refrigerator_LB', 'st_silver');
				 // simulator.setObject('refrigerator', 'refrigerator_RB', 'st_silver');
				 // // refrigerator_convertible
				 // simulator.setObject('refrigerator_convertible', 'refrigerator_convertible_L', 'st_silver');
				 // simulator.setObject('refrigerator_convertible', 'refrigerator_convertible_M', 'st_silver');
				 // $("#refrigerator_convertible_L").val("st_silver");
				 // $("#refrigerator_convertible_M").val("st_silver");
				 //@2022-05-27 simulator load 시, 본품컬러 default 세팅 (e)
 
				 //오브젝트 세팅 후 클릭 이벤트 바인딩
				 var tmpObject = document.querySelectorAll('.object-app');
				 if (tmpObject !== null) {
					 for (var i = 0; i < tmpObject.length; i++) {
						 tmpObject[i].addEventListener('click', function () {
							 //console.log('clicked objet sub selection : ' + this.dataset.objectSelector);
 
							 if (this.classList.contains('selected'))
								 this.classList.remove('selected');
 
							 _self.selectObject(this.dataset.object, this.dataset.objectSelector);
						 });
					 }
				 }
 
				 //셀렉션 클릭 시
				 tmpObject = null;
				 tmpObject = document.querySelectorAll('.objet-selected');
				 if (tmpObject !== null) {
					 for (var i = 0; i < tmpObject.length; i++) {
						 tmpObject[i].addEventListener('click', function () {
							 if (this.checked) {
								 simulator.selectObject(this.value, null);
 
								 /*if(this.value == "refrigerator_convertible1" || this.value == "refrigerator_convertible2"){ $('.rf-con').show(); } //컨버터블 냉장고일 때 툴팁 노출
								 else{ $('.rf-con').hide(); }*/
 
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
					 }
				 }
 
				 _self.updateObjectPosition(); //오브젝트 init 후 위치값 rearrange
				 window.addEventListener('resize', function () {
					 _self.updateObjectPosition();
				 });
 
			 }
 
		 },
		 setObject: function (ID, targetID, colorCode, boolIsSet, colorSetName) {  // @2020-10-27 pck 인기조합 여부 변수 추가
 
			 var _self = this;
 
			 if (ID == null)
				 return false;
			 if (colorCode == null)
				 return false;
 
			 // @2020-10-27 pck 인기조합 여부 변수 추가 (s)
			 var isFavSet = false;
			 if (boolIsSet !== null) isFavSet = boolIsSet;
			 // @2020-10-27 pck 인기조합 여부 변수 추가 (e)
 
			 var targetId = targetID;
			 var index = findIndexByKeyValue(configData.object, 'id', ID); //@pck 2020-10-19 중복 선언 오류 통합
			 if (targetId == null) {
				 targetId = configData.object[selectedIndex].selections[0].id;
			 }
 
			 // ID refrigerator_convertible일 경우 재질 그룹 체크 PASS
			 var isPassCheckColorGroup = false;
			 if (ID == 'refrigerator_convertible') {
				 isPassCheckColorGroup = true;
			 }
			 // 선택한 컬러 코드로 해당 기기 컬러 선택
			 //alert(this.dataset.colorCode + ' / ' + this.dataset.targetObject + ' / ' + this.dataset.objectId);
 
			 var targetImage;
			 targetImage = document.querySelector('#' + targetId);
 
			 var selectionIndex = findIndexByKeyValue(configData.object[index].selections, 'id', targetId);
			 var surfaceIndex = findIndexByKeyValue(configData.object[index].selections[selectionIndex].Surface, 'colorCode', colorCode);
 
			 if (surfaceIndex == -1)
				 return false;
 
			 //사용자 선택 값 저장 부 (s)
			 var existIndex = 0;
			 existIndex = findIndexByKeyValue(userSelected.selectedObjet, 'selectedObject_id', configData.object[index].id);
 
			 //사용자 선택 값 구조
			 if (existIndex == -1) { //선택 영역 동일 오브제 id없을 때만 생성
				 if (configData.object[index].id === "refrigerator" || configData.object[index].id === "refrigerator_convertible") {
					 //@2022-05-18 장바구니 API 본품 모델명 추출 (s)
					 var tmpObject = {
						 selectedObject_id: configData.object[index].id,
						 selectedObject_name: configData.object[index].name,
						 selectedObject_complete: false,
						 selectedObject_different_color_group: false, //기본값 : false, 서로 다른 소재를 선택한 상태 : true
						 selectedObject_set_name: '',
						 selectedObject_modelIds: [{
							 selectedObject_modelId: configData.object[index].selections[selectionIndex].productInfo.modelId,
							 selectedObject_modelCode: configData.object[index].selections[selectionIndex].productInfo.modelCode
						 }],
						 selectedObject_desc: [{
							 selectedObjectSelection_id: configData.object[index].selections[selectionIndex].id,
							 selectedObjectSelectedSurface: configData.object[index].selections[selectionIndex].Surface[surfaceIndex].colorCode,
							 selectedObjectSelectedModelId: configData.object[index].selections[selectionIndex].Surface[surfaceIndex].modelId,
							 selectedObjectSelectedModelCode: configData.object[index].selections[selectionIndex].Surface[surfaceIndex].modelCode,
						 }]
					 };
					 //@2022-05-18 장바구니 API 본품 모델명 추출 (e)
				 } else {
					 var tmpObject = {
						 selectedObject_id: configData.object[index].id,
						 selectedObject_name: configData.object[index].name,
						 selectedObject_complete: false,
						 selectedObject_different_color_group: false, //기본값 : false, 서로 다른 소재를 선택한 상태 : true
						 selectedObject_set_name: '',
						 selectedObject_desc: [{
							 selectedObjectSelection_id: configData.object[index].selections[selectionIndex].id,
							 selectedObjectSelectedSurface: configData.object[index].selections[selectionIndex].Surface[surfaceIndex].colorCode
						 }]
					 };
				 }
 
				 //처음 부터 컬러세트 설정일 경우
				 if (isFavSet) {
					 tmpObject.selectedObject_complete = true;
					 tmpObject.selectedObject_set_name = colorSetName;
				 }
				 userSelected.selectedObjet.push(tmpObject);
 
				 //@2022-05-18 장바구니 API 데이터 (s)
				 userSelectedModelData.push(tmpObject);
				 //@2022-05-18 장바구니 API 데이터 (e)
			 } else {
				 var existSelectionIndex = 0;
				 existSelectionIndex = findIndexByKeyValue(userSelected.selectedObjet[existIndex].selectedObject_desc, 'selectedObjectSelection_id', targetId);
 
				 //선택 영역 오브제 내 동일 셀렉션 있는지 체크
				 if (existSelectionIndex == -1) {
					 if (configData.object[index].id === "refrigerator" || configData.object[index].id === "refrigerator_convertible") {
						 //@2022-05-18 장바구니 API 판넬 모델명 추출 (s)
						 var tmpObject = {
							 selectedObjectSelection_id: configData.object[index].selections[selectionIndex].id,
							 selectedObjectSelectedSurface: configData.object[index].selections[selectionIndex].Surface[surfaceIndex].colorCode,
							 selectedObjectSelectedModelId: configData.object[index].selections[selectionIndex].Surface[surfaceIndex].modelId,
							 selectedObjectSelectedModelCode: configData.object[index].selections[selectionIndex].Surface[surfaceIndex].modelCode
						 };
						 userSelected.selectedObjet[existIndex].selectedObject_desc.push(tmpObject);
 
						 var tmpObject_model = {
							 selectedObject_modelId: configData.object[index].selections[selectionIndex].productInfo.modelId,
							 selectedObject_modelCode: configData.object[index].selections[selectionIndex].productInfo.modelCode,
						 };
						 userSelected.selectedObjet[existIndex].selectedObject_modelIds.push(tmpObject_model);
						 //@2022-05-18 장바구니 API 판넬 모델명 추출 (e)
					 } else {
						 var tmpObject = {
							 selectedObjectSelection_id: configData.object[index].selections[selectionIndex].id,
							 selectedObjectSelectedSurface: configData.object[index].selections[selectionIndex].Surface[surfaceIndex].colorCode
						 };
					 }
				 } else {
					 if (configData.object[index].id === "refrigerator" || configData.object[index].id === "refrigerator_convertible") {
						 //@2022-05-18 장바구니 API 판넬 모델명 추출 (s)
						 userSelected.selectedObjet[existIndex].selectedObject_desc[existSelectionIndex].selectedObjectSelection_id = configData.object[index].selections[selectionIndex].id;
						 userSelected.selectedObjet[existIndex].selectedObject_desc[existSelectionIndex].selectedObjectSelectedSurface = configData.object[index].selections[selectionIndex].Surface[surfaceIndex].colorCode;
						 userSelected.selectedObjet[existIndex].selectedObject_desc[existSelectionIndex].selectedObjectSelectedModelId = configData.object[index].selections[selectionIndex].Surface[surfaceIndex].modelId;
						 userSelected.selectedObjet[existIndex].selectedObject_desc[existSelectionIndex].selectedObjectSelectedModelCode = configData.object[index].selections[selectionIndex].Surface[surfaceIndex].modelCode;
						 /*userSelected.selectedObjet[existIndex].selectedObject_modelIds = [{
							  configData.object[index].selections[selectionIndex].productInfo.modelId
						 }];*/
						 //@2022-05-18 장바구니 API 판넬 모델명 추출 (e)
					 } else {
						 userSelected.selectedObjet[existIndex].selectedObject_desc[existSelectionIndex].selectedObjectSelection_id = configData.object[index].selections[selectionIndex].id;
						 userSelected.selectedObjet[existIndex].selectedObject_desc[existSelectionIndex].selectedObjectSelectedSurface = configData.object[index].selections[selectionIndex].Surface[surfaceIndex].colorCode
					 }
				 }
			 }
 
			 //사용자 선택 완료 체크 부 - 한번 선택 완료 된 상태는 취소 할 수 있는 방법이 없다.
			 existIndex = findIndexByKeyValue(userSelected.selectedObjet, 'selectedObject_id', configData.object[index].id); //index 갱신
			 if (existIndex > -1) {
				 var isCompleteTrue = typeof (userSelected.selectedObjet[existIndex]) == 'undefined' ? false : userSelected.selectedObjet[existIndex].selectedObject_complete;
				 if (!isCompleteTrue) {
					 if (isFavSet) {
						 userSelected.selectedObjet[existIndex].selectedObject_complete = true;
						 userSelected.selectedObjet[existIndex].selectedObject_set_name = colorSetName;
					 } else {
						 userSelected.selectedObjet[existIndex].selectedObject_set_name = ''; //세트 선택이 아닐경우 초기화
						 //모든 셀렉션 선택 여부 확인 후 선택 완료 여부 기록
						 if (_self.isObjetSelectComplete(ID)) {
							 userSelected.selectedObjet[existIndex].selectedObject_complete = true;
						 }
					 }
 
				 } else { //완료 시에도 추천 세트가 아닐 경우 초기화
					 if (isFavSet) {
						 userSelected.selectedObjet[existIndex].selectedObject_set_name = colorSetName;
					 } else {
						 userSelected.selectedObjet[existIndex].selectedObject_set_name = '';
					 }
				 }
			 }
			 //사용자 선택 값 저장 부 (e)
 
			 // @pck 2020-10-19 신규 추가 (s)
			 // 이미지 선택 시 기존 동일 컬러 코드 그룹 선택 여부 확인
			 // @pck 2020-11-01 동일 컬러 정책 ROLLBACK
			 // @pck 2020-11-07 서로 다른 그룹군 선택시 알림 얼럿 출력
			 // @pck 2020-11-28 사용자 저장 데이터 구조 변경 가전 > 가전 도어선택
			 var existObjects = userSelected.selectedObjet.filter(function (value) { return value.selectedObject_id == ID });
 
			 if (existObjects[0].selectedObject_desc.length > 0 && !isFavSet && !isPassCheckColorGroup) {
 
				 function colorGroupCheck() {
					 var selectedColorGroupIndex = findGroupIndexByColorCode(index, colorCode);
					 if (selectedColorGroupIndex !== -1) {
						 if (existObjects.length > 0) {
							 for (var i = 0; i < existObjects[0].selectedObject_desc.length; i++) {
								 var existColorGroupIndex = -1;
								 existColorGroupIndex = findGroupIndexByColorCode(index, existObjects[0].selectedObject_desc[i].selectedObjectSelectedSurface);
 
								 if (existColorGroupIndex !== -1) {
									 if (selectedColorGroupIndex !== existColorGroupIndex) {
										 // 동일한 그룹이 아니어서 false처리
										 existColorGroupIndex = -1;
										 return false;
									 }
								 }
							 }
						 }
						 return true;
					 }
				 }
 
				 //기존 선택에서 변경은 PASS
				 if (!colorGroupCheck()) { //서로 다른 그룹 호출 시 안내 alert 호출
					 var colorWarningPopup = document.querySelector('.color_warning_popup') !== null ?
						 document.querySelector('.color_warning_popup') : false;
 
					 //if(colorWarningPopup.classList.contains('actived')) colorWarningPopup = false;
 
					 if (colorWarningPopup) {
						 colorWarningPopup.style.display = 'block';
						 colorWarningPopup.classList.add('actived');
						 let selObj = $(".object-app.active").attr("data-object-selector");
						 let warningDoorDefaultImg = objectImageURL + configData.object[index].selections[selectionIndex].defaultImage;
						 //console.log("warningDoorDefaultImg",warningDoorDefaultImg);
 
						 setTimeout(function () {
							 document.querySelector(".object-app.active").classList.remove("select", "selected");
							 document.querySelector(".object-app.active img").setAttribute("src", warningDoorDefaultImg);
							 $(".btn-objet").removeClass("active");
							 $("#" + selObj).val("");
							 let existIndex = -1,
								 existSelectionIndex = -1;
							 let selectedColorCode = '';
							 existIndex = findIndexByKeyValue(userSelected.selectedObjet, 'selectedObject_id', ID);
 
							 if (existIndex !== -1) {
								 existSelectionIndex = findIndexByKeyValue(userSelected.selectedObjet[existIndex].selectedObject_desc, 'selectedObjectSelection_id', targetId);
 
								 if (existSelectionIndex !== -1) {
									 userSelected.selectedObjet[existIndex].selectedObject_desc[existSelectionIndex].selectedObjectSelectedSurface = "";
									 selectedColorCode = userSelected.selectedObjet[existIndex].selectedObject_desc[existSelectionIndex].selectedObjectSelectedSurface;
								 }
							 }
 
						 }, 100);
 
					 }
 
					 userSelected.selectedObjet[existIndex].selectedObject_different_color_group = false;
				 } else {
					 userSelected.selectedObjet[existIndex].selectedObject_different_color_group = false;
				 }
			 }
			 // @pck 2020-10-19 신규 추가 (e)
 
 
			 //이미지 변경
			 if (targetImage !== null) {
				 var targetImgFilename = configData.object[index].selections[selectionIndex].Surface[surfaceIndex].filename;
				 targetImage.src = objectImageURL + targetImgFilename;
			 }
 
			 //@pck 2020-10-19
			 //기존 선택 표시 부 selected 상태 추가 삭제
			 var objects = document.querySelectorAll('.object-app');
			 if (objects.length > 0) {
				 for (var i = 0; i < objects.length; i++) {
					 if (objects[i].classList.contains('active') || isFavSet) {
						 objects[i].classList.add('selected', 'select'); // @pck 2020-11-01 기존 선택 된 적이 있을 경우 상태 select 클래스 추가
					 }
				 }
			 }
			 return true;
		 },
 
		 resetSelectedObject: function (ID) { //@pck 2020-10-19 초기화 함수 추가
			 if (ID == null)
				 return false;
 
			 while (true) {
				 var resetTargetIndex = -1;
				 resetTargetIndex = findIndexByKeyValue(userSelected.selectedObjet, 'selectedObject_id', ID);
				 if (resetTargetIndex !== -1) {
					 if (userSelected.selectedObjet[resetTargetIndex].selectedObject_id == ID) {
						 userSelected.selectedObjet.splice(resetTargetIndex, 1);
					 }
				 } else {
					 break;
				 }
			 }
 
			 var index = findIndexByKeyValue(configData.object, 'id', ID);
 
			 for (var i = 0; i < configData.object[index].selections.length; i++) {
				 var targetImage;
				 targetImage = document.querySelector('#' + configData.object[index].selections[i].id);
				 if (targetImage !== null) {
					 var targetImgFilename = configData.object[index].selections[i].defaultImage;
					 targetImage.src = objectImageURL + targetImgFilename;
				 }
			 }
			 return true;
		 },
 
		 updateObjectPosition: function () {
 
			 //var fullwidth = stageSetting.width;
 
			 var slider = {};
			 slider = document.querySelector('.simulator.full .obj-swiper-container .swiper-wrapper');
 
			 //var ratio = objectHeight / stageSetting.height * 100;
			 var ratio = (slider.offsetHeight / stageSetting.height) * 100; //section 4 slide
 
			 var objectsItems = document.querySelectorAll('.objet_object .objet_resize');
 
			 for (var i = 0; i < objectsItems.length; i++) {
				 var itemWidth = objectsItems[i].getAttribute('itemw');
				 var itemTop = objectsItems[i].getAttribute('itemt');
				 var itemLeft = objectsItems[i].getAttribute('iteml');
				 var itemHeight = objectsItems[i].getAttribute('itemh');
 
				 var objectWidth = itemWidth * ratio / 100;
				 var objectHeight = itemHeight * ratio / 100;
				 var objectTop = itemTop * ratio / 100;
				 var objectLeft = itemLeft * ratio / 100;
 
				 objectsItems[i].style.width = objectWidth + 'px';
				 objectsItems[i].style.height = objectHeight + 'px';
				 objectsItems[i].style.top = objectTop + 'px';
				 objectsItems[i].style.left = objectLeft + 'px';
			 }
		 },
 
		 selectObject: function (ID, targetID) {
			 if (ID == null)
				 return false;
 
			 var targetId = targetID;
 
			 var selectedIndex = findIndexByKeyValue(configData.object, 'id', ID);
 
			 if (targetId == null) {
				 targetId = configData.object[selectedIndex].selections[0].id;
			 }
 
			 //다른 체크 박스들 체크 해제
			 var appliacncesListObjects = stageSetting.appliacncesListArea.querySelectorAll('input[type=checkbox]');
			 for (var i = 0; i < appliacncesListObjects.length; i++) {
				 if (i !== selectedIndex) {
					 appliacncesListObjects[i].checked = false;
				 } else {
					 appliacncesListObjects[i].checked = true;
				 }
			 }
 
			 //선택 된 오브젝트 활성화
			 var objects = document.querySelectorAll('.object-app');
			 if (objects.length > 0) {
				 for (var i = 0; i < objects.length; i++) {
					 if (objects[i].dataset.objectSelector == targetId) {
						 objects[i].classList.add('active');
					 } else {
						 objects[i].classList.remove('active');
						 objects[i].classList.add('selected'); //다중 선택 시 선택 외 선택 부 선택완료상태 추가
					 }
				 }
			 }
 
			 //스테이지에 있는 오브제 활성화
			 objects = null;
			 objects = document.querySelectorAll('input[name=objet-selected]');
			 if (objects !== null) {
				 for (var i = 0; i < objects.length; i++) {
					 if (objects[i].value == ID) {
						 objects[i].checked = true;
					 } else {
						 objects[i].checked = false;
					 }
				 }
			 }
 
			 _self.updateSideBar(ID, targetId);
			 _self.showRightSideOptions(ID, 0);
		 },
 
		 updateSideBar: function (ID, targetID) {
			 // console.log('(ID) ' +ID)
			 // console.log('(targetID) ' +targetID)
			 if (ID == null) {
				 var selectedObjet = stageSetting.appliacncesListArea.querySelector('input:checked');
				 if (selectedObjet !== null) {
					 ID = selectedObjet.id;
				 } else {
					 return false;
				 }
			 }
			 var targetId = targetID;
 
			 var index = findIndexByKeyValue(configData.object, 'id', ID);
 
			 if (targetId == null) {
				 targetId = configData.object[index].selections[0].id;
			 }
 
			 var arraySelectedSurface = configData.object[index].supportedSurface;
			 var arraySelectedName = configData.object[index].name;
			 var arraySelectedSlide = configData.object[index].slideIndex;
 
			 if (arraySelectedSurface == null || arraySelectedSurface.length == null || typeof arraySelectedSurface == 'undefined')
				 return false;
 
			 /* sample HTML
			 <div class="select_objet_item">
				  <p class="name">Fenix<button type="button" class="btn-Tooltip">Tooltip</button></p>
					<ul>
						  <li><button type="button" class="btn-objet active">페닉스<br />보타닉</button></li>
					 <li><button type="button" class="btn-objet">페닉스<br />샌드</button></li>
						  <li><button type="button" class="btn-objet">페닉스<br />스톤</button></li>
					</ul>
			 </div>
			 */
 
			 // 소재와 컬러 선택 부 (s)
			 var existIndex = -1,
				 existSelectionIndex = -1;
			 var selectedColorCode = '';
 
			 existIndex = findIndexByKeyValue(userSelected.selectedObjet, 'selectedObject_id', ID);
 
			 if (existIndex !== -1) {
				 existSelectionIndex = findIndexByKeyValue(userSelected.selectedObjet[existIndex].selectedObject_desc, 'selectedObjectSelection_id', targetId);
 
				 if (existSelectionIndex !== -1) {
					 selectedColorCode = userSelected.selectedObjet[existIndex].selectedObject_desc[existSelectionIndex].selectedObjectSelectedSurface;
				 }
			 }
 
			 var outputHtml = '';
			 var classes = '';
			 //@2022-05-27 재질컬러 순서변경 (s)
			 var collectionHtml = '';
			 //@2022-05-27 재질컬러 순서변경 (e)
 
			 for (var i = 0; i < arraySelectedSurface.length; i++) {
				 /*outputHtml += '<div class="select_objet_item">' +
						'<p class="name">' + arraySelectedSurface[i].name + '<button type="button" class="btn-Tooltip" onClick="tooltipOpen(this);" value="'+ arraySelectedSurface[i].name +'">Tooltip</button></p>' +
						'<ul>';*/
 
				 outputHtml += '<div class="select_objet_item">';
				 outputHtml += '<p class="name">';
				 outputHtml += arraySelectedSurface[i].name + '<button type="button" class="btn-Tooltip" onClick="tooltipOpen(this);" value="' + arraySelectedSurface[i].name + '">Tooltip</button>';
 
				 //@2022-05-18 냉장고 판넬 가격표기 (s)
				 /*if(configData.object[index].id === "refrigerator" || configData.object[index].id === "refrigerator_convertible"){
					  outputHtml += '<span style="position:absolute; top:0; right:-45px; color:red;">' + arraySelectedSurface[i].price + '</span>';
				 }*/
				 //@2022-05-18 냉장고 판넬 가격표기 (e)
 
				 outputHtml += '</p>';
				 outputHtml += '<ul>';
 
				 for (var j = 0; j < arraySelectedSurface[i].colors.length; j++) {
 
					 (selectedColorCode == arraySelectedSurface[i].colors[j].colorCode) ? classes = 'active' : classes = '';
					 let slideLocation = '';
					 if (arraySelectedSlide == 0) {
						 slideLocation = "kitchen";
					 } else if (arraySelectedSlide == 1) {
						 slideLocation = "Utility Room";
					 } else if (arraySelectedSlide == 2) {
						 slideLocation = "Living Room";
					 }
					 outputHtml += '<li>' +
						 '<button type="button" class="btn-objet ' + classes + '" ' +
						 'style="background-image:url(' + objectImageURL + arraySelectedSurface[i].colors[j].colorChip + ');" ' +
						 'data-color-code="' + arraySelectedSurface[i].colors[j].colorCode + '" data-target-object="' + targetId + '" data-object-id="' + ID + '" data-link-name="' + slideLocation + '-' + arraySelectedName + '-' + arraySelectedSurface[i].colors[j].name + '">' +
						 arraySelectedSurface[i].colors[j].name + '</button>' +
						 '</li>';
 
				 }
				 outputHtml += '</ul>' +
					 '</div>';
 
			 }
 
			 var targetSideBarArea = (typeof document.querySelector('[data-simulator-sidebar-selector-area]') !== 'undefined') ?
				 document.querySelector('[data-simulator-sidebar-selector-area]') : null;
 
			 //이전 선택 위치 저장
			 var scrollx = 0
			 /*if(window.Scrollbar.has(targetSideBarArea)){
					scrollx = window.Scrollbar.get(targetSideBarArea).offset.x;
			 }
			 if( targetSideBarArea.querySelector('.active') !== null ) {
					scrollx = targetSideBarArea.querySelector('.active').offsetParent.offsetLeft;
			 }*/
 
			 //targetSideBarArea.innerHTML = outputHtml;
 
			 /*
			 if (targetSideBarArea !== null) {
					var scrollbar = window.Scrollbar;
					if(window.Scrollbar.has(targetSideBarArea)){
						  var scrollx = window.Scrollbar.get(targetSideBarArea).offset.x;
						  window.Scrollbar.get(targetSideBarArea).destroy();
						  targetSideBarArea.innerHTML = outputHtml;
						  scrollbar.init(targetSideBarArea, {});
						  var left = targetSideBarArea.querySelector('.active') ? targetSideBarArea.querySelector('.active').offsetParent.offsetLeft : 0;
						  scrollbar.scrollLeft = left;
								  //window.Scrollbar.get(targetSideBarArea).scrollTo(scrollx, 0, 0);
						 
					}else{
						  targetSideBarArea.innerHTML = outputHtml;
						  scrollbar.init(targetSideBarArea, { });
					}
			 }
			 */
 
			 //@2022-05-29 옵션 카피 수정 (s)
			 if (targetSideBarArea !== null && window.Scrollbar) {
				 if (window.Scrollbar.has(targetSideBarArea)) {
 
					 window.Scrollbar.get(targetSideBarArea).destroy();
 
					 //@2022-05-18 본품컬러 일괄선택 추가 (s)
					 var model_price;
 
					 if (ID === "refrigerator") {
						 for (var i = 0; i < configData.object.length; i++) {
							 if (configData.object[i].id === "refrigerator") {
								 model_price = configData.object[i].price.product;
							 }
						 }
 
						 collectionHtml += '<div class="collection_wrap">';
						 collectionHtml += '<div class="main_color_wrap"> <p class="main_tooltip">LG’s recommended Colour</p> ';
						 collectionHtml += '<div class="img_wrap"> <img src="images/objet/simulator/appliances/rf/ico/refrigerator_img.png" alt=""/></div>';
						 collectionHtml += '<div class="txt_wrap"> <span>LG InstaView Objet Collection</span> <p>617L French Door Fridge </br>Green & Silver Stainless Steel</p> <span class="price_num">' + model_price + '</span>';
						 collectionHtml += '<div class="btn_wrap"> <button type="button" class="btn_modelRestBtn" data-objet-id="refrigerator" data-setting-btn="refrigeratorSetBtn">Add to Cart</button> </div> </div></div>';
						 collectionHtml += '</div>';
					 }
					 if (ID === "refrigerator_convertible") {
						 for (var i = 0; i < configData.object.length; i++) {
							 if (configData.object[i].id === "refrigerator" || configData.object[i].id === "refrigerator_convertible") {
								 model_price = configData.object[i].price.product;
							 }
						 }
						 if (targetID === 'refrigerator_convertible_L') {
							 collectionHtml += '<div class="collection_wrap">';
							 collectionHtml += '<div class="main_color_wrap"> <p class="main_tooltip">LG’s recommended Colour</p> ';
							 collectionHtml += '<div class="img_wrap"> <img src="images/objet/simulator/appliances/rf_con/ico/Fridge_img.png" alt=""/></div>';
							 collectionHtml += '<div class="txt_wrap"> <span>LG Fridge Objet Collection</span> <p>386L Single Door Bar Fridge </br>Silver Stainless Steel</p> <span class="price_num">' + model_price + '</span>';
							 collectionHtml += '<div class="btn_wrap">  <button type="button" class="btn_modelRestBtn" data-objet-id="refrigerator_convertible_L" data-setting-btn="convertibleLSetBtn">Add to Cart</button> </div> </div></div>';
							 collectionHtml += '</div>';
						 }
						 if (targetID === 'refrigerator_convertible_M') {
							 collectionHtml += '<div class="collection_wrap">';
							 collectionHtml += '<div class="main_color_wrap"> <p class="main_tooltip">LG’s recommended Colour</p> ';
							 collectionHtml += '<div class="img_wrap"> <img src="images/objet/simulator/appliances/rf_con/ico/Freezer_img.png" alt=""/></div>';
							 collectionHtml += '<div class="txt_wrap"> <span>LG Freezer Objet Collection</span> <p>324L Upright Bar Freezer </br> Silver Stainless Steel</p> <span class="price_num">' + model_price + '</span>';
							 collectionHtml += '<div class="btn_wrap"> <button type="button" class="btn_modelRestBtn" data-objet-id="refrigerator_convertible_M" data-setting-btn="convertibleMSetBtn">Add to Cart</button> </div></div></div>';
							 collectionHtml += '</div>';
						 }
					 }
					 //@2022-05-18 본품컬러 일괄선택 추가 (e)
 
					 $(".select_objet_list .type01 > p").length < 1 && $(".select_objet_list > .type01").prepend('<p></p>')
					 document.querySelector('.select_objet_list .type01 > p').innerHTML = collectionHtml
					 targetSideBarArea.innerHTML = outputHtml;
 
					 var scrollbar = window.Scrollbar.init(targetSideBarArea);
					 //console.log(targetSideBarArea);
 
					 var left = 0;
					 if (targetSideBarArea.querySelector('.active') !== null) {
						 left = targetSideBarArea.querySelector('.active').offsetParent.offsetLeft;
					 }
 
					 // 정책 변경 - 오브제 가전 이동 시에만 이동
					 var selectedObjetCheckbox = document.querySelector('input#' + ID + '-select') !== null ?
						 document.querySelector('input#' + ID + '-select') : null;
 
					 selectedObjetCheckbox = selectedObjetCheckbox.classList.contains('editing') ? true : false;
 
					 if (targetSideBarArea.querySelector('.active') == null && selectedObjetCheckbox) {
						 //left = scrollx;
						 left = 0;
					 }
					 scrollbar.scrollLeft = left;
 
					 $(".select_objet_item").each(function () {
						 var licnt = $(this).find("li").length;
						 var widthH = 0;
						 $(this).find("li").each(function () {
							 widthH += $(this).outerWidth();
						 });
						 widthH = widthH + ((licnt - 1) * 10);
						 var widthH2 = widthH + "px";
						 $(this).css("width", widthH2);
					 });
				 } else {
					 //@2022-05-18 본품컬러 일괄선택 추가 (s)
					 var model_price;
 
					 if (ID === "refrigerator") {
						 for (var i = 0; i < configData.object.length; i++) {
							 if (configData.object[i].id === "refrigerator") {
								 model_price = configData.object[i].price.product;
							 }
						 }
						 collectionHtml += '<div class="collection_wrap">';
						 collectionHtml += '<div class="main_color_wrap"> <p class="main_tooltip">LG’s recommended Colour</p> ';
						 collectionHtml += '<div class="img_wrap"> <img src="images/objet/simulator/appliances/rf/ico/refrigerator_img.png" alt=""/></div>';
						 collectionHtml += '<div class="txt_wrap"> <span>LG InstaView Objet Collection</span> <p>617L French Door Fridge </br>Green & Silver Stainless Steel</p> <span class="price_num">' + model_price + '</span>';
						 collectionHtml += '<div class="btn_wrap"> <button type="button" class="btn_modelRestBtn" data-objet-id="refrigerator" data-setting-btn="refrigeratorSetBtn">Add to Cart</button> </div> </div></div>';
						 collectionHtml += '</div>';
					 }
					 if (ID === "refrigerator_convertible") {
						 for (var i = 0; i < configData.object.length; i++) {
							 if (configData.object[i].id === "refrigerator" || configData.object[i].id === "refrigerator_convertible") {
								 model_price = configData.object[i].price.product;
							 }
						 }
						 if (targetID === 'refrigerator_convertible_L') {
							 collectionHtml += '<div class="collection_wrap">';
							 collectionHtml += '<div class="main_color_wrap"> <p class="main_tooltip">LG’s recommended Colour</p> ';
							 collectionHtml += '<div class="img_wrap"> <img src="images/objet/simulator/appliances/rf_con/ico/Fridge_img.png" alt=""/></div>';
							 collectionHtml += '<div class="txt_wrap"> <span>LG Fridge Objet Collection</span> <p>386L Single Door Bar Fridge </br>Silver Stainless Steel</p> <span class="price_num">' + model_price + '</span>';
							 collectionHtml += '<div class="btn_wrap">  <button type="button" class="btn_modelRestBtn" data-objet-id="refrigerator_convertible_L" data-setting-btn="convertibleLSetBtn">Add to Cart</button> </div> </div></div>';
							 collectionHtml += '</div>';
						 }
						 if (targetID === 'refrigerator_convertible_M') {
							 collectionHtml += '<div class="collection_wrap">';
							 collectionHtml += '<div class="main_color_wrap"> <p class="main_tooltip">LG’s recommended Colour</p> ';
							 collectionHtml += '<div class="img_wrap"> <img src="images/objet/simulator/appliances/rf_con/ico/Freezer_img.png" alt=""/></div>';
							 collectionHtml += '<div class="txt_wrap"> <span>LG Freezer Objet Collection</span> <p>324L Upright Bar Freezer </br> Silver Stainless Steel</p> <span class="price_num">' + model_price + '</span>';
							 collectionHtml += '<div class="btn_wrap"> <button type="button" class="btn_modelRestBtn" data-objet-id="refrigerator_convertible_M" data-setting-btn="convertibleMSetBtn">Add to Cart</button> </div></div></div>';
							 collectionHtml += '</div>';
						 }
					 }
					 //@2022-05-18 본품컬러 일괄선택 추가 (e)
 
					 $(".select_objet_list .type01 > p").length < 1 && $(".select_objet_list > .type01").prepend('<p></p>')
					 document.querySelector('.select_objet_list .type01 > p').innerHTML = collectionHtml
					 targetSideBarArea.innerHTML = outputHtml;
 
					 window.Scrollbar.init(targetSideBarArea);
				 }
 
				 //@2022-05-18 선택값에 따라 select_objet 타이틀 변경 (s)
				 var objectColorPopupTitle = document.querySelector('[data-simulator-sidebar-title]'),
					 activeObjetSelector = "";
				 var outputTitleHtml = "";
				 var panel_price;
 
				 if (ID === "refrigerator" || ID === "refrigerator_convertible") {
					 if (ID === "refrigerator") {
						 if (targetID === "refrigerator_LT") activeObjetSelector = '<i>Top</i> Left Panel';
						 if (targetID === "refrigerator_LB") activeObjetSelector = '<i>Bottom</i> Left Panel';
						 if (targetID === "refrigerator_RB") activeObjetSelector = '<i>Bottom</i> Right Panel';
 
						 for (var i = 0; i < configData.object.length; i++) {
							 if (configData.object[i].id === "refrigerator") {
								 panel_price = configData.object[i].price.panel;
							 }
						 }
						 outputTitleHtml += "<strong>Customize your Material and Colours</strong>";
						 outputTitleHtml += "<span> " + activeObjetSelector + "</span>";
						 // outputTitleHtml += "<em><span>Cost for color change</span> (Panel + Service cost)<br>";
						 // outputTitleHtml += panel_price;
					 }
 
					 if (ID === "refrigerator_convertible") {
						 if (targetID === "refrigerator_convertible_L") activeObjetSelector = "Bar Fridge";
						 if (targetID === "refrigerator_convertible_M") activeObjetSelector = "Bar Freezer";
 
						 for (var i = 0; i < configData.object.length; i++) {
							 if (configData.object[i].id === "refrigerator_convertible") {
								 panel_price = configData.object[i].price.panel;
							 }
						 }
						 outputTitleHtml += "<strong>Customize your Material and Colours</strong>";
						 outputTitleHtml += "<span> " + activeObjetSelector + "</span>";
					 }
				 } else {
					 outputTitleHtml += "Materials and colors";
				 }
 
				 objectColorPopupTitle.innerHTML = outputTitleHtml;
				 //@2022-05-18 선택값에 따라 select_objet 타이틀 변경 (e)
			 }
			 //@2022-05-29 옵션 카피 수정 (e)
 
			 //오브젝트 세팅 후 클릭 이벤트 바인딩
			 function objectActive(event) {
				 var _this = event.target;
				 if (!_this.classList.contains('active')) {
 
					 // @pck 2020-10-19 로직 변경 (s)
					 if (_self.setObject(_this.dataset.objectId, _this.dataset.targetObject, _this.dataset.colorCode)) {
						 var tmpObjectTarget = document.querySelectorAll('.btn-objet');
						 if (tmpObjectTarget.length > 0) {
							 for (var i = 0; i < tmpObjectTarget.length; i++) {
								 if (tmpObjectTarget[i] == _this) {
									 tmpObjectTarget[i].classList.add('active');
								 } else {
									 tmpObjectTarget[i].classList.remove('active');
								 }
							 }
						 }
						 $("#" + _this.dataset.targetObject).val(_this.dataset.colorCode);
					 }
					 //@pck 2020-11-01 컬러 동일 그룹 정책 ROLLBACK
					 else {
 
						 var tmpObjectTarget = document.querySelectorAll('.btn-objet');
						 if (tmpObjectTarget.length > 0) {
							 for (var i = 0; i < tmpObjectTarget.length; i++) {
								 if (tmpObjectTarget[i] == _this) {
									 tmpObjectTarget[i].classList.add('pre-active');
								 } else {
									 tmpObjectTarget[i].classList.remove('pre-active');
								 }
							 }
						 }
 
						 // 경고 팝업 노출
						 document.querySelector('.color_warning_popup').style.display = 'block';
					 }
					 // @pck 2020-10-19 로직 변경 (e)
					 return true;
				 }
				 return false;
			 }
 
			 var tmpObject = document.querySelectorAll('.btn-objet');
 
			 if (tmpObject.length > 0) {
				 for (var i = 0; i < tmpObject.length; i++) {
					 tmpObject[i].addEventListener('click', objectActive.bind(this));
				 }
			 }
			 // 소재와 컬러 선택 부 (e)
 
			 //@2022-05-18 Glass → 본품 선택시, refresh 버튼 초기화 기능 테스트중 (s)
			 /*$(".btn_refresh").on("click", function(){
				  // 장바구니 데이터 삭제
				  for (var i=0; i<userSelectedModelData.length; i++){
						if(userSelectedModelData[i].selectedObject_id == "refrigerator") userSelectedModelData.splice(i,1);
				  }
				  // 선택값 초기화
				  simulator.resetSelectedObject('refrigerator','refrigerator_LT');
				  simulator.resetSelectedObject('refrigerator','refrigerator_LB');
				  simulator.resetSelectedObject('refrigerator','refrigerator_RB');
				  // 팝업 숨김
				  $(".color_warning_popup").closest(".layer_popup").fadeOut();
			 });*/
			 //@2022-05-18 Glass → 본품 선택시, refresh 버튼 초기화 기능 테스트중 (e)
 
			 //@2022-05-18 본품컬러 일괄선택 기능추가 (s)
			 let tmpObjectTarget = document.querySelectorAll('.btn-objet'); // 컬러 엘리먼트
			 let objects = document.querySelectorAll('.object-app'); // 패널 엘리먼트
 
			 // 본품 컬러 선택하기 버튼
			 $(".mainColorSet").on("click", function () {
				 let mainColorSetID = $(this).attr('id');
				 mainColorFun(mainColorSetID);
			 });
 
			 /*$(".btn_modelRestBtn").on("click", function(){
				  let mainColorSetID = $(this).data('setting-btn');
				  mainColorFun(mainColorSetID);
			 });*/
 
			 function mainColorFun(btnID) {
				 let selectColor;
				 if (btnID === 'refrigeratorSetBtn') {
					 // 장바구니 데이터 삭제
					 for (var i = 0; i < userSelectedModelData.length; i++) {
						 if (userSelectedModelData[i].selectedObject_id == "refrigerator") userSelectedModelData.splice(i, 1);
					 }
					 // Mist Glass 선택 후 본품컬러(Solid Metal) 선택시 기능막혀있는 부분 예외처리
					 simulator.resetSelectedObject('refrigerator');
					 // simulator.resetSelectedObject('refrigerator','refrigerator_LT');
					 // simulator.resetSelectedObject('refrigerator','refrigerator_LB');
					 // simulator.resetSelectedObject('refrigerator','refrigerator_RB');
 
					 $("#refrigerator_LT").val("st_green");
					 $("#refrigerator_LB").val("st_silver");
					 $("#refrigerator_RB").val("st_silver");
					 simulator.setObject('refrigerator', 'refrigerator_LT', 'st_green');
					 simulator.setObject('refrigerator', 'refrigerator_LB', 'st_silver');
					 simulator.setObject('refrigerator', 'refrigerator_RB', 'st_silver');
 
				 } else if (btnID === 'convertibleLSetBtn') {
					 simulator.setObject('refrigerator_convertible', 'refrigerator_convertible_L', 'st_silver');
					 $("#refrigerator_convertible_L").val("st_silver");
 
				 } else if (btnID === 'convertibleMSetBtn') {
					 simulator.setObject('refrigerator_convertible', 'refrigerator_convertible_M', 'st_silver');
					 $("#refrigerator_convertible_M").val("st_silver");
				 }
				 // 현재 선택된 컬러 값
				 for (let i = 0; i < objects.length; i++) {
					 if (objects[i].classList.contains('active')) {
						 selectColor = objects[i].querySelector('img').value;
					 }
				 }
				 // 현재 선택된 컬러 값과 active 매칭
				 for (let i = 0; i < tmpObjectTarget.length; i++) {
					 if (tmpObjectTarget[i].getAttribute('data-color-code') === selectColor) {
						 tmpObjectTarget[i].classList.add('active');
					 } else {
						 tmpObjectTarget[i].classList.remove('active');
					 }
				 }
			 }
			 //@2022-05-18 본품컬러 일괄선택 기능추가 (e)
 
			 // 인기조합 선택 부 (s)
			 /*
			 ex Html
					<li><button type="button" class="btn-favo btn-name01" data-id="name01">Name01</button></li>
			  */
			 /*
								  var targetSideBarFavArea = (typeof document.querySelector('[data-simulator-sidebar-fav-area]') !== 'undefined') ?
										 document.querySelector('[data-simulator-sidebar-fav-area]') : null;
			  
								  var targetObjetIndex = findIndexByKeyValue(proposeSetObjetSelections, 'id', ID);
								  if (proposeSetObjetSelections[targetObjetIndex] == null) {
										 targetSideBarFavArea.innerHTML = '<div class="no-fav-item">해당 제품은 <br />인기 조합이 <br />없습니다.</div>';
										 return false;
								  }
			  
								  var arrayProposeSetObjetSelections = proposeSetObjetSelections[targetObjetIndex].objet_set; //인기조합, ID값으로 해당 기기에 정의된 데이터 가져오기
								  if (arrayProposeSetObjetSelections == null || arrayProposeSetObjetSelections.length == null || typeof arrayProposeSetObjetSelections == 'undefined')
										 return false;
			  
								  var outputHtml = '';
			  
								  for (var i = 0; i < arrayProposeSetObjetSelections.length; i++) {
										 //console.log(arrayProposeSetObjetSelections[i].name);
										 outputHtml += '<li class="subtitle"><h4>' + arrayProposeSetObjetSelections[i].name + '</h4></li>'
										 for (var j = 0; j < arrayProposeSetObjetSelections[i].sets.length; j++) {
												//console.log(arrayProposeSetObjetSelections[i].sets[j].setName);
												outputHtml += '<li><button type="button" class="btn-favo" data-object-id="' + ID + '" data-objet-index="' + targetObjetIndex + '" data-objet-sets-index="' + i + '" ' + '" data-objet-set-index="' + j + '" ' +
														'style="background-image:url(' + objectImageURL + arrayProposeSetObjetSelections[i].sets[j].setCoverImage + ');" ' +
														'>' + arrayProposeSetObjetSelections[i].sets[j].setName + '</button></li>';
										 }
			  
								  }
			  
								  var favArea = document.querySelector('.fav-area');
								  if (favArea !== null) {
										 var scrollbar = window.Scrollbar;
										 if(window.Scrollbar.has(favArea)){
											  
												var scrollx = window.Scrollbar.get(favArea).offset.x;
			  
												window.Scrollbar.get(favArea).destroy();
												targetSideBarFavArea.innerHTML = outputHtml;
												scrollbar.init(favArea, {});
												window.Scrollbar.get(favArea).scrollTo(scrollx, 0, 0);
											  
										 }else{
												targetSideBarFavArea.innerHTML = outputHtml;
												scrollbar.init(favArea, {});
										 }
								  }
								  */
			 /*
			 var favlength = $(favArea).find("li").length,favlength2 = $(favArea).find("li.subtitle").length;
			 var favlength3 =((favlength - favlength2) * 80) + (favlength * 16 ) + ( favlength2 * 50);
			 $(".scroll-content").css("width",  favlength3 );
			 */
			 function scrollFavScrollbar() {
				 if (typeof Scrollbar == "function") {
					 _self.isSideScrollBarButtonClickEvent = true; // @pck 2020-10-27
					 var screenHeight = window.innerHeight - 122; //아이템 개당 높이 122px
					 var targetEl = document.querySelector('.fav-area');
 
					 if (window.Scrollbar.has(targetEl)) {
						 var scrollbar = window.Scrollbar.get(targetEl);
						 scrollbar.update();
						 scrollbar.scrollTo(0, (scrollbar.scrollTop + screenHeight), 500);
					 } else {
						 var scrollbar = window.Scrollbar;
						 scrollbar.init(targetEl, {});
					 }
				 }
			 }
			 var favScrollButton = document.querySelector('[data-fav-scroll-down]');
			 if ((favScrollButton !== null) && (!this.isSideScrollBarButtonClickEvent))
				 favScrollButton.addEventListener('click', scrollFavScrollbar.bind());
			 // 인기조합 선택 부 (e)
 
 
			 // 인기조합 제안
			 function proposeSetObjetSelection(event) {
				 var _this = event.toElement;
				 var objetIndex = _this.dataset.objetIndex;
 
				 if (objetIndex == null) return false;
 
				 var setsIndex = _this.dataset.objetSetsIndex;
				 if (setsIndex == null) return false;
 
				 var setIndex = _this.dataset.objetSetIndex;
				 if (setIndex == null) return false;
 
				 var ID = _this.dataset.objectId;
				 if (ID == null) return false;
 
				 var favoSet = proposeSetObjetSelections[objetIndex].objet_set[setsIndex].sets[setIndex].objetSelection; //세트 objetSelection array
 
				 if (favoSet.length > 0) {
					 for (var i = 0; i < favoSet.length; i++) {
						 _self.setObject(ID, favoSet[i].objetSelection_id, favoSet[i].objetSelection_colorCode, true, proposeSetObjetSelections[objetIndex].objet_set[setsIndex].sets[setIndex].setName); // @2020-10-27 pck 인기조합 여부 변수 추가
 
						 $("#" + favoSet[i].objetSelection_id).val(favoSet[i].objetSelection_colorCode);
 
					 }
				 }
 
				 // toggle Active class
				 var tmpObject = document.querySelectorAll('.btn-favo');
 
				 if (tmpObject.length > 0) {
					 for (var i = 0; i < tmpObject.length; i++) {
						 if (tmpObject[i].classList.contains('active'))
							 tmpObject[i].classList.remove('active');
					 }
				 }
				 _this.classList.add('active');
			 }
 
			 tmpObject = null
			 tmpObject = document.querySelectorAll('.btn-favo');
 
			 if (tmpObject.length > 0) {
				 for (var i = 0; i < tmpObject.length; i++) {
					 tmpObject[i].addEventListener('click', proposeSetObjetSelection.bind(this));
				 }
			 }
		 },
 
		 showRightSideOptions: function (id, index) {
			 if (id == null) return false;
 
			 //tooltip 삭제
			 var tooltip = document.querySelectorAll('.tool-tip');
			 if (tooltip.length > 0) {
				 for (var i = 0; i < tooltip.length; i++) {
					 tooltip[i].classList.add('hidden');
				 }
			 }
 
			 var selectedIndex = 0;
			 if (index !== null)
				 selectedIndex = index;
 
			 var subIndexList = stageSetting.simulatorSidebar.querySelectorAll('.select_objet_list > li');
 
			 if (!stageSetting.simulatorSidebar.classList.contains('active')) {
				 stageSetting.simulatorSidebar.classList.add('active');
				 for (var i = 0; i < subIndexList.length; i++) {
					 if (i == selectedIndex) {
						 if (!subIndexList[i].classList.contains('active'))
							 subIndexList[i].classList.add('active');
					 } else {
						 if (subIndexList[i].classList.contains('active'))
							 subIndexList[i].classList.remove('active');
					 }
				 }
			 }
		 },
		 hideRightSideOptions: function () {
			 document.querySelector('.select_objet').classList.remove('active');
 
			 if (stageSetting.simulatorSidebar.classList.contains('active')) {
				 stageSetting.simulatorSidebar.classList.remove('active');
				 for (var i = 0; i < subIndexList.length; i++) {
					 if (subIndexList[i].classList.contains('active')) {
						 subIndexList[i].classList.remove('active');
					 }
				 }
			 }
 
			 var objetsSelector = (document.querySelectorAll('input[name=objet-selected]').length > 0) ?
				 document.querySelectorAll('input[name=objet-selected]') : null;
			 if (objetsSelector !== null) {
				 for (var i = 0; i < objetsSelector.length; i++) {
					 if (objetsSelector[i].checked)
						 objetsSelector[i].checked = false;
				 }
			 }
 
			 var appliancesList = document.querySelectorAll('input[name=appliances-list]');
			 if (appliancesList.length > 0) {
				 for (var i = 0; i < appliancesList.length; i++) {
					 if (appliancesList[i].checked)
						 appliancesList[i].checked = false;
				 }
			 }
		 },
		 objSwiperInit: function (selectedIndex) {
			 var activeIndex = 0;
			 if (selectedIndex !== null)
				 activeIndex = selectedIndex;
 
 
			 this.objSwiper = new Swiper('.obj-swiper-container',
				 {
					 preventClicks: true,
					 preventClicksPropagation: false,
					 observer: true,
					 observeParents: true,
					 slidesPerView: 'auto',
					 calculateHeight: true,
					 mousewheel: true,
					 keyboard: true,
					 freeMode: true,
					 loopedSlides: 4,
					 navigation: {
						 nextEl: '.obj-swiper-button-next',
						 prevEl: '.obj-swiper-button-prev',
					 },
					 on: {
						 init: function () {
							 var containerEl = document.querySelector('.obj-swiper-container');
							 containerEl.classList.add('show');
 
							 _self.selectNavIndicator(this.activeIndex);
							 _self.initObjects();
 
							 function gotoCenter(target) {
								 var swiperWrap = document.querySelector('.obj-swiper-container .swiper-wrapper');
								 var targetPos = { left: target.offsetLeft };
								 var box = $('.obj-swiper-container');
								 var boxHalf = box.width() / 2;
								 var pos;
								 var listWidth = 0;
 
								 var slides = swiperWrap.querySelectorAll('.swiper-slide');
 
								 for (var i = 0; i < slides.length; i++) {
									 listWidth += slides[i].offsetWidth;
									 slides[i].classList.remove('active-background');
								 };
 
								 var selectTargetPos = targetPos.left + target.offsetWidth / 2;
								 if (selectTargetPos <= boxHalf) { // left
									 pos = 0;
								 } else if ((listWidth - selectTargetPos) <= boxHalf) { //right
									 pos = listWidth;
								 } else {
									 pos = selectTargetPos - boxHalf;
								 }
 
								 return (pos * -1);
							 }
 
							 function navGotoCenter(targetID) {
								 if (targetID == null || targetID == '') return false;
								 // 상단 objet 선택 바 scroll to center 추가
								 var scrollTargetEl = stageSetting.appliacncesListArea.querySelector('input[id^=' + targetID + ']').parentElement; // li태그 부
								 var scroller = stageSetting.appliacncesListArea.parentElement; // div.lg-appliances
								 if (scrollTargetEl !== null && scroller !== null) {
									 var targetPos = { left: scrollTargetEl.offsetLeft };
									 var targetLeft = 0;
									 var scrollerHalfWidth = scroller.offsetWidth / 2;
									 var selectTargetPos = targetPos.left + scrollTargetEl.offsetWidth / 2;
 
									 if (selectTargetPos <= scrollerHalfWidth) { // left
										 targetLeft = 0;
									 } else if ((stageSetting.appliacncesListArea.offsetWidth - selectTargetPos) <= scrollerHalfWidth) { //right
										 targetLeft = stageSetting.appliacncesListArea.offsetWidth;
									 } else {
										 targetLeft = selectTargetPos - scrollerHalfWidth;
									 }
 
									 scroller.scrollLeft = targetLeft;
								 }
							 }
 
							 /*function scrollIndicatorClick (el){
									if(el.checked || el.classList.contains('btn-nav')){
										  var navindex = 0;
										  if(el.dataset.slideIndex !== null)
												  navindex = el.dataset.slideIndex;
  
										  var target = stageSetting.objectArea.querySelector('label.' + el.id);
										  this.activeIndex = navindex;
										  this.translateTo(gotoCenter(target), 500);
										  this.slides[navindex].classList.add('active-background'); 
										  this.update();
										 
										  _self.selectNavIndicator(navindex);
										  navGotoCenter(el.id);
									}
							 }*/
							 function scrollIndicatorClick(el) {
								 if (el.checked || el.classList.contains('btn-nav')) {
									 var navindex = 0;
									 if (el.dataset.slideIndex !== null)
										 navindex = el.dataset.slideIndex;
 
									 this.slideTo(navindex, 500, true);
									 _self.selectNavIndicator(navindex);
									 this.update();
								 }
							 }
 
							 var slideToClickEl = document.querySelectorAll('[data-slide-index]');
							 if (slideToClickEl.length > 0) {
								 for (var i = 0; i < slideToClickEl.length; ++i) {
									 slideToClickEl[i].addEventListener('click', scrollIndicatorClick.bind(this, slideToClickEl[i]));
								 }
							 }
 
							 function scrollObjetClick(el) {
								 if (el == null) return false;
								 if (el.checked || el.classList.contains('objet-selected')) {
									 var navindex = 0;
									 if (el.dataset.slideIndex !== null)
										 navindex = el.dataset.slideIndex;
 
									 var target = stageSetting.objectArea.querySelector('label.' + el.value);
									 //var target = document.querySelector('div[id^=' + el.value + ']');
									 this.activeIndex = navindex;
									 this.translateTo(gotoCenter(target), 500);
									 this.slides[navindex].classList.add('active-background');
									 this.update();
 
									 _self.selectNavIndicator(navindex);
									 navGotoCenter(el.value);
								 }
							 }
 
							 var objet = document.querySelectorAll('.objet-selected');
							 if (objet.length > 0) {
								 for (var i = 0; i < objet.length; ++i) {
									 objet[i].addEventListener('click', scrollObjetClick.bind(this, objet[i]));
								 }
							 }
 
							 //ie bug fix
							 if (stageSetting.isIE11) {
								 for (var i = 0; i < this.slides.length; i++) {
									 this.slides[i].style.width = this.slides[i].getElementsByTagName('img')[0].width + 'px';
								 }
							 }
						 },
						 slideChange: function () {
							 _self.selectNavIndicator(this.activeIndex);
							 for (var i = 0; i < this.slides.length; i++) {
								 this.slides[i].classList.remove('active-background');
							 };
							 this.slides[this.activeIndex].classList.add('active-background');
							 this.update();
						 },
						 resize: function () {
							 for (var i = 0; i < this.slides.length; i++) {
								 this.slides[i].classList.remove('active-background');
							 };
							 this.slides[this.activeIndex].classList.add('active-background');
							 this.update();
							 //ie bug fix
							 if (stageSetting.isIE11) {
								 for (var i = 0; i < this.slides.length; i++) {
									 this.slides[i].style.width = this.slides[i].getElementsByTagName('img')[0].width + 'px';
								 }
							 }
						 }
					 }
				 }
			 ).slideTo(activeIndex, 0, false);
 
			 return objSwiper;
		 },
		 selectNavIndicator: function (index) {
			 var selectIndex = 0;
			 selectIndex = index;
			 var simulator_nav = document.querySelectorAll('.simulator_nav ul li');
			 if (simulator_nav !== null) {
				 for (var i = 0; i < simulator_nav.length; i++) {
					 if (i == selectIndex) {
						 //if(i == 1) { //Kitchen I + II 통합
						 //    if (!simulator_nav[0].classList.contains('active'))
						 //        simulator_nav[0].classList.add('active');
						 //} else {
						 if (!simulator_nav[i].classList.contains('active'))
							 simulator_nav[i].classList.add('active');
						 //}
					 } else {
						 if (simulator_nav[i].classList.contains('active'))
							 simulator_nav[i].classList.remove('active')
					 }
				 }
			 }
		 },
		 updateAppliancesList: function () {
			 if (stageSetting.appliacncesListArea !== null) {
				 //<li>
				 // <label>
				 //   <input type="radio" name="test" value="small">
				 //   <img src="http://placehold.it/40x60/0bf/fff&text=A">
				 // </label>
				 // </li>
 
				 var outputHtml = '';
 
				 for (var i = 0; i < configData.object.length; ++i) {
					 outputHtml += '<li>' +
						 '<input type="checkbox" name="appliances-list" value="' + configData.object[i].id + '" id="' + configData.object[i].id + '" data-slide-index="' + configData.object[i].slideIndex + '">' +
						 '<label for="' + configData.object[i].id + '">' +
						 '<span class="default" style="background-image:url(' + objectImageURL + 'appliances/' + configData.object[i].icon.default + ');">' + configData.object[i].name + '</span>' +
						 '<span class="focus" style="background-image:url(' + objectImageURL + 'appliances/' + configData.object[i].icon.focus + ');">' + configData.object[i].name + '</span>' +
						 '</label>' +
						 '</li>';
				 }
				 stageSetting.appliacncesListArea.innerHTML = outputHtml;
			 }
		 },
		 updateObjetSelected: function () {
			 if (stageSetting.objetSelectedListArea !== null) {
				 /*
						<li>
							  <input type="checkbox" name="selected-objet-list" value="refrigerator" id="refrigerator">
							  <label for="refrigerator">
									  <span class="default" style="background-image:url(../content/images/simulator_img/appliances/Thumb_01.png);">상냉장 냉장고</span>
									  <span class="focus" style="background-image:url(../content/images/simulator_img/appliances/Thumb_01_selected.png);">상냉장 냉장고</span>
							  </label>
						</li>
				 */
				 var outputHtml = '';
 
				 for (var i = 0; i < configData.object.length; ++i) {
 
					 //사용자 선택 값 저장 부 (s)
					 var existIndex = 0,
						 selectedObjectComplete = '',
						 selectedObjectSetName = '',
						 selectedObjectDifferentColorGroup = false,
						 link = 'href="' + configData.object[i].shop_link + '"';
 
					 existIndex = findIndexByKeyValue(userSelected.selectedObjet, 'selectedObject_id', configData.object[i].id);
					 if (existIndex > -1) {
						 selectedObjectComplete = (userSelected.selectedObjet[existIndex].selectedObject_complete) ? true : false;
						 selectedObjectSetName = userSelected.selectedObjet[existIndex].selectedObject_set_name;
						 selectedObjectDifferentColorGroup = userSelected.selectedObjet[existIndex].selectedObject_different_color_group;
					 }
 
					 if (selectedObjectComplete) {
						 //소재가 서로 다를 경우 안내 팝업 노출
						 if (selectedObjectDifferentColorGroup) {
							 link = 'onclick="showShopLinkAlert();"';
						 } else {
							 if (configData.object[i].id == 'refrigerator') {
								 link = 'onclick="showSelectVolume();"';
							 } else if (configData.object[i].id == 'refrigerator_convertible') {
								 link = 'onclick="showSelectFunction();"';
							 } else {
								 go_shop_model = configData.object[i].id;
								 link = 'onclick="goshop(' + i + ');"';
							 }
						 }
 
						 outputHtml += '<li>' +
							 '<input type="checkbox" name="selected-objet-list" value="' + configData.object[i].id + '" checked disabled>' +
							 '<a ' + link + '" id="' + configData.object[i].id + '" data-set-name="' + selectedObjectSetName + '" target="_blank">' +
							 '<span class="cover" style="background-image:url(' + objectImageURL + 'appliances/' + configData.object[i].icon.focus + ');">' + configData.object[i].name + '</span>' +
							 '</a>' +
							 '</li>';
					 }
				 }
				 if (outputHtml !== '') {
					 document.getElementById('goshoptxt').style.display = '';
					 stageSetting.objetSelectedListArea.innerHTML = outputHtml;
				 }
			 }
		 },
		 /*
		 getStageSetting : function (){
				return stageSetting;
		 },
		 */
		 getUserSelectedData: function () {
			 return userSelected; // 사용자가 선택한 오브제들 데이터 return
		 },
		 confirmColorSelect: function (el) { // @pck 2020-10-19 신규 추가 함수
			 var preSelectedEl = el[0];
			 if (_self.resetSelectedObject(preSelectedEl.dataset.objectId)) {
				 if (_self.setObject(preSelectedEl.dataset.objectId, preSelectedEl.dataset.targetObject, preSelectedEl.dataset.colorCode)) {
					 _self.selectObject(preSelectedEl.dataset.objectId, preSelectedEl.dataset.targetObject);
				 }
			 } else {
				 alert('초기화에 실패하였습니다.');
			 }
		 },
		 checkSimulatorResult: function () {
			 if (stageSetting.totalSelection == 0)
				 return false;
 
			 if (userSelected.selectedObjet.length < stageSetting.totalObjet) {
				 return false;
			 } else {
				 return true;
			 }
		 },
		 getObjetDatas: function () {
			 return configData.object;
		 },
		 isObjetSelectComplete: function (ID) {
 
			 if (ID == null)
				 return false;
 
			 var userSelectedObjetData = userSelected.selectedObjet.filter(function (value) {
				 return value.selectedObject_id == ID
			 });
			 var objetData = configData.object.filter(function (value) {
				 return value.id == ID
			 });
 
			 // 모든 도어를 선택 했을 경우
			 if (userSelectedObjetData[0].selectedObject_desc.length == objetData[0].selections.length) {
				 return true;
			 }
			 return false;
		 }
	 }
 
	 return Simulator;
 });