import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import ConnectWalletModal from "@/components/ConnectWalletModal";
import "./header.less";

const Header: React.FC = () => {
  const { account, connector } = useWeb3React();

  const [showConnectModal, setShowConnectModal] = useState(false);

  const disconnect = () => {
    if (account && connector) {
      if (connector.deactivate) {
        connector.deactivate();
      }
      if (connector.resetState) {
        connector.resetState();
      }
    } else {
      checkConnectWallet(true);
    }
  };

  const checkConnectWallet = (is: boolean) => {
    setShowConnectModal(is);
  };

  const connectButtonText = account ? "Disconnect" : "Connect";

  return (
    <div className="header">
      {showConnectModal && <ConnectWalletModal checkConnectWallet={checkConnectWallet} />}
      <button className="connect-button" onClick={disconnect}>
        {connectButtonText}
      </button>
    </div>
  );
};

export default Header;
