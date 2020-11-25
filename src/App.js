// Formatting
import React, { useState, useEffect } from 'react';
import spinner from './spinner.png';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTypicode = async () => {
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return data;
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    // Use async/await
    getTypicode().then(data => {
      setIsLoading(false);
      setData(prev => [...prev, ...data]);
    });
  }, []);

  //Septate component
  const list = () => {
    return (
      data &&
      data.map(data => {
        return (
          <li key={data.id}>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
          </li>
        );
      })
    );
  };

  return (
    <div className='App'>
      <header>
        <h1>კაპოს ცხრილი</h1>
      </header>
      <main>
        {isLoading ? <Img src={spinner} alt='spinner' /> : <Ul>{list()}</Ul>}
      </main>
    </div>
  );
}

export default App;

const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
`;
const Img = styled.img`
  width: 40%;
  height: 40%;
`;
