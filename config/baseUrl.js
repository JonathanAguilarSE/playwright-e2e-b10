const TECH_ENV = process.env.npm_config_tech_env;

const dict = {
  master: "www.master.techglobal.com",
  qa: "www.qa.techglobal.com",
  uat: "www.uat.techglobal.com",
  prod: "www.prod.techglobal.com",
};

const baseUrl = dict[TECH_ENV];

if (!baseUrl) {
  throw new Error(`Base URL for ${TECH_ENV} was not found`);
}

console.log("Base URL:", baseUrl);

module.exports = baseUrl;