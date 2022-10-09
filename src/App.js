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

const pokemonReducer = (state,action) => {
  switch( action.type ) {
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "SET_POKEMON":
      return {
        ...state,
        pokemon: action.payload,
      };
    case "SET_SELECTED_ITEM":
      return {
        ...state,
        selectedItem: action.payload,
      };
    default:
      throw new Error("No action for reducer");
  }
}

function App() {
  const [state,dispatch] = React.useReducer(pokemonReducer,{
    pokemon: [],
    filter: "",
    selectedItem: null
  });

  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then(response => response.json())
      .then((data) => dispatch({
        type: "SET_POKEMON",
        payload: data
      }));
  },[]);

  if(!state.pokemon){
    return <div>Loading data</div>
  }

  return( 
    <PokemonContext.Provider
      value={{
        state,
        dispatch
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
