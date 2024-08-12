import React, { useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { IoCloseCircle } from "react-icons/io5";
import Button1 from "./Button1";
import { usePop } from "../contextApi/PopContext";
import { useAuth } from "../contextApi/AuthContext";

const PayToWatch = () => {
  const { openPay, setOpenPay } = usePop();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const { setPaymentReference } = useAuth();

  const payWithPaystack = (e) => {
    e.preventDefault();
    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: "pk_test_03a9ea60a6f19db8525e4801a53eb89a7f284d5c",
      email: email,
      amount: amount * 100,

      onSuccess(transaction) {
        alert(`Payment successful with reference ${transaction.reference}`);
        setPaymentReference(transaction.reference);
        localStorage.setItem("payment_reference", transaction.reference);
      },
      onCancel() {
        alert("Payment cancelled");
      },
    });
  };

  return (
    <div className="paystack">
      <div className="close" onClick={() => setOpenPay(!openPay)}>
        <IoCloseCircle size={54} color="#fff" />
      </div>
      <form onSubmit={payWithPaystack}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputs"
          />
        </div>
        <div className="container">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            placeholder="Amount (in Naira)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="inputs"
          />
        </div>
        <Button1>Pay Now</Button1>
      </form>
    </div>
  );
};

export default PayToWatch;
