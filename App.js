import { act, useState } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { colors } from './src/styles/theme';
import { DATABASE_NAME, initDb } from './src/db/database';
import RegisterScreen from './src/screens/RegisterScreen';
import { ss } from "./src/styles/appStyles";

import StudentListScreen from "./src/screens/StudentListScreen";
import { styles } from "./src/styles/registerStyles";

export default function App() {
  const [tab, setTab] = useState('list')

  const [reloadkey, setReloadKey] = useState(0)

  return (
    <>
      <StatusBar style="light-content" backgroundColor={colors.bg}/>
      <SQLiteProvider databaseName={DATABASE_NAME} onInit={initDb}>
        <View style={ss.container}>
          <View style={ss.header}>
            <Text style={ss.title}>ระบบลงทะเบียนนิสิต</Text>
          </View>

          <View style={ss.tabs}>
            <TabButton 
              label='ลงทะเบียน'
              active={tab === 'register'}
              onPress={() => setTab('register')}
              />
            <TabButton 
              label='รายชื่อ'
              active={tab === 'list'}
              onPress={() => setTab('list')}
              />
          </View>

          {
            tab === 'register' ? (
              <RegisterScreen onRegistered={() => setReloadKey((k) => k+1)} />
            ) : (
              <StudentListScreen reloadkey={reloadkey} />
            )
          }

        </View>
      </SQLiteProvider>
    </>
  );
}
function TabButton({label, active, onPress}) {
  return (
    <Pressable style={[ss.tab, active && ss.tabActive]} onPress={onPress}>
      <Text style={[ss.tabText, active && ss.tabTextActive]}>
        {label}
      </Text>
    </Pressable>
  )
}