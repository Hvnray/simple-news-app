import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  Text,
  ScrollView,
} from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { isEmptyString } from '../../utils';

const AddNews = ({ navigation, route, addNews, editNews, error }) => {
  const [author, setauthor] = useState(() => route.params?.item?.author || '');
  const [submitting, setsubmitting] = useState(false);
  const [isSuccessfull, setisSuccessfull] = useState(false);
  const [title, settitle] = useState(() => route.params?.item?.title || '');
  const [body, setbody] = useState(() => route.params?.item?.body || '');
  const [errors, setErrors] = useState({
    author: false,
    title: false,
    body: false,
  });
  const handleSubmit = async () => {
    if (isEmptyString(author) || isEmptyString(title) || isEmptyString(body)) {
      setErrors({
        author: isEmptyString(author),
        title: isEmptyString(title),
        body: isEmptyString(body),
      });
      return;
    }
    setsubmitting(true);
    if (route.params?.item.id) {
      const wasSuccessful = await editNews(
        {
          author,
          body,
          title,
          id: route.params.item.id,
          page: route.params.page,
        },
      );
      if (wasSuccessful === true) {
        setisSuccessfull(wasSuccessful);
        setTimeout(() => {
          navigation.goBack();
        }, 3000);
      }
      setsubmitting(false);
      return;
    }
    const wasSuccessful = await addNews({ author, body, title });
    if (wasSuccessful === true) {
      setisSuccessfull(wasSuccessful);
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
    }
    setsubmitting(false);
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Card
          wrapperStyle={{
            maxWidth: '100%',
            // margin: '0 auto'
          }}
          containerStyle={{
            width: 350,
            // flex: 1,
            alignSelf: 'center',
            // margin: '0 auto'
          }}
        >
          <Card.Title>
            {route.params?.item ? 'EDIT NEWS' : 'ADD NEWS'}
          </Card.Title>
          <Card.Divider />
          <View>
            <Input
              placeholder="Enter your Name"
              label="Author"
              required
              value={author}
              errorMessage={errors.author && 'Enter news Author'}
              onChangeText={(value) => {
                setauthor(value);
                setErrors((errs) => {
                  return {
                    ...errs,
                    author: value === '',
                  };
                });
              }}
            />
            <Input
              placeholder="News title"
              label="Title"
              required
              value={title}
              errorMessage={errors.title && 'Enter news title'}
              onChangeText={(value) => {
                settitle(value);
                setErrors((errs) => {
                  return {
                    ...errs,
                    title: value === '',
                  };
                });
              }}
            />
            <Input
              placeholder="News Body"
              label="Body"
              required
              multiline
              title
              value={body}
              numberOfLines={5}
              errorMessage={errors.body && 'Enter news body'}
              onChangeText={(value) => {
                setbody(value);
                setErrors((errs) => {
                  return {
                    ...errs,
                    body: value === '',
                  };
                });
              }}
            />
            <Card.Divider />
            {error && (
              <Text style={{ color: 'red', fontWeight: '500' }}>
                Error: {error}. Try Again!
              </Text>
            )}
            {isSuccessfull && (
              <Text style={{ color: 'blue', fontWeight: '500' }}>
                News Added, You'd be redirected to homepage!
              </Text>
            )}
            <Button
              title="News"
              loading={submitting}
              icon={{
                name: route.params?.item ? 'edit' : 'add',
                color: 'white',
              }}
              buttonStyle={{ height: 'auto' }}
              onPress={handleSubmit}
            />
          </View>
        </Card>
        {/* <Comments list={newsComment[route.params.item.id]} /> */}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const mapState = (state) => ({
  error: state.news.showError,
});

const mapDispatch = (dispatch) => ({
  addNews: (payload) => dispatch.news.submitNews(payload),
  editNews: (payload) => dispatch.news.submitEditNews(payload),
});

export default connect(mapState, mapDispatch)(AddNews);
