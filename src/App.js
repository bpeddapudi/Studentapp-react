import React, { useState, createContext } from 'react';
import { Context } from "./Context";

import NewStudent from './components/NewStudent';
import StudentList from './components/StudentList';

function App() {
 
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(true);

  return (
    <Context.Provider value={[students, setStudents, refresh, setRefresh]}>
      <div> <NewStudent></NewStudent><h2>Students List</h2> <StudentList/> </div>
    </Context.Provider>
  );
}

export default App;
