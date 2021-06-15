import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, Input } from 'react-native-elements';
import { isEmptyString } from '../utils';

const AddComments = ({
  newsId,
  error,
  addComment,
  editComment,
  editMode,
  editItem,
  closeModal,
}) => {
  const errorsstate = {
    name: false,
    comment: false,
  };
  const [name, setname] = useState(() => (editItem ? editItem.name : ''));
  const [comment, setcomment] = useState(() =>
    editItem ? editItem.comment : ''
  );
  const [submitting, setsubmitting] = useState(false);
  const [isSuccessfull, setisSuccessfull] = useState(false);
  const [errors, setErrors] = useState(errorsstate);
  const saveComment = async () => {
    if (isEmptyString(name) || isEmptyString(comment)) {
      setErrors({
        name: isEmptyString(name),
        comment: isEmptyString(comment),
      });
      return;
    }
    setsubmitting(true);
    if (editMode) {
      const wasSuccessful = await editComment({
        id: editItem.id,
        name,
        comment,
        newsId,
        avatar: 'http://lorempixel.com/640/480/fashion',
      });
      if (wasSuccessful === true) {
        setisSuccessfull(wasSuccessful);
        setTimeout(() => {
          setname('');
          setcomment('');
          setisSuccessfull(false);
          setErrors(errorsstate);
          closeModal && closeModal();
        }, 300);
      }
      setsubmitting(false);

      return;
    }
    const wasSuccessful = await addComment({
      name,
      comment,
      newsId,
      avatar: 'http://lorempixel.com/640/480/fashion',
    });
    if (wasSuccessful === true) {
      setisSuccessfull(wasSuccessful);
      setTimeout(() => {
        setname('');
        setcomment('');
        setisSuccessfull(false);
        setErrors(errorsstate);
      }, 300);
    }
    setsubmitting(false);
  };
  return (
    <Card style={styles.card}>
      <Card.Title>{editMode ? 'Edit Comment' : `Add New Comment`}</Card.Title>
      <Card.Divider />
      <View>
        <Input
          label="Name"
          placeholder="Your Name?"
          required
          value={name}
          errorMessage={errors.name && 'Enter your name'}
          onChangeText={(value) => {
            setname(value);
            setErrors((errs) => {
              return {
                ...errs,
                name: value === '',
              };
            });
          }}
        />
        <Input
          placeholder="type here"
          label="Body"
          required
          value={comment}
          errorMessage={errors.comment && 'Enter Comment'}
          // leftIcon={{ type: 'font-awesome', name: 'comment' }}
          // style={styles}
          onChangeText={(value) => {
            setcomment(value);
            setErrors((errs) => {
              return {
                ...errs,
                comment: value === '',
              };
            });
          }}
        />
        {error && (
          <Text style={{ color: 'red', fontWeight: '500' }}>
            Error: {error}. Try Again!
          </Text>
        )}
        {isSuccessfull && (
          <Text style={{ color: 'blue', fontWeight: '500' }}>
            Comment Added!
          </Text>
        )}
        <Button
          title="submit"
          loading={submitting}
          icon={{ name: 'add', color: 'white' }}
          buttonStyle={{ height: 50 }}
          onPress={saveComment}
        />
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  card: {
    maxWidth: 450,
    minWidth: 350,
    alignSelf: 'flex-start',
  },
});
const mapState = (state) => ({
  error: state.news.showError,
});

const mapDispatch = (dispatch) => ({
  addComment: (payload) => dispatch.news.submitComment(payload),
  editComment: (payload) => dispatch.news.submitEditComment(payload),
});

export default connect(mapState, mapDispatch)(AddComments);
