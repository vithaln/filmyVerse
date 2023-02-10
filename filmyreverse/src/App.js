import Cards from "./components/Cards";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Addmovies from "./components/Addmovies";
import Detail from "./components/Detail";
import { createContext, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";


const AppState=createContext();

function App() {
  const [login,setLogin]=useState(false);
  const [userName,setUserName]=useState("");

  return (

    <AppState.Provider  value={{login,userName,setLogin,setUserName}} >
    <div className="App relative">
      <Header />

      <Routes>
        <Route path="/" element={<Cards />}></Route>
        <Route path="/addmovie" element={<Addmovies />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>




      </Routes>
    </div>

    </AppState.Provider>
  );
}

export default App;
export {AppState} ;