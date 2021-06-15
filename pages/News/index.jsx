import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import NewsCard from '../../components/NewsCard';
import PaginationButton from '../../components/PaginationButton';
import ErrorHandler from '../../components/ErrorHandler';

const Index = ({ navigation, newsData, fetchNews, showError }) => {
  // const navigation = useNavigation();
  const [page, setpage] = React.useState(1);
  const handlePress = (item) => {
    navigation.push('OneNews', {
      item,
    });
  };
  const onEditPress = (item) => {
    navigation.push('AddNews', {
      item,
      page,
    });
  };
  const handlePagePress = (btn) => {
    //back button pressed
    if (Number(btn) === 0) {
      setpage((page) => (page <= 1 ? 1 : page - 1));
    }
    //next button pressed
    if (Number(btn) === 2) {
      setpage((page) => page + 1);
    }
  };
  React.useEffect(() => {
    fetchNews(page);
  }, [page]);
  const onReload = () => {
    fetchNews(page);
  };
  const renderItem = ({ item }) => (
    <NewsCard item={item} onPress={handlePress} onEditPress={onEditPress} />
  );
  if (showError) {
    return (
      <ErrorHandler
        onReload={onReload}
        showError={showError}
        errorMessage="Error Fetching News"
      />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View style={{ backgroundColor: '#888' }}>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('AddNews');
              }}
              style={{ backgroundColor: '#888', padding: 10 }}
            >
              <Text
                style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}
              >
                Add News
              </Text>
            </TouchableOpacity>
            <PaginationButton onPress={handlePagePress} page={page} />
          </View>
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', padding: 20 }}>
            Loading News...
          </Text>
        }
        data={newsData[page]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const mapState = (state) => ({
  newsData: state.news.news,
  showError: state.news.showError,
});

const mapDispatch = (dispatch) => ({
  fetchNews: (page) => dispatch.news.fetchNews(page),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
export default connect(mapState, mapDispatch)(Index);
