/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useLocation } from "wouter";
import Form from "@rjsf/core";

import { useDocument, useCreateDocument } from "../hooks/document";
import Button from "../components/Button";

import { schemas } from "../config.json";

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
  const [location, setLocation] = useLocation();
  const state = useDocument(schemas.ActivityStream);
  const [data, createDocument] = useCreateDocument();
  console.log("state", state);
  console.log("data", data);
  if (state.loading) {
    return <pre>loading schema...</pre>;
  }
  return (
    <SchemaForm
      schema={state?.value?.content}
      onSubmit={({ formData }) => {
        createDocument({
          content: { ...formData, published: new Date().toISOString() },
          metadata: { schema: schemas.ActivityStream },
        }).then((docId) => setLocation(`/post/${docId}`));
      }}
    />
  );
};

export default PostCreate;
