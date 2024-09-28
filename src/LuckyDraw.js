import React, { useState, useEffect } from "react";
import Confetti from "react-confetti"; // Import confetti
import  "./styles.css"

const LuckyDraw = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current index of the spinning names
  const [winnerIndex, setWinnerIndex] = useState(null); // Stores the index of the winner
  const [winnerName, setWinnerName] = useState(""); // Stores the winner's name
  const [winnerSurname, setWinnerSurname] = useState(""); // Stores the winner's surname
  const [isSpinning, setIsSpinning] = useState(false); // Tracks if spinning is active
  const [showConfetti, setShowConfetti] = useState(false); // Tracks if confetti should be shown
  const [winnersList, setWinnersList] = useState([]); // Keeps track of all winners

  // Map of numbers to name and surname
  const nameMapping = [
    { name: "RIMJHIM MOBILE", surname: "KUSHAL BOHRA" },
    { name: "KANHA MOBILE(UMARIA)", surname: "JAY WADHWANI" },
    { name: "SAM MOBILE SHOPPY(CENTRALISED)", surname: "SUDESH SACHDEV" },
    { name: "SATYA SAI MOBILE SHOP (SHAHDOL)", surname: "SATYA NARAYAN SONI" },
    { name: "RADHA KRISHNA MOBILE", surname: "VISHAL LALWANI" },
    { name: "REAL MOBILE(CENTRALISED)", surname: "INDER LAL AHUJA" },
    { name: "MAA MOBILE-JABALPUR", surname: "NAYAN PATEL " },
    { name: "SATYA WATCH AND MOBILE", surname: "LALCHAND GULWANI" },
    { name: "NEW VIPIN MOBILE SHOP", surname: "SURENDRA KUMAR SHAH" },
    { name: "GOOGLE MOBILE", surname: "ARVIND SONI" },
    { name: "MAA SHARDA MOBILE SHOP", surname: "SARVESH KUMAR GUPTA" },
    { name: "BALAJI MOBILE WARASEONI", surname: "AMIT JETHWANI" },
 
  ]; // Use an array for easy indexing

  const totalParticipants = nameMapping.length;

  // Function to start the lucky draw
  const startLuckyDraw = () => {
    setIsSpinning(true); // Start spinning effect
    setShowConfetti(false); // Hide confetti when spinning starts
    setWinnerIndex(null); // Reset the winner
    setWinnerName(""); // Reset winner's name
    setWinnerSurname(""); // Reset winner's surname

    let randomIndex;

    // Randomly pick an index that has not been a winner yet
    do {
      randomIndex = Math.floor(Math.random() * totalParticipants);
    } while (
      winnersList.includes(randomIndex) &&
      winnersList.length < totalParticipants
    );

    // Start the spinning effect
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalParticipants - 1 ? 0 : prevIndex + 1
      ); // Cycle through indices
    }, 100); // Change names every 100ms

    // Stop the spinning after 2 seconds and set the winner
    setTimeout(() => {
      clearInterval(interval);
      setIsSpinning(false);
      setWinnerIndex(randomIndex);

      // Set the winner's name and surname
      const winnerData = nameMapping[randomIndex];
      if (winnerData) {
        setWinnerName(winnerData.name);
        setWinnerSurname(winnerData.surname);
      } else {
        setWinnerName("No winner");
        setWinnerSurname("");
      }

      // Add the winner to the list if it's not a duplicate
      if (!winnersList.includes(randomIndex)) {
        setWinnersList((prevList) => [...prevList, randomIndex]);
      }

      // Show confetti for 3 seconds after winner is shown
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000); // Confetti for 3 seconds
    }, 3000); // Stop after 2 seconds
  };

  return (
    <div className="container">
      <h1>VIVO V40e Launch Lucky Draw</h1>
      <img
        src="https://media4.giphy.com/avatars/wheeloffortune/4Qxgn49y7nzh.gif"
        width={250}
      />

      <div className="nameBox">
        <p className="nameDisplay">
          {isSpinning
            ? nameMapping[currentIndex].name // Display spinning name
            : winnerIndex !== null
            ? nameMapping[winnerIndex].name // Display winner's name
            : ""}
        </p>
      </div>
      <button
        onClick={startLuckyDraw}
        
        disabled={isSpinning || winnersList.length === totalParticipants}
      >
        {isSpinning
          ? "Spinning..."
          : winnersList.length === totalParticipants
          ? "No more draws"
          : "Start Draw"}
      </button>
      {winnerIndex !== null && (
        <div className="result">
          <p>Dealer Name: {winnerName}</p>
          <p>Owner Name: {winnerSurname}</p>
        </div>
      )}
      {/* Show confetti when there's a winner */}
      {showConfetti && <Confetti />}
    </div>
  );
};

// Styles


export default LuckyDraw;
