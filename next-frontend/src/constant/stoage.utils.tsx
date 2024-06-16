export const encode = (data: any) => window.btoa(data);
export const decode = (data: any) => window.atob(data);
let storageMechanism: any;

if (typeof window !== "undefined") {
  storageMechanism = window.localStorage;
}

export const setItem = (key: string, value: any) => {
  const encodedValue = encode(JSON.stringify(value));
  storageMechanism.setItem(key, encodedValue);
};

export const getItem = (key: string) => {
  if (storageMechanism) {
    const value = storageMechanism.getItem(key);
    if (value) {
      return JSON.parse(decode(value));
    }
    return null;
  }
};

export const removeItem = (key: string) => {
  storageMechanism.removeItem(key);
};

export const clearStorage = async () => {
  await storageMechanism.clear();
};
