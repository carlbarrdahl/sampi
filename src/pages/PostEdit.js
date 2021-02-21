/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Flex, jsx } from "theme-ui";
import { useLocation } from "wouter";
import Form from "@rjsf/core";
import { Editor } from "@bytemd/react";
import highlight from "@bytemd/plugin-highlight";
import gfm from "@bytemd/plugin-gfm";

import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";

import Button from "../components/Button";
import { useDocument } from "../hooks/document";
import Link from "../components/Link";

const plugins = [highlight(), gfm()];

const uiSchema = {
  "@context": { "ui:widget": "hidden" },
  id: { "ui:widget": "hidden" },
  type: { "ui:widget": "hidden" },
  name: { "ui:widget": "hidden" },
  context: { "ui:widget": "hidden" },
  mediaType: { "ui:widget": "hidden" },
  content: {
    "ui:widget": (props) => {
      return (
        <Editor
          mode={"tab"}
          editorConfig={{ autofocus: true }}
          style={{ height: 100 }}
          value={props.value}
          plugins={plugins}
          onChange={props.onChange}
        />
      );
    },
  },
};
const fields = {
  // Hide these fields
  TitleField: (props) => null,
  DescriptionField: (props) => null,
};
const widgets = {};

const PostEdit = ({ params }) => {
  const [location, setLocation] = useLocation();
  const doc = useDocument(params.docId);
  const docSchema = useDocument(doc?.value?.metadata.schema);

  const data = doc?.value?.content;
  const schema = docSchema?.value?.content || {};
  if (doc.loading || docSchema.loading) {
    return <pre>loading...</pre>;
  }

  return (
    <Box>
      <Flex sx={{ justifyContent: "flex-end" }}>
        <Button onClick={() => alert("Minting not implemented yet")}>
          Mint
        </Button>
      </Flex>
      <Form
        onSubmit={({ formData }) => {
          console.log("form", formData);
          doc?.value
            .change({
              content: { ...formData, updated: new Date().toISOString() },
            })
            .then(() => setLocation(`/post/${params.docId}`));
        }}
        schema={schema}
        formData={data}
        uiSchema={uiSchema}
        fields={fields}
        //widgets={widgets}
      >
        <div sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link href={`/post/${doc?.value?.id.toString()}`}>
            <Button variant="secondary" sx={{ mr: 2 }}>
              Cancel
            </Button>
          </Link>
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </Box>
  );
};

export default PostEdit;
