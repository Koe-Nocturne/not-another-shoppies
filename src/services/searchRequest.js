import { getRequest } from './Api'

const searchRequest = (searchTerm, pageNumber = 1) => {
    //converting search term into query string friendly format
    let term = searchTerm.split(' ').join('+');

    //formatting the query string to send to the get request
    let queryString = `s=${term}&page=${pageNumber}`;
    return getRequest(queryString);
};


export { searchRequest };