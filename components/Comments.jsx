import React, { useState, useRef } from 'react';
import {
  FlatList,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Avatar, Button, Card, Input } from 'react-native-elements';
import { datetoLocale } from '../utils';
import AddComments from './AddComments';
import Modal from 'react-native-modal';

const EditModal = ({ modalVisible, editItem, newsId, setModalVisible }) => (
  <Modal
    // animationIn="slide"
    // transparent={true}
    isVisible={modalVisible}
    onBackdropPress={() => {
      setModalVisible(false);
    }}
  >
    {/* <View style={styles.centeredView} */}
    <AddComments
      newsId={newsId}
      editItem={editItem}
      editMode
      closeModal={() => setModalVisible(false)}
    />
    {/* </View> */}
  </Modal>
);
const Comments = ({ list, newsId, deleteComment }) => {
  const keyExtractor = (item) => item.id;
  const [editItem, seteditItem] = useState(undefined);
  const [isDeleteing, setisDeleteing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleEdit = (item) => {
    seteditItem(item);
    setModalVisible(true);
  };
  const handleDelete = async (id) => {
    setisDeleteing(true);
    const hasdelete = await deleteComment({ newsId, id });
    if (hasdelete === true) {
      setisDeleteing(false);
    }
  };
  const renderItem = ({ item }) => (
    <ListItem.Swipeable
      bottomDivider
      leftWidth={100}
      leftStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2089DC',
      }}
      rightStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}
      leftContent={
        <Button
          title="Edit"
          icon={{ name: 'settings', color: 'white' }}
          buttonStyle={{ minHeight: 100, width: '100%' }}
          onPress={() => handleEdit(item)}
        />
      }
      rightWidth={100}
      rightContent={
        <Button
          title="Delete"
          loading={isDeleteing}
          icon={{ name: 'delete', color: 'white' }}
          onPress={() => handleDelete(item.id)}
          buttonStyle={{
            minHeight: 100,
            width: '100%',
            backgroundColor: 'red',
          }}
        />
      }
    >
      <Avatar
        title={item.name[0]}
        source={item.avatar && { uri: item.avatar }}
      />
      <ListItem.Content>
        <ListItem.Title>{item.comment}</ListItem.Title>
        <ListItem.Subtitle>{item.name}</ListItem.Subtitle>
        <ListItem.Subtitle>{datetoLocale(item.createdAt)}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
  return (
    <SafeAreaView>
      <EditModal
        editItem={editItem}
        modalVisible={modalVisible}
        newsId={newsId}
        setModalVisible={setModalVisible}
      />
      <View
        style={{
          // flex: 1,
          // position: 'relative',
          // top: 0,
          // left: 0,
          alignContent: 'center',
          maxWidth: 450,
          minWidth: 380,
        }}
      >
        <FlatList
          keyExtractor={keyExtractor}
          data={list}
          renderItem={renderItem}
          // ListHeaderComponent={}
          ListFooterComponent={<AddComments newsId={newsId} />}
          ListFooterComponentStyle={styles.ListHeaderComponentStyle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ListHeaderComponentStyle: {
    textTransform: 'capitalize',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: 10,
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  card: {
    maxWidth: 450,
    minWidth: 350,
    // alignSelf: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  minHeight: { minHeight: `100%` },
});

const mapState = (state) => ({
  error: state.news.showError,
});

const mapDispatch = (dispatch) => ({
  // editComment: (payload) => dispatch.news.editComment(payload),
  deleteComment: (payload) => dispatch.news.deleteComment(payload),
});

export default connect(mapState, mapDispatch)(Comments);
