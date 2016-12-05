//  var infos = [['小A','女',21,'大一'], 
//  			 ['小B','男',23,'大三'],
//  			 ['小C','男',24,'大四'], 
//  			 ['小D','女',21,'大一'],
//  			 ['小E','女',22,'大四'], 
//  			 ['小F','男',21,'大一'],
//  			 ['小G','女',22,'大二'], 
//  			 ['小H','女',20,'大三'],
//  			 ['小I','女',20,'大一'], 
//  			 ['小J','男',20,'大三']];
 
//  //第一次筛选，找出都是大一的信息
//  var info_fresh = infos.filter(function(item,index,infos){
//     return item[3]==="大一" ;
//  });
  
//  //第二次筛选，找出都是女生的信息
 
//  var info_female = info_fresh.filter(function(item,index){
//      return item[1]==="女";
//  });

// alert(info_female);
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var flag = false;
	var city = document.getElementById('aqi-city-input').value.trim();
	var index = document.getElementById('aqi-value-input').value.trim();
	if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！");
        return flag;
  }
  if(!index.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！");
        return flag;
  }
    aqiData.city = city;
    aqiData.index = index;
    flag = true;
    return flag;
}

/**s
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var tableNode = document.getElementsByTagName("tbody")[0];
  var citynode = document.createElement("tr");
  citynode.innerHTML = "<td>"+aqiData.city+"</td>"+"<td>"+aqiData.index+"</td>"+"<td><button>删除</button></td>";
  tableNode.appendChild(citynode);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  if(addAqiData()){
    renderAqiList();
    init();
  }
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(index) {
  // do sth.
  alert(index);
var trs = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
trs[index].parentNode.removeChild(trs[index]);
// var i=0;
// var count = 0;
// while(tableNode.childNodes[i]){
//   if(tableNode.childNodes[i].nodeType===1){
//     count++;
//     if(count ===index){
     
//       return;
//     }
//   }
//   i++;
// }

  // renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var btn = document.getElementById("add-btn");
	var btn1 = document.getElementsByTagName("button");
	btn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
var dels = document.getElementById("aqi-table").getElementsByTagName("button");
var length = dels.length;
for (var i = 0; i <length; i++) {
  dels[i].onclick = function(index){
    return function(){
      delBtnHandle(index);
    };
  }(i);
}
}

init();

// var jsondata = '{"staff":[{"name":"joy","age":20},{"name":"kate","age":18},{"name":"qura",age:10}]}';
// var jsonObj = eval("("+ jsondata +")");

// function init() {

//   // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
//   var btn = document.getElementById("add-btn");
//   var btn1 = document.getElementsByTagName("button");
//   btn.onclick = addBtnHandle;
//   // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
// var dels = document.getElementById("aqi-table").getElementsByTagName("button");
// for (var i = 0; i <dels.length; i++) {
//   dels[i].onclick = function(obj){
//     return function(){
//       delBtnHandle(obj);
//     };
//   }(this);
// }
// }