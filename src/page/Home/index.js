import React from 'react';

import {SafeAreaView, StyleSheet, FlatList, View, Text} from 'react-native';
import * as Location from 'expo-location';
import Conditions from '../../components/Conditions';
import Forecast from '../../components/Forecast';
import Header from '../../components/Header';
import Menu from '../../components/menu';
import { useEffect } from 'react';
import { useState } from 'react';

import {api, key} from '../../services/api';

export default function Home(){
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState([]);
    const [icon, setIcon] = useState({name: 'cloud', color: '#FFF'});
    const [background, setBackground] = useState(['#1ED6FF','#97C1FF']);

    const colorCold = '#1ec9ff';
    const colorHot = '#FFB300';
    const colorNeutre = '#FFF';

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();
            
            if(status !== 'granted'){
                setErrorMsg('Permissao negada para acessar a localização');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            
            const response = await api.get(`weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);

            setWeather(response.data);

            if(response.data.results.currently === 'noite'){
              setBackground(['#0C3741', '#0F2F61']);
            }

            switch(response.data.results.condition_slug){
              case 'clear_day':
                setIcon({name: 'partly-sunny', color: colorHot});
                break;
              
              case 'rain':
                setIcon({name: 'rainy', color: colorCold})
                break;

              case 'storm':
                setIcon({naem: 'rainy', color: colorCold});
                break;

              default:
                setIcon({
                    name: 'cloud-outline',
                    color: colorNeutre
                });
          }

          setLoading(false);
            
        })();
    }, [])

    if(loading){
      return(
        <View style={styles.container}>
          <Text style={{fontSize: 17, fontStyle: 'italic', color: '#FFF'}}>Buscando dados...</Text>
        </View>
      )

    }

    return(
        <SafeAreaView style={styles.container}>
            <Menu />
            <Header background={background} weather={weather} icon={icon}/> 
            <Conditions weather={weather}/>

            <FlatList 
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{paddingBottom: '5%'}}
            style={styles.list}
            data={weather.results.forecast}
            keyExtractor={item => item.date}
            renderItem={({item}) => <Forecast data={item} />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0096c7',
        paddingTop: '5%',
    },

    list:{
        marginTop: 10,
        marginLeft: 10
    }
})
