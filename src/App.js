import './App.css';
import Pokemon from './pokemon.json'
import PropTypes from 'prop-types'
import React from 'react';

// This is a React component, called "Repeat"
// This function will create numTimes children of this React component
function Repeat(props){
  let items = [];
  for(let i=0; i<props.numTimes; i++){
    items.push(props.children(i));
  }
  return <div style={{
    display: "flex"
  }}>{items}</div>
}

const PokemonRow = ({pokemon, onSelect}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Repeat numTimes={pokemon.base.HP/10}>
        {(index) => ( 
          <div key={index} style={{
            width:6,
            height:6,
            backgroundColor: "red",
            borderRadius: "50%",
            marginRight: 2
          }}></div> 
        )}
      </Repeat>
    </td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select</button>
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

// PokemonInfo als zusätzliche Komponente, die die Objekt-Elemente der "base"-Eigenschaft
// des Pokemon-Objekts anzeigt.
// Hier loopen wir per Object.keys() über die Keys des "base"-Objektes und erstellen
// daraus einfach eine neue Tabelle mit Reihen, die den Key und dessen Value anzeigen
// per übergebenem base und base[key]
//
// base wird übergeben über den Spread-Operator (...) ist im Edneffekt ein
// Object.assign() - kopiert einfach alle enumerierbaren properties der Proplist des Objektes auf ein anders (ne shallow copy sozusagen)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
const PokemonInfo = ({name, base}) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map(key => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
    </table>
  </div>
);

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

function App() {
  const [filter,filterSet] = React.useState("");
  const [selectedItem, selectedItemSet] = React.useState(null);

  return( 
    <div 
      style={{
        margin: "auto",
        widh: 800,
        paddingTop: "1rem",
      }}>
      <h1 className='title'>Pokemon Search</h1>
      <input onChange={(evt) => filterSet(evt.target.value)} value={filter} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "70% 30%",
        gridColumnGap: "1rem"
      }}>
        <div>
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>{
              Pokemon
              .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
              .slice(0,20).map((pokemon) => (
                <PokemonRow key={pokemon.id} pokemon={pokemon} onSelect={() => selectedItemSet(pokemon)} />
              ))}
            </tbody>
          </table>
        </div>
        {selectedItem && (
          <PokemonInfo {... selectedItem} />
        )}
      </div>
    </div>
  );
}

export default App;
