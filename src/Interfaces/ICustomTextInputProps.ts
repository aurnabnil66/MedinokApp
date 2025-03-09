import { type StyleProp, type TextInputProps, type TextStyle } from 'react-native';

interface ICustomTextInputProps extends TextInputProps {
  isPassword?: boolean;
  type: 'string' | 'mobile' | 'email' | 'password';
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  maxLength?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputStyle?: StyleProp<TextStyle>;
  isError?: boolean;
}

export default ICustomTextInputProps;
