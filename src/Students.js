import React, { useState } from 'react';
import './App.css';

function Students() {
  const studentFormInitialData = {
    id: 0,
    name: ''
  }
  const [studentFormData, setStudentFormData] = useState(studentFormInitialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentFormData({
      ...studentFormData,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className='student-from'>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>
          ID:
          <input name='id' type="text" value={studentFormData.id} onChange={handleInputChange} />
        </label>
        <label>
          Name:
          <input name='name' type="text" value={studentFormData.name} onChange={handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>ID:{studentFormData.id}, name:{studentFormData.name}</p>

      <h2>Students Data</h2>
      <table>
        <tbody>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Students;
