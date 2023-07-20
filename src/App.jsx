import { useEffect, useState } from "react";
import { fetchData } from "./httpRequest";
import PostData from "./components/PostData";
import { Route, Routes } from "react-router-dom";
import PutData from "./components/PutData";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import useItem from "./hooks/useItem";
function App() {
  const [items, setItems] = useState([]);
  const {state}=useItem()

  useEffect(() => {
    fetchData()
      .then((data) => setItems(data))
      .catch((error) => console.error("Failed to fetch items:", error));
  }, [state.likeDislikeStatus]);

  return (
    <>
    <Routes>
  
      <Route path="/" element={<PrivateRoutes><Home items={items} setItems={setItems}/></PrivateRoutes>} />
      <Route path="/post" element={<PrivateRoutes><PostData items={items} setItems={setItems}/></PrivateRoutes>} />
      <Route path="/:id" element={<PrivateRoutes><PutData items={items} setItems={setItems}/></PrivateRoutes>} />
   
    
    <Route path="/login" element={<PublicRoutes><Login/></PublicRoutes>
      } />
      <Route path="/signup" element={<PublicRoutes><Signup/></PublicRoutes>} />
   
    
    </Routes>
    </>
  );
}

export default App;
