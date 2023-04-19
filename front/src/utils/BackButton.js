import React from 'react';
import Page from "../store/page";
import Content from "../store/content";
import Modal from "../store/modal";
import EelApi from "../service/eelApi";
import {Box, IconButton} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";

export const BackButton = () => {

    const backToSubs = () => {
        Page.setCurrentPage('subs')

        if (process.env.NODE_ENV === 'development')
            return Content.newContent([Modal.data])

        return EelApi.getSubs()
            .then(data => Content.newContent(data || []))
            .catch(err => console.log(err))
    }

    return (
        <Box>
            <IconButton icon={<ArrowBackIcon/>} onClick={backToSubs} title={'Back to subs'} aria-label={'back'}/>
        </Box>
    );
};