var storage = firebase.storage();
var realtimeDB = firebase.database();

function getDeployedJSON(path) {
	return new Promise((resolve, reject) => {
		var ref = storage.refFromURL('gs://worldtraveler-app/' + path);
		ref.getDownloadURL()
			.then(function (url) {
				$.getJSON(url, function (data) {
					resolve(data);
				});
			}).catch(function (error) {
				console.error(error);
				reject();
			});
	})
};

function getAllTripInfos() {
	return firebase.firestore()
		.collection('trips')
		.get()
		.then(querySnapshot => querySnapshot.docs.map(tripDoc => tripDoc.data()));
}

function getTripGeoJson(tripInfo, detailLevel) {
	return new Promise((resolve, reject) => {
		$.getJSON(tripInfo.geoJsonURL, function (data) {
			resolve(data);
		})
			.error(() => {
				throw "Couldn't get trip geoJson with url: " + tripInfo.geoJsonURL;
			});
	})
};

function getAllImageInfos() {
	return firebase.firestore()
		.collection('images')
		.get()
		.then(querySnapshot => querySnapshot.docs.map(imgDoc => imgDoc.data()));
}
