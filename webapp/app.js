var _storage = window.localStorage, _json;

var main = function(){
    
}

var json_downloader = function(){
    let url = "../data/keywords.json", xhr = new XMLHttpRequest(), json_loader = () => {
        data = xhr.response;
        _json = JSON.parse(data);
        _storage.setItem("data", data);
        console.log("JSON gotten");
        main();
    };
    xhr.addEventListener("loadend", json_loader);
    xhr.open("GET", url);
    xhr.send();
}

var hash_check = function(){
    let url = "../data/hash.txt", xhr = new XMLHttpRequest(), hash_handler = () => {
        hash = xhr.response;
        console.log(hash);
        if(!_storage["data"]){
            json_downloader();
            return
        }
        _json = JSON.parse(_storage.getItem("data"));
        if (_json["hash"] != hash){
            console.log("Cache miss")
            json_downloader();
        }
        else{
            console.log("Cache hit");
            main();
            return
        }
    };
    xhr.addEventListener("loadend", hash_handler);
    xhr.open("GET", url);
    xhr.send();
}

var bootloader = () => {
    hash_check();
}

document.addEventListener("load", bootloader);