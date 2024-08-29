import { useState } from "react";
import "./App.css";
import MemoryGame from "./components/MemoryGame/MemoryGame";

function App() {
  const [count, setCount] = useState(0);
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    setCount(data.count);
  };
  return (
    <>
      <h1 className="mx-auto mb-5 text-2xl font-bold">Memory Game</h1>
      <form action="" onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col">
          <label htmlFor="count">Enter the number of rows and columns</label>
          <input
            type="number"
            id="count"
            name="count"
            placeholder="Enter 2, 4, or 6"
            className="px-6 py-3 mx-auto mt-5 border rounded-lg outline-none border-slate-300 w-fit"
          />
        </div>
      </form>
      <MemoryGame gridSize={Number(count)}></MemoryGame>
    </>
  );
}

export default App;
