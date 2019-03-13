/*!
* Instruction : 迁徙图
* 
* Author : 吴文周
* 
* Date: 2017-03-26
*/
(function($,ey,echarts){
	"use strict";
    var EyMoveMap = function(args){
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
    	this.widgetName = "eyMoveMap";
    	this.lineColor = [{"full":"#209c91","empty":"rgba(32,156,145,.3)"}];
    	this.geoCoordMap =  {
			    '上海': [121.4648,31.2891],
			    '东莞': [113.8953,22.901],
			    '东营': [118.7073,37.5513],
			    '中山': [113.4229,22.478],
			    '临汾': [111.4783,36.1615],
			    '临沂': [118.3118,35.2936],
			    '丹东': [124.541,40.4242],
			    '丽水': [119.5642,28.1854],
			    '乌鲁木齐': [87.9236,43.5883],
			    '佛山': [112.8955,23.1097],
			    '保定': [115.0488,39.0948],
			    '兰州': [103.5901,36.3043],
			    '包头': [110.3467,41.4899],
			    '北京': [116.4551,40.2539],
			    '北海': [109.314,21.6211],
			    '南京': [118.8062,31.9208],
			    '南宁': [108.479,23.1152],
			    '南昌': [116.0046,28.6633],
			    '南通': [121.1023,32.1625],
			    '厦门': [118.1689,24.6478],
			    '台州': [121.1353,28.6688],
			    '合肥': [117.29,32.0581],
			    '呼和浩特': [111.4124,40.4901],
			    '咸阳': [108.4131,34.8706],
			    '哈尔滨': [127.9688,45.368],
			    '唐山': [118.4766,39.6826],
			    '嘉兴': [120.9155,30.6354],
			    '大同': [113.7854,39.8035],
			    '大连': [122.2229,39.4409],
			    '天津': [117.4219,39.4189],
			    '太原': [112.3352,37.9413],
			    '威海': [121.9482,37.1393],
			    '宁波': [121.5967,29.6466],
			    '宝鸡': [107.1826,34.3433],
			    '宿迁': [118.5535,33.7775],
			    '常州': [119.4543,31.5582],
			    '广州': [113.5107,23.2196],
			    '廊坊': [116.521,39.0509],
			    '延安': [109.1052,36.4252],
			    '张家口': [115.1477,40.8527],
			    '徐州': [117.5208,34.3268],
			    '德州': [116.6858,37.2107],
			    '惠州': [114.6204,23.1647],
			    '成都': [103.9526,30.7617],
			    '扬州': [119.4653,32.8162],
			    '承德': [117.5757,41.4075],
			    '拉萨': [91.1865,30.1465],
			    '无锡': [120.3442,31.5527],
			    '日照': [119.2786,35.5023],
			    '昆明': [102.9199,25.4663],
			    '杭州': [119.5313,29.8773],
			    '枣庄': [117.323,34.8926],
			    '柳州': [109.3799,24.9774],
			    '株洲': [113.5327,27.0319],
			    '武汉': [114.3896,30.6628],
			    '汕头': [117.1692,23.3405],
			    '江门': [112.6318,22.1484],
			    '沈阳': [123.1238,42.1216],
			    '沧州': [116.8286,38.2104],
			    '河源': [114.917,23.9722],
			    '泉州': [118.3228,25.1147],
			    '泰安': [117.0264,36.0516],
			    '泰州': [120.0586,32.5525],
			    '济南': [117.1582,36.8701],
			    '济宁': [116.8286,35.3375],
			    '海口': [110.3893,19.8516],
			    '淄博': [118.0371,36.6064],
			    '淮安': [118.927,33.4039],
			    '深圳': [114.5435,22.5439],
			    '清远': [112.9175,24.3292],
			    '温州': [120.498,27.8119],
			    '渭南': [109.7864,35.0299],
			    '湖州': [119.8608,30.7782],
			    '湘潭': [112.5439,27.7075],
			    '滨州': [117.8174,37.4963],
			    '潍坊': [119.0918,36.524],
			    '烟台': [120.7397,37.5128],
			    '玉溪': [101.9312,23.8898],
			    '珠海': [113.7305,22.1155],
			    '盐城': [120.2234,33.5577],
			    '盘锦': [121.9482,41.0449],
			    '石家庄': [114.4995,38.1006],
			    '福州': [119.4543,25.9222],
			    '秦皇岛': [119.2126,40.0232],
			    '绍兴': [120.564,29.7565],
			    '聊城': [115.9167,36.4032],
			    '肇庆': [112.1265,23.5822],
			    '舟山': [122.2559,30.2234],
			    '苏州': [120.6519,31.3989],
			    '莱芜': [117.6526,36.2714],
			    '菏泽': [115.6201,35.2057],
			    '营口': [122.4316,40.4297],
			    '葫芦岛': [120.1575,40.578],
			    '衡水': [115.8838,37.7161],
			    '衢州': [118.6853,28.8666],
			    '西宁': [101.4038,36.8207],
			    '西安': [109.1162,34.2004],
			    '贵阳': [106.6992,26.7682],
			    '连云港': [119.1248,34.552],
			    '邢台': [114.8071,37.2821],
			    '邯郸': [114.4775,36.535],
			    '郑州': [113.4668,34.6234],
			    '鄂尔多斯': [108.9734,39.2487],
			    '重庆': [107.7539,30.1904],
			    '金华': [120.0037,29.1028],
			    '铜川': [109.0393,35.1947],
			    '银川': [106.3586,38.1775],
			    '镇江': [119.4763,31.9702],
			    '长春': [125.8154,44.2584],
			    '长沙': [113.0823,28.2568],
			    '长治': [112.8625,36.4746],
			    '阳泉': [113.4778,38.0951],
			    '青岛': [120.4651,36.3373],
			    '韶关': [113.7964,24.7028]
			};
    };
    //继承组件基类
    ey.extendFun(EyMoveMap,"eyCharts","widget");
    //扩展当前组件
    ey.expandPrototype(EyMoveMap,{
    	//获取目的地方法
    	setDestination : function(destination){
    		this._destination = destination;
    	},
    	getDestination : function(){
    		return this._destination;
    	},
    	setBackgroundColor:function(backgroundColor){
    		this.backgroundColor = backgroundColor;
    	},
    	getBackgroundColor:function(){
    		return this.backgroundColor;
    	},
    	setLineWidth:function(lineWidth){
    		this.lineWidth = lineWidth;
    		this.option.geo.itemStyle.normal.borderWidth = lineWidth;
    	},
    	getLineWidth:function(){
    		return this.lineWidth;
    	},
    	
    	setLineColor:function(lineColor){
    		this.lineColor = lineColor;
    		this.option.geo.itemStyle.normal.borderColor = lineColor[0].full;
    	},
    	getLineColor:function(){
    		return this.lineColor;
    	},
    	
    	setAreaColor:function(areaColor){
    		this.areaColor = areaColor;
    		this.option.geo.itemStyle.normal.areaColor = areaColor[0].full;
    	},
    	getAreaColor:function(){
    		return this.areaColor;
    	},
    	//  	设置数据点标签是否显示
    	setIsLabelShow:function(isLabelShow){
    		this.isLabelShow = isLabelShow;
    		this.option.series[2].label.normal.show = isLabelShow;
    	},
    	getIsLabelShow:function(){
    		return this.isLabelShow;
    	},
    	
    	//  	设置数据点文字大小
    	setLabelFontSize:function(labelFontSize){
    		this.labelFontSize = labelFontSize;
    		this.option.series[2].label.normal.textStyle.fontSize = labelFontSize;
    	},
    	getLabelFontSize:function(){
    		return this.labelFontSize;
    	},
    	
    	//  	设置数据点文字颜色
    	setLabelFontColor:function(labelFontColor){
    		this.labelFontColor = labelFontColor;
    		this.option.series[2].itemStyle.normal.color = labelFontColor;
    	},
    	getLabelFontColor:function(){
    		return this.labelFontColor;
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
    	setOption:function(option){
    		var options = JSON.stringify(option);			
			this.option = JSON.parse(options);
			var BJData = [
			    [{name:'北京'}, {name:'上海',value:95}],
			    [{name:'北京'}, {name:'广州',value:90}],
			    [{name:'北京'}, {name:'大连',value:80}],
			    [{name:'北京'}, {name:'南宁',value:70}],
			    [{name:'北京'}, {name:'南昌',value:60}],
			    [{name:'上海'}, {name:'拉萨',value:50}],
			    [{name:'上海'}, {name:'长春',value:40}],
			    [{name:'上海'}, {name:'包头',value:30}],
			    [{name:'北京'}, {name:'重庆',value:20}],
			    [{name:'北京'}, {name:'常州',value:10}]
			];
			var geoCoordMap = this.geoCoordMap;
			this.option.series[0].data = this._convertData(BJData);
			this.option.series[1].data = this._convertData(BJData);
			this.option.series[2].symbolSize = function (val) {
										            return val[2] / 8;
										       };
			this.option.series[2].data = BJData.map(function (dataItem) {
								            return {
								                name: dataItem[1].name,
								                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
								            };
								        })
    	},
    	_convertData: function(data){
    		var geoCoordMap = this.geoCoordMap;
    		var res = [];
			    for (var i = 0; i < data.length; i++) {
			        var dataItem = data[i];
			        var fromCoord = geoCoordMap[dataItem[0].name];
			        var toCoord = geoCoordMap[dataItem[1].name];
			        if (fromCoord && toCoord) {
			            res.push({
			                fromName: dataItem[0].name,
			                toName: dataItem[1].name,
			                coords: [fromCoord, toCoord]
			            });
			        }
			    }
			    return res;
    	},
    	createSaticData:function(){
			var  dataArry = this.data.resultList;
			var  data_series = [];
			var  valueName = this.data.metaData["Y"];
			//二维数组遍历处理
			var maxValue = 0;
			var data = [];
			for(var i =0,len= dataArry.length;i<len;i++){
				var childArry = dataArry[i];
				var  strat = {};
				var  to = {};
				var childData = [];
				for(var k = 0 ,childLen = childArry.length;k <childLen;k++ ){
					if(k == 0){
						strat["name"] = childArry[k];				
					}
					else if(k == 1){
						to["name"] = childArry[k];					
					}
					else{
						to["value"] = childArry[k];
						childData.push(strat);
						childData.push(to);
						data.push(childData);
					}
				}				
			}
			var tureData = this._convertData(data);
			this.option.series[0].data = tureData;
			this.option.series[1].data = tureData;
			var that = this;
			var dataThird = data.map(function (dataItem) {
	            return {
	                name: dataItem[0].name,
	                value: that.geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
	            }});
	        this.option.series[2].data = dataThird;
			this.repaint();			
		}, 
		//查询结果请求
		_request : function(){
			var currentObj = this;
			var config = {};
			config["dim"] = this._dim.concat(this._destination);
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
		
    });
    
    ey.widget.eyMoveMap = function (args){
    	return new EyMoveMap (args);
    };
       
})($,ey,echarts);