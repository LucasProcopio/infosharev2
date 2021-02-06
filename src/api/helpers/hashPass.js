const bcrypt = require('bcrypt');
const {BCRYPTSALT} = require('../enums/cryptEnum');

module.exports = async (pass) => {
  const newPass = await new Promise((resolve, reject) => {
    bcrypt.hash(pass, BCRYPTSALT, (err, hash) => {
      if(err) reject(err);
      resolve(hash)
    });
  });

  return newPass;
}