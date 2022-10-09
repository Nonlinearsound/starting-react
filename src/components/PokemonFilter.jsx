import React, { useContext } from 'react';
import PokemonContext from '../PokemonContext';

const PokemonFilter = () => {
    const {filter, filterSet} = useContext(PokemonContext);
    return (
        <input 
        onChange={(evt) => filterSet(evt.target.value)} 
        value={filter} />
    );
}

export default PokemonFilter;
