import './App.css';
import Register from "./client/components/Register";
import Login from "./client/components/Login";
import Home from './client/components/Home';

import { Routes, Route } from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient} >
            <Routes>
                <Route path={'/register'} element={<Register />}/>
                <Route path={'/login'} element={<Login />}/>
                <Route path={'/home'} element={<Home />}/>
            </Routes>
        </QueryClientProvider>
  );
}

export default App;
