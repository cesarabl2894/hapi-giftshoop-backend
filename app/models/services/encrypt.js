const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS);

class encryptService {
    async generateSalt() {
        const salt = await bcrypt.genSaltSync(saltRounds);
        return salt;
    }

    async hashPassword(str) {
        const salt = await this.generateSalt();
        const hashedString = await bcrypt.hash(str, salt);
        return hashedString;
    }
    async compare(string, hashedString) {
        return await bcrypt.compare(string , hashedString);
    }
}

module.exports = new encryptService();