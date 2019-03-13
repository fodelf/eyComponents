/*!
* Instruction :单线面积图
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyAreaCharts = function(args){
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
    	this.widgetName = "eyLineCharts";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    };
    //继承组件基类
    ey.extendFun(EyAreaCharts,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyAreaCharts,{
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
    		this.lineType = lineType;
    		switch(lineType){
    			case 'smooth':
	    			$.each(this.option.series,function(i,value){
		    			value.smooth = true;
		    			value.step = false;
		    		})
    				break;
    			case 'straight':
    				$.each(this.option.series,function(i,value){
		    			value.smooth = false;
		    			value.step = false;
		    		})
    				break;
    			case 'trapezoid':
    				$.each(this.option.series,function(i,value){
		    			value.smooth = false;
		    			value.step = true;
		    		})
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
    		switch(this.legendType){
    			case 'hollow':
	    			$.each(this.option.series,function(i,value){
		    			value.itemStyle.normal.color = lineColor[i].full;
		    			value.itemStyle.normal.borderColor = "#fff";
		    			value.areaStyle.normal.color = lineColor[i].empty;
		    		})
//  				this.option.series[0].itemStyle.normal.color = lineColor;
//  				this.option.series[0].itemStyle.normal.borderColor = "#fff";
    				break;
    			case 'circle':
    				$.each(this.option.series,function(i,value){
		    			value.itemStyle.normal.color = lineColor[i].full;
		    			value.itemStyle.normal.borderColor = lineColor[i].full;
		    			value.areaStyle.normal.color = lineColor[i].empty;
		    		})
//  				this.option.series[0].itemStyle.normal.color = lineColor;
//  				this.option.series[0].itemStyle.normal.borderColor = lineColor;
    				break;
    			default:
    				$.each(this.option.series,function(i,value){
		    			value.itemStyle.normal.color = lineColor[i].full;
		    			value.itemStyle.normal.borderColor = lineColor[i].full;
		    			value.areaStyle.normal.color = lineColor[i].empty;
		    		})
//  				this.option.series[0].itemStyle.normal.color = lineColor;
//  				this.option.series[0].itemStyle.normal.borderColor = lineColor;
    		}
    		
    	},
    	getLineColor : function(){
//  		alert(this.lineColor);
    		return this.lineColor;
    	},
    	
    	setColor:function(color){
    		this.color = color;
    	},
    	getColor:function(){
    		return this.color;
    	},
    	//设置数据
    	_setSeries:function (series){
				this.option.series[0].name = series[0].name;
				this.option.series[0].data = series[0].data;
    	},
    	
    });
    
    ey.widget.eyAreaCharts = function (args){
    	return new EyAreaCharts (args);
    };
       
})($,ey,echarts);