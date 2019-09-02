var hand = document.getElementById("hand");
var container = document.getElementById("handcontainer");
var video = document.getElementById("video");
var isLoaded = false;
var titleLoadInterval;
var videoLoadInterval;

window.onload = ()=>{
    for( let i=0; i<10; i++ ){
        let newElement = hand.cloneNode();
        newElement.style.left = `${15+Math.random()*50}%`;
        newElement.style.width = `${15+Math.random()*20}em`;
        container.appendChild(newElement);
    }

    video.addEventListener("progress", function(e) {
        if (video.networkState == 3) {  
            isLoaded = true;
            // video.play();
        }
    });

    titleLoadInterval = setInterval( newTitle, 2100);
    // videoLoadInterval = setInterval( loadVideo, 800);
}

loadVideo = ()=> {
    if(video.networkState!=3) video.load();
    else{
        clearInterval( videoLoadInterval );
        console.log("complete load")
    } 
}

var title = document.getElementById("title");
var messages = [
    "헬로헬로",
    "안녕안녕",
    "하이하이"
];
var index = 0;
function newTitle(){
    if( index == 1 ){
        let newElement = title.cloneNode();
        newElement.innerHTML = messages[index%(messages.length)];
        newElement.style.top = `${36-index%(messages.length)*12}%`;
        let Atag = document.createElement("a");
        Atag.href = "index.html";
        Atag.appendChild(newElement)
        index++;
        container.appendChild(Atag);
    }
    else if( index < (messages.length) ){
        let newElement = title.cloneNode();
        newElement.innerHTML = messages[index%(messages.length)];
        newElement.style.top = `${36-index%(messages.length)*12}%`;
        index++;
        container.appendChild(newElement);
    }
    else{
        clearInterval( titleLoadInterval );
        console.log("cleared Interval");
    }
}