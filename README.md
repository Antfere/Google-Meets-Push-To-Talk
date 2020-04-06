### **Installation Instructions:**

Step 1: Install Tampermonkey/Greasemonkey extension in browser (This allows you to install userscripts)

Step 2: Install my userscript. Visiting the following link should take you to a one click install assuming you have one of the above extensions: https://github.com/Antfere/Google-Meets-Push-To-Talk/raw/master/PTT.user.js

### **Usage Instructions:**

There is a green button at the top of the page to enable or disable push to talk. When you enable this, you will be automatically muted. Once you press the push to talk trigger key you will be unmuted. You will remain unmuted as long as you hold the key down. As soon as you let go, you will return to muted status. 
Disabling push to talk via the button at the top reverts you to standard mode. Your most recent selection is saved for next time in device storage.
To change the push to talk key edit this line (near the top of the script) and save:
var triggerKey = 69; // key e. You can change this to your desired key using codes from this chart: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

### **Disclaimer:**

Majority of this program is from this repository focusing on push to talk for google hangouts: https://gist.github.com/codismsDev/2ef44e8e5ab1277aefb6

This program is just a port of the above repository for Google Meets instead of hangouts. With French and English support
