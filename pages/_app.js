import ErrorBoundary from '../components/error-boundary/ErrorBoundary'
import { AuthProvider } from '../context/auth/authContext'
import { CoinflipProvider } from '../context/coinflip/coinflipContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CoinflipProvider>
          <Component {...pageProps} />
        </CoinflipProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default MyApp
