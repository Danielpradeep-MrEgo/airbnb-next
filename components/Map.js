import { getCenter } from "geolib";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

function Map({ serchResults }) {
	const [selectedLocation, setSelectedLocation] = useState({});
	const coordinates = serchResults?.map((result) => ({
		longitude: result.long,
		latitude: result.lat,
	}));

	const center = getCenter(coordinates);

	const [viewport, setViewport] = useState({
		latitude: center.latitude,
		longitude: center.longitude,
		zoom: 8,
	});

	return (
		<ReactMapGL
			mapStyle="mapbox://styles/danielpradeep/ckszlj9a78o1918pfot3p3s9f"
			mapboxApiAccessToken={process.env.mapbox_key}
			{...viewport}
			width="100%"
			height="100%"
			onViewportChange={(viewport) => setViewport(viewport)}
		>
			{serchResults.map((result) => (
				<div key={result.long}>
					<Marker
						longitude={result.long}
						latitude={result.lat}
						offsetLeft={-20}
						offsetTop={-10}
					>
						<p
							onClick={() => setSelectedLocation(result)}
							className="cursor-pointer text-2xl animate-pulse"
							aria-label="push-pin"
							role="img"
						>
							📍
						</p>
					</Marker>

					{selectedLocation.long === result.long ? (
						<Popup
							closeOnClick={true}
							longitude={result.long}
							latitude={result.lat}
							onClose={() => setSelectedLocation({})}
						>
							{result.title}
						</Popup>
					) : (
						false
					)}
				</div>
			))}
		</ReactMapGL>
	);
}

export default Map;
