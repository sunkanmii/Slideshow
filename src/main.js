"use strict";

const addPicButton = document.querySelector("#add-pics");
const fileElem = document.querySelector("#fileElem");
const fullScreenCusParent = document.querySelector("#how-to-use video");
const nextButton = document.querySelector("#next-button");
const slideShowMain = document.querySelector(".slide-show-main");
const slideShowPic = document.querySelector(".slide-show-main picture source");
const videoElem = document.querySelector("#main-container video");
const errorMessage = document.querySelector("#error-message");
const Counter = () => {
    let counter = 0;

    return {
        CusCounter: () => {
            return counter;
        },
        IncrCounter: () => {
            return ++counter;
        },
        DecCounter: () => {
            return --counter;
        }
    }
}
const myCounter = Counter();

const GetUserImages = () => {
    let userImgs = document.querySelectorAll(".user-images");
    
    return {
        UserImages: () => {
            return userImgs;
        }
    }
}

const Imgs = GetUserImages;

if(videoElem.canPlayType("video/mp4; codecs=avc1.42E01E, mp4a.40.2")){
    console.log("Video element of type mp4 is supported.");
}
const pics = [];

addPicButton.addEventListener("click", () => {
    fileElem.click();
})

function AddImgFiles(files) {
    
    for (let i = 0; i < files.length; i++) {
        let cusfile = files[i];
        
        let reader = new FileReader();
        
        reader.addEventListener("load", function (event) {
            if(i == 0){
                nextButton.insertAdjacentHTML("beforebegin", `<img class="user-images" sizes="50vw" src ="${event.target.result}"/>`)}
            else{
                nextButton.insertAdjacentHTML("beforebegin", `<img class="user-images" sizes="50vw" src ="${event.target.result}" hidden/>`); 
            }
            });
            
            reader.readAsDataURL(cusfile);
            Imgs();
        }        
    }
    
// if(window.PointerEvent){
    //     addPicButton.addEventListener("pointerdown", this.handleGestureStart, true);
    //     addPicButton.addEventListener("pointermove", this.handleGestureMove, true);
    //     addPicButton.addEventListener("pointerup", this.handleGestureEnd, true);
    //     addPicButton.addEventListener("pointercancel", this.handleGestureEnd, true);
    // }else{
        
        //     addPicButton.addEventListener("touchstart", this.handleGestureStart, true);
        //     addPicButton.addEventListener("touchmove", this.handleGestureMove, true);
        //     addPicButton.addEventListener("touchend", this.handleGestureEnd, true);
        //     addPicButton.addEventListener("touchcancel", this.handleGestureEnd, true);
        
        //     addPicButton.addEventListener("mousedown", this.handleGestureStart, true);
        // }
        
        // this.handleGestureEnd = function(event){
            //     event.preventDefault();
            
            //     if(event.touches && event.touches.length > 0){
                //         return;
                //     }
                
                //     rafPending = false;
                
                //     // Remove Event Listeners
                //     if(this.window.PointerEvent){
                    //         event.target.releasePointerCapture(eve)
                    //     }else{
                        //         this.document.removeEventListener("mousemove", this.handleGestureMove, true);
                        //         this.document.removeEventListener("mouseup", this.handleGestureEnd, true);
                        //     }

                        //     updateSwipeRestPosition();
                        
                        //     initialTouchPos = null;
                        // }.bind(this);
                        // s
                        // function getGesturePointerFromEvent(event){
                            //     var point = {};
                            
                            //     if(event.targetTouches){
                                //         point.x = event.targetTouches[0].clientX;
                                //         point.y = event.targetTouces[0].clientY;
                                //     }
                                //     else{
//         point.x = event.clientX;
//         point.y = event.clientY;
//     }

//     return point;
// }

// function onAnimFrame() {
    //     if(!rafPending) {
//       return;
//     }

//     var differenceInX = initialTouchPos.x - lastTouchPos.x;

//     var newXTransform = (currentXPosition - differenceInX)+'px';
//     var transformStyle = 'translateX('+newXTransform+')';
//     addPicButton.style.webkitTransform = transformStyle;
//     addPicButton.style.MozTransform = transformStyle;
//     addPicButton.style.msTransform = transformStyle;
//     addPicButton.style.transform = transformStyle;

//     rafPending = false;
//   }

function PreviousImage(){
    let userImgs = Imgs().UserImages();
    let currImgInd = myCounter.CusCounter();
    let prevImgInd = myCounter.DecCounter();
    
    if(prevImgInd < 0){
        myCounter.IncrCounter();
        prevImgInd = 0;
    }

    if(userImgs[prevImgInd] === userImgs[0]){
        errorMessage.textContent = "This is the first image!";
        errorMessage.setAttribute("aria-live", "polite");
    }
    else if(userImgs[prevImgInd] === userImgs[userImgs.length - 1]){
        errorMessage.textContent = "This is the last image!";
        errorMessage.setAttribute("aria-live", "polite");
    }
    else{
        userImgs[currImgInd].setAttribute("hidden", true);
        userImgs[prevImgInd].removeAttribute(hidden);
    }
}

function NextImage(){
    let userImgs = Imgs().UserImages();
    let currImgInd = myCounter.CusCounter();
    let nextImgInd = myCounter.IncrCounter();
    
    if(userImgs[nextImgInd] === userImgs[0]){
        errorMessage.textContent = "This is the first image!";
        errorMessage.setAttribute("aria-live", "polite");
    }
    else if(userImgs[nextImgInd] === userImgs[userImgs.length - 1]){
        errorMessage.textContent = "This is the last image!";
        errorMessage.setAttribute("aria-live", "polite");
    }
    else{
        userImgs[currImgInd].setAttribute("hidden", true);
        userImgs[nextImgInd].removeAttribute(hidden);
    }
}

function ToggleFullScreen() {
    if(videoElem.canPlayType("video/mp4; codecs=avc1.42E01E, mp4a.40.2")){
        videoElem.requestFullscreen();
    }
}