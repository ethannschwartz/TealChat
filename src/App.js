import './App.css';
import Register from "./client/components/Register";
import Login from "./client/components/Login";
import Home from './client/components/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    return (
    <div className="App">
        <Router>
            <Routes>
                <Route path={'/register'} element={<Register />}/>
                <Route path={'/login'} element={<Login />}/>
                <Route path={'/home'} element={<Home />}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
