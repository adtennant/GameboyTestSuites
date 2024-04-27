const fs = require("fs");
const https = require("https");
const path = require("path");
const url = require("url");

const schema = require("../schema.json");

const Ajv = require("ajv");
const ajv = new Ajv();

async function urlExists(value) {
  return new Promise(function (resolve, reject) {
    const req = https.request(
      {
        method: "HEAD",
        host: url.parse(value).host,
        path: url.parse(value).pathname,
        agent: new https.Agent({ maxSockets: 1 }),
      },
      (res) => {
        res.on("data", function () {});

        if (res.statusCode === 200) {
          resolve();
        } else {
          reject();
        }
      },
    );
    req.on("error", function () {
      reject();
    });
    req.end();
  });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function validateSuite(suite) {
  let ok = true;

  function reportError(msg) {
    ok = false;
    console.error(msg);
  }

  console.log(`Verifying ${suite.name}...`);

  if (!ajv.validate(schema, suite)) {
    reportError(ajv.errors);
    return ok;
  }

  if (suite.repository) {
    await sleep(25);

    await urlExists(suite.repository).catch(function () {
      reportError(`repository not found: ${suite.name}`);
    });
  }

  for (const test of suite.tests) {
    if (test.repository) {
      await sleep(25);

      await urlExists(test.repository).catch(function () {
        reportError(`repository not found: ${suite.name}/${test.name}`);
      });
    }

    if (test.source) {
      await sleep(25);

      await urlExists(test.source).catch(function () {
        reportError(`source not found: ${suite.name}/${test.name}`);
      });
    }

    const romPath = path.resolve(
      __dirname,
      "..",
      "tests",
      suite.name,
      test.rom,
    );

    await fs.promises.access(romPath).catch(function () {
      reportError(`rom not found: ${suite.name}/${test.name}`);
    });

    if (test.success?.screenshot) {
      const toVerify = [];

      if (typeof test.success?.screenshot === "string") {
        toVerify.push(test.success.screenshot);
      } else if (typeof test.success?.screenshot === "object") {
        for (const value of Object.values(test.success?.screenshot)) {
          if (Array.isArray(value)) {
            toVerify.push(...value);
          } else {
            toVerify.push(value);
          }
        }
      } else {
        reportError(`invalid screenshot type: ${suite.name}/${test.name}`);
      }

      await Promise.all(
        toVerify.map((screenshot) => {
          const screenshotPath = path.resolve(
            __dirname,
            "..",
            "tests",
            suite.name,
            screenshot,
          );

          return fs.promises.access(screenshotPath).catch(function () {
            reportError(
              `screenshot not found: ${suite.name}/${test.name}: ${screenshot}`,
            );
          });
        }),
      );
    }
  }

  console.log("Done");

  return ok;
}

const suites = [
  require("../tests/acid.json"),
  require("../tests/blargg.json"),
  require("../tests/CasualPokePlayer.json"),
  require("../tests/daid.json"),
  require("../tests/gbmicrotest.json"),
  require("../tests/Hacktix.json"),
  require("../tests/MBC3-Tester-gb.json"),
  require("../tests/mealybug-tearoom-tests.json"),
  require("../tests/mooneye-test-suite.json"),
  require("../tests/rtc3test.json"),
  require("../tests/SameSuite.json"),
  require("../tests/TurtleTests.json"),
];

async function validate() {
  let ok = true;

  for (const suite of suites) {
    const result = await validateSuite(suite);

    if (!result) {
      ok = false;
    }
  }

  if (!ok) {
    process.exit(1);
  }
}

validate();
