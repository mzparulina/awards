// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "movies"
knex.schema
  // Make sure no "movies" table exists
  // before trying to create new
  .hasTable('movies')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('movies', (table)  => {
          table.increments('id').primary()
          table.integer('Title')
          table.integer('Year')
          table.string('imdbID')
          table.string('Type')
          table.string('Poster')
          table.integer('totalVotes')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Movies\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
// Log all data in "movies" table
knex.select('*').from('movies')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex