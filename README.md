# Roachella Stack

[![Netlify Status](https://api.netlify.com/api/v1/badges/4fbde27d-d6fb-4c9f-a30f-79f464f60214/deploy-status)](https://app.netlify.com/sites/roachella-stack/deploys)

- [Remix Docs](https://remix.run/docs)

## What is in this stack?
- Netlify
- CockroachDB
- Prisma
- Tailwind

---

## Setup CockroachDB 

Setting up Cockroach DB:

- Create your account at https://cockroachlabs.cloud/

- Create a new cluster
  - Plan: Serverless
  - Cloud Provider: AWS Cloud
  - Leave evertything else as default

- Create a new SQL user + save the generated password somewhere safe for later then press "Next"

- Copy and run the command in your terminal to download the cert 

- Copy the general connection string and save it somewhere safe for later then press "Close"

- install cockroach-cli (on mac) 
`brew install cockroachdb/tap/cockroach`

- run 
`cockroach sql --url "{DB_CONNECTION_STRING}&sslrootcert=$HOME/.postgresql/root.crt"`

- create your database 
`create database {APPLICATION_NAME};`

---

## Create a Github Access Token

Follow the instructions at https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

(You'll only need to check `read:user` under the `user` scope for this key)


---
## Development

Once you've completed the above steps and have your `Github Access Key` and your `DB connection string` we can get started with creating your project from this stack.

In your terminal run:
`npx create-remix --template https://github.com/aydrian/roachella-stack`

Once you've succesfully completed the prompts, your project should be ready to run with:
`npm run start`
