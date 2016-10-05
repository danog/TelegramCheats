function cheat(url, score) {
    if (url === '') {
        Materialize.toast('No url was provided!', 4000);
        return false;
    }
    if (!$.isNumeric(score)) {
        Materialize.toast('No score was provided!', 4000);
        return false;
    }
    if (url.match(/tbot\.xyz/)) {
        post("https://tbot.xyz/api/setScore", "data=" + url.replace(/^.*#/g, '').replace(/\?.*$/g, '') + "&score=" + score, function(data) { writeok(); }, function(data) { writeres('Error!'); }, true);
    } else if (url.match(/www\.gameeapp\.com/)) {
        post("https://bots.gameeapp.com/set-web-score-qkfnsog26w7173c9pk7whg0iau7zwhdkfd7ft3tn", '{ "score": ' + score + ', "url": "' + url.replace(/#.*$/g, '').replace(/.*\//g, '') + '", "play_time": 100}',  function(data) { writeok(); }, function(data) { writeres('Error!'); });
    } else {
        Materialize.toast("I cannot use cheats on this game.", 4000);
        writeres("I cannot use cheats on this game. You can add support to new games by submitting a pull request to <a href='https://github.com/danog/telegramcheats' class='grey-text text-lighten-3' target='_blank'>the TelegramCheats repo.</a>");
    }
}
function post(url, data, cb, failCb, proxy = false) {
    writeres('<div class="preloader-wrapper small active"> <div class="spinner-layer spinner-white-only"> <div class="circle-clipper left"> <div class="circle"></div> </div><div class="gap-patch"> <div class="circle"></div> </div><div class="circle-clipper right"> <div class="circle"></div> </div> </div> </div>');
    if (proxy) {
        url = "https://proxy.daniil.it/?url=" + encodeURIComponent(url);
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cb(JSON.parse(xhr.responseText));
        } else if (failCb) {
            failCb();
        }
    };
    xhr.open("POST", url, true);
    xhr.send(data);
    writeres('');
}
function writeok() {
    writeres('OK!');
    Materialize.toast('OK!', 4000);
}
function writeres(cos) {
    $("#res").html(cos);
}
