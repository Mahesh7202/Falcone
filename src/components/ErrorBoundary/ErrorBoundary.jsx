import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      setHasError(true);
      setErrorMessage(error.message);
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div>
        <h1>Something went wrong</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
