function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [undefined, ""])[1].replace(/\+/g, '%20')) || null;
}

if (getURLParameter("page_title") != undefined) {
    document.title = getURLParameter("page_title")
} else {
    document.title = "中考倒计时"
}
if (getURLParameter("vid_bg") != undefined) {
    document.getElementById("v1").src = "bgs/" + getURLParameter("vid_bg");
    document.getElementById("v1").play()
} else {
    document.getElementById("v1").src = "bgs/bg.mp4";
    document.getElementById("v1").play()
}
if (getURLParameter("aid_bg") != undefined) {
    document.getElementById("a1").src = "bgs/" + getURLParameter("aid_bg");
    document.getElementById("a1").play()
} else {
    document.getElementById("a1").src = "bgs/bg.mp3";
    document.getElementById("a1").play()
}
if (getURLParameter("pic_bg") != undefined) {
    document.body.style.background = "url(bgs/" + getURLParameter("pic_bg") + ") no-repeat"
    document.body.style.backgroundSize = "100% 100%"
    document.body.style.backgroundAttachment = "fixed"
} else {
    document.body.style.background = "url(bgs/bg.jpg) no-repeat"
    document.body.style.backgroundSize = "100% 100%"
    document.body.style.backgroundAttachment = "fixed"
}
if (getURLParameter("clear_mode") == "t") {
    document.getElementById("v1").src = "";
    document.getElementById("a1").src = "";
    document.body.style.background = ""
}

window.onload = function starttime() {
    let h1 = document.getElementById('h1')
    time(h1, '2024/6/23');
    setTimeout(starttime, 1);
}

function time(obj, futimg) {
    let html;
    const nowtime = new Date().getTime();
    const futruetime = new Date(futimg).getTime();
    const msec = futruetime - nowtime;
    const millisecond = parseInt(msec % 1000);
    const time = (msec / 1000);
    const day = parseInt(time / 86400);
    const hour = parseInt(time / 3600) - 24 * day;
    const minute = parseInt(time % 3600 / 60);
    const second = parseInt(time % 60);
    if (getURLParameter("title") != undefined) {
        html = "<br><div>" + getURLParameter("title") + "</div><br>";
    } else {
        html = "<br><div>距2024年中考还有：</div><br>";
    }
    if (getURLParameter("no_d") != "t") {
        html = html + (day < 10 ? "0" + day + "天" : day + "天")
    }
    if (getURLParameter("no_h") != "t") {
        html = html + (hour < 10 ? "0" + hour + "小时" : hour + "小时")
    }
    if (getURLParameter("no_m") != "t") {
        html = html + (minute < 10 ? "0" + minute + "分" : minute + "分")
    }
    if (getURLParameter("no_s") != "t") {
        html = html + (second < 10 ? "0" + second + "秒" : second + "秒")
    }
    if (getURLParameter("no_ms") != "t") {
        html = html + (millisecond < 100 ? "0" + millisecond + "毫秒" : millisecond < 10 ? "00" + millisecond + "毫秒" : millisecond + "毫秒")
    }
    if (getURLParameter("text") != undefined) {
        html = html + "<br><span>" + getURLParameter("text") + "</span></br>";
    } else {
        html = html + "<br><span>中考加油! </span></br>"
    }
    if (futruetime <= nowtime) {
        obj.innerHTML = "<div class='blink'>倒计时结束！</div>"
    } else {
        obj.innerHTML = html
    }
}