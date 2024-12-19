
import React from 'react';
import { requestAccounts } from './requestAccounts.js';
import { useState } from 'react';
import { ConnectKitButton } from "connectkit";
import { Box, Button, Flex } from "theme-ui";
import { Icon } from "../Icon.js";
import { pelagusConnector } from '../../providers/pelagusConnector.js';
import { useQuaisSigner } from '../../providers/useQuaisProvider.js';
import { useConfig } from 'wagmi';

interface WalletPelagusConnectorProps {
    onConnected: (connected: boolean) => void
}

const WalletPelagusConnector = (props: WalletPelagusConnectorProps) => {

    const config = useConfig();
   
    const handleConnect = async () => {
        if (window.pelagus) {
            const result = await config.connectors[0].connect()
            props.onConnected(!!result)
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