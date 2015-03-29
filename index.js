var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Orbiter = (function () {
    function Orbiter(name, period) {
        this.name = name;
        this.period = period * 24 * 60 * 60 * 1000;
    }
    Orbiter.prototype.getAge = function (date) {
        var time = Date.now() - date.getTime();
        return Math.floor(time / this.period);
    };
    Orbiter.prototype.getNextBirthday = function (date) {
        var age = this.getAge(date);
        var birthday = this.period * (age + 1);
        return new Birthday(this, new Date(date.getTime() + birthday));
    };
    return Orbiter;
})();
var Birthday = (function () {
    function Birthday(location, date) {
        this.location = location;
        this.date = date;
    }
    return Birthday;
})();
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
})(Orbiter);
var Moon = (function (_super) {
    __extends(Moon, _super);
    function Moon(name, period, planet) {
        _super.call(this, name, period);
        this.planet = planet;
    }
    return Moon;
})(Orbiter);
var planets = [];
planets.push(new Planet('Mercury', 87.9691));
planets.push(new Planet('Venus', 224.701));
planets.push(new Planet('Earth', 365.256363004).addMoon('Moon', 27.321582));
planets.push(new Planet('Mars', 686.971).addMoon('Phobos', 0.31891023).addMoon('Deimos', 1.263));
planets.push(new Planet('Jupiter', 4332.59).addMoon('Io', 1.7691).addMoon('Europa', 3.5512).addMoon('Ganymede', 7.1546).addMoon('Callisto', 16.689));
planets.push(new Planet('Saturn', 10759.22).addMoon('Mimas', 0.942).addMoon('Enceladus', 1.370218).addMoon('Tethys', 1.887802).addMoon('Dione', 2.736915).addMoon('Rhea', 4.518212).addMoon('Titan', 15.945).addMoon('Iapetus', 79.3215));
planets.push(new Planet('Uranus', 30687.15).addMoon('Miranda', 1.413479).addMoon('Ariel', 2.52).addMoon('Umbriel', 4.144).addMoon('Titania', 8.706234).addMoon('Oberon', 13.463234));
planets.push(new Planet('Neptune', 60190.03).addMoon('Triton', 5.876854));
var $;
function setInitialDate() {
    var now = new Date();
    $('.js-select-day').val(now.getDate());
    $('.js-select-month').val(now.getMonth());
    $('.js-select-year').val(now.getFullYear() - 30);
}
function getSelectedDate() {
    var day = parseInt($('.js-select-day').val());
    var month = parseInt($('.js-select-month').val());
    var year = parseInt($('.js-select-year').val());
    var date = new Date();
    date.setFullYear(year, month, day);
    return date;
}
function getUpcomingBirthdays(date) {
    var birthdays = [];
    planets.forEach(function (planet) {
        birthdays.push(planet.getNextBirthday(date));
    });
    birthdays.sort(function (a, b) {
        return a.date.getTime() - b.date.getTime();
    });
    return birthdays;
}
$(function () {
    setInitialDate();
    $('.js-submit-button').on('click', function () {
        var date = getSelectedDate();
        getUpcomingBirthdays(date).forEach(function (birthday) {
            console.log(birthday.location.name, birthday.date);
        });
    });
});
