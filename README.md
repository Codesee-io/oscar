# OSCAR

🤖 `Open Source Community Assistance Robot` 🤖

OSCAR is a Discord bot built to assist the [Open-Source Hub community](https://opensourcehub.io).

- 🔧 Manage OSCAR in the [Discord developer dashboard](https://discord.com/developers/applications)
- 👩🏿‍💻 Check out [Open Source Hub repository](https://github.com/Codesee-io/opensourcehub)
- 👾 Visit the [Discord channel](https://discord.gg/opensource)

## Discord commands

- `/verify`: checks that the caller is the maintainer of at least one project on opensourcehub.io. If so, that user will receive the role of "Maintainer".

## Local development

### Requirements

OSCAR runs on [Node 16](https://nodejs.org/en/download/) and recommends [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) for dependency management.

OSCAR also requires environemnt variables to connect to the right services. Create a `.env` at the root of your directory, and add the variables defined in the [.env.sample](.env.sample) file.

### Setup steps

1. Clone the repository to your computer
2. Navigate into the cloned directory
3. Run `yarn install` to install the necessary dependencies
4. Run `yarn dev` to start OSCAR

## Deployment

> TODO

### Uploading commands to the server

> TODO

```
yarn upload:commands
```
