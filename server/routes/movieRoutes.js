// Import express
const express = require('express')

// Import movies-controller
const moviesRoutes = require('./../controllers/movieController.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all book
// In server.js, movies route is specified as '/movies'
// this means that '/all' translates to '/movies/all'
router.get('/all', moviesRoutes.moviesAll)

// Add route for POST request to create new book
// In server.js, movies route is specified as '/movies'
// this means that '/create' translates to '/movies/create'
router.post('/create', moviesRoutes.moviesCreate)

// Add route for PUT request to delete specific book
// In server.js, movies route is specified as '/movies'
// this means that '/delete' translates to '/movies/delete'
router.put('/delete', moviesRoutes.moviesDelete)

// Add route for PUT request to reset movieshelf list
// In server.js, movies route is specified as '/movies'
// this means that '/reset' translates to '/movies/reset'
router.put('/reset', moviesRoutes.moviesReset)

// Export router
module.exports = router