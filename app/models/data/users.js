const db = require("../../helpers/db");

class UsersDAO {
  async addUser(data) {
    const user = await db.execute(
      `INSERT INTO User (first_name, last_name, email, address, gamertag, profile_picture,
            password, role)
            VALUES (?,?,?,?,?,?,?,?);`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.address,
        data.gamertag,
        data.profile_picture,
        data.password,
        data.role
      ],
      "games"
    );
    return user;
  }
  async getUserbyEmail(email) {
    const user = await db.execute(
      `SELECT * FROM User WHERE email = ?`,
      [email],
      "games"
    );
    return user;
  }
  async getUserbyId(id) {
    const user = await db.execute(
      `SELECT * FROM User WHERE id = ?`,
      [id],
      "games"
    );
    return user;
  }

  async deleteUser(email) {
    const response = await db.execute(
      "DELETE FROM User WHERE email = ?",
      [email],
      "games"
    );
    return response;
  }
  async updateToken(data) {
    const update = await db.execute(
      `
            UPDATE User SET 
            reset_token = ? , 
            reset_token_expiry = ?
            WHERE email = ?;`,
      [data.reset_token, data.reset_token_expiry, data.email],
      "games"
    );
    return update;
  }
  async getAllUsers() {
    const users = await db.execute("SELECT * FROM user", [], "games");
    return users;
  }
  async updateUser(data) {
    const sql = ` UPDATE user 
            SET first_name = ?,
            last_name = ?,
            email = ?,
            address = ?, 
            gamertag = ?,
            profile_picture = ?,
            role = ?;`;
    const user = await db.execute(
      sql,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.address,
        data.gamertag,
        data.profile_picture,
        data.role
      ],
      "games"
    );

    return user;
  }
  async updatePassword(data) {
    const sql = `
            UPDATE user 
            SET password = ?,
            reset_token = null,
            reset_token_expiry = null
            WHERE email = ?;
        `;

    const user = await db.execute(sql, [data.password, data.email], "games");

    return user;
  }
}

module.exports = new UsersDAO();
