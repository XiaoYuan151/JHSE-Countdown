# 中考倒计时

中考倒计时是一个支持毫秒级倒计时的网页应用，可自定义背景音乐、背景图片和背景视频。可通过参数来控制显示内容和样式。

## 示例网站

[https://jhsec.xiaoyuan151.xyz](https://jhsec.xiaoyuan151.xyz)

参数示例网站（不显示毫秒）：[https://jhsec.xiaoyuan151.xyz/index.html?no_ms=t](https://jhsec.xiaoyuan151.xyz/index.html?no_ms=t)

## 支持的参数列表

| 参数            | 支持的数据 | 参数解释                                                                              |
|---------------|-------|-----------------------------------------------------------------------------------|
| aid_bg        | str   | 设置网页背景音乐（所有音乐必须在文件夹bgs下）                                                          |
| aid_bg_url    | str   | 自定义音频背景URL                                                                        |
| aid_bg_upload | str   | 通过已在[https://img.xiaoyuan151.xyz:8080](https://img.xiaoyuan151.xyz:8080)上传的音频设置背景 |
| bing_bg       | t/f   | 启用Bing每日壁纸                                                                        |
| clear_mode    | t/f   | 启用纯净模式（仅显示倒计时）                                                                    |
| hide_cadpa    | t/f   | 不显示CADPA（适龄提示）                                                                    |
| no_d          | t/f   | 不显示天                                                                              |
| no_h          | t/f   | 不显示时                                                                              |
| no_m          | t/f   | 不显示分                                                                              |
| no_ms         | t/f   | 不显示毫秒                                                                             |
| no_s          | t/f   | 不显示秒                                                                              |
| page_title    | str   | 设置网页标题                                                                            |
| pic_bg        | str   | 设置网页背景图片（所有图片必须在文件夹bgs下）                                                          |
| pic_bg_url    | str   | 自定义图片背景URL                                                                        |
| pic_bg_upload | str   | 通过已在[https://img.xiaoyuan151.xyz:8080](https://img.xiaoyuan151.xyz:8080)上传的图片设置背景 |
| text          | str   | 设置文本（如“中考加油!”）                                                                    |
| title         | str   | 设置标题文本（如“距中考还有：”）                                                                 |
| vid_bg        | str   | 设置网页背景视频（所有视频必须在文件夹bgs下）                                                          |
| vid_bg_url    | str   | 自定义视频背景URL                                                                        |
| vid_bg_upload | str   | 通过已在[https://img.xiaoyuan151.xyz:8080](https://img.xiaoyuan151.xyz:8080)上传的视频设置背景 |

## 由 ChatGPT 支持

这个 README 文件是由 ChatGPT 生成的。ChatGPT 是由 OpenAI 开发的一种先进的自然语言处理模型。

## 许可证

本项目使用 AGPL-3.0 许可证。详情请参阅 [LICENSE](LICENSE) 文件。
