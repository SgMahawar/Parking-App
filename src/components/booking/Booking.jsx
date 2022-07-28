import "./booking.css";
import React from 'react'
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import GooglePayButton from "@google-pay/button-react";

export default function BookingPopup() {
  const space=JSON.parse(localStorage.getItem("space"));
  var slot=localStorage.getItem("slot");
  space.bookings=[slot];
  useEffect(()=>{
    localStorage.setItem("bill",100);
  },[]);
  const date=slot.substring(0,10);
  slot=slot.substring(11);
  const ss=slot;
  console.log(space);
  const id=space.id;
  // var wash=false,air=false,service=false;
  const setAir=()=>{
    const b=parseInt(localStorage.getItem("bill"))+10;
    localStorage.setItem("bill",b);
  }
  const setWash=()=>{
    const b=parseInt(localStorage.getItem("bill"))+50;
    localStorage.setItem("bill",b);
  }
  const setService=()=>{
    const b=parseInt(localStorage.getItem("bill"))+100;
    localStorage.setItem("bill",b);
  }
  const calcTotal=(e)=>{
    // e.preventDefault();
  }
  const payLater=async (e)=>{
    // e.preventDefault();
    const res=await axios.post("http://localhost:8080/space/update",space);
    console.log(res.data);
    window.location="/dashboard";
  }
  
  return (
    <div className="booking">
      <div className="confirmationFormDiv">
        <form className="confirmationForm">
          <p>Selected Space: {space.spaceNumber}</p>
          <p>Selected Date: {date}</p>
          <p>Selected Slot: {slot}</p>
            
            <p>Add Extra Services:</p>
            <div className="options">
          <input type="checkbox" onChange={()=>setAir(true)} />
            
          <label>Air Filling</label>
          </div>
          <div className="options">
          <input type="checkbox" onChange={()=>setWash(true)} />
          
          <label>Car Wash</label></div>
          <div className="options">
          
          <input type="checkbox" onChange={()=>setService(true)} />
          <label>Tyre Servicing</label>
          </div>
          <div className="options">
          <label>Total Cost: </label>
          <label>{localStorage.getItem("bill")}</label>
          </div>
          
          <button className="calcTotal" type="submit" onClick={()=>calcTotal()}>Calculate Total</button>
          <button className="calcTotal" onClick={()=>payLater()} >Pay At Counter</button>
          <GooglePayButton
            buttonType="pay"
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: 'CARD',
                  parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['MASTERCARD', 'VISA'],
                  },
                  tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    parameters: {
                      gateway: 'example',
                      gatewayMerchantId: 'exampleGatewayMerchantId',
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: '12345678901234567890',
                merchantName: 'Demo Merchant',
              },
              transactionInfo: {
                totalPriceStatus: 'FINAL',
                totalPriceLabel: 'Total',
                totalPrice: "101",
                currencyCode: 'INR',
                countryCode: 'IN',
              },
              shippingAddressRequired: false,
              shippingOptionRequired: false,
            }}
            onLoadPaymentData={paymentRequest => {
              console.log('Payment Successful', paymentRequest);
            }}
          >Pay using GPay</GooglePayButton>
        </form>
      </div>
    </div>
  )
}
