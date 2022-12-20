import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
// import { getStorage, ref, getBlob, getDownloadURL } from "firebase/storage";
// import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
//import audioBookFile from "https://firebasestorage.googleapis.com/v0/b/rm-ereader.appspot.com/o/frankenstein_01_shelley_64kb.mp3?alt=media&token=3258db8d-da33-42a2-bb91-61a873bedd21";

function Audio(props) {
    // console.log("From Audio tag. Id of book is ", props.audioBookId);
    // console.log("Download URL is ", props.audioBookURL);

    const [trackList, setTrackList] = useState([]);
    const [currentTrack, setCurrentTrack] = useState("");
    //const [coverImageURL, setCoverImageURL] = useState(props.bookData?.[0].cover_url);
    const [audioBookRecord, setAudioBookRecord] = useState([]);
    // const storage2 = getStorage();
    // const audioBookCover = ref(storage2, `gs://rm-ereader.appspot.com/pg84.cover.medium.jpg`);
    // const storage = getStorage();
    // const audioBookRef = ref(storage, `gs://rm-ereader.appspot.com/frankenstein_01_shelley_64kb.mp3`);

    // console.log("Inside Featured Book component. FeaturedBookData is ", props.featuredBookData);

    // useEffect(() => {
    //     console.log("running tmp to get audiobook file")
    //     async function getData() {
    //       const tmp = await getDownloadURL(audioBookRef)
    //     props.setAudioBookURL(tmp);
    
    //     }
    //     getData();
    
    //   }, []);

    // console.log("From Featured Book - AudioBookURL is ", props.audioBookURL)


    //   useEffect(() => {
    //     console.log("running tmp to get audiobook cover")
    //     async function getData() {
    //       const tmp = await getDownloadURL(audioBookCover)
    //       setCoverImageURL(tmp);
    
    //     }
    //     getData();
    
    //   }, []);

      // const Player = () => (
      //   <AudioPlayer
      //     autoPlay
      //     src={props.audioBookURL}
      //     onPlay={e => console.log("onPlay")}
      //     showSkipControls={true}
      //     progressJumpStep={15000}
      //     progressJumpSteps={ {backward: 15000, forward: 15000} }
      //   />
      // );

      // let AudioBookPlayer = Player();

      //console.log("In audio component. BookData is ", props.bookData);

    useEffect(() => {
      let endpoint = `https://rm-ereader.uc.r.appspot.com/books/audiobook_api/?search=${props.audioBookId}`
      axios.get(endpoint)
      .then((response)=> {
        setAudioBookRecord(response.data)
        return response.data
      })
      // .then((collectionsList) => console.log("Collections: ", collectionsList))
      console.log("audiobook record inside useeffect: ", audioBookRecord);
    },[]);


    if (audioBookRecord.length < 1) {
      return (
        <>
        Loading...
        </>
      )
    }

    if (audioBookRecord?.length >= 1) {
      console.log(audioBookRecord);

      //setCurrentTrack(audioBookRecord?.[0].tracks[0].track_url);

      // Build Audio Track Listing from API Response

      let trackListHold=[];
      console.log("Track list length: ", (audioBookRecord?.[0].tracks).length);
      console.log("Sample URL: ", audioBookRecord?.[0].tracks[0].track_url);

      for (let i=0; i<=(audioBookRecord?.[0].tracks).length-1; i++) {
        console.log(i);
        trackListHold.push([
        <>
          <tr key={i+1}>
            <td>{i+1}</td>
            <td><div onClick={() => setCurrentTrack(audioBookRecord?.[0].tracks[i].track_url)}>Track {i+1}</div></td>
          </tr>
        </>
        ])
      };

      console.log("TrackListHold: ", trackListHold);

      // let trackListsToSet = trackListHold.map(()=> )

     // console.log(trackListsToSet);
     //setTrackList(trackListHold);


    return (
        <>
          <div className="container">
            <div className="row text-center">
              <div className="col">
                <h1 className="pt-2 vp-featured-text">{audioBookRecord?.[0].book.title}</h1>
                <h2 className="pt-2 vp-body-text">by {audioBookRecord?.[0].book.authors[0].first_name} {audioBookRecord?.[0].book.authors[0].last_name}</h2>
                <h3 className="p-3 vp-body-text">Narrated by {audioBookRecord?.[0].narrator.first_name} {audioBookRecord?.[0].narrator.last_name}</h3>
              </div>
            </div>
            <div className="row text-center">
              <div className="col">
                <img src={audioBookRecord?.[0].book.cover_url} alt="book cover" className="h-100 vp-book-cover pb-3"/>
              </div>
            </div>
            <div className="row text-center">
              <div className="col">
              <AudioPlayer
                autoPlay
                src={currentTrack}
                onPlay={e => console.log("onPlay")}
                // other props here
                progressJumpStep={15000}
                progressJumpSteps={ {backward: 15000, forward: 15000} }
              />
              </div>
            </div>
            <div className="row text-center vp-body-text">
              <div className="col">
                <a href={audioBookRecord?.[0].lib_link}>Visit This Title's Librivox Page</a>
              </div>
            </div>
          </div>

          <div className="container vp-body-text">
            <div className="row">
              <table className = "table table-hover table-striped overflow-auto h-auto">
                  <tbody>
                      {trackListHold}
                  </tbody>
              </table>
            </div>
          </div>
        </>
    )
          };
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