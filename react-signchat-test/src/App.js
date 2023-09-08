import './App.css';
import {Routes, Route} from 'react-router-dom';
import ChatPageComponent from './components/ChatPageComponent';
import LoginPageComponent from './components/LoginPageComponent';
import RegisterPageComponent from './components/RegisterPageComponent';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<ChatPageComponent />}/>
        <Route path='/login' element={<LoginPageComponent />}/>
        <Route path='/register' element={<RegisterPageComponent />}/>
      </Routes>
    </>
  );
}

export default App;