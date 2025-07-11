# GeoEdge Foxx Service

GeoEdge is a Foxx microservice providing advanced geospatial endpoints for ArangoDB and a small Leaflet based UI for quick tests.

## Installation

1. Zip the `geo` directory and upload it through the Foxx interface or use the Foxx CLI:
   ```
   foxx install /geo /path/to/geo.zip
   ```
2. The service will be available at `/geo`.

## Endpoints

- `GET /geo/near?lat=..&lon=..&radius=..&collection=places`
- `POST /geo/within` with `{ polygon, collection }`
- `POST /geo/contains` with `{ point, polygon }`
- `POST /geo/distance` with `{ point1, point2 }`
- `POST /geo/buffer` with `{ point, radius }`
- `POST /geo/join` with `{ collection1, collection2 }`
- `POST /geo/simplify` with `{ polygon, tolerance }`

All payloads and responses are JSON.

## UI

Open `/geo/ui` to access a Leaflet interface. A control panel lets you
select one of the available endpoints, fill in the required parameters and
execute the request. Any GeoJSON returned by the service will be rendered on
the map.
