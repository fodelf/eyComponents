/*!
* Instruction : 气泡图
* 
* Author : 缪星
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyScatterCharts = function(args){
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
    	this.widgetName = "eyScatterCharts";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    };
    //继承组件基类
    ey.extendFun(EyScatterCharts,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyScatterCharts,{
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
    	
    	setColor:function(color){
    		this.color = color;
    	},
    	getColor:function(){
    		return this.color;
    	},
    	
    	setOption:function(option){
    		var options = JSON.stringify(option);			
			this.option = JSON.parse(options);
			$.each(this.option.series,function(i,value){
    			value.symbolSize = value[2] * 1;
    		})
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
			var dataXValue = [];
			 //解析有问题时转换后台传递不了大写Y
			var yName = metaArry["y"] ? metaArry["y"] :metaArry["Y"];
			//二维数组遍历处理
			var series = [];
			for(var i =0,len = dataArry.length;i<len;i++){
				var childArry = dataArry[i];
				var xvalue = "";
				for(var k = 0 ,childLen = childArry.length;k <childLen;k++){
					var newSeries = [];
					if(k == 0){
						dataXValue.push(childArry[k]);
						xvalue = childArry[k];
					}
					else{
						newSeries.push(i);
						newSeries.push(k-1);
						newSeries.push(childArry[k]);
						series.push(newSeries);
					}
				}
			};
			this.option.xAxis[0].data = dataXValue;
			this.option.yAxis[0].data  = yName;
			this.option.legend.data = [metaArry["X"]];
			this.option.series[0].name = metaArry["X"];
			//暂时没有不设置
			this._setSeries(series);
			this.repaint();			
		},
    	//设置数据
    	_setSeries:function (series){
    		this.option.series[0].data = series;
    	},
    	
    });
    
    ey.widget.eyScatterCharts = function (args){
    	return new EyScatterCharts (args);
    };
       
})($,ey,echarts);