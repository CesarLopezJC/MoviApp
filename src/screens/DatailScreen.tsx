import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Result } from '../interces/movieInterface';
import { MovieDatails } from '../components/MovieDatails';
import { ScrollView } from 'react-native-gesture-handler';
import { HomeScreen } from './HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMoviesDatails } from '../hooks/useMoviesDatails';
import { RootStackParams } from '../navigator/Navigator';



const screenHeight  = Dimensions.get('screen').height;

//SABER QUE ES LO QUE RESIBE CON LOS PROPS, LOS CUALES FUERON DEVIDIDOS PO
interface Props extends StackScreenProps<RootStackParams, 'DatailScreen'>{};

export const DatailScreen = ({route}: Props) => {

    const movie=route.params as Result;
    const uri= `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    

    const {isLoading,movifull,cast} = useMoviesDatails(movie.id);
    // console.log({cast});
    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image
                    source={{uri}}
                    style={ styles.posterImage}
                />
            </View>
            <View style={styles.marginContainer}>
                <Text style={styles.subtitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>

            <View style={{marginHorizontal: 15,}}>
                {
                    isLoading? <ActivityIndicator size={25} color="grey" style={{marginTop:20}}/> : <MovieDatails  movieFull={movifull} cast={cast} />
                }
                
            </View>

            {/* Boton de cerrar */}
            {/* <Icon color='white' name="arrow-back-outline" size={100} style={styles.backbuttom}/> */}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    imageContainer:{
        width: '100%',
        height: screenHeight*0.7,
        shadowColor: "#000",
        backgroundColor:'#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,

        elevation: 15,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    posterImage:{
        flex: 1,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    marginContainer:{
        marginTop:25,
        marginHorizontal: 15,
    },
    subtitle:{
        fontSize:16,
        opacity:0.8,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        
    },
    backbuttom:{
        position: 'absolute',
        zIndex:999,
        elevation:9,
        top: 30,
        left: 20,
    }
});










// MANERA POCO ORTODOXA
// import { StackScreenProps } from '@react-navigation/stack';
// import React from 'react'
// import { Text, View } from 'react-native';
// import { Result } from '../interces/movieInterface';

// interface Props extends StackScreenProps<any,any>{};

// export const DatailScreen = ({route}: Props) => {

//     const movie=route.params as Result;

//     console.log(movie);

//     return (
//         <View>
//             <Text>DatailScreen</Text>
//         </View>
//     )
// }
