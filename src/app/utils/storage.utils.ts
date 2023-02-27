export class StorageUtil {

    public static localStorageSave<T>(key: string, value: any): void {
        console.log(key, value)
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    public static localStorageRead<T>(key: string): T | null {
        const storedValue = sessionStorage.getItem(key);
        try {
          if (storedValue) {
            return JSON.parse(storedValue) as T;
          }
          return null;
        } catch (e) {
          sessionStorage.removeItem(key);
          return null;
        }
    
    }
}


