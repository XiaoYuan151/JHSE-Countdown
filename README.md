# High School Entrance Examination Countdown

[EN](README.md) | [CN](README_CN.md)

High School Entrance Examination Countdown is a web application that supports millisecond-level countdown and can customize background music, background pictures, and background videos. Display content and style can be controlled through parameters.

## Sample website

[https://jhsec.xiaoyuan151.top](https://jhsec.xiaoyuan151.top)

Parameter example website (does not display milliseconds): [https://jhsec.xiaoyuan151.top/index.html?no_ms=t](https://jhsec.xiaoyuan151.top/index.html?no_ms=t)

## Supported parameter list

| Parameters   | Supported data | Parameter explanation        |
|--------------|----------------|------------------------------|
| aid_bg       | str            | Set webpage background music (all music must be in the folder bgs) |
| aid_bg_url   | str            | Custom audio background URL  |
| aid_bg_upload| str            | Set background from uploaded audio |
| bing_bg      | t/f            | Enable Bing daily wallpaper |
| clear_mode   | t/f            | Enable clean mode (only show countdown) |
| hide_cadpa   | t/f            | Do not show CADPA (age-appropriate reminder) |
| no_d         | t/f            | Do not display day           |
| no_h         | t/f            | Do not display hour          |
| no_m         | t/f            | Do not display minutes       |
| no_ms        | t/f            | Do not display milliseconds |
| no_s         | t/f            | Do not display seconds       |
| page_title   | str            | Set webpage title            |
| pic_bg       | str            | Set webpage background image (all images must be in the folder bgs) |
| pic_bg_url   | str            | Custom picture background URL|
| pic_bg_upload| str            | Set background from uploaded image |
| text         | str            | Set text (such as "Come on for the high school entrance exam!") |
| title        | str            | Set the title text (such as "There are still more days before the high school entrance examination:") |
| vid_bg       | str            | Set webpage background video (all videos must be in the folder bgs) |
| vid_bg_url   | str            | Custom video background URL  |
| vid_bg_upload| str            | Set background from uploaded video |

## Upload background file

You can upload customized background music, pictures, and video files through [http://img.xiaoyuan151.top:8080](http://img.xiaoyuan151.top:8080).

## Powered by ChatGPT

This README file was generated by ChatGPT. ChatGPT is an advanced natural language processing model developed by OpenAI.

## License

This project uses the AGPL-3.0 license. See the [LICENSE](LICENSE) file for details.