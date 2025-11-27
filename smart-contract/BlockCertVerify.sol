// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BlockCertVerify {
    struct Certificate {
        address issuer;     // who issued it
        uint256 issuedAt;   // timestamp
        string meta;        // optional metadata (e.g., "B.S. IT - 2025")
        bool revoked;       // revocation flag
    }

    // certHash -> Certificate
    mapping(bytes32 => Certificate) public certificates;

    // events
    event CertificateIssued(bytes32 indexed certHash, address indexed issuer, uint256 issuedAt, string meta);
    event CertificateRevoked(bytes32 indexed certHash, address indexed issuer, uint256 revokedAt);

    /// @notice Issue a certificate by storing its hash on-chain
    /// @param certHash keccak256 hash of the certificate data (off-chain doc bytes or ID)
    /// @param meta short metadata string (optional)
    function issueCertificate(bytes32 certHash, string calldata meta) external {
        Certificate storage c = certificates[certHash];
        require(c.issuedAt == 0, "Certificate already issued");

        c.issuer = msg.sender;
        c.issuedAt = block.timestamp;
        c.meta = meta;
        c.revoked = false;

        emit CertificateIssued(certHash, msg.sender, block.timestamp, meta);
    }

    /// @notice Revoke a certificate (only the original issuer can revoke)
    /// @param certHash certificate hash to revoke
    function revokeCertificate(bytes32 certHash) external {
        Certificate storage c = certificates[certHash];
        require(c.issuedAt != 0, "Certificate not found");
        require(!c.revoked, "Already revoked");
        require(c.issuer == msg.sender, "Only issuer can revoke");

        c.revoked = true;
        emit CertificateRevoked(certHash, msg.sender, block.timestamp);
    }

    /// @notice Check certificate status. Returns (exists, issuer, issuedAt, meta, revoked)
    function verifyCertificate(bytes32 certHash) external view returns (bool exists, address issuer, uint256 issuedAt, string memory meta, bool revoked) {
        Certificate storage c = certificates[certHash];
        exists = (c.issuedAt != 0);
        issuer = c.issuer;
        issuedAt = c.issuedAt;
        meta = c.meta;
        revoked = c.revoked;
    }
}
