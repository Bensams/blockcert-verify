import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRDisplay({ hash }) {
  if (!hash) return null;

  const verifyUrl = `${window.location.origin}?hash=${hash}`;

  return (
    <div style={{marginTop:"12px", textAlign:"center"}}>
      <p>Scan to Verify:</p>
      <QRCodeCanvas value={verifyUrl} size={160} />
      <p style={{fontSize:"0.7rem", wordBreak:"break-all", color:"#9aa2bf"}}>{verifyUrl}</p>
    </div>
  );
}
