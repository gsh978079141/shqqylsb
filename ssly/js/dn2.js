var dn2_Speed = 10; //速度(毫秒)
var dn2_Space = 10; //每次移动(px)
var dn2_PageWidth = 1125; //翻页宽度
var dn2_fill = 0; //整体移位
var dn2_MoveLock = false;
var dn2_MoveTimeObj;
var dn2_Comp = 0;
var dn2_dn2_AutoPlayObj = null;
GetObj("dn2_List2").innerHTML = GetObj("dn2_List1").innerHTML;
GetObj('ISL_dn2_Cont').scrollLeft = dn2_fill;
GetObj("ISL_dn2_Cont").onmouseover = function(){clearInterval(dn2_dn2_AutoPlayObj);}
GetObj("ISL_dn2_Cont").onmouseout = function(){dn2_AutoPlay();}
dn2_AutoPlay();
function GetObj(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval

('document.all.'+objName)}}
function dn2_AutoPlay(){ //自动滚动
clearInterval(dn2_dn2_AutoPlayObj);
dn2_dn2_AutoPlayObj = setInterval('dn2_ISL_GoDown();dn2_ISL_StopDown();',5000); //间隔时间
}
function dn2_ISL_GoUp(){ //上翻开始
if(dn2_MoveLock) return;
clearInterval(dn2_dn2_AutoPlayObj);
dn2_MoveLock = true;
dn2_MoveTimeObj = setInterval('dn2_ISL_ScrUp();',dn2_Speed);
}
function dn2_ISL_StopUp(){ //上翻停止
clearInterval(dn2_MoveTimeObj);
if(GetObj('ISL_dn2_Cont').scrollLeft % dn2_PageWidth - dn2_fill != 0){
dn2_Comp = dn2_fill - (GetObj('ISL_dn2_Cont').scrollLeft % dn2_PageWidth);
dn2_CompScr();
}else{
dn2_MoveLock = false;
}
dn2_AutoPlay();
}
function dn2_ISL_ScrUp(){ //上翻动作
if(GetObj('ISL_dn2_Cont').scrollLeft <= 0){GetObj('ISL_dn2_Cont').scrollLeft = GetObj

('ISL_dn2_Cont').scrollLeft + GetObj('dn2_List1').offsetWidth}
GetObj('ISL_dn2_Cont').scrollLeft -= dn2_Space ;
}
function dn2_ISL_GoDown(){ //下翻
clearInterval(dn2_MoveTimeObj);
if(dn2_MoveLock) return;
clearInterval(dn2_dn2_AutoPlayObj);
dn2_MoveLock = true;
dn2_ISL_ScrDown();
dn2_MoveTimeObj = setInterval('dn2_ISL_ScrDown()',dn2_Speed);
}
function dn2_ISL_StopDown(){ //下翻停止
clearInterval(dn2_MoveTimeObj);
if(GetObj('ISL_dn2_Cont').scrollLeft % dn2_PageWidth - dn2_fill != 0 ){
dn2_Comp = dn2_PageWidth - GetObj('ISL_dn2_Cont').scrollLeft % dn2_PageWidth + dn2_fill;
dn2_CompScr();
}else{
dn2_MoveLock = false;
}
dn2_AutoPlay();
}
function dn2_ISL_ScrDown(){ //下翻动作
if(GetObj('ISL_dn2_Cont').scrollLeft >= GetObj('dn2_List1').scrollWidth){GetObj('ISL_dn2_Cont').scrollLeft =

GetObj('ISL_dn2_Cont').scrollLeft - GetObj('dn2_List1').scrollWidth;}
GetObj('ISL_dn2_Cont').scrollLeft += dn2_Space ;
}
function dn2_CompScr(){
var num;
if(dn2_Comp == 0){dn2_MoveLock = false;return;}
if(dn2_Comp < 0){ //上翻
if(dn2_Comp < -dn2_Space){
   dn2_Comp += dn2_Space;
   num = dn2_Space;
}else{
   num = -dn2_Comp;
   dn2_Comp = 0;
}
GetObj('ISL_dn2_Cont').scrollLeft -= num;
setTimeout('dn2_CompScr()',dn2_Speed);
}else{ //下翻
if(dn2_Comp > dn2_Space){
   dn2_Comp -= dn2_Space;
   num = dn2_Space;
}else{
   num = dn2_Comp;
   dn2_Comp = 0;
}
GetObj('ISL_dn2_Cont').scrollLeft += num;
setTimeout('dn2_CompScr()',dn2_Speed);
}
}