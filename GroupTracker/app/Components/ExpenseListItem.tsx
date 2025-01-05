import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

interface Props {
    expenseData: ExpenseData
    deleteFunction: any
}

export interface ExpenseData {
    id: number,
    created_at: string,
    created_by: string,
    amount_cents: number,
    title: string,
    category: string,
    description: null | string
}

export default function ExpenseListItem({expenseData, deleteFunction}: Props) {
    const [collapse, setCollapse] = useState<boolean>(false)

    function onExpensePress() {
        console.log('Expense Pressed')
        setCollapse(!collapse)
    }

    function onDeletePressed(id: number) {
        deleteFunction(id)
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
            paddingHorizontal: 10,
            width: '100%',
            backgroundColor: 'blue',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        negativeButton: {
            backgroundColor: 'red'
        },
        positiveButton: {
            backgroundColor: 'green',
        },
        buttonText: {
            textAlign: 'center',
            paddingHorizontal: 10
        },
        additionalDetails: {
            backgroundColor: 'lightblue'
        }
    });

    var StyledButton
    if (expenseData.amount_cents > 0) {
        StyledButton = [styles.baseButton, styles.positiveButton]
    } else {
        StyledButton = [styles.baseButton, styles.negativeButton]
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onExpensePress} style={styles.touchable}>
                <View style={StyledButton}>
                    <Text style={styles.buttonText}>
                        {expenseData.title}
                    </Text>
                    <Text style={styles.buttonText}>
                        ${(expenseData.amount_cents / 100).toFixed(2)}
                    </Text>
                </View>
                {
                    collapse &&
                    <View style={styles.additionalDetails}>
                        <Text>
                            Created by: {expenseData.created_by}
                        </Text>
                        <Text>
                            Created: {expenseData.created_at}
                        </Text>
                        <Text>
                            Category: {expenseData.category}
                        </Text>
                        <Text>
                            Description: {expenseData.description || "No Descriptions"}
                        </Text>
                        <Button title="Delete" onPress={() => {onDeletePressed(expenseData.id)}}/>
                    </View>
                }
            </TouchableOpacity >
        </View>
    )
}
