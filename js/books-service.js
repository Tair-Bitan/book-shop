'use strict'
const KEY = 'books';
const PAGE_SIZE = 5;
var gBooks;
var gBooksId = 1;
var gSortBy = 'id';
var gPageIdx = 0;
var gNames = ['Peter Pan', 'Winnie The Pooh', 'Alice In Wonderland', 'Tom Sawyer', 'Narnia'];

_createBooks();

//LIST
function getBooksForDisplay() {
    var books = gBooks.sort(function (a, b) {
        if (gSortBy === 'id') {
            return a.id - b.id; //IF SORTING BACKWORDS REPLACE A AND B
            // if (a.id.toLowerCase() < b.id.toLowerCase()) return -1;
            // if (a.id.toLowerCase() > b.id.toLowerCase()) return 1;
            // return 0
        }
        if (gSortBy === 'title') {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0
        }
        if (gSortBy === 'price') {
            return a.price - b.price; //IF SORTING BACKWORDS REPLACE A AND B
        }
    });

    var idxStart = gPageIdx * PAGE_SIZE;
    books = gBooks.slice(idxStart, idxStart + PAGE_SIZE);
    return books
}

//DELETE
function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    });
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

// CREATE
function addBook(name, price) {
    var book = _createBook(name)
    book.price = price;
    gBooks.unshift(book)
    _saveBooksToStorage();
}

//UPDATE
function updatebook(bookId, bookPrice) {
    // var book = gBooks.find(function (book) {
    //     return bookId === book.id;
    // });
    var book = getBookById(bookId);
    book.price = bookPrice;
    _saveBooksToStorage();
}

//READ
function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === +`${book.id}`; //added + because bookId is a num and book.id is a string
    });
    return book;
}

function _createBook(name) {
    return {
        id: gBooksId++,
        name, // if error, type name: name,
        price: getRandomIntInclusive(1, 200),
        rate: '⭐'
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []

        for (let i = 0; i < 10; i++) {
            var name = gNames[getRandomIntInclusive(0, gNames.length - 1)]
            books.push(_createBook(name))
        }
        gBooks = books;
        _saveBooksToStorage();
    }
    gBooks = books;
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

function getNames() {
    return gNames;
}

function addRate(bookId) {
    var elRate = document.querySelector('.rate');
    var str = elRate.innerText;
    if (str.length >= 5) return;
    else elRate.innerText += '⭐';
    var book = getBookById(bookId);
    book.rate = elRate.innerText;
    _saveBooksToStorage();
}

function reduceRate(bookId) {
    var elRate = document.querySelector('.rate');
    var str = elRate.innerText;
    str = str.slice(1);
    elRate.innerText = str;
    var book = gBooks.find(function (book) {
        return bookId === book.id;
    });
    book.rate = elRate.innerText;
    _saveBooksToStorage();
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function changePage(diff) {
    gPageIdx += diff;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
    if (gPageIdx * PAGE_SIZE < 0) gPageIdx = Math.floor((gBooks.length - 1) / PAGE_SIZE);
    var elPage = document.querySelector('.page-num');
    elPage.innerText = gPageIdx + 1;
    console.log('gPage is', gPageIdx);
}
