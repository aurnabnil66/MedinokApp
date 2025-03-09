// useNetworkStatus.ts
import { useEffect, useState } from 'react';
import NetInfo, { addEventListener } from '@react-native-community/netinfo';

interface NetworkStatus {
  isInternetReachable: boolean;
  isCellularConnection: boolean;
}

const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isInternetReachable: false,
    isCellularConnection: false
  });

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      setNetworkStatus({
        isInternetReachable: state.isConnected ?? false,
        isCellularConnection: state.type === 'cellular'
      });
    });

    // Initial network status check
    void NetInfo.fetch().then(state => {
      setNetworkStatus({
        isInternetReachable: state.isConnected ?? false,
        isCellularConnection: state.type === 'cellular'
      });
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  return networkStatus;
};

export default useNetworkStatus;
