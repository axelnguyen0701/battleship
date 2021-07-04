const ShipFactory = (coordinates) => {
	let hitArray = []
	const getLength = () => {return coordinates.length}
	const hit = (coordinate) => {hitArray.push(coordinate)}
	const isSunk = () => {
		return coordinates.every(coordinate => hitArray.indexOf(coordinate) !== -1)
	} 

	return {getLength, hit, isSunk}
}

export default ShipFactory;