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
    if (b1) {
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
    const aidBgUrl = getURLParameter("aid_bg_url");
    const picBgUrl = getURLParameter("pic_bg_url");
    const bingBg = getURLParameter("bing_bg");
    const clearMode = getURLParameter("clear_mode");

    // 如果启用了 Bing 壁纸，则设置 Bing 壁纸
    if (bingBg === "t") {
        setBackgroundImage("https://api.oneneko.com/v1/bing_today");
    } else {
        // 如果未启用 Bing 壁纸，则根据设置分别设置视频、音频和图片背景
        if (vidBgUrl) {
            setVideoBackground(vidBgUrl);
        } else {
            const vidBg = getURLParameter("vid_bg");
            setVideoBackground(vidBg ? "bgs/" + vidBg + ".mp4" : "bgs/bg.mp4");
        }

        if (aidBgUrl) {
            setAudioBackground(aidBgUrl);
        } else {
            const aidBg = getURLParameter("aid_bg");
            setAudioBackground(aidBg ? "bgs/" + aidBg + ".mp3" : "bgs/bg.mp3");
        }

        if (picBgUrl) {
            setBackgroundImage(picBgUrl);
        } else {
            const picBg = getURLParameter("pic_bg");
            setBackgroundImage(picBg ? "bgs/" + picBg + ".jpg" : "bgs/bg.jpg"); // 设置默认的图片背景为 "bgs/bg.jpg"
        }
    }

    // 如果启用了清除模式，则清除所有背景
    if (clearMode === "t") {
        const v1 = document.getElementById("v1");
        const a1 = document.getElementById("a1");
        const b1 = document.getElementById("b1");
        if (v1) v1.src = "";
        if (a1) a1.src = "";
        if (b1) b1.style.background = "";
    }
}

// 开始倒计时
function startTimer() {
    const h1 = document.getElementById('h1');
    const targetDate = new Date().getFullYear() + '/6/24'; // 获取当前年份的6月24日作为中考时间
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
    let cheerMessage = ""; // 加油标语

    // 根据剩余时间确定加油标语
    if (days > 100) {
        cheerMessage = "中考加油！";
    } else if (days > 50) {
        cheerMessage = "百日誓师！";
    } else if (days > 5) {
        cheerMessage = "冲刺中考！";
    } else if (days > 0) {
        cheerMessage = "中考必胜！";
    } else {
        cheerMessage = "一切努力，明日揭晓！";
    }

    if (getURLParameter("title")) {
        html += "<br><div>" + getURLParameter("title") + "</div><br>";
    } else {
        html += "<br><div>距" + new Date(targetDate).getFullYear() + "年中考还有：</div><br>";
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
        html += "<br><span>" + cheerMessage + "</span></br>"; // 显示加油标语
    }

    if (futureTime <= now) {
        obj.innerHTML = "<div class='blink'>中考已经到来，你的努力不会被辜负，分晓将很快见证！</div>";
    } else {
        obj.innerHTML = html;
    }
}

// 当页面加载完成时执行
window.onload = function () {
    applySettings();
    startTimer();
};
