// useDisableButton.ts

import { useCallback, useEffect, useState } from 'react';

interface UseDisableButtonReturnType {
  isButtonDisabled: boolean;
  disableButton: () => void;
}

const useDisableButton = (inputDelay: string): UseDisableButtonReturnType => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const disableButton = useCallback(() => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
    }
  }, [isButtonDisabled]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (isButtonDisabled) {
      timeoutId = setTimeout(
        () => {
          setIsButtonDisabled(false);
        },
        parseInt(inputDelay) * 1000
      );
    }

    return () => {
      clearTimeout(timeoutId); // Use the non-null assertion operator
    };
  }, [isButtonDisabled, inputDelay]);

  return { isButtonDisabled, disableButton };
};

export default useDisableButton;
