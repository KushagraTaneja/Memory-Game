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
/*
 * set up the event listener for a card. If a card is clicked:
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 let restartButton = document.querySelector('.restart');
 let allCards = document.querySelectorAll('.card');

 restartButton.addEventListener('click',function(e){
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
    });

 allCards.forEach(function(element){
     element.addEventListener('click',function(e){
        let openedCard = document.getElementsByClassName("open");
        let clickedElement = e.target;
        if (openedCard.length==1 || openedCard.length==0) {
            if(clickedElement.classList.contains("card")){
                clickedElement.classList.add('open');
        }}       
       if (openedCard.length==2) {
        moves();
        match();   
       } 
     });
    });

    function moves() {
        let noOfMoves = parseInt(document.getElementById("moves").innerText, 10);
        noOfMoves += 1;           
        document.getElementById("moves").innerText = noOfMoves;
        let starElements = document.querySelectorAll('.stars li i');
        if (noOfMoves == 8) {
                starElements[0].className = "fa fa-star";
                starElements[1].className = "fa fa-star";
                starElements[2].className = "fa";            
        }
        else if (noOfMoves == 14) {
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

``