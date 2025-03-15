declare module 'react-native' {
    interface NativeModulesStatic {
      AlarmModule: {
        // Get the state of the active alarm
        getState(): Promise<string | null>;
  
        // Set a new alarm
        set(alarmDetails: {
          uid: string;
          title: string;
          description: string;
          hour: number;
          minutes: number;
          snoozeInterval: number;
          repeating: boolean;
          active: boolean;
          days: number[];
        }): Promise<void>;
  
        // Update an existing alarm
        update(alarmDetails: {
          uid: string;
          title: string;
          description: string;
          hour: number;
          minutes: number;
          snoozeInterval: number;
          repeating: boolean;
          active: boolean;
          days: number[];
        }): Promise<void>;
  
        // Remove a specific alarm by its UID
        remove(alarmUid: string): Promise<void>;
  
        // Remove all alarms
        removeAll(): Promise<void>;
  
        // Enable a specific alarm by its UID
        enable(alarmUid: string): Promise<void>;
  
        // Disable a specific alarm by its UID
        disable(alarmUid: string): Promise<void>;
  
        // Stop the currently active alarm
        stop(): Promise<void>;
  
        // Snooze the currently active alarm
        snooze(): Promise<void>;
  
        // Get details of a specific alarm by its UID
        get(alarmUid: string): Promise<{
          uid: string;
          title: string;
          description: string;
          hour: number;
          minutes: number;
          snoozeInterval: number;
          repeating: boolean;
          active: boolean;
          days: number[];
        }>;
  
        // Get details of all alarms
        getAll(): Promise<
          Array<{
            uid: string;
            title: string;
            description: string;
            hour: number;
            minutes: number;
            snoozeInterval: number;
            repeating: boolean;
            active: boolean;
            days: number[];
          }>
        >;
      };
    }
  }