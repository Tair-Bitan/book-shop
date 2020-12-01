'use strict'

function onInit() {
    doTrans();
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
                <td><h3 data-trans="add-book-${book.name}">${book.name}</h3></td>
                <td>${book.price}<span data-trans="currency">$</span></td>
                <td> <button data-trans="read-book" class="read-btn" onclick="onReadbook('${book.id}')"> Read </button> </td>
                <td> <button data-trans="update-book" class="update-btn" onclick="onUpdatebook('${book.id}')"> Update </button>
                    <br>
                    <input data-trans="update-book-place-holder" type="number" name="updatePrice" placeholder="Update Price" />
                     </td>
                <td> <button data-trans="delete-book" class="delete-btn" onclick="onDeletebook('${book.id}')"> Delete </button> </td>
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
    var elModal = document.querySelector('.my-modal')
    elModal.querySelector('h4').innerHTML =`<h4>${book.name}</h4>`;
    elModal.querySelector('h5').innerText = book.price;
    elModal.querySelector('.image').innerHTML = `<img class="book-img-top" src="img/${book.name}.jpg">`;
    elModal.querySelector('p').innerText = makeLorem(30);
    elModal.querySelector('.rate-cont').innerHTML = `
                                                    <button class="reduce-rate" onclick="onReduceRate('${book.id}')">-</button>
                                                    <span class="rate">${book.rate}</span>
                                                    <button class="add-rate" onclick="onAddRate('${book.id}')">+</button>
                                                    `
    elModal.style.display = 'flex';
}

function onCloseModal() {
    document.querySelector('.my-modal').style.display = 'none';
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

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}