import React, {useState} from 'react';

import {Input, Box, IconButton, Select} from '@chakra-ui/react';
import { SearchIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import { test_data_video } from "./testData";
import {observer} from "mobx-react-lite";

import Page from "../store/page";
import EelApi from '../service/eelApi'
import ContentStore from "../store/content";
import Content from "../store/content";
import Modal from "../store/modal";

export const SearchInput = observer(() => {

    const [title, setTitle] = useState('')
    const [limit, setLimit] = useState(10)

    const search = () => {

        if (process.env.NODE_ENV === 'development')
            ContentStore.newContent([...test_data_video, ...test_data_video])

        if (process.env.NODE_ENV === 'production')
            EelApi.searchVideo({limit, title}).then(res => {
                console.log(res)
                ContentStore.newContent(res)
            })
    }

    return (
        <>
            <Box maxW={'500px'} minW={'50%'} display={'flex'} flexDirection={'row'} gap={1} m={'auto'}>

                <Select onChange={ev => setLimit(ev.target.value)} title={'sum results'} width={'120px'} variant='filled'>
                    {[10, 20, 30, 40, 50, 100].map(el => <option key={el} value={el}>{el}</option>)}
                </Select>

                <Input onChange={ev => setTitle(ev.target.value)}
                       _focusVisible border={0} borderBottom={'2px'} borderColor={'gray.400'} rounded={0} placeholder={'Some search ...'} type={'text'}
                />
                <IconButton onClick={search} aria-label='Search' icon={<SearchIcon />} />
            </Box>
        </>
    );
})

