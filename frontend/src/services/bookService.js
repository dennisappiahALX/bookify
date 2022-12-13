import http from './httpService'
import config from '../config.json'

const apiEndpoint = config.apiUrl + '/books';

function bookUrl(id) {
    return `${apiEndpoint}/${id}`
}

export function getBooks() {
    return http.get(apiEndpoint);
}

export function getBook(bookId) {
    return http.get(bookUrl(bookId));
}

export function saveBook(book) {
//    either create or update book
    if (book._id) {
        const body = {...book}
        delete body._id;
        return http.put(bookUrl(book._id), body);
    }
    return http.post(apiEndpoint, book);
}

export function deleteBook(bookId) {
    return http.get(bookUrl(bookId));
}