/*!
* Instruction :  画布控件用来展示各种图形的整个区域
* 
* Author : 吴文周
* 
* Date: 2017-06-14
*/
(function($,ey,doc){
	"use strict";
	
    var EyCanvas = function(args){
    	//dom模板
    	this._domTemplate = $("<footer>"
    						+"<div class='ey-backLayer'></div>"
							+"</footer>");
    	//弹出框内容(jq对象)
    	this._eyCanvasContent = args.echartsObj;
    	//默认弹出
    	this.awake();
    };
    //扩展当前组件
    EyCanvas.prototype = {
    	
    	awake:function(){
			var eyCanvas = this._domTemplate;
			var currentObj = this;
			var childChartsObj =  this._eyCanvasContent;
			var eyChartsDom = childChartsObj.getJqDom();
			var rootParent = childChartsObj.getListenerParent();
//			rootParent.removeChild(childChartsObj);
			//移除一些不必要的元素与事件
			eyChartsDom.unbind("mouseover");
			eyChartsDom.unbind("mouseleave");
			eyChartsDom.find(".ey-max").remove();
			eyChartsDom.find(".ey-condtionSetting").hide();
			var domClose = $("<div  class='ey-maxClose'></div>");
			eyChartsDom.find("h5").append(domClose);
			var cacheTop = this._eyCanvasContent.getDomTop();
			var cacheLeft = this._eyCanvasContent.getDomLeft();
			var cacheWidth = this._eyCanvasContent.getDomWidth();
			var cacheHeight = this._eyCanvasContent.getDomHeight();
			
			//绑定点击事件返回操作
			domClose.bind("click",function(){
				eyChartsDom.css({
					"width":cacheWidth,
					"height":cacheHeight,
					"z-index":"0",
					"left": cacheLeft,
					"top": cacheTop
					});
				childChartsObj.setDomHeight(cacheHeight);
				childChartsObj.setDomWidth(cacheWidth);
				rootParent.getJqDom().append(childChartsObj.getJqDom());
				childChartsObj.setMaxBack();
				currentObj.close();
			});
			
//			var domWidth = parseFloat($("body").css("width"))*0.98;
//			var domHeight = parseFloat($("body").css("height"))*0.98;
//			var domLeft = parseFloat($("body").css("width"))*0.01;
//			var domTop = parseFloat($("body").css("height"))*0.01;
			var domWidth = parseFloat($("body").css("width")) - 20;
			var domHeight = parseFloat($("body").css("height")) - 20;
			var domLeft = 10;
			var domTop = 10;
			
			eyChartsDom.css({
							"width":domWidth,
							"height":domHeight,
							"z-index":"200",
							"left": domLeft,
							"top": domTop
						});
		    var height = domHeight;
		    var width = domWidth;
			this._eyCanvasContent.setDomHeight(height);
			this._eyCanvasContent.setDomWidth(width);
			eyCanvas.append(eyChartsDom);
			this._appendToBody(eyCanvas);
			
		},
		close:function(){
			 this._domTemplate.remove();
		},
		//添加蒙层的私有方法
		_appendToBody:function(eyCanvas){
			$("body").append(eyCanvas);	
		},
		  		 
    };
    ey.widget.eyCanvas = function(args){
    	
    	return new EyCanvas(args);
    };
       
})($,ey,document);