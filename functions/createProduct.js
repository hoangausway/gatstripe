require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
  // 70 products
  const products = [
    {
      unit_label: 'EA',
      name: 'BANH MI CRISPY Pork',
      description: 'BANH MI CRISPY Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'BANH MI',
        TAGS: 'banh mi, crispy pork, roasted pork belly',
        SPREAD: 'Yellow Mayo, Pate',
        VEGGIE: 'Lettuce, Carrot, Cucumber, Onion, Coriander, Chilli, Cheese',
        SAUCE: 'Hoisin Sauce, Soy Sauce, Mayo, BBQ Sauce, Sriracha, S&P'
      },
      price: 890
    },

    {
      unit_label: 'EA',
      name: 'BANH MI BBQ Pork',
      description: 'BANH MI BBQ Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'BANH MI',
        TAGS: 'banh mi, bbq pork',
        SPREAD: 'Yellow Mayo, Pate',
        VEGGIE: 'Lettuce, Carrot, Cucumber, Onion, Coriander, Chilli, Cheese',
        SAUCE: 'Hoisin Sauce, Soy Sauce, Mayo, BBQ Sauce, Sriracha, S&P'
      },
      price: 850
    },

    {
      unit_label: 'EA',
      name: 'BANH MI BBQ Chicken',
      description: 'BANH MI BBQ Chicken',
      metadata: {
        GST: '10',
        CATEGORY: 'BANH MI',
        TAGS: 'banh mi, bbq chicken',
        SPREAD: 'Yellow Mayo, Pate',
        VEGGIE: 'Lettuce, Carrot, Cucumber, Onion, Coriander, Chilli, Cheese',
        SAUCE: 'Hoisin Sauce, Soy Sauce, Mayo, BBQ Sauce, Sriracha, S&P'
      },
      price: 790
    },

    {
      unit_label: 'EA',
      name: 'BANH MI MEAT Balls',
      description: 'BANH MI MEAT Balls',
      metadata: {
        GST: '10',
        CATEGORY: 'BANH MI',
        TAGS: 'banh mi, meat balls',
        SPREAD: 'Yellow Mayo, Pate',
        VEGGIE: 'Lettuce, Carrot, Cucumber, Onion, Coriander, Chilli, Cheese',
        SAUCE: 'Hoisin Sauce, Soy Sauce, Mayo, BBQ Sauce, Sriracha, S&P'
      },
      price: 850
    },

    {
      unit_label: 'EA',
      name: 'BANH MI TOFU',
      description: 'BANH MI TOFU',
      metadata: {
        GST: '10',
        CATEGORY: 'BANH MI',
        TAGS: 'banh mi, vegetarian, tofu',
        SPREAD: 'Yellow Mayo',
        VEGGIE: 'Lettuce, Carrot, Cucumber, Onion, Coriander, Chilli, Cheese',
        SAUCE: 'Hoisin Sauce, Soy Sauce, Mayo, BBQ Sauce, Sriracha, S&P'
      },
      price: 790
    },

    {
      unit_label: 'EA',
      name: 'BANH MI VEGGIES',
      description: 'BANH MI VEGGIES',
      metadata: {
        GST: '10',
        CATEGORY: 'BANH MI',
        TAGS: 'banh mi, veggie, vegetarian',
        SPREAD: 'Yellow Mayo',
        VEGGIE: 'Lettuce, Carrot, Cucumber, Onion, Coriander, Chilli, Cheese',
        SAUCE: 'Hoisin Sauce, Soy Sauce, Mayo, BBQ Sauce, Sriracha, S&P'
      },
      price: 650
    },

    {
      unit_label: 'EA',
      name: 'BANH MI BACON & Eggs',
      description: 'BANH MI BACON & Eggs',
      metadata: {
        GST: '10',
        CATEGORY: 'BANH MI',
        TAGS: 'banh mi, bacon, egg',
        SPREAD: 'Yellow Mayo',
        VEGGIE: 'Cheese',
        SAUCE: 'Hoisin Sauce, Soy Sauce, Mayo, BBQ Sauce, Sriracha, S&P'
      },
      price: 790
    },

    {
      unit_label: 'EA',
      name: 'BANH MI PLAIN Roll',
      description: 'BANH MI PLAIN Roll',
      metadata: {
        GST: '10',
        CATEGORY: 'BANH MI',
        TAGS: 'banh mi, plain, roll'
      },
      price: 100
    },

    {
      unit_label: 'EA',
      name: 'RPR CRISPY Pork',
      description: 'RPR CRISPY Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'RICE PAPER ROLL',
        TAGS: 'rice paper roll, crispy, roasted pork belly',
        SAUCE: 'Hoisin Sauce, Fish Sauce, Sweet Chilli'
      },
      price: 590
    },

    {
      unit_label: 'EA',
      name: 'RPR BBQ Chicken',
      description: 'RPR BBQ Chicken',
      metadata: {
        GST: '10',
        CATEGORY: 'RICE PAPER ROLL',
        TAGS: 'rice paper roll, bbq chicken',
        SAUCE: 'Hoisin Sauce, Fish Sauce, Sweet Chilli'
      },
      price: 590
    },

    {
      unit_label: 'EA',
      name: 'RPR PRAWN',
      description: 'RPR PRAWN',
      metadata: {
        GST: '10',
        CATEGORY: 'RICE PAPER ROLL',
        TAGS: 'rice paper roll, prawn',
        SAUCE: 'Hoisin Sauce, Fish Sauce, Sweet Chilli'
      },
      price: 690
    },

    {
      unit_label: 'EA',
      name: 'RPR TOFU',
      description: 'RPR TOFU',
      metadata: {
        GST: '10',
        CATEGORY: 'RICE PAPER ROLL',
        TAGS: 'rice paper roll, tofu',
        SAUCE: 'Hoisin Sauce, Fish Sauce, Sweet Chilli'
      },
      price: 590
    },

    {
      unit_label: 'EA',
      name: 'RPR VEGGIE',
      description: 'RPR VEGGIE',
      metadata: {
        GST: '10',
        CATEGORY: 'RICE PAPER ROLL',
        TAGS: 'rice paper roll, veggie',
        SAUCE: 'Hoisin Sauce, Fish Sauce, Sweet Chilli'
      },
      price: 590
    },

    {
      unit_label: 'EA',
      name: 'LABOON CRISPY Pork',
      description: 'LABOON CRISPY Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'LABOON',
        TAGS: 'laboon, rice noodle, crispy pork',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 1090
    },

    {
      unit_label: 'EA',
      name: 'LABOON BBQ Pork',
      description: 'LABOON BBQ Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'LABOON',
        TAGS: 'laboon, rice noodle, bbq pork',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 1050
    },

    {
      unit_label: 'EA',
      name: 'LABOON BBQ Chicken',
      description: 'LABOON BBQ Chicken',
      metadata: {
        GST: '10',
        CATEGORY: 'LABOON',
        TAGS: 'laboon, rice noodle, bbq chicken',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 1050
    },

    {
      unit_label: 'EA',
      name: 'LABOON MEAT Balls',
      description: 'LABOON MEAT Balls',
      metadata: {
        GST: '10',
        CATEGORY: 'LABOON',
        TAGS: 'laboon, rice noodle, meat balls',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 1050
    },

    {
      unit_label: 'EA',
      name: 'LABOON SPRING Rolls',
      description: 'LABOON SPRING Rolls',
      metadata: {
        GST: '10',
        CATEGORY: 'LABOON',
        TAGS: 'laboon, rice noodle, spring rolls',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 1050
    },

    {
      unit_label: 'EA',
      name: 'LABOON TOFU',
      description: 'LABOON TOFU',
      metadata: {
        GST: '10',
        CATEGORY: 'LABOON',
        TAGS: 'laboon, rice noodle, tofu, vegetarian',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 1050
    },

    {
      unit_label: 'EA',
      name: 'LABOON VEGGIE',
      description: 'LABOON VEGGIE',
      metadata: {
        GST: '10',
        CATEGORY: 'LABOON',
        TAGS: 'laboon, rice noodle, veggie, vegetarian',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 950
    },

    {
      unit_label: 'EA',
      name: 'LASALAD CRISPY Pork',
      description: 'LASALAD CRISPY Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'LASALAD',
        TAGS: 'lasalad, salad, crispy pork',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 990
    },

    {
      unit_label: 'EA',
      name: 'LASALAD BBQ Pork',
      description: 'LASALAD BBQ Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'LASALAD',
        TAGS: 'lasalad, salad, bbq pork',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 990
    },

    {
      unit_label: 'EA',
      name: 'LASALAD BBQ Chicken',
      description: 'LASALAD BBQ Chicken',
      metadata: {
        GST: '10',
        CATEGORY: 'LASALAD',
        TAGS: 'lasalad, salad, bbq chicken',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 990
    },

    {
      unit_label: 'EA',
      name: 'LASALAD MEAT Balls',
      description: 'LASALAD MEAT Balls',
      metadata: {
        GST: '10',
        CATEGORY: 'LASALAD',
        TAGS: 'lasalad, salad, meat balls',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 990
    },

    {
      unit_label: 'EA',
      name: 'LASALAD SPRING Rolls',
      description: 'LASALAD SPRING Rolls',
      metadata: {
        GST: '10',
        CATEGORY: 'LASALAD',
        TAGS: 'lasalad, salad, spring rolls',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 990
    },

    {
      unit_label: 'EA',
      name: 'LASALAD TOFU',
      description: 'LASALAD TOFU',
      metadata: {
        GST: '10',
        CATEGORY: 'LASALAD',
        TAGS: 'lasalad, salad, tofu, vegetarian',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 990
    },

    {
      unit_label: 'EA',
      name: 'LASALAD VEGGIE',
      description: 'LASALAD VEGGIE',
      metadata: {
        GST: '10',
        CATEGORY: 'LASALAD',
        TAGS: 'lasalad, salad, veggie, vegetarian',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 690
    },

    {
      unit_label: 'EA',
      name: 'LAPHO CRISPY Pork',
      description: 'LAPHO CRISPY Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'LAPHO',
        TAGS: 'lapho, rice noodle, soup, crispy pork',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 1090
    },

    {
      unit_label: 'EA',
      name: 'LAPHO BBQ Pork',
      description: 'LAPHO BBQ Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'LAPHO',
        TAGS: 'lapho, rice noodle, soup, bbq pork',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 1050
    },

    {
      unit_label: 'EA',
      name: 'LAPHO BBQ Chicken',
      description: 'LAPHO BBQ Chicken',
      metadata: {
        GST: '10',
        CATEGORY: 'LAPHO',
        TAGS: 'lapho, rice noodle, soup, bbq chicken',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 1050
    },

    {
      unit_label: 'EA',
      name: 'LAPHO MEAT Balls',
      description: 'LAPHO MEAT Balls',
      metadata: {
        GST: '10',
        CATEGORY: 'LAPHO',
        TAGS: 'lapho, rice noodle, soup, meat balls',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 1050
    },

    {
      unit_label: 'EA',
      name: 'LAPHO TOFU',
      description: 'LAPHO TOFU',
      metadata: {
        GST: '10',
        CATEGORY: 'LAPHO',
        TAGS: 'lapho, rice noodle, soup, tofu, vegetarian',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 1050
    },

    {
      unit_label: 'EA',
      name: 'LAPHO VEGGIE',
      description: 'LAPHO VEGGIE',
      metadata: {
        GST: '10',
        CATEGORY: 'LAPHO',
        TAGS: 'lapho, rice noodle, soup, veggie, vegetarian',
        SAUCE: 'Hoisin Sauce, Fish Sauce'
      },
      price: 1050
    },

    {
      unit_label: 'EA',
      name: 'FRIED RICE',
      description: 'FRIED RICE',
      metadata: {
        GST: '10',
        CATEGORY: 'FRIED RICE',
        TAGS: 'fried rice, veggie, prawn, pork',
        SAUCE: 'Soy Sauce'
      },
      price: 950
    },

    {
      unit_label: 'EA',
      name: 'FRIED RICE CRISPY Pork',
      description: 'FRIED RICE CRISPY Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'FRIED RICE',
        TAGS: 'fried rice, veggie, prawn, pork, crispy pork',
        SAUCE: 'Soy Sauce'
      },
      price: 1250
    },

    {
      unit_label: 'EA',
      name: 'FRIED RICE BBQ Pork',
      description: 'FRIED RICE BBQ Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'FRIED RICE',
        TAGS: 'fried rice, veggie, prawn, pork, bbq pork',
        SAUCE: 'Soy Sauce'
      },
      price: 1250
    },

    {
      unit_label: 'EA',
      name: 'FRIED RICE BBQ Chicken',
      description: 'FRIED RICE BBQ Chicken',
      metadata: {
        GST: '10',
        CATEGORY: 'FRIED RICE',
        TAGS: 'fried rice, veggie, prawn, pork, bbq chicken',
        SAUCE: 'Soy Sauce'
      },
      price: 1250
    },

    {
      unit_label: 'EA',
      name: 'FRIED RICE MEAT Balls',
      description: 'FRIED RICE MEAT Balls',
      metadata: {
        GST: '10',
        CATEGORY: 'FRIED RICE',
        TAGS: 'fried rice, veggie, prawn, pork, meat balls',
        SAUCE: 'Soy Sauce'
      },
      price: 1250
    },

    {
      unit_label: 'EA',
      name: 'FRIED RICE TOFU',
      description: 'FRIED RICE TOFU',
      metadata: {
        GST: '10',
        CATEGORY: 'FRIED RICE',
        TAGS: 'fried rice, veggie, prawn, pork, tofu',
        SAUCE: 'Soy Sauce'
      },
      price: 1250
    },

    {
      unit_label: 'EA',
      name: 'STEAMED RICE',
      description: 'STEAMED RICE',
      metadata: { GST: '10', CATEGORY: 'STEAMED RICE', TAGS: 'steamed rice' },
      price: 500
    },

    {
      unit_label: 'EA',
      name: 'STEAMED RICE CRISPY Pork',
      description: 'STEAMED RICE CRISPY Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'STEAMED RICE',
        TAGS: 'steamed rice, pork, crispy pork',
        SAUCE: 'Soy Sauce'
      },
      price: 1050
    },

    {
      unit_label: 'EA',
      name: 'STEAMED RICE BBQ Pork',
      description: 'STEAMED RICE BBQ Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'STEAMED RICE',
        TAGS: 'steamed rice, pork, bbq pork',
        SAUCE: 'Soy Sauce'
      },
      price: 990
    },

    {
      unit_label: 'EA',
      name: 'STEAMED RICE BBQ Chicken',
      description: 'STEAMED RICE BBQ Chicken',
      metadata: {
        GST: '10',
        CATEGORY: 'STEAMED RICE',
        TAGS: 'steamed rice, pork, bbq chicken',
        SAUCE: 'Soy Sauce'
      },
      price: 990
    },

    {
      unit_label: 'EA',
      name: 'STEAMED RICE MEAT Balls',
      description: 'STEAMED RICE MEAT Balls',
      metadata: {
        GST: '10',
        CATEGORY: 'STEAMED RICE',
        TAGS: 'steamed rice, pork, meat balls',
        SAUCE: 'Soy Sauce'
      },
      price: 990
    },

    {
      unit_label: 'EA',
      name: 'STEAMED RICE TOFU',
      description: 'STEAMED RICE TOFU',
      metadata: {
        GST: '10',
        CATEGORY: 'STEAMED RICE',
        TAGS: 'steamed rice, pork, tofu',
        SAUCE: 'Soy Sauce'
      },
      price: 990
    },

    {
      unit_label: 'EA',
      name: 'SIDE SPRING Roll',
      description: 'SIDE SPRING Roll',
      metadata: {
        GST: '10',
        CATEGORY: 'SIDE',
        TAGS: 'side, spring roll, chicken',
        SAUCE: 'Sweet Chilli'
      },
      price: 160
    },

    {
      unit_label: 'EA',
      name: 'SIDE CHICKEN Wings',
      description: 'SIDE CHICKEN Wings',
      metadata: {
        GST: '10',
        CATEGORY: 'SIDE',
        TAGS: 'side, chicken wing, chicken',
        SAUCE: 'Sweet Chilli'
      },
      price: 300
    },

    {
      unit_label: 'EA',
      name: 'SIDE MEAT Ball',
      description: 'SIDE MEAT Ball',
      metadata: {
        GST: '10',
        CATEGORY: 'SIDE',
        TAGS: 'side, meat ball, pork',
        SAUCE: 'Sweet Chilli'
      },
      price: 160
    },

    {
      unit_label: '100gr',
      name: 'MEAT CRISPY Pork',
      description: 'MEAT CRISPY Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'MEAT',
        TAGS: 'cooked meat, crispy pork, roasted pork belly, pork',
        SAUCE: 'Hoisin Sauce, Soy Sauce, Mayo, BBQ Sauce, Sriracha'
      },
      price: 350
    },

    {
      unit_label: 'piece',
      name: 'MEAT BBQ Pork',
      description: 'MEAT BBQ Pork',
      metadata: {
        GST: '10',
        CATEGORY: 'MEAT',
        TAGS: 'cooked meat, bbq pork, pork',
        SAUCE: 'Hoisin Sauce, Soy Sauce, Mayo, BBQ Sauce, Sriracha'
      },
      price: 500
    },

    {
      unit_label: 'piece',
      name: 'MEAT BBQ Chicken',
      description: 'MEAT BBQ Chicken',
      metadata: {
        GST: '10',
        CATEGORY: 'MEAT',
        TAGS: 'cooked meat, bbq chicken, chicken',
        SAUCE: 'Hoisin Sauce, Soy Sauce, Mayo, BBQ Sauce, Sriracha'
      },
      price: 500
    },

    {
      unit_label: 'EA',
      name: 'COFFEE ESPRESSO',
      description: 'COFFEE ESPRESSO',
      metadata: {
        GST: '10',
        CATEGORY: 'COFFEE',
        TAGS: 'coffee, espresso, short black, long black',
        MILK: '',
        SUGAR: 'Zero, One, Two, Three, Four'
      },
      price: 400
    },

    {
      unit_label: 'EA',
      name: 'COFFEE CAPPUCCINO',
      description: 'COFFEE CAPPUCCINO',
      metadata: {
        GST: '10',
        CATEGORY: 'COFFEE',
        TAGS: 'coffee, cappuccino',
        MILK: 'Full Cream, Skinny',
        SUGAR: 'Zero, One, Two, Three, Four'
      },
      price: 400
    },

    {
      unit_label: 'EA',
      name: 'COFFEE LATE',
      description: 'COFFEE LATE',
      metadata: {
        GST: '10',
        CATEGORY: 'COFFEE',
        TAGS: 'coffee, late',
        MILK: 'Full Cream, Skinny',
        SUGAR: 'Zero, One, Two, Three, Four'
      },
      price: 400
    },

    {
      unit_label: 'EA',
      name: 'COFFEE FLAT White',
      description: 'COFFEE FLAT White',
      metadata: {
        GST: '10',
        CATEGORY: 'COFFEE',
        TAGS: 'coffee, flat white',
        MILK: 'Full Cream, Skinny',
        SUGAR: 'Zero, One, Two, Three, Four'
      },
      price: 400
    },

    {
      unit_label: 'EA',
      name: 'COFFEE MOCHA',
      description: 'COFFEE MOCHA',
      metadata: {
        GST: '10',
        CATEGORY: 'COFFEE',
        TAGS: 'coffee, mocha',
        MILK: 'Full Cream, Skinny',
        SUGAR: 'Zero, One, Two, Three, Four'
      },
      price: 400
    },

    {
      unit_label: 'EA',
      name: 'COFFEE MACCHIATO',
      description: 'COFFEE MACCHIATO',
      metadata: {
        GST: '10',
        CATEGORY: 'COFFEE',
        TAGS: 'coffee, macchiato',
        MILK: 'Full Cream, Skinny',
        SUGAR: 'Zero, One, Two, Three, Four'
      },
      price: 400
    },

    {
      unit_label: 'EA',
      name: 'HOT CHOCOLATE',
      description: 'HOT CHOCOLATE',
      metadata: {
        GST: '10',
        CATEGORY: 'COFFEE',
        TAGS: 'coffee, hot chocolate',
        MILK: 'Full Cream, Skinny',
        SUGAR: 'Zero, One, Two, Three, Four'
      },
      price: 400
    },

    {
      unit_label: 'EA',
      name: 'COFFEE VIET',
      description: 'COFFEE VIET',
      metadata: {
        GST: '10',
        CATEGORY: 'COFFEE',
        TAGS: 'coffee, viet, iced coffee, condensed milk'
      },
      price: 400
    },

    {
      unit_label: 'EA',
      name: 'MILK PURA 2L BOT',
      description: 'MILK PURA 2L BOT',
      metadata: { GST: '0', CATEGORY: 'MILK', TAGS: 'milk, bottle' },
      price: 300
    },

    {
      unit_label: 'EA',
      name: 'MILK PURA Light 2L BOT',
      description: 'MILK PURA Light 2L BOT',
      metadata: {
        GST: '0',
        CATEGORY: 'MILK',
        TAGS: 'milk, bottle, light, skinny'
      },
      price: 400
    },

    {
      unit_label: 'EA',
      name: 'WATER FRANKLING 600 PET',
      description: 'FRANKLING 600 PET',
      metadata: {
        GST: '0',
        CATEGORY: 'DRINK',
        TAGS: 'drink, coca-cola, water'
      },
      price: 200
    },

    {
      unit_label: 'EA',
      name: 'COKE CLASSIC 375 CAN',
      description: 'COKE CLASSIC 375 CAN',
      metadata: { GST: '10', CATEGORY: 'DRINK', TAGS: 'drink, coca-cola' },
      price: 200
    },

    {
      unit_label: 'EA',
      name: 'COKE DIET 375 CAN',
      description: 'COKE DIET 375 CAN',
      metadata: { GST: '10', CATEGORY: 'DRINK', TAGS: 'drink, coca-cola' },
      price: 200
    },

    {
      unit_label: 'EA',
      name: 'COKE 385 BOT',
      description: 'COKE 385 BOT',
      metadata: { GST: '10', CATEGORY: 'DRINK', TAGS: 'drink, coca-cola' },
      price: 400
    },

    {
      unit_label: 'EA',
      name: 'COKE 600 PET',
      description: 'COKE 600 PET',
      metadata: { GST: '10', CATEGORY: 'DRINK', TAGS: 'drink, coca-cola' },
      price: 400
    },

    {
      unit_label: 'EA',
      name: 'V ROCKSTAR Guava 500',
      description: 'V ROCKSTAR Guava 500',
      metadata: { GST: '10', CATEGORY: 'DRINK', TAGS: 'drink, v-drink' },
      price: 400
    },

    {
      unit_label: 'EA',
      name: 'V BLUE 250 CAN',
      description: 'V BLUE 250 CAN',
      metadata: { GST: '10', CATEGORY: 'DRINK', TAGS: 'drink, v-drink' },
      price: 280
    },

    {
      unit_label: 'EA',
      name: 'V GREEN 250 CAN',
      description: 'V GREEN 250 CAN',
      metadata: { GST: '10', CATEGORY: 'DRINK', TAGS: 'drink, v-drink' },
      price: 280
    },

    {
      unit_label: 'EA',
      name: 'ORANGE Juice',
      description: 'ORANGE Juice',
      metadata: { GST: '0', CATEGORY: 'DRINK', TAGS: 'drink, juice' },
      price: 400
    }
  ]

  const prices = []

  for (const p of products) {
    const product = await stripe.products.create({
      unit_label: p.unit_label,
      name: p.name,
      description: p.description,
      metadata: p.metadata
    })

    const price = await stripe.prices.create({
      product: product.id,
      currency: 'aud',
      unit_amount: p.price
    })

    prices.push(price)
  }

  const response = {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ count: prices.length, prices })
  }

  // const response = {
  //   statusCode: 201,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*'
  //   },
  //   body: JSON.stringify({ count: products.length, products })
  // }
  return response
}
