import React, { useState, useEffect } from "react";
import "./UnsubscribeBtn.css";

import Lottie from "lottie-react";
import { images } from "../../constants";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";




const UnsubscribeBtn = ({receiver,subprice,name}) =>{
  let account1;
  const [currentAccount, setCurrentAccount] = useState("");
  const [modal, setModal] = useState(false);
  const [checkingSubscription, setcheckingSubscription] = useState(true);
  const [isSubscribed, setisSubscribed] = useState(false);
  const [wrong, setwrong] = useState(false);
  const [subscribe, setsubscribe] = useState(false);
  const [inprogress, setinprogress] = useState(false);
 

  
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
      account1 = currentAccount;
    } catch (error) {
      console.log(error);
    }
  };
  connectWallet();

  const sendNotification = async(titlein, bodyin,recipientin) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
  
    const signer = provider.getSigner();
      try {
        const recipient = `eip155:5:${recipientin}`
        const apiResponse = await PushAPI.payloads.sendNotification({
          signer,
          type: 3, // target
          identityType: 2, // direct payload
          notification: {
            title: titlein,
            body: bodyin
          },
          payload: {
            title: titlein,
            body: bodyin,
            cta: '',
            img: ''
          },
          recipients: recipient, // recipient address
          channel: 'eip155:5:0xe701C317d677F9C54ACf59b5a5dbaDCfAa0AF2e0', // your channel address
          env: 'staging'
        });
        
        // apiResponse?.status === 204, if sent successfully!
        console.log('API repsonse: ', apiResponse);
      } catch (err) {
        console.error('Error: ', err);
      }
    }

  const toggleModal = () => {
    setModal(!modal);
  };
  

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (checkingSubscription & modal) {
    setTimeout(() => {
      checksubscription();
    }, 5000);
  }

  if (isSubscribed) {
    setTimeout(() => {
        setsubscribe(true);
        setisSubscribed(false);
      }, 5000);
    
  }
  if (wrong) {
    setTimeout(() => {
        setModal(false);
      }, 3000);
  }

  if (inprogress) {
    
    setTimeout(() => {
      setinprogress(false)
      toggleModal()
    }, 3000);
  }

  

  async function checksubscription() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider,
    });
    const daix = await sf.loadSuperToken("fDAIx");
    const signer = provider.getSigner();
    let fr = await daix.getFlow({
      sender: currentAccount,
      receiver: receiver,
      providerOrSigner: signer,
      // providerOrSigner: ethers.providers.Provider | ethers.Signer
    });
    console.log(fr.flowRate);
    let frm = Math.round((fr.flowRate * (3600 * 24 * 30)) / 10 ** 18);
    console.log(frm);
    if (frm == subprice) {
      setisSubscribed(true);
      setcheckingSubscription(false);
    } else {
      setwrong(true);
      setcheckingSubscription(false);
      setisSubscribed(false);
      setsubscribe(false);
    }
  }

  async function deleteExistingFlow() {
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
      const deleteFlowOperation = daix.deleteFlow({
        sender: send,
        receiver: receiver
        // userData?: string
      });
  
      console.log(deleteFlowOperation);
      console.log("Deleting your stream...");
  
      const result = await deleteFlowOperation.exec(superSigner);
    sendNotification("User unsubscribed",`User ${send} unsubscribed from ${name}`,receiver);
    sendNotification("Unsubscribed",`You just unsubscribed from ${name}`,send);
      
      setsubscribe(false);
      setinprogress(true);
      console.log(result);
  
      
      
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  function Createbutton() {
    return (
      <div>
        <button className="btn1" onClick={deleteExistingFlow}>Unsubscribe</button>
      </div>
    );
  }

  return (
    <>
    <button className="btn1" onClick={toggleModal}>Unsubscribe</button>
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <div className="header">
            <img className="img1" src={images.logo}/>
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
            </div>

            {checkingSubscription && (
              <div className="animation1">
                <Lottie animationData={images.loading} />
                <p className="content">Checking subscription status</p>
              </div>
            )}

            {isSubscribed && (
              <div className="animation1" on>
                <Lottie animationData={images.greentick} />
                <p className="content">You are subscribed</p>
                <p className="content">Redirecting to Unsubscription page</p>
              </div>
            )}
            {wrong && (
              <div className="animation1" >
                <Lottie className="animation" animationData={images.redcross} />
                <p className="content">You are not subscribed</p>
                
              </div>
            )}
            {subscribe && (
              <div className="animation1">
                <h1 className="name">{name}</h1>
                <div className="scontent">We are crying seeing you go</div>
                <Createbutton className="btn1" />
              </div>
            )}
            {inprogress &&(
              <div className="animation1">
              <Lottie animationData={images.greentick} />
              <p className="content">Unsubscribed succesfully</p>
              
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UnsubscribeBtn;
