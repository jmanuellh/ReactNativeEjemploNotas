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


  const NotasScreen = ({navigation}) => {
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
          id: '3',
          title: 'Third Item',
        }
      ]);
    }, []);
  
    const algo = () => {
      alert("algo");
    }
  
    function agregarItem() {
      setDatos([...datos, {
        id: '4',
        title: 'Quart Item'
      }]);
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
        <View>
          <Button title="Ir a pagina 2" 
            onPress={() =>
              navigation.navigate('Pagina2', {nombre: 'Juan'})
            }
          />
        </View>
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

const Pagina2Screen = ({navigation, route}) => {
  return (
    <View>
      <Text>Pagina 2m hola {route.params.nombre}</Text>
      <Button title="Regresar a pagina Notas" onPress={() => navigation.navigate('Notas')}/>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Notas"
          component={NotasScreen}
        />
        <Stack.Screen name="Pagina2" component={Pagina2Screen} />
      </Stack.Navigator>
    </NavigationContainer>
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