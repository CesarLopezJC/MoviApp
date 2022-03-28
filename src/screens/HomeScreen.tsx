import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';


import { useMovies, } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HorizontalSlider } from '../components/HorizontalSlider';


const {width : windowWidth} =Dimensions.get('window');

export const HomeScreen = () => {

   const { nowPaying,popular,topRated, upcoming, isLoading } = useMovies();

   const{top}= useSafeAreaInsets();

   if(isLoading){
       return(<View style={{flex:1, justifyContent: 'center', alignContent: 'center'}}>
           <ActivityIndicator style={{marginTop:25}} color='blue' size={25} />
       </View>)
   }

//    console.log(peliculasCine[2]?.title);

    return (
        <ScrollView>
            <View style={{marginTop:top+20}}>
                {/* <MoviePoster
                    movie={peliculasCine[4]}
                /> */}


                {/* CARRUCEL PRINCIPAL */}
                <View 
                style={{ height:440 }}
                >
                    <Carousel
                        data={nowPaying}
                        renderItem={( ({item}: any)=> 
                        <MoviePoster movie={item}/>
                        // <Text>{peliculasCine[item]}</Text> 
                        )}
                        sliderWidth={windowWidth}
                        itemWidth={300}
                    />
                </View >



                {/* PELICULAS POPULARES
                <View style={{ height:250}}>
                    <Text style={{fontSize:25, fontWeight:'bold'}}>En cines</Text>
                    <FlatList
                        data={peliculasCine}
                        renderItem={( ({item}: any)=> 
                        (
                        <MoviePoster movie={item} width={140} height={200}/>
                        )
                        // <Text>{peliculasCine[item]}</Text> 
                        )}
                        keyExtractor={(item) =>item.id.toString()}

                        horizontal={true}
                        showsHorizontalScrollIndicator={false}

                    />
                </View> */}


                {/* PELICULAS POPULARES */}
                <HorizontalSlider  title="Top Rated" movie={topRated} />
                <HorizontalSlider  title="Populares" movie={popular} />
                <HorizontalSlider  title="Upcoming" movie={upcoming} />
            </View>
        </ScrollView>
    )
}
