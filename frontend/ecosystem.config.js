const dotenv = require('dotenv');
dotenv.config({ path: './.env.deploy' });

const { SSH_USER, SSH_HOST, GIT_REF, GIT_REP, DESTINATION_PATH } = process.env;

module.exports = {
  apps: [],

  deploy: {
    production: {
      user: `${SSH_USER}`,
      host: `${SSH_HOST}`,
      ref: `${GIT_REF}`,
      repo: `${GIT_REP}`,
      path: `${DESTINATION_PATH}`,
      'post-deploy': 'cd frontend && npm i && npm run build '
    }
  }
};
