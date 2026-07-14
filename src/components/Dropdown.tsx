import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';

export type DropdownOption = {
    label: string;
    value: string;
};

type DropdownProps = {
    options: DropdownOption[];
    value: string;
    onSelect: (value: string) => void;
    placeholder?: string;
    leftIcon?: React.ReactNode;
};

export default function Dropdown({ options, value, onSelect, placeholder = 'Select...', leftIcon }: DropdownProps) {
    const [isVisible, setIsVisible] = useState(false);

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (val: string) => {
        onSelect(val);
        setIsVisible(false);
    };

    return (
        <>
            <Pressable style={styles.inputContainer} onPress={() => setIsVisible(true)}>
                {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
                <Text style={[styles.input, !selectedOption && { color: '#A0A0A0' }]}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Feather name="chevron-down" size={20} color="#0B1C30" />
            </Pressable>

            <Modal visible={isVisible} transparent animationType="fade">
                <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.dropdownContainer}>
                                <FlatList
                                    data={options}
                                    keyExtractor={(item) => item.value}
                                    renderItem={({ item }) => (
                                        <Pressable
                                            style={styles.optionItem}
                                            onPress={() => handleSelect(item.value)}
                                        >
                                            <Text
                                                style={[
                                                    styles.optionText,
                                                    item.value === value && styles.optionTextSelected,
                                                ]}
                                            >
                                                {item.label}
                                            </Text>
                                            {item.value === value && (
                                                <Feather name="check" size={18} color="#0D2C21" />
                                            )}
                                        </Pressable>
                                    )}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#BBCABF',
        borderRadius: 12,
        height: 52,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
    },
    leftIconContainer: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#0B1C30',
        textAlignVertical: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    dropdownContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        maxHeight: 300,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F2F5',
    },
    optionText: {
        fontSize: 15,
        color: '#0B1C30',
    },
    optionTextSelected: {
        fontWeight: '600',
        color: '#0D2C21',
    },
});
