import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Repeat from "./Repeat"

const RepeatDisplay = styled.div `
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 50%;
  margin-right: 2px;
`;

const PokemonRow = ({pokemon, onSelect}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Repeat numTimes={pokemon.base.HP/10}>
        {(index) => ( 
          <RepeatDisplay key={index}></RepeatDisplay> 
        )}
      </Repeat>
    </td>
    <td>
      <Button variant="outlined" size="small" color="success" onClick={() => onSelect(pokemon)}>Select</Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
}

export default PokemonRow;
