import {
    Badge,
    Box,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner, Wrap, Code, Image, useToast
} from "@chakra-ui/react"
import {observer} from "mobx-react-lite";

import ModalStore from "../../../store/modalChannel";
import EelApi from "../../../service/eelApi";
import {ErrorToast, SubsToast} from "../../../utils/Toast";

const ModalData = (data) => {
    return (
        <Box>
            <Box rounded={4} backgroundColor={'gray.600'} padding={1} marginY={1}>
                <Image src={data.avatar} />
            </Box>
            <Box rounded={4} backgroundColor={'gray.600'} padding={1}>
                Title: <Code colorScheme={'green'}>{data.title}</Code>
                <Wrap/>
                Channel: <Code colorScheme={'green'}>{data.id}</Code>
                <Wrap/>
                Followers: <Code colorScheme={'green'}>{data.channel_follower_count}</Code>
                <Wrap/>
                Videos: <Code colorScheme={'green'}>{data.videos}</Code>
                <Wrap/>
                <Code colorScheme={"blue"} marginY={2}>{data.description}</Code>
            </Box>
        </Box>
    )
}

export const ModalChannel = observer(() => {
    const toast = useToast()
    const subs = () => {
        EelApi.addSubs(ModalStore.data)
            .then(() => { ModalStore.close(); SubsToast(toast) })
            .catch(err => { ErrorToast(toast, `${err}`) })
    }

    return (
        <Modal isOpen={ModalStore.isOpen}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Channel info</ModalHeader>

                <ModalBody>
                    {ModalStore.isLoad ? <Spinner/> : ModalData(ModalStore.data)}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' size={'sm'} mr={3} onClick={() => ModalStore.close()}>
                        Close
                    </Button>
                    <Button isDisabled={ModalStore.isLoad} colorScheme='red' size={'sm'} mr={3} onClick={subs}>
                        Subs
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})