import { Text } from '@radix-ui/themes';
import React, { PropsWithChildren, ReactNode } from 'react'

type Props = {
    props: ReactNode;
}

const ErrorMessage = ({children}: PropsWithChildren) => {
    if (!children) return null;

    return (
        <Text color="red" as="p"></Text>
    )
}

export default ErrorMessage