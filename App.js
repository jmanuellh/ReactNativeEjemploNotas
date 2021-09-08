import React, {useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Keyboard,
  Image,
  TouchableOpacity,
  Button } from 'react-native';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';

  // var seVaAEliminar = false;

  const NotasScreen = ({navigation, aEliminar, setAEliminar}) => {
    const [datos, setDatos] = useState([]);
    const [nuevoDato, setNuevoDato] = useState({});
    const [nuevaNota, setNuevaNota] = useState({});
    const inputTitulo = useRef();
    const lista = useRef();
    const urlNotas = "https://erpbackaspnetcore31.azurewebsites.net/api/notas";
  

    useEffect(() => {
      // Update the document title using the browser API
      obtenerNotas();
    }, []);
  
    const algo = () => {
      alert("algo");
    }
  
    function obtenerNotas() {
      fetch(urlNotas)
        .then((response) => response.json())
        .then((json) => {
          setDatos(json);
      })
    }

    function agregarItem() {

      Keyboard.dismiss();
      inputTitulo.current.clear();
      fetch(urlNotas, {
        method: 'POST',
        body: JSON.stringify(nuevaNota),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((response) =>{
        setDatos([...datos, response]);
        // obtenerNotas();
        lista.current.scrollToEnd({animated: true})
      })
    }

    function eliminarNota(id) {
      fetch(urlNotas + "/" + id, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(r => r.json())
      .then(r => {
        obtenerNotas();
      })
    }

    const Item = ({ id, title }) => {
      return (
        <View style={styles.item}>
          <TouchableOpacity
          style={styles.button}
          onLongPress={() => {
            console.log('Long Press');
            setAEliminar(id);
          }}>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    const renderItem = ({ item }) => (
      <Item  id={item.id} title={item.titulo} />
    );
  
    const onChangeText = (title) => {
      setNuevaNota({...nuevaNota, titulo: title})
      // setNuevoDato({id: Math.floor((Math.random())*10000), title: title});
    }

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <TextInput
            onChangeText={onChangeText}
            onSubmitEditing={agregarItem}
            value={nuevaNota.titulo}
            ref={inputTitulo}
          />
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
              ref={lista}
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

function LogoTitle({aEliminar, setAEliminar}) {
  if (aEliminar) {
    return (
      <View>

        <Button title="regresar" />

        {/* <TouchableHighlight onPress={()=>{}}> */}
          <Button title="Eliminar" onPress={() => console.log("Press Boton eliminar")} />
        {/* </TouchableHighlight> */}

        {/* <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png'
          }}
        /> */}
      </View>
    );
  } else {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png'
        }}
      />
    );
  }

}

const App = ({navigation}) => {
  const [aEliminar, setAEliminar] = useState("");

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Notas"
          options={{
            headerTitle:() => <LogoTitle aEliminar={aEliminar} setAEliminar={setAEliminar} />
          }}
        >
          {props => <NotasScreen aEliminar={aEliminar} setAEliminar={setAEliminar} />}
        </Stack.Screen>
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
  button: {
    backgroundColor: "#DDDDDD"
  },
});

export default App;