'use strict';
{
	window.addEventListener("DOMContentLoaded", function(){
		// -------------------------- 変数の宣言 --------------------------
		let elem = [];
		let elems = [];
		let menuWrapper = {};
		let menuWrapperLeft = {};
		let menuWrapperRight = {};
		let fadeLeftTarget = [];
		let fadeRightTarget = [];
		let fadeUpTarget = [];
		let fadeDownTarget = [];
		let fadeInTarget = [];
		let currentSlideIndex = 0;
		let slideImgs = [];
		let slideImgsBox = {};
		let slidePrevButton = {};
		let slideNextButton = {};
		let slideIndexButtons = [];
		let slideActive = {};
		let beforeTranslate = "";
		let afterTranslate = "";
		// -------------------------- 関数の宣言 --------------------------
		function scrollIn(fadeTarget){
			for (let i = 0; i < fadeTarget.length; i++){
				const rect = fadeTarget[i].getBoundingClientRect().top; 
				const scroll = window.pageYOffset || document.documentElement.scrollTop; 
				const offset = rect + scroll;
				const windowHeight = window.innerHeight; 
				if (scroll > offset - windowHeight + 150) {
						fadeTarget[i].classList.add("--scroll_in");
				}
			}
		}
		function slideMove(){
			afterTranslate = "translate(" + currentSlideIndex * -855 + "px, 0)";
			slideImgsBox = document.getElementById("about_slide__box");
			slideImgsBox.animate(
				[
					{ transform: beforeTranslate },
					{ transform: afterTranslate }
				],
				{
					duration: 500,
					fill: 'forwards'
				}
			);
		}
		function slidePrev() {
			beforeTranslate = "translate(" + currentSlideIndex * -855 + "px, 0)";
			if(currentSlideIndex === 0){ //もし1番目の画像だったら
				currentSlideIndex = slideImgs.length - 1; //最後の画像に戻る
			}else{
				currentSlideIndex--; //それ以外は一つ前の画像に戻る
			}
			slideMove();
		}
		function slideNext() {
			beforeTranslate = "translate(" + currentSlideIndex * -855 + "px, 0)";
			if(currentSlideIndex === slideImgs.length - 1){ //もし最後の画像だったら
				currentSlideIndex = 0; //1番目の画像に戻る
			}else{
				currentSlideIndex++; //それ以外は次の画像に進む
			}
			slideMove();
		}
		function goToSlide(index) {
			beforeTranslate = "translate(" + currentSlideIndex * -855 + "px, 0)";
			currentSlideIndex = index;
			slideMove();
		}
		function slideActiveChange(){
			slideActive = document.getElementById("slide_active");
			slideActive.removeAttribute("id");
			slideIndexButtons[currentSlideIndex].setAttribute("id", "slide_active");
		}
		// -------------------------- 処理の実行 --------------------------
		// ローディング時のフェードイン 
		elems = document.querySelectorAll("body");
		elems.forEach(function(elem){
			elem.animate(
				[
					{ opacity: 0 },
					{ opacity: 1 }
				],
				{
					duration: 900,
					fill: 'forwards'
				}
			);
		});
	
		elem = document.getElementById("top_visual");
		elem.animate(
			[
				{ transform: "translate(-50px, 0)" },
				{ transform: "translate(0, 0)" }
			],
			{
				duration: 700,
				fill: 'forwards'
			}
		);
	
		elem = document.getElementById("top_link");
		elem.animate(
			[
				{ transform: "translate(50px, 0)" },
				{ transform: "translate(0, 0)" }
			],
			{
				duration: 700,
				fill: 'forwards'
			}
		);
	
		//menuのアニメーション背景の追加
		menuWrapper = document.getElementById("menu_wrapper");
		menuWrapperLeft = document.createElement("div");
		menuWrapperRight = document.createElement("div");
		menuWrapperLeft.classList.add("menu_wrapper__left");
		menuWrapperRight.classList.add("menu_wrapper__right");
		menuWrapperLeft.classList.add("--fade_left");
		menuWrapperRight.classList.add("--fade_right");
		menuWrapper.appendChild(menuWrapperLeft);
		menuWrapper.appendChild(menuWrapperRight);
	
		// スクロールアニメーション
		fadeLeftTarget  = document.getElementsByClassName("--fade_left");
		fadeRightTarget  = document.getElementsByClassName("--fade_right");
		 fadeUpTarget  = document.getElementsByClassName("--fade_up");
		fadeDownTarget  = document.getElementsByClassName("--fade_down");
		fadeInTarget  = document.getElementsByClassName("--fade_in");
	
		window.addEventListener("scroll", () => {
			 scrollIn(fadeInTarget);
			 scrollIn(fadeLeftTarget);
			 scrollIn(fadeRightTarget);
			 scrollIn(fadeUpTarget);
			 scrollIn(fadeDownTarget);
		});
	
		// スライド操作 
		slideImgs = document.getElementsByClassName("about_slide__img");
		// --- Prevボタン
		slidePrevButton = document.getElementById("about_slide__prev");
		slidePrevButton.addEventListener("click", function(){
			slidePrev();
			slideActiveChange();
		});
		// --- Nextボタン
		slideNextButton = document.getElementById("about_slide__next");
		slideNextButton.addEventListener("click", function(){
			slideNext();
			slideActiveChange();
		});
		// --- Activeボタン
		slideIndexButtons = document.getElementsByClassName("about_slide__change__button");
		for(let i = 0; i < slideIndexButtons.length; i++){
			slideIndexButtons[i].addEventListener("click", function(){
				goToSlide(i);
				slideActiveChange();
			});
		}
	});
}