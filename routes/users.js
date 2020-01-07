var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const {Users} = req.db;
    //lo hemos puesto por qur es un parametro definido en swagger
    const username= req.query.username;

    const users = await Users.findAll();
  
    let filteredUsers=users;

    if(username){
      filteredUsers=users.filter(u =>{
        return u.username===username;

      })
    }
   // return res.send(users);
    return res.status(200).send(filteredUsers);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
