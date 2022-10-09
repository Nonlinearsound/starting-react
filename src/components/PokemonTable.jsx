import React, { useContext } from 'react';
import PokemonContext from '../PokemonContext';
import PokemonRow from './PokemonRow';

const PokemonTable = () => {
    const {pokemon,filter,selectedItemSet} = useContext(PokemonContext);
    return (
        <table width="100%">
            <thead>
                <tr>
                <th>Name</th>
                <th>Type</th>
                </tr>
            </thead>
            <tbody>{
                pokemon
                .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
                .slice(0,20).map((pokemon) => (
                <PokemonRow key={pokemon.id} pokemon={pokemon} onSelect={() => selectedItemSet(pokemon)} />
                ))}
            </tbody>
        </table>
    );
}

export default PokemonTable;