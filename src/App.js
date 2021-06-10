import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 50
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function App() {
  const [data, setData] = useState();
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState(`http://www.omdbapi.com/?s=${query}&type=movie&page=1&apikey=b99b91ea`);
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const classes = useStyles();
  const [author, title, pubDate, rating] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      setData(result.data);
    };

    fetchData();
    fetchMovies();
  }, [url]);

  const fetchMovies = async () => {
  // Send GET request to 'movies/all' endpoint
    axios
      .get('http://localhost:4001/movies/all')
      .then(response => {
        // Update the movies state
        setMovies(response.data)

        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the movie list: ${error}`))
  }

  const createMovie = () => {
    // Send POST request to 'movies/create' endpoint
    axios
      .post('http://localhost:4001/movies/create', {
        author: author,
        title: title,
        pubDate: pubDate,
        rating: rating
      })
      .then(res => {
        console.log(res.data)
        fetchMovies()
      })
      .catch(error => console.error(`There was an error creating the ${title} movie: ${error}`))
  }

  const updateMovie = () => {
    axios
      .post('http://localhost:4001/movies/create', {
        author: author,
        title: title,
        pubDate: pubDate,
        rating: rating
      })
      .then(res => {
        console.log(res.data)

        // Fetch all movies to refresh
        // the movies on the movieshelf list
        fetchMovies()
      })
      .catch(error => console.error(`There was an error creating the ${title} movie: ${error}`))
  }

  return(
    <div className={classes.root}>
      <AppBar position="static">
        The Shoppies: Movie awards for entrepreneurs
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <InputBase
              className={classes.input}
              placeholder="Search Movie Titles"
              inputProps={{ 'aria-label': 'search google maps' }}
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
            <IconButton className={classes.iconButton} aria-label="search"
                        onClick={() => setUrl(`http://www.omdbapi.com/?s=${query}&type=movie&page=1&apikey=b99b91ea`)}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={6}>
         <Paper className={classes.paper}>
            Results
            <ul>
              { data && data.Search ?
                  data.Search.map((d, i) => {
                    return(
                      <li key={i}>{d.Title} <Button variant="outlined" color="primary" size="small">Nominate</Button></li>
                    )
                  })
                : '' }
            </ul>
         </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Nominations
            <ul>
              {
                movies.map(e => {
                  return(
                    <li>{e}</li>
                  )
                })
              }
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
