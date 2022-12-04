import { useState, useEffect, useRef } from react;

function Audio(props) {
    
    const audioBook = new Audio(props.audioBookData.audioBookFile);

    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [ isPlaying, setIsPlaying] = useState(false);
    // const audioRef = useRef(new Audio(audioBook));
    // const intervalRef = useRef();
    // const isReady = useRef(false);

    const { duration } = audioRef.current;

    const toPrevTrack = () => {
        console.log('TODO go to prev');
    }

    const toNextTrack = () => {
        console.log('TODO go to next');
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="audio-book-player">
                        <div className="cover-art">
                            <Image
                                className="img-fluid"
                                src={tracks.coverImage}
                                alt={`Cover for ${title} by ${author}`}
                            />
                            <h2>{title}</h2>
                            <h3>{author}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Audio;