import { useEffect, useState } from "react";
import { fetchData } from "./httpRequest";

import { Route, Routes } from "react-router-dom";
import PutData from "./components/PutData";
import Home from "./components/Home";
function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData()
      .then((data) => setItems(data))
      .catch((error) => console.error("Failed to fetch items:", error));
  }, []);

  return (
    <>
    <Routes>
      <Route path="/" element={<Home items={items} setItems={setItems}/>} />
      <Route path="/:id" element={<PutData items={items} setItems={setItems}/>} />
    </Routes>
    </>
  );
}

export default App;
