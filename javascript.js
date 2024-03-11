// 获取 URL 参数
function getURLParameter(name) {
    const value = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20'));
    return value === "undefined" ? null : value || null;
}

// 设置视频背景
function setVideoBackground(url) {
    const v1 = document.getElementById("v1");
    if (v1) {
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
    const picBgUpload = getURLParameter("pic_bg_upload");

    if (picBgUpload) {
        setBackgroundImage("http://img.xiaoyuan151.top:8080/uploads/" + picBgUpload);
    } else {
        const vidBgUrl = getURLParameter("vid_bg_url");
        const aidBgUrl = getURLParameter("aid_bg_url");
        const picBgUrl = getURLParameter("pic_bg_url");

        if (vidBgUrl) {
            setVideoBackground(vidBgUrl);
        } else {
            setVideoBackground("bgs/bg.mp4");
        }

        if (aidBgUrl) {
            setAudioBackground(aidBgUrl);
        } else {
            setAudioBackground("bgs/bg.mp3");
        }

        if (picBgUrl) {
            setBackgroundImage(picBgUrl);
        }
    }
}

// 开始倒计时
function startTimer() {
    const h1 = document.getElementById('h1');
    const targetDate = new Date().getFullYear() + '/6/24';
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

    let html = "<br><div>距" + targetDate.split('/')[0] + "年中考还有：</div><br>";

    if (days < 10) {
        html += "0" + days + "天";
    } else {
        html += days + "天";
    }

    if (hours < 10) {
        html += "0" + hours + "小时";
    } else {
        html += hours + "小时";
    }

    if (minutes < 10) {
        html += "0" + minutes + "分";
    } else {
        html += minutes + "分";
    }

    if (seconds < 10) {
        html += "0" + seconds + "秒";
    } else {
        html += seconds + "秒";
    }

    if (millisecond < 10) {
        html += "00" + millisecond + "毫秒";
    } else if (millisecond < 100) {
        html += "0" + millisecond + "毫秒";
    } else {
        html += millisecond + "毫秒";
    }

    html += "<br><span>中考加油! </span></br>";

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
