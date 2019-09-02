var url = [
    "asset/penguin.jpg",
    "asset/goldenfish.jpg",
    "asset/puma.jpg",
    "asset/monkey.jpg",
    "asset/giraffe.jpg",
    "asset/dog.jpg",
    "asset/racoon.jpg",
    "asset/sheep.jpg",
    "asset/tiger.jpg",
    "asset/coala.jpg"
];
var imgs = new ArrayList();

var index=1;
const maxIndex = 10;

var newElement;
var isMoving = false;

var main = document.getElementById('main');

function moveLeft(){
    if( isMoving ) return;
    isMoving = true;
    let leftImg = imgs.get(getIndex( index-1 ));
    let centerImg = imgs.get(getIndex( index ));
    let rightImg = imgs.get(getIndex(index+1));

    leftImg.classList.add('dismissLeft');
    leftImg.classList.remove('back');
    setTimeout( ()=>{
        leftImg.classList.remove('leftAlbum');
        leftImg.removeEventListener("click", moveLeft );
    }, 300);


    setTimeout( ()=>{
        centerImg.classList.add('smallAlbum');
        centerImg.classList.add('leftAlbum');
        centerImg.classList.remove('bigAlbum');
        centerImg.classList.remove('centerAlbum');
        centerImg.classList.remove('back');
        centerImg.addEventListener("click", moveLeft);
    }, 300);
    

    setTimeout( ()=>{
        rightImg.classList.add('centerAlbum');
        rightImg.classList.add('bigAlbum');
        rightImg.classList.remove('smallAlbum');
        rightImg.classList.remove('rightAlbum');
        rightImg.classList.remove('back');
        rightImg.removeEventListener("click", moveRight);
    }, 600);

    let newElement = imgs.get(getIndex(index+2));
    
    index++;

    setTimeout( ()=>{
        newElement.classList.add('rightAlbum');
        newElement.classList.add('smallAlbum');
        newElement.classList.add('back');

        setTimeout( ()=>{
            newElement.classList.remove('dismissRight');
            newElement.classList.remove('dismissLeft');
            newElement.addEventListener("click", moveRight);
            isMoving=false;
        }, 100);

        
    }, 550);
}

function moveRight(){
    if( isMoving ) return;
    isMoving = true;
    let leftImg = imgs.get(getIndex( index-1 ));
    let centerImg = imgs.get(getIndex( index ));
    let rightImg = imgs.get(getIndex(index+1));

    rightImg.classList.add('dismissRight');
    rightImg.classList.remove('back');
    setTimeout( ()=>{
        rightImg.classList.remove('rightAlbum');
        rightImg.removeEventListener("click", moveRight );
    }, 300);


    setTimeout( ()=>{
        centerImg.classList.add('smallAlbum');
        centerImg.classList.add('rightAlbum');
        centerImg.classList.remove('bigAlbum');
        centerImg.classList.remove('centerAlbum');
        centerImg.classList.remove('back');
        centerImg.addEventListener("click", moveRight);
    }, 300);
    

    setTimeout( ()=>{
        leftImg.classList.add('centerAlbum');
        leftImg.classList.add('bigAlbum');
        leftImg.classList.remove('smallAlbum');
        leftImg.classList.remove('leftAlbum');
        leftImg.classList.remove('back');
        leftImg.removeEventListener("click", moveLeft );
    }, 600);

    let newElement = imgs.get(getIndex(index-2));
    index--;

    setTimeout( ()=>{
        newElement.classList.add('leftAlbum');
        newElement.classList.add('smallAlbum');
        newElement.classList.add('back');
        
        setTimeout( ()=>{
            newElement.classList.remove('dismissRight');
            newElement.classList.remove('dismissLeft');
            newElement.addEventListener("click", moveLeft);
            isMoving=false;
        }, 100);

        
    }, 550);
}

function getIndex( index ){
    return ( index % maxIndex + maxIndex ) % maxIndex;
}

function createImg(index){
    newElement = document.createElement("img");
    newElement.src = url[ index % url.length ];
    newElement.classList.add('album');
    newElement.classList.add('dismissRight');
    main.appendChild(newElement);
    return newElement;
}

function init(){
    let firstElement = document.createElement("img");
    firstElement.src = url[ index-1 % url.length ];
    firstElement.classList.add('album');
    firstElement.classList.add('smallAlbum');
    firstElement.classList.add('leftAlbum');
    main.appendChild(firstElement);
    imgs.add(firstElement);
    firstElement.addEventListener("click", moveLeft ); 
    

    let secondElement = document.createElement("img");
    secondElement.src = url[ index % url.length ];
    secondElement.classList.add('album');
    secondElement.classList.add('bigAlbum');
    secondElement.classList.add('centerAlbum');
    main.appendChild(secondElement);
    imgs.add(secondElement);

    let thirdElement = document.createElement("img");
    thirdElement.src = url[ index+1 % url.length ];
    thirdElement.classList.add('album');
    thirdElement.classList.add('smallAlbum');
    thirdElement.classList.add('rightAlbum');
    main.appendChild(thirdElement);
    imgs.add(thirdElement);
    thirdElement.addEventListener("click", moveRight ); 

    for( let i=index+2; i<maxIndex; i++){
        imgs.add(createImg(i));
    }

    index = 1;
}