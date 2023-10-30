// Create web server application with express
const express = require('express')
const app = express()
// Create a connection with MongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-mongo', { useNewUrlParser: true, useUnifiedTopology: true })
// Create a schema for comments
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String
})
// Create a model for comments
const Comment = mongoose.model('Comment', commentSchema)
// Set view engine
app.set('view engine', 'pug')
// Set a static file
app.use(express.static('public'))
// Set the body parser
app.use(express.urlencoded({ extended: true }))
// Home page
app.get('/', (req, res) => {
  res.render('index')
})
// Post a comment
app.post('/', async (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment
  })
  try {
    await comment.save()
    res.redirect('/comments')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})
// Display comments
app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find()
    res.render('comments', { comments: comments })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})
// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'))
