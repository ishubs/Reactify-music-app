import React, { Component } from "react";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Search from "./components/search";
import SpotifyWebApi from "spotify-web-api-js";


const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;

    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,

      searchTracks: [],
      li: "",
      search: "",
    };
  }
  
  search = async () => {
    await spotifyApi
      .searchTracks(this.state.search)

      .then((res, reject) => {
        this.setState({ searchTracks: res.tracks.items });
      });
  };
  // getmedia = (param) => {
  //   const headers = new Headers();
  //   headers.append("Content-Type", "application/json");
  //   headers.append("Authorization", "bearer" + this.token);
  //   axios.get(param, headers).then((res) => console.log(res));
  // };

  // Return the anchor part of a URL. Assume that the current URL is http://www.example.com/test.htm#part2:
  // var x = location.hash;
  // The result of x will be:
  // #part2
  
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
 
  onChangeHandler = (e) => {
    this.state.search = e.target.value;
    this.search();
  };



  render() {
    //
    return (
      <div container className="App" >
        <Typography variant="h1" style={{color:"white"}}>Reactify</Typography>
        <Grid item style={{ display: "flex", justifyContent: "center",alignItems:"center" }}>

          <Search onChangeHandler={this.onChangeHandler} />
          <Grid item>
          
          </Grid>
        </Grid>
        
        <h6>{this.state.searchTracks.length} songs found.</h6>
        {this.state.loggedIn ? (
          ""
        ) : (
          <a href="http://localhost:3000/app.html"> Login to Spotify </a>
        )}

        <Grid item container>
          {this.state.searchTracks.map((items) => {
            return (
              <Grid item xs={12} sm={4} key={items.uri}>
                <Paper elevation={8}>
                  <div>
                    <img
                      style={{ height: "200px", width: "200px" }}
                      src={items.album.images[0].url}
                    ></img>
                  </div>
                  <Typography variant="h5" color="primary">
                    {items.name}
                  </Typography>
                  <div>popularity: {items.popularity}</div>
                  <div>
                    <audio controls>
                      <source src={items.preview_url}></source>
                    </audio>
                  </div>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default App;
