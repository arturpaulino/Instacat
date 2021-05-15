import React from 'react';
import {StatusBar, ActivityIndicator, View, StyleSheet} from 'react-native';

import Colors from '../../styles/Colors';

const Loading = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      { (props.size) ?
         <ActivityIndicator color={Colors.blue} size={props.size} /> : 
         <ActivityIndicator color={Colors.blue} size={60} />
      }  


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;