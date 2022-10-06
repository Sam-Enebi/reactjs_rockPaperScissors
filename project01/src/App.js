import logo from './logo.svg';
import './App.css';
import {FaHandRock, FaHandPaper, FaHandScissors} from "react-icons/fa";
import {useState} from 'react';

const options ={
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function Home() {
  //clears the user details from the local storage and takes the 
  //user back to the homepage when the logut button is clicked
  const handleClick=()=>{
      localStorage.clear();
      window.location.reload();
  }
  return (
      <>
          <button onClick={handleClick}>Logout</button>
      </>
  )
}

function randomOption(){
  //selects a random option (rock,paper,scissors) for the computer
  //from the array above
  const key = Object.keys(options);
  const index = Math.floor(Math.random() * key.length);

  return key[index]

}

function determineWinner(option1, option2){
//determines the winner of the round
  if(option1 === option2){
    return 0;
  }else if(options[option1] === option2){
    return -1
  }else if(options[option2] === option1){
    return 1;
  }

  return null;

}

function OptionIcon({option,...props}){
//chooses which icon to render based on the option that the player selects
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  };
  const Icon = icons[option]

  return(<Icon{...props}/>);
}

function Player({name ="Player", score = 0, option = "rock"}){
  return(
  //displays the player name and score
    <div className = "user">
          <div className="score">{`${name}: ${score}`}</div>
          <div className = "action">
          {option && <OptionIcon option= {option} size={60}/>}
        </div>
    </div>
  )
}

function OptionButton({option = "rock", onOptionSelected}){
  return(
    <button className="round-btn" onClick ={() => onOptionSelected(option)}>
        <OptionIcon option = {option} size = {20}/>
    </button>
  )

}

function DisplayWinner({winner = 0}){
  //displays the winner of the round
  const text = {
    "-1": "You Win",
    0: "It's a tie",
    1: "You lose",
  }

  return(
    <h2>{text[winner]}</h2>
  )

}

function App() {
  //keeps track of what option the player selects
  const[playerOption, setPlayerOption] = useState("");
  //keeps track of what option the computer selects
  const[computerOption, setComputerOption] = useState("");

  //keeps track of the player's score
  const[playerScore, setPlayerScore] = useState(0);
  //keeps track of the computer's score
  const[computerScore, setComputerScore] = useState(0);
  const[winner, setWinner] = useState(0);

  
  const onOptionSelected = (selectedOption) => {
    setPlayerOption(selectedOption);
    //assigns a random option as the computers choice
    const newComputerOption = randomOption();
    setComputerOption(newComputerOption);

    //checks to see wether the player or the computer won the round
    const newWinner = determineWinner(selectedOption, newComputerOption);
    setWinner(newWinner);

    //increases the score of the user and computer based on who won the round
    if (newWinner === -1){
      setPlayerScore(playerScore + 1);
    }else if(newWinner === 1){
      setComputerScore(computerScore + 1)
    }

  }

  return (
    <div className = "center">
      <h1>Rock Paper Scissors</h1>
      <div>
        
        <div className = "container">
{/*displays the player score and the computer score to the user */}
          <Player name= "Player" score ={playerScore} option={playerOption}/>
          <Player name= "Computer" score={computerScore} option ={computerOption}/>
           
            </div>
{/*buttons to call the on option selected function */}
              <OptionButton option="rock" onOptionSelected = {onOptionSelected}/>
              <OptionButton option="paper"onOptionSelected = {onOptionSelected}/>
              <OptionButton option="scissors" onOptionSelected = {onOptionSelected}/>
{/*displays the winner of the round to the user */}
              <DisplayWinner winner={winner}/>
            </div>

            <div>
              <Home/>
            </div>

      </div>
    
  );
}

export default App;
