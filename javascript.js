function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [undefined, ""])[1].replace(/\+/g, '%20')) || null;
}

if (!(getURLParameter("page_title") == undefined)) {
    document.title = getURLParameter("page_title")
} else {
    document.title = "中考倒计时"
}

if (!(getURLParameter("vid_bg") == undefined)) {
    document.getElementById("v1").src = "bgs/" + getURLParameter("vid_bg") + ".mp4";
    document.getElementById("v1").play()
} else {
    document.getElementById("v1").src = "bgs/bg.mp4";
    document.getElementById("v1").play()
}

if (!(getURLParameter("aid_bg") == undefined)) {
    document.getElementById("a1").src = "bgs/" + getURLParameter("aid_bg") + ".mp3";
    document.getElementById("a1").play()
} else {
    document.getElementById("a1").src = "bgs/bg.mp3";
    document.getElementById("a1").play()
}

if (!(getURLParameter("pic_bg") == undefined)) {
    document.getElementById("b1").style.background = "url(bgs/" + getURLParameter("pic_bg") + ".jpg) no-repeat"
    document.getElementById("b1").style.backgroundSize = "100% 100%"
    document.getElementById("b1").style.backgroundAttachment = "fixed"
} else {
    document.getElementById("b1").style.background = "url(bgs/bg.jpg) no-repeat"
    document.getElementById("b1").style.backgroundSize = "100% 100%"
    document.getElementById("b1").style.backgroundAttachment = "fixed"
}

if (getURLParameter("bing_bg") == "t") {
    document.getElementById("v1").src = "";
    document.getElementById("a1").src = "";
    document.getElementById("b1").style.background = "url(https://api.oneneko.com/v1/bing_today) no-repeat"
    document.getElementById("b1").style.backgroundSize = "100% 100%"
    document.getElementById("b1").style.backgroundAttachment = "fixed"
}

if (getURLParameter("clear_mode") == "t") {
    document.getElementById("v1").src = "";
    document.getElementById("a1").src = "";
    document.getElementById("b1").style.background = ""
}

if (!(getURLParameter("hide_cadpa") == "t")) {
    document.getElementById("cadpa").innerHTML = "<img src=\"data:image/png;base64,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\"/>"
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
    if (!(getURLParameter("title") == undefined)) {
        html = "<br><div>" + getURLParameter("title") + "</div><br>";
    } else {
        html = "<br><div>距2024年中考还有：</div><br>";
    }

    if (!(getURLParameter("no_d") == "t")) {
        html = html + (day < 10 ? "0" + day + "天" : day + "天")
    }

    if (!(getURLParameter("no_h") == "t")) {
        html = html + (hour < 10 ? "0" + hour + "小时" : hour + "小时")
    }

    if (!(getURLParameter("no_m") == "t")) {
        html = html + (minute < 10 ? "0" + minute + "分" : minute + "分")
    }

    if (!(getURLParameter("no_s") == "t")) {
        html = html + (second < 10 ? "0" + second + "秒" : second + "秒")
    }

    if (!(getURLParameter("no_ms") == "t")) {
        html = html + (millisecond < 10 ? "00" + millisecond + "毫秒" : millisecond < 100 ? "0" + millisecond + "毫秒" : millisecond + "毫秒")
    }

    if (!(getURLParameter("text") == undefined)) {
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