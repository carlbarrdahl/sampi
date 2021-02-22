/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Flex, jsx } from "theme-ui";
import { useLocation } from "wouter";
import Form from "@rjsf/core";
import * as ByteMD from "@bytemd/react";
import highlight from "@bytemd/plugin-highlight";
import gfm from "@bytemd/plugin-gfm";

import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";

import Button from "../Button";
import { useDocument } from "../../hooks/document";

const plugins = [highlight(), gfm()];

const uiSchema = {
  "@context": { "ui:widget": "hidden" },
  id: { "ui:widget": "hidden" },
  partOf: { "ui:widget": "hidden" },
  type: { "ui:widget": "hidden" },
  name: { "ui:widget": "hidden" },
  context: { "ui:widget": "hidden" },
  mediaType: { "ui:widget": "hidden" },
  updated: { "ui:widget": "hidden" },
  published: { "ui:widget": "hidden" },
  content: {
    "ui:widget": (props) => {
      return (
        <ByteMD.Editor
          mode={"tab"}
          editorConfig={{ autofocus: true }}
          style={{ height: 100 }}
          value={props.value || ""}
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

const Editor = ({ schema, onSubmit }) => {
  const [location, setLocation] = useLocation();

  if (!schema) {
    return <pre>loading...</pre>;
  }

  return (
    <Form
      onSubmit={onSubmit}
      schema={schema}
      uiSchema={uiSchema}
      fields={fields}
    >
      <div sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
};

export default Editor;
