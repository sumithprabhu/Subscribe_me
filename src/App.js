import logo from './logo.svg';
import './App.css';
import {Home,SubscriptionModal} from "./components/index"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      {/* <SubscriptionModal receiver={'0xe701C317d677F9C54ACf59b5a5dbaDCfAa0AF2e0'} subprice={500} name={"SuperPush"} /> */}
        <Home />
        
      </header>
    </div>
  );
}

export default App;
