import { indexOfForArrays } from "./utilities";

const ShipFactory = (coordinates) => {
  let shipCoordinates = coordinates;
  let hitArray = [];
  const getLength = () => {
    return coordinates.length;
  };
  const hit = (attackCoordinate) => {
    hitArray.push(attackCoordinate);
  };
  const isSunk = () => {
    return shipCoordinates.every(
      (curCoordinate) => indexOfForArrays(hitArray, curCoordinate) !== -1
    );
  };

  const shipName = () => {
    let name = "";
    switch (coordinates.length) {
      case 3:
        name = "Cruiser";
        break;
      case 4:
        name = "Battleship";
        break;
      case 5:
        name = "Aircraft Carrier";
        break;
      default:
        name = "Destroyer";
    }
    return name;
  };
  return { getLength, hit, isSunk, shipName, shipCoordinates };
};

export default ShipFactory;
