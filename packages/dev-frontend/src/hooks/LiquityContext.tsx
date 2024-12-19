import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Provider } from "@ethersproject/abstract-provider";
import { Web3Provider } from "@ethersproject/providers";
import { useClient, useAccount, useChainId, useWalletClient, useConfig } from "wagmi";

import {
  BlockPolledLiquityStore,
  EthersLiquity,
  EthersLiquityWithStore,
  _connectByChainId
} from "@liquity/lib-ethers";

import { LiquityFrontendConfig, getConfig } from "../config";
import { BatchedProvider } from "../providers/BatchingProvider";
import { useQuaisSigner } from "../providers/useQuaisProvider";
import { Signer } from "quais";

type LiquityContextValue = {
  config: LiquityFrontendConfig;
  account: string;
  provider: Provider;
  liquity: EthersLiquityWithStore<BlockPolledLiquityStore>;
};

const LiquityContext = createContext<LiquityContextValue | undefined>(undefined);

type LiquityProviderProps = React.PropsWithChildren<{
  loader?: React.ReactNode;
  unsupportedNetworkFallback?: React.ReactNode;
  unsupportedMainnetFallback?: React.ReactNode;
}>;

export const LiquityProvider: React.FC<LiquityProviderProps> = ({
  children,
  loader,
  unsupportedNetworkFallback,
  unsupportedMainnetFallback
}) => {

  const [signer, seteSigner] = useState<Signer | undefined>(undefined);
  const chainId = useChainId();
  const client = useClient();
  console.log({chainId, client})
  const provider =
  client &&
  new Web3Provider(
      (method, params) =>
      client.request({
        method: method as any,
        params: params as any
      }),
      chainId
    );
  
  const account = useAccount();
  const walletClient = useWalletClient();
      
  console.log({provider, account, walletClient})
  /*const signer =
    account.address &&
    walletClient.data &&
    new Web3Provider(
      (method, params) =>
        walletClient.data.request({
          method: method as any,
          params: params as any
        }),
      chainId
    ).getSigner(account.address);*/
  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      const signer = await useQuaisSigner({chainId})
      seteSigner(signer)
    };

    fetchData();  // Call the async function
  }, []); 

  

  const [config, setConfig] = useState<LiquityFrontendConfig>();
  
  console.log({config, signer})
  const connection = useMemo(() => {

    if (config && provider && signer && account.address) {
      const batchedProvider = new BatchedProvider(provider, chainId);
      // batchedProvider._debugLog = true;
      console.log({batchedProvider})
      try {
        return _connectByChainId(batchedProvider, signer as any, chainId, {
          userAddress: account.address,
          frontendTag: config.frontendTag,
          useStore: "blockPolled"
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [config, provider, signer, account.address, chainId]);

  console.log({connection})
  useEffect(() => {
    getConfig().then(setConfig);
  }, []);

  if (!config || !provider || !signer || !account.address) {
    return <>{loader}</>;
  }

  // if (config?.testnetOnly && chainId === 1) {
  //   return <>{unsupportedMainnetFallback}</>;
  // }

  if (!connection) {
    return <>{unsupportedNetworkFallback}</>;
  }

  const liquity = EthersLiquity._from(connection);
  liquity.store.logging = true;

  return (
    <LiquityContext.Provider
      value={{ config, account: account.address, provider: provider, liquity }}
    >
      {children}
    </LiquityContext.Provider>
  );
};

export const useLiquity = () => {
  const liquityContext = useContext(LiquityContext);

  if (!liquityContext) {
    throw new Error("You must provide a LiquityContext via LiquityProvider");
  }

  return liquityContext;
};
