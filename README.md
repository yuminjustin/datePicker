datePicker
==========
版本：1.0；

日期选择器，针对手机而制作，配置简单；

配置如下

var d = new datePicker({
      week: "日,一,二,三,四,五,六",  //星期标识
      submit: "确定"  //确定按钮的文案
});

使用：

  直接在HTML标签中使用
  
  <input type="text" onclick="d.picker(this,event);" />
  
  在代码中建立绑定事件
  
  document.getElementById("XX").onclick = function(event){
      d.picker(this,event);
  }
  
  或者使用addEventListener去绑定
  
以后版本将暴露颜色属性的参数和增加取消关闭事件
