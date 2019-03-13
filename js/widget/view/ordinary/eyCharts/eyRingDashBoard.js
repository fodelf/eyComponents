/*!
* Instruction : 线图
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyRingDashBoard = function(args){
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
    	this.widgetName = "eyRingDashBoard";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    };
    //继承组件基类
    ey.extendFun(EyRingDashBoard,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyRingDashBoard,{
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
    	
    	
    	setLineWidth:function(lineWidth){
    		this.lineWidth = lineWidth;
    		this.option.series[0].axisLine.lineStyle.width = lineWidth;
    	},
    	getLineWidth:function(){
    		return this.lineWidth
    	},
    	setLineColor:function(lineColor){
    		this.lineColor = lineColor;
    		this.option.series[0].axisLine.lineStyle.color[0][1] =  lineColor[0].full;
    	},
    	getLineColor:function(){
    		return this.lineColor
    	},
    	
    	setIsLabelShow:function(isLabelShow){
    		this.isLabelShow = isLabelShow;
    		this.option.series[0].detail.show = isLabelShow;
    	},
    	getIsLabelShow:function(){
    		return this.isLabelShow;
    	},
    	setLabelFontSize:function(labelFontSize){
    		this.labelFontSize = labelFontSize;
    		this.option.series[0].detail.textStyle.fontSize = labelFontSize;
    	},
    	getLabelFontSize:function(){
    		return this.labelFontSize
    	},
    	setLabelFontColor:function(labelFontColor){
    		this.labelFontColor = labelFontColor;
    		this.option.series[0].detail.textStyle.color = labelFontColor[0].full;
    	},
    	getLabelFontColor:function(){
    		return this.labelFontColor
    	},
    	setAxisFontSize:function(axisFontSize){
    		this.axisFontSize = axisFontSize;
    		this.option.series[0].axisLabel.textStyle.fontSize = axisFontSize;
    	},
    	getAxisFontSize:function(){
    		return this.axisFontSize;
    	},
    	setMin:function(min){
    		this.min = min;
    		this.option.series[0].min = min;
    	},
    	getMin:function(){
    		return this.min
    	},
    	setMax:function(max){
    		this.max = max;
    		this.option.series[0].max = max;
    	},
    	getMax:function(){
    		return this.max
    	},
    	setLeft:function(left){
    		this.left = left;
    		this.option.series[0].center[0] = left;
    	},
    	getLeft:function(){
    		return this.left;
    	},
    	
    	setTop:function(top){
    		this.top = top;
    		this.option.series[0].center[1] = top;
    	},
    	getTop:function(){
    		return this.top;
    	},
    	setLineType : function(lineType){
    		this.lineType = lineType;
    		switch(lineType){
    			case 'value':
    				this.option.series[0].detail.formatter = "";
    				break;
    			case 'percent':
    				this.option.series[0].detail.formatter = function (value) {
					    return value * 100 +"%";
					}
    				break;
    		}
    	},
    	getLineType : function(){
    		return this.lineType;
    	},
    	
    	
    	setColor:function(color){
    		this.color = color;
    	},
    	getColor:function(){
    		return this.color;
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
			var  data = dataArry[0][0];
			var  seriesData =	{
                 "value": [
                          data
                 ]
             };
			this._setSeries(seriesData);
			this.repaint();	
    	},
    	//设置数据
    	_setSeries:function (series){
				this.option.series[0].data = [series];
    	}
    	
    });
    
    ey.widget.eyRingDashBoard = function (args){
    	return new EyRingDashBoard (args);
    };
       
})($,ey,echarts);