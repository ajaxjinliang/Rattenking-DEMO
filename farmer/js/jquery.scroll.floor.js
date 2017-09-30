(function(window){
	var defaults = {
		floorClass : '.scroll-floor',
		navClass : '.scroll-nav',
		activeClass : 'active',
		activeTop : 100,
		scrollTop : 100,
		delayTime : 200
	};
	
	var $body = $('body'),data = [];
	function getItem(_list,newOptions){
		_list.each(function() {
            var item = {};
            
            item.$obj = $(this);
            item.$activeTop = $(this).offset().top - newOptions.activeTop;
            item.$scrollTop = $(this).offset().top + newOptions.scrollTop;
            
            data.push(item);
        });
	}
	
	function scrollActive(_list,newOptions){
		var nowScrollTop = $(window).scrollTop();
//		console.log(nowScrollTop);
		$.each(data,function(i,item){
			if(nowScrollTop > item.$activeTop){
				_list.removeClass(newOptions.activeClass).eq(i).addClass(newOptions.activeClass);
			}
		});
	}
	
	function clickActive(_index,newOptions){
    	$('html,body').animate({'scrollTop' : data[_index].$scrollTop},newOptions.delayTime);
    }
	
	var scroll_floor = window.scrollFloor = function(options){
		var newOptions = $.extend({}, defaults, options);
		var floorList = $(newOptions.floorClass),navList = $(newOptions.navClass);
		
		getItem(floorList,newOptions);
		scrollActive(navList,newOptions);
		
		
        $(window).bind('scroll',function(){scrollActive(navList,newOptions);});
        navList.bind('click',function(){
        	var _index = $(this).index();
        	clickActive(_index,newOptions);
        });
	}
})(window);
