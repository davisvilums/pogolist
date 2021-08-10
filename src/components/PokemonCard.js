import styled from "styled-components";

const PokemonItem = styled.div`
  border: 1px solid #ddd;
  width: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  margin: 0 -1px -1px 0;
  cursor: pointer;
  &.selected {
    background: #c7dbec;
  }
`;

const PokemonID = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  font-weight: bold;
  font-size: 12px;
  padding: 1px 3px;
`;

const PokemonGeneration = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-weight: bold;
  font-size: 12px;
  /* background: #ddd; */
  padding: 1px 3px;
  cursor: pointer;
`;

const PokemonSpriteWrap = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 5px;
  img {
    max-width: 100%;
    max-height: 100px;

    &[src$="svg"] {
      padding: 10px;
    }
  }
`;
const PokemonMeta = styled.div`
  background: #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const PokemonName = styled.div`
  font-size: 15px;
  text-align: center;
  text-transform: capitalize;
  font-weight: bold;
  max-width: 100%;
  line-height: 0.9em;
  min-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PokemonCP = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  line-height: 1em;
  background: #eee;
`;

function PokemonCard(props) {
  var pokemon = props.pokemon;
  var select = props.select;
  var TitleSize = "15px";

  if (pokemon.name.length > 15) {
    TitleSize = "12px";
  } else if (pokemon.name.length > 12) {
    TitleSize = "13px";
  } else if (pokemon.name.length > 10) {
    TitleSize = "14px";
  }

  return (
    <>
      <PokemonItem
        className={pokemon.selected ? "selected" : ""}
        onClick={() => select(pokemon.id)}
      >
        {pokemon.selected}
        <PokemonID>#{pokemon.id}</PokemonID>
        <PokemonGeneration>G{pokemon.gen}</PokemonGeneration>
        <PokemonSpriteWrap>
          <img src={pokemon.sprite} alt="" />
        </PokemonSpriteWrap>

        <PokemonMeta>
          {/* style={`font-size=${TitleSize}`} */}
          <PokemonName style={{ fontSize: TitleSize }}>
            <div>{pokemon.name.split("-").join(" ")}</div>
          </PokemonName>
          <PokemonCP>CP {pokemon.cp}</PokemonCP>
        </PokemonMeta>
      </PokemonItem>
    </>
  );
}

export default PokemonCard;
