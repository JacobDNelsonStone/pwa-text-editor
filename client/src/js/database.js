
import { openDB } from 'idb';

// We will define a global constant for our database name so we don't mess it up anywhere
const DB_NAME = "jate"

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

/*
  We need to add some code below which will take updated content and save it to IndexedDB.
*/
export const putDb = async (content) => {
  // First, create a variable, and set it to asyncronously await the opening of the database. Replace the items in all caps
  // TODO: Change YOUR_OPEN_DB_VAR to whatever variable name you wanT. Note that you'll then need to change any other occcurences of YOUR_OPEN_DB_VAR to the same variable name.
  const dbOpening = await openDB(DB_NAME, 1);

  // TODO: Now create a variable for the transaction; again, this will be referenced below.
  const transaction = dbOpening.transaction(DB_NAME, 'readwrite');

  // TODO: Now create a variable for the store
  const store = transaction.objectStore(DB_NAME);

  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

export const getDb = async () => {
  
  const transaction = dbOpening.transaction(DB_NAME, 'readonly');

  const store = transaction.objectStore(DB_NAME);

  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
