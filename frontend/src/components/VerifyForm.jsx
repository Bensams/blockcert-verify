import React, { useEffect, useState } from "react";
import QRDisplay from "./QRDisplay";

export default function VerifyForm({ contract }) {
  const [verifyHash, setVerifyHash] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("");

  async function performVerify(hash) {
    if (!hash) return;
    if (!contract) return;
    try {
      setStatus("Verifying...");
      const res = await contract.verifyCertificate(hash);
      setResult({
        exists: res[0],
        issuer: res[1],
        issuedAt: new Date(Number(res[2]) * 1000).toLocaleString(),
        meta: res[3],
        revoked: res[4],
      });
      setStatus("Done");
    } catch (err) {
      console.error(err);
      setStatus("Error verifying: " + (err?.message || err));
    }
  }

  async function handleVerify() {
    const hash = verifyHash.trim();
    if (!hash) return alert("Enter certificate hash");
    await performVerify(hash);
  }

  useEffect(() => {
    if (!contract) return;
    const params = new URLSearchParams(window.location.search);
    const hashParam = params.get("hash");
    if (hashParam) {
      setVerifyHash(hashParam);
      performVerify(hashParam);
    }
  }, [contract]);

  return (
    <div className="card">
      <h2>Verify Certificate</h2>
      <input value={verifyHash} onChange={e=>setVerifyHash(e.target.value)} placeholder="Certificate Hash"/>
      <button className="btn" onClick={handleVerify}>Verify</button>
      <p className="status">{status}</p>

      {result && (
        <div className="result">
          <p><strong>Exists:</strong> {String(result.exists)}</p>
          <p><strong>Issuer:</strong> {result.issuer}</p>
          <p><strong>Issued At:</strong> {result.issuedAt}</p>
          <p><strong>Meta:</strong> {result.meta}</p>
          <p><strong>Revoked:</strong> {String(result.revoked)}</p>
        </div>
      )}

      <QRDisplay hash={verifyHash} />
    </div>
  );
}

