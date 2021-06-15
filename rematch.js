import { init } from '@rematch/core';
import axios from './axios';
export const news = {
  state: {
    news: {},
    showError: undefined,
    oneNews: {},
    oneNewsImages: {},
    oneNewsComments: {},
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    addNews(state, payload) {
      return {
        ...state,
        news: { ...state.news, [payload.page]: payload.data },
      };
    },
    deleteNewsPage(state, page) {
      const news = state?.news;
      delete news[page];
      return {
        ...state,
        news: { ...news },
      };
    },
    addOneNewsImages(state, payload) {
      return {
        ...state,
        oneNewsImages: {
          ...state.oneNewsImages,
          [payload.id]: payload.data,
        },
      };
    },
    addOneNewsComments(state, payload) {
      return {
        ...state,
        oneNewsComments: {
          ...state.oneNewsComments,
          [payload.id]: payload.data,
        },
      };
    },
    showError(state, error) {
      return { ...state, showError: error };
    },
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async submitNews(payload, { news }) {
      try {
        dispatch.news.showError(undefined);
        await axios.post(`/news`, payload);
        return true;
      } catch (error) {
        dispatch.news.showError(error.message);
      }
    },
    async submitEditNews(payload, { news }) {
      try {
        const { id, page, ...rest } = payload;
        dispatch.news.deleteNewsPage(page);
        dispatch.news.showError(undefined);
        await axios.put(`/news/${id}`, rest);
        dispatch.news.fetchNews(page);
        return true;
      } catch (error) {
        dispatch.news.showError(error.message);
      }
    },
    async deleteComment(payload) {
      try {
        dispatch.news.showError(undefined);
        await axios.delete(`/news/${payload.newsId}/comments/${payload.id}`);
        const { data } = await axios.get(`/news/${payload.newsId}/comments`);
        dispatch.news.addOneNewsComments({ data, id: payload.newsId });
        return true;
      } catch (error) {
        dispatch.news.showError(error.message);
      }
    },
    async submitComment(payload) {
      try {
        dispatch.news.showError(undefined);
        await axios.post(`/news/${payload.newsId}/comments`, payload);
        const { data } = await axios.get(`/news/${payload.newsId}/comments`);
        dispatch.news.addOneNewsComments({ data, id: payload.newsId });
        return true;
      } catch (error) {
        dispatch.news.showError(error.message);
      }
    },
    async submitEditComment(payload) {
      try {
        dispatch.news.showError(undefined);
        await axios.put(
          `/news/${payload.newsId}/comments/${payload.id}`,
          payload
        );
        const { data } = await axios.get(`/news/${payload.newsId}/comments`);
        dispatch.news.addOneNewsComments({ data, id: payload.newsId });
        return true;
      } catch (error) {
        dispatch.news.showError(error.message);
      }
    },
    async fetchNews(payload, { news }) {
      if (!news?.news[payload]) {
        try {
          dispatch.news.showError(undefined);
          const { data } = await axios.get(
            `/news?page=${payload || 1}&limit=10`
          );
          dispatch.news.addNews({ data, page: payload });
        } catch (error) {
          dispatch.news.showError(error.message);
        }
      }
    },
    async fetchOneNews(payload, { news }) {
      if (!news?.oneNews[payload]) {
        try {
          dispatch.news.showError(undefined);
          const { data } = await axios.get(`/news/${payload}`);
          dispatch.news.addOneNews({ data, page: payload });
        } catch (error) {
          dispatch.news.showError(error.message);
        }
      }
    },
    async fetchNewsImages(payload, { news }) {
      if (!news?.oneNewsImages[payload]) {
        try {
          dispatch.news.showError(undefined);
          const { data } = await axios.get(`/news/${payload}/images`);
          dispatch.news.addOneNewsImages({ data, id: payload });
        } catch (error) {
          dispatch.news.showError(error.message);
        }
      }
    },
    async fetchNewsComments(payload, { news }) {
      if (!news?.oneNewsComments[payload]) {
        try {
          dispatch.news.showError(undefined);
          const { data } = await axios.get(`/news/${payload}/comments`);
          dispatch.news.addOneNewsComments({ data, id: payload });
        } catch (error) {
          dispatch.news.showError(error.message);
        }
      }
    },
  }),
};

const store = init({
  models: {
    news,
  },
});

export default store;
