import { gql, useQuery } from '@apollo/client';

export const getPokemonQuery = gql`
  query samplePokeAPIquery {
    pokemon_v2_pokemon {
      name
      id
      order
      pokemon_v2_pokemonspecy {
        id
        is_mythical
        is_legendary
        is_baby
        name
        evolves_from_species_id
        generation_id
      }
      pokemon_v2_pokemonforms {
        name
        id
      }
    }
  }
`;

function GetPokemon() {
  //   const { loading, error, data } = useQuery(getPokemonQuery);
  //   console.log('graphh', data);
  //   console.log('graphh');
  return <div>test</div>;
}

export default GetPokemon;
