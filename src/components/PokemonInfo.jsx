import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

// PokemonInfo als zusätzliche Komponente, die die Objekt-Elemente der "base"-Eigenschaft
// des Pokemon-Objekts anzeigt.
// Hier loopen wir per Object.keys() über die Keys des "base"-Objektes und erstellen
// daraus einfach eine neue Tabelle mit Reihen, die den Key und dessen Value anzeigen
// per übergebenem base und base[key]
//
// base wird übergeben über den Spread-Operator (...) ist im Edneffekt ein
// Object.assign() - kopiert einfach alle enumerierbaren properties der Proplist des Objektes auf ein anders (ne shallow copy sozusagen)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
const PokemonInfo = () => {
    const selectedItem = useSelector(state => state.selectedItem);
    // dispatch is not being used here, we only show stuff

    return selectedItem ? (
        <div>
            <h1>{selectedItem.name.english}</h1>
            <table>
            {Object.keys(selectedItem.base).map((key) => (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{selectedItem.base[key]}</td>
                </tr>
            ))}
            </table>
        </div>
    ) : null;
};

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired
  })
}

export default PokemonInfo;
