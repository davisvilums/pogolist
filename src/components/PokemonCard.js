function PokemonCard(props) {
  var pokemon = props.pokemon;
  var removePokemon = props.removePokemon;

  return (
    <div className='pokemonItem'>
      <div className='pokemonID'>#{pokemon.id}</div>
      <div
        className='pokemonGeneration'
        onClick={() => removePokemon(pokemon.id)}
      >
        G{pokemon.gen}
      </div>
      <div className='pokemonSpriteWrap'>
        <img src={pokemon.sprite} alt='' className='pokemonSprite' />
      </div>
      <div
        className={`banner ${
          pokemon.name.length > 12
            ? 'pokemonName pokemonNameSmall'
            : 'pokemonName'
        }`}
      >
        {pokemon.name.split('-').join(' ')}
      </div>
      <div className='pokemonCP'>{pokemon.cp}</div>
      <div className='pokemonData'>
        {/* <div>{pokemon.newsprite}</div> */}

        {/* {pokemon.released && <div>RELEASED</div>} */}
        {/* {pokemon.name.length > 15 && <div>{pokemon.name.length}</div>} */}
        {/* <div>kind: {pokemon.kind}</div> */}
        {/* <div>order: {pokemon.order}</div> */}
      </div>
    </div>
  );
}

export default PokemonCard;
