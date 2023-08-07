
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

function App() {

  const [progress,setProgress]=useState(0)
  // const apiKey=process.env.API_KEY
  async function setProgressFunction(progress){
    setProgress(progress)
  }

  return (<Router>
    <Navbar title="News-Monkey"></Navbar>
    <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(100)}
      />
    <Routes>
      <Route exact path="/" element={<News setProgress={setProgressFunction} apiKey={process.env.REACT_APP_API_KEY} />} />
      <Route exact path="/business" element={<News setProgress={setProgressFunction} apiKey={process.env.REACT_APP_API_KEY}  key='business' category='business' />} ></Route>
      <Route exact path="/general" element={<News setProgress={setProgressFunction} apiKey={process.env.REACT_APP_API_KEY} key='general'  category='general' />} />
      <Route exact path="/entertainment" element={<News setProgress={setProgressFunction} apiKey={process.env.REACT_APP_API_KEY} key='entertainment'  category='entertainment' />} />
      <Route exact path="/health" element={<News setProgress={setProgressFunction} apiKey={process.env.REACT_APP_API_KEY} key='health'  category='health' />} />
      <Route exact path="/science" element={<News setProgress={setProgressFunction} apiKey={process.env.REACT_APP_API_KEY} key='science'  category='science' />} />
      <Route exact path="/sports" element={<News setProgress={setProgressFunction} apiKey={process.env.REACT_APP_API_KEY} key='sports'  category='sports' />} />
      <Route exact path="/technology" element={<News setProgress={setProgressFunction} apiKey={process.env.REACT_APP_API_KEY} key='technology'  category='technology' />} />
    </Routes>
  </Router>)



}

export default App;
