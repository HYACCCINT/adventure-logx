import Dice from './Dice';
import Tooltip from './Tooltip';
import { useState } from 'react';

function Enemy({ data, updateRoomSubCollectionField, type }) {
	console.log(data, "123")
	const [content, setContent] = useState(data);
	function update(e) {
		let cloneContent = {...content, [e.target.id]: e.target.value}
		setContent(cloneContent)
	}
	function updateWithoutEvent() {
		updateRoomSubCollectionField(data.id, content, type);
	}

	return (
		<div className="flex sm:flex-col relative sm:w-40 max-h-40 sm:rounded-2xl bg-red-500 justify-around items-center p-4 sm:m-2 sm:shadow-md">
			<Tooltip text={data.name} enabled={content.name?.length > 15}>
				<input
					id="name"
					value={content.name}
					type="text"
					className="w-full text-lg text-yellow-200 placeholder-red-700 font-bold rounded bg-transparent pl-1 overflow-ellipsis"
					placeholder="✎ Enemy..."
					onChange={update}
				/>
			</Tooltip>
			<Tooltip text={content.status} enabled={content.status?.length > 20}>
				<input
					className="w-full text-sm text-yellow-200 placeholder-red-700 rounded bg-transparent mb-1 text-center overflow-ellipsis"
					id="status"
					value={content.status}
					type="text"
					placeholder="Status"
					onChange={update}
				/>
			</Tooltip>
			<span className="pl-1 pr-2 mx-2 bg-white rounded">
				<Dice data={content.dice || ''} update={update} updateWithoutEvent={updateWithoutEvent} />
			</span>
			<div className="flex flex-row-reverse -mr-2">
				<button
					className="sm:absolute text-sm text-red-700 hover:text-red-800 sm:top-2 sm:right-2"
					onClick={() => updateRoomSubCollectionField(data.id, {'active': false}, type)}
				>
					<svg className="w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
				<button
				className="absolute h-full w-1 sm:h-auto text-sm text-purple-500 hover:text-purple-600 px-2 sm:px-0 right-0 sm:bottom-2 sm:left-2"
				onClick={() => updateRoomSubCollectionField(data.id, content, type)}
			>
<svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
			</button>
				<input
					id="initiative"
					value={data.initiative}
					type="text"
					className="sm:absolute text-xs text-center text-red-700 placeholder-red-700 bg-transparent h-4 w-4 sm:top-6 sm:right-1 rounded"
					placeholder="#"
					onChange={update}
				></input>
			</div>
		</div>
	);
}

export default Enemy;
