const API_URL = 'http://svc.metrotransit.org/NexTrip/';
const FORMAT_JSON_PARAM = '?format=json';
const HEADER_OPTIONS = {
  mode: 'no-cors',
  method: 'get',
  headers: { 'Content-Type': 'application/json' },
} as unknown;

function getRoutes() {
  return fetch(`${API_URL}/Routes${FORMAT_JSON_PARAM}`, HEADER_OPTIONS);
}

function getDirections(route: string) {
  return fetch(`${API_URL}/Directions/${route}${FORMAT_JSON_PARAM}`);
}

function getStops(route: string, direction: string) {
  return fetch(`${API_URL}/Stops/${route}/${direction}${FORMAT_JSON_PARAM}`);
}

export { getRoutes, getDirections, getStops };
