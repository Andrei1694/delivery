import { useEffect, useState } from 'react';
import { profilePageData } from '../mocks/profile';

const PAYMENT_METHOD_STORAGE_KEY = 'payment-methods';
export const DEFAULT_PAYMENT_METHOD_FORM = {
  type: 'VISA',
  last4: '',
  expires: '',
  active: false,
};

function buildPaymentMethodId(paymentMethod, index) {
  return paymentMethod.id ?? `${paymentMethod.type}-${paymentMethod.last4}-${index}`;
}

function normalizePaymentMethods(methods) {
  const normalizedMethods = (Array.isArray(methods) ? methods : [])
    .filter((method) => method && typeof method.last4 === 'string')
    .map((method, index) => ({
      id: buildPaymentMethodId(method, index),
      type: typeof method.type === 'string' ? method.type : 'VISA',
      last4: method.last4.replace(/\D/g, '').slice(0, 4),
      expires: typeof method.expires === 'string' && method.expires.trim() ? method.expires : '12/25',
      active: Boolean(method.active),
    }))
    .filter((method) => method.last4.length === 4);

  const activeMethodId =
    normalizedMethods.find((method) => method.active)?.id ?? normalizedMethods[0]?.id ?? null;

  return normalizedMethods.map((method) => ({
    ...method,
    active: method.id === activeMethodId,
  }));
}

function readStoredPaymentMethods() {
  if (typeof window === 'undefined') {
    return normalizePaymentMethods(profilePageData.paymentMethodsPreview);
  }

  try {
    const storedValue = window.localStorage.getItem(PAYMENT_METHOD_STORAGE_KEY);
    if (!storedValue) {
      return normalizePaymentMethods(profilePageData.paymentMethodsPreview);
    }

    return normalizePaymentMethods(JSON.parse(storedValue));
  } catch {
    return normalizePaymentMethods(profilePageData.paymentMethodsPreview);
  }
}

function writeStoredPaymentMethods(paymentMethods) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      PAYMENT_METHOD_STORAGE_KEY,
      JSON.stringify(normalizePaymentMethods(paymentMethods)),
    );
  } catch {
    // Ignore storage failures and keep the methods in memory for the current session.
  }
}

export function useStoredPaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState(() => readStoredPaymentMethods());

  useEffect(() => {
    writeStoredPaymentMethods(paymentMethods);
  }, [paymentMethods]);

  return [paymentMethods, setPaymentMethods] as const;
}

export function getPaymentMethodDisplayLabel(paymentMethod) {
  if (!paymentMethod) {
    return 'Card';
  }

  const typeLabel =
    paymentMethod.type === 'MC'
      ? 'Mastercard'
      : paymentMethod.type === 'AMEX'
        ? 'American Express'
        : 'Visa';

  return `${typeLabel} •••• ${paymentMethod.last4}`;
}

export function createPaymentMethodId() {
  return `payment-${Date.now()}`;
}
