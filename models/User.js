const {Schema, model, Types} = require("mongoose")

const schema = new Schema({
  //required обязательное поле
  //unique: True, так как у каждого пользователя должен быть уникальный email.
  email: {type: String, required: true, unique: true},
  password:{type: String, required:true},
  links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema)