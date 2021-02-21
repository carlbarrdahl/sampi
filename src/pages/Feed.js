/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Flex, Grid, jsx, Styled } from "theme-ui";
import Link from "../components/Link";

import MarkdownViewer from "../components/MarkdownViewer";
import Button from "../components/Button";
import { useDocument } from "../hooks/document";
import { useIdx } from "../hooks/document";
import { useAsyncFn } from "react-use";
import { useCeramic } from "../hooks/ceramic";

const DocViewer = ({ docId }) => {
  const state = useDocument(docId);

  const id = state?.value?.id.toString();
  const { content, controllers } = state?.value || {};
  console.log(state?.value);
  return (
    <Box>
      <Link href={`/post/${state?.value?.id.toString()}`}>
        <pre>{content?.updated || content?.published}</pre>
        <Box
          sx={{
            maxHeight: 240,
            overflowY: "scroll",
          }}
        >
          <MarkdownViewer doc={state?.value} />
        </Box>
      </Link>
    </Box>
  );
};

const FollowButton = ({ did }) => {
  const { idx } = useCeramic();
  const [state, follow] = useAsyncFn(async (did) => {
    const following = (await idx.set("following")) || {};
    return idx.set("following", {
      ...following,
      dids: [did, ...(following.dids || [])],
    });
  });

  return <Button onClick={() => follow(did)}>Follow</Button>;
};
const FeedPage = ({ params }) => {
  const { auth } = useCeramic();
  const state = useIdx("feed", params.did);

  console.log("feed", state);
  return (
    <div>
      <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Styled.h1>Feed</Styled.h1>
      </Flex>

      {params.did !== auth?.value ? <FollowButton did={params.did} /> : null}

      {(state?.value?.items || []).map((docId) => (
        <DocViewer key={docId} docId={docId} />
      ))}
    </div>
  );
};

export default FeedPage;
