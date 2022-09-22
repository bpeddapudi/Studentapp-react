import React, { useEffect, useState, useContext } from 'react';
import { Context } from "./../Context"

function StudentList() {
    const [students, setStudents, refresh, setRefresh]  = useContext(Context);

    useEffect(() => {
        fetch('http://localhost:8000/list')
        .then(res => res.json())
        .then((result) => {
            setStudents(result);
        });
    }, [refresh]);

    let deleteClickHandler = async (e) => {
        e.preventDefault();
        let res = await fetch("http://localhost:8000/delete", {
        method: "DELETE",
        body: JSON.stringify({
          id: e.target.parentElement.id
        }),
        headers: { 'Content-Type': 'application/json' },
      }).then(res => setRefresh(!refresh));
    };

    let editClickHandler = async (e) => {
        e.preventDefault();
        let id =  document.getElementById("id");
        let name = document.getElementById("name");
        let submit = document.getElementById("submit");
        submit.value = "Update";

        //id.readonly = "readonly";
        id.value = e.target.parentElement.getAttribute("id");
        name.value = e.target.parentElement.getAttribute("name");
    };

  return (
    <table className='table table-striped'>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NAME</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(function(student, index){
                    return <tr key={ student.id }><td>{student.id}</td><td>{student.name}</td><td id={student.id} name={student.name}><i onClick={deleteClickHandler} className="bi bi-trash"></i> &nbsp;&nbsp; <i className='bi bi-pencil' onClick={editClickHandler}></i></td></tr>;
                  })}
        </tbody>
      </table>
  );
}

export default StudentList;