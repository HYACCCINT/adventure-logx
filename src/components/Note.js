import { useState } from 'react';
function Note({ data, updateRoomSubCollectionField, type }) {
	const [content, setContent] = useState(data.content);
	function update(e) {
		setContent(e.target.value)
	}

	return (
		<div className="flex relative w-full sm:w-auto sm:rounded-2xl bg-white dark:bg-gray-800 dark:text-white p-4 pr-8 sm:m-2 sm:shadow-md">
			<textarea
				className="w-11/12 sm:w-full h-8 sm:h-auto text-xs text-purple-500 placeholder-gray-400 rounded bg-transparent pr-1"
				id="content"
				value={content}
				type="text"
				rows="5"
				spellCheck="false"
				placeholder="Empty note"
				onChange={update}
			/>

			<button
				className="absolute h-full sm:h-auto bg-white text-sm text-purple-500 hover:text-purple-600 px-2 sm:px-0 right-0 sm:top-2 sm:right-2"
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
				className="absolute h-full w-1 sm:h-auto bg-white text-sm text-purple-500 hover:text-purple-600 px-2 sm:px-0 right-0 sm:bottom-2 sm:left-2"
				onClick={() => updateRoomSubCollectionField(data.id, {'content': content}, type)}
			>
<svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
			</button>
		</div>
	);
}

export default Note;
