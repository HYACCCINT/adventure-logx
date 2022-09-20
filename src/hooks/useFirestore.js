import { useState, useEffect } from 'react';
import { app } from '../firebase/config';

const db = app.firestore();

const useFirestore = (room, user) => {
	const [roomContent, setRoomContent] = useState({});

function addLog(isHidden, content, type) {
	db.collection("rooms").doc(room).collection("logList")
	.doc(Date.now().toString())
	.set({
		content: content,
		user: user,
		isHidden: isHidden,
		type:type
	});
}
	function createRoomIfNotExists() {
		db.collection("rooms").doc(room).get().then((roomDoc) => {
			if (!roomDoc.exists) {
				const newRoom = {
					code: room,
					title: room + ' room',
					isActive: true,
					backgroundColor: 'gray',
					type: 'room',
					keeper: user
				}
				db.collection("rooms").doc(room).set(newRoom)
				setRoomContent({...newRoom})
				addLog(false, `Room ${room} created.`, 'announcement')
			}
		})
	}

	function createSubIfNotExists(type) {
		const collectionType = roomCollection[type];
		const newSub = {
			...newFields[type], type: type, active: true, user: user
	   }
		db.collection("rooms").doc(room).collection(collectionType).add(newSub);
		addLog(false, `${type} created.`, 'announcement')
	}

	function getRoomSubCollection(collectionType) {
		const collection = []
		db.collection(`rooms/${room}/${collectionType}`).get().then((snap) => {
			snap.forEach((doc) => {
				if (!collection.find(o => o.id === doc.id)) {
					collection.push({ ...doc.data(), id: doc.id });
				}
				
			});
		console.log(collection, "???")
		return collection;
	})
}
	// function createConfigIfNotExists() {
	// 	db.collection("rooms").doc(room)

	// 		.get()
	// 		.then((config) => {
	// 			if (!config.exists) {
	// 				db.collection(room).doc('config').set({
	// 					type: 'config',
	// 					backgroundColor: 'gray',
	// 				});
	// 			}
	// 		});
	// }
	useEffect(() => {
		const cleanup = db.doc("rooms/" + room).onSnapshot((doc) => {
			let content = {}

			content = { ...doc.data(), id: doc.id}
			setRoomContent(content);
		});

		return () => cleanup();
	}, [room]);
	// useEffect(() => {
	// 	function getRoomCollectionDocs () {
	// 		let content;
	// 		db.doc("rooms/" + room).onSnapshot(((doc) => {
	// 			console.log("Current data: ", doc.data());
	// 			content = { ...doc.data(), id: doc.id}
	// 			setRoomContent(content);
	// 		}));
	// 		const characterList = []
	// 		db.collection("rooms/" + room + "/characterList").onSnapshot((snap) => {
	// 			snap.forEach((doc) => {
	// 				characterList.push({ ...doc.data(), id: doc.id });
	// 			});
	// 			console.log("DEWDEWDEW", characterList)
	// 			content = {...content, characterList:characterList}
	// 			setRoomContent(content);
	// 		})
	// 		const enemyList = []
	// 		db.collection("rooms/" + room + "/enemyList").onSnapshot((snap) => {
	// 			snap.forEach((doc) => {
	// 				enemyList.push({ ...doc.data(), id: doc.id });
	// 			});
	// 			content = {...content, enemyList:enemyList}
	// 			setRoomContent(content);
	// 		})
	// 		const logList = []
	// 		db.collection("rooms/" + room + "/logList").onSnapshot((snap) => {
	// 			snap.forEach((doc) => {
	// 				logList.push({ ...doc.data(), id: doc.id });
	// 			});
	// 			content = {...content, logList:logList}
	// 			setRoomContent(content);
	// 		})
	// 		const noteList = []
	// 		db.collection("rooms/" + room + "/noteList").onSnapshot((snap) => {
	// 			snap.forEach((doc) => {
	// 				noteList.push({ ...doc.data(), id: doc.id });
	// 			});
	// 			content = {...content, noteList:noteList}
	// 			setRoomContent(content);
	// 		})
	// 		console.log("setted", content)
	// 		setRoomContent(content);
	// 	}
	// 	// const cleanup = db.collection("rooms").onSnapshot((snap) => {
	// 	// 	let content = [];
	// 	// 	snap.forEach((doc) => {
	// 	// 		content.push({ ...doc.data(), id: doc.id });
	// 	// 	});
	// 	// 	console.log(JSON.stringify(content), "CXMVCXVMCXM")
	// 	// 	setRoomContent(content);
	// 	// });

	// 	return () => getRoomCollectionDocs();
	// },[room]);

	function createCard(type) {
		db.collection(room)
			.doc(Date.now().toString())
			.set({ ...newFields[type], type: type, active: true });
			addLog(false, `${type} created.`, 'announcement')
	}

	function deleteDocument(id) {
		db.collection(room).doc(id).delete();
	}

	function updateField(id, field, value) {
		let newValue = {};
		newValue[field] = value;
		db.collection(room).doc(id).update(newValue);
	}

	function updateRoomSubCollectionField(id, value, type) {
		db.doc(`/rooms/${room}/${roomCollection[type]}/${id}`).update(value);
	}

	function toggleActive(id) {
		db.collection(room)
			.doc(id)
			.get()
			.then(function (doc) {
				return doc.ref.update({ active: !doc.data().active });
			})
			.catch((err) => console.log('Character not found.'));
	}

	return { roomContent, createCard, updateField, toggleActive, deleteDocument, createSubIfNotExists, createRoomIfNotExists, getRoomSubCollection, updateRoomSubCollectionField, addLog};
};

const roomCollection = {
	character: 'characterList',
	log: 'logList',
	enemy: 'enemyList',
	note: 'noteList'
}
const newFields = {
	room: {
		code: '',
		title:'',
		isActive: true,
		config:'',
		type: '',
		keeper: '',

	},
	log: {
		date: '',
		type: '',
		content: '',
	},
	character: {
		name: '',
		class: '',
		alignment: '',
		stats: {
			str: '',
			dex: '',
			con: '',
			int: '',
			wis: '',
			cha: '',
		},
		actions: '',
		notes: '',
		status: '',
		initiative: '',
		hp: {
			total: null,
			curr: null,
		},
		dice: {
			lastRoll: 0,
			sides: 20,
		},
		image:'',
		url: '',
		user:'',
	},
	enemy: {
		name: '',
		class: '',
		type: '',
		notes: '',
		status: '',
		initiative: '',
		dice: {
			lastRoll: 0,
			sides: 20,
		},
		url: '',
	},
	note: {
		content: '',
		user: '',
	},
	user:'',
};

export default useFirestore;
