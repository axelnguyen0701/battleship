import ShipFactory from '../factory/ship'

let aircraft_carrier;
let battleship;

beforeEach(() => {
	aircraft_carrier = ShipFactory([0,1,2,3,4])
	battleship = ShipFactory([5,6,7,8])

})

it('accept array of coordinates and have length', () => {
	expect(aircraft_carrier.getLength()).toBe(5);
	expect(battleship.getLength()).toBe(4);
})

it('records hit',() => {
	aircraft_carrier.hit(5)
	aircraft_carrier.hit(6)
	aircraft_carrier.hit(7)
	
	battleship.hit(5)
	battleship.hit(6)
	battleship.hit(7)
	
})	


it('is able to be sunk', () => {
	aircraft_carrier.hit(0)
	aircraft_carrier.hit(1)
	aircraft_carrier.hit(2)
	aircraft_carrier.hit(3)
	aircraft_carrier.hit(4)
	expect(aircraft_carrier.isSunk()).toBe(true);
	battleship.hit(0)
	battleship.hit(1)
	battleship.hit(2)
	battleship.hit(4)
	battleship.hit(3)
	expect(battleship.isSunk()).toBe(false);
})