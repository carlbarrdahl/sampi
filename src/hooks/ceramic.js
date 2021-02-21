import Ceramic from "@ceramicnetwork/http-client";
import { IDX } from "@ceramicstudio/idx";
import { createContext, useContext, useEffect, useState } from "react";
import { useAsyncFn, useLocalStorage } from "react-use";
import getAuthProvider from "../lib/wallet";
import config from "../config.json";

const CeramicContext = createContext({});

export const useCeramic = () => useContext(CeramicContext);

const aliases = {
  feed: config.definitions.feed,
};
export default function CeramicProvider({
  apiHost = "https://ceramic-clay.3boxlabs.com" || "http://localhost:7007",
  children,
}) {
  // Initialize Ceramic and IDX
  const [{ ceramic, idx }] = useState(() => {
    const ceramic = new Ceramic(apiHost);
    const idx = new IDX({ ceramic, aliases });

    // Useful for debugging
    window.ceramic = ceramic;
    window.idx = idx;

    return { ceramic, idx, auth: null };
  });

  // IDX auth
  const [hasSignedIn, setValue, remove] = useLocalStorage(
    "idx.id",
    localStorage.getItem("idx.id")
  );
  const [auth, signIn] = useAsyncFn(async () => {
    try {
      console.log("Signin in...");
      const provider = await getAuthProvider();
      await ceramic.setDIDProvider(provider);

      const did = idx.authenticated ? idx.id : null;
      setValue(did);
      return did;
    } catch (error) {
      console.log(error);
      // remove();
    }
  }, [ceramic, idx]);

  // Automatically sign in
  useEffect(async () => {
    hasSignedIn && (await signIn());
  }, [hasSignedIn]);

  const context = { ceramic, idx, auth, signIn };

  return (
    <CeramicContext.Provider value={context}>
      {children}
    </CeramicContext.Provider>
  );
}
