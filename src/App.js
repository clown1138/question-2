import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Datapage from './Datapage';


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/Datapage" element={<Datapage />} />
      </Routes>
    </Router>
  );
}

export default App;
