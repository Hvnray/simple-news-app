export const truncateText = (text = '', length = '100', ending = '...') => {
    if (!(text && length)) {
      return;
    }
    return length > text.length
      ? text
      : text.substring(0, length - ending.length) + ending;
  };

  export const isEmptyString = (str = '') => str === '';
  export const datetoLocale = (date) =>
  date ? new Date(date).toLocaleString() : new Date().toLocaleString();
