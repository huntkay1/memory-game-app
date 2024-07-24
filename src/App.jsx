import { useState, useEffect } from 'react';
import './index.css';
import Card from './Card';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/ditto`) 
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error))
    
  }, [])

  console.log(data);
  return (
    <>
      {data != null && 
        <Card 
          data={data}
        />
      }


    </>
  )
}

export default App
