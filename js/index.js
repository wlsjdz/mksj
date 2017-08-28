/*
* @Author: 吴腾鹏
* @Date:   2017-08-28 14:06:18
* @Last Modified by:   吴腾鹏
* @Last Modified time: 2017-08-28 16:38:47
*/
// 获取元素
var getElem = function(selector) {
	return document.querySelector(selector);
}

var getAllElem = function(selector) {
	return document.querySelectorAll(selector);
}

// 获取元素样式
var getCls = function(element) {
	return element.getAttribute('class');
}

var setCls = function(element,cls) {
	return element.setAttribute('class',cls);
}

// 为元素添加样式
var addCls = function(element,cls) {
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) === -1) {
		setCls(element,baseCls+' '+cls);
	}
}

var delCls = function(element,cls) {
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) != -1) {
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
	}
}


//初始化样式 init
var screenAnimateElements = {
	'.screen-1' : [
		'.screen-1__heading',
		'.screen-1__phone',
		'.screen-1__shadow'
	],
	'.screen-2' : [
		'.screen-2__heading',
		'.screen-2__phone',
		'.screen-2__subheading',
		'.screen-2__point',
		'.screen-2__point_i_1',
		'.screen-2__point_i_2',
		'.screen-2__point_i_3'
	],
	'.screen-3' : [
		'.screen-3__heading',
		'.screen-3__phone',
		'.screen-3__subheading',
		'.screen-3__features'
	],
	'.screen-4' : [
		'.screen-4__heading',
		'.screen-4__subheading',
		'.screen-4__type__item_i_1',
		'.screen-4__type__item_i_2',
		'.screen-4__type__item_i_3',
		'.screen-4__type__item_i_4'
	],
	'.screen-5' : [
		'.screen-5__heading',
		'.screen-5__subheading',
		'.screen-5__bg'
	]
};
//设置屏内元素为初始状态
var setScreenAnimateInit = function(screenCls) {
	var screen = document.querySelector(screenCls);
	var animateElement = screenAnimateElements[screenCls];
	for (var i = 0; i < animateElement.length; i++) {
			var element = document.querySelector(animateElement[i]);
			var baseCls = element.getAttribute('class');

			element.setAttribute('class', baseCls +' '+animateElement[i].substr(1)+'_animate_init');
	}
}
//设置播放屏内的元素动画
var playScreenAnimateDone = function(screenCls) {
	var screen = document.querySelector(screenCls);
	var animateElement = screenAnimateElements[screenCls];
	for (var i = 0; i < animateElement.length; i++) {
		var element = document.querySelector(animateElement[i]);
		var baseCls = element.getAttribute('class');

		element.setAttribute('class', baseCls.replace('init','done'));
	}
}

window.onload = function() {
	for(k in screenAnimateElements) {
		if (k === '.screen-1') {
			continue;
		}
		setScreenAnimateInit(k);
	}
}

// 第二步：滚动到哪里，就播放到哪里
var navItems = getAllElem('.header__nav-item');
var outLineItems = getAllElem('.outline__item');

var switchNavItemsActive = function(idx) {
	for (var i = 0; i < navItems.length; i++) {
		delCls(navItems[i],'header__nav-item_status_active');
	}
	addCls(navItems[idx],'header__nav-item_status_active');

	for (var i = 0; i < outLineItems.length; i++) {
		delCls(outLineItems[i],'outline__item_status_active');
	}
	addCls(outLineItems[idx],'outline__item_status_active');
}
switchNavItemsActive(0);
window.onscroll = function() {
	var top = document.body.scrollTop;
	// console.log(top);
	if (top > 80) {
		addCls(getElem('.header'),'header_status_back');
		addCls(getElem('.outline'),'outline_status_in');
	}else {
		delCls(getElem('.header'),'header_status_back');
		delCls(getElem('.outline'),'outline_status_in');
		
	}
	if (top > 1) {
		playScreenAnimateDone('.screen-1');
	}
	if (top > 800 * 1 - 100) {
		playScreenAnimateDone('.screen-2');
		switchNavItemsActive(1);
	}
	if (top > 800 * 2 - 100) {
		playScreenAnimateDone('.screen-3');
		switchNavItemsActive(2);
	}
	if (top > 800 * 3 - 100) {
		playScreenAnimateDone('.screen-4');
		switchNavItemsActive(3);
	}
	if (top > 800 * 4 - 100) {
		playScreenAnimateDone('.screen-5');
		switchNavItemsActive(4);
	}

}

// 第三步双向定位

var setNavJump = function(i,lib) {
	var item = lib[i];
	item.onclick = function() {
		// console.log(i);
		document.body.scrollTop = i * 800;
	}
}
for (var i = 0; i < navItems.length; i++) {
	setNavJump(i,navItems);
}
for (var i = 0; i < outLineItems.length; i++) {
	setNavJump(i,outLineItems);
}


// 第四步  滑动门
var navTip = getElem('.header__nav-tip');
var setTip = function(idx,lib) {
	lib[idx].onmouseover = function() {
		// console.log(this,idx);
		navTip.style.left = (idx *70) + "px";
	}

	var activeIdx = 0;
	lib[idx].onmouseout = function() {
		// console.log(this,idx);
		for (var i = 0; i < lib.length; i++) {
			if (getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
				activeIdx = i;
				break;
			}
		}
		navTip.style.left = (activeIdx *70) + "px";
	}
}
for (var i = 0; i < navItems.length; i++) {
	setTip(i,navItems);
}

setTimeout(function() {
	playScreenAnimateDone('.screen-1');
}, 200);