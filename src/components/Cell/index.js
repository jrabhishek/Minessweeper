import React from 'react';
import './style.css';
import { render } from '@testing-library/react';
function index(props) {
	const { element, row, col, handleCellClick, handleContextMenu } = props;

	const renderCells = () => {
		if (element.bomb && element.state === 1) {
			return '💣';
		} else if (element.state === 2) {
			return '🚩';
		} else if (element.value > 0 && element.state === 1) {
			return `${element.value}`;
		}
	};
	return (
		<div
			className={`Cell ${element.state === 1 ? 'visible' : ''} value-${
				element.value
			} ${props.red ? 'red' : ''} `}
			onClick={() => handleCellClick(row, col)}
			onContextMenu={(event) => handleContextMenu(event, row, col)}
		>
			{renderCells()}
		</div>
	);
}

export default index;
