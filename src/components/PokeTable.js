import PokemonCard from './PokemonCard';

export default function PokeTable({ data }) {
  return (
    <div className='PokemonList'>
      {data[0] &&
        data.map((row) => <PokemonCard pokemon={row} key={row.name} />)}
    </div>
  );
}
