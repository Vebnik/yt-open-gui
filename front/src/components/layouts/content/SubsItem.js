
import React, {useState} from 'react';

import {IconButton, Image, Box, Text, SimpleGrid, Badge, useToast} from '@chakra-ui/react';
import {ArrowRightIcon, DeleteIcon } from "@chakra-ui/icons";

import EelApi from "../../../service/eelApi";
import Content from "../../../store/content";
import Page from "../../../store/page";
import {ErrorToast} from "../../../utils/Toast";

export const SubsItem = ({data}) => {

    const toast= useToast()
    const [isLoad, setIsLoad] = useState(false)

    const getChannelContent = () => {
        setIsLoad(true)
        EelApi.getChannelVideo(data.chanel_id)
            .then(data => {
                Content.newContent([]); Content.newContent(data)
                Page.setCurrentPage('channel')
                setIsLoad(false)
            })
            .catch(err => {ErrorToast(toast, String(err)); setIsLoad(false)})
    }

    const deleteChannel = () => {
        EelApi.deleteSubs(data.chanel_id)
            .then(() => {
                EelApi.getSubs().then(data => {Content.newContent([]); Content.newContent(data)})
                ErrorToast(toast, 'Deleted success')
            })
            .catch(err => ErrorToast(toast, String(err)))
    }

    return (
        <SimpleGrid w={'100%'} templateColumns={'auto 60% auto'} background={'gray.700'} rounded={5} padding={3} height={'250px'} gap={2}>
            <Box>
                <Image borderRadius={'base'} src={data.avatar} height={'230px'} />
            </Box>

            <Box>
                <Badge colorScheme={'green'}>{data.title}</Badge>
                <Box margin={'auto'} padding={1} height={'205px'} backgroundColor={'gray.600'} rounded={4} overflow={'scroll'}>
                    <Text colorScheme={'blue'} fontSize={'sm'} maxH={'230px'}>
                        {data.description}
                    </Text>
                </Box>
            </Box>

            <Box display={'grid'} gridTemplateRows={'auto auto auto'} alignContent={'space-around'} width={'100%'} alignItems={'center'}>
                <IconButton isLoading={isLoad} onClick={() => getChannelContent()} color={'blue.300'} title={'Go to channel video'} size={'sm'} background={'none'} icon={<ArrowRightIcon/>}/>
                <IconButton onClick={deleteChannel} color={'red.300'} title={'Delete channel'} size={'sm'} background={'none'} icon={<DeleteIcon/>}/>
            </Box>
        </SimpleGrid>
    );
}


