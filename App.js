import { SQLiteProvider } from "expo-sqlite";
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from './src/styles/theme';
import { DATABASE_NAME, initDb } from './src/db/database';
import RegisterScreen from './src/screens/RegisterScreen';
import { ss } from "./src/styles/appStyles";

export default function App() {
  return (
    <>
      <StatusBar style="light-content" backgroundColor={colors.bg}/>
      <SQLiteProvider databaseName={DATABASE_NAME} onInit={initDb}>
        <View style={containerStyles.container}>
          <View style={ss.header}>
            <Text style={ss.title}>ระบบลงทะเบียนนิสิต</Text>
          </View>
          <RegisterScreen />
        </View>
      </SQLiteProvider>
    </>
  );
}

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
