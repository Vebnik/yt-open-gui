import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner, Wrap, Code, Image
} from "@chakra-ui/react"
import {observer} from "mobx-react-lite";

import ModalVideoStore from "../../../store/modalVideo";

const ModalData = (data) => {
    return (
        <Box>
            <Box rounded={4} backgroundColor={'gray.600'} padding={1}>
                Id: <Code colorScheme={'green'}>{data.id}</Code>
                <Wrap/>
                Uploader: <Code colorScheme={'green'}>{data.uploader}</Code>
                <Wrap/>
                Followers: <Code colorScheme={'green'}>{data.channel_follower_count}</Code>
                <Wrap/>
                Duration: <Code colorScheme={'red'}>{(data.duration/60).toFixed(2)} min</Code>
                <Wrap/>
                Views: <Code colorScheme={'red'}>{data.view_count}</Code>
                <Wrap/>
                Like: <Code colorScheme={'red'}>{data.like_count}</Code>
                <Wrap/>
                Categories: <Code colorScheme={'red'}>{data.categories}</Code>
                <Code colorScheme={"blue"} marginY={2}>{data.description}</Code>
            </Box>
        </Box>
    )
}

export const ModalVideo = observer(() => {

    return (
        <Modal isOpen={ModalVideoStore.isOpen}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Channel info</ModalHeader>

                <ModalBody>
                    {ModalVideoStore.isLoad ? <Spinner/> : ModalData(ModalVideoStore.data)}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' size={'sm'} mr={3} onClick={() => ModalVideoStore.close()}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})