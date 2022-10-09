import './App.css';
import React from 'react';
import styled from '@emotion/styled';
import PokemonTable from "./components/PokemonTable"
import PokemonInfo from './components/PokemonInfo';
import PokemonFilter from "./components/PokemonFilter"
import PokemonContext from './PokemonContext';


const DataRow = styled.tr `
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;
const AppContainer = styled.div `
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;


function App() {
  const [filter,filterSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);
  const [pokemon,pokemonSet] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then(response => response.json())
      .then(data => pokemonSet(data));
  },[]);

  return( 
    <PokemonContext.Provider
      value={{
        filter,
        filterSet,
        selectedItem,
        selectedItemSet,
        pokemon,
        pokemonSet
      }}
    >
      <AppContainer>
        <h1 className='title'>Pokemon Search</h1>
        <PokemonFilter/>
        <DataRow>
          <div>
            <PokemonTable/>
          </div>
            <PokemonInfo />
        </DataRow>
      </AppContainer>
    </PokemonContext.Provider>
  );
}

export default App;
