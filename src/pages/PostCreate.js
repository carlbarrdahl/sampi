/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useLocation } from "wouter";
import Form from "@rjsf/core";

import { useDocument, useCreateDocument } from "../hooks/document";
import Button from "../components/Button";

import { schemas } from "../config.json";
import Editor from "../components/Editor";
import { useState } from "react";

const SchemaForm = ({ schema, onSubmit }) => {
  return (
    <Form
      onSubmit={onSubmit}
      schema={schema}
      // uiSchema={uiSchema}
      // fields={fields}
      // widgets={widgets}
    >
      <div sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" sx={{ mt: 3 }}>
          Save
        </Button>
      </div>
    </Form>
  );
};

const PostCreate = (props) => {
  const [isCreating, setCreating] = useState(false);
  const [location, setLocation] = useLocation();
  const state = useDocument(schemas.ActivityStreamObject);
  const [data, createDocument] = useCreateDocument();
  console.log("state", state);
  console.log("data", data);
  if (state.loading) {
    return <pre>loading schema...</pre>;
  }
  if (isCreating) {
    return <pre>creating post...</pre>;
  }
  return (
    <Editor
      schema={state?.value?.content}
      onSubmit={({ formData }) => {
        setCreating(true);
        createDocument({
          content: { ...formData, published: new Date().toISOString() },
          metadata: { schema: schemas.ActivityStreamObject },
        })
          .then((docId) => setLocation(`/post/${docId}`))
          .catch(() => setCreating(false));
      }}
    />
  );
};

export default PostCreate;
