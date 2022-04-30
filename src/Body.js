import { Favorite, MoreHoriz, PlayCircleFilled } from '@mui/icons-material';
import React from 'react';

import './Body.css';
import Header from './Header';
import SongRow from './SongRow';
import { useStateValue } from './StateProvider';

import { actionTypes } from './reducer';

const Body = ({ spotify }) => {


    const [{ discover_weekly }, dispatch] = useStateValue();

    const playPlaylist = (id) => {
        spotify
            .play({
                context_uri: `spotify:playlist:37i9dQZEVXcTQepMgUm0pT`,

            })
            .then((res) => {

                console.log(res);

                spotify.getMyCurrentPlayingTrack().then((r) => {
                    dispatch({
                        type: actionTypes.SET_ITEM,
                        item: r.item,
                    });
                    dispatch({
                        type: actionTypes.SET_PLAYING,
                        playing: true,
                    });
                });
            })
            .catch(err => console.log(err))
            ;
    };

    const playSong = (id) => {
        spotify
            .play({
                uris: [`spotify:track:${id}`],
            })
            .then((res) => {
                spotify.getMyCurrentPlayingTrack().then((r) => {
                    dispatch({
                        type: actionTypes.SET_ITEM,
                        item: r.item,
                    });
                    dispatch({
                        type: actionTypes.SET_PLAYING,
                        playing: true,
                    });
                });
            })
            .catch(err => console.log(err))
            ;
    };

    return (
        <div className="body">

            <Header spotify={spotify} />

            <div className="body__info">
                <img src={discover_weekly?.images[0].url} alt="" />

                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>

                </div>

            </div>

            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilled
                        className="body__shuffle"
                        onClick={playPlaylist}
                    />
                    <Favorite fontSize="large" />
                    <MoreHoriz />
                </div>
                {/* List of songs */}

                {
                    discover_weekly?.tracks.items.map(item => (
                        <SongRow
                            playSong={playSong}
                            track={item.track}
                        />
                    ))
                }


            </div>

        </div>
    );
};

export default Body;