// https://firebase.google.com/docs/firestore/quickstart#node.js 
var admin = require("firebase-admin");

var serviceAccount = require("./pairstudydb-firebase-secret-key.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://pairstudydb.firebaseio.com"
});

const db = admin.firestore();

async function data_manipulation() {
	console.log('called data_manipulation!');
	// add data 
	const docRef = db.collection('users').doc('alovelace');

	// override or add data under alovelace document 
	await docRef.set({
		first: 'True Ada',
		last: 'Lovelace',
		year:  1863
	});

	//read data 
	const aloveRef = db.collection('users').doc('alovelace');
	let doc = await aloveRef.get();
	if (!doc.exists) {
		console.log('No such document!');
	} else {
		console.log('Document data:', doc.data());
	}


	// Try-catch 
	 try{
		 	// updata data 
				await aloveRef.update({year: 2020});

				// read again
				doc = await aloveRef.get();
				console.log('after update:', doc.data());

	 }
	 catch(e){
		 console.log("catch ", e)

	 }


}

data_manipulation();

