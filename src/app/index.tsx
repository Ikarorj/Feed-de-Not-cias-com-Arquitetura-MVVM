import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useLoginViewModel } from "../viewmodel/UserLoginViewModel";

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userId, loading, error, handleLogin } = useLoginViewModel();

    useEffect(() => {
        if (userId) {
            router.replace("/home");
        } else {
            setEmail('');
            setPassword('');
        }
    }, [userId, error]);

    if (loading) {
        return <Text>loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title="login"
                onPress={() => handleLogin(email, password)}
            />
            {error ? <Text style={styles.error}>Erro: {error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    error: {
        color: 'red',
        marginTop: 8,
    },
});
