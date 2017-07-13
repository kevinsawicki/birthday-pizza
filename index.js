var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Orbiter = (function () {
    function Orbiter(name, period) {
        this.name = name;
        this.period = period * 24 * 60 * 60 * 1000;
    }
    Orbiter.prototype.getStartOfDay = function () {
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return today.getTime();
    };
    Orbiter.prototype.getAge = function (date) {
        var time = this.getStartOfDay() - date.getTime();
        return Math.floor(time / this.period);
    };
    Orbiter.prototype.getNextBirthday = function (date) {
        var age = this.getAge(date) + 1;
        var birthday = this.period * age;
        return new Birthday(this, new Date(date.getTime() + birthday), age);
    };
    return Orbiter;
}());
var Birthday = (function () {
    function Birthday(location, date, age) {
        this.location = location;
        this.date = date;
        this.age = age;
    }
    Birthday.prototype.isToday = function () {
        var today = new Date();
        return today.getFullYear() === this.date.getFullYear() &&
            today.getDate() === this.date.getDate() &&
            today.getMonth() === this.date.getMonth();
    };
    Birthday.prototype.isTomorrow = function () {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.getFullYear() === this.date.getFullYear() &&
            tomorrow.getDate() === this.date.getDate() &&
            tomorrow.getMonth() === this.date.getMonth();
    };
    Birthday.prototype.toAgeString = function () {
        return this.age.toString().split('').reverse().map(function (number, index) {
            if (index > 0 && index % 3 === 0)
                return number + ',';
            else
                return number;
        }).reverse().join('');
    };
    Birthday.prototype.toDateString = function () {
        var month;
        switch (this.date.getMonth()) {
            case 0:
                month = 'jan';
                break;
            case 1:
                month = 'feb';
                break;
            case 2:
                month = 'mar';
                break;
            case 3:
                month = 'apr';
                break;
            case 4:
                month = 'may';
                break;
            case 5:
                month = 'june';
                break;
            case 6:
                month = 'july';
                break;
            case 7:
                month = 'aug';
                break;
            case 8:
                month = 'sept';
                break;
            case 9:
                month = 'oct';
                break;
            case 10:
                month = 'nov';
                break;
            case 11:
                month = 'dec';
                break;
        }
        return month + ' ' + this.date.getDate() + ', ' + this.date.getFullYear();
    };
    return Birthday;
}());
var Planet = (function (_super) {
    __extends(Planet, _super);
    function Planet(name, period) {
        _super.call(this, name, period);
        this.moons = [];
    }
    Planet.prototype.addMoon = function (name, period) {
        this.moons.push(new Moon(name, period, this));
        return this;
    };
    return Planet;
}(Orbiter));
var Moon = (function (_super) {
    __extends(Moon, _super);
    function Moon(name, period, planet) {
        _super.call(this, name, period);
        this.planet = planet;
    }
    return Moon;
}(Orbiter));
var Earth = (function (_super) {
    __extends(Earth, _super);
    function Earth() {
        _super.call(this, 'Earth', 365.256363004);
        this.addMoon('Luna', 27.321582);
    }
    Earth.prototype.getAge = function (date) {
        var now = new Date();
        var birthday = new Date();
        birthday.setTime(date.getTime());
        birthday.setFullYear(now.getFullYear());
        var age = now.getFullYear() - date.getFullYear();
        if (birthday.getTime() > now.getTime())
            age--;
        return age;
    };
    Earth.prototype.getNextBirthday = function (date) {
        var age = this.getAge(date);
        var birthday = new Date();
        birthday.setTime(date.getTime());
        birthday.setFullYear(date.getFullYear() + age);
        var now = new Date();
        if (now.getFullYear() !== birthday.getFullYear() ||
            now.getDate() !== birthday.getDate() ||
            now.getMonth() !== birthday.getMonth()) {
            birthday.setFullYear(birthday.getFullYear() + 1);
            age++;
        }
        return new Birthday(this, birthday, age);
    };
    return Earth;
}(Planet));
var planets = [];
planets.push(new Planet('Mercury', 87.9691));
planets.push(new Planet('Venus', 224.701));
planets.push(new Earth());
planets.push(new Planet('Mars', 686.971)
    .addMoon('Phobos', 0.31891023)
    .addMoon('Deimos', 1.263));
planets.push(new Planet('Jupiter', 4332.59)
    .addMoon('Io', 1.7691)
    .addMoon('Europa', 3.5512)
    .addMoon('Ganymede', 7.1546)
    .addMoon('Callisto', 16.689));
planets.push(new Planet('Saturn', 10759.22)
    .addMoon('Mimas', 0.942)
    .addMoon('Enceladus', 1.370218)
    .addMoon('Tethys', 1.887802)
    .addMoon('Dione', 2.736915)
    .addMoon('Rhea', 4.518212)
    .addMoon('Titan', 15.945)
    .addMoon('Iapetus', 79.3215));
planets.push(new Planet('Uranus', 30687.15)
    .addMoon('Miranda', 1.413479)
    .addMoon('Ariel', 2.52)
    .addMoon('Umbriel', 4.144)
    .addMoon('Titania', 8.706234)
    .addMoon('Oberon', 13.463234));
planets.push(new Planet('Neptune', 60190.03)
    .addMoon('Triton', 5.876854));
planets.push(new Planet('Pluto', 90465)
    .addMoon('Charon', 6.3872304));
var $;
function setInitialDate() {
    var initialDate = new Date();
    initialDate.setFullYear(initialDate.getFullYear() - 18);
    if (window.location.hash.length > 1) {
        var hash = window.location.hash.substring(1).replace(/-/g, ' ');
        var hashDate = new Date(hash);
        if (!isNaN(hashDate.getTime()))
            initialDate = hashDate;
    }
    $('.js-select-day').val(initialDate.getDate());
    $('.js-select-month').val(initialDate.getMonth());
    $('.js-select-year').val(initialDate.getFullYear());
}
function getSelectedDate() {
    var day = parseInt($('.js-select-day').val());
    var month = parseInt($('.js-select-month').val());
    var year = parseInt($('.js-select-year').val());
    var date = new Date();
    date.setFullYear(year, month, day);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}
function getUpcomingBirthdays(date) {
    var birthdays = [];
    var addBirthday = function (orbiter) {
        birthdays.push(orbiter.getNextBirthday(date));
    };
    planets.forEach(function (planet) {
        addBirthday(planet);
        planet.moons.forEach(addBirthday);
    });
    birthdays.sort(function (birthday1, birthday2) {
        return birthday1.date.getTime() - birthday2.date.getTime();
    });
    return birthdays;
}
function updateLocationHash() {
    var date = getSelectedDate();
    var month;
    switch (date.getMonth()) {
        case 0:
            month = 'january';
            break;
        case 1:
            month = 'february';
            break;
        case 2:
            month = 'march';
            break;
        case 3:
            month = 'april';
            break;
        case 4:
            month = 'may';
            break;
        case 5:
            month = 'june';
            break;
        case 6:
            month = 'july';
            break;
        case 7:
            month = 'august';
            break;
        case 8:
            month = 'september';
            break;
        case 9:
            month = 'october';
            break;
        case 10:
            month = 'november';
            break;
        case 11:
            month = 'december';
            break;
    }
    var day = date.getDate();
    var year = date.getFullYear();
    var hash = month + '-' + day + '-' + year;
    window.location.hash = hash;
}
function updateBirthdays() {
    var date = getSelectedDate();
    getUpcomingBirthdays(date).forEach(function (birthday) {
        var name = birthday.location.name.toLowerCase();
        $('.age-' + name).text(birthday.toAgeString());
        $('.age-' + name).removeClass('birthday-today birthday-tomorrow');
        $('.birthday-' + name).removeClass('birthday-today birthday-tomorrow');
        if (birthday.isToday()) {
            $('.age-' + name).addClass('birthday-today');
            $('.birthday-' + name).addClass('birthday-today');
            $('.birthday-' + name).text('TODAY!');
        }
        else if (birthday.isTomorrow()) {
            $('.age-' + name).addClass('birthday-tomorrow');
            $('.birthday-' + name).addClass('birthday-tomorrow');
            $('.birthday-' + name).text('tomorrow');
        }
        else {
            $('.birthday-' + name).text(birthday.toDateString());
        }
    });
}
function updateAvailableDays() {
    var day = parseInt($('.js-select-day').val());
    var month = parseInt($('.js-select-month').val());
    var year = parseInt($('.js-select-year').val());
    var leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    $('.js-day').prop('disabled', false);
    switch (month) {
        case 1:
            if (leap) {
                $('.js-day-30, .js-day-31').prop('disabled', true);
                if (day > 29)
                    $('.js-select-day').val(29);
            }
            else {
                $('.js-day-29, .js-day-30, .js-day-31').prop('disabled', true);
                if (day > 28)
                    $('.js-select-day').val(28);
            }
            break;
        case 3: // April
        case 5: // June
        case 8: // September
        case 10:
            $('.js-day-31').prop('disabled', true);
            if (day > 30)
                $('.js-select-day').val(30);
            break;
    }
}
function setBirthdayFromHash() {
    setInitialDate();
    updateAvailableDays();
    updateBirthdays();
}
function handleEvents() {
    // Enable back/forward navigation by listening to hash changes on the window.
    $(window).on('hashchange', setBirthdayFromHash);
    $('select').on('change', function () {
        updateAvailableDays();
        updateLocationHash();
        updateBirthdays();
    });
}
if (navigator.serviceWorker != null) {
    navigator.serviceWorker.register('/service-worker.js');
}
$(function () {
    setBirthdayFromHash();
    handleEvents();
});
