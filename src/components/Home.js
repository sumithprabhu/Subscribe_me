import "./home.css";
import {SubscriptionBtn,UnsubscribeBtn} from "./index"
import { images } from "../constants";
const home=()=>{
    return (
    <div>
    <div className="home" >
        <div className="img">
<img src={images.logo1}/>
        </div>
        <div className="description">
            <p>This is the demo page to describe working of SUBSCRIBE ME .</p>
        </div>
        <div className="content">
    <SubscriptionBtn receiver={'0x49403ae592C82fc3f861cD0b9738f7524Fb1F38C'} subprice={500} name={"SuperPush"}/>
    <UnsubscribeBtn receiver={'0x49403ae592C82fc3f861cD0b9738f7524Fb1F38C'} subprice={500} name={"SuperPush"}/>
    </div>
    </div>
    <div className="purple" >
        <div className="content1">
        <h1> Demo page </h1>
        <p> Just to make the website multipage</p>
        </div>
    </div>
    </div>
    )
}
export default home;