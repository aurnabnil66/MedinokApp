import AsyncStorage from '@react-native-async-storage/async-storage';

import { type STORAGE_KEYS } from '../constants/storageKey';

type StorageKeysType = keyof typeof STORAGE_KEYS;

/* Async storage related all method will resides here. */

export async function getItemFromAsyncStorage<T>(key: StorageKeysType): Promise<T | null> {
  const value = await AsyncStorage.getItem(key);
  if (value !== null) {
    return JSON.parse(value) as T;
  }

  return null;
}

export async function setItemInAsyncStorage<T>(key: StorageKeysType, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeItemFromAsyncStorage(key: StorageKeysType): Promise<void> {
  await AsyncStorage.removeItem(key);
}

// set multiple items

export async function setMultipleItemsInAsyncStorage<T>(data: T): Promise<void> {
  await AsyncStorage.multiSet(data as Array<[string, string]>);
}

export async function getMultipleItemsFromAsyncStorage<T>(keys: STORAGE_KEYS[]): Promise<T | null> {
  const value = await AsyncStorage.multiGet(keys);

  if (value !== null) {
    return value as T;
  }

  return null;
}

export async function removeMultipleItemsFromAsyncStorage(keys: STORAGE_KEYS[]): Promise<void> {
  await AsyncStorage.multiRemove(keys);
}
