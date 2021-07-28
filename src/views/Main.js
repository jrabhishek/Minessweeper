import React, { useState, useEffect } from 'react';
import './main.css';
import Timer from '../components/Timer';
import generateCells from '../utils/generateCells';
import Cell from '../components/Cell';
import constant from '../utils/constant';
import visitNearbyCells from '../utils/visitNearByCells';
function Main() {
	const [cells, setCells] = React.useState(generateCells());
	const [face, setFace] = React.useState(constant.NORMAL);
	const [flag, setFlag] = useState(12);
	const [gameIsLive, setGameIsLive] = useState(true);
	const [isWon, setWon] = useState(false);
	const [isLost, setLost] = useState(false);

	const handleMouseUp = () => {
		if (isWon || isLost || !gameIsLive) return;
		setFace(constant.NORMAL);
	};

	const handleMouseDown = () => {
		if (isWon || isLost || !gameIsLive) return;
		setFace(constant.OH);
	};
	useEffect(() => {}, []);
	React.useEffect(() => {
		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, []);

	const handleCellClick = (row, col) => {
		if (isWon || isLost) return;

		const currentCell = cells[row][col];
		const newCells = cells.slice();
		if (currentCell.state === 2 || currentCell.state === 1) return;
		if (currentCell.bomb === true) {
			currentCell.red = true;
			newCells[row][col] = { ...newCells[row][col], red: true };
			setCells(newCells);
			setLost(true);
		} else if (currentCell.value === 0) {
			const nnnn = visitNearbyCells(newCells, row, col, {});
			console.log(nnnn);
			setCells(nnnn);
		} else {
			newCells[row][col] = { ...newCells[row][col], state: 1 };
			setCells(newCells);
		}
	};
	useEffect(() => {
		if (isLost) {
			setFace(constant.LOSS);
			showAllBomb();
			setGameIsLive(false);
		}
	}, [isLost]);
	const renderCells = () => {
		return cells.map((item, index) => {
			return item.map((eachItem, key) => (
				<Cell
					red={eachItem.red}
					key={`${index}+${key}`}
					element={eachItem}
					row={index}
					col={key}
					handleCellClick={handleCellClick}
					handleContextMenu={handleContextMenu}
				/>
			));
		});
	};
	const handleContextMenu = (event, row, col) => {
		event.preventDefault();
		const cellValue = cells.slice();
		cellValue[row][col] = { ...cellValue[row][col], state: 2 };
		setCells(cellValue);
		console.log(row, col);
	};

	const showAllBomb = () => {
		const currentBoard = cells.slice();
		const newCell = currentBoard.map((item) =>
			item.map((element) => {
				if (element.bomb) return { ...element, state: 1 };
				return element;
			}),
		);
		setCells(newCell);
	};
	const handleFaceClick = () => {
		setGameIsLive(true);
		setCells(generateCells());
		setLost(false);
		setWon(false);
	};
	return (
		<div className="Main">
			<div className="Header">
				<Timer />
				<div className="Face" onClick={handleFaceClick}>
					{face}
				</div>
				<Timer />
			</div>
			<div className="Body"> {renderCells()}</div>
		</div>
	);
}

export default Main;
