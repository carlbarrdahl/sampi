import { useCallback, useState } from "react";
import { useCeramic } from "./ceramic";
import getAuthProvider from "../lib/wallet";

import { useAsync, useAsyncFn } from "react-use";

export function useDocument(id) {
  const { ceramic } = useCeramic();
  return useAsync(() => ceramic.loadDocument(id), [id]);
}

export function useIdx(name, did) {
  const { idx, signIn } = useCeramic();

  return useAsync(async () => {
    if (!did && !idx.authenticated) {
      console.log("not signed in");
      await signIn();
    }
    console.log("get", name, did);
    return idx.get(name, did);
  }, [did, idx]);
}

export function useCreateDocument() {
  const { ceramic, idx, signIn } = useCeramic();
  return useAsyncFn(
    async ({ content, metadata }) => {
      console.log("creating doc", { content, metadata });
      if (!idx.authenticated) {
        console.log("Not authenticated");
        await signIn(ceramic);
      }
      metadata.controllers = metadata.controllers || [idx.id];

      return ceramic
        .createDocument("tile", { content, metadata })
        .then(async (doc) => {
          const feed = (await idx.get("feed")) || {};
          console.log("FEED", feed);
          const docId = doc.id.toString();
          idx.set("feed", { items: [docId, ...(feed.items || [])] });

          return docId;
        });
    },
    [ceramic, idx]
  );
}
