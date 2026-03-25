import type { Restaurant } from '../types';

const restaurants: Restaurant[] = [
  {
    id: "heritage-kitchen",
    name: "The Heritage Kitchen",
    cuisine: "Mediterranean Comfort",
    about:
      "Experience the finest Mediterranean culinary traditions crafted with passion and fresh, locally sourced ingredients. Our chefs bring years of expertise to every dish, ensuring an unforgettable dining experience.",
    hours: "Mon-Sun: 11:00 AM - 10:00 PM",
    address: "124 Culinary Ave, Food District, FD 10001",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSKAcwn7mMURkFt8Qr6wbP7rSvtRDpX3fstIkkL6a7ASGxtpqEDXnevAcm2x9syJKJkIES2TkBoC6AZfPaTbC5xwO-IuvsCbF4SmOFmTzHC9SQdR-lUleahnu0z6x4bi1YEE9xXFNYCfFS93RzfJ17APwFMEbs7HbQCbOOAm_78JHFf3Reujct8GnLC61iUuiA2tgTmMJ6PVOe_rgYQkZ0whv4WlZTHA5VxNDLxdomWIWmkGTMkRhWwb_GmTnp9W_8GXsZUCkTh5Y",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCF8tMsimKProTSfGeCtER7FZw4Dlgs8SbSQE3MX_kkPhUmjymSsDP8sI-7bFOJu-dERR-Zj6ZMy7lShKH0PHwFDWVdPjC8RRS5C4EWL4KABTw-ksQJJUwFbyRIjN7H4UHn7-ElJS927X9GxwGvxaxCYvhe3YoQFTKHjNTFo9yY7Vk29fsPaz7PVszhikr2SZiOtWI17Z6jiczqUsGoYyLk_QtkLC7gml-11qwBxHXV8_TH1rSunlhAwLQyTWL1iycquGZrUun3Qxs",
    ],
    reviews: [
      { id: "1", author: "Alex J.", rating: 5, text: "Absolutely fantastic! The flavors were perfectly balanced and the service was amazing.", date: "2 days ago" },
      { id: "2", author: "Sam T.", rating: 4, text: "Great food and quick delivery. The meats were tender and perfectly seasoned.", date: "1 week ago" },
    ],
    priceTier: "$$",
    rating: "4.9",
    ratingCountLabel: "980+",
    deliveryTime: "20-30 min",
    deliveryFeeLabel: "Free Delivery",
    safetyLabel: "Farm Assured",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAD25ttG6SC-8VnapaRPDCPvGq9EiPDgWxDX4bj0lameAu2wiky4dQxNJnmb8IVxVQDHK7z6bSqAgl12lSUKiWIQLKsVSRQ8tpwRQVi6s2HLDhfYgKIFS7P2Ppg-seVm_61eWJr5RMnartyaMC6JWalsKs_F-JymEkmJ6gsAVSW7BuX7BdHfW6Tl_DE9AzAVC7iYd8dMFsot3GfymotAWlgIiylVSYS5TNEnCPcVlKERwvzVbR-G0CnA4MaBSbTlmiEOPf_gJ6XODA",
    cardImageAlt: "Roasted lamb and mezze spread on a rustic wooden table",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSKAcwn7mMURkFt8Qr6wbP7rSvtRDpX3fstIkkL6a7ASGxtpqEDXnevAcm2x9syJKJkIES2TkBoC6AZfPaTbC5xwO-IuvsCbF4SmOFmTzHC9SQdR-lUleahnu0z6x4bi1YEE9xXFNYCfFS93RzfJ17APwFMEbs7HbQCbOOAm_78JHFf3Reujct8GnLC61iUuiA2tgTmMJ6PVOe_rgYQkZ0whv4WlZTHA5VxNDLxdomWIWmkGTMkRhWwb_GmTnp9W_8GXsZUCkTh5Y",
    heroImageAlt: "Warm restaurant hero image with plated Mediterranean dishes",
    heroImageTitle: "Braised dishes and fresh herbs on a chef tasting table",
    heroBadge: {
      label: "Weekend Favorite",
      icon: "stars",
    },
  },
  {
    id: "sakura-bloom",
    name: "Sakura Bloom",
    cuisine: "Contemporary Japanese",
    priceTier: "$$",
    rating: "4.7",
    ratingCountLabel: "640+",
    deliveryTime: "15-25 min",
    deliveryFeeLabel: "$3.99 delivery",
    safetyLabel: "Ocean Traceable",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxhTKQnbVX-6sB3PwpG-_b4NyZJzLCZt9Jd76X8Pg7JsERy7zMDBnwZqWMm5GhhKpEuCkRzYijLY6ULplPnabQarGTm6O7VTcmFkqCYW8-nZjh_A4yYzn-8FKrwzxS4gRFW26W1MvuTiEZplUX6fBV1T0huU9UY0OkFJ9M9Y7G4jQl7kem2BWOZ2GdrTkyWkdnCCI5VRInW0pL79_AkDDAgCXsvBBBZHeBBYN5RWuKz8ZTs-Ly-vsXTiLnCq93R3W5li_qek6TQwM",
    cardImageAlt: "Sushi platter with salmon, tuna, and garnishes",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKC12K85qCJiDwqTWfBpfpcCqGHuXd_NWqgVzCXKfprOiG4_QXsFfPgu_s4vU3hwiLGMas9QGNT2dsT7FErrk-KVXG122p7bYbNHCsV-B5DuMWwzQKBnuwD8O8959Fo3sCL9ZPK-tcrc1EKCFxW0cFFcL4uh4dFqnPDNn_OdQcwY60-SMSut51rrwoaw-f-jka8p4gCZ010C3ppzQ33bciF_KUomdb5GTXuDac5MbZeuyjVxZ-aJDoPlKw1HtZ6MKBU62jgfGxfOY",
    heroImageAlt: "Fine dining Japanese seafood plate with bright citrus accents",
    heroImageTitle: "Minimalist Japanese plating with seared seafood",
    heroBadge: {
      label: "Omakase Spotlight",
      icon: "stars",
    },
  },
  {
    id: "burger-haven",
    name: "Burger Haven",
    cuisine: "Signature Burgers",
    priceTier: "$",
    rating: "4.5",
    ratingCountLabel: "1.4k+",
    deliveryTime: "10-20 min",
    deliveryFeeLabel: "$2.49 delivery",
    safetyLabel: "Fresh Ground Daily",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvwu7ipiHPyiuirAi03k3L9IR45mXQnYqD3u_VCa5YJB7wH4TUF5-RGy-FZkljnfJdTVvR6v9InbYi2Jun6-5bXhFg85nwpjAA_ofAP2jBY4iBOJ1XKnV8N-TkpuBuu51T8yWBpi5fMjZANPfMPHeVo-99bEgwSwgpQ9wj_n4_aKnLWKbdCqWvErmucT3o5AmjtD88G8fKfoBqX7q_j_EFyjH1ciTax-RuXunqKUCuBTUIFuYrnglATbFko6flBF9n9D0LERt0pec",
    cardImageAlt: "Double burger with fries and a toasted brioche bun",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvwu7ipiHPyiuirAi03k3L9IR45mXQnYqD3u_VCa5YJB7wH4TUF5-RGy-FZkljnfJdTVvR6v9InbYi2Jun6-5bXhFg85nwpjAA_ofAP2jBY4iBOJ1XKnV8N-TkpuBuu51T8yWBpi5fMjZANPfMPHeVo-99bEgwSwgpQ9wj_n4_aKnLWKbdCqWvErmucT3o5AmjtD88G8fKfoBqX7q_j_EFyjH1ciTax-RuXunqKUCuBTUIFuYrnglATbFko6flBF9n9D0LERt0pec",
    heroImageAlt: "Burger and fries with dramatic low-key lighting",
    heroImageTitle: "Burger stack with fries and house sauce",
    heroBadge: {
      label: "Fan Favorite",
      icon: "stars",
    },
  },
  {
    id: "vero-italiano",
    name: "Vero Italiano",
    cuisine: "Traditional Italian",
    priceTier: "$$$",
    rating: "4.8",
    ratingCountLabel: "1.1k+",
    deliveryTime: "25-35 min",
    deliveryFeeLabel: "$4.99 delivery",
    safetyLabel: "Handmade Daily",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCF8tMsimKProTSfGeCtER7FZw4Dlgs8SbSQE3MX_kkPhUmjymSsDP8sI-7bFOJu-dERR-Zj6ZMy7lShKH0PHwFDWVdPjC8RRS5C4EWL4KABTw-ksQJJUwFbyRIjN7H4UHn7-ElJS927X9GxwGvxaxCYvhe3YoQFTKHjNTFo9yY7Vk29fsPaz7PVszhikr2SZiOtWI17Z6jiczqUsGoYyLk_QtkLC7gml-11qwBxHXV8_TH1rSunlhAwLQyTWL1iycquGZrUun3Qxs",
    cardImageAlt: "Neapolitan pizza with blistered crust and basil leaves",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFEFzzxCf0q9vqj728UczmiLxospQgzSiUpe40bFujO8meHL4JmlzBQMqftSfzj4bk9N37qSHhFK_qOtr0vQSmPgJqI-8ucOi52vK1ioAjyWyMXbYYzBSLJNOt5nvd43tzX6rsTVQ-ntbanxa03PyvPqmtSWunCZztvK4xlUjiSbMQ938iGIv1qZ08AfSOUKAps65LWnATYv22gD28_yCpJtN_NAWvnjWpH57AuMZA6e9TfL5YqI812dBENNz4I9qLoqVAZuS6rPc",
    heroImageAlt: "Wood-fired pizza and pasta arranged on a stone counter",
    heroImageTitle: "Italian menu spread beside an oven-fired pizza",
    heroBadge: {
      label: "Pasta Atelier",
      icon: "stars",
    },
    searchBadge: {
      label: "New Arrival",
      icon: "new_releases",
      className: "bg-primary-container/50 text-on-primary-container",
      iconClassName: "text-on-primary-container",
    },
  },
  {
    id: "bella-vita-trattoria",
    name: "Bella Vita Trattoria",
    cuisine: "Traditional Italian",
    priceTier: "$$$",
    rating: "4.9",
    ratingCountLabel: "1.6k+",
    deliveryTime: "15-25 min",
    deliveryFeeLabel: "Free Delivery",
    safetyLabel: "Slow Fermented Dough",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4fzsQng7votEQN84BtOYADwQjnIHnc8PcBjG9G6A7sgzd0lJ-bUBRlCbVX8vZrjONDWOWrqZ3E4Wf26ObUq5-aex5y-Bg3HEyO4rb9UNmXum-7Y7WZL6yB9rc-FlJjLjc2d_ju3mtHdqu2TlnTx_AWRqq3BThh7JKcmCzL4JpuhoQX96qG2iQRSPhWtZHANtqZ_hs8l-nY99gOjhEAJg6XtqkDhKBQv0iQfjok7iRvCwyC2w4FJkQr7aQv0YM5laNGMaru23PbKw",
    cardImageAlt: "Margherita pizza with fresh mozzarella and basil",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4fzsQng7votEQN84BtOYADwQjnIHnc8PcBjG9G6A7sgzd0lJ-bUBRlCbVX8vZrjONDWOWrqZ3E4Wf26ObUq5-aex5y-Bg3HEyO4rb9UNmXum-7Y7WZL6yB9rc-FlJjLjc2d_ju3mtHdqu2TlnTx_AWRqq3BThh7JKcmCzL4JpuhoQX96qG2iQRSPhWtZHANtqZ_hs8l-nY99gOjhEAJg6XtqkDhKBQv0iQfjok7iRvCwyC2w4FJkQr7aQv0YM5laNGMaru23PbKw",
    heroImageAlt: "Classic Italian trattoria pizza on a marble counter",
    heroImageTitle: "Neapolitan pizza with basil and olive oil",
    heroBadge: {
      label: "Chef Curated",
      icon: "stars",
    },
    searchBadge: {
      label: "Curator's Choice",
      icon: "verified",
      className: "bg-white/40 text-on-tertiary-container",
      iconClassName: "text-tertiary",
    },
  },
  {
    id: "forno-brace",
    name: "Forno & Brace",
    cuisine: "Artisanal Wood-fired",
    priceTier: "$$",
    rating: "4.8",
    ratingCountLabel: "890+",
    deliveryTime: "10-20 min",
    deliveryFeeLabel: "$2.99 delivery",
    safetyLabel: "Stone Oven Fresh",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFEFzzxCf0q9vqj728UczmiLxospQgzSiUpe40bFujO8meHL4JmlzBQMqftSfzj4bk9N37qSHhFK_qOtr0vQSmPgJqI-8ucOi52vK1ioAjyWyMXbYYzBSLJNOt5nvd43tzX6rsTVQ-ntbanxa03PyvPqmtSWunCZztvK4xlUjiSbMQ938iGIv1qZ08AfSOUKAps65LWnATYv22gD28_yCpJtN_NAWvnjWpH57AuMZA6e9TfL5YqI812dBENNz4I9qLoqVAZuS6rPc",
    cardImageAlt: "Wood-fired pepperoni pizza fresh from the oven",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFEFzzxCf0q9vqj728UczmiLxospQgzSiUpe40bFujO8meHL4JmlzBQMqftSfzj4bk9N37qSHhFK_qOtr0vQSmPgJqI-8ucOi52vK1ioAjyWyMXbYYzBSLJNOt5nvd43tzX6rsTVQ-ntbanxa03PyvPqmtSWunCZztvK4xlUjiSbMQ938iGIv1qZ08AfSOUKAps65LWnATYv22gD28_yCpJtN_NAWvnjWpH57AuMZA6e9TfL5YqI812dBENNz4I9qLoqVAZuS6rPc",
    heroImageAlt: "Fresh pizza slices arranged near a stone oven",
    heroImageTitle: "Wood-fired pizza cooling on a metal rack",
    heroBadge: {
      label: "Wood-fired Daily",
      icon: "stars",
    },
  },
  {
    id: "spice-route",
    name: "Spice Route",
    cuisine: "Modern Indian",
    priceTier: "$$$",
    rating: "4.8",
    ratingCountLabel: "720+",
    deliveryTime: "25-40 min",
    deliveryFeeLabel: "$4.49 delivery",
    safetyLabel: "Halal Certified",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLpujvp0IA7gE9ve_P9C-tg26Za3nQX8seJ81H99cQGZVZ_ovZdGq_CaQOVH5meMjMG2OGW7qdiLH_kUbqQVsWVxJojRHc74ZDBqPmUTO0V70NXlCWb1yhvijvZafuFmuUDVcW2Hk170BUCTSVXd9qLsyCj-kgoWIfnoZHAuMCNxzAalzKzKaAaGP5G5dauUnwbBrYIfkftClAZPzKYHUDLt1QToC4J8So5gdwsevlrf4BnsTUxVsDqj-uWYyx60lSZo3YcHzR0is",
    cardImageAlt: "Aromatic lamb curry in a copper bowl with naan",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLpujvp0IA7gE9ve_P9C-tg26Za3nQX8seJ81H99cQGZVZ_ovZdGq_CaQOVH5meMjMG2OGW7qdiLH_kUbqQVsWVxJojRHc74ZDBqPmUTO0V70NXlCWb1yhvijvZafuFmuUDVcW2Hk170BUCTSVXd9qLsyCj-kgoWIfnoZHAuMCNxzAalzKzKaAaGP5G5dauUnwbBrYIfkftClAZPzKYHUDLt1QToC4J8So5gdwsevlrf4BnsTUxVsDqj-uWYyx60lSZo3YcHzR0is",
    heroImageAlt: "Indian feast spread with curries and breads",
    heroImageTitle: "Spiced lamb and fresh naan on a saffron-draped table",
    heroBadge: {
      label: "Tandoor Fresh",
      icon: "stars",
    },
    searchBadge: {
      label: "New Arrival",
      icon: "new_releases",
      className: "bg-primary-container/50 text-on-primary-container",
      iconClassName: "text-on-primary-container",
    },
  },
  {
    id: "seoul-bowl",
    name: "Seoul Bowl",
    cuisine: "Contemporary Korean",
    priceTier: "$$",
    rating: "4.6",
    ratingCountLabel: "510+",
    deliveryTime: "15-25 min",
    deliveryFeeLabel: "$2.99 delivery",
    safetyLabel: "House-Fermented",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARxURdYlCEbFNERnCpgU3OsyDtkZi4iZtoDVRFc7ToxMzuWgVon1O2Nht8PJiMCs5aBkVJ8pJW_8sCjHvz1kHlL4H2GDBtCw6RQkb9HsYDTvObi4kW9lj19VpQ5KdaoupfRAjJvk6lghn5MM65g06cATD_INweNmEf1J8hG12DnKPBW99IDB5Rej8Qpyv5TNQ0fE93lzywfK53OpPfxyUInHH6MGGnn4TjWreLzpJgYyTWpPggb8MTd2CVgoOQiE8DGeyyXLGlVro",
    cardImageAlt: "Korean bibimbap bowl with colourful vegetables and beef",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARxURdYlCEbFNERnCpgU3OsyDtkZi4iZtoDVRFc7ToxMzuWgVon1O2Nht8PJiMCs5aBkVJ8pJW_8sCjHvz1kHlL4H2GDBtCw6RQkb9HsYDTvObi4kW9lj19VpQ5KdaoupfRAjJvk6lghn5MM65g06cATD_INweNmEf1J8hG12DnKPBW99IDB5Rej8Qpyv5TNQ0fE93lzywfK53OpPfxyUInHH6MGGnn4TjWreLzpJgYyTWpPggb8MTd2CVgoOQiE8DGeyyXLGlVro",
    heroImageAlt: "Korean rice bowls and banchan on a wooden table",
    heroImageTitle: "Wagyu bulgogi and pickled banchan arranged on slate",
    heroBadge: {
      label: "K-Food Rising",
      icon: "stars",
    },
  },
  {
    id: "olive-vine",
    name: "Olive & Vine",
    cuisine: "Greek Mediterranean",
    priceTier: "$$",
    rating: "4.7",
    ratingCountLabel: "430+",
    deliveryTime: "20-30 min",
    deliveryFeeLabel: "Free Delivery",
    safetyLabel: "Import Certified",
    cardImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAD25ttG6SC-8VnapaRPDCPvGq9EiPDgWxDX4bj0lameAu2wiky4dQxNJnmb8IVxVQDHK7z6bSqAgl12lSUKiWIQLKsVSRQ8tpwRQVi6s2HLDhfYgKIFS7P2Ppg-seVm_61eWJr5RMnartyaMC6JWalsKs_F-JymEkmJ6gsAVSW7BuX7BdHfW6Tl_DE9AzAVC7iYd8dMFsot3GfymotAWlgIiylVSYS5TNEnCPcVlKERwvzVbR-G0CnA4MaBSbTlmiEOPf_gJ6XODA",
    cardImageAlt: "Greek mezedes spread with olives and grilled octopus",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAD25ttG6SC-8VnapaRPDCPvGq9EiPDgWxDX4bj0lameAu2wiky4dQxNJnmb8IVxVQDHK7z6bSqAgl12lSUKiWIQLKsVSRQ8tpwRQVi6s2HLDhfYgKIFS7P2Ppg-seVm_61eWJr5RMnartyaMC6JWalsKs_F-JymEkmJ6gsAVSW7BuX7BdHfW6Tl_DE9AzAVC7iYd8dMFsot3GfymotAWlgIiylVSYS5TNEnCPcVlKERwvzVbR-G0CnA4MaBSbTlmiEOPf_gJ6XODA",
    heroImageAlt: "Mediterranean table with lamb kleftiko and mezedes",
    heroImageTitle: "Slow-roasted lamb and vine leaves on a stone terrace",
    heroBadge: {
      label: "Aegean Inspired",
      icon: "stars",
    },
    searchBadge: {
      label: "Curator's Choice",
      icon: "verified",
      className: "bg-white/40 text-on-tertiary-container",
      iconClassName: "text-tertiary",
    },
  },
];

const homeCategories = [
  {
    id: "pizza",
    name: "Pizza",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9WvYbgsn1tjhIzkyRIoR2s7MQHIhkBSuE8on9bpnqq0G9coRVveq_q8jpZ09YFCHyK6ka__M6HVCZF-80vwVkXgmEnIJksjennbmdasnUbM9HzxuvHHGwiCYRu80kV8cgXrKFoa58x7Z09eVI9jAmZsvawFIRRVdiPsUx0kLO5YzkuGEkleAVP5WT8CzmusWbPurnmfGH-ZF-aYFTq-uSBTGEJosen3xuQevwyo_9ubgQnfOVNNH1psh4tY1PhbnRCeHfzAtUfRU",
    bgClassName: "bg-primary-container",
  },
  {
    id: "sushi",
    name: "Sushi",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4TPMs6CJAwb38XldJYGJJVm87pphR91ixtGOu-YcZRufDNacZtdqYJ1Sy-KDTeHdRl0jPqQVGyfQFczCkOfSXNVTyE1OiQfF2ur6DdVX-4Y6W8pKM8IU-_HIHXUbEzSZCDQVx2Vmtn5XTSVIHupfuKosc9WaAGTqLpZitkPBI-i8TSgqR_SF-_YVQAtQ6k2pt86xpe8zRgDqGh8uc5PEAA0-iMf6bn480PbdWbI82KZwr8M5mViX1blYIldHdO5y9xKBZAUffaJE",
    bgClassName: "bg-tertiary-container",
  },
  {
    id: "burgers",
    name: "Burgers",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDRagbTdCwn71CjId3G-qc_PI8qB_F3vIkldlvOpIy7KgyXQoOkV9JG4zFdpPIrXDcRhXIOwnobxfq_56EsLHb6fsWhQu_amjBzPrOyYP8qoprimF_DApFndDEkKlDEtycxesGxV8-eNDbU9zAXNSjKpe7zbzggGS3hodHRr4KOZ0qiC2HuMVaP0E-IKfnuDPOOSb06k0oz-P7axX_ulmZ_nk1GSReo8bUUjgRlaOf4SdcWZMUEM3qo7IFpgbZPuuepiLOn7sKu8DI",
    bgClassName: "bg-surface-container-high",
  },
  { id: "asian", name: "Asian", icon: "restaurant_menu", bgClassName: "bg-surface-container-low" },
  { id: "coffee", name: "Coffee", icon: "local_cafe", bgClassName: "bg-surface-container-low" },
  { id: "bakery", name: "Bakery", icon: "bakery_dining", bgClassName: "bg-surface-container-low" },
];

const homeFeedConfig = {
  addressLabel: "Home \u2022 124 Park Ave",
  promo: {
    title: "Weekend Feast",
    subtitle: "30% off on all family platters",
    icon: "celebration",
  },
  restaurantIds: ["heritage-kitchen", "sakura-bloom", "burger-haven", "vero-italiano", "spice-route", "seoul-bowl", "olive-vine"],
};

const searchResultsConfig = {
  queryIcon: "local_pizza",
  queryTitle: "Artisan Italian Pizza",
  querySubtitle: "Searching for",
  restaurantIds: ["bella-vita-trattoria", "vero-italiano", "forno-brace", "olive-vine"],
  filters: [{ label: "Rating 4.5+", icon: "star", active: true, filled: true }, { label: "Price $$" }, { label: "Fastest Delivery", icon: "speed" }, { label: "Vegetarian" }],
};

export { homeCategories, homeFeedConfig, restaurants, searchResultsConfig };
