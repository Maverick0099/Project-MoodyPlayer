import React from 'react'
import { useState } from 'react'
import './MoodSongs.css'

const MoodSongs = ({ Songs }) => {

    const [ isPlaying, setIsPlaying ] = useState(null);

    const handlePlayPause = (index) => {
        if (isPlaying === index) {
            setIsPlaying(null);
        } else {
            setIsPlaying(index);
        }
    };


    return (
        <div className='songs-section'>
            <h2 className='songs-heading'>🎧 Recommended Songs</h2>

            <div className='song-list'>
                {Songs.map((song, index) => (
                <div className='song-item' key={index}>
                    <div className="title">
                        <span className="song-title">{song.title}</span>
                        {/* <span className="song-artist">{song.artist}</span> */}
                    </div>
                    <div className="play-pause-button">
                        {
                            isPlaying === index &&
                            <audio
                                src={song.audio} style={{
                                    display: 'none'
                                }}
                                autoPlay={isPlaying === index}
                            ></audio>
                        }
                        <button onClick={() => handlePlayPause(index)}>
                            {isPlaying === index ? <i className="ri-pause-line"></i> : <i className="ri-play-circle-fill"></i>}
                        </button>
                    </div>

                </div>
            ))}

            </div>

            

        </div>
    )
}

export default MoodSongs