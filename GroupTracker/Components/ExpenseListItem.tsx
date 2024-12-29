import { useState } from "react";
import { Button, View, Text } from "react-native";

interface Props {
    expenseData: {
        id: BigInt,
        created_at: Date,
        amount_cents: BigInt,
        title: string,
        category: string,
        description: null | string
    },
}

export default function ExpenseListItem({ expenseData, children }: React.PropsWithChildren<Props>) {
    const [collapse, setCollapse] = useState<boolean>(false)
    console.log(expenseData)

    function onPress() {
        console.log('Pressed')
        setCollapse(!collapse)
    }

    return <View collapsable={true}>
        <Button title={expenseData.title || "No Title"} onPress={onPress} />
        {collapse && <Text>{expenseData.description || "No Descriptions"}</Text>}
        {children}
    </View>
}
