import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/stores'
import { Provider } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/pages/ErrorFallback'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={'loading...'}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)
