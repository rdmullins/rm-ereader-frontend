import React, { useRef, useState, useEffect } from "react";
import { getStorage, ref, getBlob, getDownloadURL } from "firebase/storage";
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
//import audioBookFile from "https://firebasestorage.googleapis.com/v0/b/rm-ereader.appspot.com/o/frankenstein_01_shelley_64kb.mp3?alt=media&token=3258db8d-da33-42a2-bb91-61a873bedd21";

function Audio(props) {
    // console.log("From Audio tag. Id of book is ", props.audioBookId);
    // console.log("Download URL is ", props.audioBookURL);
    

    const [coverImageURL, setCoverImageURL] = useState(null);
    const storage2 = getStorage();
    const audioBookCover = ref(storage2, `gs://rm-ereader.appspot.com/pg84.cover.medium.jpg`);
    const storage = getStorage();
    const audioBookRef = ref(storage, `gs://rm-ereader.appspot.com/frankenstein_01_shelley_64kb.mp3`);

    // console.log("Inside Featured Book component. FeaturedBookData is ", props.featuredBookData);

    useEffect(() => {
        console.log("running tmp to get audiobook file")
        async function getData() {
          const tmp = await getDownloadURL(audioBookRef)
        props.setAudioBookURL(tmp);
    
        }
        getData();
    
      }, []);

    console.log("From Featured Book - AudioBookURL is ", props.audioBookURL)


      useEffect(() => {
        console.log("running tmp to get audiobook cover")
        async function getData() {
          const tmp = await getDownloadURL(audioBookCover)
          setCoverImageURL(tmp);
    
        }
        getData();
    
      }, []);

      const Player = () => (
        <AudioPlayer
          autoPlay
          src={props.audioBookURL}
          onPlay={e => console.log("onPlay")}
          // other props here
        />
      );

      let AudioBookPlayer = Player();

    return (
        <>
          <div className="container">
            <div className="row text-center">
              <div className="col">
                <h1>Frankenstein; Or, The Modern Promethius</h1>
              </div>
            </div>
            <div className="row text-center">
              <div className="col">
                <img src={coverImageURL} alt="book cover" className="h-100"/>
              </div>
            </div>
            <div className="row text-center">
              <div className="col">
              <AudioPlayer
                autoPlay
                src={props.audioBookURL}
                onPlay={e => console.log("onPlay")}
                // other props here
              />
              </div>
            </div>
            {/* <div className="row text-center">
              <div className="col">
                <a href={audioBookFile}>Audio Book Download</a>
              </div>
            </div> */}
          </div>
        </>
    )
};

export default Audio;



// const audioBook = new Audio(props.audioBookData.audioBookFile);

//     const [trackIndex, setTrackIndex] = useState(0);
//     const [trackProgress, setTrackProgress] = useState(0);
//     const [ isPlaying, setIsPlaying] = useState(false);
//     // const audioRef = useRef(new Audio(audioBook));
//     // const intervalRef = useRef();
//     // const isReady = useRef(false);

//     const { duration } = audioRef.current;

//     const toPrevTrack = () => {
//         console.log('TODO go to prev');
//     }

//     const toNextTrack = () => {
//         console.log('TODO go to next');
//     }
    
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col">
//                     <div className="audio-book-player">
//                         <div className="cover-art">
//                             <Image
//                                 className="img-fluid"
//                                 src={tracks.coverImage}
//                                 alt={`Cover for ${title} by ${author}`}
//                             />
//                             <h2>{title}</h2>
//                             <h3>{author}</h3>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };