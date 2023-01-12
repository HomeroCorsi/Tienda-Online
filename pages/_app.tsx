// pages/_app.js
import { ChakraProvider, Container, Image, VStack, Text, Heading, Box, Divider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import '../styles/global.css';
import theme from '../theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
      <Container
          backgroundColor="white"
          boxShadow='md'
          marginY={4}
          maxWidth='container.xl'
          padding={4}
      >
        <VStack marginBottom={6} padding={4}>
          <Image borderRadius={9999} src='//placehold.it/128x128'/>
          <Heading>Almacen</Heading>
          <Text>El almacen de homero</Text>
        </VStack> 
        <Divider marginY={6}/>
        <Component {...pageProps} />
      </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App