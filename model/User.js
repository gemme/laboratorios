const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    "firstName": {
      "type": "String"
    },
    "username": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "password": {
      "type": "String"
    }
  }, {
      timestamps: true
  });




module.exports = mongoose.model('User', UserSchema/*Schema*/);