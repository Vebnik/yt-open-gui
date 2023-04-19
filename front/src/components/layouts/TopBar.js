import React from 'react';

import {Box} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../utils/ColorModeSwitcher';
import { SettingSwitcher } from "../../utils/SettingSwitcher";
import { SearchInput } from "../../utils/SearchInput";
import Page from "../../store/page";
import {observer} from "mobx-react-lite";
import { BackButton } from "../../utils/BackButton";

export const TopBar = observer(() => {

    return (
        <Box
            width={'100%'} rounded={5} padding={1}
            background={'gray.600'} height={'max-content'}
            gridTemplateColumns={'auto 50px 50px'}
            display={"grid"}
        >
            {Page.currentPage === 'general' ? <SearchInput/> : <></>}
            {Page.currentPage === 'channel' ? <BackButton/> : <></>}
            {Page.currentPage !== 'channel' && Page.currentPage !== 'general' ? <Box/> : <></>}
            <ColorModeSwitcher/>
            <SettingSwitcher />
        </Box>
    );
})


