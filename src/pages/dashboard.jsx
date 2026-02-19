import { useEffect, useState } from "react";
import algosdk from "algosdk";

const algodClient = new algosdk.Algodv2(
  "",
  "https://testnet-api.algonode.cloud",
  ""
);

function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const address = localStorage.getItem("address");

  const privateKey = new Uint8Array(
    JSON.parse(localStorage.getItem("privateKey"))
  );

  // Fetch Balance
  const fetchBalance = async () => {
    try {
      const response = await fetch(
        `https://testnet-api.algonode.cloud/v2/accounts/${address}`
      );
      const data = await response.json();

      if (data.amount !== undefined) {
        setBalance(data.amount / 1_000_000);
      }
    } catch (err) {
      console.error("Balance error:", err);
    }
  };

  useEffect(() => {
    if (address) fetchBalance();
  }, []);

  // Send ALGO
  const sendAlgo = async () => {
    try {
      if (!recipient || !amount) {
        alert("Enter recipient and amount");
        return;
      }

      const params = await algodClient.getTransactionParams().do();

      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        sender: address,
        receiver: recipient.trim(),
        amount: Math.floor(Number(amount) * 1_000_000),
        suggestedParams: params,
      });

      const signedTxn = txn.signTxn(privateKey);

      const sendResponse = await algodClient
        .sendRawTransaction(signedTxn)
        .do();

      console.log("Transaction Sent:", sendResponse);

      alert("Transaction Submitted Successfully!");

      // Wait 3 seconds then refresh balance
      setTimeout(() => {
        fetchBalance();
      }, 3000);

      setRecipient("");
      setAmount("");

    } catch (err) {
      console.error("Transaction error:", err);
      alert("Transaction Failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Dashboard</h2>

      <p><strong>Wallet:</strong> {address}</p>
      <p><strong>Balance:</strong> {balance} ALGO</p>

      <hr style={{ margin: "30px" }} />

      <h3>Send ALGO</h3>

      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={{ width: "400px", padding: "8px" }}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Amount (ALGO)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "8px" }}
      />

      <br /><br />

      <button onClick={sendAlgo} style={{ padding: "10px 20px" }}>
        Send
      </button>
    </div>
  );
}

export default Dashboard;
