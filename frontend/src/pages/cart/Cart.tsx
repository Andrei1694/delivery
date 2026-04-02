import { useNavigate } from '@tanstack/react-router';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import OrderSummary from '../../components/OrderSummary';
import { useCart, SERVICE_FEE } from '../../cart';

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center rounded-full bg-surface-container-low px-1 py-1">
      <button
        aria-label="Decrease quantity"
        className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:text-primary"
        onClick={onDecrease}
        type="button"
      >
        <span className="material-symbols-outlined text-sm">remove</span>
      </button>
      <span className="px-3 text-sm font-bold">{quantity}</span>
      <button
        aria-label="Increase quantity"
        className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:text-primary"
        onClick={onIncrease}
        type="button"
      >
        <span className="material-symbols-outlined text-sm">add</span>
      </button>
    </div>
  );
}

function CartItem({ item, onDecrease, onIncrease }) {
  return (
    <div className="relative flex gap-4 overflow-hidden rounded-xl bg-surface-container-lowest p-4 ambient-shadow">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          alt={item.imageAlt}
          className="h-full w-full object-cover"
          src={item.image}
        />
      </div>

      <div className="flex flex-grow flex-col justify-between">
        <div>
          <h3 className="font-headline font-bold leading-tight text-on-surface">{item.name}</h3>
          {item.note ? (
            <p className="mt-1 text-sm text-on-surface-variant font-label">{item.note}</p>
          ) : null}
        </div>

        <div className="mt-2 flex items-end justify-between">
          <span className="font-headline text-lg font-bold text-primary">
            {formatCurrency(item.unitPrice)}
          </span>
          <QuantityControl
            quantity={item.quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          />
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const cart = useCart();

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
            {cart.items.length > 0 ? (
              cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onDecrease={() => cart.updateQuantity(item.id, -1)}
                  onIncrease={() => cart.updateQuantity(item.id, 1)}
                />
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-outline/40 bg-surface-container-lowest px-6 py-10 text-center ambient-shadow">
                <p className="font-headline text-xl font-bold text-on-surface">Your cart is empty</p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Add a few dishes to continue to checkout.
                </p>
              </div>
            )}
          </div>

          {cart.items.length > 0 ? (
            <div className="mt-12 space-y-4">
              <h4 className="font-headline text-lg font-bold text-on-surface">Order Summary</h4>
              <OrderSummary subtotal={cart.subtotal} serviceFee={SERVICE_FEE} />
            </div>
          ) : null}
        </main>

        <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-surface via-surface/90 to-transparent p-6">
          <div className="pointer-events-auto mx-auto max-w-lg">
            <Button
              className="ambient-shadow gap-2 px-6 py-4 text-lg active:scale-95"
              disabled={cart.items.length === 0}
              type="button"
              onClick={() => navigate({ to: '/checkout' })}
            >
              <span>Proceed to Checkout</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
