class Orbiter {
  name: string;
  period: number;

  constructor(name: string, period: number) {
    this.name = name;
    this.period = period * 24 * 60 * 60 * 1000;
  }

  getAge(date: Date): number {
    var time = Date.now() - date.getTime();
    return Math.floor(time / this.period);
  }

  getNextBirthday(date: Date): Date {
    var age = this.getAge(date);
    var birthday = this.period * (age + 1);
    return new Birthday(this, new Date(date.getTime() + birthday));
  }
}

class Birthday {
  location: Orbiter;
  date: Date;

  constructor(location: Orbiter, date: Date) {
    this.location = location;
    this.date = date;
  }
}

class Planet extends Orbiter {
  moons: Moon[];

  constructor(name: string, period: number) {
    super(name, period);

    this.moons = [];
  }

  addMoon(name: string, period: number): Planet {
    this.moons.push(new Moon(name, period, this));
    return this;
  }
}

class Moon extends Orbiter {
  planet: Planet;

  constructor(name: string, period: number, planet: Planet) {
    super(name, period);
    this.planet = planet;
  }
}

var planets = [];

planets.push(new Planet('Mercury', 87.9691));
planets.push(new Planet('Venus',   224.701));
planets.push(new Planet('Earth',   365.256363004)
  .addMoon('Moon',      27.321582));
planets.push(new Planet('Mars',    686.971)
  .addMoon('Phobos',    0.31891023)
  .addMoon('Deimos',    1.263));
planets.push(new Planet('Jupiter', 4332.59)
  .addMoon('Io',        1.7691)
  .addMoon('Europa',    3.5512)
  .addMoon('Ganymede',  7.1546)
  .addMoon('Callisto',  16.689));
planets.push(new Planet('Saturn',  10759.22)
  .addMoon('Mimas',     0.942)
  .addMoon('Enceladus', 1.370218)
  .addMoon('Tethys',    1.887802)
  .addMoon('Dione',     2.736915)
  .addMoon('Rhea',      4.518212)
  .addMoon('Titan',     15.945)
  .addMoon('Iapetus',   79.3215));
planets.push(new Planet('Uranus',  30687.15)
  .addMoon('Miranda',   1.413479)
  .addMoon('Ariel',     2.52)
  .addMoon('Umbriel',   4.144)
  .addMoon('Titania',   8.706234)
  .addMoon('Oberon',    13.463234));
planets.push(new Planet('Neptune', 60190.03)
  .addMoon('Triton',    5.876854));

var $: any;

function setInitialDate(): void {
  var now = new Date();
  $('.js-select-day').val(now.getDate());
  $('.js-select-month').val(now.getMonth());
  $('.js-select-year').val(now.getFullYear() - 30);
}

function getSelectedDate(): Date {
  var day   = parseInt($('.js-select-day').val());
  var month = parseInt($('.js-select-month').val());
  var year  = parseInt($('.js-select-year').val());
  var date = new Date();
  date.setFullYear(year, month, day);
  return date;
}

function getUpcomingBirthdays(date: Date): Birthday[] {
  return planets.map(function(planet) {
    return planet.getNextBirthday(date);
  }).sort(function(birthday1, birthday2) {
    return birthday1.date.getTime() - birthday2.date.getTime();
  });
}

$(function() {
  setInitialDate();

  $('.js-submit-button').on('click', function() {
    var date = getSelectedDate();
    getUpcomingBirthdays(date).forEach(function(birthday) {
      console.log(birthday.location.name, birthday.date);
    });
  });
});
