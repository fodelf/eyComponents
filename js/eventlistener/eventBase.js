///*!
//* Instruction :事件基类
//* 
//* Author : 吴文周
//* 
//* Date: 2017-03-20
//*/
//(function($,ey){
//	"use strict";
//	
//    var EventBase = function(eventName,times){
//    	this.eventName= eventName;
//    	//默认监听执行一次
//    	if(times){
//    		this.times = times;
//    	}
//    	else{
//    		this.times = "one";
//    	}
//    };
//    //扩展当前组件
//    EventBase.prototype = {
//		setInformation:function(information){
//			this.information= information;	
//		}   		 
//    };
//    
//    ey.eventLibrary.eventBase = function(eventName,times){
//    	return  new EventBase(eventName,times)
//    };
//       
//})($,ey);
/*
 Instruction :事件基类

 Author : 吴文周

 Date: 2017-03-20
*/
(function(e,d){var c=function(a,b){this.eventName=a;this.times=b?b:"one"};c.prototype={setInformation:function(a){this.information=a}};d.eventLibrary.eventBase=function(a,b){return new c(a,b)}})($,ey);