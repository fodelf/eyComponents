/*!
* Instruction : 省份地图
* 
* Author : 缪星
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyProvinceMap = function(args){
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
    	this.widgetName = "eyProvinceMap";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    };
    //继承组件基类
    ey.extendFun(EyProvinceMap,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyProvinceMap,{
    	
    	getOption : function(){
			//清除无用数据只保留样式 非常重要-------------
			//数据根据实际选择的数据源类型进行数据驱动
			var returnOption = JSON.stringify(this.option);
			returnOption = JSON.parse(returnOption);
			return returnOption;
		},
    	setBackgroundColor:function(backgroundColor){
    		this.backgroundColor = backgroundColor;
    	},
    	getBackgroundColor:function(){
    		return this.backgroundColor;
    	},
    	setLineWidth:function(lineWidth){
    		this.lineWidth = lineWidth;
    		this.option.series[0].itemStyle.normal.borderWidth = lineWidth;
    	},
    	getLineWidth:function(){
    		return this.lineWidth;
    	},
    	
    	setLineColor:function(lineColor){
    		this.lineColor = lineColor;
    		this.option.series[0].itemStyle.normal.borderColor = lineColor[0].full;
    	},
    	getLineColor:function(){
    		return this.lineColor;
    	},
    	
    	setAreaColor:function(areaColor){
    		this.areaColor = areaColor;
    	},
    	getAreaColor:function(){
    		return this.areaColor;
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
    	setColor:function(color){
    		this.color = color;
    	},
    	getColor:function(){
    		return this.color;
    	},
    	createSaticData:function(staticData){
    		var	 data  = this.data;
			var  dataArry = data.resultList;
			var  data_series = [];
			var  valueName = data.metaData["Y"][0];
			//二维数组遍历处理
			var maxValue = 0;
			for(var i =0,len= dataArry.length;i<len;i++){
				var childArry = dataArry[i];
				var  newSeries = {};
				for(var k = 0 ,childLen = childArry.length;k <childLen;k++ ){
					if(k == 0){
						newSeries["name"] = childArry[k];				
					}
					else{
						var value = childArry[k];
						if(value > maxValue){
							maxValue = value;
						}
						newSeries["value"] = value;	
						data_series.push(newSeries);
					}
				}				
			}
			this.option.series[0].data = data_series;
			this.option.series[0].name = valueName;
			this.option.visualMap.max = maxValue;
			this.repaint();			
		},	
    	
    });
    
    ey.widget.eyProvinceMap = function (args){
    	return new EyProvinceMap (args);
    };
       
})($,ey,echarts);