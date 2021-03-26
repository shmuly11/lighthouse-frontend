import './App.css';
import {Switch, Route} from 'react-router-dom'
import Login from './Login'
import Main from './Main'
import NewTemplateForm from './NewTemplateForm'
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
      <Route exact path="/new_template"> 
        {user ? <NewTemplateForm /> : <Login />}
      </Route>

    </Switch>
    </>
  );
}

export default App;
