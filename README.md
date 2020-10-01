# OtsuMinna

A simple mini-apps that can record Youtube live stream viewers via live chat and show it like staff-roll end screen animation (Yes, I think it's cool for streamers/vtubers to mention the names of visitors one by one when the live stream is about to end)

## How It Works

Just using `MutationObserver()` from Javascript and some webscrap.

## Requirements

* Google Chrome... yes, this is my favourite browser
* Tampermonkey
* Internet connection of course
* Some coffee...

## Dependencies

I use some libraries to make OtsuMinna running smoothly. But I have put all of them here, in this repository. Library that I use:

* Jquery
* Bootstrap 3
* Bootbox
* Jquery Font Selector
* Font Awesome

## How to use?

Please read this instruction carefully. Because... I can't type English well :<

### Install Google Chrome

Ah come on, you can do it, right?!

### Install Tampermonkey Addon

Type "Tampermonkey" in Google, and select a link from Google Chrome Webstore. 

Too lazy? Here, [click this link](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en). If link broken, use Google Search orz.

Then click **Add to Chrome** and **Add Extension** if Chrome ask to you.

![Add Tampermonkey to Chrome](https://i.postimg.cc/FzZQwvyn/Screenshot-35.jpg)

### Install OtsuMinna script

[Click here](https://raw.githubusercontent.com/kanamephantasma/otsuminna/master/kanapan.otsuminna.user.js), Tampermonkey will detect automatically and give you a prompt. Click **Install** to begin install.

### Install OtsuMinna script (manually)

If you have problem when install script (For example, Tampermonkey won't detect), click the puzzle piece icon next to your chrome profile logo, click **Tampermonkey**.

![Access Tampermonkey](https://i.postimg.cc/wM0jLLGv/Screenshot-1.jpg)

Tampermonkey menu will appear, then click **Create a new script**

![Access Tampermonkey, again](https://i.postimg.cc/sD4NPKmK/Screenshot-3.jpg)

Then, paste this magic code to editor.

```
// ==UserScript==
// @name         OtsuMinna - Youtube Author Live Chat Staff-Roll Like
// @namespace    https://github.com/kanamephantasma/otsuminna
// @version      0.1
// @description  A simple helper that show live chat viewer as staff-roll-film like for streamer
// @author       Kaname Phantasma

// @match        https://www.youtube.com/live_chat*&mod=otsuminna

// @require      https://raw.githubusercontent.com/kanamephantasma/otsuminna/master/assets/jquery/jquery-3.1.0.js
// @require      https://raw.githubusercontent.com/kanamephantasma/otsuminna/master/assets/bootstrap/bootstrap.min.js
// @require      https://raw.githubusercontent.com/kanamephantasma/otsuminna/master/assets/fontawesomekit/246e1cdf7f.js
// @require      https://raw.githubusercontent.com/kanamephantasma/otsuminna/master/assets/bootbox/bootbox.min.js
// @require      https://raw.githubusercontent.com/kanamephantasma/otsuminna/master/assets/fontpicker/jquery.fontpicker.min.js
// @require      https://raw.githubusercontent.com/kanamephantasma/otsuminna/master/kanapan.otsuminna.js

// @resource     bootstrapCSS https://raw.githubusercontent.com/kanamephantasma/otsuminna/master/assets/bootstrap/bootstrap.min.css
// @resource     jqueryFontPicker https://raw.githubusercontent.com/kanamephantasma/otsuminna/master/assets/fontpicker/jquery.fontpicker.min.css

// @updateURL    https://raw.githubusercontent.com/kanamephantasma/otsuminna/master/kanapan.otsuminna.user.js

// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getResourceURL

// ==/UserScript==
```

![Insert magic code](https://i.postimg.cc/QtgQLYHy/Screenshot-4.jpg)

Then, press **CTRL + S** to save the code. Viola, OtsuMinna is ready to action!

### Then, how I can read my visitor?

You have to open Youtube from Chrome which has Tampermonkey and OtsuMinna installed.

Open Youtube, then select your live stream video. See live chat in the right pane? Click 3 dots in upper top live chat, click **Pop-out Chat** to get their URL.

![Get live chat URL](https://i.postimg.cc/1tNWg1J7/Screenshot-5.jpg)

Windows pop-up live chat will appear, you can select the URL and copy by pressing **CTRL + C** or right click, then click **Copy**

![Get live chat URL, again](https://i.postimg.cc/qRSvLycM/Screenshot-6.jpg)

Close that windows, we didn't need again. Create new tab by pressing **CTRL + T** and paste the URL. DON'T PRESS ENTER. You must add `&mod=otsuminna` in the end of URL to activate OtsuMinna. Remember, you... must... add that!! It's doesn't make your computer explode. Then press Enter. You'll see that live chat is changed to OtsuMinna interface.

![OtsuMinna interface](https://i.postimg.cc/y8krqR0z/Screenshot-7.jpg)

From here, OtsuMinna will record all visitor that chat in live chat, even if you refresh this page, the data will not erased.

### Where is my staff-roll like?

See top right of OtsuMinna interface, there is 2 buttons and number indicator. You can play animation by pressing play icon button. To configure, click cog icon button.

### Can I show it to livestream video?

Yes yes yes you can. If you use OBS Studio, add **Window Capture** in sources panel, then select browser that OtsuMinna is running. You can crop by press **Alt* and drag the sources. Use **Chrome key** filter if you wan't to view text only.

## Configurations

To access configuration, click cog icon button in top right OtsuMinna interface.

#### Show last chat
Show last chat of visitor.

#### Scroll duration (sec.)
Define staff-roll duration in sec.

#### Roll title size
Font size for roll title in pixel

#### Text name size
Font size for viewer name in pixel

#### Last msg size
Font size for viewer last chat in pixel

#### Text color
Font color for viewer name and last chat in HEX code

#### Bg. color
Background color in HEX code

#### Roll title
Define roll title, will appear before viewer names

#### Font
You can select many font you like. These fonts is from Google Fonts.

#### Reset Data
OtsuMinna will save your data every new chat appear. It's save in browser localstorage. Click this button to delete OtsuMinna data.

## Limitation

OtsuMinna just grab common chat. It doesn't record data from special chat like super chat.

## Contribute

Feel free to commit this repo, i'll merge if you found any bug or extend feature.

## Donate

This project is free. But... but... you can donate to me if you like :>

For now, I accept donation from [Trakteer](https://trakteer.id/kaname-phantasma).

## "Your english is very bad"

Yes yes, I know, I know, I'm sorry about that ;_;

## "Are you a virtual youtuber?"

[Please subscribe :)](https://www.youtube.com/channel/UCf-9KLTfxBR_ZZ4ICiyVBIQ)