import axios from 'axios';

// https://api.hgbrasil.com/weather?key=4c24d0a7&lat=-23.682&lon=-46.875

export const key = '4c24d0a7';

export const api = axios.create({
    baseURL: 'https://api.hgbrasil.com/'
});
