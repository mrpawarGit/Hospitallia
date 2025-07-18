import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {" "}
      <h1 className="text-3xl font-bold text-blue-600 text-center mt-10">
        Hospital Management App
      </h1>
    </>
  );
}

export default App;
