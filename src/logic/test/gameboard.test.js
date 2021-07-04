import GameBoardFactory from "../factory/GameBoard";

let player1GameBoard;

beforeEach(() => {
  player1GameBoard = GameBoardFactory();
});
describe("place ship at specific coordinates by calling ship factory", () => {
  it("Happy path", () => {
    expect(player1GameBoard.placeShip(0, 0, 0, 4).getLength()).toBe(5);
    expect(player1GameBoard.placeShip(1, 0, 4, 0).getLength()).toBe(4);
    expect(player1GameBoard.placeShip(5, 0, 7, 0).getLength()).toBe(3);
    expect(player1GameBoard.placeShip(1, 1, 1, 3).getLength()).toBe(3);
    expect(player1GameBoard.placeShip(8, 0, 9, 0).getLength()).toBe(2);
    expect(player1GameBoard.placeShip(8, 0, 9, 0)).toBe(false);
  });

  it("ship must have lengnth at least of 2", () => {
    expect(player1GameBoard.placeShip(7, 0, 7, 0)).toBe(false);
  });

  it("end coordinates must be larger than start coordinates", () => {
    expect(player1GameBoard.placeShip(4, 4, 4, 0)).toBe(false);
    expect(player1GameBoard.placeShip(4, 4, 0, 4)).toBe(false);
  });
  it("can only place ship horizontally or vertically", () => {
    expect(player1GameBoard.placeShip(0, 0, 4, 4)).toBe(false);
    expect(player1GameBoard.placeShip(4, 0, 5, 1)).toBe(false);
  });

  it("place ship out of board will return false", () => {
    expect(player1GameBoard.placeShip(10, 0, 10, 2)).toBe(false);
    expect(player1GameBoard.placeShip(0, 10, 0, 11)).toBe(false);
    expect(player1GameBoard.placeShip(0, 9, 0, 11)).toBe(false);
  });

  it("Must not overlap", () => {
    player1GameBoard.placeShip(0, 0, 0, 4);
    expect(player1GameBoard.placeShip(0, 0, 0, 4)).toBe(false);
    expect(player1GameBoard.placeShip(0, 1, 0, 2)).toBe(false);
    expect(player1GameBoard.placeShip(1, 0, 4, 0)).not.toBe(false);
  });
});

describe("Store info and decide attacks", () => {
  beforeEach(() => {
    player1GameBoard.placeShip(0, 0, 0, 4);
    player1GameBoard.placeShip(1, 0, 4, 0);
  });

  it("stores ship info", () => {
    expect(player1GameBoard.getShips()[0].shipName()).toBe("Aircraft Carrier");
    expect(player1GameBoard.getShips()[1].shipName()).toBe("Battleship");
    expect(player1GameBoard.getShips()[0].shipCoordinates).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ]);
    expect(player1GameBoard.getShips()[1].shipCoordinates).toEqual([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ]);
  });

  it("receiveAttack determine whether to send hit or not", () => {
    expect(player1GameBoard.receiveAttack([0, 0]).shipName()).toBe(
      "Aircraft Carrier"
    );
    expect(player1GameBoard.receiveAttack([0, 3]).shipName()).toBe(
      "Aircraft Carrier"
    );
    expect(player1GameBoard.receiveAttack([3, 0]).shipName()).toBe(
      "Battleship"
    );
    expect(player1GameBoard.receiveAttack([5, 0])).toBe(false);
  });

  it("whether or not all ship has been sunk", () => {
    player1GameBoard.receiveAttack([0, 0]);
    player1GameBoard.receiveAttack([0, 1]);
    player1GameBoard.receiveAttack([0, 2]);
    player1GameBoard.receiveAttack([0, 3]);
    player1GameBoard.receiveAttack([0, 4]);
    expect(player1GameBoard.getShips()[0].isSunk()).toBe(true);
    expect(player1GameBoard.isSunkAll()).toBe(false);
    player1GameBoard.receiveAttack([1, 0]);
    player1GameBoard.receiveAttack([2, 0]);
    player1GameBoard.receiveAttack([3, 0]);
    player1GameBoard.receiveAttack([4, 0]);

    expect(player1GameBoard.isSunkAll()).toBe(true);
  });
});
