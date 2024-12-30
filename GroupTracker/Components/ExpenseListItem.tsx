import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ExpenseData {
    expenseData: {
        id: number,
        created_at: Date,
        amount_cents: number,
        title: string,
        category: string,
        description: null | string
    },
}

export default function ExpenseListItem({ expenseData }: ExpenseData) {
    const [collapse, setCollapse] = useState<boolean>(false)
    console.log(expenseData)

    function onPress() {
        console.log('Pressed')
        setCollapse(!collapse)
    }

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
        },
        touchable: {
            width: '100%'
        },
        baseButton: {
            padding: 10,
            width: '100%',
            backgroundColor: 'blue'

        },
        negativeButton: {
            backgroundColor: 'red'
        },
        positiveButton: {
            backgroundColor: 'green',
        },
        buttonText: {
            textAlign: 'center',
        },
    });

    var StyledButton
    if (expenseData.amount_cents > 0) {
        StyledButton = [styles.baseButton, styles.positiveButton]
    } else {
        StyledButton = [styles.baseButton, styles.negativeButton]
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.touchable}>
                <View style={StyledButton}>
                    <Text style={styles.buttonText}>{expenseData.title}</Text>
                    {/* <Button title={expenseData.title || "No Title"} /> */}
                    {
                        collapse &&
                        <>
                            <Text>
                                {expenseData.description || "No Descriptions"}
                            </Text>
                            <Text>
                                {expenseData.amount_cents / 100 || "No amount data"}
                            </Text>
                        </>
                    }
                </View>
            </TouchableOpacity >
        </View>
    )
}
