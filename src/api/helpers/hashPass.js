const bcrypt = require('bcrypt');
const {BCRYPTSALT} = require('../enums/cryptEnum');

const hashPass = async (pass) => {
  const newPass = await new Promise((resolve, reject) => {
    bcrypt.hash(pass, BCRYPTSALT, (err, hash) => {
      if(err) reject(err);
      resolve(hash)
    });
  });
  return newPass;
}

const validatePass = async (pass, hash) => {

  const isValid = await new Promise((resolve, reject) => {
    bcrypt.compare(pass, hash, function(err, result) {
      if(err) reject(err);
      resolve(result);
    });
  })

  return isValid;
}

module.exports = { hashPass, validatePass }

