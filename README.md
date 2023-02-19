
# Subscribe Me

Subscribe me is an module package that can be used by other DApps to integrate a model through which users can buy and cancel subscription of their product and get notified with Push Notifications for every updated actions.

This project uses Superfluid SDK to create and delete stream as part of subscription, that is whenever a subscription is bought a stream is created ,from user to the DApp owner and vice versa. Also notifications are provided after opting in to Subscribe me channel on staging.push.org and this functionality is acheived by Push protocol SDK. 

Currently there are three modules:
- **SubscriptionBtn** : This is button module which help user to subscribe to the DApp and is closable that is the module can be closed without subscribing.
- **UnsubscribeBtn** : This is button module which help user to unsubscribe to the DApp and is closable that is the module can be closed without unsubscribing.
- **SubscriptionModal** : This is modal which pops up and blocks the screen of the DApp, and is used to subscribe . Also the modal only closes when the valid subscription is done.


## Features

- Buy subscription
- Cancel subscription
- Notified for every actions on dApp.
- User only pay for the amount of time DApp feed is consumed.


## Problem it solves:

**Cost effective** : Users only have to pay for the dedicated amount of time they use the DApp , That is they can subscribe whenever needed and can unsubscribe whenever not needed , they are just needed to pay equivalent amount of price .

**Integration** : Managing subscriptions across different dApps can be complex and time-consuming for developers, who must build custom solutions for each platform. The subscription dApp would provide a standardized module that developers can easily integrate with their code to manage subscriptions in a concise manner.

**Security** : This dApp would leverage blockchain technology to provide secure storage and management of subscription data, protecting user data from potential security breaches and unauthorized access.

**Notifications** : Keeping users informed about the status of their subscriptions is important to prevent billing issues or other subscription-related problems. This dApp would provide Push notifications for subscription-related events, keeping users informed and up-to-date on the status of their subscriptions.

## Challenges faced:
As part of Challenges,

  - Finding suitable Superfluid SDK function.
  - Struggled with react hooks.
  - Got error from server side while sending notifications on Push protocol SDK.
  - Was not able to add code to NPM package
  
  Although all errors are solved now, and the project is up and running.

## Project Link:

```
https://subscribe-me.netlify.app/
```


## Run Project:
To Run this project on your local system , follow the below steps:

  1) Fetch/copy three folders that is assets,constants,components from the repo

    https://github.com/sumithprabhu/Subscribe_me

  2) Install the Dependencies from the top of the file of the module to be used.

  3) Import the file at the top of your code. eg,
  
    import {SubscriptionBtn,UnsubscribeBtn,SubscriptionModal} from "../Components/index" 
  4) Now add the module tag in your code with passing suitable parameters to the tag
  
     ```
     <SubscriptionBtn receiver={'RECEIVERS_ADDRESS'} subprice={SUBSCRIPTION_PRICE} name={"DAPP_NAME"}/>
     ```
     ```
     <UnsubscribeBtn receiver={'RECEIVERS_ADDRESS'} subprice={SUBSCRIPTION_PRICE} name={"DAPP_NAME"}/>
     ```
     ```
     <SubscriptionModal receiver={'RECEIVERS_ADDRESS'} subprice={SUBSCRIPTION_PRICE} name={"DAPP_NAME"}/>
     ```
  
## Screenshots

![App Screenshot](https://github.com/sumithprabhu/npm_modal_demo/blob/main/src/images/Screenshot_20230219_125144.png?raw=true)
![App Screenshot](https://github.com/sumithprabhu/npm_modal_demo/blob/main/src/images/Screenshot_20230219_174654.png?raw=true)
![App Screenshot](https://github.com/sumithprabhu/npm_modal_demo/blob/main/src/images/Screenshot_20230219_174709.png?raw=true)
![App Screenshot](https://github.com/sumithprabhu/npm_modal_demo/blob/main/src/images/Screenshot_20230219_174833.png?raw=true)
![App Screenshot](https://github.com/sumithprabhu/npm_modal_demo/blob/main/src/images/Screenshot_20230219_174854.png?raw=true)


