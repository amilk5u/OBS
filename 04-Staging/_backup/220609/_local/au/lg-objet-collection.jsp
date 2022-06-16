<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
	<%@ include file="/WEB-INF/jsp/gp/common/include/head/head.jsp" %>
		<head>
			<!-- default code -->
			<%@ include file="/WEB-INF/jsp/gp/common/include/head/meta-default-tag.jsp" %>
				<!-- sns tag -->
				<%@ include file="/WEB-INF/jsp/gp/common/include/head/meta-sns-tag.jsp" %>
					<!-- chrome audits -->
					<meta name="theme-color" content="#a50034" />
					<title>LG Objet Collection | LG Australia</title>
					<meta name="keywords" content=" " />
					<meta name="description" content=" " />
					<meta property="og:title" content="" />
					<meta property="og:url" content="" />
					<meta property="og:description" content="@@description" />
					<meta property="og:image" content="" />
					<link rel="canonical" href=" " />
					<jsp:include page="/WEB-INF/jsp/gp/common/include/head/head-css.jsp" />
					<jsp:include page="/WEB-INF/jsp/gp/common/include/head/font-woff.jsp" />
					<!-- // default code -->
					<jsp:include page="/WEB-INF/jsp/gp/common/include/head/mic-head-script.jsp" />
					<jsp:include page="/WEB-INF/jsp/gp/common/include/head/gateway-foresee.jsp" />
					<!-- your css -->
					<link rel="stylesheet" type="text/css" href="/au/css/objet/base.css" />
					<link rel="stylesheet" type="text/css" href="/au/css/objet/layout.css" />
					<link rel="stylesheet" type="text/css" href="/au/css/objet/common4.css" />
					<link rel="stylesheet" type="text/css" href="/au/css/objet/common2_2.css" />
					<link rel="stylesheet" type="text/css" href="/au/css/objet/swiper.min.css">
					<link href="/au/css/objet/objet.css" type="text/css" rel="stylesheet">
					<!-- Google Tag Manager -->
					<script>(function (w, d, s, l, i) {
							w[l] = w[l] || []; w[l].push({
								'gtm.start':
									new Date().getTime(), event: 'gtm.js'
							}); var f = d.getElementsByTagName(s)[0],
								j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
									'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
						})(window, document, 'script', 'dataLayer', 'GTM-K9697NC');</script>
					<!-- End Google Tag Manager -->
		</head>
		<body class="overWrap">
			<!-- Google Tag Manager (noscript) -->
			<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K9697NC" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
			<!-- End Google Tag Manager (noscript) -->
			<jsp:include page="/WEB-INF/jsp/gp/common/include/body/body-noscript.jsp" />
			<jsp:include page="/WEB-INF/jsp/gp/common/include/body/google-tag-manager.jsp" />
			<jsp:include page="/WEB-INF/jsp/gp/common/include/body/broswe-check-popup-layer.jsp" />
			<div class="sr-only" itemscope itemtype="http://schema.org/WebPage">
				<meta itemprop="name" content="{Browser Title}" />
				<meta itemprop="image" content="{Share Image}" />
				<meta itemprop="url" content="{Cannonical URL}" />
				<meta itemprop="description" content="{Page Description}" />
				<meta itemprop="Keywords" content="{Page Keyword}" />
			</div>
			<c:set var='bizType' value='${$bizType }' />
			<c:set var='siteType' value='MKT' />
			<!-- component (navigation) -->
			<c:import url="/${localeCd }/gnb">
				<c:param name="bizType" value="${bizType}" />
				<c:param name="siteType" value="${siteType}" />
				<c:param name="isMobile" value="${isMobile}" />
			</c:import>
			<!-- // component (navigation) -->
			<!-- breadcrumb -->
			<c:import url="/${localeCd }/breadCrumb">
				<c:param name="bizType" value="${bizType}" />
			</c:import>
			<!-- // breadcrumb -->
			<!-- Enter Code Here -->
			<div class="objetcollection-tabs">
				<div class="tabs-wrap ui_tab ui_smooth_scroll">
					<ul class="tabs swiper-wrapper">
						<!-- @2022-06-07 Navigation index 변경 (s) -->
						<li class="swiper-slide on"><button type="button" title="LG Objet Collection" data-navi-idx="0" data-link-name="LG Objet Collection"><img src="https://www.lg.com/au/images/objet/tab_logo_txt.png" alt="LG Objet Collection" /></button></li>
						<li class="swiper-slide"><button type="button" title="Experience" data-navi-idx="2" data-link-name="Experience">Experience</button></li>
						<li class="swiper-slide"><button type="button" title="Video" data-navi-idx="1" data-link-name="Video">Video</button></li>
						<li class="swiper-slide"><button type="button" title="Product" data-navi-idx="4" data-link-name="Product">Product</button></li>
						<li class="swiper-slide"><button type="button" title="Gallery" data-navi-idx="5" data-link-name="Gallery">Gallery</button></li>
						<li class="swiper-slide"><button type="button" title="Objet FAQs" data-navi-idx="6" data-link-name="FAQs">Objet FAQs</button></li>
						<!-- @2022-06-07 Navigation index 변경 (e) -->
					</ul>
				</div>
			</div>
			<!-- @2022-06-03 장바구니 / 로딩 / 문의 팝업 (s) -->
			<div class="loading-circle">
				<div class="lds-dual-ring"></div>
			</div>
			<div class="modal modal-simple inquiry_modal fade" id="addToCartSuccess" tabindex="-1" role="dialog" data-backdrop="false" aria-label="Add to Cart" aria-describedby="addToCartSuccessDialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-body">
							<div class="simple-content-box">
								<div class="content-paragraph" id="addToCartSuccessDialog">Please contact <a href="mailto:obsanz@lge.com">obsanz@lge.com</a> for purchase/stock enquiries. For enquiries after purchase(repair, colour change, etc) please contact LG Customer Care.</div>
							</div>
						</div>
						<div class="modal-footer">
							<a href="https://www.lg.com/au/support/chat-email" class="btn btn-primary">Live Chat/Email</a>
							<a href="tel:1300-54-22-73" class="btn btn-primary">Telephone</a>
						</div>
						<div class="simple-content-box">
							<div class="notice no-icon" style="display:inline-block;">※ Monday to Sunday 8 am to 8pm AEST</div>
						</div>
						<button type="button" class="btn-close" data-link-name="close">close</button>
					</div>
				</div>
			</div>
			<div class="modal modal-simple basket_modal fade" id="addToCartSuccess" tabindex="-1" role="dialog" data-backdrop="false" aria-label="Add to Cart" aria-describedby="addToCartSuccessDialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-body">
							<div class="simple-content-box">
								<div class="content-paragraph" id="addToCartSuccessDialog">Successfully added to your Cart</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">CONTINUE SHOPPING</button>
							<a href="https://wwwstg.lg.com/au/shop/checkout/cart/" class="btn btn-primary">View Cart</a>
						</div>
						<div class="simple-content-box">
							<div class="notice no-icon" style="display:inline-block;">“We use cookies to improve your purchase experience.” </div>
						</div>
					</div>
				</div>
			</div>
			<!-- @2022-06-03 장바구니 / 로딩 / 문의 팝업 (e) -->
			<div class="objet_cont_wrap">
				<div class="inner">
					<div data-cont-idx="0" class="objet_slide_cont is_active">
						<div class="cont_inner">
							<!-- <div class="swiper mainKeyVisual">	
						<div class="swiper-wrapper">	
							<div class="swiper-slide">	
								<div class="title"><h2>Built for performance. <br>Styled by you.</h2></div>	
								<p class="body-copy">Your style. Your space with LG Objet Collection.</p>	
								<div class="video_wrap">	
									<div class="video_area only_pc">	
										<video autoplay="" loop playsinline="" muted=""><source src="/au/images/objet/bg_objet_main1_2.mp4" type="video/mp4"><p></p></video>	
									</div>	
									<div class="video_area only_mobile">	
										<video autoplay="" loop playsinline="" muted=""><source src="/au/images/objet/bg_objet_main1_2_m.mp4" type="video/mp4"><p></p></video>	
									</div>	
								</div>	
							</div>	
							<div class="swiper-slide">	
								<div class="title"><h2>Built for performance. <br>Styled by you.</h2></div>	
								<p class="body-copy">Style meets inspiration. <br>Create a space that's uniquely yours with LG Objet Collection</p>	
								<div class="video_wrap">	
									<div class="video_area only_pc">	
										<video autoplay="" loop playsinline="" muted=""><source src="/au/images/objet/bg_objet_main1_3.mp4" type="video/mp4"><p></p></video>	
									</div>	
									<div class="video_area only_mobile">	
										<video autoplay="" loop playsinline="" muted=""><source src="/au/images/objet/bg_objet_main1_3_m.mp4" type="video/mp4"><p></p></video>	
									</div>	
								</div>	
							</div>
							<div class="swiper-slide">
								<div class="title"><h2>Built for performance. <br>Styled by you.</h2></div>	
								<p class="body-copy">Inspiring colour combinations reflect <br>your unique style with LG Objet Collection</p>
								<div class="video_wrap">
									<div class="video_area only_pc">
										<img src="/au/images/objet/bg_objet_main1_4.jpg" alt="" />
									</div>
									<div class="video_area only_mobile">
										<img src="/au/images/objet/bg_objet_main1_4_m.jpg" alt="" />
									</div>
								</div>
							</div>
						</div>	
						<div class="swiper-button-play" data-link-name="key visual pause"></div>	
						<div class="swiper-button-pause is_active" data-link-name="key visual play"></div>	
						<div class="swiper-pagination"></div>	
					</div>	 -->
							<div class="swiper-slide single_banner">
								<!-- @2022-05-27 디스클레이머 추가 (s) -->
								<div class="title">
									<h2>Built for performance. Styled by you.</h2>
									<p class="sb_txt">
										<span> Interchangeable panels allow you to customise your LG Objet® Collection fridge and freezer with a choice of colours and finishes. </span>
										<span> Explore LG Objet® Collection below and customise to suit your style via the Virtual Experience.*
									</p>
									</span>
								</div>
								<!-- @2022-05-27 디스클레이머 추가 (e) -->
								<div class="video_wrap">
									<div class="video_area only_pc">
										<video autoplay="" loop playsinline="" muted="">
											<source src="https://www.lg.com/au/images/objet/bg_objet_main1_5.mp4" type="video/mp4">
											<p></p>
										</video>
									</div>
									<div class="video_area only_mobile">
										<video autoplay="" loop playsinline="" muted="">
											<source src="https://www.lg.com/au/images/objet/bg_objet_main1_5_m.mp4" type="video/mp4">
											<p></p>
										</video>
									</div>
								</div>
							</div>
							<div class="next_arr_wrap">
								<button data-next-idx="1" type="button" data-link-name="move to next stage">Scroll</button>
							</div>
						</div>
					</div>
					<!-- @2022-06-07 시뮬레이터, 비디오 섹션 변경 (s) -->
					<div data-cont-idx="2" class="objet_slide_cont">
						<div class="cont_inner">
							<!-- innerSimulatorPrev -->
							<div id="innerSimulatorPrev" class="inner_contents">
								<div class="title">
									<!-- @22-06-07 타이틀 위첨자 수정 (s) -->
									<h2>Make it your own <br>with LG Objet<sup>®</sup> Collection</h2>
									<p class="body-copy"><button type="button" data-link-name="move to Virtual Experience"><span>Virtual Experience</span></button></p>
									<!-- @22-06-07 타이틀 위첨자 수정 (e) -->
								</div>
								<div class="bg_area">
									<div class="inner_video">
										<video autoplay="" playsinline="" muted="" class="only_pc">
											<source src="/au/images/objet/sketch_pc.mp4" type="video/mp4">
											<p>sketch</p>
										</video>
										<video autoplay="" playsinline="" muted="" class="only_mobile">
											<source src="/au/images/objet/sketch_m.mp4" type="video/mp4">
											<p>sketch</p>
										</video>
									</div>
								</div>
							</div>
							<!--// innerSimulatorPrev -->
							<!-- innerSimulator -->
							<div id="innerSimulator" class="inner_contents">
								<!-- style_select_area -->
								<div class="style_select_area">
									<div class="title">
										<h2>What's your style?</h2>
									</div>
									<div class="style_list">
										<ul>
											<li>
												<button type="button" data-id="nature" data-link-name="move to Natural">
													<div class="img_area">
														<img src="/au/images/objet/bg_nature_01.png" alt="Natural" />
														<img src="/au/images/objet/bg_nature_B_01.png" alt="Natural" class="hover_view" />
													</div>
													<p class="txt_area">Natural</p>
												</button>
											</li>
											<li>
												<button type="button" data-id="modern" data-link-name="move to Modern">
													<div class="img_area">
														<img src="/au/images/objet/bg_modern_01.png" alt="Modern" />
														<img src="/au/images/objet/bg_modern_B_01.png" alt="Modern" class="hover_view" />
													</div>
													<p class="txt_area">Modern</p>
												</button>
											</li>
											<li>
												<button type="button" data-id="nordic" data-link-name="move to Minimalist">
													<div class="img_area">
														<img src="/au/images/objet/bg_nordic_01.png" alt="Minimalist" />
														<img src="/au/images/objet/bg_nordic_B_01.png" alt="Minimalist" class="hover_view" />
													</div>
													<p class="txt_area">Minimalist</p>
												</button>
											</li>
										</ul>
									</div>
								</div>
								<!--// style_select_area -->
								<!-- simulator_area -->
								<div class="simulator_area">
									<div class="simulator">
										<div class="simulator-header">
										</div>
										<div style="position: fixed; top: 50%; left: 50%; z-index: 10; transform: translate(-50%, -50%);display:none" id="loading"><img src="/au/images/objet/loading.gif" alt="loading" /></div>
										<div class="select_objet" data-simulator-sidebar="">
											<ul class="select_objet_list">
												<li class="type01">
													<h3 class="h3Tile" data-simulator-sidebar-title="">Materials and colors</h3>
													<div class="objet-bx" data-simulator-sidebar-selector-area="">
														<!-- simulator.js 동적 DATA 부 -->
													</div>
													<button class="scroll-down" data-surface-scroll-down=""></button>
												</li>
											</ul>
											<button type="button" class="btn-close" data-link-name="close">close</button>
										</div>
										<!-- bg_type_sel -->
										<div class="bg_type_sel type02">
											<div class="objet-bx">
												<ul class="swiper-wrapper">
													<li class="swiper-slide" data-bgType="nature">
														<button type="button" class="btn-style btn-natureA" data-id="natureA" data-link-name="change to Natural01">Natural01</button>
														<button type="button" class="btn-style btn-natureB" data-id="natureB" data-link-name="change to Natural02">Natural02</button>
														<button type="button" class="btn-style btn-natureC" data-id="natureC" data-link-name="change to Natural03">Natural03</button>
													</li>
													<li class="swiper-slide" data-bgType="modern">
														<button type="button" class="btn-style btn-modernA" data-id="modernA" data-link-name="change to Modern01">Modern01</button>
														<button type="button" class="btn-style btn-modernB" data-id="modernB" data-link-name="change to Modern02">Modern02</button>
														<button type="button" class="btn-style btn-modernC" data-id="modernC" data-link-name="change to Modern03">Modern03</button>
													</li>
													<li class="swiper-slide" data-bgType="nordic">
														<button type="button" class="btn-style btn-nordicA" data-id="nordicA" data-link-name="change to Minimalist01">Minimalist01</button>
														<button type="button" class="btn-style btn-nordicB" data-id="nordicB" data-link-name="change to Minimalist02">Minimalist02</button>
														<button type="button" class="btn-style btn-nordicC" data-id="nordicC" data-link-name="change to Minimalist03">Minimalist03</button>
													</li>
												</ul>
											</div>
										</div>
										<!--// bg_type_sel -->
										<div class="objet_select_slider" id="objet_select_slider" data-simulator-background-slider="">
											<div class="obj-swiper-container swiper-container">
												<div class="swiper-wrapper divp">
													<div class="swiper-slide" id="s_kitchen" data-simulator-background-image="Kitchen I">
														<img src="/au/images/objet/simulator/bg_modern_01.png" alt="Kitchen 1" />
														<p class="text">Kitchen l</p>
													</div>
													<!-- <div class="swiper-slide" id="s_utility" data-simulator-background-image="Utility Room">
										   <img src="/au/images/objet/simulator/bg_modern_03.png" alt="Utility Room" />
										   <p class="text">Utility Room</p>
										</div>
										<div class="swiper-slide" id="s_living" data-simulator-background-image="Living Room">
										   <img src="/au/images/objet/simulator/bg_modern_04.png" alt="Living Room" />
										   <p class="text">Living Room</p>
										</div> -->
													<div class="objet_object_bx">
														<div class="objet_object" data-simulator-object-area="">
															<!-- simulator.js 동적 DATA 부 -->
														</div>
													</div>
												</div>
											</div>
											<div class="swiper-button-next obj-swiper-button-next"></div>
											<div class="swiper-button-prev obj-swiper-button-prev"></div>
											<div class="disclaimer">
												<p> Availability of colours and/or products varies by region. Not all pictured options may be available locally. <br> Refer to the 'Product' tab below or LG.com/au for details of local product and colour availability. </p>
											</div>
											<div class="loadingImgWrap">
												<img src="/au/images/objet/simulator/bg/bg_modern_01.png" alt="" />
												<!-- <img src="/au/images/objet/simulator/bg/bg_modern_02.png" alt="" />
									<img src="/au/images/objet/simulator/bg/bg_modern_03.png" alt="" /> -->
												<img src="/au/images/objet/simulator/bg/bg_modern_B_01.png" alt="" />
												<!-- <img src="/au/images/objet/simulator/bg/bg_modern_B_02.png" alt="" />
									<img src="/au/images/objet/simulator/bg/bg_modern_B_03.png" alt="" /> -->
												<img src="/au/images/objet/simulator/bg/bg_modern_C_01.png" alt="" />
												<!-- <img src="/au/images/objet/simulator/bg/bg_modern_C_02.png" alt="" />
									<img src="/au/images/objet/simulator/bg/bg_modern_C_03.png" alt="" /> -->
												<img src="/au/images/objet/simulator/bg/bg_nature_01.png" alt="" />
												<!-- <img src="/au/images/objet/simulator/bg/bg_nature_02.png" alt="" />
									<img src="/au/images/objet/simulator/bg/bg_nature_03.png" alt="" /> -->
												<img src="/au/images/objet/simulator/bg/bg_nature_B_01.png" alt="" />
												<!-- <img src="/au/images/objet/simulator/bg/bg_nature_B_02.png" alt="" />
									<img src="/au/images/objet/simulator/bg/bg_nature_B_03.png" alt="" /> -->
												<img src="/au/images/objet/simulator/bg/bg_nature_C_01.png" alt="" />
												<!-- <img src="/au/images/objet/simulator/bg/bg_nature_C_02.png" alt="" />
									<img src="/au/images/objet/simulator/bg/bg_nature_C_03.png" alt="" /> -->
												<img src="/au/images/objet/simulator/bg/bg_nordic_01.png" alt="" />
												<!-- <img src="/au/images/objet/simulator/bg/bg_nordic_02.png" alt="" />
									<img src="/au/images/objet/simulator/bg/bg_nordic_03.png" alt="" /> -->
												<img src="/au/images/objet/simulator/bg/bg_nordic_B_01.png" alt="" />
												<!-- <img src="/au/images/objet/simulator/bg/bg_nordic_B_02.png" alt="" />
									<img src="/au/images/objet/simulator/bg/bg_nordic_B_03.png" alt="" /> -->
												<img src="/au/images/objet/simulator/bg/bg_nordic_C_01.png" alt="" />
												<!-- <img src="/au/images/objet/simulator/bg/bg_nordic_C_02.png" alt="" />
									<img src="/au/images/objet/simulator/bg/bg_nordic_C_03.png" alt="" /> -->
											</div>
											<div class="lg-appliances">
												<ul data-appliances-list="">
													<!-- simulator.js 동적 DATA 부 -->
												</ul>
												<div class="simul-info rf-con"> When purchasing a one-door convertible product, <br>you can choose which way the door opens, <br>and choose to use as a fridge or freezer, <br>depending on what you plan to store in it.。 </div>
											</div>
											<div class="img-download">
												<button type="button" class="btn-url-share" title="download" data-link-name="download"><span class="blind">download</span></button>
												<button type="button" data-href="#objModal1" data-control="modal" id="save" class="btn-dw" title="Experience LG Objet Collection" data-link-name="Experience LG Objet Collection"><span class="blind">Experience LG Objet Collection</span></button>
												<div class="component-wrap share-common">
													<div class="component KRP0016">
														<div class="inner">
															<div class="tooltip-wrap share sns-area">
																<a href="#n" class="tooltip-icon ui_tooltip-target" data-fixed="fixed-right" onclick="snsOpen();" ui-modules="TooltipTarget"><span class="blind">제품 공유하기</span></a>
																<div class="tooltip-box list fixed-right" aria-hidden="false">
																	<div class="box_inner">
																		<!-- <span class="title">分享</span> -->
																		<div class="sns-wrap">
																			<ul class="sns-share" data-get-url="https://www.lg.com/common/shorturl/getShortUrl.lgajax" data-param-name="longUrl">
																				<li><a href="#" data-url="https://www.lg.com/au/lg-objet-collection.jsp" class="share-facebook" title="Facebook, Opens in a new layer popup" data-link-area="social_share-share_layer_popup" data-link-name="facebook" data-adobe-tracking-wish="Y" data-page-event="plp_share_copyicon" data-adobe-copy-icon="facebook"><span>Facebook</span></a></li>
																				<li><a href="#" data-url="https://www.lg.com/au/lg-objet-collection.jsp" data-title="LG Objet Collection | LG Australia" data-via="LG_Australia" class="share-twitter" title="Twitter, Opens in a new layer popup" data-link-area="social_share-share_layer_popup" data-link-name="Twitter" data-adobe-tracking-wish="Y" data-page-event="plp_share_copyicon" data-adobe-copy-icon="twitter"><span>Twitter</span></a></li>
																				<li><a href="#share-complete" class="article-link" data-toggle="modal" data-copy-url="https://www.lg.com/au/lg-objet-collection.jsp" data-link-name="Copy Url" data-adobe-tracking-wish="Y" data-page-event="plp_share_copyicon" data-adobe-copy-icon="urlcopy"><span>Copy Url</span></a></li>
																			</ul>
																		</div>
																		<button type="button" class="btn-close"><span class="blind">close</span></button>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="simulator_arr">
												<button type="button" title="이전" class="btn-prev-simul"></button>
												<button type="button" title="다음" class="btn-next-simul"></button>
											</div>
											<div class="simulator_nav" id="scroll-indicator">
												<ul>
													<li><button type="button" class="btn-nav s_kitchen" id="si_nav01" data-slide-index="0">Kitchen</button></li>
													<!-- <li><button type="button" class="btn-nav s_utility" id="si_nav02" data-slide-index="1">Utility Room</button></li>
										<li><button type="button" class="btn-nav s_living" id="si_nav03" data-slide-index="2">Living Room</button></li> -->
												</ul>
											</div>
										</div>
										<div id="purchase_popup" class="layer_popup">
											<div class="pop_inner">
												<div class="pop_tit">
													<!-- @22-06-07 타이틀 위첨자 수정 (s) -->
													<h2>LG Objet<sup>®</sup> products you viewed</h2>
													<!-- @22-06-07 타이틀 위첨자 수정 (e) -->
												</div>
												<div class="pop_cont">
													<div class="purchase_list">
														<ul>
														</ul>
													</div>
													<!-- @2022-05-27 리프레쉬 삭제 (s)
											<p class="comment_txt">Select a product to go to the details page<br>Not all models available in Australia</p>
											@2022-05-27 리프레쉬 삭제 (e) -->
												</div>
												<button type="button" class="btn_close"><span class="blind">close</span></button>
											</div>
										</div>
										<div id="noSale_popup" class="layer_popup">
											<div class="pop_inner">
												<div class="pop_tit">
													<h2>LG Objet Collection</h2>
												</div>
												<div class="pop_cont">
													<p class="empty_txt"> Coming Soon </p>
												</div>
												<button type="button" class="btn_close"><span class="blind">close</span></button>
											</div>
										</div>
										<div id="empty_popup" class="layer_popup">
											<div class="pop_inner">
												<div class="pop_tit">
													<!-- @22-06-07 타이틀 위첨자 수정 (s) -->
													<h2>LG Objet<sup>®</sup> products you viewed</h2>
													<!-- @22-06-07 타이틀 위첨자 수정 (e) -->
												</div>
												<div class="pop_cont">
													<p class="empty_txt"> No product selected, <br>create an Objet Collection that is distinctly yours </p>
												</div>
												<button type="button" class="btn_close"><span class="blind">close</span></button>
											</div>
										</div>
										<div class="objet_popup layer_popup">
											<div class="pop_inner">
												<strong>Mist Glass</strong>
												<ul>
													<li class="text2">Matte glass that is soft to the touch and refined enough for any space </li>
													<li class="img"><img src="/au/images/objet/img-Mist.jpg" alt="Mist Glass image" /></li>
												</ul>
												<button type="button" class="btn-close">close</button>
												<button type="button" class="btn_close"><span class="blind">close</span></button>
											</div>
										</div>
										<div class="modal fade" id="share-complete" tabindex="-1" role="dialog" data-backdrop="false" style="display: none;" aria-hidden="true">
											<div class="modal-dialog modal-sm modal-plp-alert" role="document">
												<div class="modal-content">
													<div class="modal-alert">
														<p>The URL has been copied to the clipboard.</p>
													</div>
													<div class="modal-footer">
														<button type="button" class="btn btn-primary" id="" data-dismiss="modal">close</button>
													</div>
												</div>
											</div>
										</div>
										<!-- @22-06-03 타이틀 수정 (s) -->
										<div class="color_warning_popup layer_popup">
											<div class="pop_inner">
												<div class="pop_tit">
													<!-- @22-06-07 타이틀 위첨자 수정 (s) -->
													<h2>LG Objet<sup>®</sup> Collection </h2>
													<!-- @22-06-07 타이틀 위첨자 수정 (e) -->
												</div>
												<div class="pop_cont">
													<p class="empty_txt"> Since each material has a different texture, we recommend a combination of the same materials. </p>
												</div>
												<button type="button" class="btn_close"><span class="blind">close</span></button>
												<!-- @2022-05-18 Glass → 본품 선택시, refresh 버튼 초기화 기능 테스트중 (s) -->
												<!-- <button type="button" class="btn_refresh">refresh</button> -->
												<!-- @2022-05-18 Glass → 본품 선택시, refresh 버튼 초기화 기능 테스트중 (e) -->
											</div>
										</div>
										<!-- @22-06-03 타이틀 수정 (e) -->
										<div class="selection_warning_popup layer_popup">
											<div class="popup-container">
												<strong>체험을 완료하지 않은<br /> 제품이 있습니다.</strong>
												<ul>
													<li class="text2"> 공간 내 오브제컬렉션 제품들을 <br />모두 체험해 보세요. </li>
												</ul>
												<div class="btn-popup-set">
													<button type="button" class="btn-continue">close</button>
												</div>
											</div>
										</div>
										<div class="shop_reservation_popup">
											<div class="popup-container">
												<strong>매장 구매상담을 이용해주세요.</strong>
												<ul>
													<li> 원하시는 조합 상품이 없거나 준비중입니다. <br />매장 구매상담을 이용 부탁드립니다 </li>
													<li>
														<a href="javascript:move_reser()" class="btn-reservation">매장상담 예약하기</a>
													</li>
												</ul>
												<div class="btn-popup-set">
													<button type="button" class="btn-close">close</button>
												</div>
											</div>
										</div>
										<div class="refrigerator_reservation_popup">
											<div class="popup-container">
												<strong>구매를 원하시는 냉장고 용량을 <br /> 선택해주세요.</strong>
												<ul>
													<li>
														<a href="javascript:go_shop('1')" class="btn-select-refrigerator">800L</a>
													</li>
													<li>
														<a href="javascript:go_shop('2')" class="btn-select-refrigerator">613L(빌트인타입)</a>
													</li>
												</ul>
												<div class="btn-popup-set">
													<button type="button" class="btn-close">close</button>
												</div>
											</div>
										</div>
										<div class="refrigerator_convertible_popup">
											<div class="popup-container">
												<strong>구매를 원하시는 컨버터블 기능을 <br /> 선택해주세요.</strong>
												<ul>
													<li>
														<a href="javascript:go_shop2('1')" class="btn-select-refrigerator">냉동</a>
													</li>
													<li>
														<a href="javascript:go_shop2('2')" class="btn-select-refrigerator">냉장</a>
													</li>
													<li>
														<a href="javascript:go_shop2('3')" class="btn-select-refrigerator">김치</a>
													</li>
												</ul>
												<div class="btn-popup-set">
													<button type="button" class="btn-close">close</button>
												</div>
											</div>
										</div>
									</div>
									<div class="start-mask"></div>
									<div id="simulator_dw" style="display:none;position: fixed; width: 5760px; height: 1080px; left: 0px; top: -9999px;">
										<!-- 7680px -->
										<div class="objet_bg" style="width: 5760px;"></div>
									</div>
									<div class="control-bx">
										<div class="step01">
											<div class="num1">
												<span>1</span> Choose the right appliances for your style from the LG Objet Collection
											</div>
											<div class="objet-list">
												<ul>
													<li><img src="/au/images/objet/simulator/appliances/Thumb_02.png"></li>
												</ul>
											</div>
										</div>
										<div class="step02">
											<div class="num2">
												<span>2</span> Customize your materials and colors
											</div>
											<div class="objet-list2">
												<img src="/au/images/objet/guide/simul-bt1.png" alt="" class="only_pc" />
												<img src="/au/images/objet/guide/simul-bt2.png" alt="" class="only_mobile" />
												<div class="maskas"></div>
											</div>
										</div>
										<div class="step03">
											<div class="num3">
												<span>3</span> Download your customized LG Objet Collection
											</div>
										</div>
										<div class="simul-start-div2">
											<div class="statr-bx">
												<p>Scroll down or drag to view left and right<br>
													<label for="noViewCheck"><input type="checkbox" id="noViewCheck" onclick="noshow_guide()"><span>Hide it for seven days</span></label>
												</p>
												<button type="button" class="btn-simul-start-close2"><span>close</span></button>
											</div>
											<div class="start-mask"></div>
										</div>
										<div class="maska"></div>
									</div>
								</div>
								<!--// simulator_area -->
							</div>
							<!--// innerSimulator -->
							<!-- innerVideo -->
							<div id="innerVideo" class="inner_contents">
								<div class="video_area only_pc">
									<video autoplay="" controls playsinline="" muted="">
										<source src="https://www.lg.com/au/images/objet/img-main-05.mp4" type="video/mp4">
										<p></p>
									</video>
								</div>
								<div class="video_area only_mobile">
									<video autoplay="" controls playsinline="" muted="">
										<source src="https://www.lg.com/au/images/objet/img-main-05_m.mp4" type="video/mp4">
										<p></p>
									</video>
								</div>
								<div class="next_arr_wrap">
									<button data-next-idx="2" type="button" data-link-name="move to next stage">Scroll</button>
								</div>
							</div>
							<!-- //innerVideo -->
							<!-- innerProduct -->
							<div id="innerProduct" class="inner_contents">
								<div class="title">
									<h2>Product</h2>
								</div>
								<div class="product_list">
									<ul>
										<!-- @2022-05-27 링크 수정 (s) -->
										<li>
											<a href="https://www.lg.com/au/objet-collection/lg-mf-b664" data-link-name="InstaView">
												<div class="default_cont">
													<img src="./images/objet/pic_product04.png" alt="InstaView® French Door Fridge" class="default_img" />
													<img src="./images/objet/pic_product04_hover.png" alt="InstaView® French Door Fridge" class="hover_img" />
													<!-- @22-06-07 타이틀 수정 (s) -->
													<p class="eng_name">InstaView Door-in-Door® French Door Fridge</p>
													<!-- @22-06-07 타이틀 수정 (e) -->
												</div>
											</a>
										</li>
										<li>
											<a href="https://www.lg.com/au/objet-collection/lg-mp-l386" data-link-name="move to larder">
												<div class="default_cont">
													<img src="./images/objet/pic_product01.png" alt="Single Door Fridge" class="default_img" />
													<img src="./images/objet/pic_product01_hover.png" alt="Single Door Fridge" class="hover_img" />
													<p class="eng_name">Single Door Fridge</p>
												</div>
											</a>
										</li>
										<li>
											<a href="https://www.lg.com/au/freezers/lg-mp-f324" data-link-name="move to freezer">
												<div class="default_cont">
													<img src="./images/objet/pic_product02.png" alt="Upright Freezer" class="default_img" />
													<img src="./images/objet/pic_product02_hover.png" alt="Upright Freezer" class="hover_img" />
													<p class="eng_name">Upright Freezer</p>
												</div>
											</a>
										</li>
										<!-- @2022-05-27 링크 수정 (e) -->
										<!-- <li>
									<a href="javascript:comingSoon();" data-link-name="Washtower" >
										<div class="default_cont">
											<img src="/au/images/objet/pic_product03.png" alt="Washtower" class="default_img only_pc" />
											<img src="/au/images/objet/pic_product03_m.png" alt="Washtower" class="default_img only_mobile" />
											<img src="/au/images/objet/pic_product03_hover.png" alt="Washtower" class="hover_img only_pc" />
											<img src="/au/images/objet/pic_product03_m_hover.png" alt="Washtower" class="hover_img only_mobile" />
											<p class="eng_name">WashTower<sup>TM</sup></p>
										</div>
									</a>
								</li> -->
										<li>
											<span>
												<div class="ico_cont">
													<!-- <img src="/au/images/objet/ico_product05.png" alt="Bottom Freezer" class="ico_img" /> -->
													<p class="eng_name">LG Objet Collection</p>
												</div>
											</span>
										</li>
										<!-- <li>
									<a href="javascript:comingSoon();" data-link-name="styler" >
										<div class="default_cont">
											<img src="/au/images/objet/pic_product06.png" alt="styler" class="default_img" />
											<img src="/au/images/objet/pic_product06_hover.png" alt="styler" class="hover_img" />
											<p class="eng_name">Styler<sup>TM</sup></p>
										</div>
									</a>
								</li> -->
										<!-- <li>
									<a href="javascript:alert('coming soon');">
										<div class="ico_cont">
											<img src="/au/images/objet/ico_product07.png" alt="" class="ico_img" />
											<p class="eng_name">微波炉</p>
										</div>
									</a>
								</li> -->
										<!-- <li>
									<a href="javascript:comingSoon();" data-link-name="All-in-one Tower" >
										<div class="default_cont">
											<img src="/au/images/objet/pic_product08.png" alt="All-in-one Tower" class="default_img only_pc" />
											<img src="/au/images/objet/pic_product08_m.png" alt="All-in-one Tower" class="default_img only_mobile" />
											<img src="/au/images/objet/pic_product08_hover.png" alt="All-in-one Tower" class="hover_img" />
											<p class="eng_name">All-in-one Tower<sup>TM</sup> <br class="only_mobile"</p>
										</div>
									</a>
								</li> -->
										<!-- <li>
									<a href="javascript:alert('coming soon');">
										<div class="default_cont">
											<img src="/au/images/objet/pic_product09.png" alt="" class="default_img only_pc" />
											<img src="/au/images/objet/pic_product09_m.png" alt="" class="default_img only_mobile" />
											<img src="/au/images/objet/pic_product09_hover.png" alt="" class="hover_img" />
											<p class="eng_name">洗碗机</p>
										</div>
									</a>
								</li> -->
									</ul>
								</div>
								<div id="coming_popup" class="layer_popup">
									<div class="pop_inner">
										<div class="pop_tit">
											<h2>Stay tuned</h2>
										</div>
										<div class="pop_cont">
											<p class="coming_soon"></p>
										</div>
										<button type="button" class="btn_close"><span class="blind">close</span></button>
									</div>
								</div>
							</div>
							<!--// innerProduct -->
							<!-- innerGallery -->
							<div id="innerGallery" class="inner_contents">
								<div class="title">
									<h2>Gallery</h2>
								</div>
								<!-- gallery_list -->
								<div class="gallery_list">
									<div class="swiper main_slider">
										<div class="swiper-wrapper">
											<div class="swiper-slide">
												<video autoplay="" controls playsinline="" muted="">
													<source src="/au/images/objet/gallery/slide_video01.mp4" type="video/mp4">
												</video>
											</div>
											<!-- <div class="swiper-slide">
										<video autoplay="" controls playsinline="" muted=""><source src="/au/images/objet/gallery/slide_video02.mp4" type="video/mp4"></video>
									</div> -->
											<div class="swiper-slide">
												<video autoplay="" controls playsinline="" muted="">
													<source src="/au/images/objet/gallery/slide_video03.mp4" type="video/mp4">
												</video>
											</div>
										</div>
									</div>
									<div thumbsSlider="" class="swiper thumbs_slider">
										<div class="swiper-wrapper">
											<div class="swiper-slide">
												<img src="/au/images/objet/gallery/thumbnail01.png" />
											</div>
											<!-- <div class="swiper-slide">
										<img src="/au/images/objet/gallery/thumbnail02.png" />
									</div> -->
											<div class="swiper-slide">
												<img src="/au/images/objet/gallery/thumbnail03.png" />
											</div>
										</div>
										<div class="swiper-button-next"></div>
										<div class="swiper-button-prev"></div>
									</div>
								</div>
								<!--// gallery_list -->
							</div>
							<!-- @2022-05-27 FAQ 추가 / footer 디스클레이머 추가 (s) -->
							<div id="innerFAQ" class="inner_contents">
								<div class="inner_wrap">
									<div class="title">
										<h2>FAQ</h2>
									</div>
									<div class="faq_cont">
										<dl>
											<dt>
												<button type="button">
													<p>How can I get an indication of shipping times on Objet Collection products?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">
													<span> 1. If you select standard colour option which is Solid Metal – Green (Fridge), Silver (2 x Freezers), estimated shipping timing will be within 1 week from the purchase date. </span> <br>
													<span> 2. If you select customized colour option, it up to 4 weeks of estimated shipping timing. Our Customer Care Team will give you a contact for updates on shipping timeframe based on your order. If you have any concerns please contact LG Customer Care </span> <br>
													<span class="in_desc">
														<span> Email : obsanz@lge.com </span>
														<span> Live Chat : <a href="https://www.lg.com/au/support/chat-email" target="_blank" title="https://www.lg.com/au/support/chat-email">https://www.lg.com/au/support/chat-email</a> </span>
														<span> Telephone : 1300 54 22 73 (Monday to Sunday 8 am to 8pm AEST)</span>
													</span>
												</p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>What is the number / email address for customer enquiries for Objet Collection products?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">
													<span> Please contact obsanz@lge.com for purchase/stock enquiries. For enquiries after purchase(repair, colour change, etc) please contact LG Customer Care </span> <br>
													<span class="in_desc">
														<span> Live Chat/Email: <a href="https://www.lg.com/au/support/chat-email" target="_blank" title="https://www.lg.com/au/support/chat-email">https://www.lg.com/au/support/chat-email</a></span>
														<span> Telephone: 1300 54 22 73 (Monday to Sunday 8 am to 8pm AEST) </span>
													</span>
												</p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>Can I mix and match the Solid Metal and Mist Glass colours?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">Unfortunately, only same materials will be available to match.</p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>How many different colored panels can I order for a French Door Fridge?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">There are total 7 colours available. 3 Colours for Solid Metal and 4 Colours for Mist Glass.</p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>How do I ‘fit’ my interchangeable panels? Can I ‘fit’ the interchangeable panels myself?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">If you select customized colour option, LG will complete all panel change and deliver to your house.</p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>What is the cost for new panels and for a panel fit service?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">If you select customized colour when you purchase, they will be no extra charge. If you wish to change panels in the future, please check with LG Customer Care for service fees.</p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>Can I change the colour of the interchangeable panels in future?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">Yes you can. Panels will be able to be purchased via LG Online Store. However, LG do not recommend of self-changing the panels*. Please contact LG Customer Care for Authorized Service Agent to provide service**. <br> *LG is not responsible for any damages/product faults occurred during self-change **Additional labour cost will be applied </p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>Can I get a colour sample / swatch of the interchangeable panels prior to purchase?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">Unfortunately, we cannot provide any sample / swatch for this but, you can built it your style in o virtual experience space on our Objet collection web page. </p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>What are the Pantone colours of the interchangeable panels?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">Unfortunately, we cannot provide certain Pantone colours, you can built it your style in virtual experience space on our Objet collection web page.</p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>How do I clean the Solid Metal Panels</p>
												</button>
											</dt>
											<dd>
												<p class="answer">Please refer to check Owner’s Manual cleaning guide. <br>
													<br> For the appliance exterior, use a clean sponge or soft cloth and a mild detergent in warm water. Do not use abrasive or harsh cleaners. Dry thoroughly with a soft cloth. Do not use contaminated cloths when cleaning the stainless steel doors. Always use a dedicated cloth and wipe in the same direction as the grain. This helps reduce surface staining and tarnishing. A Stainless Steel protection solution can also be applied to further protect the finish.
												</p>
											</dd>
										</dl>
										<!-- <dl>
                           <dt>
                              <button type="button">
                                 <p>How do I clean the Mist Glass Panels</p>
                              </button>
                           </dt>
                           <dd>
                              <p class="answer">A)	Please refer to check Owner’s Manual cleaning guide.  <br> <br>
                                 For the appliance exterior, use a clean sponge or soft cloth and a mild detergent in warm water. Do not use abrasive or harsh cleaners. Dry thoroughly with a soft cloth. Do not use contaminated cloths when cleaning the stainless steel doors. Always use a dedicated cloth and wipe in the same direction as the grain. This helps reduce surface staining and tarnishing. A Stainless Steel protection solution can also be applied to further protect the finish.
                                 </p>
                           </dd>
                        </dl> -->
										<dl>
											<dt>
												<button type="button">
													<p>What if the product arrives and I do not like the colours I have selected?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">If you wish to change colour, please contact LG Customer Care to discuss. Certain charge will be applied for service fees and panel cost. For return, you can lodge claim as ‘Change of Mind’ return to LG Customer Care Team on 1300 54 22 73(Option 5). Please check detail for ‘Change of mind’ condition from T&C at the link(<a href="https://www.lg.com/au/terms-and-conditions-of-sale)" title="https://www.lg.com/au/terms-and-conditions-of-sale)" target="_blank">https://www.lg.com/au/terms-and-conditions-of-sale)</a>.</p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>What clearance space do I require around the French Door Fridge?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">Please refer to check Owner’s Manual cleaning guide. <br> Dimensions and Clearances Too small of a distance from adjacent items may result in the degradation of freezing capability and increased electricity costs. Allow over 50 mm of clearance between the back of the appliance and the wall when installing the appliance. </p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>What clearance space do I required around the stand alone Fridge or Freezer unit?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">Please refer to check Owner’s Manual cleaning guide. <br> Dimensions and Clearances Too small of a distance from adjacent items may result in the degradation of freezing capability and increased electricity costs. Allow over 50 mm of clearance between the back of the appliance and the wall when installing the appliance. </p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>Can I replace the InstaView glass panel with a solid panel?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">Unfortunately, we cannot dissemble and replace it. But, we will launch the basic model will be launched later.</p>
											</dd>
										</dl>
										<dl>
											<dt>
												<button type="button">
													<p>I cannot add to cart the product I want. Do you have a wait list? Will you advise me when product is in stock?</p>
												</button>
											</dt>
											<dd>
												<p class="answer">Please select stock alert button and fill your contact detail. However, please contact obsanz@lge.com if you wish to make an enquiry for further detail.</p>
											</dd>
										</dl>
									</div>
								</div>
								<!-- top button -->
								<jsp:include page="/WEB-INF/jsp/gp/common/include/body/top.jsp" />
								<!-- // top button -->
								<div class="container-fluid">
									<div class="footer-box">
										<div class="footer-component">
											<div class="footer-caution"> *LG Objet® Collection comes in colour configuration indicated in product name if no custom panels are selected. Custom panels can be selected at checkout and will be fitted to your LG Objet® Collection product prior to dispatch as part of the initial purchase price. Delivery of customised order is dependent on stock availability of the colour panels at time of purchase. Estimated delivery for customised order with colour panels in stock is up to 4 weeks from purchase date. Please contact LG support team at obsanz@lge.com for any queries including orders, specific requirements and indicative delivery timeframes. </div>
										</div>
									</div>
								</div>
								<!-- footer seo copy -->
								<c:import url="/${localeCd }/footerSeoCopy" />
								<!-- footer seo copy -->
								<!-- footer main contents -->
								<c:import url="/${localeCd }/footer">
									<c:param name="bizType" value="${bizType}" />
									<c:param name="siteType" value="${siteType}" />
								</c:import>
								<!--// footer main contents -->
							</div>
							<!-- @2022-05-27 FAQ 추가 / footer 디스클레이머 추가 (e) -->
						</div>
					</div>
					<!-- @2022-06-07 시뮬레이터, 비디오 섹션 변경 (e) -->
				</div>
				<script>
					// adobe launch - data layer
					/*_dl = {
						"page_name" : {
							bu : "mu", // fixed value by LG Business Unit (ha, he, mc, xbu)
							super_category: "mobile",
							category : "cell-phones",
							sub_category : "",
							page_purpose : "microsite", // Fixed value microsite
							product_year : "",
							model_id : "", // model, review page
							bundle_name : "", // bundle promotion
							promotion_name : "",  // promotion detail page
							microsite_name : "g8x-thinq-dual-screen" // microsite page
						},
						"country_code" : "cn",
						"language_code" : "zh_CN",
						"page_category_l1" : "cn:mobile",
						"page_category_l2" : "cn:mobile:cell-phones",
						"page_category_l3" : "",
						"page_category_l4" : "",
						"promotion_name" : "",
						"products" : "",
						"page_event" : ""
					};*/
					_dl =
					{
						"page_name": {
							"bu": "ha",
							"super_category": "au:home-appliances",
							"category": "LG Objet Collection",
							"sub_category": "",
							"page_purpose": "microsite", // Fixed value microsite
							"product_year": "",
							"model_id": "", // model, review page
							"bundle_name": "", // bundle promotion
							"promotion_name": "",  // promotion detail page
							"microsite_name": "LG Objet Collection"
						},
						"country_code": "au",
						"language_code": "en",
						"page_category_l1": "au:LG Objet Collection",
						"page_category_l2": "au:product:LG Objet Collection",
						"page_category_l3": "au:product:LG Objet Collection",
						"page_category_l4": null,
						"promotion_name": null,
						"products": null,
						"page_event": null
					};

					// gtm
					var standardData = {};
					standardData = {
						"siteType": "B2C",
						"pageType": "home",
						"pdpStatus": "",
						"level1": "",
						"level2": "",
						"level3": ""
					};
					var dataLayer = window.dataLayer || [];
					dataLayer.push({
						'event': 'dataLayer',
						'dataLayer': _dl,
						'standardData': standardData
					});
				</script>
				<!-- default code -->
				<jsp:include page="/WEB-INF/jsp/gp/common/include/tail/tail-script-default.jsp" />
				<!-- // default code -->
				<!-- your js -->
				<script src="/au/js/objet/swiper.js"></script>
				<script src="/au/js/objet/FileSaver.js" type="text/javascript" charset="utf-8"></script>
				<script src="/au/js/objet/html2canvas.js" type="text/javascript" charset="utf-8"></script>
				<script src="/au/js/objet/es6-promise.auto.js" type="text/javascript" charset="utf-8"></script>
				<script src="/au/js/objet/smooth-scrollbar.js" type="text/javascript" charset="utf-8"></script>
				<!-- @2022-05-27 TweenMax 플러그인 추가 (s) -->
				<script src="./js/objet/TweenMax.min.js"></script>
				<!-- @2022-05-27 TweenMax 플러그인 추가 (e) -->
				<!-- <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script> -->
				<script src="/au/js/objet/new_objet.js"></script>
				<script src="/au/js/objet/new_objet_simulator.js"></script>
				<script src="/au/js/objet/new_objet_simulator_core.js"></script>
				<script src="/au/js/objet/new_objet_simulator2.js"></script>
		</body>
		</html>