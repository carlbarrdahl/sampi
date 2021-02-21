const { writeFile } = require("fs").promises;
const Ceramic = require("@ceramicnetwork/http-client").default;
const { createDefinition, publishSchema } = require("@ceramicstudio/idx-tools");
const { Ed25519Provider } = require("key-did-provider-ed25519");
const fromString = require("uint8arrays/from-string");

const CERAMIC_URL =
  "https://ceramic-clay.3boxlabs.com" || "http://localhost:7007";

const ActivityStreamSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "ActivityStreamObject",
  description: "ActivityStream object",
  type: "object",
  properties: {
    "@context": {
      type: "string",
      default: "https://www.w3.org/ns/activitystreams#Object",
    },
    type: {
      type: "string",
      enum: ["Object", "Link", "Activity", "Note", "Page", "Article"],
      default: "Article",
      title: "Type",
    },
    id: { type: "string" },
    name: { type: "string", title: "Name" },
    content: { type: "string", title: "Content" },
    context: { type: "string" },
    published: { type: "string" },
    updated: { type: "string" },
    partOf: { type: "string" },
    mediaType: {
      type: "string",
      title: "Media type",
      enum: ["text/markdown"],
      default: "text/markdown",
    },
  },
  required: ["type"],
};

const FeedSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Feed",
  type: "object",
  properties: {
    feed: {
      type: "array",
      title: "items",
      items: {
        type: "string",
        title: "FeedItem",
        pattern: "^ceramic://.+(\\\\?version=.+)?",
        maxLength: 150,
      },
    },
  },
};

const FollowingSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Following",
  type: "object",
  properties: {
    following: {
      type: "array",
      title: "dids",
      dids: {
        type: "string",
        title: "DID",
        pattern: "^ceramic://.+(\\\\?version=.+)?",
        maxLength: 150,
      },
    },
  },
};

async function run() {
  // The seed must be provided as an environment variable
  const seed = fromString(process.env.SEED, "base16");
  // Connect to the local Ceramic node
  //const ceramic = new Ceramic("https://gateway-clay.ceramic.network")
  //const ceramic = new Ceramic("https://ceramic-clay.3boxlabs.com")
  const ceramic = new Ceramic(CERAMIC_URL);
  // Authenticate the Ceramic instance with the provider
  await ceramic.setDIDProvider(new Ed25519Provider(seed));

  // Publish the two schemas
  // const [
  //   activityStreamSchema,
  //   feedSchema,
  //   followingSchema,
  // ] = await Promise.all([
  //   publishSchema(ceramic, { content: ActivityStreamSchema }),
  //   publishSchema(ceramic, { content: FeedSchema }),
  //   publishSchema(ceramic, { content: FollowingSchema }),
  // ]);

  /*
  // Create the definition using the created schema ID
  const feedDefinition = await createDefinition(ceramic, {
    name: "feed",
    description: "Feed",
    schema: feedSchema.commitId.toUrl(),
  });
        
  const followingDefinition = await createDefinition(ceramic, {
    name: "following",
    description: "Following",
    schema: followingSchema.commitId.toUrl(),
  });
*/

  const schemas = await Promise.all(
    [ActivityStreamSchema].map(async (content) => {
      const schema = await publishSchema(ceramic, { content });
      return {
        key: content.title,
        value: schema.commitId.toUrl(),
      };
    })
  );

  // Definitions
  const definitions = await Promise.all(
    [FeedSchema, FollowingSchema].map(async (content) => {
      const schema = await publishSchema(ceramic, { content });
      const def = await createDefinition(ceramic, {
        name: content.title.toLowerCase(),
        description: content.title,
        schema: schema.commitId.toUrl(),
      });
      return {
        key: content.title.toLowerCase(),
        value: def.id.toString(),
      };
    })
  );

  // Write config to JSON file
  const keyValue = (obj, { key, value }) => ({ ...obj, [key]: value });
  const config = {
    definitions: definitions.reduce(keyValue, {}),
    schemas: schemas.reduce(keyValue, {}),
    // definitions: {
    //   feed: feedDefinition.id.toString(),
    //   following: followingDefinition.id.toString(),
    // },
    // schemas: {
    //   ActivityStream: activityStreamSchema.commitId.toUrl(),
    //   ActivityCollection: feedSchema.commitId.toUrl(),
    // },
  };
  await writeFile("./src/config.json", JSON.stringify(config));

  console.log("Config written to src/config.json file:", config);
  process.exit(0);
}

run().catch(console.error);
