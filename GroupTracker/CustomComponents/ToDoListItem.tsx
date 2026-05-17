import { ReactNode } from "react";
import { Button, View } from "react-native";

interface Props {
    buttonProps: {title: string},
    children: ReactNode
}

export default function ToDoListItem({ buttonProps, children }: Props) {
    return <View>
        <Button {...buttonProps} />
        {children}
    </View>
}
