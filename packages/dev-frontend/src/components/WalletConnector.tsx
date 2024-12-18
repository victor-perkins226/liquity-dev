import { ConnectKitButton } from "connectkit";
import { Box, Button, Flex } from "theme-ui";
import { Icon } from "./Icon";
import WalletPelagusConnector from './WalletPelagusConnector'
import { useState } from "react";
import { isConnected } from "./WalletPelagusConnector/requestAccounts";

type WalletConnectorProps = React.PropsWithChildren<{
  loader?: React.ReactNode;
}>;

export const WalletConnector: React.FC<WalletConnectorProps> = ({ children }) => {
  const [accounts, setAccounts] = useState([]);

  return (
    <>
      {
        isConnected() ?  children : <WalletPelagusConnector onSetAccounts={setAccounts}/>
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
