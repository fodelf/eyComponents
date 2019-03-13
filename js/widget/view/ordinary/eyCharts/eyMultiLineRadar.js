/*!
* Instruction : 多线雷达图
* 
* Author : 缪星
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyMultiLineRadar = function(args){
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
    	this.widgetName = "eyMultiLineRadar";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    	this._lineCount = 10;
    };
    //继承组件基类
    ey.extendFun(EyMultiLineRadar,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyMultiLineRadar,{
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
    		$.each(this.option.series[0].data,function(i,value){
    			value.lineStyle.normal.color = lineColor[i].full;
    			value.itemStyle.normal.color = lineColor[i].full;
    		})
    		switch(this.lineType){
    			case 'hollow':
	    			$.each(this.option.series[0].data,function(i,value){
		    			value.lineStyle.normal.color = lineColor[i].full;
		    			value.itemStyle.normal.borderColor = "#fff";
		    		})
//  				this.option.series[0].itemStyle.normal.color = lineColor;
//  				this.option.series[0].itemStyle.normal.borderColor = "#fff";
    				break;
    			case 'circle':
    				$.each(this.option.series[0].data,function(i,value){
		    			value.lineStyle.normal.color = lineColor[i].full;
		    			value.itemStyle.normal.borderColor = lineColor[i].full;
		    		})
//  				this.option.series[0].itemStyle.normal.color = lineColor;
//  				this.option.series[0].itemStyle.normal.borderColor = lineColor;
    				break;
    			default:
    				$.each(this.option.series[0].data,function(i,value){
		    			value.lineStyle.normal.color = lineColor[i].full;
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
			var  newSeries = {};
			var nameArry = [];
			//二维数组遍历处理
			for(var i =0,len = dataArry.length;i<len;i++){
				var childArry = dataArry[i];
				var name = {};
				for(var k = 0 ,childLen = childArry.length;k <childLen;k++ ){
					if(k == 0){
						dataXValue.push(childArry[k]);
						name["name"] = childArry[k];
					}
					else{
						if(!newSeries[k]){
							newSeries[k] = {};
							newSeries[k]["data"] = [];
						}
						newSeries[k]["name"] = dataXValue[k-1];
						newSeries[k]["data"].push(childArry[k]);					
					}
				}
				nameArry.push(name);
			};
			this.option.radar.indicator = nameArry;
			this.option.legend.data = yName;
			this.option.series.name = metaArry["X"];
			//系列数组
			var series = [];
			for( var k in newSeries){
				
				if( typeof k == "string"){
					
					var newnewSerie = {};
				
					newnewSerie.name = newSeries[k].name;
					
					newnewSerie.data = newSeries[k].data;
					
					series.push(newnewSerie);
				}
			};
			//暂时没有不设置
			this._setSeries(series);
			this.repaint();			
		},
    	//设置数据
    	_setSeries:function (series){
			this.option.series[0].data = [];
			for(var i = 0 ,len = series.length ;i < len ; i ++ ){
				var childData = series[i];
				var k =  i%(this._lineCount);
				var item = {
	            	"value" : childData.data,
					"name" : childData.name,
					"lineStyle":{
						"normal":{
							"color":this.lineColor[k].full,
							"borderColor":this.lineColor[k].full
						}
					},
					"itemStyle":{
						"normal":{
							"color":this.lineColor[k].full,
							"borderColor":this.lineColor[k].full
						}
					}
	           };
				this.option.series[0].data.push(item);
			};
    	},
    	
    });
    
    ey.widget.eyMultiLineRadar = function (args){
    	return new EyMultiLineRadar (args);
    };
       
})($,ey,echarts);