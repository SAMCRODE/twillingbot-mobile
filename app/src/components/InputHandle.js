import React, { useReducer, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { useSelector } from 'react-redux';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        touched: true,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const InputHandle = props => {
  const handles = useSelector(state => state.user.handles);
  const [filteredHandles, setFilteredHandles] = useState(handles);
  const [selectedValue, setSelectedValue] = useState('');

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: !!props.initiallyValid,
    touched: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    // console.log('vou chamar ? ', inputState.touched)
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    findHandle(text);
    let isValid = true;
    // console.log(text, 'eh o texto')
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    // console.log(isValid,
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    // console.log('ON BLUR')
    dispatch({ type: INPUT_BLUR });
  };

  let icon;

  if(props.icon){
    // icon = <FontAwesome name={props.icon} style={styles.icon} size={15} color="grey" />
  }

  const findHandle = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');

      setFilteredHandles(
          handles.filter((handle) => handle.search(regex) >= 0)
      );
    } else {
      setFilteredHandles(handles);
    }
  }

  return (
      <View style={styles.inputContainer}>
        <Autocomplete
            {...props}
            data={filteredHandles}
            defaultValue={
              selectedValue
            }
            keyExtractor={(item, i) => 'key' + i}
            containerStyle={{ ...styles.input, ...props.style, ...styles.abc,}}
            listContainerStyle={styles.suggest}
            listStyle={styles.suggest}
            placeholder={props.placeholder}
            renderItem={({item}) => (
                <TouchableOpacity
                    style={styles.textComponent}
                    onPress={() => {
                      setSelectedValue(item);
                      setFilteredHandles(handles);
                      dispatch({ type: INPUT_CHANGE, value: item, isValid: true });
                    }}
                >
                  <Text
                      key={Math.random()}
                      style={styles.textItem}>
                    {item}
                  </Text>

                </TouchableOpacity>
            )}
            onChangeText={textChangeHandler}
            onEndEditing={lostFocusHandler}
        />
        {!!props.showError && !inputState.isValid && inputState.touched && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{props.errorText}</Text>
            </View>
        )}
      </View>);
};

const styles = StyleSheet.create({
  abc: {
    alignContent: 'space-between',

  },
  suggest: {
    padding: 0,
    margin: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 0,

  },
  input: {
    borderBottomColor: '#ffffff',
    width: '100%',
    height: '100%',
    borderBottomWidth: 0,
    padding: 3,
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  icon: {
    paddingRight: 0
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    color: 'red',
    fontSize: 13
  },
  textItem: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.blueTwitter
  }
});

export default InputHandle;
