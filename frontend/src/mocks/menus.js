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
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAxtIwUDrWA_eUeqKocz0fSX16tTAIytIN-Mq7r0_k2OGR7s-cq0NCW33p7zjNo6loYemmpjx7NEPQqTCtiDgaGTT-6hW3q6YHSf5fcnNotFXjdHqnFnrSgpeEBVd5t30clg_TkpiTbpr8mFJXt59scbqzb4RgHnKARd2k6_paTpRNCiG3suzl8EIlewKBMUt9O4thyU-M_T0nzjZYLRJZX0cot_kPaXvbNGc9zySpzZgJkBGtERdDOji3DBzGjYBAhDF7aIVOI6O4',
            imageAlt: 'Whipped feta dip with pita and olives',
          },
          {
            name: 'Charred Halloumi',
            description:
              'Grilled halloumi with preserved lemon yogurt, mint, and warm tomato jam.',
            price: '$16.50',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAKC12K85qCJiDwqTWfBpfpcCqGHuXd_NWqgVzCXKfprOiG4_QXsFfPgu_s4vU3hwiLGMas9QGNT2dsT7FErrk-KVXG122p7bYbNHCsV-B5DuMWwzQKBnuwD8O8959Fo3sCL9ZPK-tcrc1EKCFxW0cFFcL4uh4dFqnPDNn_OdQcwY60-SMSut51rrwoaw-f-jka8p4gCZ010C3ppzQ33bciF_KUomdb5GTXuDac5MbZeuyjVxZ-aJDoPlKw1HtZ6MKBU62jgfGxfOY',
            imageAlt: 'Seared halloumi with citrus dressing',
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
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDLpujvp0IA7gE9ve_P9C-tg26Za3nQX8seJ81H99cQGZVZ_ovZdGq_CaQOVH5meMjMG2OGW7qdiLH_kUbqQVsWVxJojRHc74ZDBqPmUTO0V70NXlCWb1yhvijvZafuFmuUDVcW2Hk170BUCTSVXd9qLsyCj-kgoWIfnoZHAuMCNxzAalzKzKaAaGP5G5dauUnwbBrYIfkftClAZPzKYHUDLt1QToC4J8So5gdwsevlrf4BnsTUxVsDqj-uWYyx60lSZo3YcHzR0is',
          imageAlt: 'Braised lamb plated with couscous and vegetables',
          badgeLabel: "Chef's Signature",
        },
        items: [
          {
            name: 'Seaside Orzo',
            description:
              'Lemony orzo with grilled prawns, charred zucchini, and chili-garlic butter.',
            price: '$24.50',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuBq6SFGeiEAbbKJeOMJaxZTjZAi0TaP9dWvz_TBzU_r0u_P38PRWVu0ynpqQJiFmuritWpXXwbbMD6xSA4is2-cS4xyd6XZKa4aooB1bqAu3VJlhikqHVYqsRV8XxHI_x59RSwqYZNhhNwv8uSMppnO-nqlsut38nzWNUi0yQJFLp9pc9-MHIyhNNKNfGYclg6S9BkjUeW9Ani76ufhPBVKmpglHVx7X5q-LFPiaSNBcyFOTo9YsmxWO77vBijQElwvZ3Iu9d4b48I',
            imageAlt: 'Seafood orzo in a shallow bowl',
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
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCpH4tZc7hkb0IRjHD54KaHTjXzzolMv4N2C47HR9a3HU131ToSaIZMqFEY9Uw9G4wNKJLo_JnfCjZI3uIVNxeb7Ff2AcktBQOkHP66hpGVc63WS-TV7evysTv69-Fi-0C7-NR3zMqV9KP9qDlXcDLIyH7gkU5MOMcvv8eKxnqyV4lUGUYBevOEJ9LUJN5GTlJmd_2J-ULn1dtzH-kV_9uOuQGwcIkDszG0cwZc5sVTBfWxG6BXavUlaVophlAexhszLdrOtBaYHIk',
            imageAlt: 'Slice of orange olive cake with cream',
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
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAKC12K85qCJiDwqTWfBpfpcCqGHuXd_NWqgVzCXKfprOiG4_QXsFfPgu_s4vU3hwiLGMas9QGNT2dsT7FErrk-KVXG122p7bYbNHCsV-B5DuMWwzQKBnuwD8O8959Fo3sCL9ZPK-tcrc1EKCFxW0cFFcL4uh4dFqnPDNn_OdQcwY60-SMSut51rrwoaw-f-jka8p4gCZ010C3ppzQ33bciF_KUomdb5GTXuDac5MbZeuyjVxZ-aJDoPlKw1HtZ6MKBU62jgfGxfOY',
            imageAlt: 'Crispy rice topped with tuna and jalapeno',
          },
          {
            name: 'Yuzu Miso Salad',
            description:
              'Baby greens, sesame cucumbers, avocado, and a bright yuzu-miso vinaigrette.',
            price: '$12.50',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuARxURdYlCEbFNERnCpgU3OsyDtkZi4iZtoDVRFc7ToxMzuWgVon1O2Nht8PJiMCs5aBkVJ8pJW_8sCjHvz1kHlL4H2GDBtCw6RQkb9HsYDTvObi4kW9lj19VpQ5KdaoupfRAjJvk6lghn5MM65g06cATD_INweNmEf1J8hG12DnKPBW99IDB5Rej8Qpyv5TNQ0fE93lzywfK53OpPfxyUInHH6MGGnn4TjWreLzpJgYyTWpPggb8MTd2CVgoOQiE8DGeyyXLGlVro',
            imageAlt: 'Japanese salad with avocado and cucumber',
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
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDxhTKQnbVX-6sB3PwpG-_b4NyZJzLCZt9Jd76X8Pg7JsERy7zMDBnwZqWMm5GhhKpEuCkRzYijLY6ULplPnabQarGTm6O7VTcmFkqCYW8-nZjh_A4yYzn-8FKrwzxS4gRFW26W1MvuTiEZplUX6fBV1T0huU9UY0OkFJ9M9Y7G4jQl7kem2BWOZ2GdrTkyWkdnCCI5VRInW0pL79_AkDDAgCXsvBBBZHeBBYN5RWuKz8ZTs-Ly-vsXTiLnCq93R3W5li_qek6TQwM',
          imageAlt: 'Signature sushi roll platter',
          badgeLabel: 'House Favorite',
        },
        items: [
          {
            name: 'Torched Salmon Maki',
            description:
              'Aburi salmon, cucumber, and wasabi aioli with a soy caramel glaze.',
            price: '$18.00',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuA4TPMs6CJAwb38XldJYGJJVm87pphR91ixtGOu-YcZRufDNacZtdqYJ1Sy-KDTeHdRl0jPqQVGyfQFczCkOfSXNVTyE1OiQfF2ur6DdVX-4Y6W8pKM8IU-_HIHXUbEzSZCDQVx2Vmtn5XTSVIHupfuKosc9WaAGTqLpZitkPBI-i8TSgqR_SF-_YVQAtQ6k2pt86xpe8zRgDqGh8uc5PEAA0-iMf6bn480PbdWbI82KZwr8M5mViX1blYIldHdO5y9xKBZAUffaJE',
            imageAlt: 'Torched salmon maki on a ceramic plate',
            alertIcon: true,
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
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCpH4tZc7hkb0IRjHD54KaHTjXzzolMv4N2C47HR9a3HU131ToSaIZMqFEY9Uw9G4wNKJLo_JnfCjZI3uIVNxeb7Ff2AcktBQOkHP66hpGVc63WS-TV7evysTv69-Fi-0C7-NR3zMqV9KP9qDlXcDLIyH7gkU5MOMcvv8eKxnqyV4lUGUYBevOEJ9LUJN5GTlJmd_2J-ULn1dtzH-kV_9uOuQGwcIkDszG0cwZc5sVTBfWxG6BXavUlaVophlAexhszLdrOtBaYHIk',
            imageAlt: 'Matcha cheesecake with caramelized top',
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
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDvwu7ipiHPyiuirAi03k3L9IR45mXQnYqD3u_VCa5YJB7wH4TUF5-RGy-FZkljnfJdTVvR6v9InbYi2Jun6-5bXhFg85nwpjAA_ofAP2jBY4iBOJ1XKnV8N-TkpuBuu51T8yWBpi5fMjZANPfMPHeVo-99bEgwSwgpQ9wj_n4_aKnLWKbdCqWvErmucT3o5AmjtD88G8fKfoBqX7q_j_EFyjH1ciTax-RuXunqKUCuBTUIFuYrnglATbFko6flBF9n9D0LERt0pec',
          imageAlt: 'Double smash burger with melted cheese',
          badgeLabel: 'Best Seller',
        },
        items: [
          {
            name: 'Classic Haven',
            description:
              'Single patty burger with house pickles, lettuce, tomato, and comeback sauce.',
            price: '$13.50',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDvwu7ipiHPyiuirAi03k3L9IR45mXQnYqD3u_VCa5YJB7wH4TUF5-RGy-FZkljnfJdTVvR6v9InbYi2Jun6-5bXhFg85nwpjAA_ofAP2jBY4iBOJ1XKnV8N-TkpuBuu51T8yWBpi5fMjZANPfMPHeVo-99bEgwSwgpQ9wj_n4_aKnLWKbdCqWvErmucT3o5AmjtD88G8fKfoBqX7q_j_EFyjH1ciTax-RuXunqKUCuBTUIFuYrnglATbFko6flBF9n9D0LERt0pec',
            imageAlt: 'Single patty burger with lettuce and tomato',
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
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuATV2Ee2gDfIPmAZwvhTm5T80zTvH7S1de3GOwXAFnvKu_zJNj5YVlsz7XjXT70nAqgyTnDIupXANe1znZiBK3LGLLzI48Kb3W6_lGuvNNj1c5F9Ezb8mU5PhHQg74bpf06G87bNqhUAO_XPAmX7lORIVUnxSTR375wLTQz3mQq703JGtAoBPmAuGLlkQSGCjO4EWVlYx2CvZHGIuIX7XIzLGoEu6OuCn75FrSe8u8ZscRkoOjTIyZ97XlLK7ceODE80HXe-QVSdKo',
            imageAlt: 'Crispy fries in a serving basket',
          },
          {
            name: 'Crispy Onion Rings',
            description:
              'Beer-battered onion rings with roasted garlic ranch.',
            price: '$6.50',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAxtIwUDrWA_eUeqKocz0fSX16tTAIytIN-Mq7r0_k2OGR7s-cq0NCW33p7zjNo6loYemmpjx7NEPQqTCtiDgaGTT-6hW3q6YHSf5fcnNotFXjdHqnFnrSgpeEBVd5t30clg_TkpiTbpr8mFJXt59scbqzb4RgHnKARd2k6_paTpRNCiG3suzl8EIlewKBMUt9O4thyU-M_T0nzjZYLRJZX0cot_kPaXvbNGc9zySpzZgJkBGtERdDOji3DBzGjYBAhDF7aIVOI6O4',
            imageAlt: 'Onion rings with a creamy dipping sauce',
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
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCpH4tZc7hkb0IRjHD54KaHTjXzzolMv4N2C47HR9a3HU131ToSaIZMqFEY9Uw9G4wNKJLo_JnfCjZI3uIVNxeb7Ff2AcktBQOkHP66hpGVc63WS-TV7evysTv69-Fi-0C7-NR3zMqV9KP9qDlXcDLIyH7gkU5MOMcvv8eKxnqyV4lUGUYBevOEJ9LUJN5GTlJmd_2J-ULn1dtzH-kV_9uOuQGwcIkDszG0cwZc5sVTBfWxG6BXavUlaVophlAexhszLdrOtBaYHIk',
            imageAlt: 'Salted caramel milkshake in a glass',
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
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAxtIwUDrWA_eUeqKocz0fSX16tTAIytIN-Mq7r0_k2OGR7s-cq0NCW33p7zjNo6loYemmpjx7NEPQqTCtiDgaGTT-6hW3q6YHSf5fcnNotFXjdHqnFnrSgpeEBVd5t30clg_TkpiTbpr8mFJXt59scbqzb4RgHnKARd2k6_paTpRNCiG3suzl8EIlewKBMUt9O4thyU-M_T0nzjZYLRJZX0cot_kPaXvbNGc9zySpzZgJkBGtERdDOji3DBzGjYBAhDF7aIVOI6O4',
            imageAlt: 'Burrata with herbs and toasted bread',
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
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDSKAcwn7mMURkFt8Qr6wbP7rSvtRDpX3fstIkkL6a7ASGxtpqEDXnevAcm2x9syJKJkIES2TkBoC6AZfPaTbC5xwO-IuvsCbF4SmOFmTzHC9SQdR-lUleahnu0z6x4bi1YEE9xXFNYCfFS93RzfJ17APwFMEbs7HbQCbOOAm_78JHFf3Reujct8GnLC61iUuiA2tgTmMJ6PVOe_rgYQkZ0whv4WlZTHA5VxNDLxdomWIWmkGTMkRhWwb_GmTnp9W_8GXsZUCkTh5Y',
          imageAlt: 'Fresh tagliatelle coated in mushroom cream sauce',
          badgeLabel: 'House Specialty',
        },
        items: [
          {
            name: 'Cacio e Pepe',
            description:
              'Tonnarelli pasta tossed with pecorino romano and cracked black pepper.',
            price: '$21.00',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDSKAcwn7mMURkFt8Qr6wbP7rSvtRDpX3fstIkkL6a7ASGxtpqEDXnevAcm2x9syJKJkIES2TkBoC6AZfPaTbC5xwO-IuvsCbF4SmOFmTzHC9SQdR-lUleahnu0z6x4bi1YEE9xXFNYCfFS93RzfJ17APwFMEbs7HbQCbOOAm_78JHFf3Reujct8GnLC61iUuiA2tgTmMJ6PVOe_rgYQkZ0whv4WlZTHA5VxNDLxdomWIWmkGTMkRhWwb_GmTnp9W_8GXsZUCkTh5Y',
            imageAlt: 'Pasta twirled in a creamy pecorino sauce',
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
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCpH4tZc7hkb0IRjHD54KaHTjXzzolMv4N2C47HR9a3HU131ToSaIZMqFEY9Uw9G4wNKJLo_JnfCjZI3uIVNxeb7Ff2AcktBQOkHP66hpGVc63WS-TV7evysTv69-Fi-0C7-NR3zMqV9KP9qDlXcDLIyH7gkU5MOMcvv8eKxnqyV4lUGUYBevOEJ9LUJN5GTlJmd_2J-ULn1dtzH-kV_9uOuQGwcIkDszG0cwZc5sVTBfWxG6BXavUlaVophlAexhszLdrOtBaYHIk',
            imageAlt: 'Slice of tiramisu dusted with cocoa',
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
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAxtIwUDrWA_eUeqKocz0fSX16tTAIytIN-Mq7r0_k2OGR7s-cq0NCW33p7zjNo6loYemmpjx7NEPQqTCtiDgaGTT-6hW3q6YHSf5fcnNotFXjdHqnFnrSgpeEBVd5t30clg_TkpiTbpr8mFJXt59scbqzb4RgHnKARd2k6_paTpRNCiG3suzl8EIlewKBMUt9O4thyU-M_T0nzjZYLRJZX0cot_kPaXvbNGc9zySpzZgJkBGtERdDOji3DBzGjYBAhDF7aIVOI6O4',
            imageAlt: 'Crispy arancini with red sauce',
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
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuA4fzsQng7votEQN84BtOYADwQjnIHnc8PcBjG9G6A7sgzd0lJ-bUBRlCbVX8vZrjONDWOWrqZ3E4Wf26ObUq5-aex5y-Bg3HEyO4rb9UNmXum-7Y7WZL6yB9rc-FlJjLjc2d_ju3mtHdqu2TlnTx_AWRqq3BThh7JKcmCzL4JpuhoQX96qG2iQRSPhWtZHANtqZ_hs8l-nY99gOjhEAJg6XtqkDhKBQv0iQfjok7iRvCwyC2w4FJkQr7aQv0YM5laNGMaru23PbKw',
          imageAlt: 'Margherita pizza topped with burrata',
          badgeLabel: "Editor's Pick",
        },
        items: [
          {
            name: 'Spicy Diavola',
            description:
              'Fior di latte, spicy salami, honey-fermented chilies, and oregano.',
            price: '$22.50',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCF8tMsimKProTSfGeCtER7FZw4Dlgs8SbSQE3MX_kkPhUmjymSsDP8sI-7bFOJu-dERR-Zj6ZMy7lShKH0PHwFDWVdPjC8RRS5C4EWL4KABTw-ksQJJUwFbyRIjN7H4UHn7-ElJS927X9GxwGvxaxCYvhe3YoQFTKHjNTFo9yY7Vk29fsPaz7PVszhikr2SZiOtWI17Z6jiczqUsGoYyLk_QtkLC7gml-11qwBxHXV8_TH1rSunlhAwLQyTWL1iycquGZrUun3Qxs',
            imageAlt: 'Spicy salami pizza with charred crust',
            alertIcon: true,
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
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCpH4tZc7hkb0IRjHD54KaHTjXzzolMv4N2C47HR9a3HU131ToSaIZMqFEY9Uw9G4wNKJLo_JnfCjZI3uIVNxeb7Ff2AcktBQOkHP66hpGVc63WS-TV7evysTv69-Fi-0C7-NR3zMqV9KP9qDlXcDLIyH7gkU5MOMcvv8eKxnqyV4lUGUYBevOEJ9LUJN5GTlJmd_2J-ULn1dtzH-kV_9uOuQGwcIkDszG0cwZc5sVTBfWxG6BXavUlaVophlAexhszLdrOtBaYHIk',
            imageAlt: 'Cannoli with pistachios and powdered sugar',
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
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAxtIwUDrWA_eUeqKocz0fSX16tTAIytIN-Mq7r0_k2OGR7s-cq0NCW33p7zjNo6loYemmpjx7NEPQqTCtiDgaGTT-6hW3q6YHSf5fcnNotFXjdHqnFnrSgpeEBVd5t30clg_TkpiTbpr8mFJXt59scbqzb4RgHnKARd2k6_paTpRNCiG3suzl8EIlewKBMUt9O4thyU-M_T0nzjZYLRJZX0cot_kPaXvbNGc9zySpzZgJkBGtERdDOji3DBzGjYBAhDF7aIVOI6O4',
            imageAlt: 'Roasted cauliflower with ricotta and herbs',
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
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCFEFzzxCf0q9vqj728UczmiLxospQgzSiUpe40bFujO8meHL4JmlzBQMqftSfzj4bk9N37qSHhFK_qOtr0vQSmPgJqI-8ucOi52vK1ioAjyWyMXbYYzBSLJNOt5nvd43tzX6rsTVQ-ntbanxa03PyvPqmtSWunCZztvK4xlUjiSbMQ938iGIv1qZ08AfSOUKAps65LWnATYv22gD28_yCpJtN_NAWvnjWpH57AuMZA6e9TfL5YqI812dBENNz4I9qLoqVAZuS6rPc',
          imageAlt: 'Pepperoni pizza sliced on a serving board',
          badgeLabel: 'Fast Mover',
        },
        items: [
          {
            name: 'Roasted Garlic Bianca',
            description:
              'Mozzarella, garlic cream, rosemary potatoes, and pecorino.',
            price: '$20.00',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCF8tMsimKProTSfGeCtER7FZw4Dlgs8SbSQE3MX_kkPhUmjymSsDP8sI-7bFOJu-dERR-Zj6ZMy7lShKH0PHwFDWVdPjC8RRS5C4EWL4KABTw-ksQJJUwFbyRIjN7H4UHn7-ElJS927X9GxwGvxaxCYvhe3YoQFTKHjNTFo9yY7Vk29fsPaz7PVszhikr2SZiOtWI17Z6jiczqUsGoYyLk_QtkLC7gml-11qwBxHXV8_TH1rSunlhAwLQyTWL1iycquGZrUun3Qxs',
            imageAlt: 'White pizza with herbs and roasted garlic',
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
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCpH4tZc7hkb0IRjHD54KaHTjXzzolMv4N2C47HR9a3HU131ToSaIZMqFEY9Uw9G4wNKJLo_JnfCjZI3uIVNxeb7Ff2AcktBQOkHP66hpGVc63WS-TV7evysTv69-Fi-0C7-NR3zMqV9KP9qDlXcDLIyH7gkU5MOMcvv8eKxnqyV4lUGUYBevOEJ9LUJN5GTlJmd_2J-ULn1dtzH-kV_9uOuQGwcIkDszG0cwZc5sVTBfWxG6BXavUlaVophlAexhszLdrOtBaYHIk',
            imageAlt: 'Chocolate pudding with hazelnuts',
          },
        ],
      },
    ],
  },
};

export { restaurantMenus };
