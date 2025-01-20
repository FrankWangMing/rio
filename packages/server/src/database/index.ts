import { addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
addRxPlugin(RxDBDevModePlugin);


import { createRxDatabase } from 'rxdb';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';

export const database = await createRxDatabase({
    name: 'mydatabase',
    storage: wrappedValidateAjvStorage({
        storage: getRxStorageDexie()
    })
});