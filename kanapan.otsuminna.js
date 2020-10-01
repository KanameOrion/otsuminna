document.head.appendChild(cssElement(GM_getResourceURL("bootstrapCSS")));
document.head.appendChild(cssElement(GM_getResourceURL("jqueryFontPicker")));

function cssElement(url) {
    var link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    link.type = "text/css";
    return link;
}

let arrChatData = {};
let arrChatSampleData = {
    "Kaname Phantasma": {
        "msg": "Hewwwo good morning!!"
    },
    "Kananananana": {
        "msg": "Mewning all yahooooo!!"
    },
    "Kanapan": {
        "msg": "Good morrrrning!"
    },
};
let selectedFont;
let ytIdGlobal = '';
let appVer = "0.1";

(function () {
    'use strict';

    $('head').append(`<style>
        yt-live-chat-app
        {
            visibility: hidden;
        }

        .mainContainer
        {
            background: green;
        }

        .configContainer
        {
            float: right;
            padding: 10px;
            background: white;
            position: fixed;
            right: 0;
            z-index: 999;
            border-radius: 0px 0px 0px 10px;
            text-align: right;
        }

        .mainChat
        {
            font-size: 3rem;
        }

        .tblConfig
        {
            margin-bottom: 20px;
        }

        .tblContainer
        {
            display: none;
        }

        .tblConfig tr td
        {
            font-size: 1.5rem;
        }

        .btnToggleConfig
        {
            float: right;
        }

        .mainRollContainer
        {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/jpeg;base64,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b3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAFo4QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAE4QklNBAIAAAAAAAQAAAAAOEJJTQQwAAAAAAACAQE4QklNBC0AAAAAAAYAAQAAAAM4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADSQAAAAYAAAAAAAAAAAAAADIAAAAyAAAACgBVAG4AdABpAHQAbABlAGQALQAyAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAyAAAAMgAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAbnVsbAAAAAIAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAAMgAAAABSZ2h0bG9uZwAAADIAAAAGc2xpY2VzVmxMcwAAAAFPYmpjAAAAAQAAAAAABXNsaWNlAAAAEgAAAAdzbGljZUlEbG9uZwAAAAAAAAAHZ3JvdXBJRGxvbmcAAAAAAAAABm9yaWdpbmVu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MS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMTAtMDFUMTM6NTA6NTQrMDc6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMTAtMDFUMTM6NTA6NTQrMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTEwLTAxVDEzOjUwOjU0KzA3OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZmMTZkMzFlLTRmOWQtNGE0NS04MWI0LTAwODk3ZWZjMjYwYiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjM3ODhmNjkyLTEwZWMtZTQ0NS05MWI3LTMxMTliNTUwMzZlYSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjg0ZjY4OWJjLTU3MjItODU0ZS05YmFkLTVhYmNkYTFiMzEwMCIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NGY2ODliYy01NzIyLTg1NGUtOWJhZC01YWJjZGExYjMxMDAiIHN0RXZ0OndoZW49IjIwMjAtMTAtMDFUMTM6NTA6NTQrMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NmYxNmQzMWUtNGY5ZC00YTQ1LTgxYjQtMDA4OTdlZmMyNjBiIiBzdEV2dDp3aGVuPSIyMDIwLTEwLTAxVDEzOjUwOjU0KzA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7gAhQWRvYmUAZEAAAAABAwAQAwIDBgAAAAAAAAAAAAAAAP/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMFBAUJBgYJDQoJCg0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8IAEQgAMgAyAwERAAIRAQMRAf/EAI4AAAIDAQEAAAAAAAAAAAAAAAUGAAIEAwkBAAIDAQAAAAAAAAAAAAAAAAIEAAEDBRAAAgMAAwACAgMBAAAAAAAAAQIQAwQAERITBTEyMxQ0FREAAgEDAwMDBQAAAAAAAAAAAQIDEBEyAEFRYRIi8DEzgcHhggQSAAIDAQAAAAAAAAAAAAAAACABEBFhMf/aAAwDAQECEQMRAAAA8LnU1NNulXe6bHFCGmUkQ+f0KVd7pscUIaZcBICuwFw3vdNjihDTLgJKCTuYSvdNjihDTLgJKCTuYSkje6mQ0y4CSgk7mEpJqMHV5HgJKCTuYSkjCyseYXki0q0Fw3kmowdXkZJ//9oACAECAAEFALLPPCe4A75XX5knuAO+V1+YZgo+cwB3yuvzDMFDuWPAO+V1+YZgodyxiuvzDMFDuWMeGhmCh3LGKqpv/MJ+0f/aAAgBAwABBQCuv1wDqCeuWWepA6gnrllnqFUsfgEE9css9QqliiBRwnrllnqFUsUQKIss9QqliiBRHyLCqWKIFEW2zR+Is/WP/9oACAEBAAEFAN+9MiO72PxEex8GBMiQ7vY/ER7HwYEyJzRorzV/9q+ER7HwYEyJzRorzV6tVmqziI9j4MCZE5o0V5q9WqzVZGDAmROaNFeavVqs1WR/S1Ro0V5q9WqzVZH1v1vmfuv54xf6o//aAAgBAgIGPwDQ0ti2GxbDYthsWw5FsLZKf//aAAgBAwIGPwDAwsikGRSDIpBkUg7FIKROf//aAAgBAQEGPwDtWzTsPBOOp0zuxZ2N2Y0VEUs7GyqNdzWadh5vx0FWd2LOxuzGioilnY2VRruazTsPN+OgoZJDYDFdyeBr4lzv+vH5oqIpZ2NlUa7ms07DzfjoKGSQ2AxXcngaMkhsBgmwFFRFLOxsqjXc1mnYeb8dBQySGwGK7k8DRkkNgME2Ar3NZp2Hm/HQUMkhsBiu5PA0ZJDYDBNgK/A2Hf7betqGSQ2AxXcngaMkhsBgmwFV/o/oXy944zt1NYs8d8fp96wYZDP29cV//9k=');
        }

        .textRollContainer
        {
            text-align: center;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 100%;
            transform: translateX(-50%);
            width: 100%;
        }

        .textRollBoundary
        {
            position: relative;
            height: 100vh;
            width: 80%;
            /* margin: 0 auto; */
            border: 1px solid white;
            background: #00ff00;
        }

        .buttonToolbarContainer
        {
            margin-bottom: 10px;
        }

        .font-picker.fp-select
        {
            width: 100%;
        }

        #show-more
        {
            display: none;
        }

        .lastChatMsg img
        {
            height: 24px;
            width: auto;
        }
    </style>`);

    $(document).ready(function () {

        $("body").prepend(`
            <div class="mainRollContainer">
                <div class="configContainer">
                    <div class="buttonToolbarContainer">
                        <div class="btn-group-vertical">
                            <button type="button" class="btn btn-primary btn-xs btnStartScroll" data-type="real"><i class="fas fa-play"></i></button>
                            <button type="button" class="btn btn-default btn-xs btnToggleConfig"><i class="fas fa-cogs"></i></button>
                        </div>
                    </div>
                    <div class="dataCounter"><span class="number">0</span> <i class="fas fa-file-download" title="Number of viewer gathered"></i></div>
                </div>

                <div class="textRollBoundary">
                    <div class="textRollContainer"></div>
                </div>

            </div>
            <div class="mainContainer" style="display: none">
                <button class="btnCheck" type="button">Check</button>
                <div class="authorContainer">
                    <h2>Author List</h2>
                    <div class="authorJson" style="font-size: 2rem"></div>
                </div>
                <br>
                <ul class="mainChat"></ul>
            </div>
            <div class="small text-right" style="position: fixed; bottom: 0; right: 0; padding: 10px; color: white">Kaname Phantasma<br>v.`+appVer+`</div>
        `);

        $('body').append(`
        <div id="modalConfig" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Configuration</h4>
                </div>
                <div class="modal-body">
                    <form action="/action_page.php">
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label>Show last chat</label>
                                <select class="form-control chkShowLastChat">
                                    <option value="1">Yes</option>
                                    <option value="0" selected>No</option>
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label>Scroll duration (sec.)</label>
                                <input type="number" class="form-control cfg-durationScoll" value="20" min="0">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Roll title size</label>
                                <input type="number" class="form-control cfg-prefixrollsize" value="36" min="0">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Text name size</label>
                                <input type="number" class="form-control cfg-textnamesize" value="36" min="0">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Last msg size</label>
                                <input type="number" class="form-control cfg-lastmsgsize" value="36" min="0">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Text color</label>
                                <input type="text" class="form-control cfg-rollTextColor" value="#000000">
                            </div>
                            <div class="form-group col-md-3">
                                <label>Bg. color</label>
                                <input type="text" class="form-control cfg-bgRollColor" value="#00ff00">
                            </div>
                            <div class="form-group col-md-9">
                                <label>Roll title</label>
                                <input type="text" class="form-control cfg-prefixRoll" value="Thank you for watching :)">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-12 text-center">
                                <label>Font</label>
                                <input class="form-control" id="font2" type="text" value="Indie Flower">
                                <h2 id="sample1">Lorem ipsum dolor sit amet</h2>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12"><hr></div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <button type="button" class="btn btn-danger btnResetData">Reset Data</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default btnStartScroll" data-type="test">Test</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                </div>

            </div>
        </div>
        `);

        let mList = document.querySelector("#items.yt-live-chat-item-list-renderer"),
            options = {
                childList: true
            },
            observer = new MutationObserver(FungsiPantauChat);

        function FungsiPantauChat(mutations) {
            //console.log("Ada yang berubah nih");
            let lastChatObj = $("#items.yt-live-chat-item-list-renderer yt-live-chat-text-message-renderer:last-child").eq(0);
            let messageObj = lastChatObj.find("#content").eq(0);

            let messageBody = messageObj.find("#message").html();
            let author = messageObj.find("#author-name").text();

            if (author == null || messageBody == null)
                return;

            let ytIdChat = GetParameterByName("v");

            let childData = {
                "msg": messageBody
            };

            arrChatData[author] = childData;

            $(".dataCounter .number").text(Object.keys(arrChatData).length);

            //Add to storage
            localStorage.setItem('kanapan-mod-outrostreamer--' + ytIdChat, JSON.stringify(arrChatData));
        }

        function GetParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        function applyFont(element, fontSpec) {
            console.log('You selected font: ' + fontSpec);

            // Split font into family and weight/style
            const tmp = fontSpec.split(':'),
                family = tmp[0],
                variant = tmp[1] || '400',
                weight = parseInt(variant,10),
                italic = /i$/.test(variant);

            // Apply selected font to element
            const css = {
                fontFamily: "'" + family + "'",
                fontWeight: weight,
                fontStyle: italic ? 'italic' : 'normal'
            };

            $(element).css(css);
        }

        $(document).on("click", ".btnResetData", function(){
            bootbox.confirm("Delete data from this live chat?", function(result){ 
                if (result)
                {
                    localStorage.removeItem('kanapan-mod-outrostreamer--' + ytIdGlobal);
                    location.reload();
                }
            });
        });

        $(document).on("click", ".btnStartScroll", function () {

            let scrollDuration = $(".cfg-durationScoll").val() * 1000;
            let textColor = $(".cfg-rollTextColor").val();

            let arrRealData = arrChatData;
            if ($(this).data("type") == "test")
                arrRealData = arrChatSampleData;

            let htmlRollData = '';
            for (var key in arrRealData) {
                let authorText = '<b><h1 class="customFont" style="color: ' + textColor + '; font-size: '+$(".cfg-textnamesize").val()+'px">' + key + '</h1></b>';
                let lastMessageText = arrRealData[key]['msg'];

                let htmlLastMessage = "";
                if ($(".chkShowLastChat").val() == "1")
                    htmlLastMessage = '<h2 class="customFont lastChatMsg" style="color: ' + textColor + '; font-size: '+$(".cfg-lastmsgsize").val()+'px">' + lastMessageText + '</h2>';

                htmlRollData += authorText + htmlLastMessage + '<br>';
            }

            $(".textRollBoundary").css("background", $(".cfg-bgRollColor").val());
            $(".textRollContainer").html(htmlRollData);
            $(".textRollContainer").prepend('<h1 class="customFont" style="color: ' + textColor + '; font-size: '+$(".cfg-prefixrollsize").val()+'px">' + $(".cfg-prefixRoll").val() + '</h1><br>');

            $(".textRollContainer").css("top", "100%")
            $(".textRollContainer").stop().animate({ top: $(".textRollContainer").height() * -1 }, scrollDuration, 'linear').css('overflow', 'visible');

            if (selectedFont != null)
                applyFont('.customFont', selectedFont);
        });

        $(document).on("click", ".btnToggleConfig", function () {
            $("#modalConfig").modal("show");
        });

        $('#font2')
            .fontpicker()
            .on('change', function() {
                selectedFont = this.value;
                applyFont('#sample1', selectedFont);
            });

        $("head").prepend("<title>Simple Youtube Live Chat Viewer Outro For Streamer - v."+appVer+"</title>");

        ytIdGlobal = GetParameterByName("v");
        if (ytIdGlobal == null)
        {
            $("body").html("URL is not valid");
            return;
        }

        //Load data from storage
        let stoData = localStorage.getItem('kanapan-mod-outrostreamer--' + ytIdGlobal);
        if (stoData != null && stoData != '')
        {
            let arrStoData = JSON.parse(stoData);
            arrChatData = arrStoData;
            $(".dataCounter .number").text(Object.keys(arrChatData).length);
        }

        observer.observe(mList, options);
    });
})();