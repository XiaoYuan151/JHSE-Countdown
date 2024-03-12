// 获取 URL 参数
function getURLParameter(name) {
    const value = decodeURIComponent(new URLSearchParams(location.search).get(name) || '');
    return value === "undefined" ? null : value || null;
}

// 设置页面标题
function setTitle(title) {
    document.title = title;
}

// 设置视频、音频、图片背景
function setBackground(type, url) {
    const element = document.getElementById(type + "1");
    if (element) {
        if (type === "b") {
            element.style.background = `url(${url}) no-repeat`;
            element.style.backgroundSize = "100% 100%";
            element.style.backgroundAttachment = "fixed";
        } else {
            element.src = url;
            element.play();
        }
    }
}

// 应用设置
function applySettings() {
    const settings = {
        "vid_bg": "bgs/bg.mp4",
        "aid_bg": "bgs/bg.mp3",
        "pic_bg": "bgs/bg.jpg"
    };

    const bingBg = getURLParameter("bing_bg");
    const hideCadpa = getURLParameter("hide_cadpa");
    const clearMode = getURLParameter("clear_mode");
    const page_title = getURLParameter("page_title");

    if (page_title) setTitle(page_title);

    if (bingBg === "t") {
        setBackground("b", "https://api.oneneko.com/v1/bing_today");
    } else {
        Object.keys(settings).forEach(type => {
            const param_upload = type + "_upload";
            const param_url = type + "_url";
            const url = getURLParameter(param_upload) ? `http://img.xiaoyuan151.top:8080/uploads/${getURLParameter(param_upload)}` : getURLParameter(param_url) || settings[type];
            setBackground(type.charAt(0), url);
        });
    }

    if (!(hideCadpa === "t")) {
        const cadpa = document.getElementById("cadpa");
        if (cadpa) cadpa.innerHTML = "<div class=\"cadpa\"></div>";
    }

    if (clearMode === "t") {
        ["v1", "a1", "b1"].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.src = (id !== "b1") ? "" : element.style.background = "";
        });
    }
}

// 开始倒计时
function startTimer() {
    const h1 = document.getElementById('h1');
    const targetDate = new Date().getFullYear() + '/6/24';
    setInterval(() => updateTimer(h1, targetDate), 1);
}

// 更新倒计时
function updateTimer(obj, targetDate) {
    const now = new Date().getTime();
    const msec = new Date(targetDate).getTime() - now;
    const timeInSeconds = msec / 1000;
    const days = Math.floor(timeInSeconds / 86400);
    const hours = Math.floor(timeInSeconds / 3600) % 24;
    const minutes = Math.floor(timeInSeconds % 3600 / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const millisecond = msec % 1000;

    let html = "";
    let cheerMessage = "";

    if (days > 100) cheerMessage = "中考加油！";
    else if (days > 50) cheerMessage = "百日誓师！";
    else if (days > 5) cheerMessage = "冲刺中考！";
    else if (days > 0) cheerMessage = "中考必胜！";
    else cheerMessage = "一切努力，明日揭晓！";

    html += getURLParameter("title") ? `<br><div>${getURLParameter("title")}</div><br>` : `<br><div>距${new Date(targetDate).getFullYear()}年中考还有：</div><br>`;
    if (!getURLParameter("no_d")) html += (days < 10 ? "0" + days + "天" : days + "天");
    if (!getURLParameter("no_h")) html += (hours < 10 ? "0" + hours + "小时" : hours + "小时");
    if (!getURLParameter("no_m")) html += (minutes < 10 ? "0" + minutes + "分" : minutes + "分");
    if (!getURLParameter("no_s")) html += (seconds < 10 ? "0" + seconds + "秒" : seconds + "秒");
    if (!getURLParameter("no_ms")) html += (millisecond < 10 ? "00" + millisecond + "毫秒" : millisecond < 100 ? "0" + millisecond + "毫秒" : millisecond + "毫秒");
    html += getURLParameter("text") ? `<br><span>${getURLParameter("text")}</span></br>` : `<br><span>${cheerMessage}</span></br>`;

    if (new Date(targetDate).getTime() <= now) obj.innerHTML = "<div class='blink'>中考已经到来，你的努力不会被辜负，分晓将很快见证！</div>";
    else obj.innerHTML = html;
}

window.onload = function () {
    applySettings();
    startTimer();
};
