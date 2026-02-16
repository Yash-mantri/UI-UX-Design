const service = require("../services/userService");

exports.signup = async (req, res) => {
  const result = await service.signup(req.body);
  res.json(result);
};


exports.login = async (req, res) => {
  const result = await service.login(
    req.body.username,
    req.body.password
  );
  res.json(result);
};

exports.getAll = async (req, res) => {
  res.json(await service.getAllUsers());
};

exports.getUser = async (req, res) => {
  try {
    const user = await service.getUser(req.params.username);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "DB Error" });
  }
};


exports.addUser = async (req, res) => {
  try {
    const result = await service.addUser(req.body);

    if (!result.status)
      return res.status(400).json(result);

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "DB Error" });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const result = await service.updateUser(
      req.params.id,
      req.body
    );

    if (!result.status)
      return res.status(400).json(result);

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "DB Error" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const result = await service.updatePassword(
      req.params.id,
      req.body.password
    );

    if (!result.status)
      return res.status(400).json(result);

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "DB Error" });
  }
};


exports.deleteUser = async (req, res) => {
  res.json(await service.deleteUser(req.params.id));
};
