import { useState, useRef, useEffect } from 'react';
import Dice from './Dice';
import ProgressBar from './ProgressBar';
import Tooltip from './Tooltip';
import ReactiveInput from './ReactiveInput';

function Card({ data, updateRoomSubCollectionField, type }) {
	console.log("!!!!", data)
	const nopicUrl = 'https://i.imgur.com/ysksdxg.jpg';
	const [showUrl, setShowUrl] = useState(false);
	const [content, setContent] = useState(data);
	const urlRef = useRef();
	function set(path, value, obj) {
		var schema = obj;
		var pList = path.split('.');
		var len = pList.length;
		for(var i = 0; i < len-1; i++) {
			
			var elem = pList[i];
			if( !schema[elem] ) schema[elem] = {}
			schema = schema[elem];
		}
	
		schema[pList[len-1]] = value;
		return obj
	}
	function update(e) {
		let cloneContent = set(e.target.id, e.target.value, {...content})
		setContent(cloneContent)
	}

	function updateWithoutEvent() {
		updateRoomSubCollectionField(data.id, content, type);
	}
	useEffect(() => {
		let clickOutside = (e) => {
			if (!urlRef?.current?.contains(e.target)) {
				setShowUrl(false);
			}
		};
		document.addEventListener('mousedown', clickOutside);
		return () => {
			document.removeEventListener('mousedown', clickOutside);
		};
	}, []);

	return (
		<div className="flex relative w-full sm:w-auto sm:rounded-2xl bg-white dark:bg-gray-800 dark:text-white p-4 pr-8 sm:m-2 sm:shadow-md">
			<div className="flex flex-col items-center w-5/6 h-5/6">
				<Tooltip text={content.status} enabled={content.status?.length > 15}>
					<div className="flex h-4 text-xxs text-gray-400 align-left">
						<svg className="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
								clipRule="evenodd"
							/>
						</svg>

						<input
							id="status"
							value={content.status}
							className="border rounded-full pl-2 pt-1 w-28 overflow-ellipsis"
							type="text"
							placeholder="...."
							onChange={update}
						></input>
					</div>
				</Tooltip>
				<div className="relative max-w-10 w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 p-2">
					<img
						className="rounded-full shadow-md w-full h-full object-cover"
						src={content.url || nopicUrl}
						alt="Character"
						onClick={() => setShowUrl(true)}
					/>
					{showUrl && (
						<input
							id="url"
							value={content.url}
							type="text"
							className="absolute tooltipped-btn bottom-1/4 left-1/4 border text-blue-400 rounded shadow"
							placeholder="Paste an image url here!"
							onChange={update}
							ref={urlRef}
						/>
					)}
				</div>
				<span className="flex items-center">
					<label className="text-gray-600 font-bold tracking-wider uppercase text-xs">HP</label>
					<input
						id="hp.curr"
						value={content.hp.curr}
						type="text"
						className="font-bold rounded bg-transparent w-6 text-right"
						placeholder="#"
						onChange={update}
						//onFocus={() => console.log('Focus')}
					/>
					<span className="px-1">/</span>
					<input id="hp.total" value={content.hp.total} type="text" className="rounded bg-transparent w-6" placeholder="#" onChange={update} />
				</span>
				<ProgressBar update={update} curr={content.hp.curr} tot={content.hp.total} updateWithoutEvent={updateWithoutEvent} />
				<Dice data={content.dice || ''} update={update} updateWithoutEvent={updateWithoutEvent} />
				<div className="text-left mt-1">
					<span className="flex items-center text-xxxs">
						<span className="text-gray-500 font-bold tracking-wider">Speed</span>
						<input id="speed" value={content.speed} type="text" className="w-4 ml-1" placeholder="#" onChange={update} />
					</span>
					<span className="flex items-center text-xxxs">
						<span className="text-gray-500 font-bold tracking-wider">Armor Class</span>
						<input id="armor" value={content.armor} type="text" className="w-4 ml-1" placeholder="#" onChange={update} />
					</span>
					<span className="flex items-center text-xxxs">
						<span className="text-gray-500 font-bold tracking-wider">Hit Dice</span>
						<select id="hitDice" value={content.hitDice} onChange={update}>
							<option>d12</option>
							<option>d10</option>
							<option>d8</option>
							<option>d6</option>
						</select>
					</span>
				</div>
			</div>
			<div className="sm:max-w-12">
				<Tooltip text={content.name} enabled={content.name?.length > 12}>
					<input
						id="name"
						value={content.name}
						type="text"
						className="text-2xl font-bold rounded bg-transparent pl-1 w-full overflow-ellipsis"
						placeholder="✎ Character Name..."
						onChange={update}
					/>
				</Tooltip>
				<div className="flex flex-col">
					<input
						id="class"
						value={content.class}
						type="text"
						className="text-xs text-gray-600 italic w-full rounded bg-transparent pl-1"
						placeholder="✎ Class..."
						onChange={update}
					></input>
					<input
						id="alignment"
						value={content.alignment}
						type="text"
						className="text-xs text-gray-600 italic w-full rounded bg-transparent pl-1 mb-1"
						placeholder="✎ Alignment..."
						onChange={update}
					/>
					<div className="stats grid grid-cols-4 items-center w-full mr-2">
						<label className="text-gray-500 font-bold tracking-wider uppercase text-xs p-1">STR</label>
						<input
							id="stats.str"
							value={content.stats.str}
							type="text"
							className="w-14 rounded bg-transparent text-sm"
							placeholder="# (±#)"
							onChange={update}
						></input>
						<label className="text-gray-500 font-bold tracking-wider uppercase text-xs p-1">DEX</label>
						<input
							id="stats.dex"
							value={content.stats.dex}
							type="text"
							className="w-14 rounded bg-transparent text-sm"
							placeholder="# (±#)"
							onChange={update}
						></input>
						<label className="text-gray-500 font-bold tracking-wider uppercase text-xs p-1">CON</label>
						<input
							id="stats.con"
							value={content.stats.con}
							type="text"
							className="w-14 rounded bg-transparent text-sm"
							placeholder="# (±#)"
							onChange={update}
						></input>
						<label className="text-gray-500 font-bold tracking-wider uppercase text-xs p-1">INT</label>
						<input
							id="stats.int"
							value={content.stats.int}
							type="text"
							className="w-14 rounded bg-transparent text-sm"
							placeholder="# (±#)"
							onChange={update}
						></input>
						<label className="text-gray-500 font-bold tracking-wider uppercase text-xs p-1">WIS</label>
						<input
							id="stats.wis"
							value={content.stats.wis}
							type="text"
							className="w-14 rounded bg-transparent text-sm"
							placeholder="# (±#)"
							onChange={update}
						></input>
						<label className="text-gray-500 font-bold tracking-wider uppercase text-xs p-1">CHA</label>
						<input
							id="stats.cha"
							value={content.stats.cha}
							type="text"
							className="w-14 rounded bg-transparent text-sm"
							placeholder="# (±#)"
							onChange={update}
						></input>
					</div>
					<label className="font-bold tracking-wider uppercase text-xs">Actions</label>
					<ReactiveInput
						id="actions"
						value={content.actions}
						className="text-xs rounded-md px-1 border"
						placeholder="Actions..."
						onChange={update}
					></ReactiveInput>
					<label className="font-bold tracking-wider uppercase text-xs">Notes</label>
					<textarea
						id="notes"
						value={content.notes}
						className="text-xs rounded-md px-1 border"
						placeholder="Notes..."
						onChange={update}
					></textarea>
				</div>
			</div>
			<button
				className="absolute text-sm text-gray-200 hover:text-gray-300 top-2 right-2"
				onClick={() => updateRoomSubCollectionField(data.id, 'active', false, type)}
			>
				<svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
				value={content.initiative}
				type="text"
				className="absolute text-xs text-center text-gray-300 placeholder-gray-300 h-4 w-4 top-7 right-2 rounded"
				placeholder="#"
				onChange={update}
			></input>
		</div>
	);
}

export default Card;
