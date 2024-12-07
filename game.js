var gamePattern = [];
var userClickPattern = [];
const buttonColor = ['green','red','yellow','blue']
let currentLevel=0;
var bool = true;
var isPlaying = false;


$(document).on('keypress touchstart',(event)=>{
    if(bool)
    {
        $('#level-title').text('Level '+currentLevel);
        nextSequence();
        bool=false;
    }
});


$('.btn').on('click touchstart',function (){
    if(isPlaying){
        return;
    }
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animateKey(userChosenColour);
    userClickPattern.push(userChosenColour);
    //console.log(userClickPattern);
    checkAnswer(userClickPattern.length-1);
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function nextSequence()
{
    userClickPattern = [];
    currentLevel++;
    isPlaying = true;
    $('#level-title').text("Level "+currentLevel);
    if(gamePattern.length>0){
        for(i=0;i<gamePattern.length;i++)
        {
            animateKey(gamePattern[i]);
            playSound(gamePattern[i]);
            await delay(500);
        }
    }
    let ranNum = Math.floor(Math.random()*4);
    let ranColor = buttonColor[ranNum];
    gamePattern.push(ranColor);
    console.log(gamePattern);
    $('#'+ranColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(ranColor);
    isPlaying = false;
}

function checkAnswer(count)
{
    console.log(gamePattern[count]+" : I clicked "+userClickPattern[count])
    if(userClickPattern[count] === gamePattern[count])
    {
        if(userClickPattern.length === gamePattern.length)
            {
                setTimeout(()=>{
                    nextSequence();
                },1000);
            }
    }
    else
    {
        start_over();
    }
}

function start_over()
{
    $("body").addClass('game-over');
    $('h1').text('Game Over! Press A to restart');
    setTimeout(()=>{
        $('body').removeClass('game-over');
    },200);
    gamePattern.length=0;
    bool=true;
    currentLevel=0;
    var audio = new Audio('./sounds/wrong.mp3');
    audio.play();
}

function animateKey(key)
{
    $('#'+key).addClass('pressed');
    setTimeout(()=>{
        $('#'+key).removeClass('pressed');
    },100);
}

function playSound(key)
{
    var audio;
    if(key){
        audio= new Audio('./sounds/'+key+'.mp3');
        audio.play();
    }
}
