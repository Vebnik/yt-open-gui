import React from 'react';

import {IconButton, SimpleGrid, Wrap} from '@chakra-ui/react';
import { InfoIcon } from "@chakra-ui/icons";

export const Footer = () => {

    return (
        <SimpleGrid background={'gray.600'} height={'100%'} rounded={2} padding={1} gridTemplateColumns={'auto 40px'}>
            <Wrap/>
            <IconButton title={'source code'} color={'blue.400'} size={'sm'} height={'100%'} aria-label={'source'} icon={<InfoIcon/>}/>
        </SimpleGrid>
    );
}


