import "./home.css";
import {SubscriptionBtn} from "./index"
const home=()=>{
    return (
    <div>
    <div className="red" >
    <SubscriptionBtn receiver={'0xe701C317d677F9C54ACf59b5a5dbaDCfAa0AF2e0'} subprice={500} name={"SuperPush"}/>
    </div>
    <div className="green" ></div>
    </div>
    )
}
export default home;