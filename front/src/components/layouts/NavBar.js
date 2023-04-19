import React from 'react';

import { IconButton, VStack} from '@chakra-ui/react';
import { PlusSquareIcon, HamburgerIcon, StarIcon } from "@chakra-ui/icons";
import { observer } from "mobx-react-lite";

import Page from "../../store/page";
import Content from "../../store/content";
import Modal from "../../store/modal";
import EelApi from "../../service/eelApi";

export const NavBar = observer(() => {

    const changePage = (page) => {

        Page.setCurrentPage(page)
        Content.newContent([])

        if (page === 'general') {
            return Content.newContent([])
        }

        if (page === 'subs') {
            if (process.env.NODE_ENV === 'development')
                Content.newContent([Modal.data])

            EelApi.getSubs()
                .then(data => Content.newContent(data || []))
                .catch(err => console.log(err))
        }

        if (page === 'waiting') {
            return EelApi.getWaiting()
                .then(data => Content.newContent(data || []))
                .catch(err => console.log(err))
        }
    }

    return (
        <VStack height={'100%'} maxW={'max-content'} background={'gray.600'} rounded={5} padding={1}>
            <IconButton onClick={() => changePage('general')}
                isActive={Page.currentPage === 'general'} title={'general'} background={'none'} aria-label='Search' icon={<HamburgerIcon />} />
            <IconButton onClick={() => changePage('waiting')}
                isActive={Page.currentPage === 'waiting'} title={'waiting for'} background={'none'} aria-label='Search' icon={<PlusSquareIcon />} />
            <IconButton onClick={() => changePage('subs')}
                isActive={Page.currentPage === 'subs'} title={'subscribes'} background={'none'} aria-label='Search' icon={<StarIcon />} />
        </VStack>
    );
})


