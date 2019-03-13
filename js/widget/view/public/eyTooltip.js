/*!
* Instruction :弹出框，所有实例化对象都可以唤起弹出框
* 
* Author : 吴文周
* 
* Date: 2017-03-20
*/
(function($,ey){
	"use strict";
	
    var EyTooltip = function(args){
    	//dom模板
    	this._domTemplate = $("<footer>"
    						+"<div class='ey-backLayer'></div>"
							+"<div class='ey-contLayer'>"
							+"<h5 class='ey-tooltipTitle'>"
							+"<span></span>"
							+"</h5>"					
							+"<p id='ey-tooltipButtonLine'><button class='ey-commitBtn ey-btn'>确定</button><button class='ey-cancelBtn ey-btn'>取消</button></p>"							
							+"</div>"
							+"</div>"
							+"</footer>");
    	//弹出框标题
    	this._eyTooltipTitle = args.title;
    	//弹出框内容(jq对象)
    	this._eyTooltipContent = args.content;
    	//弹出框样式
    	this._eyTooltipClass = args.className;
		//确定取消回调
    	this._commitCallback = args['commit'];
		this._cancleCallback = args['cancel'];
    	
    };
    //扩展当前组件
    EyTooltip.prototype = {
    	
    	awake:function(){
			var eyTooltip = this._domTemplate;
			eyTooltip.find("h5 > span").html(this._eyTooltipTitle);
			eyTooltip.find("h5").after(this._eyTooltipContent);
			eyTooltip.find('.ey-contLayer').addClass(this._eyTooltipClass);
			var currentObj = this;
			//取消确定 绑定
			eyTooltip.find(".ey-cancelBtn").on("click",function(){
				currentObj._cancleCallback();
			});
			eyTooltip.find(".ey-commitBtn").on("click",function(){
				currentObj._commitCallback();
			});
			this._appendToBody(eyTooltip);
		},
		close:function(){
			 this._domTemplate.remove();
		},
		//添加蒙层的私有方法
		_appendToBody:function(eyTooltip){
			$("body").append(eyTooltip);	
		},
		  		 
    };
    ey.widget.eyTooltip = function(args){
    	
    	return new EyTooltip(args);
    };
       
})($,ey);