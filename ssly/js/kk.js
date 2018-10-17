function to_submit()
{
	if (document.form2.keywords.value=="请输入关键词搜索")
{
window.alert("请输入关键词搜索");
document.form2.keywords.focus();
return false;
}


}
function to_submit2()
{
	if (document.form3.subject.value=="填写电话号码如：400-888-8888")
{
window.alert("请填写电话号");
document.form3.subject.focus();
return false;
}


}
function f_setTab(m,n){
 var f_tli=document.getElementById("f_menu"+m).getElementsByTagName("a");
 var f_mli=document.getElementById("f_main"+m).getElementsByTagName("ol");
 for(f_i=0;f_i<f_tli.length;f_i++){
 f_tli[f_i].className=f_i==n?"f_hover":"";
  f_mli[f_i].style.display=f_i==n?"block":"none";
 }
}
//搜索
function setTab(m,n){
 var tli=document.getElementById("menu"+m).getElementsByTagName("li");
 var mli=document.getElementById("main"+m).getElementsByTagName("ul");
 for(i=0;i<tli.length;i++){
  tli[i].className=i==n?"hover":"";
  mli[i].style.display=i==n?"block":"none";
 }
}

function check()

{



	if (document.form1.fullname.value=="")

{

window.alert("请输入联系人        ");

document.form1.fullname.focus();

return false;

}



if (document.form1.mobile.value=="")

{

window.alert("请输入您的手机号码");

document.form1.mobile.focus();

return false;

}

if (document.form1.email.value=="")

{

window.alert("请输入您的电子邮箱");

document.form1.email.focus();

return false;

}
if (document.form1.content.value=="")

{

window.alert("请输入采购意向描述");

document.form1.content.focus();

return false;

}

if (document.form1.sys_check.value=="")

{

window.alert("请输入验证码  ");

document.form1.sys_check.focus();

return false;

}

}
