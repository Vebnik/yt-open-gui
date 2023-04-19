import React from 'react';

import { IconButton} from '@chakra-ui/react';
import { SettingsIcon } from "@chakra-ui/icons";

export const SettingSwitcher = () => {

    return (
        <IconButton
            size="md"
            fontSize="lg"
            aria-label={'Go to settings'}
            title={'Go to settings'}
            variant="solid"
            color="green.400"
            marginLeft="2"
            icon={<SettingsIcon />}
        />
    );
}

