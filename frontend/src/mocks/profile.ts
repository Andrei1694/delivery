const recentOrders = [
  {
    orderId: '8818',
    restaurantId: 'vero-italiano',
    name: 'Artisan Pizzeria',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUcN_PLhQHknRpbxZt9QR3fJOy4-59_rufK4kWq-gbKxVZHrOK2fUJSB4OaBxj5hF1_LufzCWSyIHeAlpogOXqogbdeho_XFCztlchLx_HZv_F8zoYSPME5l-NIUOfZCc3FpUGJ3ZbB_KGWv8HNWspv2XymXP1QydiGcF5sS1_5hlWqUqcWq9vH2di1W1HWTaEDlbxF_tydlBMknrTybSD4r1AKyI3G5wnOyOPJBNIve4osWHwtIjgW-yPfUlXvfpieLXtuTVdgn4',
    summary: '3 items • $34.20',
    status: 'Delivered',
  },
  {
    orderId: '8807',
    restaurantId: 'seoul-bowl',
    name: 'Seoul Bowl',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA5zsPXrJ3-yR4grc-Y76sKgywdO0O0IOx_JbvHJiRqD9KmsY4zp3l0jQqGWqkIf0bGQn-VozLY9ZIuKl-bJoUh7ZrRFF1gBtNIMYchbGEKQDdFl_9uVk7ZymG1E_30d9x18i4k4Mttt2GsNcBQZl9HpR8Fi000KrOkfPKuuMrHYPwp5HgZOJtjFp7kYGgbouJjHwi7Dilwp7tiHm2AkIU6wLoHTMmUu2gC-5xsVesn-ft8nnvdqLZlTuZ3hNYoHSyFpNhHlMNyf5c',
    summary: '3 items • $47.00',
    status: 'Delivered',
  },
];

const savedAddressesPageData = {
  hero: {
    titleLines: ['Your world,', 'curated for flavor.'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAnqj418_dEYRRkybZDUSq6nq5JfpbmG728dJ7SKUJhd2ntE3JUXMUyP2DE4Z2gHzohWBdfAINKGcryjKH15n0_xAIymAxM0G-iJ1cZLKQFmsbR5pEn7M8jQOYGTy9vJ4hok2xIb0YAzVKiBYLRexBa1X3b2fu86e7PN2e21959kGw3GhmbS3Fdig1icJPh3UwEwj7AFRybb4wr-iz0KEuDl6HS8OqnkYcGJtRAxTUOMGOcuSvNGOV25iQTqU-FXM9ZTXAHAgZbJ_w',
    imageAlt: 'Minimalist abstract map background for food delivery',
  },
  addresses: [
    {
      label: 'Home',
      address: '123 Culinary Way, Apartment 4B, Foodie District, NY 10001',
      icon: 'home',
      iconClassName: 'bg-primary-container/20 text-primary',
    },
    {
      label: 'Work',
      address: '456 Gourmet Plaza, Floor 12, Innovation Tower, NY 10012',
      icon: 'work',
      iconClassName: 'bg-tertiary-container/20 text-tertiary',
    },
    {
      label: 'The Gym',
      address: '88 Pulse Street, Wellness Park',
      icon: 'fitness_center',
      iconClassName: 'bg-secondary-container/20 text-secondary',
    },
  ],
  addAddressLabel: 'Add New Address',
  spotlight: {
    eyebrow: 'Most Used',
    title: 'Home Delivery',
    description: '85% of your orders go here',
    icon: 'query_stats',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5xXdy6SJjQMGeC2CqeJVwZoTFWVBsrVFJQhuhooRuoEuHhCjKzLF2EtE6fnfc-bLiRlDPTXiPLwYXWPv3Cfy9Vg0H1_2cX_G-TsE2MmHSc3UU80Ua-HYqiClOCm7kpIivbuYZIuMlwNS8O4oT5P_rxtuhMfHbKTixQksdFqUXlfQyr78xl092XLfEVSXwPwkOy2J6omEd2t1k3YpV90OOpvAHXdUF-WZ0gFaC9hs6tV4QOu1eQO0NsMd6eM3fnlNghNd6xec91LQ',
    imageAlt: 'Delicious fresh artisan pizza',
  },
};

const profilePageData = {
  user: {
    name: 'Elena Verve',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXCGPZ-p_ywY-CEvY7i-zFx20O4Oht79heJpqGpN6zVAWGp7A_Cvx3JEFHJtccTxBUZyB0F1IZ8tnb9X-ORFmEQ0JJo7Svj5koILhB1_rYBdTq1kdAzJcMSSKOPviI5lBywO6Po2_FgUguPWO-iWSGf9LDMJrqjdZrd9f-fEVxzQxI8d4XZTRgx5SGyFdISRx0fO5-shAYhNLINEbSbtKeKEuMG_luhm_f4Z8F__gWSuVZLSIwKbliiqQxIu2k8d2TNUllI3Wuy-w',
    imageAlt: 'User profile',
    memberSince: 'Oct 2023',
  },
  loyalty: {
    tier: 'Gold Gourmet',
    icon: 'stars',
  },
  credits: {
    amount: '$42.50',
  },
  recentOrders: [
    ...recentOrders,
  ],
  contactInfo: {
    phone: '+1 (555) 012-3456',
    email: 'elena@kitchen.com',
  },
  savedAddressesPreview: [
    { label: 'Home', address: '123 Culinary Way' },
    { label: 'Work', address: '456 Gourmet Plaza' },
  ],
  paymentMethodsPreview: [
    { type: 'VISA', last4: '4242', expires: '12/25', active: true },
    { type: 'MC', last4: '8812', expires: '08/26', active: false },
  ],
};

export { savedAddressesPageData, profilePageData };
