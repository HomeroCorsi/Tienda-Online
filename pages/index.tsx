import { GetStaticProps } from "next";
import React, { useState } from "react";
import api from "../product/api";
import { Product } from "../product/types";
import {Grid, Stack, Text, Button, Link, Flex, Image} from "@chakra-ui/react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

interface Props{
  products: Product[];
}

function parseCurrency(value: number): string{
  return value.toLocaleString('es-AR',{
    style: 'currency',
    currency: 'ARS',
  });
}

// const IndexRoute: React.FunctionComponent<Props> = ({products}) => {
const IndexRoute = ({products}: Props) => {

  const [cart, setCart] = useState<Product[]>([]);
  const text = cart
  .reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`), '')
  .concat(`\nTotal : ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`);

  return (<>
  <Stack>
    <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
    {products.map((product) => (
      <Stack
          key={product.id} 
          backgroundColor="gray.100"
          borderRadius='md'
          padding={4}
          spacing={3}
        >
          <Image
            alt={product.title}
            borderTopRadius='md'
            maxHeight={128}
            objectFit='cover'
            // src={product.image}
          />
        
          <Text>{product.title}</Text>
          
          <Text>{parseCurrency(product.price)}</Text>
          
          <Button colorScheme="primary" onClick={() => setCart((cart) => cart.concat(product))}>
              Agregar
          </Button>
      </Stack>
    ))}

    </Grid>

    {Boolean(cart.length) && (
      <Flex padding={3} bottom={0} position='sticky' alignItems='center' justifyContent='center'>
        
        <Button 
        isExternal as={Link} 
        href={`http://wa.me/45621354?text=${encodeURIComponent(text)}`}
        width='fit-content'
         >
          Completar pedido ({cart.length})
        
        </Button>
      
      </Flex>
    )}
  </Stack>
  </>) ;
};

export const getStaticProps: GetStaticProps = async () =>{
  const products = await api.list();
  
  return {
    props:{
      products,
    }
  }
}


export default IndexRoute;
