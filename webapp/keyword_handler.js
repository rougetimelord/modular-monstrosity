var key_loader = () => {
    const keys = window.json['cats'];
    let option = document.getElementById("dropdown"), chunk = document.createDocumentFragment();
    keys.forEach(key => {
        let e = document.createElement("option");
        e.value = key;
        e.innerText = key;
        chunk.appendChild(e);
    });
    option.appendChild(chunk);
}

var get_key = () => {
    let type = document.getElementById("dropdown").value, keys = window.json[type];
    let r = Math.floor(Math.random() * (keys.length + 1));
    window.key = keys[r];
    document.getElementById("keyword-title").innerText = window.key;
    let com = window.json[keys[r]]['comments'], comdiv = document.getElementById("keyword-comment");
    (com !== "null") ? comdiv.innerText = com : comdiv.innerText = '';
}

var main = function(e){
    switch(this.id){
        case "go":
            get_key();
            break;
        case "use":
            window.json[window.key]['used'] = !0
            break;
        case "skp":
            get_key();
            break;
        default:
            break;
    }
}

var bootloader = () => {
    key_loader();
    let inputs = document.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++){
        let elem = inputs[i];
        elem.addEventListener("click", main, false);
    }
}

window.addEventListener("load", function(event) {
    bootloader();
  });