const dotenv = require('dotenv');

dotenv.config({ path: './.env.deploy' });

const {
  SSH_USER, SSH_HOST, GIT_REF, GIT_REP, DESTINATION_PATH,
} = process.env;

module.exports = {
  apps: [{
    script: 'dist/app.js',
    instances: 'max',
    exec_mode: 'cluster',
  }],

  deploy: {
    production: {
      user: `${SSH_USER}`,
      host: `${SSH_HOST}`,
      ref: `${GIT_REF}`,
      repo: `${GIT_REP}`,
      path: `${DESTINATION_PATH}`,
      'pre-deploy-local': `bash scripts/deployEnv.sh ${SSH_USER}@${SSH_HOST} ${DESTINATION_PATH}`,
      'post-deploy': 'cd backend && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
