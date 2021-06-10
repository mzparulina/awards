// Import database
const knex = require('./../db')

// Retrieve all movies
exports.moviesAll = async (req, res) => {
  // Get all movies from database
  knex
    .select('*') // select all records
    .from('movies') // from 'movies' table
    .then(userData => {
      // Send movies extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving movies: ${err}` })
    })
}

// Create new book
exports.moviesCreate = async (req, res) => {
  // Add new book to database
  knex('movies')
  table.increments('id').primary()
          table.integer('Title')
          table.integer('Year')
          table.string('imdbID')
          table.string('Type')
          table.string('Poster')
          table.integer('totalVotes')
    .insert({ // insert new record, a book
      'Title': req.body.Title,
      'Year': req.body.Year,
      'imdbID': req.body.imdbID,
      'Type,': req.body.Type,
      'Poster,': req.body.Poster,
      'totalVotes,': req.body.totalVotes,
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Book \'${req.body.Title}\' by ${req.body.Year} created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.Title} book: ${err}` })
    })
}

// Remove specific book
exports.moviesDelete = async (req, res) => {
  // Find specific book in the database and remove it
  knex('movies')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Book ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
    })
}

// Remove all movies on the list
exports.moviesReset = async (req, res) => {
  // Remove all movies from database
  knex
    .select('*') // select all records
    .from('movies') // from 'movies' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Book list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting book list: ${err}.` })
    })
}