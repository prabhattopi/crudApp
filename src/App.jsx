import { useEffect, useState } from "react";
import { fetchData } from "./httpRequest";
import PostData from "./components/PostData";
import { Route, Routes } from "react-router-dom";
import PutData from "./components/PutData";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData()
      .then((data) => setItems(data))
      .catch((error) => console.error("Failed to fetch items:", error));
  }, []);

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home items={items} setItems={setItems}/>} />
      <Route path="/post" element={<PostData items={items} setItems={setItems}/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/:id" element={<PutData items={items} setItems={setItems}/>} />
    </Routes>
    </>
  );
}

export default App;
