datePicker
==========
###版本：1.1；

![datePicker](http://yuminjustin.cn/upload/20150919/20141231055421706.png "datePicker") 

###日期选择器，针对手机而制作，配置简单；

###配置如下：

                  var d = new datePicker({
                      week: "日,一,二,三,四,五,六",  //星期标识
                      submit: "确定", //确定按钮的文案
                      color:{}  //共有十四个颜色，详细参考代码
                  });
                  
![datePicker2](http://yuminjustin.cn/upload/20150919/20150105113918855.jpg "datePicker2") 

###使用：

直接在HTML标签中使用

            <input type="text" onclick="d.picker(this);" />
            
在代码中建立绑定事件

            document.getElementById("XX").onclick = function(){
                  d.picker(this);
            }
  
或者使用addEventListener去绑定
<hr/>
###详细：http://dwz.cn/1JZbIP
