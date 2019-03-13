///*!
//* Instruction :监听者组件
//* 
//* Author : 吴文周
//* 
//* Date: 2017-03-18
//*/
//(function($,ey){
//	"use strict";
//	
//    var Listener = function(){
//    	this._listenerParent = null;
//		this._listenerChildren = [];
//		this._listener = {};
//    };
//    //扩展
//    Listener.prototype = {
//    	//增加监听者
//		addEventListener: function(eventName,fun){
//			//安全性判断
//			if(typeof eventName == "string" && typeof fun == "function" ){
//				
//				this._listener[eventName] = fun;
//			}
//			else{
//				console.log("eventName is not string or fun  is  not  function");
//			};
//			
//		},
//		//触发监听
//		triggerEvent:function(eventObj,eventType){
//			//根据类型选择事件方向
//			if(eventType == "eventDown"){
//				
//				this._eventDown(eventObj);
//				
//			}
//			else{
//				
//				this._eventUp(eventObj);
//				
//			}
//		},
//		//向上冒泡
//		_eventUp:function(eventObj){
//			var listenerParent = this._listenerParent;
//			var funFire = this._listener[eventObj.eventName];
//			if(typeof funFire == "function"){
//				funFire.call(this,eventObj);
//				//监听到执行判断执行次数默认执行一次
//				if(eventObj.times =="one"){
//					return;
//				};				
//			};
//			//如果存在有父层就递归执行
//			if(listenerParent){
//				var funFire = listenerParent._eventUp;
//				if(typeof funFire == "function"){
//					funFire.call(listenerParent,eventObj);
//					return;
//				}
//			};	
//			
//		},		
//		//向下捕获
//		_eventDown:function(){
//			
//			
//		},
//		//添加监听者的子层
//		addListenerChild:function(child){
//			if(child && ("_listenerParent" in child) && ("_listenerChildren" in this)){
//				child._listenerParent = this;
//				this._listenerChildren.push(child);
//			}
//		},
//		//删除监听者的子层
//		removeListenerChild:function(child){
//			if(child && ("_listenerParent" in child) && ("_listenerChildren" in this)){
//				child._listenerParent = null;
//				var index = this._listenerChildren.indexOf(child);
//				this._listenerChildren.splice(index,1);
//			}
//		},
//		//获取获取事件父
//		getListenerParent:function(){
//			return this._listenerParent;
//		},
//		//获取事件子
//		getListenerChirldren :function(){
//			return this._listenerChildren;
//		},
//		//递归 获取获取事件父级
//		getRootParent:function(level){			
//			return this._listenerParent.getRootParent(level);			
//		},
//    };
//    
//    ey.eventLibrary.listener = Listener;
//       
//})($,ey);
/*
 Instruction :监听者组件

 Author : 吴文周

 Date: 2017-03-18
*/
(function(d,e){d=function(){this._listenerParent=null;this._listenerChildren=[];this._listener={}};d.prototype={addEventListener:function(a,b){"string"==typeof a&&"function"==typeof b?this._listener[a]=b:console.log("eventName is not string or fun  is  not  function")},triggerEvent:function(a,b){"eventDown"==b?this._eventDown(a):this._eventUp(a)},_eventUp:function(a){var b=this._listenerParent,c=this._listener[a.eventName];if("function"==typeof c&&(c.call(this,a),"one"==a.times))return;b&&(c=b._eventUp,
"function"==typeof c&&c.call(b,a))},_eventDown:function(){},addListenerChild:function(a){a&&"_listenerParent"in a&&"_listenerChildren"in this&&(a._listenerParent=this,this._listenerChildren.push(a))},removeListenerChild:function(a){a&&"_listenerParent"in a&&"_listenerChildren"in this&&(a._listenerParent=null,a=this._listenerChildren.indexOf(a),this._listenerChildren.splice(a,1))},getListenerParent:function(){return this._listenerParent},getListenerChirldren:function(){return this._listenerChildren},
getRootParent:function(a){return this._listenerParent.getRootParent(a)}};e.eventLibrary.listener=d})($,ey);