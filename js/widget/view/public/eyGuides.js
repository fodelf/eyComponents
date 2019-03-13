/*!
* Instruction :辅助线
* 
* Author : 吴文周
* 
* Date: 2017-03-20
*/
(function($,ey){
	"use strict";
	
    var EyGuides = function(type,locationType){
    	//辅助线样式类型
    	this._type = type;
    	//辅助线位置
    	this.locationType = locationType;
    	//辅助线dom模板
    	this._domTemplate = $("<div class='ey-guides ey-widget'></div>");
    };
    
    //扩展当前组件
    EyGuides.prototype = {    	
    	//获取jq对象
    	getJqDom : function(){
    		//根据初始化类型直接设置属性并返回初始化jq对象
    		var eyGuidesDom = this._domTemplate;
    		
			if(this._type == "vertical"){
				eyGuidesDom.addClass("ey-guides-vertical");
			}
			else{
				eyGuidesDom.addClass("ey-guides-horizontal");
			};
   			return eyGuidesDom;
   		},
    	//设置显示隐藏
		setDisplay : function(display){
			this._domTemplate.css("display",display);
		},
		//不必要的继承关系无需继承
		//设置左边距
		setDomLeft:function(left){
			this._setDomChange("left",left);			
		},
		//设置顶部距离
		setDomTop:function(top){
			this._setDomChange("top",top);	
		},
		//设置dom变化
		_setDomChange:function(type,val){
			this._domTemplate.css(type,val);	
		},
    };
    ey.widget.eyGuides = function(type,locationType){
    	
    	return new EyGuides(type,locationType);
    };
       
})($,ey);