Datepicker.locales.de = {
    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    daysShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    today: "Heute",
    monthsTitle: "Monate",
    clear: "Löschen",
    weekStart: 1,
    format: "dd.mm.yyyy"
};

const calendarElement = document.getElementById('calendar');
const slotContainer = document.getElementById('slot-container');

const notYetBooked = document.getElementById('not-yet-booked');
const slotBooked = document.getElementById('slot-booked');
const bookedDate = document.getElementById('booked-date');

const nameInput = document.getElementById('name-input');
const mailInput = document.getElementById('mail-input');
const phoneInput  = document.getElementById('phone-input');

// COPY
const calendarElement2 = document.getElementById('calendar2');
const slotContainer2 = document.getElementById('slot-container2');

const notYetBooked2 = document.getElementById('not-yet-booked2');
const slotBooked2 = document.getElementById('slot-booked2');
const bookedDate2 = document.getElementById('booked-date2');

const nameInput2 = document.getElementById('name-input2');
const mailInput2 = document.getElementById('mail-input2');
const phoneInput2  = document.getElementById('phone-input2');
// ===



const freeSlots = [];
let dateButtons = [];
const freeSlots2 = [];
let dateButtons2 = [];

window.onload = () => {
    var calendarid = 'k7okmc8lnqftjgmkthqg2lt8o4@group.calendar.google.com';
    var mykey = 'AIzaSyDMO1QbbTzJEkcfo3Ydvr9EOIjdTwTezgw';
    $.ajax({
        type: 'GET',
        url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid + '/events?key=' + mykey),
        dataType: 'json',
        success: function (response) {
            response.items.forEach(item => {
                freeSlots.push(new Date(item.start.dateTime));
                freeSlots2.push(new Date(item.start.dateTime));
            });
            new Datepicker(calendarElement, {
                language: 'de',
                beforeShowDay: function (date) {
                    return !!freeSlots.find(s => s.toDateString() === date.toDateString()); }
            });
            new Datepicker(calendarElement2, {
                language: 'de',
                beforeShowDay: function (date) {
                    return !!freeSlots2.find(s => s.toDateString() === date.toDateString()); }
            });

        },
        error: function (response) {
            console.log(response)
        }
    });
}

function formatDate(date) {
    return date.toLocaleDateString('de-DE') + ", " + date.getHours() + ":" + date.getMinutes().toLocaleString('de-DE', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }) + " Uhr";
}

function validateInput() {
    dateButtons.forEach(b => b.disabled = nameInput.value.length === 0 || !mailInput.value.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
}

nameInput.oninput = validateInput
mailInput.oninput = validateInput

function bookSlot(date) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://mailer.onepiece.software/appointment", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function (oEvent) {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                alert("Leider ist etwas schiefgelaufen. Kontaktiere mich bitte direkt: kontakt@nachderkur.de");
            }
        }
    };
    xhr.onload = () => {
        bookedDate.textContent = formatDate(date)
        notYetBooked.hidden = true;
        slotBooked.hidden = false;
    };
    xhr.send(JSON.stringify({
        date: date.getTime(),
        name: nameInput.value + " " + (window.location.pathname.includes("kliniken") ? "(Kurklinik)" : " (Workshop)"),
        mail: mailInput.value,
        phone: phoneInput.value
    }));
}

calendarElement.addEventListener("changeDate", function (e) {
    const selectedDate = e.detail.date;
    const slotsOnDay = freeSlots.filter(s => s.toDateString() === selectedDate.toDateString());

    slotContainer.innerHTML = '';
    dateButtons = [];
    slotsOnDay.sort((a, b) => a - b).forEach(s => {
        const p = document.createElement("p");
        const dateButton = document.createElement("input");
        dateButton.type = 'button';
        const dateString = document.createElement("span");
        dateString.textContent = formatDate(s) + "\u00A0\u00A0";
        dateButton.value = "jetzt buchen"
        p.appendChild(dateString);
        p.appendChild(dateButton);
        slotContainer.appendChild(p);
        dateButton.onclick = () => bookSlot(s);
        dateButton.disabled = true;
        dateButtons.push(dateButton);
        validateInput();
    });
}, false);

// COPY
function validateInput2() {
    dateButtons2.forEach(b => b.disabled = nameInput2.value.length === 0 || !mailInput2.value.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
}

nameInput2.oninput = validateInput2
mailInput2.oninput = validateInput2

function bookSlot2(date) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://mailer.onepiece.software/appointment", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function (oEvent) {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                alert("Leider ist etwas schiefgelaufen. Kontaktiere mich bitte direkt: kontakt@nachderkur.de");
            }
        }
    };
    xhr.onload = () => {
        bookedDate2.textContent = formatDate(date)
        notYetBooked2.hidden = true;
        slotBooked2.hidden = false;
    };
    xhr.send(JSON.stringify({
        date: date.getTime(),
        name: nameInput2.value + " | " + window.location.pathname + " (Coaching)",
        mail: mailInput2.value,
        phone: phoneInput2.value
    }));
}

calendarElement2.addEventListener("changeDate", function (e) {
    const selectedDate = e.detail.date;
    const slotsOnDay = freeSlots2.filter(s => s.toDateString() === selectedDate.toDateString());

    slotContainer2.innerHTML = '';
    dateButtons2 = [];
    slotsOnDay.sort((a, b) => a - b).forEach(s => {
        const p = document.createElement("p");
        const dateButton = document.createElement("input");
        dateButton.type = 'button';
        const dateString = document.createElement("span");
        dateString.textContent = formatDate(s) + "\u00A0\u00A0";
        dateButton.value = "jetzt buchen"
        p.appendChild(dateString);
        p.appendChild(dateButton);
        slotContainer2.appendChild(p);
        dateButton.onclick = () => bookSlot2(s);
        dateButton.disabled = true;
        dateButtons2.push(dateButton);
        validateInput2();
    });
}, false);
