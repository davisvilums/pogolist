import axios from 'axios';

import { ReleasedList } from '../datasets/ReleasedList';
import GetPokemonCP from './GetPokemonCP';

function getSVGlink(sprite) {
  var evArr = sprite.split('/');
  evArr = evArr[evArr.length - 1];
  evArr = evArr.split('.png');
  evArr = evArr[0];
  var newsprite =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' +
    evArr +
    '.svg';
  return newsprite;
}

// async function getData(dataList, pokeList, setpokemonList) {
const getData = async (dataList, pokeList) => {
  return Promise.all(
    dataList.map(async (pokemon) => {
      await axios.get(pokemon.url).then(async (resp) => {
        var cp = GetPokemonCP(resp.data.stats);
        var name = resp.data.name;
        var id = resp.data.id;
        var order = resp.data.order;
        var kind = 'normal';

        var sprite = resp.data.sprites.other['official-artwork'].front_default;
        if (!sprite || name.includes('indeedee-male'))
          sprite = resp.data.sprites.front_default;
        if (name.includes('castform-')) {
          var evArr = name.split('castform');
          var newname = 351 + evArr[1] + '.svg';
          sprite =
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' +
            newname;
        }
        // var sprite = resp.data.sprites.front_default;

        await axios.get(resp.data.species.url).then((resp) => {
          if (resp.data.is_legendary) kind = 'legendary';
          if (resp.data.is_mythical) kind = 'mythical';
          if (resp.data.is_baby) kind = 'baby';

          // if (order < 0 && resp.data.evolves_from_species) {
          //   var evUrl = resp.data.evolves_from_species.url;

          if (order < 0 && resp.data.evolves_from_species) {
            var evUrl = resp.data.evolves_from_species.url;
            var evArr = evUrl.split('/');
            var evPoId = evArr[evArr.length - 2];

            var obj = pokeList.findIndex(function (pok) {
              if (pok && pok.id == evPoId) return true;
            });

            if (pokeList[obj] && obj > 0) {
              order = pokeList[obj].order + 0.5;
            }
          } else if (order < 0 && id != resp.data.id) {
            order = resp.data.id + 200;
          }
        });
        if (order < 0) {
          order = id + 200;
        }

        var forms = resp.data.forms;
        var formsCount = 0;
        if (forms) {
          formsCount = forms.length;
        }

        var gen;
        switch (true) {
          case id <= 151:
            gen = 1;
            break;
          case id <= 251:
            gen = 2;
            break;
          case id <= 386:
            gen = 3;
            break;
          case id <= 493:
            gen = 4;
            break;
          case id <= 649:
            gen = 5;
            break;
          case id <= 721:
            gen = 6;
            break;
          case id <= 809:
            gen = 7;
            break;
          case id <= 10000:
            gen = 8;
            break;
          case id <= 10003:
            gen = 3;
            break;
          case id <= 10015:
            gen = 3;
            break;
          case id <= 10024:
            gen = 5;
            break;
          case id <= 10090:
            gen = 6;
            break;
          case id <= 10115:
            gen = 7;
            break;
          case id <= 10185:
            gen = 8;
            break;
          default:
            gen = 10;
            break;
        }

        var released = false;
        if (ReleasedList.find((element) => element == id)) released = true;

        var pokemonData = {
          id: id,
          name: name,
          sprite: sprite,
          order: order,
          forms: formsCount,
          cp: cp,
          gen: gen,
          kind: kind,
          visible: true,
          released: released,
        };

        if (formsCount > 1) {
          forms.map((pokemonF, index) => {
            axios.get(pokemonF.url).then((resp) => {
              var pokemonDataF = Object.assign({}, pokemonData);
              var newSprite = resp.data.sprites.front_default;
              if (
                newSprite &&
                id !== 671 &&
                id !== 773 &&
                id !== 676 &&
                id !== 666 &&
                id !== 670 &&
                id !== 669
              ) {
                newSprite = getSVGlink(newSprite);
              }
              if (index > 0) {
                pokemonDataF.sprite = newSprite;
                pokemonDataF.name = resp.data.name;
              }
              if (pokemonDataF.sprite) {
                pokeList.push(pokemonDataF);
              }
            });
          });
        } else {
          pokeList.push(pokemonData);
        }
      });
    })
  );
};
export async function fetchPokemonData(callBackAfter) {
  var pokeList = Array();
  const request = await axios.get(
    'https://pokeapi.co/api/v2/pokemon/?offset=00&limit=2000'
  );
  var dataList = request.data.results;
  var dataCount = pokeList.length;

  getData(dataList, pokeList).then(() => {
    callBackAfter(pokeList);
    // callBackAfter(pokeList);
    console.log('did it finished? - ', pokeList.length);

    var myVar = setInterval(() => {
      // callBackAfter(pokeList);
      if (dataCount < pokeList.length) {
        // console.log(dataCount, pokeList.length, ' Process ');
        dataCount = pokeList.length;
      } else {
        console.log(pokeList.length, ' Finish ');
        clearInterval(myVar);
        // setpokemonList(pokeList);
        callBackAfter(pokeList);
      }
    }, 1000);
  });

  return dataList;
}
export default {
  fetchPokemonData,
};
