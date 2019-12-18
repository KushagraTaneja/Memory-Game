let restart = document.querySelector('.restart');
let allCards = document.querySelectorAll('.card');
let playAgain = document.getElementById("play-button");
let startGame = document.getElementById("start-game");
let restartButton = document.getElementById("restart-button")


startGame.onclick = function() {
    startGame.style.display = "none";
    restartButton.style.display = "block";
  }

restart.addEventListener('click',function(e){
    resetGame();  
    });
    
playAgain.addEventListener('click',function(e){
    let Model = document.getElementById("win-model");
    resetGame();
    Model.style.display = "none";   

})

allCards.forEach(function(element){
     element.addEventListener('click',function(e){
        let openedCard = document.getElementsByClassName("open");
        let matchedCard = document.getElementsByClassName("match");
        let clickedElement = e.target;
        if (openedCard.length==1 || openedCard.length==0) {
            if(clickedElement.classList.contains("card")){
                clickedElement.classList.add('open');
        }}       
       if (openedCard.length==2) {
        moves();
        match();   
       } 
       if (matchedCard.length==16) {
           stopTimer();
           gameEnds();
       } 
     });
    });

function moves() {
        let noOfMoves = parseInt(document.getElementById("moves").innerText, 10);
        noOfMoves += 1;           
        document.getElementById("moves").innerText = noOfMoves;
        let starElements = document.querySelectorAll('.stars li i');
        if (noOfMoves == 13) {
                starElements[0].className = "fa fa-star";
                starElements[1].className = "fa fa-star";
                starElements[2].className = "fa";            
        }
        else if (noOfMoves == 18) {
            starElements[0].className = "fa fa-star";
            starElements[1].className = "fa";
            starElements[2].className = "fa";
        }
    }

function match(){
    let [openedCard1,openedCard2] = document.getElementsByClassName("open");
        if ((openedCard1.childNodes[1].classList[1])==(openedCard2.childNodes[1].classList[1])) {
                openedCard1.className = "card match";
                openedCard2.className = "card match";
            } else {
                openedCard1.className = "card misMatch";
                openedCard2.className = "card misMatch";
                setTimeout(function() {
                openedCard1.classList.remove('misMatch');
                openedCard2.classList.remove('misMatch');
                    },1000)
            }
        }   

function resetGame() {
    let cardTypes = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf",
    "fa-bicycle","fa-bomb","fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube",
    "fa-leaf","fa-bicycle","fa-bomb"];
    let shuffledCards = shuffle(cardTypes);
    let cardElements = document.querySelectorAll('.deck li i');
    let starElements = document.querySelectorAll('.stars li i');
            starElements[0].className = "fa fa-star";
            starElements[1].className = "fa fa-star";
            starElements[2].className = "fa fa-star";  
    document.getElementById("moves").innerText = 0;
    
     for (let i=0;i<=15;i++){
        cardElements[i].className = "fa " + shuffledCards[i];
     }
     allCards.forEach(function(card){
        card.className = "card";
    })
    resetTimer();
    startTimer();
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
    return array;
    }

let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0, timer;

function startTimer(){
         timer = setInterval(setTime, 1000);
        }
        
 function stopTimer(){
            clearInterval(timer);
        }

function resetTimer(){
            stopTimer();
            document.getElementById("minutes").innerHTML = "00";
            document.getElementById("seconds").innerText = "00";
        }

function setTime(){
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds%60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        }

function pad(sec){
            let secString = sec + "";
            if(secString.length < 2){
                return "0" + secString;
            }
            else {
                return secString;
            }
        }

function gameEnds(){
        let winningModel = document.getElementById("win-model");
        winningModel.style.display = "block";     
        document.getElementById("total-moves").innerText = parseInt(document.getElementById("moves").innerText, 10);
        document.getElementById("final-stars").innerText = document.getElementsByClassName("fa-star").length;
    }


    