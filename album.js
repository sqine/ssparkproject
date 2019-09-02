var url = [
    "http://www.bloter.net/wp-content/uploads/2016/08/13239928_1604199256575494_4289308691415234194_n.jpg",
    "http://www.bloter.net/wp-content/uploads/2016/08/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EC%82%AC%EC%A7%84.jpg",
    "http://www.bloter.net/wp-content/uploads/2016/08/KakaoTalk_20160806_182951718.jpg",
    "https://images.unsplash.com/photo-1567273257988-e8b3633cfa73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
    "https://images.unsplash.com/photo-1567271929739-9bf4c0efbea5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
    "asset/racoon.jpg",
    "asset/1racoon.jpg",
    "asset/sunflower.jpg",
    "asset/sheep.jpg",
    "https://m.media-amazon.com/images/I/61xY2Ncd8tL._SS500_.jpg"
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