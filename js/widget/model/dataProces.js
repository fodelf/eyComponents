/*!
* Instruction : 数据处理器
* 
* Author : 吴文周
* 
* Date: 2017-04-07
*/
(function($,ey){
	"use strict";
	
    var DataProces = function(){
    	
    };
    //扩展当前原型
    DataProces.prototype = {
    	//设置数据来源
		setSourceType:function(sourceType){
			this._sourceType = sourceType;
		},
		//设置查询表ID
		setTableID:function(_TableID){
			this._TableID = _TableID;
		},
		getTableID:function(){
			return this._TableID;
		},
		setPage : function (page){
			this._page = page;
		},
		//查询
		querySourceData:function(successCallback,errorCallback){
			var currentObj = this;
			//根据数据源id查询数据
			//返回为量度，维度，过滤条件
			//是否根据当前的
			//根据不同的数据来源类型进行参数改变
			var param = {
		      "tableId" : currentObj._TableID,
		      "sourceType":currentObj._sourceType
			};
			var params = {};
			params["params"] = JSON.stringify(param);
			console.time("tableMessage");
			if(currentObj._TableID){
				$.ajax({
				type:"post",
				url: "../../dashboard/data/column/list",
				dataType:"json",
				data:params,
				success:function(data){
					console.timeEnd("tableMessage");
					currentObj._sourceData = {};
					currentObj._sourceData["dimension"] = [];
					currentObj._sourceData["mensuration"] = [];
					currentObj._sourceData["fitter"] = [];
					currentObj._sourceData["date"] = [];
					var  dataList = data.resultEntity.resultList;
					for(var i = 0,len = dataList.length; i < len;i++){
							var  condition =  dataList[i];
							//维度?
							if(condition.colDataTypeCode == "VARCHAR" || condition.colDataTypeCode == "DATE"){								
								currentObj._sourceData["dimension"].push(condition);
							}
//							//量度
//							else if(condition.colDataTypeCode == "DATE"){
//								currentObj._sourceData["date"].push(condition);
//							}
							else{
								currentObj._sourceData["mensuration"].push(condition);
							}
					};
					if(successCallback){
						successCallback(data);
					}
				},
				error:function(data){
					errorCallback(data);
				}
				});
			}
		},
		//获取过滤条件详细信息字段详细信息
		queryDimData:function(config){
			var resultParam= config['result'];
			var successCallback = config['successCallback'];
			var param = {
			      	 "sourceType" : this._sourceType,
			      	   	"tableId" : this._TableID,
 						"colId" : resultParam.colId,
			      	 	"colDataTypeCode":resultParam.colDataTypeCode
					};
			var params = {};
			params["params"] = JSON.stringify(param);
			console.time("listMessage");
				$.ajax({
	 				type:"post",
					url:"../../dashboard/data/column/value",
					cache:true,
					dataType:"json",
					data:params,
					success:function(data){
						console.timeEnd("listMessage");
						var dataObj = data.resultEntity; 
						if(successCallback){
							successCallback(dataObj);						 
						}
					},
					error:function(data){
						alert("error");
					}
				});	
			
		},
		setColumnListOther : function(dim,mes,fitter,sort,infraduction,value,level){
			var colList = {"sourceType":this._sourceType,"resultType":"common","colList" :[],"colFilterList":[],"colSortList":[],"metaData":{},"pageNum":1,"pageSize":""};
			colList.metaData["X"] = [];
			colList.metaData["Y"] = [];
			if(infraduction){
//				for (var i = 0,len = infraduction.length;i < len ;i ++){
//					
//					dimObj["tableId"] = this._TableID;
//					dimObj["colTypeCode"] = "DIM";
//					dimObj["colId"] = infraduction[i]["colId"];
//					colList["colList"].push(dimObj);
//					colList.metaData["X"].push(infraduction[i]["colAlias"]);
//				};
				var dimObj = {};
				//第一层
				switch(level){
    			case 1:
    				dimObj["tableId"] = this._TableID;
					dimObj["colTypeCode"] = infraduction[0].colTypeCode;
					dimObj["colId"] = infraduction[0]["colId"];
					colList["colList"].push(dimObj);
					colList.metaData["X"].push(infraduction[0]["colAlias"]);
					if(dim){
						console.log(dim);
						for (var i = 0,len = dim.length;i < len ; i ++){
							var fitterObj = {};
								fitterObj["tableId"] = this._TableID;
								fitterObj["colId"] = dim[i]["colId"];
								if(dim[i].colTypeCode == "DATE"){
									//时间类型格式化
									 var  valueArry = 	value.split("-");
									 var  resValue  = valueArry.join("") + "000000";
									 fitterObj["colValue"] = [resValue,resValue];
									 fitterObj["operateType"] = "BETWEEN";
								}
								else{
									fitterObj["colValue"] = [value];;
									fitterObj["operateType"] = "IN";
								};
			   					fitterObj["isReversed"]  = false;
								colList["colFilterList"].push(fitterObj);
						};
					};
					this.oldValueOne = value;
    				break;
    				//第二层
    			case 2:
    				dimObj["tableId"] = this._TableID;
					dimObj["colTypeCode"] = infraduction[1].colTypeCode;
					dimObj["colId"] = infraduction[1]["colId"];
					colList["colList"].push(dimObj);
					colList.metaData["X"].push(infraduction[1]["colAlias"]);
					var fitterObj = {};
					fitterObj["tableId"] = this._TableID;
					fitterObj["colId"] = dim[0]["colId"];
					if(dim[0].colTypeCode == "DATE"){
						//时间类型格式化
						 var  valueArry = this.oldValueOne.split("-");
						 var  resValue  = valueArry.join("") + "000000";
						 fitterObj["colValue"] = [resValue,resValue];
						 fitterObj["operateType"] = "BETWEEN";
					}
					else{
						fitterObj["colValue"] = [this.oldValueOne];;
						fitterObj["operateType"] = "IN";
					};
   					fitterObj["isReversed"]  = false;
					colList["colFilterList"].push(fitterObj);
					var fitterObjTow = {};
					fitterObjTow["tableId"] = this._TableID;
					fitterObjTow["colId"] = infraduction[0]["colId"];
					if(infraduction[0].colTypeCode == "DATE"){
						//时间类型格式化
						 var  valueArry = value.split("-");
						 var  resValue  = valueArry.join("") + "000000";
						fitterObjTow["colValue"] = [resValue,resValue];
						fitterObjTow["operateType"] = "BETWEEN";
					}
					else{
						fitterObjTow["colValue"] = [value];
						fitterObjTow["operateType"] = "IN";
					}
					fitterObjTow["isReversed"]  = false;
					
					colList["colFilterList"].push(fitterObjTow);
					this.oldValueTow= value;
    				break;
    				//第三层数据
    			case 3:
    				dimObj["tableId"] = this._TableID;
					dimObj["colTypeCode"] = infraduction[2].colTypeCode;
					dimObj["colId"] = infraduction[2]["colId"];
					colList["colList"].push(dimObj);
					colList.metaData["X"].push(infraduction[2]["colAlias"]);
					var fitterObj = {};
					fitterObj["tableId"] = this._TableID;
					fitterObj["colId"] = dim[0]["colId"];
					if(dim[0].colTypeCode == "DATE"){
						//时间类型格式化
						 var  valueArry = this.oldValueOne.split("-");
						 var  resValue  = valueArry.join("") + "000000";
						 fitterObj["colValue"] = [resValue,resValue];
						 fitterObj["operateType"] = "BETWEEN";
					}
					else{
						fitterObj["colValue"] = [this.oldValueOne];;
						fitterObj["operateType"] = "IN";
					};
   					fitterObj["isReversed"]  = false;
					colList["colFilterList"].push(fitterObj);
					var fitterObjTow = {};
					fitterObjTow["tableId"] = this._TableID;
					fitterObjTow["colId"] = infraduction[0]["colId"];
					if(infraduction[0].colTypeCode == "DATE"){
						 var  valueArry = this.oldValueTow.split("-");
						 var  resValue  = valueArry.join("") + "000000";
						 fitterObjTow["colValue"] = [resValue,resValue];
						fitterObjTow["operateType"] = "BETWEEN";
					}
					else{
						fitterObjTow["colValue"] = [this.oldValueTow];
						fitterObjTow["operateType"] = "IN";
					}
					fitterObjTow["isReversed"]  = false;
					colList["colFilterList"].push(fitterObjTow);
					var fitterObjThree = {};
					fitterObjThree["tableId"] = this._TableID;
					fitterObjThree["colId"] = infraduction[1]["colId"];
					if(infraduction[1].colTypeCode == "DATE"){
						var  valueArry = value.split("-");
						 var  resValue  = valueArry.join("") + "000000";
						 fitterObjThree["colValue"] = [resValue,resValue];
						 fitterObjThree["operateType"] = "BETWEEN";
					}
					else{
						fitterObjThree["colValue"] = [value];
						fitterObjThree["operateType"] = "IN";
					}
					fitterObjThree["isReversed"]  = false;
					colList["colFilterList"].push(fitterObjThree);
    				break;
				}
				
			};
			for (var i = 0,len = mes.length;i < len ; i ++){
				var mesObj = {};
				mesObj["tableId"] = this._TableID;
				mesObj["colTypeCode"] = "MEA";
				mesObj["colId"] = mes[i]["colId"];
				//根据状态值去判断默认值
				if(mes[i]["colTypeCode"] == "MEA"){
					mesObj["colStatisCode"] = mes[i]["colStatisCode"] ? mes[i]["colStatisCode"] : "SUM";
				}
				else{
					mesObj["colStatisCode"] = mes[i]["colStatisCode"] ? mes[i]["colStatisCode"] : "COUNT";
				};
				colList["colList"].push(mesObj);
				colList.metaData["Y"].push(mes[i]["colAlias"]);
			};
			if(fitter){
				for (var i = 0,len = fitter.length;i < len ; i ++){
					var fitterObj = {};
						fitterObj["tableId"] = this._TableID;
						fitterObj["colId"] = fitter[i]["colId"];
						fitterObj["operateType"] = fitter[i]["operateType"] ? fitter[i]["operateType"] :"IN";
	   					fitterObj["isReversed"]  = fitter[i]["isReversed"];
	   					fitterObj["colValue"] = fitter[i]["colValue"];
						colList["colFilterList"].push(fitterObj);
				};
			};
			//排序并且选排序条件并且不为默认状态
			if(sort && (sort.orderType != "DEF")){
				var sortObj = {
				"tableId" : this._TableID,
			    "colId" : sort["colId"],
			    "colStatisCode" : "SUM",
			    "orderType" : sort["orderType"],
			    "orderSeq" : "1"
			  };
			  colList.colSortList.push(sortObj);
			};
			if(!this._page){
//				if(!this._page.pageSize){
					this._page = {"pageNum":-1,"pageSize":""}
//					colList["pageNum"] = this._page["pageNum"];
//					colList["pageSize"] = 100;
					colList["pageNum"] = this._page["pageNum"];
//				}
				
			}
			else{
				colList["pageNum"] = this._page["pageNum"];
				colList["pageSize"] = this._page["pageSize"];
			};			
			return colList;
		},
		setColumnList : function(dim,mes,fitter,sort){
			var colList = {"sourceType":this._sourceType,"resultType":"common","colList" :[],"colFilterList":[],"colSortList":[],"metaData":{},"pageNum":1,"pageSize":""};
			colList.metaData["X"] = [];
			colList.metaData["Y"] = [];
			if(dim){
				for (var i = 0,len = dim.length;i < len ;i ++){
					var dimObj = {};
					dimObj["tableId"] = this._TableID;
					dimObj["colTypeCode"] = dim[i].colTypeCode;
					dimObj["colId"] = dim[i]["colId"];
					colList["colList"].push(dimObj);
					colList.metaData["X"].push(dim[i]["colAlias"]);
				};
			};
			for (var i = 0,len = mes.length;i < len ; i ++){
				var mesObj = {};
				mesObj["tableId"] = this._TableID;
				mesObj["colTypeCode"] = "MEA";
				mesObj["colId"] = mes[i]["colId"];
				//根据状态值去判断默认值
				if(mes[i]["colTypeCode"] == "MEA"){
					mesObj["colStatisCode"] = mes[i]["colStatisCode"] ? mes[i]["colStatisCode"] : "SUM";
				}
				else{
					mesObj["colStatisCode"] = mes[i]["colStatisCode"] ? mes[i]["colStatisCode"] : "COUNT";
				};
				colList["colList"].push(mesObj);
				colList.metaData["Y"].push(mes[i]["colAlias"]);
			};
			if(fitter){
				for (var i = 0,len = fitter.length;i < len ; i ++){
					var fitterObj = {};
						fitterObj["tableId"] = this._TableID;
						fitterObj["colId"] = fitter[i]["colId"];
						fitterObj["operateType"] = fitter[i]["operateType"] ? fitter[i]["operateType"] :"IN";
	   					fitterObj["isReversed"]  = fitter[i]["isReversed"];
						fitterObj["colValue"] = fitter[i]["colValue"];
						colList["colFilterList"].push(fitterObj);
				};
			};
			//排序并且选排序条件并且不为默认状态
			if(sort && (sort.orderType != "DEF")){
				var sortObj = {
				"tableId" : this._TableID,
			    "colId" : sort["colId"],
			    "colStatisCode" : "SUM",
			    "orderType" : sort["orderType"],
			    "orderSeq" : "1"
			  };
			  colList.colSortList.push(sortObj);
			};
			if(!this._page){
//				if(!this._page.pageSize){
					this._page = {"pageNum":-1,"pageSize":""}
	//				colList["pageNum"] = this._page["pageNum"];
	//				colList["pageSize"] = 100;
					colList["pageNum"] = this._page["pageNum"];
//				}
			}
			else{
				colList["pageNum"] = this._page["pageNum"];
				colList["pageSize"] = this._page["pageSize"];
			};			
			return colList;	
		},
		queryDataOther:function(config){
			var dim = config['dim'];
			var mes = config['mes'];
			var fitter = config['fitter'];
			var sort = config['sort'];
			var value = config['value'];
			var level = config['level'];
			var infraduction = config['infraduction'];
			var successCallback =  config['callBack'];
			var pageNum  = config['pageNum'] ? config['pageNum']:"";
			var pageSize  = config['pageSize'] ? config['pageSize']:"";
			if(pageNum){
				this._page = {"pageNum":pageNum,"pageSize":pageSize};
			};
			var currentObj = this;
//			function queryResult(conditionValueList,callback){
				//参数格式组装
			var paramObj = currentObj.setColumnListOther(dim,mes,fitter,sort,infraduction,value,level);
			var params = {};
			params ["params"] = JSON.stringify(paramObj);
			function query(){
				console.time("resultMessage");
				$.ajax({
	 				type:"post",
					url:"../../dashboard/data/result",
					dataType:"json",
					data:params,
					success:function(data){
						if(successCallback){
							console.timeEnd("resultMessage");
							successCallback(data.resultEntity);
						}
					},
					error:function(e){
						if(errorCallback){
							errorCallback();
						}
					}
				});
			}
			if(!this._sourceData){
				this.querySourceData(query);
			}
			else{
				query();
			}
		},
		//查询数据结果
		queryData:function(config){			
			var dim = config['dim'];
			var mes = config['mes'];
			var fitter = config['fitter'];
			var sort = config['sort'];
			var successCallback =  config['callBack'];
			var pageNum  = config['pageNum'] ? config['pageNum']:"";
			var pageSize  = config['pageSize'] ? config['pageSize']:"";
			if(pageNum){
				this._page = {"pageNum":pageNum,"pageSize":pageSize};
			};
			var currentObj = this;
//			function queryResult(conditionValueList,callback){
				//参数格式组装
			var paramObj = currentObj.setColumnList(dim,mes,fitter,sort);
			var params = {};
			params ["params"] = JSON.stringify(paramObj);
			function query(){
				console.time("resultNumMessage");
				$.ajax({
	 				type:"post",
					url:"../../dashboard/data/result",
					dataType:"json",
					data:params,
					success:function(data){
						if(successCallback){
							console.timeEnd("resultNumMessage");
							console.time("draw");
							successCallback(data.resultEntity);
						}
					},
					error:function(e){
						if(errorCallback){
							errorCallback();
						}
					}
				});
			}
			if(!this._sourceData){
				this.querySourceData(query);
			}
			else{
				query();
			}
		},
		//获得维度列
		getDimResultList:function(){
			if(this._sourceData){
				return this._sourceData["dimension"];
			}
		},
		//获取量度列
		getMeasureResultList:function(){
			if(this._sourceData){
				var  measure = {};
				measure["dim"] = this._sourceData["dimension"];
				measure["measure"] = this._sourceData["mensuration"];
				return measure;
			}
		},
		//获取过滤条件
		getFitterResultList : function(){
			if(this._sourceData){
				var  fitter = {};
				fitter["dim"] = this._sourceData["dimension"];
				fitter["measure"] = this._sourceData["mensuration"];
				fitter["date"] = this._sourceData["date"];
				return fitter;
			}
		}
    };
    
    ey.data.dataProces = function(){
    	return  new DataProces();
    };
       
})($,ey);