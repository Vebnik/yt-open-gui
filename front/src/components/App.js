import React from 'react';
import {
    extendTheme,
    ChakraProvider, Container, Grid, GridItem
} from '@chakra-ui/react';
import { TopBar } from "./layouts/TopBar";
import { NavBar } from "./layouts/NavBar";
import { Content } from "./layouts/content/Content";
import {Footer} from "./layouts/Footer";

const theme = extendTheme({
    styles: {
        global: {
            '::-webkit-scrollbar': {
                display: 'none',
                width: '0px'
            },
            body: {
                'scrollbar-width': '0px'
            }
        }
    }
})

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Container padding={2} maxW={'100%'} height={'10%'}>
          <Grid
              templateAreas={`"header header"
                              "nav content"
                              "nav footer"`}
              gap={2}
              gridTemplateRows={'50px calc(100vh - 115px) 30px'}
              gridTemplateColumns={'50px 1fr'}
          >
              <GridItem area={'header'}>
                  <TopBar/>
              </GridItem>

              <GridItem area={'nav'}>
                  <NavBar/>
              </GridItem>

              <GridItem area={'content'} overflow={'scroll'}>
                  <Content/>
              </GridItem>

              <GridItem area={'footer'}>
                  <Footer/>
              </GridItem>
          </Grid>
      </Container>
    </ChakraProvider>
  );
}

export default App;
