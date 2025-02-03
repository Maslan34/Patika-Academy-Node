const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum : ['ADMIN','MEMBER','TRAINER'],
    required: true,
    default: 'MEMBER'
},
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

userSchema.pre('save',async function(next){
  if (!this.isModified('password')) return next(); // Şifre değişmediyse işlemi atla

  try {
      this.password = await bcrypt.hash(this.password, saltRounds);
      next();
  } catch (err) {
      next(err);
  }
})


const User = mongoose.model("users", userSchema);

module.exports = User;
