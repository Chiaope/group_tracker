import { ReactNode } from "react";
import { Text } from "react-native";

interface Props {
    children: ReactNode
}

export default function B({ children }: Props) {
    return <Text style={{ fontWeight: 'bold' }}>{children}</Text>
};
