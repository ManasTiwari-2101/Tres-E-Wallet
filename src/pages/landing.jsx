import algosdk from "algosdk";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const createWallet = () => {
    const account = algosdk.generateAccount();

    localStorage.setItem("address", account.addr);
    localStorage.setItem(
      "privateKey",
      JSON.stringify(Array.from(account.sk))
    );

    alert("Wallet Created Successfully!");
    navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Tres E-Wallet</h1>
      <button onClick={createWallet} style={{ padding: "10px 20px" }}>
        Create Wallet
      </button>
    </div>
  );
}

export default Landing;
