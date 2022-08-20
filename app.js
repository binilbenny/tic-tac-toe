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
    const bord=["","","","","","","","",""]
})()


//game control object module
const gameControl = (()=>{

})()