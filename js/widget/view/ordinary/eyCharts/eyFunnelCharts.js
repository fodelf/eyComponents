/*!
* Instruction : 漏斗图
* 
* Author : 缪星
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyFunnelCharts = function(args){
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
    	this.widgetName = "eyFunnelCharts";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    };
    //继承组件基类
    ey.extendFun(EyFunnelCharts,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyFunnelCharts,{
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
    		this.option.series[0].funnelAlign = lineType;
    	},
    	getLineType : function(){
    		return this.lineType;
    	},
    	setLineColor : function(lineColor){
    		this.lineColor = lineColor;
    		var arr = [];
    		$.each(lineColor,function(index,value){
    			arr.push(value.full)
    		})
    		this.option.color = arr;
    		
    	},
    	getLineColor : function(){
//  		alert(this.lineColor);
    		return this.lineColor;
    	},
    	
    	setDirection:function(direction){
    		this.direction = direction;
    		this.option.series[0].sort = direction
    	},
    	getDirection:function(){
    		return this.direction;
    	},
    	setColor:function(color){
    		this.color = color;
    	},
    	getColor:function(){
    		return this.color;
    	},
    	
    	setLeft:function(left){
    		this.left = left;
    		this.option.series[0].left = left;
    	},
    	getLeft:function(){
    		return this.left;
    	},
    	
    	setTop:function(top){
    		this.top = top;
    		this.option.series[0].top = top;
    	},
    	getTop:function(){
    		return this.top;
    	},
    	
    	setRight:function(right){
    		this.right = right;
    		this.option.series[0].right = right;
    	},
    	getRight:function(){
    		return this.right;
    	},
    	
    	setBottom:function(bottom){
    		this.bottom = bottom;
    		this.option.series[0].bottom = bottom;
    	},
    	getBottom:function(){
    		return this.bottom;
    	},
    	setOption : function(option){
			var options = JSON.stringify(option);			
			this.option = JSON.parse(options);
			this.option.series[0].label.normal.formatter = function (params) {
					                        return params.name + " " + params.value + "%";
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
			var dataXValue = [];
			 //解析有问题时转换后台传递不了大写Y
			var yName = metaArry["y"] ? metaArry["y"] :metaArry["Y"];
			//二维数组遍历处理
			var series = [];
			var lengendArry  = [];
			var max = 0;
			var min = 0;
			for(var i =0,len = dataArry.length;i<len;i++){
				var childArry = dataArry[i];
				var newSeries = {};
				var lengend = {};
				for(var k = 0 ,childLen = childArry.length;k <childLen;k++ ){
					if(k == 0){
						newSeries["name"] = childArry[k];
						lengend["name"] = childArry[k];
					}
					else{
						newSeries["value"] = childArry[k];
						max = childArry[k] >= max ? childArry[k]:max;
						min = childArry[k] >= min ? min:childArry[k];
					}
					
				}
				lengendArry.push(lengend);
				series.push(newSeries);
			};
			
			this.option.legend.data = lengendArry;
			this.option.series[0].name = metaArry["X"];
			this.option.series[0].max = max*1;
			this.option.series[0].min = min;
			//暂时没有不设置
			this._setSeries(series);
			this.repaint();			
		},
    	//设置数据
    	_setSeries:function (series){
			this.option.series[0].data = series;
    	}
    	
    });
    
    ey.widget.eyFunnelCharts = function (args){
    	return new EyFunnelCharts (args);
    };
       
})($,ey,echarts);