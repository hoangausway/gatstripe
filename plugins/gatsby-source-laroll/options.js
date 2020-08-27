const spreads = {
  mayo: 'Mayo, MAYO',
  pate: 'Pate, PATE'
}

const vegs = {
  lettuce: 'Lettuce, LETT',
  carrot: 'Carrot, CARR',
  cucumber: 'Cucumber, CUCU',
  onion: 'Red onion, ONIO',
  coriander: 'Coriander, CORI',
  chilli: 'Chilli, CHIL',
  cheese: 'Cheese, CHEE',
  mix: 'Mixed salad, MIXS'
}

const sauces = {
  hoisin: 'Hoisin Sauce, HOIS',
  soy: 'Soy Sauce, SOYS',
  fish: 'Fish Sauce, FISH',
  whitemayo: 'White Mayo, WHIT',
  bbq: 'BBQ Sauce, BBQS',
  sriracha: 'Sriracha, SRIR',
  sweet: 'Sweet Chilli, SWEE',
  sp: 'Salt Pepper, SALP'
}

const sugar = {
  none: 'None, SUG0',
  one: 'One, SUG1',
  two: 'Two, SUG2',
  three: 'Three, SUG3',
  four: 'Four, SUG4'
}

const milk = {
  none: 'None, MLK0',
  full: 'Full cream, MLKF',
  skinny: 'Skinny, MLKS'
}

const serve = {
  sep: 'Pack soup separately, SEPA',
  chop: 'Chopped, CHOP'
}

// Final structure for options
const opts = {
  banhmi: {
    SPREAD: [[spreads.mayo, spreads.pate], []],
    VEGGIE: [
      [
        vegs.lettuce,
        vegs.carrot,
        vegs.cucumber,
        vegs.onion,
        vegs.coriander,
        vegs.chilli
      ],
      [vegs.cheese]
    ],
    SAUCE: [
      [sauces.hoisin, sauces.soy],
      [sauces.whitemayo, sauces.bbq, sauces.sriracha, sauces.sp]
    ]
  },
  baconeggs: {
    SPREAD: [[spreads.mayo], [spreads.pate]],
    VEGGIE: [[], [vegs.cheese]],
    SAUCE: [
      [sauces.bbq],
      [sauces.hoisin, sauces.soy, sauces.whitemayo, sauces.sriracha, sauces.sp]
    ]
  },
  banhmiveg: {
    SPREAD: [[], [spreads.mayo]],
    VEGGIE: [
      [
        vegs.lettuce,
        vegs.carrot,
        vegs.cucumber,
        vegs.onion,
        vegs.coriander,
        vegs.chilli
      ],
      [vegs.cheese]
    ],
    SAUCE: [
      [sauces.soy],
      [sauces.hoisin, sauces.whitemayo, sauces.bbq, sauces.sriracha, sauces.sp]
    ]
  },
  rpr: {
    SAUCE: [[sauces.hoisin], [sauces.fish, sauces.soy, sauces.sweet]]
  },
  laboon: {
    VEGGIE: [
      [vegs.mix, vegs.onion, vegs.chilli],
      [vegs.lettuce, vegs.carrot, vegs.cucumber, vegs.coriander]
    ],
    SAUCE: [[sauces.fish], [sauces.hoisin, sauces.soy, sauces.sriracha]]
  },
  lasalad: {
    VEGGIE: [
      [vegs.mix, vegs.onion, vegs.chilli],
      [vegs.lettuce, vegs.carrot, vegs.cucumber, vegs.coriander]
    ],
    SAUCE: [[sauces.fish], [sauces.hoisin, sauces.soy, sauces.sriracha]]
  },
  lapho: {
    SERVE: [[], [serve.sep]]
  },
  friedrice: {
    VEGGIE: [
      [],
      [
        vegs.mix,
        vegs.chilli,
        vegs.lettuce,
        vegs.carrot,
        vegs.cucumber,
        vegs.onion,
        vegs.coriander
      ]
    ],
    SAUCE: [[sauces.soy], [sauces.sriracha]]
  },
  steamedrice: {
    VEGGIE: [
      [],
      [
        vegs.mix,
        vegs.chilli,
        vegs.lettuce,
        vegs.carrot,
        vegs.cucumber,
        vegs.onion,
        vegs.coriander
      ]
    ],
    SAUCE: [[sauces.soy], [sauces.sriracha]]
  },
  meat: {
    SAUCE: [
      [sauces.soy],
      [sauces.hoisin, sauces.bbq, sauces.whitemayo, sauces.sriracha]
    ],
    SERVE: [[], [serve.chop]]
  },
  sides: {
    SAUCE: [[], [sauces.sweet, sauces.soy, sauces.sriracha]]
  },
  coffeeb: {
    SUGAR: [[sugar.none], [sugar.one, sugar.two, sugar.three, sugar.four]]
  },
  coffee: {
    MILK: [[milk.full], [milk.skinny]],
    SUGAR: [[sugar.none], [sugar.one, sugar.two, sugar.three, sugar.four]]
  }
}

export default opts
