
import React from 'react';
import { requestAccounts } from './requestAccounts.js';
import { useState } from 'react';

const WalletPelagusConnector = () => {
    const [accounts, setAccounts] = useState([]);

    const handleConnect = () => {
        if (window.pelagus) {
            requestAccounts().then((accounts) => {
                return setAccounts(accounts);
            });
        }
        else {
            window.location.href = "https://chromewebstore.google.com/detail/pelagus/nhccebmfjcbhghphpclcfdkkekheegop";
        }
    };

    return (
        <button onClick={handleConnect}>
            {/* {accounts.length > 0 ? 'Connected' : 'Connect'} */}
            Connect 
        </button>
    );
};

export default WalletPelagusConnector;