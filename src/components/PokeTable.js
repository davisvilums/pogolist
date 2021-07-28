import PokemonCard from './PokemonCard';

export default function PokeTable({ data }) {
  return (
    <div className='PokemonList'>
      {data.map((row) => (
        <PokemonCard pokemon={row} key={row.name} />
      ))}
    </div>
  );
}
