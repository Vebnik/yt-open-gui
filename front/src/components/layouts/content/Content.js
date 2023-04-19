import React from 'react';

import { SimpleGrid } from '@chakra-ui/react';
import { VideoItem } from './VideoItem'
import { SubsItem } from './SubsItem'
import { observer } from "mobx-react-lite";

import ContentStore from "../../../store/content";
import Page from "../../../store/page";
import { ModalChannel } from "./ModalChannel";
import { ModalVideo } from "./ModalVideo";

export const Content = observer(() => {

    if (Page.currentPage === 'general')
        return (
            <SimpleGrid minChildWidth='260px' gap={2} rounded={2} >
                <ModalChannel/>
                <ModalVideo/>
                {ContentStore.currentContent.map(el => <VideoItem data={el} key={el.id} />)}
            </SimpleGrid>
        )

    if (Page.currentPage === 'subs')
        return (
            <SimpleGrid minChildWidth='500px' gap={4} rounded={2} >
                <ModalChannel/>
                {ContentStore.currentContent.map(el => <SubsItem data={el} key={el.id} />)}
            </SimpleGrid>
        )

    if (Page.currentPage === 'channel')
        return (
            <SimpleGrid minChildWidth='260px' gap={2} rounded={2} >
                <ModalVideo/>
                {ContentStore.currentContent.map(el => <VideoItem data={el} key={el.id} />)}
            </SimpleGrid>
        )
})


