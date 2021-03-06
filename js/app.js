/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Select all cards and store in an array
const cards = document.querySelectorAll('.card');
// Array that gets the flipped card added into it in order to keep track of number of flipped cards with counter.length
let counter = [];
//Number of clicks counter
let clickCounter = 0;
//Seconds and minutes for timer
let seconds = 0;
let minutes = 0;
let timerId = 0;

//Counter variable
let classCounter = 0;

//Timer
timerId = setInterval(function(){
    if (seconds < 59)
        {
            seconds += 1;
        }
    else
        {
            seconds = 0;
            minutes += 1;
        }

    document.getElementById("time").innerHTML= minutes + ":" + seconds;
}, 1000);


// Watch for clicks on every card
cards.forEach(function(element) {
    element.addEventListener("click", function show() {
        clickCounter += 1;
        console.log(clickCounter);
        console.log(document.getElementById("moves").innerHTML);
        document.getElementById("moves").innerHTML = clickCounter;
        console.log(document.getElementById("moves").innerHTML);
        //Verify number of clicks for star rating changes
        if (clickCounter == 20) {
            document.getElementById("thirdStar").classList.remove("fa-star");
            document.getElementById("thirdStar").classList.add("fa-star-o");
        }
        if (clickCounter == 26) {
            document.getElementById("secondStar").classList.remove("fa-star");
            document.getElementById("secondStar").classList.add("fa-star-o");
        }
        if (clickCounter == 35) {
            document.getElementById("firstStar").classList.remove("fa-star");
            document.getElementById("firstStar").classList.add("fa-star-o");
        }
        //Flip max 2 cards at a time
        if (counter.length < 2) {
            if (counter.length == 0) {
                element.classList.add("open");
                element.classList.add("show");
                classCounter += 1;
                counter.push(element);
                console.log(counter);
            }
            else {
                element.classList.add("open");
                element.classList.add("show");
                classCounter += 1;
                counter.push(element);
                console.log(counter);
                const childFirst = counter[0].children;
                const childSecond = counter[1].children;
                console.log(childFirst);
                console.log(childSecond);
                if (childFirst[0].className == childSecond[0].className) {
                    //match
                    console.log("match");
                    console.log(childFirst[0].className);
                    console.log(childSecond[0].className);
                    counter =[];
                }
                else {
                    //not match
                    //close them in 2 seconds
                    //nullify counter
                    setTimeout(function(){
                        counter.forEach(function(flipped) {
                        flipped.classList.remove("open");
                        flipped.classList.remove("show");
                        classCounter -= 1;
                        });
                        counter =[];
                    }, 500);
                }
            }
            }
        if (classCounter == 16) {
            console.log("GAME OVER");
            const finalMinutes = minutes;
            const finalSeconds = seconds;
            clearInterval(timerId);
            document.getElementById("time").innerHTML= finalMinutes + ":" + finalSeconds;
            document.getElementById("myModal").style.display = "block";
            document.getElementById("modalText").innerHTML= "Congratulations! You finished the game in " + clickCounter + " moves and it took you " + finalMinutes + " minutes and " + finalSeconds + " seconds. " + "Your star rating is  " + document.getElementById("modalText").innerHTML;
        };


    });
});


