const mongoose = require('mongoose')

const Item = mongoose.model('Item', {
  nome: String,
  descricao: String,
  preco: Number,
})

module.exports = Item