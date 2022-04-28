import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from './firebase';

export async function getAsByteArray(file: any) {
    return new Uint8Array(await read(file));
}

function read(input: any) {
    return new Promise<Uint8Array>((resolve, reject) => {
        let reader = new FileReader();

        // @ts-ignore
        reader.addEventListener('loadend', (e) => resolve(e.target.result));
        reader.addEventListener('error', () => reject);

        reader.readAsArrayBuffer(input);
    });
}

export function createTask(name: string, type: string, bytes: Uint8Array) {
    const storageRef = ref(getStorage(app), name);

    const uploadTask = uploadBytesResumable(storageRef, bytes, {
        contentType: type
    });

    return uploadTask;
}
