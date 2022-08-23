import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import LoginForm from './LoginForm';
import CardIndex from './Card/cardIndex';



function App() {
  return (
    <Routes>
      <Route  path="/" element={<LoginForm />} />
      <Route path="/card" element={<CardIndex/>}/>
    </Routes>
  
  );
}

export default App;
