export const  getRequest = (request) => {
    return fetch(`http://www.omdbapi.com/?${request}&apikey=bef97d`)
            .then(response => response.json())
            .catch(error => console.error(error));
}