import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  View,
  ScrollView,
  Text,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { Card } from 'react-native-elements';
import { datetoLocale } from '../../utils';
import Comments from '../../components/Comments';
const OneNews = ({
  navigation,
  route,
  fetchNewsImages,
  fetchNewsComments,
  newsImage,
  newsComment,
}) => {
  const [item] = React.useState(() => route.params.item);
  const windowWidth = useWindowDimensions().width - 50;

  React.useEffect(() => {
    fetchNewsImages(route.params.item.id);
    fetchNewsComments(route.params.item.id);
  }, []);
  React.useEffect(() => {}, [newsImage]);
  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item?.image }}
      key={item.id}
      style={{
        width: 260,
        height: 300,
        borderWidth: 1,
        borderColor: '#888',
        margin: 4,
      }}
    />
  );
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <Card
        wrapperStyle={{}}
        containerStyle={{
          alignItems: 'center',
          minWidth: 370,
          maxWidth: 450,
          flexGrow: 1,
        }}
      >
        <Card.Title>{item?.title?.toUpperCase()}</Card.Title>
        <Card.Divider />
        <Text style={{ padding: 10, flexWrap: 'wrap' }}>{item?.body}</Text>
        <Card.Divider />
        <View style={{ height: 350 }}>
          <FlatList
            data={newsImage[route.params.item.id]}
            horizontal
            style={{ width: windowWidth }}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <Text style={{ paddingStart: 10, fontWeight: '700' }}>
          {item?.author}
        </Text>
        <Text style={{ paddingStart: 10 }}>
          {datetoLocale(item?.createdAt)}
        </Text>
        {/* </View> */}
        <Card.Divider />
        <Text style={{ fontWeight: '700', textAlign: 'center', padding: 20 }}>
          COMMENTS
        </Text>
          <Comments
            list={newsComment[route.params.item.id]}
            newsId={route.params.item.id}
          />
      </Card>
    </ScrollView>
  );
};

const mapState = (state) => ({
  newsComment: state.news.oneNewsComments,
  newsImage: state.news.oneNewsImages,
});

const mapDispatch = (dispatch) => ({
  fetchNewsImages: (page) => dispatch.news.fetchNewsImages(page),
  fetchNewsComments: (page) => dispatch.news.fetchNewsComments(page),
});

export default connect(mapState, mapDispatch)(OneNews);
