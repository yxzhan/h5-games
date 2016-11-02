window.remoteUrl = 'http://45.32.18.25'
var _typeArr="",
    map="",
//文字标签
    title=document.createElement("label"),
    stepLabel=document.createElement("label"),
    nameInput=document.createElement("input"),
//输入控件
    stepInput=document.createElement("input"),
//步数显示动态标签
    stepOutput=document.createElement("output"),
//按钮创建
    okBtn=document.createElement("button"),
    cancelBtn=document.createElement("button"),
    loading=document.createElement("img"),
    glassBg=document.createElement("div"),
    inputDialog=document.createElement("div");

function init() {
    title.appendChild(document.createTextNode("Let's give it a name！"));
    stepLabel.appendChild(document.createTextNode("Move limitation: "));
    nameInput.setAttribute("type","text");
    nameInput.setAttribute("value","Smiler");
    stepInput.setAttribute("type","range");
    stepInput.setAttribute("value","100");
    stepInput.setAttribute("min","0");
    stepInput.setAttribute("max","200");
    stepInput.setAttribute("step","1");
    stepInput.setAttribute("onInput","outputUpdate()");
    stepOutput.setAttribute("id","stepOut");
    stepOutput.value=stepInput.value;
    okBtn.setAttribute('class','dialogBtn');
    okBtn.appendChild(document.createTextNode("OK"));
    okBtn.setAttribute("onClick","onOkBtnClick()");
    cancelBtn.setAttribute('class','dialogBtn');
    cancelBtn.appendChild(document.createTextNode("Cancel"));
    cancelBtn.setAttribute("onClick","onCancelBtnClick()");
    loading.setAttribute("src","server/loading.gif");
    loading.setAttribute("class","loading");
    glassBg.setAttribute("class","glassBg");
    glassBg.appendChild(loading);
}

document.addEventListener('DOMContentLoaded', function(){
    init();
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
}, false);

function outputUpdate() {
    stepOutput.value=stepInput.value;
}
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
    var postUrl = remoteUrl + '/s/json?func=postLevel'
    var data="typeArr="+_typeArr+"&map="+_map+"&name="+ln+"&step="+st;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            glassBg.style.visibility="hidden";
            loading.style.visibility="hidden";
            afterInsert(nameInput.value, stepInput.value);
        }
        else{
            console.log("Status:"+xmlhttp.status);
            loading.style.visibility = "visible";
        }
    };
    xmlhttp.open("POST",postUrl,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(data);
}
 
