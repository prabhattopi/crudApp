import PostData from "./components/PostData"
import { Route, Routes } from "react-router-dom"
import PutData from "./components/PutData"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Signup from "./components/Signup"
import PrivateRoutes from "./routes/PrivateRoutes"
import PublicRoutes from "./routes/PublicRoutes"
import SingleUser from "./pages/SingleUser"
import Members from "./pages/Members"
import useAuth from "./hooks/useAuth"
function App() {
  const {user}=useAuth()
  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path="/post"
          element={
            <PrivateRoutes>
              <PostData />
            </PrivateRoutes>
          }
        />
        <Route
          path="/:id"
          element={
            <PrivateRoutes>
              <PutData />
            </PrivateRoutes>
          }
        />
        <Route
          path="/single/:id"
          element={
            <PrivateRoutes>
              <SingleUser />
            </PrivateRoutes>
          }
        />
        <Route
          path="/members"
          element={
            <PrivateRoutes>
              <Members />
            </PrivateRoutes>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <Signup />
            </PublicRoutes>
          }
        />
      </Routes>
    </>
  )
}

export default App
