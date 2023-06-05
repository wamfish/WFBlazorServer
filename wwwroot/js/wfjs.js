"use strict";
// I combined all of my .js files into wfjs.js. I am trying to reduce the need for the
// exteranl apps that one would normally use to minify and combine .js files. 

//#region exports 
// These are the functions that are exported to Blazor. 
function boundingClientRect(element)
{
    return element.getBoundingClientRect();
}
function ignoreDblClick(element)
{
    element.addEventListener('dblclick', function handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
    });
}
function exAddClass(element, classVal)
{
    element.classList.add(classVal);
}
function exRemoveClass(element, classVal)
{
    element.classList.remove(classVal);
}
function doClick(element)
{
    element.click();
}
function setFocus(element)
{
    element.focus();
}
function enableById(id)
{
    var element = document.getElementById(id);
    element.disabled = false;
}
function enableElement(element)
{
    element.disabled = false;
}
function disableById(id)
{
    var element = document.getElementById(id);
    element.disabled = true;
}
function disableElement(element)
{
    element.disabled = true;
}
function setFocusOnFirstInput(id)
{
    var form = document.getElementById(id);
    var inputs = form.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].focus();
        break;
    }
}
function youtubeVideo(div, videoLink)
{
    if (mainDiv == null)
        createMainDiv(div);
    //defaultSrc: "tgbNymZ7vqY"
    if (videoForm == null)
    {
        videoForm = createVideoForm("Video", videoLink, 800, 1, 480, 270 + 36);
    }
    else
    {
        videoForm.loadVideo(videoLink);
    }
        
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}


// #endregion 

//#region game.js
var nextGameFormId = 1;
function createGameForm(title, id, src, left, top, width, height) {
    var form = {
        win: createWindow(title, id, left, top, width, height, "wfVideoForm"),
        iframe: null,
        defaultSite: "game/index.html",
        playVideo: null,
        player: null,
        id: nextGameFormId++

    };
    form.iframe = document.createElement("iframe");
    form.iframe.id = "gameForm" + form.id;
    form.iframe.className = "wfVideoPlayer";
    form.win.onSizeChange(function () {
        var cw = form.win.contentPanel.clientWidth;
        var ch = form.win.contentPanel.clientHeight;
        // let calch = cw * .5625;
        // if (calch > ch)
        // {
        //     cw = ch * 1.7777777;
        // }
        // else
        // {
        //     ch = calch;
        // }
        form.iframe.width = cw;
        form.iframe.height = ch;
    });
    form.iframe.src = form.defaultSite;
    form.iframe.setAttribute("allowfullscreen", "true");
    form.iframe.setAttribute("scrolling", "no");
    // form.iframe.setAttribute("sandbox","allow-scripts allow-pointer-lock");
    form.win.contentPanel.appendChild(form.iframe);
    return form;
}
//#endregion

//#region misc
function isMobileOrTablet() {
    var i,
        a = !1;return i = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(i) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(i.substr(0, 4))) && (a = !0), a;
  }window.isMobileOrTablet = window.isMobileOrTablet || isMobileOrTablet;
  
//#endregion

//#region MapForm
// I think this was for TomTom maps, but I'm not sure.  I'm not using it, but I'm leaving it in case I need it later.
// If we use it would need to add other TomTom stuff to the index.html file.
var mapFormId = 1;
function createMapForm(title, id, left, top, width, height) {
    var form = {
        win: createWindow(title, id, left, top, width, height, "wfMapForm"),
        map: null,
        id: 0,
        latitude: 0,
        longitude: 0,
        zoom: 13,
        isShowing: false,
        SetSource: function SetSource(lat, lon, zoom) {
            form.latitude = lat;
            form.longitude = lon;
            form.zoom = zoom;
            if (!form.isShowing) {
                if (TomTomKey == "") ws.requestTomTomKey(form.ShowMap);else form.ShowMap();
            } else {
                var ll = new tt.LngLat(forrm.longitude, form["this"].latitude);
                form.map.setCenter(ll);
                form.map.setZoom(form.zoom);
            }
        },
        FindMe: function FindMe() {
            function success(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                form.SetSource(latitude, longitude, 16);
                console.log("Map Location Set");
            }
            function error() {
                console.log("unable to find location");
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            }
        },
        ShowMap: function ShowMap() {
            form.map = tt.map({
                key: TomTomKey,
                container: form.win.contentPanel.id,
                zoom: form.zoom,
                center: [form.longitude, form.latitude],
                dragPan: !isMobileOrTablet()
            });
            var map = form.map;
            var scale = new tt.ScaleControl({
                maxWidth: 400,
                unit: 'imperial'
            });
            form.isShowing = true;
            map.addControl(scale);
            //scale.setUnit('imperial');
            //var ll = new tt.LngLat(-120.097895, 36.9972352);
            //let bounds = ll.toBounds(10);
            //map.fitBounds(bounds, {
            //    padding: { top: 10, bottom: 25, left: 15, right: 5 },
            //    maxZoom: 16
            //});
            map.dragPan.disable();
            map.doubleClickZoom.disable();
            map.boxZoom.disable();
            map.dragRotate.disable();
            map.keyboard.disable();
            map.scrollZoom.disable();
            //log(map);
            //map.addControl(new tt.FullscreenControl());
            //map.addControl(new tt.NavigationControl());
            //map.on('load', function () {
            //    map.showTrafficFlow();
            //});
        }
    };
    form.id = mapFormId++;
    form.win.contentPanel.id = "map" + form.id;
    //form.map.container = form.win.contentPanel.id;
    form.FindMe();
    return form;
}
//#endregion

//#region Util.js
var windowClass = 'wfWindow';
var titleBarClass = 'wfTitleBar';
var titleBarTitleClass = "wfTitleBarTitle";
var titleBarIconClass = "wfTitleBarIcon";
var titleBarBtnClass = "wfTitleBarBtn";
var windowContentClass = 'wfWindowContent';
var vertPanelClass = 'wfVertPanel';
var horzPanelClass = 'wfHorzPanel';
var labelClass = 'wfLabel';
var buttonClass = "wfButton";
var defaultButtonClass = "wfDefaultButton";
var cancelButtonClass = "wfCancelButton";
var hiddenClass = "wfHidden";
var imageClass = "wfImage";
var previewImageBGC = "#c5d46b";
function findParentByClass(el, cssClass) {
    while (el = el.parentElement) {
        if (el.className.includes(cssClass)) return el;
    }
    return el;
}
function containsClass(el, cssClass) {
    if (el.className.includes(cssClass)) return true;
    return false;
}
function log(msg) {
    console.log(msg);
}
function createDiv(parent, cssclass) {
    var div = document.createElement("div");
    if (cssclass) div.className = cssclass;
    if (parent) parent.appendChild(div);
    return div;
}
function createIcon(parent, cssclass)
{
    var icon = document.createElement("i");
    icon.className = cssclass;
    if (parent) parent.appendChild(icon);
    return icon;
}
function createSpan(parent, text, cssclass) {
    var ele = document.createElement("span");
    ele.innerText = text;
    ele.className = cssclass;
    if (parent) parent.appendChild(ele);
    return ele;
}
function createImage(parent, src, cssClass, width, height) {
    var img = document.createElement('img');
    addClass(img, cssClass);
    addClass(img, imageClass);
    img.src = src;
    img.style.width = width + "px";
    img.style.height = height + "px";
    img.draggable = false;
    if (parent) parent.appendChild(img);
    return img;
}

function addClass(ele, cssClass) {
    if (cssClass) {
        ele.classList.add(cssClass);
    }
    return ele;
}
function removeClass(ele, cssClass) {
    ele.classList.remove(cssClass);
}
function hideElement(ele) {
    ele.classList.add(hiddenClass);
}
function showElement(ele) {
    ele.classList.remove(hiddenClass);
}
function ignoreSelect(el) {
    el.onselectstart = function () {
        return false;
    };
}
//#endregion

//#region Youtube.js
function onYouTubeIframeAPIReady() {
    isAPIReady = true;
    while (videoForms.length > 0) {
        var form = videoForms.pop();
        form.initPlayer();
    }
    videoForms = null;
}
var videoForms = [];
var isAPILoaded = false;
var isAPIReady = false;
var nextVideoFormId = 1;

function createVideoForm(title, videoLink, left, top, width, height) {
    var myid = nextVideoFormId++;
    var form = {
        id: myid,
        win: createWindow(title, "videoForm" + myid, left, top, width, height, "wfVideoForm"),
        videoLink: videoLink,
        defaultSite: "https://www.youtube.com/embed/",
        player: null,
        onPlayerReady: function onPlayerReady(e) {
            e.target.playVideo();
        },
        onPlayerStateChange: playerStateChange,
        onPlayerError: function onPlayerError(e) {
            console.log(e);
        },
        initPlayer: function initPlayer()
        {
            doInitPlayer(this);
        },
        stopVideo: function stopVideo() {
            this.player.stopVideo();
        },
        loadVideo: function loadVideo(videoLink)
        {
            this.videoLink = videoLink; 
            var url = this.defaultSite + this.videoLink
            console.log(url);
            this.win.close();
            this.player.cueVideoByUrl(url, 0);
            this.win.open();
        },
        playVideo: function playVideo() {
            player.playVideo();
        }
    };
    form.win.onClose = function ()
    {
        form.stopVideo();
    }
    form.win.contentPanel.id = "ytplayer" + form.id;
    if (!isAPILoaded)
    {
        isAPILoaded = true;
        var tag = document.createElement('script');
        tag.id = "youtubeiframeapi"
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    if (isAPIReady)
    {
        form.initPlayer();
    }
    else
    {
        videoForms.push(form);
    }
    return form;
    function playerStateChange(e) {
        var playerStatus = e.data;
        if (playerStatus == -1) {
            console.log("video unstarted");
        } else if (playerStatus == 0) {
            console.log("video ended");
        } else if (playerStatus == 1) {
            console.log("video playing");
        } else if (playerStatus == 2) {
            console.log("video paused");
        } else if (playerStatus == 3) {
            console.log("video buffering");
        } else if (playerStatus == 5) {
            console.log("video qued");
        }
    }
    function doInitPlayer(form)
    {
        form.player = new YT.Player("ytplayer" + form.id, {
            height: form.win.height,
            width: form.win.width,
            videoId: form.videoLink,
            playerVars: {
                'autoplay': 1, 'controls': 0, 'enablejsapi': 1, 'disablekb': 0,
                'fs': 1, "origin": window.location.host
            },
            events: {
                'onReady': form.onPlayerReady,
                'onStateChange': form.onPlayerStateChange,
                'onError': form.onPlayerError
            }
        });
        console.log(form.player);
    }
}

//#endregion

//#region WebSocket.js
var MSGTYPE = {
    Message: 0,
    TomTomKey: 1
};
var TomTomKey = "";
var TomTomCallback = null;
function CreateWebSocket(uri) {

    var ws = {
        uri: uri,
        isOpen: false,
        socket: new WebSocket(uri),
        close: null,
        sendMsg: null,
        escape: null,
        requestHtml: null,
        requestSript: null
    };
    ws.socket.binaryType = "arraybuffer";
    ws.socket.onopen = function (e) {
        ws.isOpen = true;
        console.log("opened connection to " + ws.uri);
    };
    ws.socket.onclose = function (e) {
        ws.isOpen = false;
        console.log("closed connection from " + ws.uri);
    };
    ws.socket.onmessage = function (e) {
        var obj = JSON.parse(e.data);
        switch (obj.Message.Type) {
            case MSGTYPE.Message:
                processMessage(obj.Message.Content);
                break;
            case MSGTYPE.TomTomKey:
                TomTomKey = obj.Message.Content;
                if (TomTomCallback != null) TomTomCallback();
                TomTomCallback = null;
            default:
                console.log("Invalid Message");
                return;
        }
    };
    function processMessage(content) {
        console.log("Recieved Message: " + content);
    }
    ws.socket.onerror = function (e) {
        console.log("Socket Error");
    };
    ws.close = function () {
        if (ws.isOpen) ws.socket.close();
    };
    ws.sendMsg = function (msg) {
        if (!ws.isOpen) return false;
        var Message = { Type: MSGTYPE.Message.toString(), Content: msg };
        var myJSON = JSON.stringify({ Message: Message });
        console.log(Message);
        socket.send(myJSON);
        return true;
    };
    ws.escape = function (str) {
        return str.toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
    ws.requestTomTomKey = function (callback) {
        log("rtt");
        TomTomCallback = callback;
        if (!ws.isOpen) return false;
        var Message = { Type: MSGTYPE.TomTomKey.toString(), Content: "" };
        var myJSON = JSON.stringify({ Message: Message });
        console.log(Message);
        ws.socket.send(myJSON);
    };
    return ws;
}
var ws;

function OpenWebSocket() {
    ws = CreateWebSocket("wss://" + window.location.host + "/ws");
    ws.sendMsg("Hello from client!");
}
//#endregion

//#region Window.js
var mainDiv;
var firstScriptTag;
var root;
var modal;
var videoForm;

function createMainDiv(div) {
    mainDiv = createDiv(div, null);
    mainDiv.id = "wfWindows";
    firstScriptTag = document.body.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(mainDiv, firstScriptTag);
    modal = createDiv(mainDiv, "wfModal");
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("selectstart", function (e) {
        return false;
    });
    document.addEventListener("dragstart", function (e) {
        return false;
    });
    root = document.documentElement;
}

//root.style.setProperty('--pageBGC', "#ff6a00");
//root.style.setProperty('--pageCLR', "#000000");

var dragWindow;
var dragOffsetX;
var dragOffsetY;
function mouseMove(e) {
    if (dragWindow) {
        document.getSelection().empty(); //prevents  random text selections
        var left = e.clientX - dragOffsetX;
        var top = e.clientY - dragOffsetY;
        if (left < 0) left = 0;
        if (top < 0) top = 0;
        dragWindow.style.left = left + "px";
        dragWindow.style.top = top + "px";
    }
}
function mouseUp(e) {
    if (dragWindow) {
        dragWindow = null;
        modal.style.display = "none";
    }
}
function mouseDown(e) {
    if (containsClass(e.target, titleBarBtnClass)) return;
    if (!containsClass(e.target, titleBarClass)) return;
    console.log(e.target);
    var el = findParentByClass(e.target, titleBarClass);
    if (!el) return;
    var win = findParentByClass(el, windowClass);
    if (!win) return;
    dragWindow = win;
    modal.style.display = "block"; //cover content area with transparent div to block random inputs
    dragOffsetX = e.clientX - dragWindow.offsetLeft;
    dragOffsetY = e.clientY - dragWindow.offsetTop;
}
function createVertPanel(parent, cssClass) {
    return addClass(createDiv(parent, cssClass), vertPanelClass);
}
function createHorzPanel(parent, cssClass) {
    return addClass(createDiv(parent, cssClass), horzPanelClass);
}
function createLabel(parent, text, cssClass) {
    return addClass(createSpan(parent, text, cssClass), labelClass);
}
function createFileInput(parent, onchange, accept) {
    var ele = document.createElement('input');
    ele.type = "file";
    ele.style.display = "none";
    ele.id = "fileInput";
    ele.accept = accept;
    ele.addEventListener("change", onchange);
    parent.appendChild(ele);
    return ele;
}
function createFileInputButton(parent, btnText, fileInput) {
    var btn = createButton(parent, btnText, function () {
        fileInput.click();
    });
    parent.appendChild(btn);
    return btn;
}

function createWindow(title, id, left, top, width, height) {
    var cssClass = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];

    var sizeChangeEvent = new Event("sizechange");
    var win = {
        div: addClass(createDiv(mainDiv, cssClass), windowClass),
        restore: function restore()
        {
            if (!win.isMaximized) return;
            log(win);
            win.div.style.left = win.saveLeft;
            win.div.style.top = win.saveTop;
            win.div.style.height = win.saveHeight;
            win.div.style.width = win.saveWidth;
            win.isMaximized = false;
            win.div.dispatchEvent(sizeChangeEvent);
            log("minimize");
        },
        maximize: function maximize() {
            if (win.isMaximized) return;
            win.saveLeft = win.div.style.left;
            win.saveTop = win.div.style.top;
            win.saveHeight = win.div.style.height;
            win.saveWidth = win.div.style.width;
            win.div.style.left = "0px";
            win.div.style.top = "0px";
            win.div.style.width = document.documentElement.clientWidth + "px";
            win.div.style.height = document.documentElement.clientHeight + "px";
            win.div.dispatchEvent(sizeChangeEvent);
            win.isMaximized = true;
        },
        close: function close() {
            this.div.style.display = "none";
        },
        open: function open() {
            console.log("open");
            this.div.style.display = "";
        },
        bringToFront: function bringToFront() {
            var windows = mainDiv.getElementsByClassName(windowClass);
            var max = windows.length;
            var oi = this.div.style.zIndex;
            this.div.style.zIndex = max + 1;
            for (var i = 0; i < max; i++) {
                var w = windows[i];
                var ni = w.style.zIndex;
                if (ni > oi) {
                    w.style.zIndex = ni - 1;
                }
            }
        },
        contentPanel: null,
        clientWidth: function clientWidth() {
            return win.div.clientWidth;
        },
        clientHeight: function clientHeight() {
            return win.div.clientHeight;
        },
        title: null,
        setTitle: function setTitle(title) {
            win.title.innerText = title;
        },
        onSizeChange: function onSizeChange(e) {
            win.div.addEventListener("sizechange", e);e();
        },
        isMaximized: false,
        saveLeft: "",
        saveTop: "",
        saveWidth: "",
        saveHeight: "",
        onClose: function onClose() { }
    };
    win.div.id = id;
    win.div.style.left = left + "px";
    win.div.style.top = top + "px";
    win.div.style.width = width + "px";
    win.div.style.height = height + "px";
    window.addEventListener('resize', function () {
        if (win.isMaximized) win.maximize();
        win.div.dispatchEvent(sizeChangeEvent);
    });

    win.div.onmouseover = function () {
        win.bringToFront();
    };
    var titleBar = createHorzPanel(win.div, titleBarClass);
    createImage(titleBar, "/favicon.png", titleBarIconClass, 36, 36);
    win.title = createLabel(titleBar, title, titleBarTitleClass);
       
    var maxBtn = createSpan(titleBar, "", titleBarBtnClass);
    maxBtn.innerHTML = '<img class="wfSvgIcon" src="./_content/WFBlazorLib/icons/max.svg" alt="maxBtn" style="width: 24px; height: 24px;"/>'; 
    maxBtn.onclick = doMaxBtn;
    function doRestoreBtn()
    {
        maxBtn.onclick = doMaxBtn;
        maxBtn.innerHTML = '<img class="wfSvgIcon" src="./_content/WFBlazorLib/icons/max.svg" alt="restoreBtn" style="width: 24px; height: 24px;"/>'; 
        win.restore();
    }
    function doMaxBtn()
    {
        maxBtn.onclick = doRestoreBtn;
        maxBtn.innerHTML = '<img class="wfSvgIcon" src="./_content/WFBlazorLib/icons/restore.svg" alt="restoreBtn" style="width: 24px; height: 24px;"/>';
        win.maximize();
    }
    ignoreSelect(maxBtn);

    var closeBtn = createSpan(titleBar, "", titleBarBtnClass);
    closeBtn.innerHTML = '<img class="wfSvgIcon" src="./_content/WFBlazorLib/icons/close.svg" alt="maxBtn" style="width: 24px; height: 24px;"/>'; 
    closeBtn.onclick = function ()
    {
        win.onClose();
        win.close();
    };
    ignoreSelect(closeBtn);

    win.contentPanel = createVertPanel(win.div, windowContentClass);
    return win;
}
function createButton(parent, text, action) {
    var cssClass = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    var btn = addClass(createDiv(null, cssClass), buttonClass);
    btn.onselectstart = function () {
        return false;
    };
    btn.innerText = text;
    btn.onclick = action;
    if (parent) parent.appendChild(btn);
    return btn;
}
function createDefaultButton(parent, text, action, cssClass) {
    var btn = createButton(parent, text, action, cssClass + " " + defaultButtonClass);
    return btn;
}
function createCancelButton(parent, text, action, cssClass) {
    var btn = createButton(parent, text, action, cssClass + " " + cancelButtonClass);
    return btn;
}
//#endregion
