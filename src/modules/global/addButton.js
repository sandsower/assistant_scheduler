import React from 'react';
import { Button } from 'react-native';

const AddButton = ({ onAddPressed, date, title }) => {
  return (
    <Button
      onPress={() => {
        onAddPressed(date);
      }}
      title={title}
      color="#00adf5"
    />
  );
};

export default AddButton;
