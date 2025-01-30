const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = class Password {
  static async encryptPassword(string) {
    return await bcrypt.hash(string, saltRounds);
  }

  static async comparePassword(plainText,hashedPassword){
    
    return await bcrypt.compare(plainText,hashedPassword)
  }
}

exports.encryptPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw new Error("error hashing password");
  }
};

exports.decryptPassword = async (password, hashpass) => {
  try {
    const matchpassword = await bcrypt.compare(password, hashpass);
    return matchpassword;
  } catch (err) {
    throw new Error("error compair password");
  }
};
