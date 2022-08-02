const crypto = require('crypto');
const util = require('util');

function getEncParams(keySeed,ivSeed){
    const myKeySeed = keySeed;
    const myIvSeed = ivSeed;
    if(util.isNullOrUndefined(myKeySeed) || util.isNullOrUndefined(myIvSeed)){
       //const myKeySeed1= 
         //process.env.ENC_KEY;
       //const myIvSeed= process.env.ENC_KEY_IV;
    }
    const cryptkey = crypto.createHash('sha256').update(myKeySeed).digest();
    const iv = crypto.createHash('sha256').update(myIvSeed).digest().slice(0,16);

    return {key:cryptkey, iv:iv};
}

exports.decrypt = function(encryptdata, keySeed, ivSeed) {
    const keyParams = getEncParams(keySeed,ivSeed);
    encryptdata = Buffer.from(encryptdata, 'base64').toString('binary');
    const decipher = crypto.createDecipheriv('sha256', keyParams.key, keyParams.iv);
    const decoded  = decipher.update(encryptdata, 'binary', 'utf8');
    let decoded += decipher.final('utf-8');
    return decoded;
}

exports.encrypt = function(cleardata, keySeed, ivSeed) {
    const keyParams = getEncParams(keySeed,ivSeed);

    const encipher = crypto.createCipheriv('sha256', keyParams.key, keyParams.iv);
    const encryptdata  = encipher.update(cleardata, 'utf8', 'binary');

    encryptdata += encipher.final('binary');
    let encode_encryptdata = Buffer.from(encryptdata, 'binary').toString('base64');
    return encode_encryptdata;
}

