import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Enemy from './Enemy';
import Note from './Note';
import AddButton from './AddButton';
import ColorPicker from './ColorPicker';
import Tooltip from './Tooltip';
import useFirestore from '../hooks/useFirestore';
import { useAuth } from "../context/AuthContext"
import { app } from '../firebase/config';
import Speech from './Speech';
import { getFunctions, httpsCallableFromURL } from 'firebase/functions';

function Cards() {
	const db = app.firestore();
	let { slug } = useParams();
	const { currentUser } = useAuth()
	const { updateField, roomContent, createCard, toggleActive, deleteDocument, createConfigIfNotExists, createSubIfNotExists, createRoomIfNotExists, updateRoomSubCollectionField, addLog } = useFirestore(slug,currentUser.email);
	const [cardLists, setCardLists] = useState({noteList:[], enemyList:[], characterList:[], logList:[]});
	const [loading, setLoading] = useState(true);
	function getRoomSubCollection(collectionType) {
		const collection = []
		db.collection(`rooms/${slug}/${collectionType}`).get().then((snap) => {
			snap.forEach((doc) => {
				if (!collection.find(o => o.id === doc.id)) {
					collection.push({ ...doc.data(), id: doc.id });
				}
				
			});
			setLoading(true)
		return collection;
	})
}
	useEffect(() => {
		function a () {
			const logList= cardLists.logList
			db.collection(`rooms/${slug}/logList`).onSnapshot((snap) => {
				snap.forEach((doc) => {
					if (!logList.find(o => o.id === doc.id)) {
						logList.push({ ...doc.data(), id: doc.id });
						console.log("logList ", logList)
					}
					
				})
				const updateList = { ...cardLists, logList:logList}
				setCardLists(updateList)
			});
			const noteList= cardLists.noteList
			db.collection(`rooms/${slug}/noteList`).onSnapshot((snap) => {
				snap.forEach((doc) => {
					if (!noteList.find(o => o.id === doc.id)) {
						noteList.push({ ...doc.data(), id: doc.id });
						console.log("notes ", noteList)
					}
					
				})
				const updateList = { ...cardLists, noteList:noteList}
				setCardLists(updateList)
			});
			const characterList= cardLists.characterList
			db.collection(`rooms/${slug}/characterList`).onSnapshot((snap) => {
				snap.forEach((doc) => {
					if (!characterList.find(o => o.id === doc.id)) {
						characterList.push({ ...doc.data(), id: doc.id });
						console.log("characterList ", characterList)
					}
					
				})
				const updateList = { ...cardLists, characterList:characterList}
				setCardLists(updateList)
			});
			const enemyList= cardLists.enemyList
		db.collection(`rooms/${slug}/enemyList`).onSnapshot((snap) => {
			snap.forEach((doc) => {
				if (!enemyList.find(o => o.id === doc.id)) {
					enemyList.push({ ...doc.data(), id: doc.id });
					console.log("enemyList ", enemyList)
				}
				
			})
			const updateList = { ...cardLists, enemyList:enemyList}
			setCardLists(updateList)
		});
		}
	
		
	return () => a();
	
	},[roomContent,loading]);
console.log(cardLists, "cardLists")
	createRoomIfNotExists();
	const selectEl = useRef(null);

	function getPlayerEntities() {
		let entities = [currentUser.email]
		let chars = cardLists.characterList.filter((character) => { return character.user === currentUser.email}).map((char) => {return char.name});
		entities = entities.concat(chars);
		if (currentUser.email === roomContent.keeper) {
			entities = entities.concat(cardLists.enemyList.map((char) => {return char.name}));
		}
		console.log("!!!!!!!!!!!!!", entities)
		return entities;
	}
	function getAllEntities() {
		let entities = ['ALL_CHARACTERS']
		entities = entities.concat(cardLists.characterList.map((char) => {return char.name}), cardLists.enemyList.map((char) => {return char.name}))
		return entities;
	}
	const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: "wqewqewqe" })
    };
	// const apiUrl = `http://localhost:5001/adventure-logx/us-central1/helloWorld`;
	// fetch(apiUrl, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => console.log('This is your data', data));
	const functions = getFunctions();
const addMessage = httpsCallableFromURL(
  functions,
  // the URL of the function
  "http://localhost:5001/adventure-logx/us-central1/helloWorld"
);

addMessage({ text: "!!!!!!" })
  .then((result) => {
    // Read result of the Cloud Function.
    const data = result.data;
    const sanitizedMessage = data.text;
  });
	return (
		<div className="pb-2 flex flex-row h-full">
			<div className="flex flex-col justify-end w-1/3 bg-white relative">
				<div className="flex w-full sm:w-auto m-auto mt-0">
					<AddButton type="note" color="purple" createCharacter={createSubIfNotExists} />
					<AddButton type="character" color="blue" createCharacter={createSubIfNotExists} />
					{currentUser.email === roomContent.keeper ? <AddButton type="enemy" color="red" createCharacter={createSubIfNotExists} addLog={addLog}/> : null}
				</div>
				<div className="flex w-full sm:w-auto m-auto mt-0">
				{JSON.stringify(cardLists.logList)}
				</div>
				<div>
					<Speech addLog={addLog} userEntities={getPlayerEntities()} allEntities={getAllEntities()} user={currentUser.email} />
				</div>
			</div>
			<div className="flex flex-row justify-end w-full">

				<div className="flex flex-col sm:flex-row sm:flex-wrap sm:h-full sm:m-auto">

					{cardLists.noteList?.map((note) => {
								return <Note key={note.id} data={note} type="note" updateRoomSubCollectionField={updateRoomSubCollectionField} addLog={addLog}/>;
							})}

{cardLists.enemyList?.map((enemy) => {
								return <Enemy key={enemy.id} data={enemy} type="enemy" updateRoomSubCollectionField={updateRoomSubCollectionField} addLog={addLog}/>;
							})}

				</div>

				<div className="flex flex-col sm:flex-row sm:flex-wrap sm:h-full justify-top items-center">
					{
						cardLists.characterList?.map((character) => {
								return <Card key={character.id} data={character} updateRoomSubCollectionField={updateRoomSubCollectionField} type="character" addLog={addLog}/>;
							})
					}
				</div>


				{roomContent.length > 1 && (
					<div className="flex flex-row justify-center space-x-2">
						<select ref={selectEl} defaultValue="default" className="text-xs text-gray-400 rounded-md p-1 w-36">
							<option value="default">Restore or destroy...</option>
							{roomContent
								.filter((doc) => doc.type !== 'config' && doc.active === false)
								.map((inactive) => {
									return (
										<option value={inactive.id} key={inactive.id}>
											{inactive.name || inactive.content?.substr(0, 20) || inactive.id} ({inactive.type})
										</option>
									);
								})}
						</select>

						<Tooltip text="Restore" sz="sm">
							<div
								className="tooltipped h-6 w-6 bg-blue-500 hover:bg-blue-600 text-white rounded p-1"
								onClick={() => {
									const val = selectEl.current.value;
									if (val !== 'default') {
										toggleActive(val);
										selectEl.current.value = 'default';
									}
								}}
							>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
								</svg>
							</div>
						</Tooltip>
						<Tooltip text="Destroy" sz="sm">
							<div
								className="tooltipped h-6 w-6 bg-red-500 hover:bg-red-600 text-white rounded p-1"
								onClick={() => {
									const val = selectEl.current.value;
									if (val !== 'default') {
										deleteDocument(val);
										selectEl.current.value = 'default';
									}
								}}
							>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</div>
						</Tooltip>
					</div>
				)}
			</div>
		</div>
	);
}

export default Cards;
