export function isCoordsEqual(
	coords: [number, number],
	expected: [number, number]
) {
	return coords[0] === expected[0] && coords[1] === expected[1]
}
