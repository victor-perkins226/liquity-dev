import { ConnectKitButton } from "connectkit";
import { Box, Button, Flex } from "theme-ui";
import { Icon } from "./Icon";
import WalletPelagusConnector from './WalletPelagusConnector'
import { useEffect, useMemo, useState } from "react";
import { Connector, useConfig } from "wagmi";

type WalletConnectorProps = React.PropsWithChildren<{
  loader?: React.ReactNode;
}>;

export const WalletConnector: React.FC<WalletConnectorProps> = ({ children }) => {
  const [connected, setConnected] = useState(false)
  return (
    <>
      {
        connected ? children : <WalletPelagusConnector onConnected={setConnected}/>
      }
      
      {/* <ConnectKitButton.Custom>
        {connectKit =>
          connectKit.isConnected ? (
            children
          ) : (
            <Flex sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
              <Button onClick={connectKit.show}>
                <Icon name="plug" size="lg" />
                <Box sx={{ ml: 2 }}>Connect wallet</Box>
              </Button>
            </Flex>
          )
        }
      </ConnectKitButton.Custom> */}
    </>
  );
};
