import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MemoryGame = ({ gridSize }) => {
  const [board, setBoard] = useState([]);
  const [flipped, setFlipped] = useState([]);
  console.log("🚀 ~ MemoryGame ~ flipped:", flipped);
  const [matched, setMatched] = useState([]);
  console.log("🚀 ~ MemoryGame ~ matched:", matched);
  const [isProcessing, setIsProcessing] = useState(false);
  console.log("🚀 ~ MemoryGame ~ isProcessing:", isProcessing);

  const initializeBoard = () => {
    const pairCount = (gridSize * gridSize) / 2;
    console.log("🚀 ~ initializeBoard ~ pairCount:", pairCount);
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let selectedCharacters = characters.slice(0, pairCount).split("");
    let gameCharacters = [...selectedCharacters, ...selectedCharacters];
    gameCharacters = gameCharacters.sort(() => Math.random() - 0.5);
    setBoard(gameCharacters);
    setMatched([]);
    setFlipped([]);
  };
  useEffect(() => {
    initializeBoard();
  }, [gridSize]);

  const handleFlip = (index) => {
    if (isProcessing || matched.includes(index) || flipped.includes(index))
      return;

    setFlipped((prevFlipped) => [...prevFlipped, index]);

    if (flipped.length === 1) {
      setIsProcessing(true);
      const firstIndex = flipped[0];
      const secondIndex = index;

      if (board[firstIndex] === board[secondIndex]) {
        setMatched((prevMatched) => [...prevMatched, firstIndex, secondIndex]);
        setFlipped([]);
        setIsProcessing(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setIsProcessing(false);
        }, 1000); // Đóng lại sau 1 giây nếu không khớp
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-auto mx-auto flex-container bg-slate-100 w-full max-w-[600px]">
        <div
          className="grid gap-3 mx-auto w-full max-w-[600px] max-h-[600px]"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {board.map((char, index) => (
            <div
              key={index}
              className={` boardItem ${
                flipped.includes(index) || matched.includes(index)
                  ? "flipped"
                  : ""
              }`}
              onClick={() => handleFlip(index)}
            >
              {flipped.includes(index) || matched.includes(index) ? char : "?"}
            </div>
          ))}
        </div>
      </div>
      {matched.length == board.length && matched.length > 0 && (
        <div className="mx-auto mt-8 text-4xl font-bold text-green-500 w-fit">
          You Win
        </div>
      )}
    </div>
  );
};
MemoryGame.propTypes = {
  gridSize: PropTypes.oneOf([2, 4, 6]),
};
export default MemoryGame;
