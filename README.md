# n8n-nodes-store-actor-intelligence-api

An [n8n](https://n8n.io/) community node that pulls commercial intelligence on every public Actor in the **Apify Store**: pricing, usage trends, reliability, and ratings, returned as structured JSON. It is backed by the [Apify Store API](https://apify.com/johnvc/store-actor-intelligence-api?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Search the Apify Store by keyword, category, pricing model, or developer (or sweep the whole store), and it returns one item per Actor with pricing, 7/30/90-day users, run counts, a computed 30-day success rate, ratings, and bookmarks. It also works as an **AI Agent tool**, so an agent can answer questions about Store Actors on demand.

- Filter by keyword, category, pricing model, developer, and sort order
- One clean item per Actor, with pricing and reliability data
- Choose how much data to return per Actor: Simplified, Raw, or Selected Fields
- Optionally enrich each Actor with its full README and input schema

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-store-actor-intelligence-api` and confirm.
4. The **Apify Store** node is now available in the node picker.

## Credentials

You need an Apify API token (the node authenticates to Apify on your behalf).

1. Create a free [Apify account](https://apify.com?fpr=9n7kx3).
2. In the Apify Console, open **Settings > Integrations** and copy your **API token**.
3. In n8n, create a new **Apify API** credential and paste the token. OAuth2 is also supported.

## Operations

**Actor > Search** - search the Apify Store and return one item per matching Actor.

Inputs (all optional):

| Field | Description |
| --- | --- |
| Search Keyword | Keyword across title, name, description, developer, and README |
| Category | One of the 25 Apify Store categories |
| Pricing Model | Free, Flat Monthly Price, Price Per Dataset Item, or Pay Per Event |
| Developer Username | Filter to one developer handle |
| Sort By | Relevance, Popularity, Newest, or Last Updated |
| Maximum Actors | How many to return (0 = the entire store) |
| Start Offset | Skip this many Actors first (resume or shard) |
| Include Full README and Input Schema | Enrich each Actor with deeper data |

## Output

The **Output** parameter controls how much data each item carries:

- **Simplified** (default): a compact, LLM-friendly object. Forced automatically when the node is used as an AI Agent tool.
- **Raw**: every field the API returns.
- **Selected Fields**: pick exactly which fields to return.

Common fields:

| Field | Meaning |
| --- | --- |
| `title`, `name`, `username`, `url` | Identity of the Actor and its developer |
| `pricingModel`, `pricePerUnitUsd`, `pricingEvents` | Pricing model and per-event prices |
| `totalUsers`, `monthlyUsers`, `totalUsers7Days/30Days/90Days` | Usage and growth |
| `totalRuns`, `totalBuilds`, `lastRunStartedAt` | Activity |
| `successRate30Days`, `runs30DaysTotal/Succeeded/Failed` | Reliability |
| `reviewRating`, `reviewCount`, `bookmarkCount` | Quality and demand |
| `categories`, `description` | Classification |

## Example workflows

**Top free Actors in a category**

1. **Apify Store** node: Category = `AI`, Pricing Model = `Free`, Sort By = `Popularity`, Maximum Actors = `25`.
2. Read `title`, `monthlyUsers`, and `successRate30Days` from each item.

**Daily competitor watch**

1. **Schedule Trigger** (daily).
2. **Apify Store** node: Search Keyword = your niche, Sort By = `Popularity`.
3. Send the results to a sheet or Slack to track pricing and usage over time.

As an **AI Agent tool**, connect the node to an agent and ask things like "which Apify Store Actors for Instagram have the highest success rate?".

## Pricing

The backing [Apify Store API](https://apify.com/johnvc/store-actor-intelligence-api?fpr=9n7kx3) bills per Actor returned on Apify's pay-per-event model, priced to be the cheapest Store-data API available. You pay only for what you pull; see the live price on the Store page.

## Resources

- Backing API: [Apify Store API](https://apify.com/johnvc/store-actor-intelligence-api?fpr=9n7kx3)
- [Apify n8n integration docs](https://docs.apify.com/platform/integrations/n8n)
- [n8n community nodes](https://docs.n8n.io/integrations/community-nodes/)

Last Updated: 2026.06.29
