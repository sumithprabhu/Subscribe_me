import React, { useState, useEffect } from "react";
import "./Module.css";

import Lottie from "lottie-react";
import { images } from "../../constants";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

export default function Modal() {
  let account;
  const [currentAccount, setCurrentAccount] = useState("");
  const [modal, setModal] = useState(false);
  const [checkingSubscription, setcheckingSubscription] = useState(true);
  const [isSubscribed, setisSubscribed] = useState(false);
  const[wrong,setwrong]= useState(false);
  const [subscribe , setsubscribe]=useState(false);
  const [inprogress,setinprogress]=useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      toggleModal();
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (checkingSubscription) {
    setTimeout(()=>{
      checksubscription();
          },12000)
  }

  if (isSubscribed) {
    setTimeout(()=>{
setModal(false)
    },5000)
  }
  if (wrong) {
    setTimeout(()=>{
      setsubscribe(true)
      setwrong(false)
    },10000)
  }
  
  if(inprogress){
    setTimeout(() => {
      setsubscribe(false);
      setcheckingSubscription(true);
    }, 10000);
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      account = currentAccount;
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      // setupEventListener()
    } catch (error) {
      console.log(error);
    }
  };

  async function checksubscription() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider,
    });
    const daix = await sf.loadSuperToken("fDAIx");
    // const daix = await sf.loadSuperToken("DAIx");
    const signer = provider.getSigner();
    let fr = await daix.getFlow({
      sender: "0x49403ae592C82fc3f861cD0b9738f7524Fb1F38C",
      receiver: "0xe701C317d677F9C54ACf59b5a5dbaDCfAa0AF2e0",
      providerOrSigner: signer,
      // providerOrSigner: ethers.providers.Provider | ethers.Signer
    });
    console.log(fr.flowRate);
    let frm = Math.round((fr.flowRate * (3600 * 24 * 30)) / 10 ** 18);
    console.log(frm);
    if ((frm == 500)) {
      setisSubscribed(true);
      setcheckingSubscription(false);
    }
    else{
      setwrong(true);
      setcheckingSubscription(false);
      setisSubscribed(false);
      setsubscribe(false)
      
    }
  }

  async function createNewFlow() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
  
    const signer = provider.getSigner();
  
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider
    });
  
    const superSigner = sf.createSigner({ signer: signer });
  
    console.log(signer);
    console.log(await superSigner.getAddress());
    const daix = await sf.loadSuperToken("fDAIx");
  
    console.log(daix);
  
    try {
      const send=await superSigner.getAddress();
      const createFlowOperation = daix.createFlow({
        sender: send,
        receiver: "0xe701C317d677F9C54ACf59b5a5dbaDCfAa0AF2e0",
        flowRate: Math.round((500*(10**18))/(3600*24*30))
        // userData?: string
      });
  
     
      console.log("Creating your stream...");
      const result = await createFlowOperation.exec(superSigner);
      setinprogress(true);
      //setinprogress(true);
      console.log(result);
      console.log(
        `Congrats - you've just created a money stream!
      `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      
      console.error(error);
    }
  }


function Createbutton (){
  return(
    <div>
      <button onClick={createNewFlow}>Hello</button>
    </div>
  )
}

  return (
    <>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            {currentAccount === "" ? (
              <button
                id="connectWallet"
                className="button1"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            ) : (
              <button className="button1">
                {`${currentAccount.substring(
                  0,
                  4
                )}...${currentAccount.substring(38)}`}
              </button>
            )}

            {checkingSubscription && <div className="animation1"><Lottie animationData={images.loading} /></div>}

            {isSubscribed && (
              <div className="animation1" on>
                <Lottie animationData={images.greentick} />
                <p>You are already subscribed</p>
              </div>
            )}
            {wrong && (
              <div className="animation1" on>
                <Lottie animationData={images.redcross} />
                <p>You are already subscribed</p>
              </div>
            )}
            {subscribe &&(
              <div className="animation1">
              <div>hello</div>
              <Createbutton />
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
