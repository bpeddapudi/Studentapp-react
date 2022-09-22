import React, { useState , useContext} from 'react';
import { Context } from "./../Context"

function NewStudent() {
    const [students, setStudents, refresh, setRefresh]  = useContext(Context);

  const studentFormData = {id: 0, name: ""};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    studentFormData[name] = value; 
  };

  const handleSubmit =  (event) => {
    event.preventDefault();
    let submit = document.getElementById("submit");
    
    if (submit.value === "Update") {
        putHandler(event);
    } else {
        postHandler(event);
    }
    event.target.reset();
    
  };

  const postHandler = async (event) => {
    let res = await fetch("http://localhost:8000/save", {
        method: "POST",
        body: JSON.stringify({
          name: event.target.name.value,
          id: event.target.id.value
        }),
        headers: { 'Content-Type': 'application/json' },
      }).then(res => setRefresh(!refresh));
  }

  const putHandler = async (event) => {
    let res = await fetch("http://localhost:8000/edit", {
        method: "PUT",
        body: JSON.stringify({
          name: event.target.name.value,
          id: event.target.id.value
        }),
        headers: { 'Content-Type': 'application/json' },
      }).then(res => setRefresh(!refresh));
  }


  return (
    <div className='student-from'>
    <form onSubmit={handleSubmit} autoComplete="off">
        <label>
            ID:
            <input name='id' id="id" type="text"  onChange={handleInputChange} />
        </label>
        <label>
            Name:
            <input name='name' id="name" type="text"  onChange={handleInputChange} />
        </label>
        <input type="submit" value="Submit" id="submit" action="submit"/>
    </form>
  </div>
  );
}

export default NewStudent;