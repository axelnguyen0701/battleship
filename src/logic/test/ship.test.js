import ShipFactory from "../factory/Ship";

let aircraft_carrier;
let battleship;

beforeEach(() => {
  aircraft_carrier = ShipFactory([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
  battleship = ShipFactory([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ]);
});

it("accept array of coordinates and have length", () => {
  expect(aircraft_carrier.getLength()).toBe(5);
  expect(battleship.getLength()).toBe(4);
});

it("records hit", () => {
  aircraft_carrier.hit([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  aircraft_carrier.hit([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  aircraft_carrier.hit([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  battleship.hit([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  battleship.hit([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  battleship.hit([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
});

it("is able to be sunk", () => {
  aircraft_carrier.hit([0, 0]);
  aircraft_carrier.hit([0, 1]);
  aircraft_carrier.hit([0, 2]);
  aircraft_carrier.hit([0, 3]);
  aircraft_carrier.hit([0, 4]);
  expect(aircraft_carrier.isSunk()).toBe(true);
  expect(battleship.isSunk()).toBe(false);
});

it("has a name", () => {
  expect(aircraft_carrier.shipName()).toBe("Aircraft Carrier");
  expect(battleship.shipName()).toBe("Battleship");
});
