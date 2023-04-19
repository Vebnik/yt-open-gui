
export const SubsToast = (toast) => {
    toast({
        title: 'Subs created.',
        description: "Add new subs (*_*)",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
    })
}

export const ErrorToast = (toast, msg) => {
    toast({
        title: 'Some error.',
        description: msg,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
    })
}

