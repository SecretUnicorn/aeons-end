import { FC } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

function getDisplayName(WrappedComponent: FC<React.PropsWithChildren<unknown>>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withErrorHandler<P extends object>(
  Component: FC<React.PropsWithChildren<P>>,
  Fallback: FC<React.PropsWithChildren<FallbackProps>>,
) {
  function ComponentWithErrorHandling(props: P) {
    return (
      <ErrorBoundary FallbackComponent={Fallback}>
        <Component {...(props as P)} />
      </ErrorBoundary>
    );
  }

  ComponentWithErrorHandling.displayName = `WithErrorHandling${getDisplayName(
    Component as FC<React.PropsWithChildren<unknown>>,
  )}`;

  return ComponentWithErrorHandling;
}

export { withErrorHandler };
