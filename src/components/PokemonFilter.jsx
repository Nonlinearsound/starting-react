import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const PokemonFilter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);
    
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
