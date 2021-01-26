function onMapClick(e) {
	/*popup
	.setLatLng(e.latlng)
	.setContent("You clicked the map at " + e.latlng.toString())
	.openOn(map);*/
}

function onZoomEnd(e) {
	let newZoom = e.target._zoom
}

function msToH(value) {
	return value / (60 * 60 * 1000);
}

function average(values) {
	return sum(values) / values.length;
}

function sum(values) {
	let sum = 0;
	values.forEach(value => sum += value);
	return sum;
}

function max(values) {
	return values.reduce(function (a, b) {
		return Math.max(a, b);
	});
}

// TRIP STATS
function getMaxDistance(tripInfos) {
	let values = tripInfos.map(tripInfo => tripInfo.distance);
	let maxValue = max(values);
	// convert to km
	return Math.round(maxValue / 1000);
}
function getAverageDistance(tripInfos) {
	let values = tripInfos.map(tripInfo => tripInfo.distance);
	let daysInTheSaddle = getDaysInTheSaddle(tripInfos);
	let avrg = sum(values) / daysInTheSaddle;
	return Math.round(avrg / 1000 * 10) / 10;
}
function getTotalDistance(tripInfos) {
	let distance = 0;
	tripInfos.forEach(tripInfo => {
		distance += Math.round(tripInfo.distance / 1000);
	});
	return distance;
}

function getMaxDuration(tripInfos) {
	// TODO add up all durations per day
	let values = tripInfos.map(tripInfo => tripInfo.duration);
	let maxValue = max(values);
	return Math.round(msToH(maxValue) * 10) / 10;
}
function getAverageDuration(tripInfos) {
	let values = tripInfos.map(tripInfo => tripInfo.duration);
	let daysInTheSaddle = getDaysInTheSaddle(tripInfos);
	let avrg = sum(values) / daysInTheSaddle;
	return Math.round(msToH(avrg) * 10) / 10;
}
function getTotalDuration(tripInfos) {
	let values = tripInfos.map(tripInfo => tripInfo.duration);
	let timeInTheSaddle = sum(values);
	timeInTheSaddle = Math.round(msToH(timeInTheSaddle * 10)) / 10;
	return timeInTheSaddle;
}

function getMaxSpeed(tripInfos) {
	let values = tripInfos.map(tripInfo => tripInfo.maxSpeed);
	let maxValue = max(values);
	return Math.round(maxValue);
}
function getAverageSpeed(tripInfos) {
	let values = tripInfos.map(tripInfo => tripInfo.averageSpeed);
	let avrg = average(values);
	return Math.round(avrg * 10) / 10;
}

function getMaxAscent(tripInfos) {
	let values = tripInfos.map(tripInfo => tripInfo.ascent);
	return max(values);
}
function getMaxDescent(tripInfos) {
	let values = tripInfos.map(tripInfo => tripInfo.descent);
	return max(values);
}

function getDaysInTheSaddle(tripInfos) {
	let dates = [];
	tripInfos.forEach(tripInfo => {
		let date = new Date(+tripInfo.tStart).toISOString().substring(0, 10);
		if (dates.indexOf(date) < 0) {
			dates.push(date);
		}
	});
	let daysInTheSaddle = dates.length;
	return daysInTheSaddle;
}

function setTripStats(tripInfos) {
	return new Promise((resolve, reject) => {
		let cyclingtime = 0;

		if (tripInfos !== undefined) {
			let bikeTripInfos = tripInfos.filter(tripInfo => tripInfo.locomotion === 'bike');

			let maxDistance = getMaxDistance(bikeTripInfos);
			let averageDistance = getAverageDistance(bikeTripInfos);
			let totalDistance = getTotalDistance(bikeTripInfos);

			let maxDuration = getMaxDuration(bikeTripInfos);
			let averageDuration = getAverageDuration(bikeTripInfos);
			let totalDuration = getTotalDuration(bikeTripInfos);

			//let maxSpeed = getMaxSpeed(bikeTripInfos);
			//let averageSpeed = getAverageSpeed(bikeTripInfos);

			//let maxAscent = getMaxAscent(bikeTripInfos);
			//let maxDescent = getMaxDescent(bikeTripInfos);

			let daysInTheSaddle = getDaysInTheSaddle(bikeTripInfos);


			document.getElementById('max-distance').innerHTML = maxDistance + " km";
			document.getElementById('average-distance').innerHTML = averageDistance + " km";
			document.getElementById('total-distance').innerHTML = totalDistance + " km";

			document.getElementById('max-duration').innerHTML = maxDuration + " h";
			document.getElementById('average-duration').innerHTML = averageDuration + " h";
			document.getElementById('total-duration').innerHTML = totalDuration + " h";

			//document.getElementById('max-speed').innerHTML = maxSpeed + " km/h";
			//document.getElementById('average-speed').innerHTML = averageSpeed + " km/h";

			resolve(tripInfos);
		} else {
			throw new Error("tripInfos === undefined");
		}
	});
}

function loadTrips(tripInfos, detailLevel) {
	return new Promise((resolve, reject) => {
		tripInfos.forEach(tripInfo => {
			getTripGeoJson(tripInfo, detailLevel)
				.then((geoJson) => {
					tripsLayer.addData(geoJson);
				}, (error) => {
					reject(error);
				})
		})
		tripsLayer.addTo(map);
		resolve();
	});
}

function getLastPosition() {
	return new Promise((resolve, reject) => {
		realtimeDB.ref('last-position')
			.once('value', snapshot => {
				let lastPos = snapshot.val();
				resolve(lastPos);
			}, errorObject => {
				console.error("Couldn't get last position: ", errorObject.code);
				reject();
			});
	})
}

function startLiveTracking() {
	liveTrackingCallback = (snapshot) => {
		let lastPos = snapshot.val();
		bikeMarker.setLatLng([lastPos.lat, lastPos.lng]);
	}, errorObject => {
		console.error("Couldn't get last position: ", errorObject.code);
	}

	realtimeDB.ref('last-position')
		.on('value', liveTrackingCallback);
}

function stopLiveTracking() {
	realtimeDB.ref('last-position')
		.off('value', liveTrackingCallback);
}

function setBikeIcon() {
	getLastPosition()
		.then(lastPos => {
			bikeMarker.setLatLng([lastPos.lat, lastPos.lng]);
		});
}

function setInitialCameraLocation() {
	getLastPosition()
		.then(lastPos => {
			map.setView([lastPos.lat, lastPos.lng])
		});
}

function addImages(imageInfos) {
	return new Promise((resolve, reject) => {
		var photos = [];
		imageInfos.forEach(imageInfo => {
			let data = {
				lat: imageInfo.gps.lat,
				lng: imageInfo.gps.lng,
				url: imageInfo.path,
				caption: imageInfo.caption,
				thumbnail: imageInfo.thumb,
				//video: (photo['media$group']['media$content'][1] ? photo['media$group']['media$content'][1].url : null)
			}

			if (imageInfo.caption === undefined) {
				data.caption = "";
			}

			photos.push(data);
		});
		photoLayer.add(photos);
		resolve();
	});
}

function addVideos(videoInfos) {
	return new Promise((resolve, reject) => {
		var videos = [];
		videoInfos.forEach(videoInfo => {
			videos.push({
				lat: videoInfo.lat,
				lng: videoInfo.lng,
				url: videoInfo.url,
				caption: videoInfo.caption,
				thumbnail: videoInfo.thumbnail,
				video: videoInfo.url
			});
		});
		photoLayer.add(videos);
		resolve();
	});
}

function setMapHeight() {
	let windowHeight = $(window).height();
	$('#map').height(windowHeight * 0.6);
}

var huppendorf = [49.932424, 11.149914];
setMapHeight();
var map = L.map('map', {
	center: huppendorf,
	zoom: 5,
	gestureHandling: true
});
var popup = L.popup();
var bikeIcon = L.icon({
	iconUrl: '../images/map/positionIndicator/bike.png',
	//shadowUrl: 'leaf-shadow.png',

	iconSize: [80, 80], // size of the icon
	//shadowSize:   [50, 64], // size of the shadow
	iconAnchor: [40, 80], // point of the icon which will correspond to marker's location
	//shadowAnchor: [4, 62],  // the same for the shadow
	popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var bikeMarker = L.marker([51.5, -0.09], { icon: bikeIcon });
var liveTrackingCallback;

bikeMarker.setLatLng(huppendorf);
setBikeIcon();
bikeMarker.addTo(map).bindPopup("Thomas is here. \nNice bike, right?");

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	maxZoom: 16,
	attribution: '',
	id: 'mapbox/satellite-streets-v11',
	accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
	dashArray: '20,15',
}).addTo(map);

map.on('click', onMapClick);
map.on('zoomend', onZoomEnd);

var detailLevel = 3; // 3 is highest

setInitialCameraLocation();

// load the content
var tripsLayer = L.geoJSON();
var photoLayer = L.photo.cluster().on('click', function (evt) {
	let photo = evt.layer.photo;
	let maxHeight = document.getElementById('map').offsetHeight * 0.8;
	let width = document.getElementById('map').offsetWidth * 0.8;

	let template = '<img \
						onclick="openImage(`{url}`)" \
						style=" \
							maxHeight:' + maxHeight + 'px; \
							height:auto; \
							width:' + width + 'px;" \
						src="{url}"> \
					</img> \
					<p>{caption}</p>';
	if (photo.video) {
		template = '<iframe width="480" height="270" src={video}></iframe></a><p>{caption}</p>';
	}

	evt.layer.bindPopup(L.Util.template(template, photo), {
		className: 'leaflet-popup-photo',
		minWidth: width,
		url: photo.url
	}).openPopup();
});

getDeployedJSON('public/trips.json')
	.then((tripInfos) => {
		return setTripStats(tripInfos);
	})
	.then((tripInfos) => {
		return loadTrips(tripInfos, detailLevel);
	})
	.then(() => {
		return getDeployedJSON('public/images.json');
	})
	.then((imageInfos) => {
		return addImages(imageInfos);
	})
	.then(() => {
		return getDeployedJSON('public/videos.json');
	})
	.then((videoInfos) => {
		return addVideos(videoInfos);
	})
	.then(() => {
		photoLayer.addTo(map);
		//map.fitBounds(photoLayer.getBounds())
	})
	.catch((error) => {
		console.error(error);
	});
