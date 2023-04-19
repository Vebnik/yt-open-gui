
import React from 'react';

import {IconButton, Card, Image, Box, Text, Wrap, useDisclosure, useToast} from '@chakra-ui/react';
import { PlusSquareIcon, QuestionOutlineIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {observer} from "mobx-react-lite";

import eelApi from "../../../service/eelApi";

import ModalStore from "../../../store/modalChannel";
import ModalVideo from "../../../store/modalVideo";
import Page from "../../../store/page";
import {ErrorToast} from "../../../utils/Toast";
import modalVideo from "../../../store/modalVideo";

export const VideoItem = observer(({data}) => {

    const toast= useToast()

    const play = () => {
        console.log('try to start mpv')
        eelApi.mpvPlay(data.id)
            .then(res => {console.log(res)})
            .catch(err => ErrorToast(toast, String(err)))
    }

    const openChannelModal = () => {
        ModalStore.load()
        ModalStore.open()

        eelApi.getChannelInfo(data.id).then(data => {
            ModalStore.setData(data)
            ModalStore.complete()
        })
    }

    const openVideoInfoModal = () => {
        ModalVideo.load()
        ModalVideo.open()

        eelApi.getVideoInfo(data.id).then(data => {
            console.log(data)
            modalVideo.setData(data)
            modalVideo.complete()
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
                <IconButton onClick={play} color={'blue.300'} title={'Play'} size={'sm'} background={'none'} icon={<PlusSquareIcon/>}/>
                <IconButton onClick={openVideoInfoModal} color={'red.300'} title={'Video info'} size={'sm'} background={'none'} icon={<QuestionOutlineIcon/>}/>
                <IconButton onClick={openChannelModal} hidden={Page.currentPage === 'channel'} color={'red.300'} title={'Get channel info'} size={'sm'} background={'none'} icon={<ExternalLinkIcon/>}/>
            </Box>
        </Card>
    );
})


