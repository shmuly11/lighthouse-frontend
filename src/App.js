import './App.css';
import {Switch, Route} from 'react-router-dom'
import Login from './Login'
import Main from './Main'
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(state => state.user)
  return (
    <>
   
    <Switch>
    <Route exact path="/"> 
        <Login/>
      </Route>
      <Route exact path="/main"> 
        {user ? <Main/> : <Login />}
        
      </Route>
    </Switch>
    </>
  );
}

export default App;
