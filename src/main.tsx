import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import theme from './theme'
import App from './App'

console.log('Starting application...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

console.log('Rendering application...');

root.render( 
  <StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <App />
    </ChakraProvider>
  </StrictMode>,
);

console.log('Application rendered.');
