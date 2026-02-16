const db = require("../utils/db");

// FIND USER FOR LOGIN
exports.findUser = (username, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE username=? AND password=?",
      [username, password],
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });
};


// GET ALL USERS
exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, username, email FROM users WHERE username != 'admin'",
      (err, rows) => err ? reject(err) : resolve(rows)
    );
  });
};




exports.getByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, username, email FROM users WHERE username=?",
      [username],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      }
    );
  });
};




// ADD USER
exports.add = (u) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users(username,password,email) VALUES(?,?,?)",
      [u.username, u.password, u.email],
      err => err ? reject(err) : resolve()
    );
  });
};

// UPDATE USER
exports.updateUser = (id, u) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET username=?, email=? WHERE id=?",
      [u.username, u.email, id],
      err => err ? reject(err) : resolve()
    );
  });
};


exports.updatePassword = (id, pass)=>{
  db.query(
    "UPDATE users SET password=? WHERE id=?",
    [pass,id]
  );
};


// DELETE USER
exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM users WHERE id=?",
      [id],
      err => err ? reject(err) : resolve()
    );
  });
};
