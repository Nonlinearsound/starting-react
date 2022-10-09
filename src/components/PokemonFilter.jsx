import React, { useContext } from 'react';
import PokemonContext from '../PokemonContext';

const PokemonFilter = () => {
    const {state: {filter}, dispatch} = useContext(PokemonContext);
    return (
        <input 
        onChange={(evt) => dispatch({
            type: "SET_FILTER",
            payload:evt.target.value
        })} 
        value={filter} />
    );
}

export default PokemonFilter;
