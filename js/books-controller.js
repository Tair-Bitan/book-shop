'use strict'

function onInit() {
    renderBooks();
    renderNames();
}

function renderBooks() {
    var books = getBooksForDisplay();
    var strHtmls = books.map(function (book) {
        return `
            <tr>
                <td>${book.id}</td>
                <td><img class="book-img-top" src="img/${book.name}.jpg"></td>
                <td><h3>${book.name}</h3></td>
                <td>${book.price}$</td>
                <td> <button class="read-btn" onclick="onReadbook('${book.id}')"> Read </button> </td>
                <td> <button class="update-btn" onclick="onUpdatebook('${book.id}')"> Update </button>
                    <br>
                    <input type="number" name="updatePrice" placeholder="Update Price" />
                     </td>
                <td> <button class="delete-btn" onclick="onDeletebook('${book.id}')"> Delete </button> </td>
            </tr>
        `
    })
    document.querySelector('.books-container').innerHTML = strHtmls.join('')
}

function onDeletebook(bookId) {
    // if (!confirm('Are you sure you want to permanently delete this book?')) return;
    deleteBook(bookId);
    renderBooks();
}

function onAddBook() {
    var elNameList = document.querySelector('select[name=nameList]');
    var elPrice = document.querySelector('input[name=price]');

    var name = elNameList.value;
    var price = +elPrice.value;

    console.log('ADDING:', name, price);
    addBook(name, price)
    renderBooks()
}

function renderNames() {
    var names = getNames();
    var strHtmls = names.map(function (name) {
        return `
        <option>${name}</option>
        `
    });
    var elNameList = document.querySelector('select[name=nameList]');
    elNameList.innerHTML = strHtmls.join('');
}

function onUpdatebook(bookId) {
    var newPrice = +document.querySelector('input[name=updatePrice]').value;
    var book = getBookById(bookId);
    var bookPrice = (!newPrice) ? book.price : +newPrice;
    updatebook(bookId, bookPrice);
    renderBooks();
}

function onReadbook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h4').innerText = book.name;
    elModal.querySelector('h5').innerText = book.price;
    elModal.querySelector('.image').innerHTML = `<img class="book-img-top" src="/img/${book.name}.jpg">`;
    elModal.querySelector('p').innerText = makeLorem(30);
    elModal.querySelector('.rate-cont').innerHTML = `
                                                    <button class="reduce-rate" onclick="onReduceRate('${book.id}')">-</button>
                                                    <span class="rate">${book.rate}</span>
                                                    <button class="add-rate" onclick="onAddRate('${book.id}')">+</button>
                                                    `
    elModal.style.display = 'flex';
}

function onCloseModal() {
    document.querySelector('.modal').style.display = 'none';
}

function onAddRate(bookId) {
    addRate(bookId);
}

function onReduceRate(bookId) {
    reduceRate(bookId);
}

function onThClick(sortBy) {
    setSort(sortBy);
    renderBooks();
}

function onChangePage(diff) {
    changePage(diff);
    renderBooks();
}
