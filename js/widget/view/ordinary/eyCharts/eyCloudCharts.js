/*!
* Instruction : 云图
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyCloudCharts = function(args){
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
    	this.widgetName = "eyCloudCharts";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    };
    //继承组件基类
    ey.extendFun(EyCloudCharts,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyCloudCharts,{
    	//每个图形必须重写此方法
    	setFontColor:function(fontColor){
    		this.fontColor = fontColor;
    		var arr = [];
    		$.each(fontColor, function(index,value) {
    			arr.push(value.full)
    		});
    		
    		this.option.series[0].textStyle.normal.color = function(params) {  
			                        return arr[params.dataIndex%5];  
			                    }  
    	},
    	getFontColor:function(fontColor){
    		return this.fontColor;
    	},
    	setOption:function(option){
    		var options = JSON.stringify(option);			
			this.option = JSON.parse(options);
			this.option.series[0].textStyle.normal.color = function(params) {  
			                    	var colors = ["#209c91",'#ffd538','#e85355','#8fb601',"#fff"];
			                        return colors[params.dataIndex%5];  
			                    }  
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
			this.repaint();			
		},	
    	//设置主题
    	setTheme : function(theme){
    		
    		this.removeBg(theme);
    		
			this._changeColor(this.option,this.color);
	
    		this.repaint();
    	},
    	//设置主题初始化
    	setInitTheme : function(theme){
    		this.removeBg(theme);
    		
			this._changeColor(this.option,this.color);
    	},
    	//移除图形背景
    	removeBg: function(theme){
    		switch (theme){
    			case "blue":
    			this._domTemplate.removeClass("eyCharts-bg-white");
    			this._domTemplate.addClass("eyCharts-bg-blue");
    			this._domTemplate.removeClass("eyCharts-bg-black");
    			this.color = "#fff";
    				break;
    			case "white":
    			this._domTemplate.removeClass("eyCharts-bg-blue");
    			this._domTemplate.addClass("eyCharts-bg-white");
    			this._domTemplate.removeClass("eyCharts-bg-black");
    			this.color = "rgb(102, 102, 102)";
    				break;
    			case "black":
        			this._domTemplate.removeClass("eyCharts-bg-blue");
        			this._domTemplate.removeClass("eyCharts-bg-white");
        			this._domTemplate.addClass("eyCharts-bg-black");
        			this.color = "#fff";
        			break;
    			default:
    				break;
    		}
    	},
    	setDomHeight:function(height){
    		//执行基类方法
    		ey.callFunction(this,"view","widget","setDomHeight",height);
    		if(this.initChart){
    			this._domTemplate.find('.ey-chartsContent').empty();
    			var canvas = this._domTemplate.find(".ey-chartsContent")[0];
				this.initChart= echarts.init(canvas);
    			this.initChart.setOption(this.option);
    		}       		
    	},
    	setDomWidth :function(width){
			//执行基类方法
    		ey.callFunction(this,"view","widget","setDomWidth",width);
    		if(this.initChart){
    			this._domTemplate.find('.ey-chartsContent').empty();
    			var canvas = this._domTemplate.find(".ey-chartsContent")[0];
				this.initChart= echarts.init(canvas);
    			this.initChart.setOption(this.option);
    		}    
		}
    	
    });
    
    ey.widget.eyCloudCharts = function (args){
    	return new EyCloudCharts (args);
    };
       
})($,ey,echarts);