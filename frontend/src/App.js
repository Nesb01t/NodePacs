import './App.css';
import background from './background.webp';
import BkgIcon from './component/BkgIcon';

function App() {
  return (
    <div className="App">

      <BkgIcon></BkgIcon>
      Learn React
      <img className="Background" src={background} alt="bkg"></img>
    </div>
  );
}


export default App;
