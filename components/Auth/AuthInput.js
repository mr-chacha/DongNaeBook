import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/native';

const Container = styled.TouchableOpacity`
  flex-direction: column;
  width: 100%;
`;

const StyledTextInput = styled.TextInput`
  padding: 20px 10px;
  font-size: 16px;
  border-radius: 4px;
`;

const AuthInput = forwardRef(({ value, onChangeText, onSubmitEditing, onBlur, placeholder, isPassword, returnKeyType, maxLength }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <StyledTextInput
        isFocused={isFocused}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          onblur();
        }}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        maxLength={maxLength}
        autoCapitalize='none'
        autoCorrect={false}
        textContentType='none'
        underlineColorAndroid={transparent}
      />
    </Container>
  );
});

AuthInput.defaultProps = {
  onBlur: () => {},
};

AuthInput.PropTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  returnKeyType: PropTypes.oneOf(['done', 'next']),
  maxLength: PropTypes.number,
};

export default AuthInput;
