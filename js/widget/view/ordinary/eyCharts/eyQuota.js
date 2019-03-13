/*!
* Instruction : 指标
* 
* Author : 缪星
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyQuota = function(args){
    	//继承线图基类
    	ey.extendProperty(this,"eyBridge","widget",[args]);
    	//dom模板
    	this._domTemplate = $("<div class='eyQuota ey-lineCharts ey-widget eyCharts eyCharts-bg-blue'>"
    						+"<div class ='ey-chartsLayer'></div>"
    						+"<h5></h5><div><div class='quotaContain'><span></span><span></span></div><div></div>");
    	this.widgetName = "eyQuota";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    };
    //继承组件基类
    ey.extendFun(EyQuota,"eyBridge","widget");
    //扩展当前组件
    ey.expandPrototype(EyQuota,{
    	domInit: function(){
			//设置dom元素Id
    		this._domTemplate.attr({
    			"id":this.id
    		});
   		},
    	setQuotaType:function(quotaType){
    		this.quotaType = quotaType;
    		switch(quotaType){
    			case 'value':
    				this._domTemplate.find('.quotaContain span').eq(1).text(this.option[0].value);
    				break;
    			case 'percent':
    				this._domTemplate.find('.quotaContain span').eq(1).text(parseFloat(this.option[0].value) * 100 + '%');
    				break;
    		}
    	},
    	getQuotaType:function(){
    		return this.quotaType;
    	},
    	setIsLabelShow:function(isLabelShow){
    		this.isLabelShow = isLabelShow;
    		switch(isLabelShow){
    			case true:
    				this._domTemplate.find('.quotaContain span').eq(0).show();
    				break;
    			case false:
    				this._domTemplate.find('.quotaContain span').eq(0).hide();
    				break;
    		}
    	},
    	getIsLabelShow:function(){
    		return this.isLabelShow;
    	},
    	setLabelFontSize:function(labelFontSize){
    		this.labelFontSize = labelFontSize;
    		this._domTemplate.find('.quotaContain span').eq(0).css('font-size',labelFontSize+'px');
    	},
    	getLabelFontSize:function(){
    		return this.labelFontSize;
    	},
    	setLabelFontColor:function(labelFontColor){
    		this.labelFontColor = labelFontColor;
    		this._domTemplate.find('.quotaContain span').eq(0).css("color",labelFontColor[0].full)
    	},
    	getLabelFontColor:function(){
    		
    		return this.labelFontColor;
    	},
    	
    	setIsAxisLabelShow:function(isAxisLabelShow){
    		this.isAxisLabelShow = isAxisLabelShow;
    		switch(isAxisLabelShow){
    			case true:
    				this._domTemplate.find('.quotaContain span').eq(1).show();
    				break;
    			case false:
    				this._domTemplate.find('.quotaContain span').eq(1).hide();
    				break;
    		}
    	},
    	getIsAxisLabelShow:function(){
    		return this.isAxisLabelShow;
    	},
    	setAxisLabelColor:function(axisLabelColor){
    		this.axisLabelColor = axisLabelColor;
    		this._domTemplate.find('.quotaContain span').eq(1).css("color",axisLabelColor[0].full)
    	},
    	getAxisLabelColor:function(){
    		
    		return this.axisLabelColor;
    	},
    	setAxisFontSize:function(axisFontSize){
    		this.axisFontSize = axisFontSize;
    		this._domTemplate.find('.quotaContain span').eq(1).css("font-size",axisFontSize + 'px')
    	},
    	getAxisFontSize:function(){
    		return this.axisFontSize;
    	},
    	setLineColor:function(lineColor){
    		this.lineColor = lineColor;
    		this._domTemplate.find(".quotaContain").css('border-color',lineColor[0].full);
    	},
    	getLineColor:function(){
    		return this.lineColor;
    	},
    	
    	setLineWidth:function(lineWidth){
    		this.lineWidth = lineWidth;
    		this._domTemplate.find(".quotaContain").css('border-width',lineWidth + 'px');
    	},
    	getLineWidth:function(){
    		return this.lineWidth;
    	},
    	setColor:function(color){
    		this.color = color;
    	},
    	getColor:function(){
    		return this.color;
    	},
    	setLeft:function(left){
    		this.left = left;
    		this._domTemplate.find(".quotaContain").css('left',left + 'px');
    	},
    	getLeft:function(){
    		return this.left;
    	},
    	
    	setTop:function(top){
    		this.top = top;
    		this._domTemplate.find(".quotaContain").css('top',top + 'px');
    	},
    	getTop:function(){
    		return this.top;
    	},
    	setOption:function(option){
    		this.option = option;
    		this._domTemplate.find('.quotaContain span').eq(1).text(this.option[0].value);
			this._domTemplate.find('.quotaContain span').eq(0).text(this.option[0].name);
    	},
    	getOption: function(){
    		this.option[0].value = "";
    		this.option[0].name = "";
    		return  this.option;
    	},
    	removeBg: function(theme){
    		switch (theme){
    			case "blue":
    			this._domTemplate.removeClass("eyCharts-bg-white");
    			this._domTemplate.addClass("eyCharts-bg-blue");
    			this._domTemplate.removeClass("eyCharts-bg-black");
    			this.color = "#fff";
    			this._domTemplate.find('.quotaContain span').eq(0).css({"color":"#fff"});
    			this._domTemplate.find('.quotaContain span').eq(1).css({"color":"#fff"});
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
    			this._domTemplate.find('.quotaContain span').eq(0).css({"color":"rgb(102, 102, 102)"});
    			this._domTemplate.find('.quotaContain span').eq(1).css({"color":"rgb(102, 102, 102)"});
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
        			this._domTemplate.find('.quotaContain span').eq(0).css({"color":"#fff"});
        			this._domTemplate.find('.quotaContain span').eq(1).css({"color":"#fff"});
        			if(this._wordColor[0].full == "rgb(102, 102, 102)"){
        				this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
        				this.setWordColor(this._wordColor);
        			};
        			break;
    			default:
    				break;
    		}
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
		setDomHeight :function(height){
			var that = this;
			ey.callFunction(this,"view","widget","setDomHeight",height);
//			this._domTemplate.find('.quotaContain').width((height - 40) * 0.5 + 'px');
		},
		setDomWidth:function(width){
			var that = this;
			ey.callFunction(this,"view","widget","setDomWidth",width);
			var heightbase = this._height;
			var height = ey.callFunction(this,"view","widget","_remToPx",heightbase,"return"); 
			var dis = (parseFloat(height) -40 )*0.5;
//			var height = this._domTemplate.find('.quotaContain').css("height");
//			alert(height)
			this._domTemplate.find('.quotaContain').css("width",dis +'px');
		},
    	
    });
    
    ey.widget.eyQuota = function (args){
    	return new EyQuota (args);
    };
       
})($,ey,echarts);