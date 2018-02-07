var _storage = window.localStorage, _json;

var main = function(){
    console.log("JSON gotten");
}

var json_downloader = function(){
    let url = "/data/keywords.json", xhr = new XMLHttpRequest(), json_loader = () => {
        data = this.responseText;
        _json = JSON.parse(data);
        _storage.setItem("data", data);
        main();
    };
    xhr.addEventListener("load", json_loader);
    xhr.open("GET", url);
    xhr.send();
}

var hash_check = function(){
    let url = "/data/hash.txt", xhr = new XMLHttpRequest(), hash_handler = () => {
        hash = this.responseText;
        if(!_storage.getItem("data")){
            json_downloader();
        }
        _json = JSON.parse(_storage.getItem("data"));
        if (_json['hash'] != hash){
            json_downloader();
        }
        else{
            main();
        }
    };
    xhr.addEventListener("load", hash_handler);
    xhr.open("GET", url);
    xhr.send();
}

var bootloader = () => {
    hash_check()
}

document.addEventListener("DOMContentLoaded", bootloader);