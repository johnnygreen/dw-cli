const fs = require('fs');
const path = require('path');
const debug = require('debug')('write');
const axios = require('axios');
const followRedirects = require('follow-redirects');

followRedirects.maxBodyLength = 100 * 1024 * 1024;

module.exports = async (src, dest, options) => {
  try {
    debug(`Uploading ${src}`);

    const url = path.join('/', dest, path.basename(src));

    const config = Object.assign(
      {url, method: 'put', validateStatus: status => status < 400},
      {data: fs.createReadStream(src)},
      options
    );

    await axios(config);

    return url;
  } catch (err) {}
};
