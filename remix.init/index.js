const fs = require("fs/promises");
const path = require("path");
const inquirer = require("inquirer");
const crypto = require("crypto");
const sort = require("sort-package-json");

function getRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

// The initialization script for your project after
// you've installed.
//
// This will:
// - Replace our template name for your given app name in the README
// - Replace our template name for your given app name in the package.json
// - Prompt for the CockroachDB general connection string
// - Add a new .env file for you to use based upon the example file
async function main({ rootDirectory }) {
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, ".env.sample");
  const ENV_PATH = path.join(rootDirectory, ".env");
  // const README_PATH = path.join(rootDirectory, "README.md");
  const PACKAGE_JSON_PATH = path.join(rootDirectory, "package.json");

  const REPLACER = "roachella-stack-template";

  const DIR_NAME = path.basename(rootDirectory);
  const SUFFIX = getRandomString(2);
  const APP_NAME = (DIR_NAME + "-" + SUFFIX)
    // get rid of anything that's not allowed in an app name
    .replace(/[^a-zA-Z0-9-_]/g, "-");

  const [env, /*readme,*/ packageJson] = await Promise.all([
    fs.readFile(EXAMPLE_ENV_PATH, "utf-8"),
    // fs.readFile(README_PATH, "utf-8"),
    fs.readFile(PACKAGE_JSON_PATH, "utf-8")
  ]);

  // Prompt for DATABASE_URL & GITHUB_ACCESS_KEY
  const answers = await inquirer.prompt([
    {
      name: "databaseUrl",
      default: "",
      message:
        "What is the general connection String for your CockroachDB database?"
    },
    {
      name: "githubAccessKey",
      default: "",
      message: "What is your GitHub access key? (this key will only need read permissions for users)"
    }
  ]);


  // Create a new env file with all the necessary keys.
  const newEnv = env.replace(
    /^DATABASE_URL=.*$/m, `DATABASE_URL="${answers.databaseUrl}"`
  );

  // Parse the package file and rename the application name
  const newPackageJson =
    JSON.stringify(
      sort({ ...JSON.parse(packageJson), name: APP_NAME }),
      null,
      2
    ) + "\n";

  await Promise.all([
    fs.writeFile(ENV_PATH, newEnv),
    // fs.writeFile(README_PATH, newReadme),
    fs.writeFile(PACKAGE_JSON_PATH, newPackageJson)
  ]);

  console.log(
    `
Setup is almost complete. Follow these steps to finish initialization:
- Run Prisma migrate to create the schema
  npx prisma migrate dev --name init
- Run the first build (this generates the server you will run):
  npm run build
- You're now ready to rock and roll 🤘
  npm run dev
    `.trim()
  );
}

module.exports = main;
