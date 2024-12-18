
import React from 'react';
import { requestAccounts } from './requestAccounts.js';
import { useState } from 'react';
import { ConnectKitButton } from "connectkit";
import { Box, Button, Flex } from "theme-ui";
import { Icon } from "../Icon.js";
import { pelagusConnector } from '../../providers/pelagusConnector.js';
import { useQuaisSigner } from '../../providers/useQuaisProvider.js';
const WalletPelagusConnector = () => {

    const handleConnect = () => {
        if (window.pelagus) {
            const signer = useQuaisSigner({ chainId: 9000 });
            
        }
        else {
            window.location.href = "https://chromewebstore.google.com/detail/pelagus/nhccebmfjcbhghphpclcfdkkekheegop";
        }
    };

    return (
        <Flex sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
              <Button onClick={handleConnect}>
                <Icon name="plug" size="lg" />
                <Box sx={{ ml: 2 }}>Connect wallet</Box>
              </Button>
        </Flex>
    );
};

export default WalletPelagusConnector;