const User = require("../model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  userSignUp: (req, res) => {
    // Postman fix
    if (Object.keys(req.body).length === 1) {
      req.body = JSON.parse(Object.keys(req.body)[0]);
    }

    return new Promise((resolve, reject) => {
      User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            const { nickName, email, password } = req.body;
            const newUser = new User({
              nickName,
              email,
              password
            });

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;

                newUser
                  .save()
                  .then(user => {
                    const payload = {
                      id: user._id,
                      email: user.email
                    };

                    jwt.sign(
                      payload,
                      process.env.SECRET_KEY,
                      {
                        expiresIn: 3600
                      },
                      (err, token) => {
                        if (err) {
                          reject(err);
                        } else {
                          let success = {};
                          success.confirmation = true;
                          success.token = `Bear ${token}`;
                          res.send(success);
                          resolve(success);
                        }
                      }
                    );
                  })
                  .catch(error => {
                    let errorObj = {};
                    error.status = 400;
                    errorObj.message = error;
                    console.log(errorObj);

                    reject(errorObj);
                  });
              });
            });
          } else {
            bcrypt
              .compare(params.password, user.password)
              .then(isMatch => {
                if (isMatch) {
                  const payload = {
                    id: user._id,
                    email: user.email
                  };
                  jwt.sign(
                    payload,
                    process.SECRET_KEY,
                    {
                      expiresIn: 3600
                    },
                    (err, token) => {
                      if (err) {
                        reject(err);
                      } else {
                        let success = {};
                        sucess.token = `Bearer ${token}`;

                        resolve(sucess);
                      }
                    }
                  );
                } else {
                  let errorObj = {};
                  errorObj.status = 400;
                  errorObj.message = "Check your username and password";

                  reject(errorObj);
                }
              })
              .catch(error => {
                let errorObj = {};
                errorObj.status = 400;
                errorObj.message = "Check your username and password";

                reject(errorObj);
              });
          }
        })
        .catch(error => {
          let errorObj = {};
          errorObj.status = 400;
          error.message = error;
          reject(errorObj);
        });
    });
  }
//   logIn: (req, res) => {
//     return new Promise((resolve, reject) => {
//       User.findOne(req.body.id)
//         .then(user => {
//           res.json({ loggedIn: req.body.password == user.password });
//         })

//         .catch(error => reject(error));
//     });
//   }

  // getUserEmail: (req, res) => {
  //     User.findOne({email:req.body.email}, (err, data) => {
  //         if(err){
  //             res.send(err)
  //         }else if(!data){
  //             res.send({msg: "user email does not exist"})
  //         }else{
  //             res.send(data)
  //         }

  //     })
  // },
  // getAllUsers: (req, res) => {
  //     User.find((err, data) => {
  //         if(err)res.send(err)
  //         res.json(data);
  //     })
  // }
}
