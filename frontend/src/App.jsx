import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css"; // tech/violet theme CSS
import IssueForm from "./components/IssueForm";
import VerifyForm from "./components/VerifyForm";

// Replace with your deployed contract address & ABI after deploy
const CONTRACT_ADDRESS = "0x3e2F1873fC99F28B95Cd2ECC346C3f3CF8300D2a";
const CONTRACT_ABI = [
  // minimal ABI - relevant fragments
  "function issueCertificate(bytes32 certHash, string calldata meta) external",
  "function revokeCertificate(bytes32 certHash) external",
  "function verifyCertificate(bytes32 certHash) external view returns (bool,address,uint256,string,bool)"
];

function keccak256String(str) {
  return ethers.keccak256(ethers.toUtf8Bytes(str));
}

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    studentName: "",
    certId: "",
    course: "",
    issuedDate: "",
    meta: ""
  });

  async function connectWallet() {
    if (!window.ethereum) return alert("Please install MetaMask");
    const p = new ethers.BrowserProvider(window.ethereum);
    await p.send("eth_requestAccounts", []);
    const s = await p.getSigner();
    const addr = await s.getAddress();
    const c = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, s);
    setProvider(p);
    setSigner(s);
    setAccount(addr);
    setContract(c);
    setStatus("Wallet connected: " + addr);
  }

  function buildInputString() {
    const { studentName, certId, course, issuedDate } = form;
    // deterministic delimiter
    return `${studentName}|${certId}|${course}|${issuedDate}`;
  }

  function computeHash() {
    const input = buildInputString();
    return keccak256String(input);
  }

  async function handleRevoke() {
    if (!contract) return alert("Connect wallet first");
    const input = buildInputString();
    const hash = keccak256String(input);
    try {
      setStatus("Sending revoke tx...");
      const tx = await contract.revokeCertificate(hash);
      await tx.wait();
      setStatus("Certificate revoked: " + hash);
    } catch (err) {
      console.error(err);
      setStatus("Error revoking: " + (err?.message || err));
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>BlockCert Verify</h1>
        <p className="sub">Fast certificate authenticity verification — Tech Theme</p>
        <button className="btn" onClick={connectWallet}>
          {account ? `Connected: ${account.slice(0,6)}...${account.slice(-4)}` : "Connect Wallet"}
        </button>
      </header>

      <main className="container">
        <section className="card">
          <h2>Certificate Details</h2>
          <input placeholder="Student Name" value={form.studentName} onChange={e=>setForm({...form, studentName:e.target.value})}/>
          <input placeholder="Certificate ID" value={form.certId} onChange={e=>setForm({...form, certId:e.target.value})}/>
          <input placeholder="Course/Program" value={form.course} onChange={e=>setForm({...form, course:e.target.value})}/>
          <input placeholder="Issued Date (YYYY-MM-DD)" value={form.issuedDate} onChange={e=>setForm({...form, issuedDate:e.target.value})}/>
          <div className="row">
            <button className="btn outline" type="button" onClick={handleRevoke}>Revoke (issuer only)</button>
            <button className="btn outline" onClick={()=>{
              const hash = computeHash();
              setStatus("Computed hash: " + hash);
            }}>Compute Hash</button>
          </div>
          <p className="status">{status}</p>
        </section>

        {contract && (
          <>
            <IssueForm contract={contract} computeHash={computeHash} />
            <VerifyForm contract={contract} />
          </>
        )}
      </main>

      <footer className="footer">
        <small>Tip: Use the same input order to compute the hash off-chain and on-chain.</small>
      </footer>
    </div>
  );
}

export default App;
