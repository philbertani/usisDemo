import './App.css';
import {useStore} from "react-redux";
import { Main } from './components'

function App() {

  const redux = useStore();

  return ( <Main></Main>);

  /*
  return (
    <div className="App">
      {JSON.stringify(redux.getState())}
    </div>
  );
  */
  

}

export default App;
