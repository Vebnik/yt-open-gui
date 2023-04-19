
import React from 'react';

import {IconButton, Card, Image, Box, Text, Wrap, useDisclosure} from '@chakra-ui/react';
import { PlusSquareIcon, CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {observer} from "mobx-react-lite";

import eelApi from "../../../service/eelApi";

import ModalStore from "../../../store/modal";
import Page from "../../../store/page";

export const VideoItem = observer(({data}) => {

    const play = () => {
        console.log('try to start mpv')
        eelApi.mpvPlay(data.id).then(res => {
            console.log(res)
        })
    }

    const openChannelModal = () => {
        ModalStore.load()
        ModalStore.open()

        eelApi.getChannelInfo(data.id).then(data => {
            ModalStore.setData(data)
            ModalStore.complete()
        })
    }

    return (
        <Card w={'100%'} background={'gray.700'} rounded={5} padding={3} height={'200px'} gap={2}>
            <Box height={'140px'}>
                <Image borderRadius={'base'} src={data.thumbnail} height={'140px'} width={'100%'}/>
            </Box>

            <Box display={'grid'} gridTemplateColumns={'160px auto 30px 30px 30px'} alignContent={'space-around'} width={'100%'} height={'60px'} alignItems={'center'}>
                <Text fontSize={'sm'} isTruncated={true} title={data.title}>
                    {data.title}
                </Text>
                <Wrap/>
                <IconButton onClick={() => play()} color={'blue.300'} title={'Play'} size={'sm'} background={'none'} icon={<PlusSquareIcon/>}/>
                <IconButton color={'red.300'} title={'Copy link'} size={'sm'} background={'none'} icon={<CopyIcon/>}/>
                <IconButton hidden={Page.currentPage === 'channel'} onClick={() => openChannelModal()} color={'red.300'} title={'Get channel info'} size={'sm'} background={'none'} icon={<ExternalLinkIcon/>}/>
            </Box>
        </Card>
    );
})


