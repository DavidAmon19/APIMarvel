const privateKey = "15b7ea9794fa4f25affb3db80f40aa2bd4128e97";
const publicKey = "910b41623cf2c627a35643585279890e";
const maxCharacters = 1500;




function createHash(timeStamp) {

    const toBeHashed = timeStamp + privateKey + publicKey;
    const hashedMessage = md5(toBeHashed);
    return hashedMessage;

}

function getCharacterList() {

    
    const timeStamp = Date.now().toString();
    
    const offset = Math.floor((Math.random() * maxCharacters) + 1);
   
    const hash = createHash(timeStamp);

    
    const urlAPI = "http://gateway.marvel.com/v1/public/characters?limit=9&offset="+offset+"&ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            getImages(data);
        }
    };
    xhttp.open("GET", urlAPI, true);
    xhttp.send();
}


function showHistorys(elemento) {

    const codigo = elemento.parentNode.getElementsByTagName("h5")[1].textContent.substring(4, 11);
    console.log(codigo);
    const timeStamp = Date.now().toString();
    const hash = createHash(timeStamp);

    const urlAPI = "https://gateway.marvel.com:443/v1/public/characters/"+codigo+"/stories?ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;
    console.log(urlAPI);
    
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            getHistorys(data);
        }
    };
    xhttp.open("GET", urlAPI, true);
    xhttp.send();

}
