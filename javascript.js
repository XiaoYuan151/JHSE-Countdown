// 获取 URL 参数
function getURLParameter(name) {
    const value = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [undefined, ""])[1].replace(/\+/g, '%20'));
    return value === "undefined" ? null : value || null;
}

// 设置视频背景
function setVideoBackground(url) {
    const b1 = document.getElementById("b1");
    const v1 = document.getElementById("v1");
    if (b1 && v1) {
        b1.src = "";
        v1.src = url;
        v1.play();
    }
}

// 设置音频背景
function setAudioBackground(url) {
    const a1 = document.getElementById("a1");
    if (a1) {
        a1.src = url;
        a1.play();
    }
}

// 设置图片背景
function setBackgroundImage(url) {
    const b1 = document.getElementById("b1");
    const v1 = document.getElementById("v1");
    const a1 = document.getElementById("a1");
    if (b1 && v1 && a1) {
        v1.src = "";
        a1.src = "";
        b1.src = "";
        b1.style.background = "url(" + url + ") no-repeat";
        b1.style.backgroundSize = "100% 100%";
        b1.style.backgroundAttachment = "fixed";
    }
}

// 设置页面标题
function setTitle(title) {
    document.title = title;
}

// 应用设置
function applySettings() {
    const vidBgUrl = getURLParameter("vid_bg_url");
    const vidBg = getURLParameter("vid_bg");
    const aidBgUrl = getURLParameter("aid_bg_url");
    const aidBg = getURLParameter("aid_bg");
    const picBgUrl = getURLParameter("pic_bg_url");
    const picBg = getURLParameter("pic_bg");
    const bingBg = getURLParameter("bing_bg");
    const clearMode = getURLParameter("clear_mode");
    const picBgUpload = getURLParameter("pic_bg_upload");

    if (picBgUpload) {
        setBackgroundImage("http://img.xiaoyuan151.xyz:8080/uploads/" + picBgUpload);
    } else if (picBgUrl) {
        setBackgroundImage(picBgUrl);
    } else if (picBg) {
        setBackgroundImage("bgs/" + picBg + ".jpg");
    } else if (bingBg === "t") {
        setBackgroundImage("https://api.oneneko.com/v1/bing_today");
    } else if (clearMode === "t") {
        const v1 = document.getElementById("v1");
        const a1 = document.getElementById("a1");
        const b1 = document.getElementById("b1");
        if (v1) v1.src = "";
        if (a1) a1.src = "";
        if (b1) b1.style.background = "";
    } else {
        if (vidBgUrl) {
            setVideoBackground(vidBgUrl);
        } else if (vidBg) {
            setVideoBackground("bgs/" + vidBg + ".mp4");
        } else {
            setVideoBackground("bgs/bg.mp4");
        }

        if (aidBgUrl) {
            setAudioBackground(aidBgUrl);
        } else if (aidBg) {
            setAudioBackground("bgs/" + aidBg + ".mp3");
        } else {
            setAudioBackground("bgs/bg.mp3");
        }
    }
}

// 开始倒计时
function startTimer() {
    const h1 = document.getElementById('h1');
    const targetDate = '2024/6/24';
    setInterval(function () {
        updateTimer(h1, targetDate);
    }, 1);
}

// 更新倒计时
function updateTimer(obj, targetDate) {
    const now = new Date().getTime();
    const futureTime = new Date(targetDate).getTime();
    const msec = futureTime - now;
    const millisecond = msec % 1000;
    const timeInSeconds = msec / 1000;
    const days = Math.floor(timeInSeconds / 86400);
    const hours = Math.floor(timeInSeconds / 3600) % 24;
    const minutes = Math.floor(timeInSeconds % 3600 / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    let html = "";
    if (getURLParameter("title")) {
        html += "<br><div>" + getURLParameter("title") + "</div><br>";
    } else {
        html += "<br><div>距2024年中考还有：</div><br>";
    }

    if (!getURLParameter("no_d")) {
        html += (days < 10 ? "0" + days + "天" : days + "天");
    }

    if (!getURLParameter("no_h")) {
        html += (hours < 10 ? "0" + hours + "小时" : hours + "小时");
    }

    if (!getURLParameter("no_m")) {
        html += (minutes < 10 ? "0" + minutes + "分" : minutes + "分");
    }

    if (!getURLParameter("no_s")) {
        html += (seconds < 10 ? "0" + seconds + "秒" : seconds + "秒");
    }

    if (!getURLParameter("no_ms")) {
        html += (millisecond < 10 ? "00" + millisecond + "毫秒" : millisecond < 100 ? "0" + millisecond + "毫秒" : millisecond + "毫秒");
    }

    if (getURLParameter("text")) {
        html += "<br><span>" + getURLParameter("text") + "</span></br>";
    } else {
        html += "<br><span>中考加油! </span></br>";
    }

    if (futureTime <= now) {
        obj.innerHTML = "<div class='blink'>中考已经到来，你的努力不会被辜负，分晓将很快见证！</div>";
    } else if (days <= 100) {
        obj.innerHTML = "<div class='blink'>百日誓师！</div>";
    } else if (days <= 50) {
        obj.innerHTML = "<div class='blink'>冲刺中考！</div>";
    } else if (days <= 5) {
        obj.innerHTML = "<div class='blink'>中考必胜！</div>";
    } else if (days <= 1) {
        obj.innerHTML = "<div class='blink'>一切努力，明日揭晓！</div>";
    } else {
        obj.innerHTML = html;
    }
}

// 当页面加载完成时执行
window.onload = function () {
    applySettings();
    startTimer();
};
