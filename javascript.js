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
function applySettings(lang) {
    const settings = {
        "vid_bg": "bgs/bg.mp4",
        "aid_bg": "bgs/bg.mp3",
        "pic_bg": "bgs/bg.jpg"
    };

    const bingBg = getURLParameter("bing_bg");
    const hideCadpa = getURLParameter("hide_cadpa");
    const clearMode = getURLParameter("clear_mode");
    const page_title = getURLParameter("page_title");
    const picBgUpload = getURLParameter("pic_bg_upload");

    if (page_title) setTitle(page_title);

    if (bingBg === "t") {
        fetch("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1")
            .then(response => response.json())
            .then(data => {
                const bingImageUrl = "https://www.bing.com" + data.images[0].url;
                setBackground("b", bingImageUrl);
            });
    } else {
        Object.keys(settings).forEach(type => {
            const param_upload = type + "_upload";
            const param_url = type + "_url";
            const url = getURLParameter(param_upload) ? `http://img.xiaoyuan151.top:8080/uploads/${getURLParameter(param_upload)}` : getURLParameter(param_url) || settings[type];
            if (!(picBgUpload === "t" && (type === "vid_bg" || type === "aid_bg"))) {
                setBackground(type.charAt(0), url);
            }
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

// 设置语言文本
const translations = {
    en_US: {
        countdownTitle: "Days until the exam:",
        cheerMessages: ["Keep going!", "Hundred days sprint!", "Final sprint!", "Victory is within reach!", "All efforts will be rewarded tomorrow!"],
        days: "days",
        hours: "hours",
        minutes: "minutes",
        seconds: "seconds",
        milliseconds: "milliseconds",
        copyright: "© 2023 Xiaoyuan Studio. Licensed under AGPL-3.0. Source code available on GitHub. Please share your modifications."
    },
    zh_CN: {
        countdownTitle: "距考试还有：",
        cheerMessages: ["中考加油！", "百日誓师！", "冲刺中考！", "中考必胜！", "一切努力，明日揭晓！"],
        days: "天",
        hours: "小时",
        minutes: "分",
        seconds: "秒",
        milliseconds: "毫秒",
        copyright: "版权所有 2023 小源工作室，以 AGPL-3.0 协议开源。源代码在 GitHub 上可用。请分享您的修改。"
    }
};

// 获取语言文本
function getTranslation(key, lang) {
    return translations[lang][key] || translations["en_US"][key];
}

// 开始倒计时
function startTimer(lang) {
    const h1 = document.getElementById('h1');
    const endDate = getURLParameter("end_date") || (new Date().getFullYear() + '/6/24');
    setInterval(() => updateTimer(h1, endDate, lang), 1);
}

// 更新倒计时
function updateTimer(obj, endDate, lang) {
    const now = new Date().getTime();
    const msec = new Date(endDate).getTime() - now;
    const timeInSeconds = msec / 1000;
    const days = Math.floor(timeInSeconds / 86400);
    const hours = Math.floor(timeInSeconds / 3600) % 24;
    const minutes = Math.floor(timeInSeconds % 3600 / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const millisecond = msec % 1000;

    let html = "";
    let cheerMessage = "";

    if (days > 100) cheerMessage = getTranslation("cheerMessages", lang)[0];
    else if (days > 50) cheerMessage = getTranslation("cheerMessages", lang)[1];
    else if (days > 5) cheerMessage = getTranslation("cheerMessages", lang)[2];
    else if (days > 0) cheerMessage = getTranslation("cheerMessages", lang)[3];
    else cheerMessage = getTranslation("cheerMessages", lang)[4];

    html += getURLParameter("title") ? `<br><div>${getURLParameter("title")}</div><br>` : `<br><div>${getTranslation("countdownTitle", lang)}</div><br>`;
    if (!getURLParameter("no_d")) html += (days < 10 ? "0" + days + getTranslation("days", lang) : days + getTranslation("days", lang));
    if (!getURLParameter("no_h")) html += (hours < 10 ? "0" + hours + getTranslation("hours", lang) : hours + getTranslation("hours", lang));
    if (!getURLParameter("no_m")) html += (minutes < 10 ? "0" + minutes + getTranslation("minutes", lang) : minutes + getTranslation("minutes", lang));
    if (!getURLParameter("no_s")) html += (seconds < 10 ? "0" + seconds + getTranslation("seconds", lang) : seconds + getTranslation("seconds", lang));
    if (!getURLParameter("no_ms")) html += (millisecond < 10 ? "00" + millisecond + getTranslation("milliseconds", lang) : millisecond < 100 ? "0" + millisecond + getTranslation("milliseconds", lang) : millisecond + getTranslation("milliseconds", lang));
    html += getURLParameter("text") ? `<br><span>${getURLParameter("text")}</span></br>` : `<br><span>${cheerMessage}</span></br>`;

    if (new Date(endDate).getTime() <= now) obj.innerHTML = "<div class='blink'>The exam has arrived. Your efforts will soon be rewarded!</div>";
    else obj.innerHTML = html;
}

window.onload = function () {
    const lang = getURLParameter("lang") || (navigator.language || "en_US").substring(0, 5);
    applySettings(lang);
    startTimer(lang);

    // 更新版权声明
    document.getElementById('h2').innerHTML = getTranslation("copyright", lang);
};
