/*!
* Instruction : 单线雷达图
* 
* Author : 缪星
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EySingleLineRadar = function(args){
    	//继承线图基类
    	ey.extendProperty(this,"eyCharts","widget",[args]);
    	//dom模板
    	this._domTemplate = $("<div class='ey-lineCharts ey-widget eyCharts eyCharts-bg-blue'>"
    						//蒙层
    						+"<div class ='ey-chartsLayer'></div>"
							// 标题
    						+ "<h5></h5>"
    						//图形内容区域
    						+"<div class='ey-chartsContent'></div>"    						
    						+"</div>");
    	this.widgetName = "eySingleLineRadar";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    };
    //继承组件基类
    ey.extendFun(EySingleLineRadar,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EySingleLineRadar,{
    	//设置图例类型
    	setLegendType : function(legendType){
    		var that = this;
    		this.legendType = legendType;
    		if(legendType == 'hollow'){
    			$.each(this.option.series, function(i,value) {
    				value.symbol = 'circle';
    				value.itemStyle.normal.borderColor = "#fff";
    				value.itemStyle.normal.color = that.lineColor[i].full;
    			});
    		}else{
    			$.each(this.option.series, function(i,value) {
    				value.symbol = legendType;
    				value.itemStyle.normal.borderColor = that.lineColor[i].full;
    			});
    		}
    		
    	},
    	getLegendType : function(){
    		return this.legendType;
    	},
    	//设置图例位置
    	setLegendLocation : function(legendLocation){
    		this.legendLocation = legendLocation;
    		switch(legendLocation){
    			case 'up':
    				delete this.option.legend.bottom;
    				$.extend(true, this.option.legend, {'top':10,'left':'center','orient':'horizontal'});
    				$.extend(true, this.option.grid, {'right':'30','top':40,'bottom':20});
    				break;
    			case 'right':
    				$.extend(true, this.option.legend, {'left':"right",'top':'center','orient':'vertical'});
    				$.extend(true, this.option.grid, {'right':"100",'top':'20','bottom':20});
    				break;
    			case 'down':
    				$.extend(true, this.option.legend, {'bottom':10,'left':'center','top':'','orient':'horizontal'});
    				$.extend(true, this.option.grid, {'right':'30','top':'20','bottom':40});
    				break;
    		}
    		
    	},
    	getLegendLocation : function(){
    		return this.legendLocation;
    	},
    	setSymbolSize:function(symbolSize){
    		this.symbolSize = symbolSize;
    		$.each(this.option.series,function(i,value){
    			value.symbolSize = symbolSize;
    		})
    	},
    	getSymbolSize:function(){
    		return this.symbolSize;
    	},
    	setLineType : function(lineType){
    		var that = this;
    		this.lineType = lineType;
    		switch(lineType){
    			case 'circle':
	    			that.option.radar.shape = "circle";
	    			that.option.series[0].areaStyle.normal.opacity = 0;
    				break;
    			case 'straight':
	    			that.option.radar.shape = "";
	    			that.option.series[0].areaStyle.normal.opacity = 0;
    				break;
    			case 'circlearea':
	    			that.option.radar.shape = "circle";
	    			that.option.series[0].areaStyle.normal.opacity = 0.3;
    				break;
    			case 'straightarea':
	    			that.option.radar.shape = "";
	    			that.option.series[0].areaStyle.normal.opacity = 0.3;
    				break;
    		}
    	},
    	getLineType : function(){
    		return this.lineType;
    	},
    	setLineColor : function(lineColor){
    		this.lineColor = lineColor;
    		$.each(this.option.series,function(i,value){
    			value.lineStyle.normal.color = lineColor[i].full;
    		})
    		switch(this.lineType){
    			case 'hollow':
	    			$.each(this.option.series,function(i,value){
		    			value.itemStyle.normal.color = lineColor[i].full;
		    			value.itemStyle.normal.borderColor = "#fff";
		    		})
//  				this.option.series[0].itemStyle.normal.color = lineColor;
//  				this.option.series[0].itemStyle.normal.borderColor = "#fff";
    				break;
    			case 'circle':
    				$.each(this.option.series,function(i,value){
		    			value.itemStyle.normal.color = lineColor[i].full;
		    			value.itemStyle.normal.borderColor = lineColor[i].full;
		    		})
//  				this.option.series[0].itemStyle.normal.color = lineColor;
//  				this.option.series[0].itemStyle.normal.borderColor = lineColor;
    				break;
    			default:
    				$.each(this.option.series,function(i,value){
		    			value.itemStyle.normal.color = lineColor[i].full;
		    			value.itemStyle.normal.borderColor = lineColor[i].full;
		    		})
//  				this.option.series[0].itemStyle.normal.color = lineColor;
//  				this.option.series[0].itemStyle.normal.borderColor = lineColor;
    		}
    		
    	},
    	getLineColor : function(){
//  		alert(this.lineColor);
    		return this.lineColor;
    	},
    	
    	setAxisLineColor:function(axisLineColor){
    		this.axisLineColor = axisLineColor;
    		this.option.radar.axisLine.lineStyle.color = axisLineColor[0].full;
    	},
    	getAxisLineColor:function(){
    		return this.axisLineColor;
    	},
    	
    	setAxisLineWidth:function(axisLineWidth){
    		this.axisLineWidth = axisLineWidth;
    		this.option.radar.axisLine.lineStyle.width = axisLineWidth;
    	},
    	getAxisLineWidth:function(){
    		return this.axisLineWidth;
    	},
    	
    	setIsAxisLabelShow:function(isAxisLabelShow){
    		this.isAxisLabelShow = isAxisLabelShow;
    		this.option.radar.axisLabel.show = isAxisLabelShow;
    	},
    	getIsAxisLabelShow:function(){
    		return this.isAxisLabelShow;
    	},
    	
    	setAxisLabelColor:function(axisLabelColor){
    		this.axisLabelColor = axisLabelColor;
    		this.option.radar.axisLabel.textStyle.color = axisLabelColor[0].full;
    	},
    	getAxisLabelColor:function(){
    		return this.axisLabelColor;
    	},
    	
    	setAxisFontSize:function(axisFontSize){
    		this.axisFontSize = axisFontSize;
    		this.option.radar.axisLabel.textStyle.fontSize = axisFontSize;
    	},
    	getAxisFontSize:function(){
    		return this.axisFontSize;
    	},
    	setColor:function(color){
    		this.color = color;
    	},
    	getColor:function(){
    		return this.color;
    	},
    	
    	setLeft:function(left){
    		this.left = left;
    		this.option.radar.center[0] = left;
    	},
    	getLeft:function(){
    		return this.left;
    	},
    	
    	setTop:function(top){
    		this.top = top;
    		this.option.radar.center[1] = top;
    	},
    	getTop:function(){
    		return this.top;
    	},
    	createSaticData:function(){
			var  dataArry = this.data.resultList;
			var  data_series = [];
			var  valueName = this.data.metaData["Y"];
			//二维数组遍历处理
			var maxValue = 0;
			var data = [];
			var name = [];
			for(var i =0,len= dataArry.length;i<len;i++){
				var childArry = dataArry[i];
				var childData = [];
				var childName = {};
				for(var k = 0 ,childLen = childArry.length;k <childLen;k++ ){
					if(k == 0){
						childName["name"] = childArry[k];
						
					}
					else if(k == 1){
						maxValue  = maxValue >= childArry[k] ?  maxValue:childArry[k];
						data.push(childArry[k]);					
					}
				}		
				name.push(childName);
			};
			for(var i = 0 , len = name.length; i < len; i++){
				name[i]["max"] = maxValue;
			};
			console.log(name);
			this.option.radar.indicator = name;
			this.option.series[0].data = [data];
			this.option.series[0].name = valueName;
			this.option.legend.data = valueName;
			this.repaint();			
		},
//  	
//  	//设置数据
//  	_setSeries:function (series){
//				this.option.series[0].name = series[0].name;
//				this.option.series[0].data = series[0].data;
//  	},	
    	
    });
    
    ey.widget.eySingleLineRadar = function (args){
    	return new EySingleLineRadar (args);
    };
       
})($,ey,echarts);