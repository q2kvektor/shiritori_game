const readline = require('readline');

var byteSpace = "˽";

var gameData = {
    startWord:'',
    wordSet:[],
    errormsg: ''
}


//handle console args and store them into the global object
var myArgs = process.argv.splice(2);
gameData.startWord = myArgs[0];
var lastWord = gameData.startWord.toLowerCase();
myArgs.shift();
for (i = 0; i < myArgs.length; i++)
{
    var str = myArgs[i].replace(/[^a-z0-9+]+/gi, '');
    
    gameData.wordSet.push(str.toLowerCase());
    
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//initializing function
function gameStart()
{
    
   gameCore();
};

//Two player game core function
function gameCore() {
    //being the game
    //First player's turn
    rl.question("$" + byteSpace, (w1) => {
        //send the word to check check function
        var checkOne = checkWords(w1);
        if (checkOne == false) {
            console.log("FIRST" + byteSpace + "(NG):" + byteSpace + w1);
            console.log("WIN" + byteSpace + "-" + byteSpace + "SECOND");
            rl.close();
            return;
        } else 
        {
            console.log('FIRST'+ byteSpace + '(OK):' + byteSpace + w1);
        }
        //Second player's turn
        rl.question("$" + byteSpace, (w2) => {
            //send the word to check check function
            var checkTwo = checkWords(w2);
            if (checkTwo == false) {
                console.log("SECOND" + byteSpace + "(NG):" + byteSpace + w2);
                console.log("WIN" + byteSpace + "-" + byteSpace + "FIRST");
                rl.close();
                return;
            } else {
                console.log('SECOND'+ byteSpace + '(OK):' + byteSpace + w2);
                gameCore();
            }
        });
        
    });
};

//word check function that returns true or false
function checkWords(string)
{
    var tmp = string;
    var arrcheck = gameData.wordSet.indexOf(tmp);
    
    //check if input is empty
    if (tmp.trim() == '')
    {
        gameData.errormsg = "Empty" + byteSpace + "Input";
        return false;
    }
    //check if the first and last letter match or if the word exists in the word set
    if(tmp.charAt(0) != lastWord.slice(-1) || arrcheck === -1)
    {
        gameData.errormsg = "Invalid" + byteSpace + "Word";
        return false;
    }
    lastWord = tmp;   
    gameData.wordSet.splice(arrcheck, 1);
    return;
};

gameStart();