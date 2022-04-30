import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import Player from './Player';
import { getTokenFromUrl } from './spotify';

import SpotifyWebApi from 'spotify-web-api-js';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';


//responsible for interaction between our react app and spotify.
const spotify = new SpotifyWebApi();


function App() {

  // const [token, setToken] = useState(null);

  const [{ user, token }, dispatch] = useStateValue();


  //Run code based on a given condition
  useEffect(() => {

    const hash = getTokenFromUrl();

    // console.log(hash);

    window.location.hash = "";

    const _token = hash.access_token;

    // console.log(_token);

    if (_token) {

      dispatch({
        type: actionTypes.SET_TOKEN,
        token: _token,
      })

      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        // console.log(user);

        dispatch({
          type: actionTypes.SET_USER,
          user: user
        })

      });

      spotify.getUserPlaylists().then((playlists) => (
        dispatch({
          type: actionTypes.SET_PLAYLISTS,
          playlists: playlists,
        })
      ));

      spotify.getPlaylist('37i9dQZEVXcTQepMgUm0pT').then(response => (
        dispatch({
          type: actionTypes.SET_DISCOVER_WEEKLY,
          discover_weekly: response,
        })
      ));

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: actionTypes.SET_TOP_ARTISTS,
          top_artists: response,
        })
      );

      dispatch({
        type: actionTypes.SET_SPOTIFY,
        spotify: spotify,
      });



    }


  }, [dispatch])


  // console.log(user);
  // console.log(token);

  return (
    //BEM
    <div className="app">


      {token ?
        (<Player spotify={spotify} />) : (
          <Login />
        )
      }




    </div>
  );
}

export default App;
