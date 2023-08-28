import Auth from "./components/Auth";
import "./App.css";
import { db, auth, storage } from "./config/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setnewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");
  
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovieList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await deleteDoc(movieDoc); 
    getMovieList();
  }
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList()
   
  };
  useEffect(() => { 
    getMovieList();
  }, []);

  const uploadFile = async () => {
    try {
       if (!fileUpload) return;
       const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
       await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.log(error);
    }
   
  }
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
      title: newMovieTitle,
      releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser.uid
      });
      getMovieList();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      <Auth />
      <div>
        <input placeholder="movie title ..." onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input
          placeholder="release date ..."
          type="number"
          onChange={(e) => setnewReleaseDate(Number(e.target.value))}
        />
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
        <label>received an oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>Name : {movie.title}</h1>
            <p>Release Date : {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder="new title.." onChange={(e) => setUpdatedTitle(e.target.value)} />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
