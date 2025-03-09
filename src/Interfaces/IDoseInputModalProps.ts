interface IDoseInputModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (inputValue: number) => void;
  numKeybaordType: boolean;
}

export default IDoseInputModalProps;
