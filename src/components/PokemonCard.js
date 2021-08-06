function PokemonCard(props) {
  var pokemon = props.pokemon;
  var removePokemon = props.removePokemon;
  var select = props.select;
  var lenthClass = "";
  if (pokemon.name.length > 15) {
    lenthClass = "pokemonName15";
  } else if (pokemon.name.length > 12) {
    lenthClass = "pokemonName12";
  } else if (pokemon.name.length > 10) {
    lenthClass = "pokemonName10";
  }

  return (
    <div
      className={`pokemonItem ${pokemon.selected ? "selected" : ""}`}
      onClick={() => select(pokemon.id)}
    >
      {pokemon.selected}
      <div className="pokemonID">#{pokemon.id}</div>
      <div
        className="pokemonGeneration"
        // onClick={() => removePokemon(pokemon.id)}
      >
        G{pokemon.gen}
      </div>
      <div className="pokemonSpriteWrap">
        <img src={pokemon.sprite} alt="" className="pokemonSprite" />
      </div>
      <div className="PokemonMeta">
        <div className={`banner pokemonName ${lenthClass}`}>
          <div>{pokemon.name.split("-").join(" ")}</div>
        </div>
        <div className="pokemonCP">CP {pokemon.cp}</div>
      </div>
      {/* <div className="pokemonData"> */}
      {/* <div>{pokemon.tags.join()}</div> */}

      {/* {pokemon.released && <div>RELEASED</div>} */}
      {/* {pokemon.name.length > 15 && <div>{pokemon.name.length}</div>} */}
      {/* <div>kind: {pokemon.kind}</div> */}
      {/* <div>selected: {pokemon.selected}</div> */}
      {/* </div> */}
    </div>
  );
}

export default PokemonCard;
