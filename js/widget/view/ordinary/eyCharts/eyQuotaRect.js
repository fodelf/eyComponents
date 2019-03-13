/*!
* Instruction : 方形指标
* 
* Author : 缪星
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyQuotaRect = function(args){
    	//继承线图基类
    	ey.extendProperty(this,"eyBridge","widget",[args]);
    	//dom模板
//  	this._domTemplate = $("<div class='ey-lineCharts ey-widget eyCharts eyCharts-bg-blue'>"
//  						//蒙层
//  						+"<div class ='ey-chartsLayer'></div>"
//							// 标题
//  						+ "<h5></h5>"
//  						//图形内容区域
//  						+"<div class='ey-chartsContent'></div>"    						
//  						+"</div>");
    	this._domTemplate = $("<div class='eyQuotaRect ey-lineCharts ey-widget eyCharts eyCharts-bg-blue'>"
    						+"<div class ='ey-chartsLayer'></div>"
    						+"<h5></h5><div><div class='quotaContain'><p>1111</p><p><span class ='ey-quotaThem'></span><span ></span><span class ='ey-quotaThem'></span></p></div></div></div>");
    	this.widgetName = "eyQuotaRect";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    };
    //继承组件基类
    ey.extendFun(EyQuotaRect,"eyBridge","widget");
    //扩展当前组件
    ey.expandPrototype(EyQuotaRect,{
    	domInit: function(){
			//设置dom元素Id
    		this._domTemplate.attr({
    			"id":this.id
    		});
   		},
    	setQuotaType:function(quotaType){
    		this.quotaType = quotaType;
    		switch(quotaType){
    			case "value":
    				this._domTemplate.find('.quotaContain span').eq(1).text(this.option[0].value);
    				break;
    			case "percent":
    				this._domTemplate.find('.quotaContain span').eq(1).text(parseFloat(this.option[0].value) *100 + '%');
    				break;
    		}
    	},
    	getQuotaType:function(){
    		return this.quotaType;
    	},
    	
    	setQuotaColor:function(quotaColor){
    		this.quotaColor = quotaColor;
    		this._domTemplate.find('.quotaContain span').eq(1).css("color",quotaColor[0].full);
    	},
    	getQuotaColor:function(){
    		return this.quotaColor;
    	},
    	
    	setQuotaFontSize:function(quotaFontSize){
    		this.quotaFontSize = quotaFontSize;
    		this._domTemplate.find('.quotaContain span').eq(1).css("font-size",quotaFontSize +'px');
    	},
    	getQuotaFontSize:function(){
    		return this.quotaFontSize;
    	},
    	setIsLabelShow: function(isLabelShow){
    		this._isLabelShow = isLabelShow;
    	},
    	getIsLabelShow :function(){
    		return this._isLabelShow;
    	},
    	setLabelText:function(labelText){
    		this.labelText = labelText;
    		this._domTemplate.find('p').eq(0).text(labelText);
    	},
    	getLabelText:function(){
    		return this.labelText;
    	},
    	
    	setLabelPosition:function(labelPosition){
    		
    		this.labelPosition = labelPosition;
    		this._domTemplate.find('p').eq(0).css("text-align",labelPosition);
    	},
    	getLabelPosition:function(){
    		return this.labelPosition;
    	},
    	setLabelFontSize:function(labelFontSize){
    		this.labelFontSize = labelFontSize;
    		this._domTemplate.find('p').eq(0).css("font-size",labelFontSize + 'px');
    	},
    	getLabelFontSize:function(){
    		return this.labelFontSize;
    	},
    	
    	setLabelFontColor:function(labelFontColor){
    		this.labelFontColor = labelFontColor;
    		this._domTemplate.find('p').eq(0).css("color",labelFontColor[0].full);
    	},
    	getLabelFontColor:function(){
    		return this.labelFontColor;
    	},
    	removeBg: function(theme){
    		switch (theme){
    			case "blue":
    			this._domTemplate.removeClass("eyCharts-bg-white");
    			this._domTemplate.addClass("eyCharts-bg-blue");
    			this._domTemplate.removeClass("eyCharts-bg-black");
    			this.color = "#fff";
    			this._domTemplate.find("p").css({"color":"#fff"});
    			this._domTemplate.find(".ey-quotaThem").css({"color":"#fff"});
    			if(this._wordColor[0].full == "rgb(102, 102, 102)"){
    				this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
    				this.setWordColor(this._wordColor);
    			};
    				break;
    			case "white":
    			this._domTemplate.removeClass("eyCharts-bg-blue");
    			this._domTemplate.addClass("eyCharts-bg-white");
    			this._domTemplate.removeClass("eyCharts-bg-black");
    			this.color = "rgb(102, 102, 102)";
    			this._domTemplate.find("p").css({"color":"rgb(102, 102, 102)"});
    			this._domTemplate.find(".ey-quotaThem").css({"color":"rgb(102, 102, 102)"});
    			if(this._wordColor[0].full == "#fff"){
					this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"rgb(102, 102, 102)"}];
					this.setWordColor(this._wordColor);
				};
    				break;
    			case "black":
        			this._domTemplate.removeClass("eyCharts-bg-blue");
        			this._domTemplate.removeClass("eyCharts-bg-white");
        			this._domTemplate.addClass("eyCharts-bg-black");
        			this.color = "#fff";
        			this._domTemplate.find("p").css({"color":"#fff"});
        			this._domTemplate.find(".ey-quotaThem").css({"color":"#fff"});
        			if(this._wordColor[0].full == "rgb(102, 102, 102)"){
        				this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
        				this.setWordColor(this._wordColor);
        			};
        			break;
    			default:
    				break;
    		}
    	},
    	setIsPreShow:function(isPreShow){
    		this.isPreShow = isPreShow;
    		if(isPreShow == true){
    			this._domTemplate.find('.quotaContain span').eq(0).show()
    		}else{
    			this._domTemplate.find('.quotaContain span').eq(0).hide()
    		}
    		
    	},
    	getIsPreShow:function(){
    		return this.isPreShow;
    	},
    	
    	setPreColor:function(preColor){
    		this.preColor = preColor;
    		this._domTemplate.find('.quotaContain span').eq(0).css("color",preColor[0].full);
    	},
    	getPreColor:function(){
    		return this.preColor;
    	},
    	setPreFontSize:function(preFontSize){
    		this.preFontSize = preFontSize;
    		this._domTemplate.find('.quotaContain span').eq(0).css("font-size",preFontSize +'px');
    	},
    	getPreFontSize:function(){
    		return this.preFontSize;
    	},
    	
    	setIsNextShow:function(isNextShow){
    		this.isNextShow = isNextShow;
    		if(isNextShow == true){
    			this._domTemplate.find('.quotaContain span').eq(2).show()
    		}else{
    			this._domTemplate.find('.quotaContain span').eq(2).hide()
    		}
    	},
    	getIsNextShow:function(){
    		return this.isNextShow;
    	},
    	
    	setNextColor:function(nextColor){
    		this.nextColor = nextColor;
    		this._domTemplate.find('.quotaContain span').eq(2).css("color",nextColor[0].full);
    	},
    	getNextColor:function(){
    		return this.nextColor;
    	},
    	setNextFontSize:function(nextFontSize){
    		this.nextFontSize = nextFontSize;
    		this._domTemplate.find('.quotaContain span').eq(2).css("font-size",nextFontSize +'px');
    	},
    	getNextFontSize:function(){
    		return this.nextFontSize;
    	},
    	setColor:function(color){
    		this.color = color;
    	},
    	getColor:function(){
    		return this.color;
    	},
    	setLeft:function(left){
    		this.left = left;
    	},
    	getLeft:function(){
    		return this.left;
    	},
    	setTop:function(top){
    		this.top = top;
    	},
    	getTop:function(){
    		return this.top;
    	},
    	setPreText:function(preText){
			this.preText = preText;
			this._domTemplate.find('.quotaContain span').eq(0).text(this.preText);
		},
		getPreText:function(){
			return this.preText;
		},
		setNextText:function(nextText){
			this.nextText = nextText;
			this._domTemplate.find('.quotaContain span').eq(2).text(this.nextText);
		},
		getNextText:function(){
			return this.nextText;
		},
    	setOption:function(option){
    		this.option = option;
    		this._domTemplate.find('.quotaContain span').eq(1).text(this.option[0].value);
    	},
    	getOption: function(){
    		this.option[0].value = "";
    		return  this.option;
    	},
    	setDomHeight :function(height){
			var that = this;
			ey.callFunction(this,"view","widget","setDomHeight",height);
			if(typeof height === "number"){
				this._domTemplate.find(".quotaContain p").eq(1).css('line-height',height - 80 + 'px')
			}else{				
				var heightPx = ey.callFunction(this,"view","widget","_remToPx",height,"return");
				this._domTemplate.find(".quotaContain p").eq(1).css('line-height',heightPx - 80 + 'px')
			};
		},
		createSaticData:function(){
			var data  = this.data;
			//无数据状态添加？
			var dataArry = data.resultList;
			//数组长度为0不绘图
			if(dataArry.length == 0){
				return;
			};
			var metaArry =  data.metaData;
			 //解析有问题时转换后台传递不了大写Y
			var yName = metaArry["y"] ? metaArry["y"] :metaArry["Y"];
			this._domTemplate.find('.quotaContain span').eq(0).text(yName[0]);
			this._domTemplate.find('.quotaContain span').eq(1).text(dataArry[0][0]);
		},
    	
    });
    
    ey.widget.eyQuotaRect = function (args){
    	return new EyQuotaRect (args);
    };
       
})($,ey,echarts);