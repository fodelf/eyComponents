/*!
* Instruction : 百度地图
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
//	"use strict";
    var EyMarkMap = function(args){
    	//继承线图基类
    	ey.extendProperty(this,"eyBridge","widget",[args]);

    	//dom模板
    	this._domTemplate = $("<div class='ey-lineCharts ey-widget eyCharts eyCharts-bg-blue'>"
    						//蒙层
    						+"<div class ='ey-chartsLayer'></div>"
    						//图形内容区域
    						+"<h5></h5><div class='ey-mapContent' id='baiduMap'></div>"    						
    						+"</div>");
    	this.widgetName = "eyMarkMap";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    	
    };
    //继承组件基类
    ey.extendFun(EyMarkMap,"eyBridge","widget");
    //扩展当前组件
    ey.expandPrototype(EyMarkMap,{
    	applicationInit: function(){
   			ey.callFunction(this,"view","widget","domInit");
   			this._domTemplate.find(".ey-chartsLayer").remove();
   			var that = this;
    		this.map = new BMap.Map("baiduMap");
			this.top_left_navigation = new BMap.NavigationControl();  
			this.map.setMapStyle({style:'grayscale'});
			this.point = new BMap.Point(116.404,39.915);
			this.map.centerAndZoom(this.point, 3);
			this.map.addControl(this.top_left_navigation);      
			this.map.addControl(new BMap.MapTypeControl());
			this.map.enableScrollWheelZoom(true);
			ey.callFunction(this,"eyBridge","widget","applicationInit");
   		},
    	domInit: function(){
    		//执行基类方法
    		ey.callFunction(this,"view","widget","domInit");
    		var that = this;
    		this.map = new BMap.Map("baiduMap");
			this.top_left_navigation = new BMap.NavigationControl();  
			this.map.setMapStyle({style:'grayscale'});
			this.point = new BMap.Point(116.404,39.915);
			this.map.centerAndZoom(this.point, 3);
			this.map.addControl(this.top_left_navigation);      
			this.map.addControl(new BMap.MapTypeControl());
			this.map.enableScrollWheelZoom(true);
    	},
    	setIsTitleShow:function(show){
   			this._isTitleShow = show;
   			if(show){
   				this._domTemplate.find("h5").show();
   				this._domTemplate.find(".ey-mapContent").css("height","calc(100% - 40px)");
   			}
   			else{
   				this._domTemplate.find("h5").hide();
   				this._domTemplate.find(".ey-mapContent").css("height","100%");
   			}
   		},
   		//获取标题显示隐藏
   		getIsTitleShow:function(show){
   			return this._isTitleShow;
   		},
   		//设置标题内容
   		setTitleName :function(titleName){
   			this._titleName = titleName;
   			this._domTemplate.find("h5").text(titleName);
   		},
   		//获取标题内容
   		getTitleName :function(titleName){
   			return this._titleName;
   		},
   		//设置标题文本位置
   		setTitleLocation : function(location){
   			this._location = location;
   			this._domTemplate.find("h5").css({
   				"text-align":location
   			});
   		},
	   	//获取文本位置
	   	getTitleLocation :function(location){
	   		return this._location;
	   		
	   	},
	   	//标题字体大小
   		setTitleFont : function(fontSize){
   			this._titleFont = fontSize;
   			this._domTemplate.find("h5").css({
   				"font-size":fontSize
   			})
   		},
   		//标题字体大小
   		getTitleFont : function(fontSize){
   			return this._titleFont;
   		},
    	setBackgroundColor:function(backgroundColor){
    		this.backgroundColor = backgroundColor;
    	},
    	getBackgroundColor:function(){
    		return this.backgroundColor;
    	},
    	setOption: function(option){
    		
    	},
    	getOption : function(){
    		
    	},
    	setMarkType:function(markType){
    		this.markType = markType;
    		
    		switch(markType){
    			case "1":
//					this.myIcon = new BMap.Icon("./../images/mark.png", new BMap.Size(14,23));
//					this.marker = new BMap.Marker(this.pt,{icon:this.myIcon}); 
//					this.map.addOverlay(this.marker);
    				break;
    			case "2":
    				this.myIcon = new BMap.Icon("./../images/rect.png", new BMap.Size(14,23));
					this.marker = new BMap.Marker(this.pt,{icon:this.myIcon}); 
					this.map.addOverlay(this.marker);
    				break;
    			case "3":
    				this.myIcon = new BMap.Icon("./../images/sanjiao.png", new BMap.Size(14,23));
					this.marker = new BMap.Marker(this.pt,{icon:this.myIcon}); 
					this.map.addOverlay(this.marker);
    				break;
    			case "4":
    				this.myIcon = new BMap.Icon("./../images/circle.png", new BMap.Size(14,23));
					this.marker = new BMap.Marker(this.pt,{icon:this.myIcon}); 
					this.map.addOverlay(this.marker);
    				break;
    		}
    		
    	},
    	getMarkType:function(){
    		return this.markType;
    	},
    	//设置纬度
    	setLatitude : function(latitude){
    		this._latitude = latitude;
    	},
    	//获取纬度
    	getLatitude : function(){
    		return this._latitude;
    	},
    	//查询结果请求
		_request : function(){
			var currentObj = this;
			var config = {};
			config["dim"] = this._dim.concat(this._latitude);
			config["mes"] = this._measure;
			config["fitter"] = this._fitter;
			config["sort"] = this._sort;
			config["value"] = this._value;
			config["pageNum"] = this._pageNum;
			config["pageSize"] = this._pageSize;
			config["callBack"] = function(data){
					currentObj.data = data;
					if(!currentObj.data){
						return;
					};
					//调用数据格式话
					currentObj.createSaticData();
			};
			this.dataProces.queryData(config);
		},
    	createSaticData : function(){
    		var that = this;
    		var data  = this.data;
    		var dataArry = data.resultList;
			//数组长度为0不绘图
			if(dataArry.length == 0){
				return;
			};
			var metaArry =  data.metaData;
			var opts = {
				  	width : 1,
				 	height: 1,
				  	title :  "信息",
			};
			for (var i = 0,len = dataArry.length; i < len; i ++) {
				var childMeg = dataArry[i];
				var point = new BMap.Point(childMeg[0],childMeg[1]);
				this.myIcon = new BMap.Icon("./../images/mark.png", new BMap.Size(14,23));
				var  marker = new BMap.Marker(point,{icon:this.myIcon}); 
				
				this.map.addOverlay(marker);
				var map = this.map;
				
				addClickHandler(childMeg[2],marker);
//				marker.addEventListener("click",function(e){
//					var p = e.target;
//					var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
//					var infoWindow = new BMap.InfoWindow(childMeg[2],opts);  // 创建信息窗口对象 
//					map.openInfoWindow(infoWindow,point);
//				});
				
				function addClickHandler(content,marker){
					marker.addEventListener("click",function(e){
						openInfo(content,e)}
					);
				}
				function openInfo(content,e){
					var p = e.target;
					var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
					var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
					map.openInfoWindow(infoWindow,point); //开启信息窗口
				}
			}	
//			function openInfo(map,content,e){
//				var p = e.target;
//				var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
//				var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
//				map.openInfoWindow(infoWindow,point); //开启信息窗口
//			}
//			this.pt = new BMap.Point(res[0]*1, res[1]*1);
//			this.myIcon = new BMap.Icon("./../images/mark.png", new BMap.Size(14,23));
//			this.marker = new BMap.Marker(this.pt,{icon:this.myIcon}); 
//			this.map.addOverlay(this.marker);
//			this.opts = {
//			  	width : 50,
//			 	height: 50,
//			  	title :  res[2],
//			};
//			this.infoWindow = new BMap.InfoWindow("", this.opts);
//			this.marker.addEventListener("click", function(){          
//				that.map.openInfoWindow(that.infoWindow,that.point);
//			});    		
    	},
    	removeBg: function(theme){
    		switch (theme){
    			case "blue":
    			this._domTemplate.removeClass("eyCharts-bg-white");
    			this._domTemplate.removeClass("eyCharts-bg-black");
    			this._domTemplate.addClass("eyCharts-bg-blue");
    			this.color = "#fff";
    			if(this._wordColor[0].full == "rgb(102, 102, 102)"){
    				this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"#fff"}];
    				this.setWordColor(this._wordColor);
    			};
    				break;
    			case "white":
    			this._domTemplate.removeClass("eyCharts-bg-blue");
    			this._domTemplate.removeClass("eyCharts-bg-black");
    			this._domTemplate.addClass("eyCharts-bg-white");
    			this.color = "rgb(102, 102, 102)";
    			if(this._wordColor[0].full == "#fff"){
					this._wordColor = [{"empty":"rgba(32,156,146,.3)","full":"rgb(102, 102, 102)"}];
					this.setWordColor(this._wordColor);
				};
    				break;
    			case "black":
        			this._domTemplate.removeClass("eyCharts-bg-blue");
        			this._domTemplate.removeClass("eyCharts-bg-white");
        			this._domTemplate.addClass("eyCharts-bg-black");
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
    	
    });
    
    ey.widget.eyMarkMap = function (args){
    	return new EyMarkMap (args);
    };
       
})($,ey,echarts);