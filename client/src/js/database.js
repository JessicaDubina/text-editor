import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1).transaction('jate', 'readwrite').objectStore('jate').put({id: 1, value: content});
  const result = await jateDB;
  console.log(`Saved to the db`, result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = (await openDB('jate', 1)).transaction('jate', 'readonly').objectStore('jate').get(1);
  const result = await jateDB;
  if (result) {
    console.log(`Retrieved from the db`, result.value);
  } else {
    console.log(`No data found`);
  }
  return result.value; 
};

initdb();
