// Menadzment strane - START

$(document).ready(function() {
    console.log("PROVERA DA LI JE UCITAN JQUERY.");
});

let pageLink = window.location.pathname // Dohvata trenutni URL stranice.

if (pageLink.includes('index.html')) { // Proverava putanju 'string', ako jeste index.html, poziva funkciju.
    homePage()
}

if (pageLink.includes('support.html')) { 
    contactFormValidation()
}

if (pageLink.includes('rims.html')) {
    rimsPage()
}

if (pageLink.includes('prices.html')) {
    pricesPage()
}

if(pageLink.includes('cart.html')) {
    cart()
}


// DEFAULT-ne stvarcice.
navBars() // Odvojene su zato sto se pojavljuju na svakoj stranici.
scrollToTopButton()
footer()

// Funkcije strane.
function navBars() {

    // NAV - prosiren.
    const navMenu = document.querySelector('.navLinks') // Selektuje elemente.
    const navLinkNames = [ // Definisie niz sa imenima linkova.
        'Rims',
        'Suppliers',
        'Prices',
        'Support',
        'Author',
        '<i class="fas fa-shopping-cart cart-icon"></i><span id="cart-item-count" class="cart-item-count">0</span>'
    ]
    const navLinks = [ // Definise niz sa putanjama do stranica.
        'rims.html',
        'suppliers.html',
        'prices.html',
        'support.html',
        'author.html',
        'cart.html'
    ]

    for (let i = 0; i < navLinks.length; i++) {     // Petljom prodje kroz svaki el. niza.
        let listItem = document.createElement('li') // Za svaki el. kreira novi 'li' i 'a' element, kao i textualni cvor.
        let navLink = document.createElement('a')
        //let navLinkName = document.createTextNode(navLinkNames[i])
        navLink.innerHTML = navLinkNames[i];
        navLink.setAttribute('href', navLinks[i]) // Postavlja atribut 'href' za svaki 'a' el.
        navLink.setAttribute('class', 'black-text') // Postavlja klasu 'black-text'.
        // navLink.append(navLinkName) // Dodaje text u 'a' el.
        listItem.append(navLink)    // Dodaje 'a' el. u 'li'.
        navMenu.append(listItem)    // Dodaje 'li' u 'navMenu'.
    }


    // NAV - zguzvan.
    const sideNavMenu = document.querySelector('.sideNavCollapsed') // Selektuje el. i dodeljuje ga promenljivoj.

    for (let i = 0; i < navLinks.length; i++) { // Prolazi kroz svaki.
        let listItem = document.createElement('li') // Kreira novi 'li' i 'a' element, kao i text.
        let navLink = document.createElement('a')
        let navLinkName = document.createTextNode(navLinkNames[i])
        navLink.setAttribute('href', navLinks[i])   // Postavlja atribut 'href' za svaki 'a' element.
        navLink.setAttribute('class', 'black-text') // Postavlja klasu 'black-text'.
        navLink.innerHTML = navLinkNames[i] // Dodaje text u 'a' el.
        listItem.append(navLink)    // Dodaje 'a' el. u 'li'.
        sideNavMenu.append(listItem)// Dodaje 'li' u 'navMenu'.
    }

}

// ==============================================================================================================================================================================================================

function homePage() {

    // Slider background-ova.
    const imageSources = [
        'background.jpg',
        'background1.jpeg',
        'background2.jpg',
        'background3.jpg'
    ]   // Definicija niza slika za slider.
    const imageAltNames = [
        'Rim Wall',
        'Rims on Audi RS7 ABT',
        'BBS wheel',
        'Vossen wheels'
    ]   // Alternativna imena.

    const sliderList = document.getElementsByClassName('slides')[0]
    // Pristupa prvom elementu sa klasom slides.

    for (let i = 0; i < imageSources.length; i++) {
        let sliderItem = document.createElement('li') // Kreira '<li>' el.
        let sliderBackground = document.createElement('img') // Kreira '<img>' el.
        sliderItem.setAttribute('class', 'slide')   // Postavlja atribut klase za '<li>' el.
        sliderBackground.setAttribute('src', `images/${imageSources[i]}`) // Postavlja atribut izvora slike.
        sliderBackground.setAttribute('alt', imageAltNames[i]) // Postavlja atribut alternativnog imena.
        sliderItem.append(sliderBackground)     // Dodaje '<img>' element u '<li>' el.
        sliderList.append(sliderItem)           // Dodaje '<li>' el. u listu slidera.
    }

    // Slider JQuery.
    $(() => {
        let width = 100; // Sirina svakog slajda.
        let animationSpeed = 2000; // Brzina animacije u ms.
        let pause = 5000; // Vreme pauze izmedju slajdova.
        let currentSlide = 1; // Trenutni slajd.

        let $slider = $('#slider') // Sleketuje el. sa ID-om 'slider'
        let $slideContainer = $slider.find('.slides') // Selektuje kontejner slajdova unutar el. sa ID-om 'slider'.
        let $slides = $slideContainer.find('.slide') // Selektuje sve slajdove unutar kontejnera.
        var interval

        function sliderStart() {
            interval = setInterval(() => { // Funkcija 'setIntval', izvrsava se periodicno.
                $slideContainer.animate({ // Animiranje CSS svojstva.
                    'margin-left': '-=' + width + 'vw' // Pomera kontejner u levo. - Slajder ide u levo.
                }, animationSpeed, () => { // Animacija traje 'animationSpeed - 2000ms' sekundi.
                    currentSlide++ // Uvecava vrednost, oznacava trenutni slajd.
                    if (currentSlide === $slides.length) { // Proverava da li je trenutni slajd dostigao poslednji slajd.
                        currentSlide = 1                   // Ako jeste, postavlja vrednost na 1, vraca se na prvi slajd.
                        $slideContainer.css('margin-left', 0)
                    }
                })
            }, pause)
        }

        function sliderStop() { // Za zaustavljanje slajdera.
            clearInterval(interval) // Zaustavlja se interval koji automatski zapocinje slajder.
        }

        $slider.on('mouseenter', sliderStop).on('mouseleave', sliderStart)
        // Dva el. listener-a,  kada mis udje u slajder on se stopira, i kada izadje on nastavlja.

        sliderStart() // Poziva se f-ja kada se ponovo ucita stranica.
    })

    // Info Cards, glavna strana.
    const fadeEffect = [
        'fade-right',
        'fade-left'
    ];
    

    fetch('home.json')
        .then(response => response.json())
        .then(data => {
            const rimsImageSources = data.map(item => item.imageSource);
            const rimsAltNames = data.map(item => item.altName);
            const rimsCardTitles = data.map(item => item.cardTitle);
            const rimsCardText = data.map(item => item.cardText);

            // Dalji kod koji koristi ove promenljive ide ovde...

            const rimsContainer = document.querySelector('#product-cards')
            let rimsCards = '<section class="container">'
            let rimsCardCounter = 0; // Brojac.

            for (let i = 0; i < Math.ceil(rimsImageSources.length / 2); i++) {
                let effectCounter = 0;
                let cardRow = '<article class="row">'
                for (let j = 0; j < Math.floor(rimsImageSources.length / 3); j++) {
                    cardRow += `
                        <div data-aos="${fadeEffect[effectCounter]}" class="col s12 m6 l6">
                            <div class="card large">
                                <div class="card-image">
                                    <img alt="${rimsAltNames[rimsCardCounter]}" src="images/${rimsImageSources[rimsCardCounter]}">
                                    <span class="card-title">${rimsCardTitles[rimsCardCounter]}</span>
                                </div>
                                <div class="card-content">
                                    <p class="card-textContent">
                                        ${rimsCardText[rimsCardCounter]}
                                    </p>
                                </div>
                                <div class="card-action">
                                    <a class="red-text" href="rims.html">View more</a>
                                </div>
                            </div>
                        </div>
                    `
                    rimsCardCounter++;
                    effectCounter++;
                }
                cardRow += '</article>'
                rimsCards += cardRow;
            }

            rimsCards += '</section>'
            rimsContainer.innerHTML = rimsCards // Postavljanje sadrzaja kontejnera 'product-cards' na generisane kartice.
        })
        .catch(error => console.error('Error loading home data: ', error));

    // RIMS galerija.

    const rimsChooser = document.getElementById('product-chooser') // Selektuje element po ID sa imenom...

    fetch('gallery.json')
        .then(response => response.json())
        .then(data => {
            let finishedProduct = '';

            for(let i = 0; i < data.length; i += 3) {
                finishedProduct += '<div class="row" data-aos="fade-up">';
                for(let j = i; j < i + 3 && j < data.length; j++) {
                    finishedProduct += `
                        <div class="col s8 m4 14">
                            <div id="product-item">
                                <a class="tooltipped" href="rims.html" data-position="left" data-tooltip="${data[j].type}">
                                    <img src="images/${data[j].image}" alt="${data[j].alt}" class="responsive-img">
                                </a>
                            </div>
                        </div>
                    `;
                }
                finishedProduct += '</div>';
            }

            rimsChooser.innerHTML = finishedProduct // Postavlja generisani kod unutar elementa.
        })
        .catch(error => console.error('Error loading gallery data: ', error));
}


// ==============================================================================================================================================================================================================

function rimsPage() {
    let rimsData;

    function addToCart(productId) {
        const productToAdd = rimsData.find(product => product.id === parseInt(productId));

        if(productToAdd) {
            // Provera da li vec postoji korpa u localStorage.
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            let existingItem = cartItems.find(item => item.id === productToAdd.id);

            if (existingItem) {
                existingItem.quantity++; // Ažuriraj količinu ako je proizvod već u korpi
            } else {
                productToAdd.quantity = 1;
                cartItems.push(productToAdd);
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            updateCartIconCount();
            
        } else {
            console.error('Product not found.');
        }
    }

    // Funckija za filtriranje proizvoda prema kategoriji.
    const filterSelection = (filterName) => { // Deklaracija f-je koja prima argument.
        let filterItem = document.getElementsByClassName('filteringItem') // Dodavanje svih el. sa klasom u promenljivu.
        if (filterName == 'all') filterName = '' // Ako je odabrani filter 'all', postavlja 'filterName' na prazan string, sto znaci da NEMA FILTRIRANJA.
        for (let i = 0; i < filterItem.length; i++) {
            filterItem[i].classList.add('hide') // Dodavanje klase 'HIDE', cime se sakrivaju prozivodi.
            if (filterItem[i].className.indexOf(filterName) > -1) filterItem[i].classList.remove('hide')
            // Ako klasa el. sadrzi odrabrani filter, uklanja se klasa 'hide' sto rezultira prikazivanje odredjenih proizvoda na osnovu kategorije.
            // Proverava sadrzani odabrani filter. Ako je rez. veci od -1, to znaci da je pronadjen filter u klasi, i u tom slucaju se uklanja hide.
            // Ako bude -1, to znaci da filter nije pronadjen, i el. zadrzava klasu hide.
        }
    }

    fetch('buyRims.json')
        .then(response => response.json())
        .then(data => {
            rimsData = data;
            console.log(rimsData);

            const shopList = document.getElementById('product-shop');
            var rimsLists = '';
            var rimsCounter = 0;
            var classCounter;

            for (let i = 0; i < Math.ceil(rimsData.length / 3); i++) {
                var productRow = '<div class="row">'; // Pocetak reda proizvoda.
                classCounter = i;

                for (let j = 0; j < Math.floor(rimsData.length / 4); j++) {
                    // Kreiranje kartice za svaki proizvod.
                    productRow += `
                        <div class="col s12 m6 l4 ${rimsData[rimsCounter].className} filteringItem">
                            <div class="card large">
                                <div class="card-image resize">
                                    <img class="responsive-img item-image" src="images/${rimsData[rimsCounter].image}" alt="${rimsData[rimsCounter].title}" />
                                </div>
                                <div class=" card-content">
                                    <span class="card-title item-title red-text">${rimsData[rimsCounter].title}</span>
                                    <p>${rimsData[rimsCounter].description}</p>
                                </div>
                                <div class="card-action">
                                    <p id="price" class="center-align">$${rimsData[rimsCounter].price.toFixed(2)}</p>
                                    <a class="red-text" id="addToCartBtn" data-product-id="${rimsData[rimsCounter].id}">Add to cart</a>
                                </div>
                            </div>
                        </div>
                    `;
                    rimsCounter++;
                }
                productRow += '</div>'; // Kraj reda proizvoda.
                rimsLists += productRow; // Dodavanje reda u HTML string.
            }

            shopList.innerHTML = rimsLists; // Postavljanje stringa sa proizvodima u kontejner.

            // Dodavanje event listener-a za dugmad za dodavanje u korpu.
            const addToCartButtons = document.querySelectorAll('#addToCartBtn');
            for (let i = 0; i < addToCartButtons.length; i++) {
                let addToCartBtn = addToCartButtons[i];
                addToCartBtn.addEventListener('click', () => {
                    const productId = addToCartBtn.dataset.productId;
                    addToCart(productId);
                    M.toast({
                        html: 'Added to your cart!'
                    });
                });
            }

            // Dodavanje event listener-a za dugmad za filtriranje.
            const filterButtons = document.querySelectorAll('[data-filter]');
            filterButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const filterName = event.target.dataset.filter;
                    filterSelection(filterName);
                });
            });
        })
        .catch(error => console.error('Error fetching rims data: ', error));
}    

function updateCartIconCount() {
    const cartItemCountElement = document.getElementById('cart-item-count');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    cartItemCountElement.textContent = totalQuantity;
}
updateCartIconCount()

function cart() {
    document.addEventListener('DOMContentLoaded', () => {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartContainer = document.getElementById('cart');
        const totalQuantityElement = document.getElementById('totalQuantity');
        const totalPriceElement = document.getElementById('totalPrice');
        const buyBtn = document.getElementById('buyBtn');

        function updateQuantity(productId, quantity) {
            cartItems = cartItems.map(item => {
                if(item.id === parseInt(productId)) {
                    item.quantity = quantity;
                }
                return item;
            });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
            updateCartIconCount();
        }

        function renderCart() {
            if (cartItems.length === 0) {
                cartContainer.innerHTML = `
                    <div class="center-align empty-cart-message">
                        <h3>Your cart is empty!</h3>
                        <p>Please go to the <a href="rims.html">RIMS</a> page to add items to your cart.</p>
                    </div>
                `;
                totalQuantityElement.textContent = '0';
                totalPriceElement.textContent = '0.00';
                updateCartIconCount(); // Azuriranje brojaca.
            }       
            else {
                const cartHTML = cartItems.map(item => `
                    <div class="col s12 m3 14">
                        <div class="card">
                            <div class="card-image">
                                <img src="images/${item.image}" alt="${item.title}">
                                <span class="card-title red-text">${item.title}</span>
                            </div>
                            <div class="card-content">
                                <p>${item.description}</p>
                                <p>Price: $${item.price.toFixed(2)}</p>
                                <p>Quantity:
                                    <span id="quantity-${item.id}">${item.quantity}</span>
                                    <button class="btn-small" onclick="decreaseQuantity(${item.id})">-</button>
                                    <button class="btn-small" onclick="increaseQuantity(${item.id})">+</button>
                                </p>
                                <p style="margin-top: 10px;">Total Price: $${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                `).join('');

                cartContainer.innerHTML = cartHTML;

                const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
                const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
            
                totalQuantityElement.textContent = totalQuantity;
                totalPriceElement.textContent = totalPrice;

                updateCartIconCount();
            }
        }

        window.decreaseQuantity = function(productId) {
            const item = cartItems.find(item => item.id === productId);
            if(item && item.quantity > 1) {
                updateQuantity(productId, item.quantity - 1);
            } else if (item && item.quantity === 1) {
                cartItems = cartItems.filter(item => item.id !== productId);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                renderCart();
            }
        };

        window.increaseQuantity = function(productId) {
            const item = cartItems.find(item => item.id === productId);

            if(item) {
                updateQuantity(productId, item.quantity + 1);
            }
        };
        
        renderCart();

        buyBtn.addEventListener('click', () => {
            if(cartItems.length === 0) {
                M.toast({
                    html: 'Your cart is empty. Please add items to your cart before checking out.'
                });
            } else {
                cartItems = [];
                localStorage.setItem('cartItems', JSON.stringify(cartItems));

                renderCart();

                totalQuantityElement.textContent = '0';
                totalPriceElement.textContent = '0.00';

                M.toast({
                    html: 'You have successfully purchased your favorite rim!'
                });
            }
        })
    });
}  

// ==============================================================================================================================================================================================================

// Forma.
function contactFormValidation() {
    const contactForm = document.querySelector('#contact-form') // Selektuje formu za unos.
    const nameField = document.querySelector('#full_name')  // Selektuje polje ime.
    const mailField = document.querySelector('#mail')   // Selektuje polje prezime.
    const textField = document.querySelector('#textarea2') // Selektuje polje za unos teksta.
    const submitButton = document.querySelector('#contactSubmit')
    const fields = document.querySelectorAll('.fieldInput') // Selektuje sva polja sa klasom.
    const questionSelect = document.querySelector('#typeSelect')
    const professionSelect = document.querySelector('#professionSelect')
    const newsletter = document.querySelector('#newsletter') // Selektuje newsletter.
    const inputFields = Array.from(fields) // Konvertuje NodeList u niz.


    // Funkcije provere unosa.
    const checkSelects = () => { // Provera izbora u dropdown poljima.
        let selectedQuestion = questionSelect.options[questionSelect.selectedIndex].value // Dobavlja vrednost odabrane opcije iz padajuceg menija, onda daje index opcije, 
        console.log(selectedQuestion)     // 'questionSelect.options' daje pristup ka svim opcijama. 
        let selectedProfession = professionSelect.options[professionSelect.selectedIndex].value // 'value' uzima na kraju vrednost odabrane opcije.
        if (selectedQuestion != 0 && selectedProfession != 0) return 1
        return 0 // Proverava da li su vrednosti odabranih opcija razlicite od nule, ako jesu onda su odabrane validne opcije.
    }

    const checkTextField = () => {
        if (textField.value.length > 450) {
            fieldInvalid(textField, "Text can't be longer than 400 characters!")
            return 0
        } else if (textField.value == '' || textField.value == null || textField.value.length == 0) {
            fieldInvalid(textField, "Do not leave this empty!")
            return 0
        } else {
            fieldValid(textField)
            return 1
        }
    }

    const checkName = () => {
        let nameField = document.querySelector('#full_name')
        let nameExpression = /^[A-ZČĆŽĐŠ][a-zćčžđš]{1,14}\s([A-ZČĆŽĐŠ][a-zćčžđš]{1,14})?\s?[A-ZČĆŽŠĐ][a-zćčžđš]{1,19}$/
        nameFieldValue = nameField.value
        return checkRegEx(nameExpression, nameFieldValue, nameField)
    }

    const checkMail = () => {
        let mailField = document.querySelector('#mail')
        let mailExpression = /^[a-zA-Z0-9]([a-z]|[0-9])+\.?-?_?([a-z]|[0-9])*\.?([a-z]|[0-9])*\@[a-z]{3,}\.([a-z]{2,4}\.)?([a-z]{2,4})$/g
        mailFieldValue = mailField.value
        return checkRegEx(mailExpression, mailFieldValue, mailField)
    }

    const checkButton = () => {
        if (checkTextField() && checkName() && checkMail() && checkSelects()) { // Ako sve f-je vrate TRUE, onda su validne.
            if (submitButton.classList.contains('darkred')) {
                submitButton.classList.remove('darkred')
                submitButton.classList.add('red')
            } else {
                submitButton.classList.add('red')
            }
            return 1 // Dugme je validno, i mozemo SUBMIT-ovati formu.
        } else {
            if (submitButton.classList.contains('red')) {
                submitButton.classList.remove('red')
                submitButton.classList.add('darkred')
            } else {
                submitButton.classList.add('darkred')
            }
            return 0 // Dugme nije validno, zato sto nismo lepo popunili formu.
        }
    }

    textField.addEventListener('keyup', checkTextField)

    mailField.addEventListener('keyup', checkMail)

    nameField.addEventListener('keyup', checkName)

    questionSelect.addEventListener('change', checkSelects)

    professionSelect.addEventListener('change', checkSelects)

    submitButton.addEventListener('click', (event) => {
        let selectedProfession = professionSelect.options[professionSelect.selectedIndex].innerText
        let selectedQuestion = questionSelect.options[questionSelect.selectedIndex].innerText
        if (checkButton()) {
            event.preventDefault()
            if (newsletter.checked) alert(`Thank you ${selectedProfession} ${nameField.value.split(' ')[0]} for contacting us about ${selectedQuestion} topic, we will send you the answer on ${mailField.value} as soon as possible`)
            else alert(`Thank you ${selectedProfession} ${nameField.value.split(' ')[0]} for contacting us about ${selectedQuestion} topic, we will send you the answer on ${mailField.value} as soon as possible! - Subscribe to our newsletter for newest things!`)
            inputFields.forEach(inputField => {
                inputField.value = ''
                inputField.nextElementSibling.innerText = ''
            })
            professionSelect.selectedIndex = 0
            questionSelect.selectedIndex = 0
            checkButton()
        } else {
            alert('You forgot something to fill or select!')
            event.preventDefault()
            checkName()
            checkMail()
            checkTextField()
        }
    })

    // Funkcije.
    function fieldValid(field) {
        if (field.classList.contains('fail')) {
            field.classList.remove('fail')
            field.classList.add('pass')
            field.nextElementSibling.classList.remove('red-text')
            field.nextElementSibling.classList.add('darkred-text')
        } else {
            field.classList.add('pass')
        }
        field.nextElementSibling.innerHTML = `&check;`
        field.nextElementSibling.classList.add('darkred-text')

    }

    function fieldInvalid(field, text) {
        if (field.classList.contains('pass')) {
            field.classList.remove('pass')
            field.classList.add('fail')
            field.nextElementSibling.classList.remove('darkred-text')
            field.nextElementSibling.classList.add('red-text')
        } else {
            field.classList.add('fail')
        }
        field.nextElementSibling.innerText = `${text}`
        field.nextElementSibling.classList.add('red-text')
    }

    const checkRegEx = (expression, fieldValue, field) => {
        if (expression.test(String(fieldValue))) {
            fieldValid(field)
            return 1
        } else {
            fieldInvalid(field, `${field.name} is not as expected!`)
            return 0
        }
    }
    // END OF FUCNTIONS

    inputFields.forEach(inputField => {
        inputField.addEventListener('keyup', checkButton)
    })

    professionSelect.addEventListener('change', checkButton)

    questionSelect.addEventListener('change', checkButton)
}
// document.addEventListener('DOMContentLoaded', contactFormValidation); // Aktivira funkcija kada se cela stranica ucita. Potrebno kako bi se svi elementi forme ucitali pre nego sto se postave event listeneri.


// Radno vreme.
function generateOpeningHoursTable() {
    if (document.getElementById("openTimeTable").getElementsByTagName("tbody")[0].innerHTML !== '') {
        return; // Proverava da li vec postoji tabela s otvorenim vremenima.
    }
    // Dobavlja referencu na telo tabele. [0] zato sto pristupa prvom elementu u NodeListu.
    var tableBody = document.getElementById("openTimeTable").getElementsByTagName("tbody")[0];

    var openingHours = [
        { day: "Monday", open: "8:00 AM", close: "10:00 PM" },
        { day: "Tuesday", open: "8:00 AM", close: "10:00 PM" },
        { day: "Wednesday", open: "8:00 AM", close: "10:00 PM" },
        { day: "Thursday", open: "8:00 AM", close: "10:00 PM" },
        { day: "Friday", open: "8:00 AM", close: "10:00 PM" },
        { day: "Saturday", open: "8:00 AM", close: "10:00 PM" },
        { day: "Sunday", open: "8:00 AM", close: "5:00 PM" }
    ];

    for (var i = 0; i < openingHours.length; i++) {
        var row = tableBody.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        // Postavlja vrednosti u tabelu.
        cell1.innerHTML = openingHours[i].day;
        cell2.innerHTML = openingHours[i].open;
        cell3.innerHTML = openingHours[i].close;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    generateOpeningHoursTable();
});



// ==============================================================================================================================================================================================================

function pricesPage() {

    const tableContainer = document.getElementsByClassName('table-holder')[0];

    let priceTableContainer = document.querySelector('#table-container');
    let priceTable = document.createElement('table');

    // Funkcija za dodavanje redova u tabelu na osnovu podataka iz JSON-a
    function addRowsFromJSON(data) {
        data.forEach(function(item) {
            var row = document.createElement('tr');
            var nameCell = document.createElement('td');
            var priceCell = document.createElement('td');

            // Postavljanje teksta u ćelijama
            nameCell.textContent = item.title;
            priceCell.textContent = '$ ' + item.price.toFixed(2);

            // Dodavanje ćelija u red
            row.appendChild(nameCell);
            row.appendChild(priceCell);

            // Dodavanje reda u tabelu
            priceTable.appendChild(row);
        });
    }

    // AJAX za učitavanje podataka iz JSON datoteke
    var pricexhr = new XMLHttpRequest();
    pricexhr.onreadystatechange = function() {
        if (pricexhr.readyState === 4) {
            if (pricexhr.status === 200) {
                // Uspješno učitani podaci
                var data = JSON.parse(pricexhr.responseText);
                // Dodavanje redova u tabelu na osnovu podataka iz JSON-a
                addRowsFromJSON(data);
            } else {
                // Greška prilikom učitavanja podataka
                console.error('Došlo je do greške prilikom učitavanja podataka:', pricexhr.status);
            }
        }
    };
    pricexhr.open('GET', 'rims.json', true);
    pricexhr.send();

    // Dodavanje tabele na stranicu
    priceTableContainer.append(priceTable);

    // Funkcija za filtriranje prema unosa u pretraživaču
    function filterRims() {
        let cellText, rowCell;
        let searchInput = document.querySelector('#product-search'); // Uzima element.
        let searchFilter = searchInput.value.toUpperCase(); // Pretvara u velika, kako bi filtriranje bilo nespecificno po pitanju velicine slova.
        let tableRow = document.getElementsByTagName('tr');

        for (let i = 0; i < tableRow.length; i++) {
            rowCell = tableRow[i].getElementsByTagName('td')[0]; // Dobija prvi red tabele.
            cellText = rowCell.textContent || rowCell.innerText; // Ova celija sadrzi text koji zelimo da filtriramo.
            if (cellText.toUpperCase().indexOf(searchFilter) > -1) { // Ako sadrzi uneti filter, to znaci da je pronadjen odgovarajuci rezultat i red tabele ostaje vidljiv.
                if (tableRow[i].classList.contains('hide')) tableRow[i].classList.remove('hide');
            } else tableRow[i].classList.add('hide'); // U suprotnom se sakriva dodavanje klase 'hide'.
        }
    }

    // Selektuje input polje za pretragu i dodaje EventListener za pracenje dogadjaja sa tast.
    let searchInput = document.querySelector('#product-search').addEventListener('keyup', filterRims);

    $(document).ready(() => $('table tr:even').css('background-color', '#eee'))
    // Koristi JQuery za promenu boje pozadine parnih redova tabele na sivo.

    // Reviews deo.
    var reviewxhr = new XMLHttpRequest();
    reviewxhr.onreadystatechange = function() {
        if(reviewxhr.readyState == 4) {
            if(reviewxhr.status == 200) {
                var reviewData = JSON.parse(reviewxhr.responseText);
                addReviews(reviewData);
            }
            else {
                console.error("Doslo je do greske prilikom ucitavanja podataka.");
            }
        }
    };
    reviewxhr.open('GET', 'reviews.json', true);
    reviewxhr.send();

    function addReviews(data) {
        const reviewContainer = document.querySelector('#review-container');
        data.forEach(function (review, i) {
            const existingDiv = reviewContainer.querySelector(`[data-index="${i}"]`);
            // Proverava postojanje div elementa sa odredjenim atributom data-index.

            if (!existingDiv) { // Ako div ne postoji, kreira ga i dodaje na stranicu.
                let reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review', 'col', 's12', 'm6', '16');
                reviewDiv.setAttribute('data-index', i);
                reviewDiv.style.padding = '20px';

                let image = document.createElement('img');
                image.src = `images/${review.image}`;
                image.alt = review.name;
                image.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 1)';

                let name = document.createElement('h5');
                name.textContent = review.name;

                let ratingContainer = document.createElement('div');
                ratingContainer.style.color = 'red';

                let starIcon = document.createElement('span');
                starIcon.innerHTML = ' &#9733;';

                let rating = document.createElement('p');
                rating.textContent = `RATING: ${review.rating}`;
                ratingContainer.appendChild(rating);
                rating.appendChild(starIcon);

                let comment = document.createElement('p');
                comment.innerHTML = `<span style="color: red">${review.comment.split(',')[0]}</span>${review.comment.slice(review.comment.indexOf(','))}`;

                reviewDiv.appendChild(image);
                reviewDiv.appendChild(name);
                reviewDiv.appendChild(ratingContainer);
                reviewDiv.appendChild(comment);

                reviewContainer.appendChild(reviewDiv);
            }
        });
    }

}

function sortPrices(order) {
    // Dobijamo referencu na tabelu sa cenama.
    var table = document.querySelector('#table-container table');
    // Dobijamo sve redove iz tabele osim prvog koji sadrži zaglavlje.
    var rows = Array.from(table.querySelectorAll('tr:nth-child(n+2)'));

    // Sortiramo redove u skladu sa izabranom opcijom.
    rows.sort(function(row1, row2) {
        var price1 = parseFloat(row1.cells[1].textContent.replace('$', '').trim());
        var price2 = parseFloat(row2.cells[1].textContent.replace('$', '').trim());

        if (order === 'newest') {
            // Sortiranje po najnovijem.
            return price1 < price2 ? 1 : -1;
        } else if (order === 'oldest') {
            // Sortiranje po najstarijem
            return price1 > price2 ? 1 : -1;
        } else if (order === 'ascending') {
            // Sortiranje po rastućem redosledu.
            return price1 - price2;
        } else if (order === 'descending') {
            // Sortiranje po opadajućem redosledu.
            return price2 - price1;
        }
        else if (order === 'az') {
            // Sortiranje od A-Z.
            var title1 = row1.cells[0].textContent.trim();
            var title2 = row2.cells[0].textContent.trim();
            return title1.localeCompare(title2);
        }
        else if (order === 'za') {
            // Sortiranje od Z-A.
            var title1 = row1.cells[0].textContent.trim();
            var title2 = row2.cells[0].textContent.trim();
            return title2.localeCompare(title1);
        }
    });

    // Uklanjamo sve postojeće redove iz tabele.
    table.innerHTML = '';

    // Dodajemo sortirane redove nazad u tabelu.
    rows.forEach(function(row) {
        table.appendChild(row);
    });
}


// ==============================================================================================================================================================================================================

function footer() {
    // Info linkovi.
    const storeInfo = [ // Svaki obj. predstavlja jedan link sa tekstom i povezanoscu.
        { text: 'INFO & COMMON FAQ', href: 'index.html' },
        { text: 'MY ACCOUNT & ORDER HISTORY', href: 'support.html' },
        { text: 'FIND A NEAREST STORE', href: 'support.html#anchor' },
        { text: 'REVIEWS', href: 'prices.html#anchor' }
    ]

    const storeInfoList = document.querySelector('.store-info')
    var storeInfoItem = ''
    var infoStorage = ''

    // Generise se petlja, prolazi kroz svaki objekat i stavlja link.
    for (let i = 0; i < storeInfo.length; i++) {
        storeInfoItem = `
            <li>
                <a class="grey-text text-lighten-3" href="${storeInfo[i].href}">${storeInfo[i].text}</a>
            </li>
        `
        infoStorage += storeInfoItem
    }
    storeInfoList.innerHTML = infoStorage


    // Company info linkovi.
    const companyInfo = [
        { text: 'RIMS', href: 'rims.html' },
        { text: 'REPAIR', href: 'support.html#anchor' },
        { text: 'PRICES', href: 'prices.html' },
        { text: 'CONTACT US', href: 'support.html#anchor' }
    ]

    const companyInfoList = document.querySelector('.company-info')
    var companyInfoItem = ''
    var companyInfoStorage = ''

    for (let i = 0; i < companyInfo.length; i++) {
        // Generisanje HTML za svaki link,
        companyInfoItem = `
            <li>
                <a class="grey-text text-lighten-3" href="${companyInfo[i].href}">${companyInfo[i].text}</a>
            </li>
        `
        // Dodavanje generisanog HTML u skladiste.
        companyInfoStorage += companyInfoItem
    }
    // Postavljanje sadrzaja .company-info elementa na generisani HTML.
    companyInfoList.innerHTML = companyInfoStorage
}

// 'BACK TO TOP' button.
function scrollToTopButton() {
    const backToTopButton = document.getElementById('toTopBtn') // Pronalazenje dugmeta koje ce vratiti korisnika na vrh.
    const scrollBack = () => window.scrollTo(0, 0) // Definisanje funkcije koj ce pomeriti na vrh.

    backToTopButton.addEventListener('click', scrollBack) // Dodavanje eventa na dugme kako bi se omogucilo vracanje na vrh.

    const showButton = () => { 
        if (window.pageYOffset > 300) {
            if (backToTopButton.classList.contains('scale-out')) {
                // Dodavanje klase za animaciju pri prikazivanju dugmeta.
                backToTopButton.classList.remove('scale-out')
                backToTopButton.classList.add('scale-in')
            }
        } else {
            if (backToTopButton.classList.contains('scale-in')) {
                // Dodavanje klase za animaciju pri sakrivanju dugmeta.
                backToTopButton.classList.remove('scale-in')
                backToTopButton.classList.add('scale-out')
            }
        }
    }
    // Dodavanje eventa na prozor kako bi se pratila promena pozicija korisnika na stranici.
    window.addEventListener('scroll', showButton)
}

// --------- JQUERY i AOS.

// Inicijalizacija biblioteke AOS za animaciju pri skrolovanju.
AOS.init() // fade-in, zoom-in, rotate-in itd.
           // data-aos = "fade-in"

const sideNav = document.querySelector('.sidenav')

M.Sidenav.init(sideNav, {})

$(document).ready(() => $('.tabs').tabs())

$(document).ready(() => $('.modal').modal()) // Inicijalizacija funkcionalnosti za modalne prozore.

$(document).ready(() => $('.slider').slider()) // ... za klizace.

$(document).ready(() => $('select').formSelect()) // ... drop-down izbore.

$(document).ready(() => $('.tooltipped').tooltip()) // ... tooltip-ove.

// Inicijalizacija brojaca karaktera za odredjena polja unosa.
$(document).ready(() => $('input#input_text, textarea#textarea2').characterCounter())

// Sakriva loading-container nakon sto se stranica ucita.
$(window).on('load', () => $('.loading-container').fadeOut(1000))
