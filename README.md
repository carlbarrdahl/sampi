# What is ϡ?

Write and publish censorship-proof articles with verifiable signatures from authors.

- Write posts in Markdown
- Publish to ceramic.network for censorship-proof and verifiable signatures
- Curate feeds of interesting content
- Follow other content creators feeds
- Subscribe to ActivityStreams using HTTP (similar to RSS)

Inspired by Medium, are.na, RSS and ActivityStreams.

Example feed with multiple different types of content (audio, image, article):
https://sampi.on.fleek.co/#/feed/did:3:kjzl6cwe1jw146v3thhilgu50851kgs2esq18e3kr6cvy4ho6mb75r8d4ffg8cn

### How does it work?

- A schema is defined based on the ActivityStream object.
- Markdown is parsed with MDX so in addition to standard Markdown you can use html.
- Document is passed as scope so you can access variables from editor (`id`, `content`, `metadata`, `anchorProof`, `log`)
