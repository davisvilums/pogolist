import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import GetPokemonCP from './GetPokemonCP';

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache({}),
});

const getPokemonQuery = gql`
  {
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
        is_default
        is_mega
      }
      pokemon_v2_pokemonstats {
        base_stat
      }
    }
  }
`;

function GetDataGrahp() {
  const [pokemonList, setpokemonList] = useState(null);
  console.log(pokemonList, 'EXPORT2');
  useEffect(() => {
    client
      .query({
        query: getPokemonQuery,
      })
      .then((result) => {
        var pokemons = result.data.pokemon_v2_pokemon;
        var pokeList = new Array();
        // console.log(pokemons);
        for (const pokemon of pokemons) {
          var pok = new Object();
          pok.cp = GetPokemonCP(pokemon.pokemon_v2_pokemonstats);
          pok.name = pokemon.name;
          pok.order = pokemon.order;
          pok.id = pokemon.id;
          pok.kind = 'normal';
          pok.gen = pokemon.generation_id;

          //   pok.sprite: sprite,
          pok.visible = true;
          pok.released = true;

          //   console.log(
          //     pokemon.pokemon_v2_pokemonforms[0].is_default,
          //     pokemon.pokemon_v2_pokemonforms[0].is_mega
          //   );
          //   console.log(
          //     pokemon.pokemon_v2_pokemonspecy.is_baby,
          //     pokemon.pokemon_v2_pokemonspecy.is_legendary,
          //     pokemon.pokemon_v2_pokemonspecy.is_mythical
          //   );

          if (pokemon.order < 0) {
            var evPoId =
              pokemon.pokemon_v2_pokemonspecy.evolves_from_species_id;
            if (evPoId) {
              var obj = pokeList.find(function (pok) {
                if (pok && pok.id == evPoId) return true;
              });
              if (obj && obj.order > 0) pok.order = obj.order + 0.1;
            }
          }
          if (pok.order < 0) {
            pok.order = pok.id + 200;
          }

          pok.sprite =
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
            pok.id +
            '.png';
          if (pokemon.pokemon_v2_pokemonforms[1]) {
            var forms = pokemon.pokemon_v2_pokemonforms;
            // console.log(pokemon.pokemon_v2_pokemonforms, 'FORMS');

            forms.map((form, index) => {
              var pokf = Object.assign({}, pok);
              pokf.id = form.id;
              pokf.name = form.name;
              //   pokf.imgname = pokf.id + form.name;
              var newname = form.name.split('-');
              //   console.log(newname, 'newname1');
              if (newname.length > 0) {
                // newname = newname.shift().join('-');
                // newname =
                pokf.imgname = pok.id + '-' + newname[1];
                // console.log(pokf.imgname);
                pokf.sprite =
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' +
                  pok.imgname +
                  '.svg';
              }
              //   var newname = form.name.split('-').shift().join('-');
              //   console.log(newname);

              pokeList.push(pokf);
            });
          } else {
            pokeList.push(pok);
          }
        }
        // pokeList = pokeList.map((pok, index) => {
        //   //   console.log(pok.name, pok.id, pok.order);
        //   var img1 =
        //     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' +
        //     pok.id +
        //     '.png';

        //   fetch(img1, { method: 'HEAD' })
        //     .then((res) => {
        //       if (res.ok) {
        //         // console.log('EXISTS', img1);
        //         pok.sprite = img1;
        //       } else {
        //         if (pok.imgname) {
        //           var img2 =
        //             'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' +
        //             pok.imgname +
        //             '.svg';
        //           //   console.log(img2, 'IMG2');
        //           pok.sprite = img2;
        //         }
        //         // console.log(pok.name);
        //         // console.log('FAILS', img1);
        //         // var img2 =
        //         //   'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' +
        //         //   pok.imgname +
        //         //   '.svg' +
        //         //   pok.id +
        //         //   '.svg';
        //       }
        //     })
        //     .catch((err) => console.log('Error:', err));
        // });
        // console.log(pokeList, 'EXPORT');
        setpokemonList(pokeList);
      });
  }, []);

  return pokemonList;
}

export default GetDataGrahp;

//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png //ARTWORK
//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/412-sandy.svg //SVG
//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10099.png //SPRITE
