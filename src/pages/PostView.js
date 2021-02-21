/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { Flex, jsx } from "theme-ui";
import Button from "../components/Button";

import Link from "../components/Link";
import MarkdownViewer from "../components/MarkdownViewer";
import { useCeramic } from "../hooks/ceramic";
import { useDocument } from "../hooks/document";

const PostView = ({ params }) => {
  const { auth } = useCeramic();
  const state = useDocument(params.docId);

  const id = state?.value?.id.toString();
  const { content, controllers } = state?.value || {};
  console.log(id, content, state?.value);
  console.log("controllers", controllers);
  const isController = controllers?.includes(auth?.value);
  return (
    <>
      <Flex sx={{ justifyContent: "flex-end" }}>
        <Flex>
          {isController ? (
            <Link href={`/post/${params.docId}/edit`}>
              <Button>Edit</Button>
            </Link>
          ) : (
            <Button>Collect</Button>
          )}
        </Flex>
      </Flex>
      <MarkdownViewer doc={state?.value} />
    </>
  );
};

export default PostView;
