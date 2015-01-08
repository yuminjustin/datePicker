/*version:1.1*/ 
(function () {
    var datePicker = function (c) {
        this.d = new Date();
        this.c = {
            week: "S,M,T,W,T,F,S",
            submit: "OK",
            color: {
                sbg: "#000",
                sc: "#fff",
                cbg: "#fff",
                cc: "#000",
                subbg: "#007FFF",
                subc: "#fff",
                weekBarbg: "#96CD31",
                weekBarc: "#333",
                normalbg: "#fff",
                normalc: "#333",
                weekendbg: "#a7f5b0",
                emptybg: "#cbea95",
                todaybg: "#f00",
                todayc: "#fff"
            }
        }
        if (c) {
            if (c.week != "") this.c.week = c.week;
            if (c.submit != "") this.c.submit = c.submit;
            if (c.color && c.color.length == 14) this.c.color = c.color;
        }
        rollBack(this);
        init(this);
    }
    datePicker.prototype.picker = function (o) {
        o.blur();
        this.o.style.display = "block";
        this.target = o;
    }
    var rollBack = function (o) {
        o.c.year = o.d.getFullYear();
        o.c.month = o.d.getMonth();
        o.c.day = o.d.getDate()
        o.c.weekday = o.d.getDay();
    }
    var init = function (t) {
        t.o = document.createElement("div");
        t.o.id = "datePickerShadow";
        document.body.appendChild(t.o);
        template.shadowCss(t.o);
        t.o.innerHTML = template.shadowBlock();
        template.shadowBlockCsss(document.getElementById("datePickerBlock"));
        t.o.innerHTML += template.stage();
        t.stage = document.getElementById("dataPicker");
        template.stageCss(t.stage, t.c.color);
        t.stage.innerHTML = template.header(t.c);
        template.headerCss(document.getElementById("dPHeader"), t.c.color);
        t.stage.innerHTML += template.weekBar(t.c.week);
        template.weekBarCss(document.getElementById("weekBar"), t.c.color);
        t.stage.innerHTML += template.weekList();
        template.weekListCss(document.getElementById("weekList"), t.c.color);
        calendarMaker(t);
        events(t);
    }
    var template = {
        shadowCss: function (o) {
            o.style.cssText = "width: 100%; height: 100%;position: fixed;background: rgba(0,0,0,.5);top:0;left:0;display:none;";
        },
        shadowBlock: function () {
            return '<div id="datePickerBlock"></div>';
        },
        shadowBlockCsss: function (o) {
            o.style.cssText = "width: 100%; height: 100%;position:absolute;top:0;left:0;z-index:1;";
        },
        stage: function () {
            return '<div id="dataPicker"></div>';
        },
        stageCss: function (o, c) {
            o.style.cssText = "width: 96%;overflow: hidden;height: auto;min-height: 50%;background:" + c.sbg + ";color:" + c.sc + ";position: absolute;bottom: 0;padding: 10px 2%;z-index: 999;z-index:2;";
        },
        header: function (o) {
            return '<div class="dPHeader" id="dPHeader"><div class="dPHBox"><span class="dPc" id="Ycut">-</span><span id="dPYear">' + o.year + '</span><span class="dPc" id="Yplus">+</span></div><div class="dPHBox"><span class="dPc" id="Mcut">-</span><span id="dPMonth">' + (o.month + 1) + '</span><span class="dPc" id="Mplus">+</span></div><div class="dPHBox"><span id="dPDay">' + o.day + '</span></div><button id="dPSave">' + o.submit + '</button></div>';
        },
        headerCss: function (o, c) {
            var box = o.getElementsByClassName("dPHBox");
            var css1 = "display: block;float: left;height: 22px; line-height: 22px;margin: 4px;"
            o.style.cssText = "width: 100%; height: 30px; line-height: 30px;";
            document.getElementById("dPSave").style.cssText = css1 + "background:" + c.subbg + "; float: right; border: none; padding: 0 8px;color:" + c.subc;
            for (var i = 0; i < box.length; i++) {
                box[i].style.cssText = "float: left;overflow: hidden;";
                var spans = box[i].getElementsByTagName("span");
                for (var j = 0; j < spans.length; j++) {
                    spans[j].style.cssText = css1;
                }
                var dPcs = box[i].getElementsByClassName("dPc");
                for (var j = 0; j < dPcs.length; j++) {
                    dPcs[j].style.cssText += "width: 22px; text-align: center; background:" + c.cbg + "; border-radius: 11px; font-weight: bold;color:" + c.cc;
                }
            }
        },
        weekBar: function (o) {
            var arr = o.split(",");
            var htm = '<div class="dPWeek" id="weekBar">';
            for (var i = 0; i < 7; i++) {
                htm += "<span>" + arr[i] + "</span>";
            }
            return htm + "</div>";
        },
        weekBarCss: function (o, c) {
            o.style.cssText = "margin:0 auto;width: 100%; height: 30px; line-height: 30px;"
            var spans = o.getElementsByTagName("span");
            for (var i = 0; i < spans.length; i++) {
                spans[i].style.cssText = "width: 14.2%; display: block;float: left; text-align: center; color:" + c.weekBarc + ";font-weight: bold;background:" + c.weekBarbg;
            }
        },
        weekList: function () {
            return '<div id="weekList"></div>';
        },
        weekListCss: function (o) {
            o.style.cssText = "margin:0 auto;overflow: hidden;";
        },
        weekListInner: function (a) {
            var htm = "";
            for (var i = 0; i < a.length; i++) {
                if (a[i]) htm += "<span>" + a[i] + "</span>";
                else htm += "<span>&nbsp;</span>";
            }
            return htm;
        },
        weekListInnerCss: function (l, today, c) {
            for (var i = 0; i < l.length; i++) {
                l[i].style.cssText = "width: 14.2%; display: block;float: left; text-align: center; color:" + c.normalc + ";height: 30px;line-height: 30px;margin-top: 2px;background:" + c.normalbg;
                if (!(i % 7) || !((i + 1) % 7)) {
                    l[i].style.cssText += "background:" + c.weekendbg;
                    l[i].setAttribute("weekend", "y");
                }
                if (l[i].innerHTML == today)
                    this.click(l[i], c);
                if (!parseInt(l[i].innerHTML))
                    l[i].style.background = c.emptybg;
            }
        },
        click: function (o, c) {
            var f = document.getElementById("weekList");
            var on = "xon";
            var onl = f.getElementsByClassName(on);
            if (onl[0]) {
                if (onl[0].getAttribute("weekend"))
                    onl[0].style.background = c.weekendbg;
                else
                    onl[0].style.background = c.normalbg;
                onl[0].style.color = c.normalc;
                onl[0].className = "";
            }
            o.className = on;
            o.style.cssText += "background:" + c.todaybg + ";color:" + c.todayc;
        }
    }
    var calendarMaker = function (o) {
        var self = o;
        var f = document.getElementById("weekList");
        var re = monthArr(self.c);
        var htm = template.weekListInner(re);
        f.innerHTML = htm;
        template.weekListInnerCss(f.getElementsByTagName("span"), self.c.day, self.c.color);
        document.getElementById("dPYear").innerHTML = self.c.year;
        document.getElementById("dPMonth").innerHTML = (function () {
            return formate(self.c.month + 1);
        })();
        document.getElementById("dPDay").innerHTML = (function () {
            return formate(self.c.day);
        })();;
    }
    var events = function (o) {
        var self = o;
        var yc = document.getElementById("Ycut");
        var yp = document.getElementById("Yplus");
        var y = document.getElementById("dPYear");
        var mc = document.getElementById("Mcut");
        var mp = document.getElementById("Mplus");
        var m = document.getElementById("dPMonth");
        var d = document.getElementById("dPDay");
        var s = document.getElementById("dPSave");
        var w = document.getElementById("weekList");
        var b = document.getElementById("datePickerBlock");
        var fn = function () {
            self.c.day = 1;
            d.innerHTML = "01";
        }
        yc.onclick = function () {
            y.innerHTML = self.c.year = parseInt(y.innerHTML) - 1;
            fn();
            calendarMaker(self);
        }
        yp.onclick = function () {
            y.innerHTML = self.c.year = parseInt(y.innerHTML) + 1;
            fn();
            calendarMaker(self);
        }
        mc.onclick = function () {
            var mm = parseInt(m.innerHTML) - 1;
            if (!mm) {
                mm = 12;
                self.c.year--;
            }
            self.c.month = mm - 1;
            m.innerHTML = formate(mm);
            fn();
            calendarMaker(self);
        }
        mp.onclick = function () {
            var mm = parseInt(m.innerHTML) + 1;
            if (mm == 13) {
                mm = 1;
                self.c.year++;
            };
            self.c.month = mm - 1;
            m.innerHTML = formate(mm);
            fn();
            calendarMaker(self);
        }
        w.onclick = function (e) {
            if (e.target) {
                if (parseInt(e.target.innerHTML)) {
                    var da = parseInt(e.target.innerHTML);
                    self.c.day = da;
                    d.innerHTML = formate(da);;
                    template.click(e.target, self.c.color);
                }
            }
        }
        s.onclick = function () {
            var str = y.innerHTML + "-" + m.innerHTML + "-" + d.innerHTML;
            self.target.value = str;
            self.o.style.display = "none";
            rollBack(self);
            calendarMaker(self);
        }
        b.onclick = function () {
            self.o.style.display = "none";
            rollBack(self);
            calendarMaker(self);
        }
    }
    var monthArr = function (o) {
        var r = o.year % 4;
        var d = new Date();
        var arr = [],
            arr2 = [];
        var head = 0;
        d.setFullYear(o.year);
        d.setMonth(o.month, 1);
        head = d.getDay();
        for (var i = 0; i < 12; i++) {
            if (i < 7) {
                if (i % 2) arr[i] = 30;
                else arr[i] = 31;
                if (i == 1 && r) arr[i] = 28;
                if (i == 1 && !r) arr[i] = 29;
            } else {
                if (i % 2) arr[i] = 31;
                else arr[i] = 30;
            }
        }
        for (var i = 0; i < arr[o.month]; i++) {
            arr2[i] = i + 1;
        }
        for (var i = 0; i < head; i++) {
            arr2.unshift(0);
        }
        for (var i = 0; i < arr2.length % 7; i++) {
            arr2.push(0);
        }
        return arr2;
    }
    var formate = function (n) {
        if (parseInt(n) < 10) n = "0" + n;
        return n;
    }
    window.datePicker = datePicker;
})();
