import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export function LanguageScreen() {
    return (
        <>
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.languageBox}>
                    <Text style={styles.languageText}>हिंदी</Text>
                    <Text style={styles.languageText}>বাংলা</Text>
                </View>
                <View style={styles.languageBox}>
                    <Text style={styles.languageText}>தமிழ்</Text>
                    <Text style={styles.languageText}>मराठी</Text>
                </View>
                <View style={styles.languageBox}>
                    <Text style={styles.languageText}>తెలుగు</Text>
                    <Text style={styles.languageText}>ગુજરાતી</Text>
                </View>
                <View style={styles.languageBox}>
                    <Text style={styles.languageText}>اردو</Text>
                    <Text style={styles.languageText}>ಕನ್ನಡ</Text>
                </View>
                <View style={styles.languageBox}>
                    <Text style={styles.languageText}>മലയാളം</Text>
                    <Text style={styles.languageText}>অসমীয়া</Text>
                </View>
                <View style={styles.languageBox}>
                    <Text style={styles.languageText}>मैथिली</Text>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 10,
        flex: 1,
    },
    languageBox: {
        marginBottom: 10,  // Adjusting spacing between the language rows
    },
    languageText: {
        color: '#ffffff',
        marginRight: 20,
        padding: 6,
        fontSize: 13,  // Apply fontSize to Text components
    }
});