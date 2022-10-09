import './App.css';
import React from 'react';
import styled from '@emotion/styled';
import PokemonTable from "./components/PokemonTable"
import PokemonInfo from './components/PokemonInfo';
import PokemonFilter from "./components/PokemonFilter"
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

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

const pokemonReducer = (state={
  pokemon: [],
  filter: "",
  selectedItem: null
},action) => {
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
      return state;
  }
}

const store = createStore(pokemonReducer);

function App() {
  const dispatch = useDispatch();
  const pokemon = useSelector(state => state.pokemon);


  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then(response => response.json())
      .then((data) => dispatch({
        type: "SET_POKEMON",
        payload: data
      }));
  },[]);

  if(!pokemon){
    return <div>Loading data</div>
  }

  return( 

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

  );
}

export default () => <Provider store={store}><App/></Provider>;