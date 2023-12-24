import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import NoteState from './context/notes/NoteState';
import AuthState from './context/auth/AuthState';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (type,message)=> {
    setAlert({
      type: type,
      message: message
    });
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
      <Router>
        <NoteState showAlert={showAlert}>
          <AuthState showAlert={showAlert}>
            <Navbar showAlert={showAlert}/>
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/signup" element={<Signup />}></Route>
              </Routes>
            </div>
          </AuthState>
        </NoteState>
      </Router>
    </>
  );
}

export default App;