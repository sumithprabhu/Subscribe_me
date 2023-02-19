import logo from './logo.svg';
import './App.css';
import {Home,SubscriptionModal} from "./components/index"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      {/* <SubscriptionModal receiver={'0x49403ae592C82fc3f861cD0b9738f7524Fb1F38C'} subprice={500} name={"SuperPush"} /> */}
        <Home />
        
      </header>
    </div>
  );
}

export default App;
