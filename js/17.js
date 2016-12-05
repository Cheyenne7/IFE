/*Object.keys(obj)获得obj对象所有键
Object.values(obj)获得obj对象所有值

option的text是元素的内容，value是传给后台的值
*/

/* 数据格式演示
var aqiSourceData = {
	"北京": {
		"2016-01-01": 10,
		"2016-01-02": 10,
		"2016-01-03": 10,
		"2016-01-04": 10
	}
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = dat.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr = '';
	for (var i = 1; i < 92; i++) {
		datStr = getDateStr(dat);
		returnData[datStr] = Math.ceil(Math.random() * seed);//向上取整
		dat.setDate(dat.getDate() + 1);
	}
	return returnData;
}

var aqiSourceData = {
	"北京": randomBuildData(500),
	"上海": randomBuildData(300),
	"广州": randomBuildData(200),
	"深圳": randomBuildData(100),
	"成都": randomBuildData(300),
	"西安": randomBuildData(500),
	"福州": randomBuildData(100),
	"厦门": randomBuildData(100),
	"沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
	nowSelectCity: 0,
	nowGraTime: "day"
};

/**
 * 渲染图表
 */
 function renderChart() {
 	var color = ["red","blue","yellow"];
 	//获得当前时间和地点的选择
 	var radioValue = pageState.nowGraTime;
 	var cityName = document.getElementById("city-select").options[pageState.nowSelectCity].text;
 	var arrData = chartData[radioValue][cityName];
 	var leftpx= 0;
 	var keys= Object.keys(arrData);
 	if(document.getElementById("aqi-chart-wrap").innerHTML){
 		document.getElementById("aqi-chart-wrap").innerHTML = "";

 		for(var i= 0;i<keys.length;i++){
 			var div = document.createElement("div");
	 		if(pageState.nowGraTime==="day"){
	 			div.style.width = "9px";
	 			// div.style.position = "absolute";
	 			// div.style.bottom = "0px";
	 			// div.style.left = leftpx+"px";
 			}else if(pageState.nowGraTime === "week"){
 				div.style.width = "20px";
 			}
 			else if(pageState.nowGraTime === "month"){
 				div.style.width = "40px";
 			}
	 		div.style.marginLeft = "1px";
	 		div.style.display = "inline-block";
	 		div.style.height =arrData[keys[i]]+"px";
 			div.style.backgroundColor= color[Math.ceil(Math.random()*3)-1];
 			// leftpx+=10;
 			document.getElementById("aqi-chart-wrap").appendChild(div);
 		}
 	}
 }

/**
 * 日、周、月的radio事件点击时的处理函数
 */
 function graTimeChange(obj) {
	// 设置对应数据
	pageState.nowGraTime = obj.value;
	// 调用图表渲染函数
	renderChart();
}

/**
 * select发生变化时的处理函数
 */
 function citySelectChange() {
	// 确定是否选项发生了变化 
	var selectNode=document.getElementById("city-select");
	pageState.nowSelectCity = selectNode.selectedIndex;
	// 设置对应数据
	// 调用图表渲染函数
	renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
 function initGraTimeForm() {
 	var radios = document.getElementsByName("gra-time");
 	radios[0].checked = "checked";

 	for (var i = 0; i < radios.length; i++) {
 		radios[i].onclick = function(){
 			graTimeChange(this);
 		};
 	}
 }

/**
 * 初始化城市Select下拉选择框中的选项
 */
 function initCitySelector() {
	// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var arr = Object.keys(aqiSourceData);
	var selectNode = document.getElementById("city-select");
	for(var i =0;i<arr.length;i++){
		var opt = document.createElement("option");
		opt.innerHTML = arr[i];
		selectNode.appendChild(opt);
	}
	// 给select设置事件，当选项发生变化时调用函数citySelectChange
	selectNode.onchange = citySelectChange;

}

/**
 * 初始化图表需要的数据格式
 */
 function initAqiChartData() {
	// 将原始的源数据处理成图表需要的数据格式
	// 处理好的数据存到 chartData 中
	chartData.day = aqiSourceData;//用点号比用[ ]好
	chartData.week = getWeekData();
	chartData.month = getMonthData();
}

/**
 * 初始化函数
 */
 function init() {
 	initGraTimeForm();
 	initCitySelector();
 	initAqiChartData();
 	renderChart();
 }

 init();

 function getWeekData(){
 	var weekdata = {};
 	var keys = Object.keys(aqiSourceData);//北京 上海 广州
	for(var i = 0;i<keys.length;i++){//七个城市
		var arr = aqiSourceData[keys[i]];//每个城市的数据,92个（时间：值）
		var objs = {};
		weekdata[keys[i]] = objs;//不写这个会报错
		var sum= 0;
		var count = 0;
		var dat = new Date("2016-01-01");
		var last6Day = "";
		for(var j = 0;j<92;j++){
			count++;
			sum+=arr[getDateStr(dat)];
			if(count%7 ===1){
				last6Day = getDateStr(dat);
			}
			if(count%7 ===0){
				var score =  Math.ceil(sum/7);
				sum = 0;
				objs[last6Day+"至"+getDateStr(dat)] = score;
			}
			dat.setDate(dat.getDate() + 1);
		}
	}
	return weekdata;
}

function getMonthData(){
	var monthData = {};
	var keys = Object.keys(aqiSourceData);
	for (var i = 0; i < keys.length; i++) {

		monthData[keys[i]] = {};
		var objData = aqiSourceData[keys[i]];
		var dat = new Date("2016-01-01");
		var lstMonth = 0;
		var sum = 0;
		for (var j = 0; j < 92; j++) {
			if(dat.getMonth()===lstMonth+1){
				var monthStr = dat.getFullYear()+"-"+dat.getMonth();
				monthData[keys[i]][monthStr] = Math.ceil(sum/(j+1));
				sum = 0;
			}
			sum+=objData[getDateStr(dat)];
			lstMonth = dat.getMonth();
			dat.setDate(dat.getDate()+1);
		}
	}
	return monthData;
}

