import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button } from 'react-native';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';



const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
    <View >
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Jane' })
        }
      />

    </View>
    </SafeAreaView>
  )
}

const ProfileScreen = ({navigation, route}) => {
  return (
    <View>
      <Text>ProfileScreen {route.params.name}</Text>
      <Button
      title="Go to Home"
      onPress={() => navigation.navigate('Home')}
    />
    </View>
  )
}

const InicioScreen = ({}) => {
  const [datos, setDatos] = useState([]);


  useEffect(() => {
    // Update the document title using the browser API
    setDatos([
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '4',
        title: 'Third Item',
      }
    ]);
  }, []);

  function agregarItem() {
    // setDatos([...datos, {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //   title: 'Quart Item'
    // }]);
    alert("Hola");
  }

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={agregarItem}
          title="Agregar"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <FlatList
        data={datos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  const [datos, setDatos] = useState([]);


  useEffect(() => {
    // Update the document title using the browser API
    setDatos([
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '4',
        title: 'Third Item',
      }
    ]);
  }, []);

  function agregarItem() {
    // setDatos([...datos, {
    //   id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //   title: 'Quart Item'
    // }]);
    alert("Hola");
  }

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={agregarItem}
          title="Agregar"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <FlatList
        data={datos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  buttonContainer: {
    margin: 20
  },
});

export default App;