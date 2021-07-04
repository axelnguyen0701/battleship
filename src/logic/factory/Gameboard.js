import ShipFactory from "./Ship";
import { indexOfForArrays } from "./utilities";

const GameBoardFactory = () => {
  let ships = [];
  const getShips = () => ships;

  const createCoordinates = (rowStart, colStart, rowEnd, colEnd) => {
    let arrCor = [];
    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = colStart; j <= colEnd; j++) {
        arrCor.push([i, j]);
      }
    }

    return arrCor;
  };

  const placeShip = (rowStart, colStart, rowEnd, colEnd) => {
    if (ships.length === 5) {
      return false;
    }

    //either horizontally or vertically placed

    if (rowStart !== rowEnd && colStart !== colEnd) {
      return false;
    }
    //Must inside board
    if (rowStart > 9 || colStart > 9 || rowEnd > 9 || colEnd > 9) {
      return false;
    }
    //From left to right placed
    if (rowEnd <= rowStart && colEnd <= colStart) {
      return false;
    }

    const shipCoordinates = createCoordinates(
      rowStart,
      colStart,
      rowEnd,
      colEnd
    );
    //shipCoordinates must not be in every ship.shipCoordinates
    if (ships.length > 0) {
      for (const ship of ships) {
        for (const coordinates of shipCoordinates) {
          if (indexOfForArrays(ship.shipCoordinates, coordinates) !== -1) {
            return false;
          }
        }
      }
    }

    const newShip = ShipFactory(shipCoordinates);
    ships.push(newShip);

    return newShip;
  };

  const receiveAttack = (attackCoordinates) => {
    const attackedShip = ships.find((ship) => {
      return indexOfForArrays(ship.shipCoordinates, attackCoordinates) !== -1;
    }, false);

    if (!attackedShip) {
      return false;
    }
    attackedShip.hit(attackCoordinates);
    return attackedShip;
  };

  const isSunkAll = () => {
    //     ships.forEach((ship) => console.log(ship.shipName(), ship.isSunk()));
    return ships.every((ship) => ship.isSunk());
  };

  return { placeShip, getShips, receiveAttack, isSunkAll };
};

export default GameBoardFactory;
