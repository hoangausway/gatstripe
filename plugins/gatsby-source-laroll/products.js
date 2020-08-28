// This file is also used for lamda netlify functions.
const opts = require('./options')

const exnames = {
  none: 'NONE',
  crispy: 'CRISPY PORK',
  pork: 'BBQ Pork',
  chicken: 'BBQ Chicken',
  ball: 'MEAT Balls',
  tofu: 'TOFU',
  sprr: 'SPRING Rolls',
  hoisin: 'Hoisin Sauce',
  fish: 'Fish Sauce',
  soy: 'Soy Sauce',
  sweet: 'Sweet Chilli',
  sizes: 'Small',
  sizem: 'Medium',
  sizel: 'Large'
}

const exprices = {
  zero: 0,
  c50: 50,
  c100: 100,
  c150: 150,
  c200: 200,
  c300: 300,
  c400: 400,
  c500: 500
}

const exitems = {
  meat_crispy_c200: {
    name: exnames.crispy,
    unit_label: 'ea',
    description: exnames.crispy,
    price: exprices.c200
  },
  meat_chicken_c200: {
    name: exnames.chicken,
    unit_label: 'ea',
    description: exnames.chicken,
    price: exprices.c200
  },
  meat_pork_c200: {
    name: exnames.pork,
    unit_label: 'ea',
    description: exnames.pork,
    price: exprices.c200
  },
  meat_ball_c200: {
    name: exnames.ball,
    unit_label: 'ea',
    description: exnames.ball,
    price: exprices.c200
  },
  veg_tofu_c200: {
    name: exnames.tofu,
    unit_label: 'ea',
    description: exnames.tofu,
    price: exprices.c200
  },
  sauce_hoisin_c50: {
    name: exnames.hoisin,
    unit_label: 'ea',
    description: exnames.hoisin,
    price: exprices.c50
  },
  sauce_fish_c50: {
    name: exnames.fish,
    unit_label: 'ea',
    description: exnames.fish,
    price: exprices.c50
  },
  sauce_soy_c50: {
    name: exnames.soy,
    unit_label: 'ea',
    description: exnames.soy,
    price: exprices.c50
  },
  sauce_sweet_c50: {
    name: exnames.sweet,
    unit_label: 'ea',
    description: exnames.sweet,
    price: exprices.c50
  },
  meat_crispy_c300: {
    name: exnames.crispy,
    unit_label: 'ea',
    description: exnames.crispy,
    price: exprices.c300
  },
  meat_chicken_c300: {
    name: exnames.chicken,
    unit_label: 'ea',
    description: exnames.chicken,
    price: exprices.c300
  },
  meat_pork_c300: {
    name: exnames.pork,
    unit_label: 'ea',
    description: exnames.pork,
    price: exprices.c300
  },
  meat_ball_c300: {
    name: exnames.ball,
    unit_label: 'ea',
    description: exnames.ball,
    price: exprices.c300
  },
  veg_tofu_c300: {
    name: exnames.tofu,
    unit_label: 'ea',
    description: exnames.tofu,
    price: exprices.c300
  },
  side_sprr_c300: {
    name: exnames.sprr,
    unit_label: 'ea',
    description: exnames.sprr,
    price: exprices.c300
  }
}

const extras = {
  none: [],
  banhmi: [
    'meat_crispy_c200', // name from exitems object
    'meat_cchicken_c200',
    'meat_pork_c200',
    'meat_ball_c200',
    'veg_tofu_c200'
  ],
  rpr: [
    'sauce_hoisin_c50',
    'sauce_fish_c50',
    'sauce_soy_c50',
    'sauce_sweet_c50'
  ],
  laboon: [
    'meat_crispy_c300',
    'meat_chicken_c300',
    'meat_pork_c300',
    'meat_ball_c300',
    'veg_tofu_c300',
    'side_sprr_c300'
  ],
  lasalad: [
    'meat_crispy_c300',
    'meat_chicken_c300',
    'meat_pork_c300',
    'meat_ball_c300',
    'veg_tofu_c300',
    'side_sprr_c300'
  ],
  lapho: [
    'meat_crispy_c300',
    'meat_chicken_c300',
    'meat_pork_c300',
    'veg_tofu_c300'
  ],
  friedrice: [
    'meat_crispy_c300',
    'meat_chicken_c300',
    'meat_pork_c300',
    'meat_ball_c300',
    'veg_tofu_c300',
    'side_sprr_c300'
  ],
  steamedrice: [
    'meat_crispy_c300',
    'meat_chicken_c300',
    'meat_pork_c300',
    'meat_ball_c300',
    'veg_tofu_c300',
    'side_sprr_c300'
  ]
}

const gst = {
  zero: '0.00',
  ten: '10.00'
}

const cats = {
  banhmi: 'BANH MI',
  rpr: 'RICE PAPER ROLL',
  laboon: 'LABOON',
  lasalad: 'LASALAD',
  lapho: 'LAPHO',
  friedrice: 'FRIED RICE',
  steamedrice: 'STEAMED RICE',
  meat: 'ROASTED MEAT',
  sides: 'SIDES',
  coffee: 'COFFEE',
  drink: 'DRINK',
  milk: 'MILK',
  combo: 'COMBO'
}

const items = [
  {
    price: 890,
    unit_label: 'ea',
    name: 'BANH MI CRISPY Pork',
    description: 'BANH MI CRISPY Pork',
    tags: 'banh mi, banmi, ban mi, banhmi, crispy pork, roasted pork belly',
    category: cats.banhmi,
    gst: gst.ten,
    options: opts.banhmi,
    extras: 'banhmi' // group name from extras object
  },

  {
    price: 850,
    unit_label: 'ea',
    name: 'BANH MI BBQ Pork',
    description: 'BANH MI BBQ Pork',
    tags: 'banh mi, banmi, ban mi, banhmi, pork, bbq pork',
    category: cats.banhmi,
    gst: gst.ten,
    options: opts.banhmi,
    extras: 'banhmi'
  },

  {
    price: 790,
    unit_label: 'ea',
    name: 'BANH MI BBQ Chicken',
    description: 'BANH MI BBQ Chicken',
    tags: 'banh mi, banmi, ban mi, banhmi, chicken, bbq chicken',
    category: cats.banhmi,
    gst: gst.ten,
    options: opts.banhmi,
    extras: 'banhmi'
  },

  {
    price: 850,
    unit_label: 'ea',
    name: 'BANH MI MEAT Balls',
    description: 'BANH MI MEAT Balls',
    tags: 'banh mi, banmi, ban mi, banhmi, meat balls',
    category: cats.banhmi,
    gst: gst.ten,
    options: opts.banhmi,
    extras: 'banhmi'
  },

  {
    price: 790,
    unit_label: 'ea',
    name: 'BANH MI TOFU',
    description: 'BANH MI TOFU',
    tags: 'banh mi, banmi, ban mi, banhmi, vegetarian, tofu',
    category: cats.banhmi,
    gst: gst.ten,
    options: opts.banhmi,
    extras: 'banhmi'
  },

  {
    price: 650,
    unit_label: 'ea',
    name: 'BANH MI VEGGIES',
    description: 'BANH MI VEGGIES',
    tags: 'banh mi, banmi, ban mi, banhmi, veggie, vegetarian',
    category: cats.banhmi,
    gst: gst.zero,
    options: opts.banhmiveg,
    extras: 'none'
  },

  {
    price: 790,
    unit_label: 'ea',
    name: 'BANH MI BACON & Eggs',
    tags: 'banh mi, banmi, ban mi, banhmi, bacon, egg',
    description: 'BANH MI BACON & Eggs',
    category: cats.banhmi,
    gst: gst.ten,
    options: opts.baconeggs,
    extras: 'none'
  },

  {
    price: 100,
    unit_label: 'ea',
    name: 'BANH MI PLAIN Roll',
    description: 'BANH MI PLAIN Roll',
    tags: 'banh mi, banmi, ban mi, banhmi, plain, roll',
    category: cats.banhmi,
    gst: gst.zero,
    options: null,
    extras: 'none'
  },

  {
    price: 590,
    unit_label: 'ea',
    name: 'RPR CRISPY Pork',
    description: 'RPR CRISPY Pork',
    tags: 'rpr, rice paper roll, crispy, roasted pork belly',
    category: cats.rpr,
    gst: gst.zero,
    options: opts.rpr,
    extras: 'rpr'
  },

  {
    price: 590,
    unit_label: 'ea',
    name: 'RPR BBQ Chicken',
    description: 'RPR BBQ Chicken',
    tags: 'rpr, rice paper roll, bbq chicken',
    category: cats.rpr,
    gst: gst.zero,
    options: opts.rpr,
    extras: 'rpr'
  },

  {
    price: 690,
    unit_label: 'ea',
    name: 'RPR PRAWN',
    description: 'RPR PRAWN',
    tags: 'rpr, rice paper roll, prawn',
    category: cats.rpr,
    gst: gst.zero,
    options: opts.rpr,
    extras: 'rpr'
  },

  {
    price: 590,
    unit_label: 'ea',
    name: 'RPR TOFU',
    description: 'RPR TOFU',
    tags: 'rpr, rice paper roll, tofu',
    category: cats.rpr,
    gst: gst.zero,
    options: opts.rpr,
    extras: 'rpr'
  },

  {
    price: 590,
    unit_label: 'ea',
    name: 'RPR VEGGIE',
    description: 'RPR VEGGIE',
    tags: 'rpr, rice paper roll, veggie, vegetarian',
    category: cats.rpr,
    gst: gst.zero,
    options: opts.rpr,
    extras: 'rpr'
  },

  {
    price: 1090,
    unit_label: 'ea',
    name: 'LABOON CRISPY Pork',
    description: 'LABOON CRISPY Pork',
    tags: 'laboon, boon, rice noodle, crispy pork',
    category: cats.laboon,
    gst: gst.ten,
    options: opts.laboon,
    extras: 'laboon'
  },

  {
    price: 1050,
    unit_label: 'ea',
    name: 'LABOON BBQ Pork',
    description: 'LABOON BBQ Pork',
    tags: 'laboon, boon, rice noodle, bbq pork',
    category: cats.laboon,
    gst: gst.ten,
    options: opts.laboon,
    extras: 'laboon'
  },

  {
    price: 1050,
    unit_label: 'ea',
    name: 'LABOON BBQ Chicken',
    description: 'LABOON BBQ Chicken',
    tags: 'laboon, boon, rice noodle, bbq chicken',
    category: cats.laboon,
    gst: gst.ten,
    options: opts.laboon,
    extras: 'laboon'
  },

  {
    price: 1050,
    unit_label: 'ea',
    name: 'LABOON MEAT Balls',
    description: 'LABOON MEAT Balls',
    tags: 'laboon, boon, rice noodle, meat balls',
    category: cats.laboon,
    gst: gst.ten,
    options: opts.laboon,
    extras: 'laboon'
  },

  {
    price: 1050,
    unit_label: 'ea',
    name: 'LABOON SPRING Rolls',
    description: 'LABOON SPRING Rolls',
    tags: 'laboon, boon, rice noodle, spring rolls',
    category: cats.laboon,
    gst: gst.ten,
    options: opts.laboon,
    extras: 'laboon'
  },

  {
    price: 1050,
    unit_label: 'ea',
    name: 'LABOON TOFU',
    description: 'LABOON TOFU',
    tags: 'laboon, boon, rice noodle, tofu, vegetarian',
    category: cats.laboon,
    gst: gst.ten,
    options: opts.laboon,
    extras: 'laboon'
  },

  {
    price: 950,
    unit_label: 'ea',
    name: 'LABOON VEGGIE',
    description: 'LABOON VEGGIE',
    tags: 'laboon, boon, rice noodle, veggie, vegetarian',
    category: cats.laboon,
    gst: gst.ten,
    options: opts.laboon,
    extras: 'none'
  },

  {
    price: 990,
    unit_label: 'ea',
    name: 'LASALAD CRISPY Pork',
    description: 'LASALAD CRISPY Pork',
    tags: 'lasalad, salad, crispy pork',
    category: cats.lasalad,
    gst: gst.ten,
    options: opts.lasalad,
    extras: 'lasalad'
  },

  {
    price: 990,
    unit_label: 'ea',
    name: 'LASALAD BBQ Pork',
    description: 'LASALAD BBQ Pork',
    tags: 'lasalad, salad, bbq pork',
    category: cats.lasalad,
    gst: gst.ten,
    options: opts.lasalad,
    extras: 'lasalad'
  },

  {
    price: 990,
    unit_label: 'ea',
    name: 'LASALAD BBQ Chicken',
    description: 'LASALAD BBQ Chicken',
    tags: 'lasalad, salad, bbq chicken',
    category: cats.lasalad,
    gst: gst.ten,
    options: opts.lasalad,
    extras: 'lasalad'
  },

  {
    price: 990,
    unit_label: 'ea',
    name: 'LASALAD MEAT Balls',
    description: 'LASALAD MEAT Balls',
    tags: 'lasalad, salad, meat balls',
    category: cats.lasalad,
    gst: gst.ten,
    options: opts.lasalad,
    extras: 'lasalad'
  },

  {
    price: 990,
    unit_label: 'ea',
    name: 'LASALAD SPRING Rolls',
    description: 'LASALAD SPRING Rolls',
    tags: 'lasalad, salad, spring rolls',
    category: cats.lasalad,
    gst: gst.ten,
    options: opts.lasalad,
    extras: 'lasalad'
  },

  {
    price: 990,
    unit_label: 'ea',
    name: 'LASALAD TOFU',
    description: 'LASALAD TOFU',
    tags: 'lasalad, salad, tofu, vegetarian',
    category: cats.lasalad,
    gst: gst.ten,
    options: opts.lasalad,
    extras: 'lasalad'
  },

  {
    price: 690,
    unit_label: 'ea',
    name: 'LASALAD VEGGIE',
    description: 'LASALAD VEGGIE',
    tags: 'lasalad, salad, veggie, vegetarian',
    category: cats.lasalad,
    gst: gst.ten,
    options: opts.lasalad,
    extras: 'lasalad'
  },

  {
    price: 1090,
    unit_label: 'ea',
    name: 'LAPHO CRISPY Pork',
    description: 'LAPHO CRISPY Pork',
    tags: 'lapho, pho, rice noodle, soup, crispy pork',
    category: cats.lapho,
    gst: gst.ten,
    options: opts.lapho,
    extras: 'lapho'
  },

  {
    price: 1050,
    unit_label: 'ea',
    name: 'LAPHO BBQ Pork',
    description: 'LAPHO BBQ Pork',
    tags: 'lapho, pho, rice noodle, soup, bbq pork',
    category: cats.lapho,
    gst: gst.ten,
    options: opts.lapho,
    extras: 'lapho'
  },

  {
    price: 1050,
    unit_label: 'ea',
    name: 'LAPHO BBQ Chicken',
    description: 'LAPHO BBQ Chicken',
    tags: 'lapho, pho, rice noodle, soup, bbq chicken',
    category: cats.lapho,
    gst: gst.ten,
    options: opts.lapho,
    extras: 'lapho'
  },

  {
    price: 1050,
    unit_label: 'ea',
    name: 'LAPHO MEAT Balls',
    description: 'LAPHO MEAT Balls',
    tags: 'lapho, pho, rice noodle, soup, meat balls',
    category: cats.lapho,
    gst: gst.ten,
    options: opts.lapho,
    extras: 'lapho'
  },

  {
    price: 1050,
    unit_label: 'ea',
    name: 'LAPHO TOFU',
    description: 'LAPHO TOFU',
    tags: 'lapho, pho, rice noodle, soup, tofu, vegetarian',
    category: cats.lapho,
    gst: gst.ten,
    options: opts.lapho,
    extras: 'lapho'
  },

  {
    price: 1050,
    unit_label: 'ea',
    name: 'LAPHO VEGGIE',
    description: 'LAPHO VEGGIE',
    tags: 'lapho, pho, rice noodle, soup, veggie, vegetarian',
    category: cats.lapho,
    gst: gst.ten,
    options: opts.lapho,
    extras: 'none'
  },

  {
    price: 950,
    unit_label: 'ea',
    name: 'FRIED RICE',
    description: 'FRIED RICE',
    tags: 'fried rice, prawn, pork',
    category: cats.friedrice,
    gst: gst.ten,
    options: opts.friedrice,
    extras: 'friedrice'
  },

  {
    price: 1050,
    unit_label: 'ea',
    name: 'STEAMED RICE CRISPY Pork',
    description: 'STEAMED RICE CRISPY Pork',
    tags: 'steamed rice, pork, crispy pork',
    category: cats.steamedrice,
    gst: gst.ten,
    options: opts.steamedrice,
    extras: 'steamedrice'
  },

  {
    price: 990,
    unit_label: 'ea',
    name: 'STEAMED RICE BBQ Pork',
    description: 'STEAMED RICE BBQ Pork',
    tags: 'steamed rice, pork, bbq pork',
    category: cats.steamedrice,
    gst: gst.ten,
    options: opts.steamedrice,
    extras: 'steamedrice'
  },

  {
    price: 990,
    unit_label: 'ea',
    name: 'STEAMED RICE BBQ Chicken',
    description: 'STEAMED RICE BBQ Chicken',
    tags: 'steamed rice, chicken, bbq chicken',
    category: cats.steamedrice,
    gst: gst.ten,
    options: opts.steamedrice,
    extras: 'steamedrice'
  },

  {
    price: 990,
    unit_label: 'ea',
    name: 'STEAMED RICE MEAT Balls',
    description: 'STEAMED RICE MEAT Balls',
    tags: 'steamed rice, pork, meat balls',
    category: cats.steamedrice,
    gst: gst.ten,
    options: opts.steamedrice,
    extras: 'steamedrice'
  },

  {
    price: 990,
    unit_label: 'ea',
    name: 'STEAMED RICE TOFU',
    description: 'STEAMED RICE TOFU',
    tags: 'steamed rice, tofu, vegetarian',
    category: cats.steamedrice,
    gst: gst.ten,
    options: opts.steamedrice,
    extras: 'steamedrice'
  },

  {
    price: 160,
    unit_label: 'ea',
    name: 'SIDE SPRING Roll',
    description: 'SIDE SPRING Roll',
    tags: 'side, spring roll, chicken',
    category: cats.sides,
    gst: gst.ten,
    options: opts.sides,
    extras: 'none'
  },

  {
    price: 300,
    unit_label: 'ea',
    name: 'SIDE CHICKEN Wings',
    description: 'SIDE CHICKEN Wings',
    tags: 'side, chicken wing, chicken',
    category: cats.sides,
    gst: gst.ten,
    options: opts.sides,
    extras: 'none'
  },

  {
    price: 160,
    unit_label: 'ea',
    name: 'SIDE MEAT Ball',
    description: 'SIDE MEAT Ball',
    tags: 'side, meat ball, pork',
    category: cats.sides,
    gst: gst.ten,
    options: opts.sides,
    extras: 'none'
  },

  {
    price: 350,
    unit_label: '100gr',
    name: 'MEAT CRISPY Pork',
    description: 'MEAT CRISPY Pork',
    tags: 'roasted meat, crispy pork, roasted pork belly, pork',
    category: cats.meat,
    gst: gst.ten,
    options: opts.meat,
    extras: 'none'
  },

  {
    unit_label: 'piece',
    price: 500,
    name: 'MEAT BBQ Pork',
    description: 'MEAT BBQ Pork',
    tags: 'roasted meat, pork, bbq pork',
    category: cats.meat,
    gst: gst.ten,
    options: opts.meat,
    extras: 'none'
  },

  {
    price: 500,
    unit_label: 'piece',
    name: 'MEAT BBQ Chicken',
    description: 'MEAT BBQ Chicken',
    tags: 'roasted meat, chicken, bbq chicken',
    category: cats.meat,
    gst: gst.ten,
    options: opts.meat,
    extras: 'none'
  },

  {
    price: 400,
    unit_label: 'ea',
    name: 'COFFEE ESPRESSO',
    description: 'COFFEE ESPRESSO',
    tags: 'coffee, espresso, long black',
    category: cats.coffee,
    gst: gst.ten,
    options: opts.coffeeb,
    extras: 'none'
  },

  {
    price: 400,
    unit_label: 'ea',
    name: 'COFFEE CAPPUCCINO',
    description: 'COFFEE CAPPUCCINO',
    tags: 'coffee, cappuccino',
    category: cats.coffee,
    gst: gst.ten,
    options: opts.coffee,
    extras: 'none'
  },

  {
    price: 400,
    unit_label: 'ea',
    name: 'COFFEE LATE',
    description: 'COFFEE LATE',
    tags: 'coffee, late',
    category: cats.coffee,
    gst: gst.ten,
    options: opts.coffee,
    extras: 'none'
  },

  {
    price: 400,
    unit_label: 'ea',
    name: 'COFFEE FLAT White',
    description: 'COFFEE FLAT White',
    tags: 'coffee, flat white',
    category: cats.coffee,
    gst: gst.ten,
    options: opts.coffee,
    extras: 'none'
  },

  {
    price: 400,
    unit_label: 'ea',
    name: 'COFFEE MOCHA',
    description: 'COFFEE MOCHA',
    tags: 'coffee, mocha',
    category: cats.coffee,
    gst: gst.ten,
    options: opts.coffee,
    extras: 'none'
  },

  {
    price: 400,
    unit_label: 'ea',
    name: 'COFFEE MACCHIATO',
    description: 'COFFEE MACCHIATO',
    tags: 'coffee, macchiato',
    category: cats.coffee,
    gst: gst.ten,
    options: opts.coffee,
    extras: 'none'
  },

  {
    price: 400,
    unit_label: 'ea',
    name: 'HOT CHOCOLATE',
    description: 'HOT CHOCOLATE',
    tags: 'coffee, hot chocolate',
    category: cats.coffee,
    gst: gst.ten,
    options: opts.coffee,
    extras: 'none'
  },

  {
    price: 400,
    unit_label: 'ea',
    name: 'COFFEE VIET',
    description: 'COFFEE VIET',
    tags: 'coffee, viet, iced coffee, condensed milk',
    category: cats.coffee,
    gst: gst.ten,
    options: null,
    extras: 'none'
  },

  {
    price: 300,
    unit_label: 'ea',
    name: 'MILK PURA 2L BOT',
    description: 'MILK PURA 2L BOT',
    tags: 'milk, bottle',
    category: cats.milk,
    gst: gst.zero,
    options: null,
    extras: 'none'
  },

  {
    price: 300,
    unit_label: 'ea',
    name: 'MILK PURA Light 2L BOT',
    description: 'MILK PURA Light 2L BOT',
    tags: 'milk, bottle, light, skinny',
    category: cats.milk,
    gst: gst.zero,
    options: null,
    extras: 'none'
  },

  {
    price: 200,
    unit_label: 'ea',
    name: 'WATER FRANKLING 600 PET',
    description: 'FRANKLING 600 PET',
    tags: 'drink, coca-cola, water',
    category: cats.drink,
    gst: gst.zero,
    options: null,
    extras: 'none'
  },

  {
    price: 200,
    unit_label: 'ea',
    name: 'COKE CLASSIC 375 CAN',
    description: 'COKE CLASSIC 375 CAN',
    tags: 'drink, coca-cola',
    category: cats.drink,
    gst: gst.ten,
    options: null,
    extras: 'none'
  },

  {
    price: 200,
    unit_label: 'ea',
    name: 'COKE DIET 375 CAN',
    description: 'COKE DIET 375 CAN',
    tags: 'drink, coca-cola',
    category: cats.drink,
    gst: gst.ten,
    options: null,
    extras: 'none'
  },

  {
    price: 400,
    unit_label: 'ea',
    name: 'COKE 385 BOT',
    description: 'COKE 385 BOT',
    tags: 'drink, coca-cola',
    category: cats.drink,
    gst: gst.ten,
    options: null,
    extras: 'none'
  },

  {
    price: 400,
    unit_label: 'ea',
    name: 'COKE 600 PET',
    description: 'COKE 600 PET',
    tags: 'drink, coca-cola',
    category: cats.drink,
    gst: gst.ten,
    options: null,
    extras: 'none'
  },

  {
    price: 400,
    unit_label: 'ea',
    name: 'V ROCKSTAR Guava 500',
    description: 'V ROCKSTAR Guava 500',
    tags: 'drink, v-drink',
    category: cats.drink,
    gst: gst.ten,
    options: null,
    extras: 'none'
  },

  {
    price: 280,
    unit_label: 'ea',
    name: 'V BLUE 250 CAN',
    description: 'V BLUE 250 CAN',
    tags: 'drink, v-drink',
    category: cats.drink,
    gst: gst.ten,
    options: null,
    extras: 'none'
  },

  {
    price: 280,
    unit_label: 'ea',
    name: 'V GREEN 250 CAN',
    description: 'V GREEN 250 CAN',
    tags: 'drink, v-drink',
    category: cats.drink,
    gst: gst.ten,
    options: null,
    extras: 'none'
  },

  {
    price: 400,
    unit_label: 'ea',
    name: 'ORANGE Juice',
    description: 'ORANGE Juice',
    tags: 'drink, fresh, orange juice',
    category: cats.drink,
    gst: gst.ten,
    options: null,
    extras: 'none'
  }
]

module.exports = {
  exitems,
  extras,
  items
}
