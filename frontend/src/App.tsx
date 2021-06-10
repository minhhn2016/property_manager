import React from 'react';
import './App.css';

import PropertiesList from './components/PropertiesList';

function App() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<IAPIResponse>();

  React.useEffect(() => {
    (
      async () => {
        const response = await fetch('http://localhost:8080/api/properties/all');
        const json = await response.json();
        setData(json);
        setLoading(false);
      }
    )();
  }, []);

  if (loading) return <p>Loading</p>
  return (
    <div className="App">
      {data && <PropertiesList {...data} />}
    </div>
  );
}

export default App;
