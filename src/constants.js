const GOOGLE_MAPS_API_BASE_URL = "https://maps.googleapis.com/maps/api";

const GOOGLE_PLACES_API_KEY = "AIzaSyDtw6v5Kqwukoi9P_VwFQZ0KxHmSE2WUr0";
const GOOGLE_DISTANCE_MATRIX_API_KEY = "AIzaSyAPcVM7ioCzkPvdpbEND6iI5TOzmHDOhJ4";

export const GOOGLE_PLACES_URL = `${GOOGLE_MAPS_API_BASE_URL}/place/nearbysearch/json?key=${GOOGLE_PLACES_API_KEY}&radius=50000&type=atm`;

export const GOOGLE_DISTANCE_MATRIX_URL = `${GOOGLE_MAPS_API_BASE_URL}/distancematrix/json?key=${GOOGLE_DISTANCE_MATRIX_API_KEY}`;