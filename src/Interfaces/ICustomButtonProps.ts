interface ICustomButtonProps {
  text: string;
  icon: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  pageName?: string;
}

export default ICustomButtonProps;
