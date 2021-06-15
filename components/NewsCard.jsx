import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { truncateText, datetoLocale } from '../utils';

const NewsCard = ({ item, onPress, onEditPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress && onPress(item)}>
      <Card
        containerStyle={{
          width: 380,
          // maxWidth: 450,
          alignSelf: 'center',
          minHeight: 200,
          paddingHorizontal: 30,
        }}
      >
        <Card.Title>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 3, flexWrap: 'nowrap' }}>
              <Text>{item.title?.toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1, paddingStart: 40 }}>
              <Icon
                name="edit"
                type="font-awesome"
                color="#888"
                onPress={() => onEditPress && onEditPress(item)}
              />
            </View>
          </View>
        </Card.Title>
        <Card.Divider />
        <View style={{ height: 70 }}>
          <Text style={styles.name}>{truncateText(item.body)}</Text>
        </View>
        <Card.Divider />
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: 60,
          }}
        >
          {/* <Text style={{flex: '1'}}>By{' '}</Text> */}
          <Text style={{ flex: 1, fontWeight: '700' }}>{item.author}</Text>
          <Text style={{ flex: 1 }}>{datetoLocale(item.createdAt)}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default NewsCard;
