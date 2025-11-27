import React, { useState } from "react";
import QRDisplay from "./QRDisplay";

function IssueForm({ contract, computeHash }) {
  const [status, setStatus] = useState("");
  const [issuedHash, setIssuedHash] = useState("");
  const [meta, setMeta] = useState("");

  async function handleIssue(e) {
    e.preventDefault();
    if (!contract) return alert("Connect wallet first");
    const hash = computeHash();
    try {
      setStatus("Submitting...");
      const tx = await contract.issueCertificate(hash, meta);
      await tx.wait();
      setIssuedHash(hash);
      setStatus("Issued successfully!");
    } catch (err) {
      console.error(err);
      setStatus("Issue failed: " + (err?.message || err));
    }
  }

  return (
    <div className="card">
      <h2>Issue Certificate</h2>
      <form onSubmit={handleIssue}>
        <input placeholder="Meta (e.g., honors) - optional" value={meta} onChange={e=>setMeta(e.target.value)}/>
        <button className="btn" type="submit">Issue</button>
      </form>
      <p className="status">{status}</p>
      
      {issuedHash && <QRDisplay hash={issuedHash} />}
    </div>
  );
}

export default IssueForm;
