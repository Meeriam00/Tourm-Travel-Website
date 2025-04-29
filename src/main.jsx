import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router/AppRouter'
import { GuiderProvider } from './Context/GuiderContext'
import { Provider } from 'react-redux'
import { store } from './tools/store'
import { CartProvider } from './Context/CartContext'
import '../src/components/i18n/i18n';
import ThemeProvider from './Context/ThemeContext'



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <GuiderProvider>
          <AppRouter />
        </GuiderProvider>
      </CartProvider>
      </ThemeProvider>
    </StrictMode>
  </Provider>
)
