import './App.css';
import Register from "./client/Register";
import Login from "./client/Login";
import Home from './client/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path={'/register'} element={<Register />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/home'} element={<Home />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
