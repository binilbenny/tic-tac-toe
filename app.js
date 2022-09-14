"use strict";
//todo player object factory
const createPlayer =(name, sign)=>{
    this.name= name;
    this.sign = sign;
    const getName =() => {
        return name;
    }
    const getSign =() => {
        return sign;
    }
    return {getSign, getName};
};

// todo gamebord object module
const gameBord = (()=>{

    const gameBordBox = document.querySelectorAll('[data-cell]')

    return {gameBordBox}
})()


const displayControl = (()=>{
    const popupResult = document.querySelector('#Pop-up-result');
    const closeBtn = document.querySelector('.close-btn');
    const resultMessage = document.querySelector('.showResult');
    const overlay = document.querySelector("#overlay");
    const reset = document.querySelector("#reset");
    
    function displayResult(currentClass,win=false){
        
        win ?  winMsg() : drawMsg()
        function winMsg(){
            resultMessage.querySelector('.result').textContent= 'Congratulation '
            resultMessage.querySelector('.emoji').textContent= '😎'
            resultMessage.querySelector('.playerName').textContent = "Player "+currentClass+ " Win."
        }

        function drawMsg(){
            resultMessage.querySelector('.result').textContent= 'Draw!!! '
            resultMessage.querySelector('.emoji').textContent= '😮'
            resultMessage.querySelector('.playerName').textContent = "*** Both Played Great ***"
        }

        popupResult.classList.add('active');
        overlay.classList.add("active");
    }

    reset.addEventListener("click", ()=>{
        popupResult.classList.remove('active')
        overlay.classList.remove("active");
        gameControl.reset();
    })

    closeBtn.addEventListener('click', ()=>{
        popupResult.classList.remove('active')
    })

    overlay.addEventListener('click', ()=>{
        popupResult.classList.add('active');
    })


    return {displayResult}

})()


//game control object module
const gameControl = (()=>{
    const player1 = createPlayer('Player1','x');
    const player2= createPlayer("Player2", "o");
    const winning_combination =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    let i=0;
    let playerTrun=false;

    function wincheck(currentClass){
    
        //check win
        return winning_combination.some(combination => {
            return combination.every(index => {
                return gameBord.gameBordBox[index].classList.contains(currentClass)

            })
        })
    }
    function checkDraw(){
        if (i==8){
            displayControl.displayResult();
        }
    }

    function OnBoxClick(e){
        const cell = e.target;
        const currentClass = playerTrun ? 'o' : 'x'
        updateSign(currentClass,cell);
        if (wincheck(currentClass)){
            displayControl.displayResult(currentClass,true)
        }else{

            checkDraw()
        }
        trun()
        i++
    }
    function trun(){
        playerTrun =!playerTrun;
    }
    
    function updateSign(currentClass, box){
        box.classList.add(currentClass);
    }
    function update(){
        gameBord.gameBordBox.forEach((box)=> {
            box.classList.remove('o')
            box.classList.remove('x')
            box.removeEventListener('click', OnBoxClick)
            box.addEventListener("click",
            OnBoxClick
            ,
            {
                once: true
            }
            )
        })
    }

    function reset(){
        i=0;
        playerTrun = false;
        update()
    }
    update()
    return {reset}
})()