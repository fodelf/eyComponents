/*!
* Instruction : 条形图
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyBarCharts = function(args){
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
    	this.widgetName = "eyBarCharts";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,146,.4)"}];
    };
    //继承组件基类
    ey.extendFun(EyBarCharts,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyBarCharts,{
    	//设置图例类型
    	setLegendType : function(legendType){
    		this.legendType = legendType;
    		if(legendType == 'rect'){
    			this.option.legend.itemWidth = 30;
    			this.option.legend.itemHeight = 9;
    			
    		}else{
    			this.option.legend.itemWidth = 9;
    			this.option.legend.itemHeight = 9;
    		}
    		
    	},
    	getLegendType : function(){
    		return this.legendType;
    	},
    	
    	
    	setLineType : function(lineType){
    		var that = this;
    		this.lineType = lineType;
    		switch(lineType){
    			case 'full':
    				if(this.option.series.length > 1){
						this.option.series[1].data = [];
						delete this.option.series[1].barWidth;
					}
    				$.extend(true,this.option.series[0].itemStyle.normal,{'color':that.lineColor[0].full,'borderColor':that.lineColor[0].empty,'barBorderRadius':0});
					
    				break;
    			case 'empty':
    				if(this.option.series.length > 1){
						this.option.series[1].data = [];
					}
					$.extend(true, this.option.series[0].itemStyle.normal, {'color':that.lineColor[0].empty,'borderColor':that.lineColor[0].full});
    				
    				break;
    			case 'zebra':
//  				$.each(this.option.series,function(i,value){
//  					value.itemStyle.normal = {'color':'transparent','borderColor':'transparent'};
//  				})
    				this.option.series[1] = { // For shadow
			            type: 'pictorialBar', 
			            symbol: 'rect',
			            silent:true,
			            itemStyle: {
			                normal: {color: that.lineColor[0].full}
			            },
			            symbolRepeat: true,
					    symbolSize: [this.barWidth, 4],
					    symbolMargin: 1,
					    zlevel: 20,
			            data: this.option.series[0].data.map(function(d){
			                return d;
			            })
				    };
					$.extend(true, this.option.series[0].itemStyle.normal, {'color':'transparent','borderColor':'transparent'});

    				break;
    			case 'capsule' :
					var list = Math.max.apply(null, this.option.series[0].data) * 1.1;
					$.extend(true, this.option.series[0], {'barWidth':this.barWidth});
					$.extend(true, this.option.series[0].itemStyle.normal, {'color':that.lineColor[0].full,'borderColor':that.lineColor[0].full,'barBorderRadius': 3});
//					option.series.each(function(index,n){
//						$.extend(true, index.itemStyle.normal, {'color':this._lineColor,'borderColor':this._lineColor,'opacity':1});
//					})
					this.option.series[1] = { // For shadow
			            type: 'bar', 
			            silent:true,
			            itemStyle: {
			                normal: {
			                	color: 'rgba(0, 0, 0, 0.2)',
			                	barBorderRadius: 3,
			                },
			                
			            },
			            zlevel:'1',
			            barWidth:that.barWidth,
			            barMinWidth:'20',
			            barGap:'-100%',
			            data: this.option.series[0].data.map(function(d){
			                return list
			            })
				    }
    		}
    	},
    	getLineType : function(){
    		return this.lineType;
    	},
    	setLineColor : function(lineColor){
    		this.lineColor = lineColor;
//  		this.option.series[0].itemStyle.normal.color = lineColor[0].full;
    		switch(this.lineType){
    			case 'full':
    				$.each(this.option.series,function(i,value){
    					value.itemStyle.normal.color = lineColor[i].full;
    					value.itemStyle.normal.borderColor = lineColor[i].full;
    				})
    				break;
    			case 'empty':
    				$.each(this.option.series,function(i,value){
	    				value.itemStyle.normal.color = lineColor[i].empty;
	    				value.itemStyle.normal.borderColor = lineColor[i].full;
	    			})
    				break;
    			default:
    				this.option.series[0].itemStyle.normal.color = lineColor[0].full;
    				this.option.series[0].itemStyle.normal.borderColor = lineColor[0].full;
    		}
    		
    	},
    	getLineColor : function(){
//  		alert(this.lineColor);
    		return this.lineColor;
    	},
    	
    	setBarWidth:function(barWidth){
    		this.barWidth = barWidth;
    		this.option.series[0].barWidth = barWidth;
    	},
    	getBarWidth:function(){
    		return this.barWidth;
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
    
    ey.widget.eyBarCharts = function (args){
    	return new EyBarCharts (args);
    };
       
})($,ey,echarts);