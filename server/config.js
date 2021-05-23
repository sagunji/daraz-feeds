require('dotenv').config({ path: __dirname + '/../.env' });

module.exports = {
  adstreamToken: process.env.ADSTREAM_TOKEN,
  darazAdstreamBaseUri: process.env.DARAZ_ADSTREAM_BASE_URI
};