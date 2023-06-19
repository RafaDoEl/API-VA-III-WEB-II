// config inicial
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const Item = require('./models/Item')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rotas
app.post('/item', async (req, res) => {
  const { nome, descricao, preco } = req.body

  const item = {
    nome,
    descricao,
    preco,
  }

  try {
    await Item.create(item)

    res.status(201).json({ message: 'Item inserido no cardapio com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/item', async (req, res) => {
  try {
    const items = await Item.find()

    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/item/:id', async (req, res) => {
  const id = req.params.id

  try {
    const item = await Item.findOne({ _id: id })

    if (!item) {
      res.status(422).json({ message: 'Item não encontrado!' })
      return
    }

    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.patch('/:id', async (req, res) => { 
  const id = req.params.id

  const { nome, descricao, preco } = req.body

  const item = {
    nome,
    descricao,
    preco,
  } 

  try {
    const updatedItem = await Item.updateOne({ _id: id }, item)

    if (updatedItem.matchedCount === 0) {
      res.status(422).json({ message: 'Item não encontrado!' })
      return
    }

    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.delete('/item/:id', async (req, res) => {
  const id = req.params.id

  const item = await Item.findOne({ _id: id })

  if (!item) {
    res.status(422).json({ message: 'Item não encontrado!' })
    return
  }

  try {
    await Item.deleteOne({ _id: id })

    res.status(200).json({ message: 'Item removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

mongoose
  .connect(
    'mongodb+srv://rafaelbeiral:28L3ZfsOHItBAUPj@cluster0.nc308tn.mongodb.net/?retryWrites=true&w=majority  ',
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))