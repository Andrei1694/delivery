import { useRef, useState, type RefObject } from 'react';
import { useNavigate } from '@tanstack/react-router';
import FilterChip from '../../components/FilterChip';
import HorizontalScroller from '../../components/HorizontalScroller';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';
import SymbolIcon from '../../components/SymbolIcon';
import { getOrderHistoryData } from '../../mocks';

const FILTERS = ['All Orders', 'Delivered', 'Processing', 'Cancelled'];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function OrderCard({
  order,
  onPrimaryAction,
  onSecondaryAction,
  secondaryActionLabel,
  showPrimaryAction = true,
  isReasonExpanded = false,
}) {
  return (
    <article
      className={[
        'group relative overflow-hidden rounded-3xl bg-surface-container-lowest p-5 shadow-[0_8px_32px_rgba(78,33,33,0.04)] transition-all',
        order.dimmed
          ? 'opacity-80'
          : 'hover:shadow-[0_12px_40px_rgba(78,33,33,0.08)]',
      ].join(' ')}
    >
      <div className="flex gap-5">
        <div
          className={[
            'h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-surface-container',
            order.imageClassName ?? '',
          ].join(' ')}
        >
          <img
            alt={order.imageAlt}
            className="h-full w-full object-cover"
            src={order.image}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-headline text-lg font-bold leading-tight tracking-tight text-on-surface">
                {order.restaurant}
              </h3>
              <StatusBadge label={order.status} className={order.statusClassName} />
            </div>
            <p className="mt-1 text-xs font-medium text-on-surface-variant">
              {order.dateTime}
            </p>
          </div>

          <div className="mt-2">
            <p className="line-clamp-1 text-sm text-on-surface-variant">
              {order.itemsSummary}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-outline-variant/10 pt-5">
        <div>
          <span className="mb-1 block text-xs text-on-surface-variant">
            {order.totalLabel}
          </span>
          <span className="font-headline text-lg font-extrabold text-on-surface">
            {formatCurrency(order.total)}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            aria-expanded={order.status === 'Cancelled' ? isReasonExpanded : undefined}
            className={[
              'rounded-full px-4 py-2 text-sm font-bold transition-colors',
              order.dimmed
                ? 'text-on-surface-variant hover:bg-surface-container-low'
                : 'text-primary hover:bg-primary-container/10',
            ].join(' ')}
            onClick={onSecondaryAction}
          >
            {secondaryActionLabel}
          </button>

          {showPrimaryAction ? (
            <button
              type="button"
              className="rounded-full bg-gradient-to-br from-primary to-primary-container px-6 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform active:scale-95"
              onClick={onPrimaryAction}
            >
              Reorder
            </button>
          ) : null}
        </div>
      </div>

      {order.status === 'Cancelled' && isReasonExpanded ? (
        <div className="mt-4 rounded-2xl bg-surface-container-low px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            Cancellation Reason
          </p>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
            {order.cancellationReason}
          </p>
        </div>
      ) : null}
    </article>
  );
}

export default function OrderHistory() {
  const navigate = useNavigate();
  const searchInputRef: RefObject<HTMLInputElement | null> = useRef(null);
  const orders = getOrderHistoryData();
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [searchValue, setSearchValue] = useState('');
  const [expandedReasonId, setExpandedReasonId] = useState<string | null>(null);

  const normalizedQuery = searchValue.trim().toLowerCase();
  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      activeFilter === 'All Orders' ? true : order.status === activeFilter;
    const matchesQuery = normalizedQuery
      ? `${order.restaurant} ${order.itemsSummary} ${order.id}`
          .toLowerCase()
          .includes(normalizedQuery)
      : true;

    return matchesFilter && matchesQuery;
  });

  const canResetFilters =
    activeFilter !== FILTERS[0] || searchValue.trim().length > 0;

  return (
    <>
      <style>{`
        .order-history-page {
          min-height: max(884px, 100dvh);
        }

        .order-history-page .font-headline {
          font-family: 'Plus Jakarta Sans', 'Manrope', sans-serif;
        }

        .order-history-page .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .order-history-page .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="order-history-page bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        <PageHeader title="Order History" />

        <main className="mx-auto max-w-lg space-y-8 px-6 pb-32 pt-20">
          <section className="space-y-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                <SymbolIcon
                  name="search"
                  className="text-xl text-on-surface-variant/50"
                />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search orders..."
                className="w-full rounded-2xl border-none bg-surface-container-lowest py-4 pl-12 pr-4 text-on-surface shadow-[0_4px_12px_rgba(78,33,33,0.03)] placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/20"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>

            <HorizontalScroller gap="gap-2" className="pb-2">
              {FILTERS.map((filter) => (
                <FilterChip
                  key={filter}
                  label={filter}
                  active={filter === activeFilter}
                  onClick={() => setActiveFilter(filter)}
                />
              ))}
            </HorizontalScroller>
          </section>

          <div className="space-y-10">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  secondaryActionLabel={
                    order.status === 'Cancelled' && expandedReasonId === order.id
                      ? 'Hide Reason'
                      : order.status === 'Processing'
                        ? 'Track Order'
                        : order.status === 'Cancelled'
                          ? 'View Reason'
                          : 'View Details'
                  }
                  showPrimaryAction={order.status !== 'Cancelled'}
                  isReasonExpanded={expandedReasonId === order.id}
                  onSecondaryAction={() => {
                    if (order.status === 'Processing') {
                      navigate({
                        to: '/order/$orderId/track',
                        params: { orderId: order.id },
                      });
                      return;
                    }

                    if (order.status === 'Cancelled') {
                      setExpandedReasonId((currentId) =>
                        currentId === order.id ? null : order.id,
                      );
                      return;
                    }

                    navigate({
                      to: '/order-details',
                      search: { orderId: order.id },
                    });
                  }}
                  onPrimaryAction={() =>
                    navigate({
                      to: '/restaurant-menu/$restaurantId',
                      params: { restaurantId: order.restaurantId },
                    })
                  }
                />
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-outline-variant/30 bg-surface-container-lowest px-6 py-10 text-center">
                <p className="font-headline text-xl font-bold text-on-surface">
                  No orders match this view
                </p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Try another keyword or reset the current filters.
                </p>
              </div>
            )}
          </div>

          {canResetFilters ? (
            <button
              type="button"
              className="w-full rounded-3xl border-2 border-dashed border-outline-variant/30 py-4 text-sm font-bold text-on-surface-variant/60 transition-all hover:border-primary/30 hover:text-primary"
              onClick={() => {
                setActiveFilter(FILTERS[0]);
                setSearchValue('');
                setExpandedReasonId(null);
                searchInputRef.current?.focus();
              }}
            >
              Show All Orders
            </button>
          ) : null}
        </main>
      </div>
    </>
  );
}
