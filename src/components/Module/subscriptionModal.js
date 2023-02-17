import React, { useState, useEffect } from "react";
import "./subscriptionModal.css";

import Lottie from "lottie-react";
import { images } from "../../constants";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const SubscriptionModal = ({receiver,subprice,name}) =>{
  let account;
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
      account = currentAccount;
    } catch (error) {
      console.log(error);
    }
  };
  connectWallet();

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
    setTimeout(() => {
      checksubscription();
    }, 12000);
  }

  if (isSubscribed) {
    setTimeout(() => {
      setModal(false);
    }, 5000);
  }
  if (wrong) {
    setTimeout(() => {
      setsubscribe(true);
      setwrong(false);
    }, 7000);
  }

  if (inprogress) {
    setTimeout(() => {
      setsubscribe(false);
      setcheckingSubscription(true);
    }, 10000);
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

  async function createNewFlow() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider,
    });

    const superSigner = sf.createSigner({ signer: signer });

    console.log(signer);
    console.log(await superSigner.getAddress());
    const daix = await sf.loadSuperToken("fDAIx");

    console.log(daix);

    try {
      const send = await superSigner.getAddress();
      const createFlowOperation = daix.createFlow({
        sender: send,
        receiver: receiver,
        flowRate: Math.round((subprice * 10 ** 18) / (3600 * 24 * 30)),
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

  function Createbutton() {
    return (
      <div>
        <button className="btn" onClick={createNewFlow}>Subscribe for ${subprice} Daix/month</button>
      </div>
    );
  }

  return (
    <>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div className="header">
              <p>Subscribe me</p>
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
                <p className="content">You are subscribed and good to go</p>
              </div>
            )}
            {wrong && (
              <div className="animation1" >
                <Lottie className="animation" animationData={images.redcross} />
                <p className="content">You are not subscribed</p>
                <p className="content">Redirecting towards subscription page</p>
              </div>
            )}
            {subscribe && (
              <div className="animation1">
                <h1 className="name">{name}</h1>
                <div className="scontent">Loving my content then go ahead hit the subscribe button</div>
                <Createbutton className="btn" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SubscriptionModal;
