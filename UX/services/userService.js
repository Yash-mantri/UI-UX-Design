const dao = require("../dao/userDao");

// LOGIN LOGIC
exports.login = async (username, password) => {

  if (!username || username.trim() === "")
    return { status:false, message:"Enter Username" };

  if (!password || password.trim() === "")
    return { status:false, message:"Enter Password" };

  const users = await dao.findUser(username, password);

  if (users.length === 0)
    return { status:false, message:"Invalid Credentials" };

  const user = users[0];

  if (user.username === "admin" && user.password === "admin")
    return { status:true, role:"admin" };

  return { status:true, role:"user", user:user };
};

// SIGNUP LOGIC
exports.signup = async (u) => {

  if(!u.username || !u.password || !u.email)
    return { message:"All Fields Required" };

  await dao.add(u);

  return { message:"Signup Success" };
};


// ADMIN – GET ALL
exports.getAllUsers = async () => {
  return await dao.getAll();
};

// USER PROFILE
exports.getUser = async (username) => {
  return await dao.getByUsername(username);
};

// ADD USER (ADMIN)
exports.addUser = async (u) => {

  // ---- VALIDATION ----
  if (!u.username || u.username.trim() === "")
    return { status:false, message:"Username Required" };

  if (!u.email || u.email.trim() === "")
    return { status:false, message:"Email Required" };

  // Optional Email Format Check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(u.email))
    return { status:false, message:"Invalid Email Format" };

  // ---- DAO CALL ----
  await dao.add(u);

  return { status:true, message:"User Added" };
};


// UPDATE USER
exports.updateUser = async (id, u) => {

  if (!u.username || u.username.trim() === "")
    return { status:false, message:"Username Required" };

  if (!u.email || u.email.trim() === "")
    return { status:false, message:"Email Required" };

  await dao.updateUser(id, u);

  return { status:true, message:"Profile Updated" };
};

exports.updatePassword = async (id, pass) => {

  if (!pass || pass.trim() === "")
    return { status:false, message:"Password Required" };

  if (pass.length < 4)
    return { status:false, message:"Password too short" };

  await dao.updatePassword(id, pass);

  return { status:true, message:"Password Updated" };
};


// DELETE USER
exports.deleteUser = async (id) => {
  await dao.remove(id);
  return { message:"Deleted" };
};
