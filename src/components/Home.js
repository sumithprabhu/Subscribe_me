import "./home.css";
import {SubscriptionBtn,UnsubscribeBtn} from "./index"

const home=()=>{
    return (
    <div>
    <div className="red" >
    <SubscriptionBtn receiver={'0x49403ae592C82fc3f861cD0b9738f7524Fb1F38C'} subprice={500} name={"SuperPush"}/>
    <UnsubscribeBtn receiver={'0x49403ae592C82fc3f861cD0b9738f7524Fb1F38C'} subprice={500} name={"SuperPush"}/>
    </div>
    <div className="green" ></div>
    </div>
    )
}
export default home;