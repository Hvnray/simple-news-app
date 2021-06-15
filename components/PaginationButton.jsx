import React from 'react';
import { ButtonGroup } from 'react-native-elements';

const PaginationButton = ({ page, onPress }) => {
  const buttons = ['back', `Page ${page}`, 'next'];
  return (
    <ButtonGroup
      onPress={onPress}
      disabled={[1]}
      buttons={buttons}
      containerStyle={{
        height: 30,
        maxWidth: 450,
        minWidth: 350,
        alignSelf: 'center',
        paddingHorizontal: 10
      }}
    />
  );
};


export default PaginationButton;
