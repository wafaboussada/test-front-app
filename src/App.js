import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [age, setAge] = useState(undefined);
  const [year, setYear] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    const currentYear = new Date().getFullYear();
    const re = /^[0-9\b]+$/;
      if (e.value === '' ||(e.value.length <=4
        && Number(e.value) <= currentYear
        && re.test(e.value))) {
        setYear(e.value)
      }
  }
  const sumbitForm = (e) => {
    const headers = {
      "Content-Type": "application/json"
  }
    e.preventDefault()
    axios.post('http://localhost:7000/calculate_age', { year })
    .then((response) => {
      setOpen(true);
      setAge(response.data.age);
    })
    .catch(function (error) {
      setError(true);
    });
  }
  return (
    <div className="App">
      <form onSubmit={sumbitForm} className="form">
        <label>Année</label>
        <input 
        onChange={(e) => handleChange(e.target)}
        value={year}
        type="text" 
        placeholder="Entrez Votre Année ..."
        pattern="[0-9]{1,4}"
        />
        <button className="button">Submit</button>
        {open && (
          <div>Your age is {age}</div>
        )}
        {error && (
          <div style={{color: 'lightcoral'}}>ERROR ! Please try agin</div>
        )}
      </form>
    </div>
  );
}

export default App;
