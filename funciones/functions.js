const mongoose = require('mongoose')
const mongo_uri = 'mongodb://localhost:27017/admin';
const UserModel = require("../modelos/usuario")

mongoose.connect(mongo_uri, function (err) {
  if (err) {
    throw err;
  } else {
    console.log(`Todo ok Servidor conectado a ${mongo_uri}`)
  }
})

module.exports = {
  adduser: async (name, lastName) => {
    const usuario = new UserModel({ name: name, lastName: lastName, total: 0 })
    const query = await UserModel.findOne({ name: name, lastName: lastName });
    if (!query) {
      usuario.save()
      console.log("el usuario se cargo")
      return {msg:" el usuario se cargo"}
    } else {
      console.log("el usuario ya existe")
      return {msg:"el usuario ya existe"}
    }
  },
  
  listuser: async () => {
    const usuarios = await UserModel.find()
    return usuarios
  },
  deleteUserId: async (id) => {
    const borrado = await UserModel.deleteOne({ _id: id })
    console.log(borrado)
    return borrado
  },
  updateNameLastName: async (id, name, lastName) => {
    if (!id) {
      return { "error": "debe colocar id" }
    }
    if (name, lastName) {
      await UserModel.updateOne({ _id: id },
        {
          $set: {
            name: name,
            lastName: lastName
          }
        })
        return { "msg": "Se modifico name y lastName" }
    }
    if (name && !lastName) {
      await UserModel.updateOne({ _id: id },
        {
          $set: {
            name: name,
          }
        })
      return { "msg": "Se modifico name" }
    }
    if (!name && lastName) {
      await UserModel.updateOne({ _id: id },
        {
          $set: {
            lastName: lastName
          }
        })
      return { "msg": "Se modifico lastName" }
    }
  }
};
