const readline = require('readline');

var byteSpace = "˽";
var clog;

var gameData = {
    startWord:'',
    wordSet:[],
    errormsg: ''
}


const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
//handle console args and store them into the global object
var myArgs = process.argv.splice(2);
	gameData.startWord = myArgs[0];
	var lastWord = gameData.startWord;
	myArgs.shift();
	for (i = 0; i < myArgs.length; i++)
	{
	    var str = myArgs[i].replace(/[^a-z0-9+]+/gi, '');
	    gameData.wordSet.push(str);
	    
	}

function gameStart()
{
	//generate random number to determine if AI is first or second
	var type = Math.floor(Math.random()* (1 - 0 + 1)) + 0;
	if (type == 1)
	{
		gameAi();
	}
	else
	{
		gameAiTwo();
	}
	//begin game
    //gameCore();
    
};

//function where the player is second
function gameAi(){

	//AI turn logic
	var aiGameWord = aiPlayer();
	if (aiGameWord == true)
	{
		console.log(clog);
	}
	else
	{
		console.log()
		console.log("WIN" + byteSpace + "-" + byteSpace + "SECOND");
		rl.close();
		return;
	}
	//player turn logic
	rl.question("$" + byteSpace, (w1) => {
		var checkOne = checkWords(w1);
        if (checkOne == false) {
            console.log("SECOND" + byteSpace + "(NG):" + byteSpace + w1);
            console.log("WIN" + byteSpace + "-" + byteSpace + "SECOND");
            rl.close();
            return;
        } else 
        {
            console.log('SECOND'+ byteSpace + '(OK):' + byteSpace + w1);
            gameAi();
        }
	});
	
}

//function where the player is first
function gameAiTwo(){

	//player turn
	rl.question("$" + byteSpace, (w1) => {
		var checkOne = checkWords(w1);
        if (checkOne == false) {
            console.log("SECOND" + byteSpace + "(NG):" + byteSpace + w1);
            console.log("WIN" + byteSpace + "-" + byteSpace + "SECOND");
            rl.close();
            return;
        } else 
        {
            console.log('SECOND'+ byteSpace + '(OK):' + byteSpace + w1);
            //AI turn begin 
            var aiGameWord = aiPlayer();
			if (aiGameWord == true)
			{
				console.log(clog);
				gameAiTwo();
			}
			else
			{
				console.log()
				console.log("WIN" + byteSpace + "-" + byteSpace + "FIRST");
				rl.close();
				return;
			}
        }
	});
	
}

//Simple AI player function that returns the first match (if any) or loses the game if there are no matches
function aiPlayer(){
		
	for(i = 0; i < gameData.wordSet.length; i++)
	{
		var tmpAi = gameData.wordSet[i];
		var aiCheck = checkWords(tmpAi)
		if (aiCheck == true)
		{
			//console.log("AI" + byteSpace + '(OK):' + byteSpace + tmpAi);
			clog = "AI" + byteSpace + '(OK):' + byteSpace + tmpAi;
			return true;
			break;
			
		}
		else if(aiCheck == false){
			continue;
		}

	}
	
}

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
        gameData.errormsg = "Invalidz" + byteSpace + "Word";
        return false;
    }
    lastWord = tmp;   
    gameData.wordSet.splice(arrcheck, 1);
    return true;
};



//gameStart(startWord, gameData.wordSet);
gameStart();