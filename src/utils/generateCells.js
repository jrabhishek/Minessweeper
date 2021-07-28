const generateCells = () => {
	const cells = [];

	for (let row = 0; row < 9; row++) {
		const arr = [];
		for (let column = 0; column < 9; column++) {
			arr.push({ bomb: false, state: 0, value: 0 }); // state  0 for unpressed , 1= visible,2 for flag
		}
		cells.push(arr);
	}

	// put bomb in 12 cells
	for (let i = 0; i < 10; i++) {
		let isBombPlaced = false;
		while (!isBombPlaced) {
			let row = Math.floor(Math.random() * 9);
			let col = Math.floor(Math.random() * 9);

			if (!cells[row][col].bomb) {
				cells[row][col].bomb = true;
				isBombPlaced = true;
			}
		}
	}

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			const cell = cells[row][col];
			if (cell.bomb) {
				cell.value = -1;
				continue;
			}

			// compute value;
			let counter = 0;
			if (row > 0 && col > 0 && cells[row - 1][col - 1].bomb) {
				counter++;
			}
			if (row > 0 && cells[row - 1][col].bomb) {
				counter++;
			}
			if (row > 0 && col < 8 && cells[row - 1][col + 1].bomb) {
				counter++;
			}
			if (col > 0 && cells[row][col - 1].bomb) {
				counter++;
			}
			if (col < 8 && cells[row][col + 1].bomb) {
				counter++;
			}
			if (row < 8 && col > 0 && cells[row + 1][col - 1].bomb) {
				counter++;
			}
			if (row < 8 && cells[row + 1][col].bomb) {
				counter++;
			}
			if (row < 8 && col < 8 && cells[row + 1][col + 1].bomb) {
				counter++;
			}

			cell.value = counter;
		}
	}

	return cells;
};
export default generateCells;
