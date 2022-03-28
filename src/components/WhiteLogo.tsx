import React from 'react'
import { Image, View } from 'react-native';

export const WhiteLogo = () => {
  return (
    <View style={{
        alignItems: 'center',
    }}>
        <Image
         source={ require('../assets/moviappWhite.png') }
         style={{
             width:190,
             height:210,
         }}
        />
    </View>
  )
}
