// ==UserScript==
// @name           Google Meet Push To Talk
// @namespace      com.codisms.googleplus.addPTT
// @author         Anthony Atanasov
// @description    Adds push to talk functionality to Google Meets in any language
// @version        1.0
// @include        https://meet.google.com/*
//
// Most code obtained from Corey Feiock (codisms) https://gist.github.com/codismsDev/2ef44e8e5ab1277aefb6#file-googlehangoutspushtotalk-user-js
// Some code obtained from open source project Google+ Unmutable Hangouts by Mohamed Mansour
// ==/UserScript==

var triggerKey = 69; // key e. You can change this to your desired key using codes from this chart: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

// Do not run in iframes
if (window.top !== window.self) {
    return;
}

var settings = {
    set ptt_setting(val) {
        localStorage['ptt_setting'] = val;
    },
    get ptt_setting() {
        var key = localStorage['ptt_setting'];
        return (typeof key == 'undefined') ? true : key === 'true';
    }
};

var simulateClick = function(element) {
    var initEvent = function(elt, str) {
        var clickEvent = document.createEvent("MouseEvents");
        clickEvent.initEvent(str, true, true);
        elt.dispatchEvent(clickEvent)
    };
    initEvent(element, "mousedown");
    initEvent(element, "click");
    initEvent(element, "mouseup");
};

var clickListener = function(e) {
    load(true);
};

var load = function(toggle) {
    if (toggle) {
        settings.ptt_setting = !settings.ptt_setting;
    }

    muteButton.innerText = (settings.ptt_setting ? 'Disable' : 'Enable') + ' Push To Talk';

    if (settings.ptt_setting) {
        if ((document.querySelectorAll('div[aria-label="Désactiver le micro (Ctrl+d)"]').length != 0) && (document.querySelectorAll('div[aria-label="Activer le micro (Ctrl+d)"]').length != 0))
        {
            setTimeout(load, 1000);
        }
        else if ((document.querySelectorAll('div[aria-label="Turn off microphone (ctrl + d)"]').length != 0) && (document.querySelectorAll('div[aria-label="Turn on microphone (ctrl + d)"]').length != 0))
        {
            setTimeout(load, 1000);
        }
        muteMicrophone();
    }
    else {
        unmuteMicrophone();
    }
};

document.body.addEventListener('keydown', function (e) {
    if (e.keyCode == triggerKey && settings.ptt_setting) {
        unmuteMicrophone();
    }
});

document.body.addEventListener('keyup', function (e) {
    if (e.keyCode == triggerKey && settings.ptt_setting) {
        muteMicrophone();
    }
});

muteMicrophone = function()
{
    if ((document.querySelectorAll('div[aria-label="Désactiver le micro (Ctrl+d)"]').length != 0))
    {
        var mutes1 = document.querySelectorAll('div[aria-label="Désactiver le micro (Ctrl+d)"]');
        simulateClick(mutes1[0]);
    }
    else if (document.querySelectorAll('div[aria-label="Turn off microphone (ctrl + d)"]').length != 0)
    {
        var mutes = document.querySelectorAll('div[aria-label="Turn off microphone (ctrl + d)"]');
        simulateClick(mutes[0]);
    }

}

unmuteMicrophone = function()
{
    if (document.querySelectorAll('div[aria-label="Activer le micro (Ctrl+d)"]').length != 0)
    {
        var mutes1 = document.querySelectorAll('div[aria-label="Activer le micro (Ctrl+d)"]');
        simulateClick(mutes1[0]);
    }
    else if (document.querySelectorAll('div[aria-label="Turn on microphone (ctrl + d)"]').length != 0)
    {
        var mutes = document.querySelectorAll('div[aria-label="Turn on microphone (ctrl + d)"]');
        simulateClick(mutes[0]);
    }

}

// Render UI.
var container = document.createElement('div');
container.setAttribute('style', 'visibility: visible; position: fixed; z-index: 1000; top: 5px; left: 300px;');
var muteButton = document.createElement('button');
muteButton.addEventListener('click', clickListener, false);
muteButton.setAttribute('style', 'background-color: #368200;background-image: -webkit-linear-gradient(top,#3D9400,#368200);' +
                        'background-image: -moz-linear-gradient(top,#3D9400,#368200);background-image: -ms-linear-gradient(top,#3D9400,#368200);' +
                        'background-image: -o-linear-gradient(top,#3D9400,#368200);background-image: linear-gradient(top,#3D9400,#368200);' +
                        'border: 1px solid #2D6200;text-shadow: 0 1px rgba(0, 0, 0, 0.3);color: white;border-radius: 3px;padding: 5px;');
container.appendChild(muteButton);


document.body.appendChild(container);

// Start loading the listeners.
load();

