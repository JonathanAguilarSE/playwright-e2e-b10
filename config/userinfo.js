const TECH_ENV = process.env.npm_config_tech_env;

const dict = {
  master: {
    database: {
      username: "db_user",
      password: "randomPass",
    },
    admin: {
      username: "admin_user",
      password: "randomPass",
    },
    engineering: {
      username: "eng_user",
      password: "randomPass",
    },
  },
};


const userLogins = dict[TECH_ENV]

module.exports = userLogins