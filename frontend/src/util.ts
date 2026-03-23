export const getFieldError = (errors) => {
  if (!errors?.length) {
    return null;
  }

  const [firstError] = errors;

  if (typeof firstError === 'string') {
    return firstError;
  }

  if (firstError && typeof firstError === 'object' && 'message' in firstError) {
    return String(firstError.message);
  }

  return 'Invalid value.';
};

export const isSafeInternalRedirect = (redirectPath) => {
  if (typeof redirectPath !== 'string' || !redirectPath.startsWith('/') || redirectPath.startsWith('//')) {
    return false;
  }

  try {
    const pathname = new URL(redirectPath, 'http://localhost').pathname;
    if (pathname === '/login' || pathname.startsWith('/login/')) {
      return false;
    }
    if (pathname === '/register' || pathname.startsWith('/register/')) {
      return false;
    }
  } catch {
    return false;
  }

  return true;
};

export const getApiErrorMessage = (error, fallbackMessage = 'Unexpected error.') => {
  const backendMessage =
    error?.response?.data?.message ||
    error?.response?.data?.detail ||
    (typeof error?.response?.data === 'string' ? error.response.data : null);

  return backendMessage || error?.message || fallbackMessage;
};
