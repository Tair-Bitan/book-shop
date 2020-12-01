var gTrans = {
    title: {
        en: 'Book Store',
        es: 'Librería',
        he: 'חנות ספרים'
    },
    add: {
        en: 'Add Book',
        es: 'Agregar Libro',
        he: 'הוסף ספר',
    },
    'add-book-Peter Pan': {
        en: 'Peter Pan',
        es: 'Peter Pan',
        he: 'פיטר פן'
    },
    'add-book-Alice In Wonderland': {
        en: 'Alice In Wonderland',
        es: 'Alicia en el país de las Maravillas',
        he: 'אליסה בארץ הפלאות'
    },
    'add-book-Winnie The Pooh': {
        en: 'Winnie The Pooh',
        es: 'Winny de Puh',
        he: 'פו הדוב'
    },
    'add-book-Tom Sawyer': {
        en: 'Tom Sawyer',
        es: 'Tom Sawyer',
        he: 'תום סוויר'
    },
    'add-book-Narnia': {
        en: 'Narnia',
        es: 'Narnia',
        he: 'נרניה'
    },
    'add-book-placeholder': {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר'
    },
    id: {
        en: 'ID',
        es: 'CDI',
        he: 'מקט',
    },
    image: {
        en: 'Image',
        es: 'Imagen',
        he: 'תמונה',
    },
    currency: {
        en: '$',
        es: '€',
        he: '₪',
    },
    'book-title': {
        en: 'Title',
        es: 'Título',
        he: 'כותר'
    },
    'book-price': {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר'
    },
    'book-actions': {
        en: 'Actions',
        es: 'Comportamiento',
        he: 'לעשות',
    },
    'read-book': {
        en: 'Read',
        es: 'Leer',
        he: 'קריאה',
    },
    'update-book': {
        en: 'Update',
        es: 'Actualizar',
        he: 'עדכון',
    },
    'update-book-place-holder': {
        en: 'Update Price',
        es: 'Actualizar precio',
        he: 'עדכן מחיר',
    },
    'delete-book': {
        en: 'Delete',
        es: 'Eliminar',
        he: 'מחיקה',
    },
    'close-modal': {
        en: 'close',
        es: 'Cerrar',
        he: 'סגור',
    },
    'sure': {
        en: 'Are you sure?',
        es: '¿Estás seguru de que quieres eliminar?',
        he: 'בטוח שאתה רוצה למחוק אבא?',
    }
}
// An Idea to connect between the language and the currency
// var langs={
//     en:'USD',
//     he:'ILS'
// }
// langs[gCurrLang]
var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            // el.setAttribute('placeholder', txt)
            // THE SAME!
            el.placeholder = txt
        } else {
            el.innerText = txt
        }
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat(gCurrLang, { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}