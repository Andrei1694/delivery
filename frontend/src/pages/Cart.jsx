import { useNavigate } from '@tanstack/react-router';
import PageHeader from '../components/PageHeader';
import OrderSummary from '../components/OrderSummary';

const cartItems = [
  {
    name: 'Wild Harvest Grain Bowl',
    note: 'Extra Avocado, No Onions',
    price: 18.5,
    quantity: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuARxURdYlCEbFNERnCpgU3OsyDtkZi4iZtoDVRFc7ToxMzuWgVon1O2Nht8PJiMCs5aBkVJ8pJW_8sCjHvz1kHlL4H2GDBtCw6RQkb9HsYDTvObi4kW9lj19VpQ5KdaoupfRAjJvk6lghn5MM65g06cATD_INweNmEf1J8hG12DnKPBW99IDB5Rej8Qpyv5TNQ0fE93lzywfK53OpPfxyUInHH6MGGnn4TjWreLzpJgYyTWpPggb8MTd2CVgoOQiE8DGeyyXLGlVro',
    imageAlt: 'Gourmet salad with fresh greens and seeds',
  },
  {
    name: 'Truffle Burrata Pizza',
    note: 'Standard 12" Crust',
    price: 24,
    quantity: 2,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATV2Ee2gDfIPmAZwvhTm5T80zTvH7S1de3GOwXAFnvKu_zJNj5YVlsz7XjXT70nAqgyTnDIupXANe1znZiBK3LGLLzI48Kb3W6_lGuvNNj1c5F9Ezb8mU5PhHQg74bpf06G87bNqhUAO_XPAmX7lORIVUnxSTR375wLTQz3mQq703JGtAoBPmAuGLlkQSGCjO4EWVlYx2CvZHGIuIX7XIzLGoEu6OuCn75FrSe8u8ZscRkoOjTIyZ97XlLK7ceODE80HXe-QVSdKo',
    imageAlt: 'Wood-fired neapolitan pizza with basil',
  },
  {
    name: 'Valrhona Lava Cake',
    price: 12,
    quantity: 1,
    badge: "CHEF'S PICK",
    highlight: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpH4tZc7hkb0IRjHD54KaHTjXzzolMv4N2C47HR9a3HU131ToSaIZMqFEY9Uw9G4wNKJLo_JnfCjZI3uIVNxeb7Ff2AcktBQOkHP66hpGVc63WS-TV7evysTv69-Fi-0C7-NR3zMqV9KP9qDlXcDLIyH7gkU5MOMcvv8eKxnqyV4lUGUYBevOEJ9LUJN5GTlJmd_2J-ULn1dtzH-kV_9uOuQGwcIkDszG0cwZc5sVTBfWxG6BXavUlaVophlAexhszLdrOtBaYHIk',
    imageAlt: 'Decadent chocolate lava cake dessert',
  },
  {
    name: 'Truffle Fries',
    note: 'Extra Parmesan',
    price: 7.5,
    quantity: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuATV2Ee2gDfIPmAZwvhTm5T80zTvH7S1de3GOwXAFnvKu_zJNj5YVlsz7XjXT70nAqgyTnDIupXANe1znZiBK3LGLLzI48Kb3W6_lGuvNNj1c5F9Ezb8mU5PhHQg74bpf06G87bNqhUAO_XPAmX7lORIVUnxSTR375wLTQz3mQq703JGtAoBPmAuGLlkQSGCjO4EWVlYx2CvZHGIuIX7XIzLGoEu6OuCn75FrSe8u8ZscRkoOjTIyZ97XlLK7ceODE80HXe-QVSdKo',
    imageAlt: 'Crispy truffle fries in a serving basket',
  },
];


const serviceFee = 4.2;
const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function QuantityControl({ quantity }) {
  return (
    <div className="flex items-center rounded-full bg-surface-container-low px-1 py-1">
      <button
        aria-label="Decrease quantity"
        className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:text-primary"
        type="button"
      >
        <span className="material-symbols-outlined text-sm">remove</span>
      </button>
      <span className="px-3 text-sm font-bold">{quantity}</span>
      <button
        aria-label="Increase quantity"
        className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:text-primary"
        type="button"
      >
        <span className="material-symbols-outlined text-sm">add</span>
      </button>
    </div>
  );
}

function CartItem({ item }) {
  return (
    <div
      className={
        item.highlight
          ? 'flex gap-4 rounded-xl border border-tertiary/10 bg-tertiary-container/10 p-4 ambient-shadow'
          : 'relative flex gap-4 overflow-hidden rounded-xl bg-surface-container-lowest p-4 ambient-shadow'
      }
    >
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          alt={item.imageAlt}
          className="h-full w-full object-cover"
          src={item.image}
        />
      </div>

      <div className="flex flex-grow flex-col justify-between">
        <div className={item.highlight ? 'flex items-start justify-between' : undefined}>
          <div>
            {item.badge ? (
              <span className="mb-1 inline-block rounded-full bg-tertiary px-2 py-0.5 text-[10px] font-bold text-on-tertiary">
                {item.badge}
              </span>
            ) : null}
            <h3 className="font-headline font-bold leading-tight text-on-surface">{item.name}</h3>
            {item.note ? (
              <p className="mt-1 text-sm text-on-surface-variant font-label">{item.note}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-2 flex items-end justify-between">
          <span className="font-headline text-lg font-bold text-primary">
            {formatCurrency(item.price)}
          </span>
          <QuantityControl quantity={item.quantity} />
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  return (
    <>
      <style>
        {`
          .cart-page {
            font-family: 'Manrope', sans-serif;
            -webkit-tap-highlight-color: transparent;
          }

          .cart-page .font-headline {
            font-family: 'Plus Jakarta Sans', 'Manrope', sans-serif;
          }

          .cart-page .font-label {
            font-family: 'Manrope', sans-serif;
          }

          .cart-page .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
          }


          .cart-page .ambient-shadow {
            box-shadow: 0 8px 24px rgba(78, 33, 33, 0.06);
          }
        `}
      </style>

      <div
        className="cart-page bg-surface font-body text-on-surface antialiased"
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        <PageHeader
          title="Your Cart"
          onBack={() => window.history.back()}
        />

        <main className="mx-auto min-h-screen max-w-lg px-6 pb-40 pt-24">
          <div className="mb-8">
            <h2 className="mb-2 font-headline text-3xl font-bold tracking-tight text-on-surface">
              Your Cart
            </h2>
            <p className="font-medium text-on-surface-variant">
              Review your curated selection
            </p>
          </div>

          <div className="space-y-6">
            {cartItems.map((item) => (
              <CartItem key={item.name} item={item} />
            ))}
          </div>

          <div className="mt-12 space-y-4">
            <h4 className="font-headline text-lg font-bold text-on-surface">Order Summary</h4>
            <OrderSummary subtotal={subtotal} serviceFee={serviceFee} />
          </div>
        </main>

        <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-surface via-surface/90 to-transparent p-6">
          <div className="pointer-events-auto mx-auto max-w-lg">
            <button
              className="ambient-shadow flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-container px-6 py-4 font-headline text-lg font-bold text-on-primary transition-all duration-300 active:scale-95"
              type="button"
              onClick={() => navigate({ to: '/checkout' })}
            >
              <span>Proceed to Checkout</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
