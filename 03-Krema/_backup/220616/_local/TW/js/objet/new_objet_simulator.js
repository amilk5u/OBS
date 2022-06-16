//(function($) {
//	jQuery.noConfict();
var update_file_name = "";
//Kakao.init('15afb9ea300add2a9f9acbe1a6b21c19');
function setCookie(cookieName, value, exdays){
    console.log("setCookie",cookieName, value, exdays);
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}

function getCookie(cookieName) {
    console.log("getCookie",cookieName);
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}
//guide_yn = getCookie("guide_yn");
function share(share_name){
    var share_url = "https://www.objetcollection.co.kr/share.jsp?seq="+update_file_name;
    //var share_url = "https://www.objetcollection.co.kr/user_img/canvas_img_"+update_file_name+".jpg";
    //var share_url = "https://www.lgobjetcollection.co.kr/simulator_html/html/Simulator.html";
    switch(share_name){
        case "fb":
            //alert(share_url);
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(share_url), 'sharer', 'toolbar=0,status=0,width=626, height=436');
            break;

        case "ig":
            if($(".pop_share .head").is(":visible") == true){
                $(".pop_share .head").hide();
                $(".pop_share .head_ig").show();
            }else{
                window.open('https://www.instagram.com');
            }
            break;

        /*case "ks":
            Kakao.Story.share({
                url: share_url,
                text: $("meta[property='og:title']").attr("content")
            });
            break;*/

        /*case "kt":
               var kt_img_url = "https://www.objetcollection.co.kr/nfsimg/"+update_file_name.substring(10,18)+"/canvas_img_"+update_file_name+"_thumnail2.jpg";
               Kakao.Link.sendDefault({
               objectType: 'feed',
                content: {
                  title: 'LG Objet Collection',
                  description: '처음 만나는 공간인테리어 가전.공간을 생각하는 오브제 컬렉션 가전을 만나보세요!',
                  imageUrl: kt_img_url,
                  link: {
                    mobileWebUrl: 'https://www.objetcollection.co.kr/share.jsp?seq='+update_file_name+'&fb=1',
                    webUrl: 'https://www.objetcollection.co.kr/share.jsp?seq='+update_file_name+'&fb=1'
                  }
                }
              });
            break;*/

        case "nv":
            window.open('http://blog.naver.com/openapi/share?url=' + encodeURIComponent(share_url+'&fb=1') + '&title=' + encodeURIComponent($("meta[property='og:title']").attr("content")), 'sharer', 'toolbar=0,status=0,width=626,height=436');
            break;
    }
    //$(".sns_popup, .mask").fadeOut();
    return false;
}

$(function(){
    $(".btn-url-res").on("click", function() {
        window.open('https://www.lge.co.kr/lgekor/bestshop/counsel/counselMain.do?device=w&type=PRO_electronics&code=0043&inflow=lgekor');
    });
    //이미지 다운로드
    $(".btn-url-share").on("click", function() {
        $("#simulator_dw .objet_bg").html($("#objet_select_slider .swiper-wrapper").html())
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
        });
        //@pck 2020-10-22 모바일 사이즈 이슈 fix, option {scale : '1'}추가
        html2canvas(document.querySelector("#simulator_dw"), {scale: '.25' } ).then(function(canvas) {
            var img_name = "LG_Objet.png";
            //console.log("canvas",canvas);
            if (canvas.msToBlob) {
                var blob = canvas.msToBlob();
                window.navigator.msSaveBlob(blob, img_name );
            } else {
                // @pck 2020-11-01 mobile Chrome, Safari Blob to string eff fix
                //console.log("canvas.toBlob",canvas.toBlob);
                canvas.toBlob(function(blob){
                    //console.log("blob",blob);
                    var uri = URL.createObjectURL(blob);
                    saveAs(uri, img_name);
                },'image/png');
            }
        })

        function saveAs(uri, filename) {
            // 캡쳐된 파일을 이미지 파일로 내보낸다.
            var link = document.createElement('a');
            if (typeof link.download === 'string') {
                link.href = uri;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert("이미지 다운로드 실패");
            }
        }
    });
});
function move_reser(){
    window.open('https://www.lge.co.kr/lgekor/bestshop/counsel/counselMain.do?device=w&type=PRO_electronics&code=0043&inflow=lgekor');
}
function noshow_guide(){
    setCookie("guide_yn","N",7);
    $(".control-bx").fadeOut();
    /*console.log(guide_yn);
    if(guide_yn == "undefined"){
        var cookieResult = confirm("쿠키 수집에 동의해주세요");
        if(cookieResult){
            setCookie("guide_yn","N",7);
        }else{

        }
    }else{
        setCookie("guide_yn","N",7);
    }*/
}














$(window).on("resize",function(){
});

$(document).ready(function() {

}); //end : document ready

//})(jQuery);
var guide_yn;
