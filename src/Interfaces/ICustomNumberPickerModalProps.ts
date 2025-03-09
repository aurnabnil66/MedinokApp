interface ICustomNumberPickerModalProps {
  isVisible: boolean;
  min: number;
  max: number;
  selectedValue: string;
  leftText?: string;
  rightText?: string;
  onValueChange: (value: string) => void;
  onOk: () => void;
  onCancel: () => void;
}

export default ICustomNumberPickerModalProps;
