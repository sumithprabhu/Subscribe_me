import React, { useState, useEffect } from "react";
import "./Module.css";
import { WifiLoader } from "../index";
import Lottie from "lottie-react";
import { images } from "../../constants";

export default function Modal() {
  let account;
  const [currentAccount, setCurrentAccount] = useState("");
  const [modal, setModal] = useState(false);
  const [checkingSubscription, setcheckingSubscription] = useState(true);
  const [isSubscribed, setisSubscribed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      toggleModal();
    }, 10000);
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

  function checksubscription() {}

  return (
    <>
      {modal && (
        <div className="modal">
          {/* <div onClick={toggleModal} className="overlay"></div> */}
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
            {checkingSubscription &&(
              <WifiLoader />
            )}
            {/* <Lottie animationData={images.greentick} /> */}
          </div>
        </div>
      )}
    </>
  );
}
