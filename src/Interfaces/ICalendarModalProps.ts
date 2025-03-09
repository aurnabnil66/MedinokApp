interface ICalendarModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setStartDate?: (date: string) => void;
  setEndDate?: (date: string) => void;
  modalFOr: string;
}

export default ICalendarModalProps;
