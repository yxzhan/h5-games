/**
 * Created by idea on 2015/5/9.
 */
var _typeArr="";
var _map="";
//文字标签
var title=document.createElement("label");
title.appendChild(document.createTextNode("加个标题吧！"));
var stepLabel=document.createElement("label");
stepLabel.appendChild(document.createTextNode("限制步数: "));
var nameInput=document.createElement("input");
nameInput.setAttribute("type","text");
nameInput.setAttribute("value","最难关卡");
//输入控件
var stepInput=document.createElement("input");
stepInput.setAttribute("type","range");
stepInput.setAttribute("value","100");
stepInput.setAttribute("min","0");
stepInput.setAttribute("max","200");
stepInput.setAttribute("step","1");
stepInput.setAttribute("onInput","outputUpdate()");
//步数显示动态标签
var stepOutput=document.createElement("output");
stepOutput.setAttribute("id","stepOut");
stepOutput.value=stepInput.value;
function outputUpdate() {
    stepOutput.value=stepInput.value;
}
//按钮创建
var okBtn=document.createElement("button");
okBtn.setAttribute('class','dialogBtn');
okBtn.appendChild(document.createTextNode("确定"));
okBtn.setAttribute("onClick","onOkBtnClick()");

var cancelBtn=document.createElement("button");
cancelBtn.setAttribute('class','dialogBtn');
cancelBtn.appendChild(document.createTextNode("取消"));
cancelBtn.setAttribute("onClick","onCancelBtnClick()");


//对话框div,背景,加载中图片,添加到body

var loading=document.createElement("img");
loading.setAttribute("src","server/loading.gif");
loading.setAttribute("class","loading");

var glassBg=document.createElement("div");
glassBg.setAttribute("class","glassBg");
glassBg.appendChild(loading);

var inputDialog=document.createElement("div");
inputDialog.setAttribute("id","inputDialog");
inputDialog.appendChild(title);
inputDialog.appendChild(document.createElement("br"));
inputDialog.appendChild(nameInput);
inputDialog.appendChild(document.createElement("hr"));
inputDialog.appendChild(stepLabel);
inputDialog.appendChild(stepOutput);
inputDialog.appendChild(document.createElement("br"));
inputDialog.appendChild(stepInput);
inputDialog.appendChild(document.createElement("br"));
inputDialog.appendChild(cancelBtn);
inputDialog.appendChild(okBtn);
document.body.appendChild(glassBg);
document.body.appendChild(inputDialog);
inputDialog.style.visibility="hidden";
glassBg.style.visibility="hidden";
loading.style.visibility="hidden";

//按钮事件
function onOkBtnClick(){
    postLevel(nameInput.value,stepInput.value);
    inputDialog.style.visibility="hidden";
    glassBg.style.visibility="hidden";

}
function onCancelBtnClick(){
    glassBg.style.visibility="hidden";
    inputDialog.style.visibility="hidden";

}

function showDialog(typeArr,map) {
    _typeArr = typeArr;
    _map = map;
    glassBg.style.visibility = "visible";
    inputDialog.style.visibility = "visible";

}
//POST数据到后台
function postLevel(ln,st){
    var postUrl = 'server/insert.php'
    var data="typeArr="+_typeArr+"&map="+_map+"&name="+ln+"&step="+st;
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            glassBg.style.visibility="hidden";
            loading.style.visibility="hidden";
            afterInsert(nameInput.value,stepInput.value);
        }
        else{
            console.log("Status:"+xmlhttp.status);
            loading.style.visibility = "visible";
        }
    };
    xmlhttp.open("POST", postUrl, true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(data);
}
