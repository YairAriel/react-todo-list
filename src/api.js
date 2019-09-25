import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-todos-3a8ce.firebaseio.com/'
});