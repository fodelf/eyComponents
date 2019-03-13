/*!
* Instruction : 线图
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyTubeDashBoard = function(args){
    	//继承线图基类
    	ey.extendProperty(this,"eyBridge","widget",[args]);
    	//dom模板
		$("<div class='eyTubeDashBoard ey-lineCharts ey-widget eyCharts eyCharts-bg-blue'><h3></h3><span>0%</span><span>100%</span><div><div></div><div class='compWidth'></div></div><p></p></div>");
    	this._domTemplate = $("<div class='eyTubeDashBoard ey-lineCharts ey-widget eyCharts eyCharts-bg-blue'>"
    						+"<div class ='ey-chartsLayer'><span>0%</span><span>100%</span><span></span><div class='tube'><div class='circle'></div><div class='compWidth'></div></div><p></p></div>"
    						+"<h5></h5></div>");
    	this.widgetName = "eyTubeDashBoard";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    };
    //继承组件基类
    ey.extendFun(EyTubeDashBoard,"eyBridge","widget");
    //扩展当前组件
    ey.expandPrototype(EyTubeDashBoard,{
    	setQuotaType:function(quotaType){
    		this.quotaType = quotaType;
    		switch(quotaType){
    			case 'value':
    				
    				break;
    			case 'percent':
    				
    				break;
    		}
    	},
    	getQuotaType:function(){
    		return this.quotaType;
    	},
    	
    	setQuotaColor:function(quotaColor){
    		this.quotaColor = quotaColor;
    		this._domTemplate.find(".circle").css('border-color',quotaColor[0].full);
    		this._domTemplate.find(".compWidth").css('background-color',quotaColor[0].full);
    	},
    	getQuotaColor:function(){
    		return this.quotaColor;
    	},
    	
    	setQuotaHeight:function(quotaHeight){
    		this.quotaHeight = quotaHeight;
//  		this._domTemplate.find(".compWidth").css({'height':quotaHeight+'px','border-radius':quotaHeight/2 +'px'});
//  		this._domTemplate.find("div").eq(1).css({'height':quotaHeight+'px','border-radius':quotaHeight/2 +'px'});
    	},
    	getQuotaHeight:function(){
    		return this.quotaHeight;
    	},
    	
    	setQuotaMin:function(quotaMin){
    		this.quotaMin = quotaMin;
//  		this._domTemplate.find(".compWidth").css('height',quotaHeight+'px');
    	},
    	getQuotaMin:function(){
    		return this.quotaMin;
    	},
    	
    	setQuotaMax:function(quotaMax){
    		this.quotaMax = quotaMax;
//  		this._domTemplate.find(".compWidth").css('height',quotaHeight+'px');
    	},
    	getQuotaMax:function(){
    		return this.quotaMax;
    	},
    	
    	setIsLabelShow:function(isLabelShow){
    		this.isLabelShow = isLabelShow;
    		switch(isLabelShow){
    			case true:
    				this._domTemplate.find("p").show();
    				break;
    			case false:
    				this._domTemplate.find("p").hide();
    				break;
    			}
    	},
    	getIsLabelShow:function(){
    		return this.isLabelShow;
    	},
    	
    	setLabelText:function(labelText){
    		this.labelText = labelText;
    	},
    	getLabelText:function(){
    		return this.labelText;
    	},
    	
    	setLabelFontSize:function(labelFontSize){
    		this.labelFontSize = labelFontSize;
    		this._domTemplate.find("p").css('font-size',labelFontSize+'px');
    	},
    	getLabelFontSize:function(){
    		return this.labelFontSize;
    	},
    	
    	setLabelFontColor:function(labelFontColor){
    		this.labelFontColor = labelFontColor;
    		this._domTemplate.find("p").css('color',labelFontColor[0].full);
    	},
    	getLabelFontColor:function(){
    		return this.labelFontColor;
    	},
    	
    	setIsPreShow:function(isPreShow){
    		this.isPreShow = isPreShow;
    		if(isPreShow == true){
    			this._domTemplate.find('span').eq(2).show();
    		}else{
    			this._domTemplate.find('span').eq(2).hide()
    		}
    		
    	},
    	getIsPreShow:function(){
    		return this.isPreShow;
    	},
    	
    	setPreColor:function(preColor){
    		this.preColor = preColor;
    		this._domTemplate.find('span').eq(2).css("color",preColor[0].full);
    	},
    	getPreColor:function(){
    		return this.preColor;
    	},
    	setPreFontSize:function(preFontSize){
    		this.preFontSize = preFontSize;
    		this._domTemplate.find('span').eq(2).css("font-size",preFontSize +'px');
    	},
    	getPreFontSize:function(){
    		return this.preFontSize;
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
			this._domTemplate.find('span').eq(0).text(this.preText);
		},
		getPreText:function(){
			return this.preText;
		},
    	setOption:function(option){
    		this.option = option;
    		this._domTemplate.find('p').text(this.option.metaData["Y"]);
    		this._domTemplate.find('.compWidth').css('width',this.option.resultList[0]*100 + '%');
    		
    		this._domTemplate.find('.circle').css('left',parseFloat(this.option.resultList[0]*100) - 3 + '%');
    		var circleLeft = this._domTemplate.find('.circle').css("left");
    		this._domTemplate.find('span').eq(2).css('left',circleLeft);
    		var text = this.option.resultList[0]*100;
    		this._domTemplate.find('span').eq(2).text(text.toLocaleString() + '%');
    	},
    	getOption: function(){
    		var returnOption = JSON.stringify(this.option);
			returnOption = JSON.parse(returnOption);
			returnOption.metaData["Y"] = "";
			returnOption.resultList[0] = "" ;
			return returnOption;
    	},
    	createSaticData:function(){
    		var data = this.data;
    		this.setOption(data);
    	},
    	removeBg: function(theme){
    		switch (theme){
    			case "blue":
    			this._domTemplate.removeClass("eyCharts-bg-white");
    			this._domTemplate.addClass("eyCharts-bg-blue");
    			this._domTemplate.removeClass("eyCharts-bg-black");
    			this.color = "#fff";
    			this._domTemplate.find('span').eq(2).css("color","#fff");
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
    			this._domTemplate.find('span').eq(2).css("color","rgb(102, 102, 102)");
    			if(this._wordColor[0].full == "#fff"){
					this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"rgb(102, 102, 102)"}];
					this.setWordColor(this._wordColor);
				};
    				break;
    			case "black":
        			this._domTemplate.removeClass("eyCharts-bg-blue");
        			this._domTemplate.removeClass("eyCharts-bg-white");
        			this._domTemplate.addClass("eyCharts-bg-black");
        			this._domTemplate.find('span').eq(2).css("color","#fff");
        			this.color = "#fff";
        			if(this._wordColor[0].full == "rgb(102, 102, 102)"){
        				this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
        				this.setWordColor(this._wordColor);
        			};
        			break;
    			default:
    				break;
    		}
    	},
    	setDomHeight :function(height){
			var that = this;
			ey.callFunction(this,"view","widget","setDomHeight",height);
			this._domTemplate.find(".quotaContain").css('line-height',height - 40 + 'px')
		},
    	
    });
    
    ey.widget.eyTubeDashBoard = function (args){
    	return new EyTubeDashBoard (args);
    };
       
})($,ey,echarts);