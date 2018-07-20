const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.auth = function(req, res) {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        { title: "Data missing!", detail: "Provide email and password!" }
      ]
    });
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res
          .status(422)
          .send({
            errors: [{ title: "Invalid User!", detail: "User does not exist" }]
          });
      }

      if (user.hasSamePassword(password)) {
        const token = jwt.sign(
          {
            userId: user.id,
            username: user.username
          },
          config.SECRET,
          { expiresIn: "1h" }
        );

        return res.json(token);
      } else {
        return res
          .status(422)
          .send({
            errors: [
              { title: "Wrong Data!", detail: "Wrong email or password" }
            ]
          });
      }
    })
    .catch(err => {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    });
};

exports.register = function(req, res) {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        { title: "Data missing!", detail: "Provide email and password!" }
      ]
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: "Invalid passsword!",
          detail: "Password is not a same as confirmation!"
        }
      ]
    });
  }

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid email!",
              detail: "User with this email already exist!"
            }
          ]
        });
      }

      const user = new User({
        username,
        email,
        password
      });

      return user.save().then(() => res.json({ registered: true }));
    })
    .catch(err => {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    });
};
