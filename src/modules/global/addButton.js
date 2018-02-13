import React from 'react';
import { Button } from 'react-native';

const AddButton = ({ onAddPressed, date }) => {
  return (
    <Button
      onPress={() => {
        onAddPressed(date);
      }}
      title="Add event"
      color="#00adf5"
    />
  );
};

export default AddButton;
