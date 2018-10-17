var d_Speed = 10; //速度(毫秒)
var d_Space = 10; //每次移动(px)
var d_PageWidth = 1002; //翻页宽度
var d_fill = 0; //整体移位
var d_MoveLock = false;
var d_MoveTimeObj;
var d_Comp = 0;
var d_d_AutoPlayObj = null;
GetObj("d_List2").innerHTML = GetObj("d_List1").innerHTML;
GetObj('ISL_d_Cont').scrollLeft = d_fill;
GetObj("ISL_d_Cont").onmouseover = function(){clearInterval(d_d_AutoPlayObj);}
GetObj("ISL_d_Cont").onmouseout = function(){d_AutoPlay();}
d_AutoPlay();
function GetObj(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval

('document.all.'+objName)}}
function d_AutoPlay(){ //自动滚动
clearInterval(d_d_AutoPlayObj);
d_d_AutoPlayObj = setInterval('d_ISL_GoDown();d_ISL_StopDown();',5000); //间隔时间
}
function d_ISL_GoUp(){ //上翻开始
if(d_MoveLock) return;
clearInterval(d_d_AutoPlayObj);
d_MoveLock = true;
d_MoveTimeObj = setInterval('d_ISL_ScrUp();',d_Speed);
}
function d_ISL_StopUp(){ //上翻停止
clearInterval(d_MoveTimeObj);
if(GetObj('ISL_d_Cont').scrollLeft % d_PageWidth - d_fill != 0){
d_Comp = d_fill - (GetObj('ISL_d_Cont').scrollLeft % d_PageWidth);
d_CompScr();
}else{
d_MoveLock = false;
}
d_AutoPlay();
}
function d_ISL_ScrUp(){ //上翻动作
if(GetObj('ISL_d_Cont').scrollLeft <= 0){GetObj('ISL_d_Cont').scrollLeft = GetObj

('ISL_d_Cont').scrollLeft + GetObj('d_List1').offsetWidth}
GetObj('ISL_d_Cont').scrollLeft -= d_Space ;
}
function d_ISL_GoDown(){ //下翻
clearInterval(d_MoveTimeObj);
if(d_MoveLock) return;
clearInterval(d_d_AutoPlayObj);
d_MoveLock = true;
d_ISL_ScrDown();
d_MoveTimeObj = setInterval('d_ISL_ScrDown()',d_Speed);
}
function d_ISL_StopDown(){ //下翻停止
clearInterval(d_MoveTimeObj);
if(GetObj('ISL_d_Cont').scrollLeft % d_PageWidth - d_fill != 0 ){
d_Comp = d_PageWidth - GetObj('ISL_d_Cont').scrollLeft % d_PageWidth + d_fill;
d_CompScr();
}else{
d_MoveLock = false;
}
d_AutoPlay();
}
function d_ISL_ScrDown(){ //下翻动作
if(GetObj('ISL_d_Cont').scrollLeft >= GetObj('d_List1').scrollWidth){GetObj('ISL_d_Cont').scrollLeft =

GetObj('ISL_d_Cont').scrollLeft - GetObj('d_List1').scrollWidth;}
GetObj('ISL_d_Cont').scrollLeft += d_Space ;
}
function d_CompScr(){
var num;
if(d_Comp == 0){d_MoveLock = false;return;}
if(d_Comp < 0){ //上翻
if(d_Comp < -d_Space){
   d_Comp += d_Space;
   num = d_Space;
}else{
   num = -d_Comp;
   d_Comp = 0;
}
GetObj('ISL_d_Cont').scrollLeft -= num;
setTimeout('d_CompScr()',d_Speed);
}else{ //下翻
if(d_Comp > d_Space){
   d_Comp -= d_Space;
   num = d_Space;
}else{
   num = d_Comp;
   d_Comp = 0;
}
GetObj('ISL_d_Cont').scrollLeft += num;
setTimeout('d_CompScr()',d_Speed);
}
}