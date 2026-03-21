const IMG = {
  mediterranean: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD25ttG6SC-8VnapaRPDCPvGq9EiPDgWxDX4bj0lameAu2wiky4dQxNJnmb8IVxVQDHK7z6bSqAgl12lSUKiWIQLKsVSRQ8tpwRQVi6s2HLDhfYgKIFS7P2Ppg-seVm_61eWJr5RMnartyaMC6JWalsKs_F-JymEkmJ6gsAVSW7BuX7BdHfW6Tl_DE9AzAVC7iYd8dMFsot3GfymotAWlgIiylVSYS5TNEnCPcVlKERwvzVbR-G0CnA4MaBSbTlmiEOPf_gJ6XODA',
  japanese: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxhTKQnbVX-6sB3PwpG-_b4NyZJzLCZt9Jd76X8Pg7JsERy7zMDBnwZqWMm5GhhKpEuCkRzYijLY6ULplPnabQarGTm6O7VTcmFkqCYW8-nZjh_A4yYzn-8FKrwzxS4gRFW26W1MvuTiEZplUX6fBV1T0huU9UY0OkFJ9M9Y7G4jQl7kem2BWOZ2GdrTkyWkdnCCI5VRInW0pL79_AkDDAgCXsvBBBZHeBBYN5RWuKz8ZTs-Ly-vsXTiLnCq93R3W5li_qek6TQwM',
  burger: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvwu7ipiHPyiuirAi03k3L9IR45mXQnYqD3u_VCa5YJB7wH4TUF5-RGy-FZkljnfJdTVvR6v9InbYi2Jun6-5bXhFg85nwpjAA_ofAP2jBY4iBOJ1XKnV8N-TkpuBuu51T8yWBpi5fMjZANPfMPHeVo-99bEgwSwgpQ9wj_n4_aKnLWKbdCqWvErmucT3o5AmjtD88G8fKfoBqX7q_j_EFyjH1ciTax-RuXunqKUCuBTUIFuYrnglATbFko6flBF9n9D0LERt0pec',
  italian: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF8tMsimKProTSfGeCtER7FZw4Dlgs8SbSQE3MX_kkPhUmjymSsDP8sI-7bFOJu-dERR-Zj6ZMy7lShKH0PHwFDWVdPjC8RRS5C4EWL4KABTw-ksQJJUwFbyRIjN7H4UHn7-ElJS927X9GxwGvxaxCYvhe3YoQFTKHjNTFo9yY7Vk29fsPaz7PVszhikr2SZiOtWI17Z6jiczqUsGoYyLk_QtkLC7gml-11qwBxHXV8_TH1rSunlhAwLQyTWL1iycquGZrUun3Qxs',
  pizza: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4fzsQng7votEQN84BtOYADwQjnIHnc8PcBjG9G6A7sgzd0lJ-bUBRlCbVX8vZrjONDWOWrqZ3E4Wf26ObUq5-aex5y-Bg3HEyO4rb9UNmXum-7Y7WZL6yB9rc-FlJjLjc2d_ju3mtHdqu2TlnTx_AWRqq3BThh7JKcmCzL4JpuhoQX96qG2iQRSPhWtZHANtqZ_hs8l-nY99gOjhEAJg6XtqkDhKBQv0iQfjok7iRvCwyC2w4FJkQr7aQv0YM5laNGMaru23PbKw',
  woodfired: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFEFzzxCf0q9vqj728UczmiLxospQgzSiUpe40bFujO8meHL4JmlzBQMqftSfzj4bk9N37qSHhFK_qOtr0vQSmPgJqI-8ucOi52vK1ioAjyWyMXbYYzBSLJNOt5nvd43tzX6rsTVQ-ntbanxa03PyvPqmtSWunCZztvK4xlUjiSbMQ938iGIv1qZ08AfSOUKAps65LWnATYv22gD28_yCpJtN_NAWvnjWpH57AuMZA6e9TfL5YqI812dBENNz4I9qLoqVAZuS6rPc',
  pasta: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSKAcwn7mMURkFt8Qr6wbP7rSvtRDpX3fstIkkL6a7ASGxtpqEDXnevAcm2x9syJKJkIES2TkBoC6AZfPaTbC5xwO-IuvsCbF4SmOFmTzHC9SQdR-lUleahnu0z6x4bi1YEE9xXFNYCfFS93RzfJ17APwFMEbs7HbQCbOOAm_78JHFf3Reujct8GnLC61iUuiA2tgTmMJ6PVOe_rgYQkZ0whv4WlZTHA5VxNDLxdomWIWmkGTMkRhWwb_GmTnp9W_8GXsZUCkTh5Y',
  salad: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARxURdYlCEbFNERnCpgU3OsyDtkZi4iZtoDVRFc7ToxMzuWgVon1O2Nht8PJiMCs5aBkVJ8pJW_8sCjHvz1kHlL4H2GDBtCw6RQkb9HsYDTvObi4kW9lj19VpQ5KdaoupfRAjJvk6lghn5MM65g06cATD_INweNmEf1J8hG12DnKPBW99IDB5Rej8Qpyv5TNQ0fE93lzywfK53OpPfxyUInHH6MGGnn4TjWreLzpJgYyTWpPggb8MTd2CVgoOQiE8DGeyyXLGlVro',
  dessert: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpH4tZc7hkb0IRjHD54KaHTjXzzolMv4N2C47HR9a3HU131ToSaIZMqFEY9Uw9G4wNKJLo_JnfCjZI3uIVNxeb7Ff2AcktBQOkHP66hpGVc63WS-TV7evysTv69-Fi-0C7-NR3zMqV9KP9qDlXcDLIyH7gkU5MOMcvv8eKxnqyV4lUGUYBevOEJ9LUJN5GTlJmd_2J-ULn1dtzH-kV_9uOuQGwcIkDszG0cwZc5sVTBfWxG6BXavUlaVophlAexhszLdrOtBaYHIk',
  fries: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATV2Ee2gDfIPmAZwvhTm5T80zTvH7S1de3GOwXAFnvKu_zJNj5YVlsz7XjXT70nAqgyTnDIupXANe1znZiBK3LGLLzI48Kb3W6_lGuvNNj1c5F9Ezb8mU5PhHQg74bpf06G87bNqhUAO_XPAmX7lORIVUnxSTR375wLTQz3mQq703JGtAoBPmAuGLlkQSGCjO4EWVlYx2CvZHGIuIX7XIzLGoEu6OuCn75FrSe8u8ZscRkoOjTIyZ97XlLK7ceODE80HXe-QVSdKo',
  sushi: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4TPMs6CJAwb38XldJYGJJVm87pphR91ixtGOu-YcZRufDNacZtdqYJ1Sy-KDTeHdRl0jPqQVGyfQFczCkOfSXNVTyE1OiQfF2ur6DdVX-4Y6W8pKM8IU-_HIHXUbEzSZCDQVx2Vmtn5XTSVIHupfuKosc9WaAGTqLpZitkPBI-i8TSgqR_SF-_YVQAtQ6k2pt86xpe8zRgDqGh8uc5PEAA0-iMf6bn480PbdWbI82KZwr8M5mViX1blYIldHdO5y9xKBZAUffaJE',
  mezze: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxtIwUDrWA_eUeqKocz0fSX16tTAIytIN-Mq7r0_k2OGR7s-cq0NCW33p7zjNo6loYemmpjx7NEPQqTCtiDgaGTT-6hW3q6YHSf5fcnNotFXjdHqnFnrSgpeEBVd5t30clg_TkpiTbpr8mFJXt59scbqzb4RgHnKARd2k6_paTpRNCiG3suzl8EIlewKBMUt9O4thyU-M_T0nzjZYLRJZX0cot_kPaXvbNGc9zySpzZgJkBGtERdDOji3DBzGjYBAhDF7aIVOI6O4',
  lamb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLpujvp0IA7gE9ve_P9C-tg26Za3nQX8seJ81H99cQGZVZ_ovZdGq_CaQOVH5meMjMG2OGW7qdiLH_kUbqQVsWVxJojRHc74ZDBqPmUTO0V70NXlCWb1yhvijvZafuFmuUDVcW2Hk170BUCTSVXd9qLsyCj-kgoWIfnoZHAuMCNxzAalzKzKaAaGP5G5dauUnwbBrYIfkftClAZPzKYHUDLt1QToC4J8So5gdwsevlrf4BnsTUxVsDqj-uWYyx60lSZo3YcHzR0is',
  seafood: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq6SFGeiEAbbKJeOMJaxZTjZAi0TaP9dWvz_TBzU_r0u_P38PRWVu0ynpqQJiFmuritWpXXwbbMD6xSA4is2-cS4xyd6XZKa4aooB1bqAu3VJlhikqHVYqsRV8XxHI_x59RSwqYZNhhNwv8uSMppnO-nqlsut38nzWNUi0yQJFLp9pc9-MHIyhNNKNfGYclg6S9BkjUeW9Ani76ufhPBVKmpglHVx7X5q-LFPiaSNBcyFOTo9YsmxWO77vBijQElwvZ3Iu9d4b48I',
};

const restaurantMenus = {
  'heritage-kitchen': {
    restaurantId: 'heritage-kitchen',
    sections: [
      {
        id: 'mezze',
        label: 'Mezze',
        items: [
          {
            name: 'Whipped Feta Board',
            description:
              'Roasted peppers, marinated olives, and toasted pita finished with orange blossom honey.',
            price: '$14.00',
            image: IMG.mezze,
            imageAlt: 'Whipped feta dip with pita and olives',
          },
          {
            name: 'Charred Halloumi',
            description:
              'Grilled halloumi with preserved lemon yogurt, mint, and warm tomato jam.',
            price: '$16.50',
            image: IMG.japanese,
            imageAlt: 'Seared halloumi with citrus dressing',
          },
          {
            name: 'Hummus Royale',
            description:
              'Silky chickpea hummus with pine nuts, paprika oil, and warm sesame flatbread.',
            price: '$12.00',
            image: IMG.salad,
            imageAlt: 'Creamy hummus topped with pine nuts and herbs',
          },
          {
            name: 'Spanakopita Bites',
            description:
              'Crisp phyllo triangles stuffed with spinach, feta, and fresh dill.',
            price: '$11.50',
            image: IMG.mezze,
            imageAlt: 'Golden phyllo pastries on a white plate',
          },
          {
            name: 'Baba Ganoush',
            description:
              'Smoky roasted aubergine blended with tahini, garlic, and finished with pomegranate seeds.',
            price: '$13.00',
            image: IMG.lamb,
            imageAlt: 'Smoky eggplant dip with garnishes',
          },
        ],
      },
      {
        id: 'mains',
        label: 'Mains',
        featuredItem: {
          name: 'Braised Lamb Shoulder',
          description:
            'Slow-braised lamb with saffron couscous, smoked eggplant, and a bright herb salad.',
          price: '$32.00',
          image: IMG.lamb,
          imageAlt: 'Braised lamb plated with couscous and vegetables',
          badgeLabel: "Chef's Signature",
        },
        items: [
          {
            name: 'Seaside Orzo',
            description:
              'Lemony orzo with grilled prawns, charred zucchini, and chili-garlic butter.',
            price: '$24.50',
            image: IMG.seafood,
            imageAlt: 'Seafood orzo in a shallow bowl',
          },
          {
            name: 'Herb-Roasted Chicken',
            description:
              'Free-range half chicken with preserved lemon crust, roasted potatoes, and harissa jus.',
            price: '$28.00',
            image: IMG.mediterranean,
            imageAlt: 'Roasted chicken with herbs and potatoes',
          },
          {
            name: 'Grilled Sea Bass',
            description:
              'Whole grilled sea bass with olive oil, capers, fresh tomato, and chargrilled lemon.',
            price: '$34.00',
            image: IMG.seafood,
            imageAlt: 'Whole grilled sea bass on a platter',
            alertIcon: true,
          },
          {
            name: 'Vegetarian Moussaka',
            description:
              'Layered aubergine, spiced lentil ragu, and bechamel topped with crispy breadcrumbs.',
            price: '$21.00',
            image: IMG.salad,
            imageAlt: 'Slice of vegetarian moussaka on a white plate',
          },
        ],
      },
      {
        id: 'sweets',
        label: 'Sweets',
        items: [
          {
            name: 'Orange Olive Cake',
            description:
              'Moist citrus olive-oil cake with mascarpone cream and pistachio crumble.',
            price: '$10.00',
            image: IMG.dessert,
            imageAlt: 'Slice of orange olive cake with cream',
          },
          {
            name: 'Baklava Sundae',
            description:
              'Warm pistachio baklava served with rose water ice cream and honey drizzle.',
            price: '$12.50',
            image: IMG.dessert,
            imageAlt: 'Baklava with ice cream and honey',
          },
          {
            name: 'Loukoumades',
            description:
              'Crispy honey-soaked dough balls dusted with cinnamon and crushed walnuts.',
            price: '$9.00',
            image: IMG.dessert,
            imageAlt: 'Greek honey doughnuts in a bowl',
          },
          {
            name: 'Chocolate Halva Tart',
            description:
              'Dark chocolate ganache tart with sesame halva, sea salt, and candied almonds.',
            price: '$11.50',
            image: IMG.dessert,
            imageAlt: 'Dark chocolate tart with sesame',
          },
        ],
      },
    ],
  },
  'sakura-bloom': {
    restaurantId: 'sakura-bloom',
    sections: [
      {
        id: 'small-plates',
        label: 'Small Plates',
        items: [
          {
            name: 'Crispy Rice Tuna',
            description:
              'Spicy tuna, avocado mousse, and pickled jalapeno over crisp sushi rice bites.',
            price: '$15.00',
            image: IMG.japanese,
            imageAlt: 'Crispy rice topped with tuna and jalapeno',
          },
          {
            name: 'Yuzu Miso Salad',
            description:
              'Baby greens, sesame cucumbers, avocado, and a bright yuzu-miso vinaigrette.',
            price: '$12.50',
            image: IMG.salad,
            imageAlt: 'Japanese salad with avocado and cucumber',
          },
          {
            name: 'Edamame & Truffle',
            description:
              'Steamed edamame tossed in truffle oil, flaky sea salt, and togarashi.',
            price: '$9.00',
            image: IMG.salad,
            imageAlt: 'Steamed edamame in a bowl',
          },
          {
            name: 'Gyoza (6 pcs)',
            description:
              'Pan-fried pork and cabbage dumplings with ponzu dipping sauce.',
            price: '$13.00',
            image: IMG.japanese,
            imageAlt: 'Crispy gyoza dumplings with dipping sauce',
          },
          {
            name: 'Tuna Tataki',
            description:
              'Lightly seared albacore tuna with daikon, micro herbs, and sesame soy.',
            price: '$18.00',
            image: IMG.sushi,
            imageAlt: 'Seared tuna slices with garnish',
          },
        ],
      },
      {
        id: 'signature-rolls',
        label: 'Signature Rolls',
        featuredItem: {
          name: 'Sakura Luxe Roll',
          description:
            'Tempura shrimp, salmon tartare, tobiko, and truffle ponzu finished with gold sesame.',
          price: '$22.00',
          image: IMG.japanese,
          imageAlt: 'Signature sushi roll platter',
          badgeLabel: 'House Favorite',
        },
        items: [
          {
            name: 'Torched Salmon Maki',
            description:
              'Aburi salmon, cucumber, and wasabi aioli with a soy caramel glaze.',
            price: '$18.00',
            image: IMG.sushi,
            imageAlt: 'Torched salmon maki on a ceramic plate',
            alertIcon: true,
          },
          {
            name: 'Dragon Roll',
            description:
              'Tempura prawn and crab inside, topped with avocado, unagi, and sweet soy.',
            price: '$20.00',
            image: IMG.sushi,
            imageAlt: 'Dragon roll with avocado topping',
          },
          {
            name: 'Spicy Tuna Crunch',
            description:
              'Spicy tuna, cucumber, and crispy panko with sriracha mayo and sesame.',
            price: '$16.50',
            image: IMG.japanese,
            imageAlt: 'Spicy tuna roll with crispy topping',
          },
          {
            name: 'Rainbow Roll',
            description:
              'California roll base topped with rotating slices of tuna, salmon, yellowtail, and avocado.',
            price: '$21.00',
            image: IMG.sushi,
            imageAlt: 'Colorful rainbow roll on a slate board',
          },
        ],
      },
      {
        id: 'desserts',
        label: 'Desserts',
        items: [
          {
            name: 'Matcha Basque Cheesecake',
            description:
              'Burnt cheesecake with ceremonial matcha cream and candied sesame brittle.',
            price: '$11.00',
            image: IMG.dessert,
            imageAlt: 'Matcha cheesecake with caramelized top',
          },
          {
            name: 'Mochi Ice Cream Trio',
            description:
              'Three hand-rolled mochi: black sesame, lychee, and yuzu sorbet.',
            price: '$10.00',
            image: IMG.dessert,
            imageAlt: 'Three mochi balls on a wooden board',
          },
          {
            name: 'Dorayaki',
            description:
              'Fluffy Japanese pancake sandwiches filled with red bean paste and whipped cream.',
            price: '$8.50',
            image: IMG.dessert,
            imageAlt: 'Dorayaki pancake sandwich on a plate',
          },
        ],
      },
    ],
  },
  'burger-haven': {
    restaurantId: 'burger-haven',
    sections: [
      {
        id: 'smash-burgers',
        label: 'Smash Burgers',
        featuredItem: {
          name: 'Double Smoke Stack',
          description:
            'Two smashed patties, smoked cheddar, bacon jam, and charred onion mayo on brioche.',
          price: '$18.00',
          image: IMG.burger,
          imageAlt: 'Double smash burger with melted cheese',
          badgeLabel: 'Best Seller',
        },
        items: [
          {
            name: 'Classic Haven',
            description:
              'Single patty burger with house pickles, lettuce, tomato, and comeback sauce.',
            price: '$13.50',
            image: IMG.burger,
            imageAlt: 'Single patty burger with lettuce and tomato',
          },
          {
            name: 'Mushroom Swiss Melt',
            description:
              'Sautéed wild mushrooms, Swiss cheese, caramelized onions, and herb aioli.',
            price: '$15.00',
            image: IMG.burger,
            imageAlt: 'Mushroom swiss burger with melted cheese',
          },
          {
            name: 'Spicy Habanero Bird',
            description:
              'Crispy fried chicken breast with habanero glaze, coleslaw, and pickled jalapeños.',
            price: '$14.50',
            image: IMG.burger,
            imageAlt: 'Spicy crispy chicken burger',
            alertIcon: true,
          },
          {
            name: 'Veggie Smash',
            description:
              'House-made black bean patty, pepper jack, avocado smash, and chipotle mayo.',
            price: '$13.00',
            image: IMG.salad,
            imageAlt: 'Veggie burger with avocado',
          },
        ],
      },
      {
        id: 'sides',
        label: 'Sides',
        items: [
          {
            name: 'Truffle Fries',
            description:
              'Skin-on fries tossed in truffle oil, parmesan, and chopped parsley.',
            price: '$7.50',
            image: IMG.fries,
            imageAlt: 'Crispy fries in a serving basket',
          },
          {
            name: 'Crispy Onion Rings',
            description:
              'Beer-battered onion rings with roasted garlic ranch.',
            price: '$6.50',
            image: IMG.mezze,
            imageAlt: 'Onion rings with a creamy dipping sauce',
          },
          {
            name: 'Mac & Cheese Bites',
            description:
              'Fried macaroni bites with a four-cheese blend and smoky chipotle dip.',
            price: '$8.00',
            image: IMG.fries,
            imageAlt: 'Fried mac and cheese bites',
          },
          {
            name: 'Sweet Potato Wedges',
            description:
              'Roasted sweet potato wedges with cinnamon salt and honey mustard dip.',
            price: '$6.00',
            image: IMG.fries,
            imageAlt: 'Sweet potato wedges with dipping sauce',
          },
          {
            name: 'Coleslaw',
            description:
              'Creamy house coleslaw with apple, celery seed, and cider vinegar.',
            price: '$4.50',
            image: IMG.salad,
            imageAlt: 'Fresh coleslaw in a small bowl',
          },
        ],
      },
      {
        id: 'shakes',
        label: 'Shakes',
        items: [
          {
            name: 'Salted Caramel Shake',
            description:
              'Vanilla ice cream blended with caramel and finished with flaky sea salt.',
            price: '$6.00',
            image: IMG.dessert,
            imageAlt: 'Salted caramel milkshake in a glass',
          },
          {
            name: 'Oreo Cookies & Cream',
            description:
              'Thick shake blended with crushed Oreos, milk, and double vanilla ice cream.',
            price: '$6.50',
            image: IMG.dessert,
            imageAlt: 'Cookies and cream milkshake',
          },
          {
            name: 'Strawberry Smash',
            description:
              'Fresh strawberries blended with ice cream and topped with whipped cream.',
            price: '$6.00',
            image: IMG.dessert,
            imageAlt: 'Pink strawberry milkshake',
          },
          {
            name: 'Peanut Butter Banana',
            description:
              'Creamy shake with natural peanut butter, ripe banana, and chocolate drizzle.',
            price: '$7.00',
            image: IMG.dessert,
            imageAlt: 'Peanut butter banana shake',
          },
        ],
      },
    ],
  },
  'vero-italiano': {
    restaurantId: 'vero-italiano',
    sections: [
      {
        id: 'antipasti',
        label: 'Antipasti',
        items: [
          {
            name: 'Burrata al Limone',
            description:
              'Creamy burrata with lemon zest, basil oil, and blistered focaccia.',
            price: '$16.00',
            image: IMG.mezze,
            imageAlt: 'Burrata with herbs and toasted bread',
          },
          {
            name: 'Prosciutto e Melone',
            description:
              'Aged prosciutto di Parma draped over fresh cantaloupe with aged balsamic.',
            price: '$18.00',
            image: IMG.mediterranean,
            imageAlt: 'Prosciutto and melon on a marble board',
          },
          {
            name: 'Carpaccio di Manzo',
            description:
              'Paper-thin beef carpaccio with capers, rocket, shaved parmesan, and lemon oil.',
            price: '$19.00',
            image: IMG.salad,
            imageAlt: 'Beef carpaccio with rocket and parmesan',
          },
          {
            name: 'Bruschetta Classica',
            description:
              'Toasted sourdough with heirloom tomatoes, fresh basil, and Sicilian extra virgin olive oil.',
            price: '$13.00',
            image: IMG.mezze,
            imageAlt: 'Bruschetta topped with fresh tomatoes',
          },
        ],
      },
      {
        id: 'pasta',
        label: 'Pasta',
        featuredItem: {
          name: 'Wild Mushroom Tagliatelle',
          description:
            'Fresh egg pasta, porcini cream, roasted mushrooms, and aged parmesan.',
          price: '$27.00',
          image: IMG.pasta,
          imageAlt: 'Fresh tagliatelle coated in mushroom cream sauce',
          badgeLabel: 'House Specialty',
        },
        items: [
          {
            name: 'Cacio e Pepe',
            description:
              'Tonnarelli pasta tossed with pecorino romano and cracked black pepper.',
            price: '$21.00',
            image: IMG.pasta,
            imageAlt: 'Pasta twirled in a creamy pecorino sauce',
          },
          {
            name: 'Spaghetti alle Vongole',
            description:
              'Spaghetti with fresh clams, white wine, garlic, parsley, and chili flakes.',
            price: '$26.00',
            image: IMG.seafood,
            imageAlt: 'Spaghetti with clams in white wine sauce',
          },
          {
            name: 'Rigatoni Amatriciana',
            description:
              'Rigatoni with guanciale, San Marzano tomatoes, and sharp pecorino.',
            price: '$23.00',
            image: IMG.pasta,
            imageAlt: 'Rigatoni in tomato sauce with guanciale',
          },
          {
            name: 'Pappardelle al Cinghiale',
            description:
              'Wide ribbon pasta with slow-cooked wild boar ragu and fresh herbs.',
            price: '$29.00',
            image: IMG.pasta,
            imageAlt: 'Pappardelle with wild boar ragu',
            alertIcon: true,
          },
        ],
      },
      {
        id: 'secondi',
        label: 'Secondi',
        items: [
          {
            name: 'Branzino al Forno',
            description:
              'Oven-roasted sea bass with lemon butter, capers, and braised fennel.',
            price: '$34.00',
            image: IMG.seafood,
            imageAlt: 'Roasted sea bass with fennel',
          },
          {
            name: 'Bistecca Fiorentina',
            description:
              'Dry-aged T-bone steak grilled over oak, finished with rosemary salt and Tuscan beans.',
            price: '$58.00',
            image: IMG.lamb,
            imageAlt: 'Thick T-bone steak on a wooden board',
          },
          {
            name: 'Pollo alla Parmigiana',
            description:
              'Breaded chicken breast with San Marzano tomato sauce, basil, and melted fior di latte.',
            price: '$27.00',
            image: IMG.mediterranean,
            imageAlt: 'Chicken parmesan with melted cheese',
          },
        ],
      },
      {
        id: 'dolci',
        label: 'Dolci',
        items: [
          {
            name: 'Tiramisu della Casa',
            description:
              'Espresso-soaked ladyfingers layered with mascarpone and cocoa.',
            price: '$11.00',
            image: IMG.dessert,
            imageAlt: 'Slice of tiramisu dusted with cocoa',
          },
          {
            name: 'Panna Cotta al Frutti di Bosco',
            description:
              'Silky vanilla panna cotta with a warm wild berry compote.',
            price: '$10.00',
            image: IMG.dessert,
            imageAlt: 'Panna cotta with berry sauce',
          },
          {
            name: 'Affogato',
            description:
              'Double espresso poured over premium vanilla gelato with a cantuccini biscuit.',
            price: '$9.00',
            image: IMG.dessert,
            imageAlt: 'Espresso poured over vanilla gelato',
          },
        ],
      },
    ],
  },
  'bella-vita-trattoria': {
    restaurantId: 'bella-vita-trattoria',
    sections: [
      {
        id: 'starters',
        label: 'Starters',
        items: [
          {
            name: 'Arancini Trio',
            description:
              'Three saffron risotto croquettes with smoked mozzarella and basil pomodoro.',
            price: '$13.00',
            image: IMG.mezze,
            imageAlt: 'Crispy arancini with red sauce',
          },
          {
            name: 'Caprese Classico',
            description:
              'Buffalo mozzarella, vine-ripened tomatoes, fresh basil, and 18-year balsamic.',
            price: '$15.00',
            image: IMG.salad,
            imageAlt: 'Caprese salad with mozzarella and basil',
          },
          {
            name: 'Polpette al Sugo',
            description:
              'Slow-simmered pork and veal meatballs in San Marzano tomato sauce with torn bread.',
            price: '$16.00',
            image: IMG.lamb,
            imageAlt: 'Meatballs in tomato sauce',
          },
          {
            name: 'Zuppa di Ceci',
            description:
              'Tuscan chickpea and rosemary soup drizzled with chili oil and topped with croutons.',
            price: '$12.00',
            image: IMG.salad,
            imageAlt: 'Rustic chickpea soup with croutons',
          },
        ],
      },
      {
        id: 'pizza',
        label: 'Pizza',
        featuredItem: {
          name: 'Burrata Margherita',
          description:
            'Slow-fermented dough, San Marzano tomato, basil, and a whole burrata at center.',
          price: '$24.00',
          image: IMG.pizza,
          imageAlt: 'Margherita pizza topped with burrata',
          badgeLabel: "Editor's Pick",
        },
        items: [
          {
            name: 'Spicy Diavola',
            description:
              'Fior di latte, spicy salami, honey-fermented chilies, and oregano.',
            price: '$22.50',
            image: IMG.italian,
            imageAlt: 'Spicy salami pizza with charred crust',
            alertIcon: true,
          },
          {
            name: 'Funghi e Tartufo',
            description:
              'Wild mushrooms, truffle cream, fontina, and fresh thyme on a white base.',
            price: '$25.00',
            image: IMG.woodfired,
            imageAlt: 'Mushroom and truffle pizza',
          },
          {
            name: 'Quattro Stagioni',
            description:
              'Four-season pizza divided into artichoke, ham, mushroom, and black olives.',
            price: '$23.00',
            image: IMG.pizza,
            imageAlt: 'Four seasons pizza with varied toppings',
          },
          {
            name: 'Nduja & Honey',
            description:
              "Spreadable spicy Calabrian salami, stracciatella, and wildflower honey.",
            price: '$26.00',
            image: IMG.italian,
            imageAlt: 'Pizza with spicy nduja and honey drizzle',
          },
        ],
      },
      {
        id: 'desserts',
        label: 'Desserts',
        items: [
          {
            name: 'Pistachio Cannoli',
            description:
              'Crisp cannoli shells filled with ricotta mousse and chopped pistachios.',
            price: '$9.50',
            image: IMG.dessert,
            imageAlt: 'Cannoli with pistachios and powdered sugar',
          },
          {
            name: 'Sfogliatella',
            description:
              'Flaky shell-shaped Neapolitan pastry filled with ricotta, candied peel, and cinnamon.',
            price: '$8.00',
            image: IMG.dessert,
            imageAlt: 'Sfogliatella pastry on a plate',
          },
          {
            name: 'Gelato Selection',
            description:
              'Three scoops from the daily gelato menu — ask your server for today\'s flavours.',
            price: '$10.00',
            image: IMG.dessert,
            imageAlt: 'Three scoops of artisan gelato',
          },
        ],
      },
    ],
  },
  'forno-brace': {
    restaurantId: 'forno-brace',
    sections: [
      {
        id: 'small-plates',
        label: 'Small Plates',
        items: [
          {
            name: 'Wood-Roasted Cauliflower',
            description:
              'Roasted cauliflower with chili crisp, parmesan, and whipped ricotta.',
            price: '$12.00',
            image: IMG.mezze,
            imageAlt: 'Roasted cauliflower with ricotta and herbs',
          },
          {
            name: 'Burrata e Pesche',
            description:
              'Fresh burrata with grilled white peach, aged balsamic, and toasted hazelnuts.',
            price: '$14.00',
            image: IMG.salad,
            imageAlt: 'Burrata with grilled peach and hazelnuts',
          },
          {
            name: 'Chicken Liver Crostini',
            description:
              'Tuscan chicken liver pâté on grilled sourdough with pickled shallots and sage.',
            price: '$11.00',
            image: IMG.mezze,
            imageAlt: 'Crostini topped with chicken liver pate',
          },
          {
            name: 'Focaccia al Rosmarino',
            description:
              'House-baked rosemary focaccia with fleur de sel and a side of olive oil.',
            price: '$8.00',
            image: IMG.mezze,
            imageAlt: 'Thick rosemary focaccia bread',
          },
        ],
      },
      {
        id: 'firebaked-pizzas',
        label: 'Firebaked Pizzas',
        featuredItem: {
          name: 'Pepperoni Calabrese',
          description:
            'Wood-fired dough layered with spicy pepperoni, hot honey, and basil chiffonade.',
          price: '$21.00',
          image: IMG.woodfired,
          imageAlt: 'Pepperoni pizza sliced on a serving board',
          badgeLabel: 'Fast Mover',
        },
        items: [
          {
            name: 'Roasted Garlic Bianca',
            description:
              'Mozzarella, garlic cream, rosemary potatoes, and pecorino.',
            price: '$20.00',
            image: IMG.italian,
            imageAlt: 'White pizza with herbs and roasted garlic',
          },
          {
            name: 'Prosciutto Rucola',
            description:
              'Thin-crust base with fior di latte, prosciutto crudo, and fresh rocket finished post-bake.',
            price: '$23.00',
            image: IMG.pizza,
            imageAlt: 'Pizza topped with prosciutto and arugula',
          },
          {
            name: 'Smoked Salmon & Dill',
            description:
              'Cream cheese base, cold-smoked salmon, capers, and fresh dill with lemon oil.',
            price: '$24.00',
            image: IMG.seafood,
            imageAlt: 'Smoked salmon pizza with cream cheese',
          },
          {
            name: 'Truffle & Egg',
            description:
              'Black truffle cream, mozzarella, slow-baked egg, and chives.',
            price: '$25.00',
            image: IMG.woodfired,
            imageAlt: 'Truffle and egg pizza from the wood oven',
            alertIcon: true,
          },
        ],
      },
      {
        id: 'sweets',
        label: 'Sweets',
        items: [
          {
            name: 'Chocolate Hazelnut Budino',
            description:
              'Dark chocolate pudding with whipped mascarpone and toasted hazelnuts.',
            price: '$8.50',
            image: IMG.dessert,
            imageAlt: 'Chocolate pudding with hazelnuts',
          },
          {
            name: 'Ricotta Fritters',
            description:
              'Light fried ricotta balls dusted in icing sugar with orange marmalade for dipping.',
            price: '$9.00',
            image: IMG.dessert,
            imageAlt: 'Ricotta fritters dusted with sugar',
          },
          {
            name: 'Torta di Mele',
            description:
              'Rustic Italian apple cake with cinnamon, walnuts, and a scoop of crème fraîche.',
            price: '$10.00',
            image: IMG.dessert,
            imageAlt: 'Slice of Italian apple cake',
          },
        ],
      },
    ],
  },
  'spice-route': {
    restaurantId: 'spice-route',
    sections: [
      {
        id: 'starters',
        label: 'Starters',
        items: [
          {
            name: 'Samosa Chaat',
            description:
              'Crispy potato samosas topped with tamarind chutney, mint yogurt, and sev.',
            price: '$12.00',
            image: IMG.mezze,
            imageAlt: 'Samosas with chutneys and toppings',
          },
          {
            name: 'Tandoori Chicken Wings',
            description:
              'Overnight-marinated wings cooked in the tandoor with mint raita and pickled onions.',
            price: '$15.00',
            image: IMG.lamb,
            imageAlt: 'Tandoori chicken wings on a plate',
          },
          {
            name: 'Paneer Tikka',
            description:
              'Charred cottage cheese cubes with bell peppers, chili marinade, and coriander chutney.',
            price: '$13.50',
            image: IMG.salad,
            imageAlt: 'Grilled paneer tikka skewers',
          },
          {
            name: 'Dal Shorba',
            description:
              'Velvety lentil soup spiced with cumin, turmeric, and finished with a mustard seed tadka.',
            price: '$10.00',
            image: IMG.salad,
            imageAlt: 'Lentil soup in a white bowl',
          },
        ],
      },
      {
        id: 'mains',
        label: 'Mains',
        featuredItem: {
          name: 'Lamb Rogan Josh',
          description:
            'Slow-braised Kashmiri lamb curry with whole spices, saffron, and hand-rolled naan.',
          price: '$29.00',
          image: IMG.lamb,
          imageAlt: 'Rich lamb curry in a copper pot',
          badgeLabel: "Chef's Pick",
        },
        items: [
          {
            name: 'Butter Chicken',
            description:
              'Tandoor-roasted chicken in a silky tomato, cream, and fenugreek sauce.',
            price: '$24.00',
            image: IMG.mediterranean,
            imageAlt: 'Butter chicken in a creamy tomato sauce',
          },
          {
            name: 'Prawn Masala',
            description:
              'Tiger prawns cooked in a Goan-spiced coconut and tomato masala with steamed rice.',
            price: '$27.00',
            image: IMG.seafood,
            imageAlt: 'Spicy prawn masala with rice',
            alertIcon: true,
          },
          {
            name: 'Saag Paneer',
            description:
              'Cottage cheese in a spiced spinach and mustard leaf sauce with ghee.',
            price: '$20.00',
            image: IMG.salad,
            imageAlt: 'Saag paneer in a bowl',
          },
          {
            name: 'Chicken Biryani',
            description:
              'Slow dum-cooked basmati rice with spiced chicken, caramelized onions, and saffron.',
            price: '$26.00',
            image: IMG.mediterranean,
            imageAlt: 'Biryani with saffron rice and chicken',
          },
        ],
      },
      {
        id: 'breads-rice',
        label: 'Breads & Rice',
        items: [
          {
            name: 'Garlic Naan',
            description:
              'Butter-brushed naan with roasted garlic and fresh coriander, baked in the tandoor.',
            price: '$5.00',
            image: IMG.mezze,
            imageAlt: 'Garlic naan bread',
          },
          {
            name: 'Paratha',
            description:
              'Layered whole-wheat flatbread pan-fried in ghee, served with pickle.',
            price: '$5.50',
            image: IMG.mezze,
            imageAlt: 'Flaky paratha bread',
          },
          {
            name: 'Saffron Rice',
            description:
              'Long-grain basmati steamed with saffron, cardamom, and a rose water finish.',
            price: '$6.00',
            image: IMG.salad,
            imageAlt: 'Saffron basmati rice in a bowl',
          },
        ],
      },
    ],
  },
  'seoul-bowl': {
    restaurantId: 'seoul-bowl',
    sections: [
      {
        id: 'small-plates',
        label: 'Small Plates',
        items: [
          {
            name: 'Japchae',
            description:
              'Glass noodles stir-fried with sesame, colourful vegetables, and bulgogi beef.',
            price: '$13.00',
            image: IMG.salad,
            imageAlt: 'Korean glass noodles with vegetables',
          },
          {
            name: 'Kimchi Pancake',
            description:
              'Crispy kimchi jeon with spring onions, served with sesame soy dipping sauce.',
            price: '$11.00',
            image: IMG.mezze,
            imageAlt: 'Crispy kimchi pancake with dipping sauce',
          },
          {
            name: 'Korean Fried Chicken',
            description:
              'Double-fried wings glazed with sweet gochujang sauce and sesame seeds.',
            price: '$16.00',
            image: IMG.mezze,
            imageAlt: 'Glazed Korean fried chicken',
            alertIcon: true,
          },
          {
            name: 'Sundubu Jjigae',
            description:
              'Soft tofu stew with clams, mushrooms, egg, and kimchi in a spicy broth.',
            price: '$14.00',
            image: IMG.salad,
            imageAlt: 'Soft tofu stew bubbling in a stone pot',
          },
        ],
      },
      {
        id: 'bowls',
        label: 'Bowls',
        featuredItem: {
          name: 'The Seoul Bowl',
          description:
            'Bibimbap with wagyu bulgogi, assorted namul, gochujang, and a slow-cooked egg.',
          price: '$22.00',
          image: IMG.salad,
          imageAlt: 'Colourful Korean bibimbap bowl',
          badgeLabel: 'Signature',
        },
        items: [
          {
            name: 'Doenjang Mushroom Bowl',
            description:
              'Roasted king oyster mushrooms over soybean-paste rice with pickled daikon.',
            price: '$18.00',
            image: IMG.salad,
            imageAlt: 'Mushroom rice bowl with pickled vegetables',
          },
          {
            name: 'Spicy Tuna Poke Bowl',
            description:
              'Sushi-grade tuna, edamame, cucumber, and avocado over seasoned Korean rice.',
            price: '$20.00',
            image: IMG.sushi,
            imageAlt: 'Tuna poke bowl with avocado',
          },
          {
            name: 'Galbi Short Rib Bowl',
            description:
              'Soy-marinated beef short ribs over steamed rice with scallions and sesame.',
            price: '$24.00',
            image: IMG.lamb,
            imageAlt: 'Korean galbi short ribs over rice',
          },
        ],
      },
      {
        id: 'desserts',
        label: 'Desserts',
        items: [
          {
            name: 'Bingsu',
            description:
              'Shaved milk ice topped with sweetened red bean, condensed milk, and mochi.',
            price: '$9.00',
            image: IMG.dessert,
            imageAlt: 'Korean shaved ice dessert',
          },
          {
            name: 'Hotteok',
            description:
              'Warm street-style pancakes filled with brown sugar, cinnamon, and crushed nuts.',
            price: '$8.00',
            image: IMG.dessert,
            imageAlt: 'Korean sweet pancakes',
          },
          {
            name: 'Sikhye',
            description:
              'Traditional sweet rice punch served chilled with floating rice grains and pine nuts.',
            price: '$5.00',
            image: IMG.dessert,
            imageAlt: 'Sweet Korean rice drink',
          },
        ],
      },
    ],
  },
  'olive-vine': {
    restaurantId: 'olive-vine',
    sections: [
      {
        id: 'mezedes',
        label: 'Mezedes',
        items: [
          {
            name: 'Taramasalata',
            description:
              'Creamy fish roe dip with lemon, olive oil, and warm sesame pita.',
            price: '$11.00',
            image: IMG.mezze,
            imageAlt: 'Pink taramasalata dip with pita',
          },
          {
            name: 'Dolmades',
            description:
              'Vine leaves stuffed with herbed rice and pine nuts, served with tzatziki.',
            price: '$13.00',
            image: IMG.salad,
            imageAlt: 'Vine leaf rolls with yogurt dip',
          },
          {
            name: 'Grilled Octopus',
            description:
              'Chargrilled octopus with capers, sun-dried tomato, and lemon caper vinaigrette.',
            price: '$19.00',
            image: IMG.seafood,
            imageAlt: 'Grilled octopus tentacles on a plate',
          },
          {
            name: 'Tyrokafteri',
            description:
              'Spicy feta and roasted red pepper dip with crusty village bread.',
            price: '$10.00',
            image: IMG.mezze,
            imageAlt: 'Spicy feta dip with bread',
            alertIcon: true,
          },
          {
            name: 'Spanakopita',
            description:
              'Golden flaky spinach and feta pie made with handmade phyllo.',
            price: '$12.00',
            image: IMG.mezze,
            imageAlt: 'Slice of spinach and feta pie',
          },
        ],
      },
      {
        id: 'mains',
        label: 'Mains',
        featuredItem: {
          name: 'Slow-Roasted Lamb Kleftiko',
          description:
            'Paper-wrapped lamb shoulder roasted overnight with garlic, lemon, and oregano.',
          price: '$34.00',
          image: IMG.lamb,
          imageAlt: 'Slow-roasted lamb with herbs',
          badgeLabel: 'Weekend Special',
        },
        items: [
          {
            name: 'Moussaka',
            description:
              'Classic layered aubergine and spiced beef mince topped with bechamel crust.',
            price: '$23.00',
            image: IMG.lamb,
            imageAlt: 'Slice of golden-topped moussaka',
          },
          {
            name: 'Souvlaki Platter',
            description:
              'Chicken and pork skewers with tzatziki, grilled pita, and a Greek salad.',
            price: '$26.00',
            image: IMG.mediterranean,
            imageAlt: 'Souvlaki skewers with pita and salad',
          },
          {
            name: 'Grilled Lavraki',
            description:
              'Whole sea bass grilled with olive oil, lemon, thyme, and charred vegetables.',
            price: '$32.00',
            image: IMG.seafood,
            imageAlt: 'Whole grilled sea bass with vegetables',
          },
          {
            name: 'Vegetarian Gemista',
            description:
              'Oven-roasted tomatoes and peppers stuffed with herbed rice, feta, and pine nuts.',
            price: '$19.00',
            image: IMG.salad,
            imageAlt: 'Stuffed tomatoes and peppers',
          },
        ],
      },
      {
        id: 'desserts',
        label: 'Desserts',
        items: [
          {
            name: 'Galaktoboureko',
            description:
              'Crispy phyllo custard pie soaked in citrus syrup, served warm.',
            price: '$10.00',
            image: IMG.dessert,
            imageAlt: 'Custard pie with syrup',
          },
          {
            name: 'Loukoumades',
            description:
              'Honey-drizzled dough balls with cinnamon, walnuts, and sesame seeds.',
            price: '$9.00',
            image: IMG.dessert,
            imageAlt: 'Greek honey doughnuts',
          },
          {
            name: 'Yogurt with Thyme Honey',
            description:
              'Thick Greek strained yogurt with Cretan thyme honey and crushed pistachios.',
            price: '$8.00',
            image: IMG.dessert,
            imageAlt: 'Greek yogurt with honey and nuts',
          },
        ],
      },
    ],
  },
};

export { restaurantMenus };
