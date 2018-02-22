var _storage = window.localStorage;

var json_downloader = function(){
    let url = "../data/keywords.json", xhr = new XMLHttpRequest(), json_loader = () => {
        data = xhr.response;
        window.json = JSON.parse(data);
        _storage.setItem("data", data);
        console.log("JSON gotten");
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
            console.log("No cache")
            json_downloader();
            return
        }
        window.json = JSON.parse(_storage.getItem("data"));
        if (window.json["hash"] != hash){
            console.log("Cache miss")
            json_downloader();
        }
        else{
            console.log("Cache hit");
            return
        }
    };
    xhr.addEventListener("loadend", hash_handler);
    xhr.open("GET", url);
    xhr.send();
};

(function(){
    hash_check();
})();