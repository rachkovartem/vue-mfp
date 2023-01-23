const baseName = "mfp";
const storeName = "mfpStore";

function logerr(err: unknown) {
  console.log(err);
}

function connectDB(f: (db: IDBDatabase) => void) {
  const request = indexedDB.open(baseName, 1);
  request.onerror = logerr;
  request.onsuccess = function () {
    f(request.result);
  };
  request.onupgradeneeded = function (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    e.currentTarget?.result?.createObjectStore(storeName, { keyPath: "path" });
    connectDB(f);
  };
}

function getElement(
  element: IDBValidKey | IDBKeyRange,
  f: (prop: unknown) => void
) {
  connectDB(function (db) {
    const request = db
      .transaction([storeName], "readonly")
      .objectStore(storeName)
      .get(element);
    request.onerror = logerr;
    request.onsuccess = function () {
      f(request.result ? request.result : -1);
    };
  });
}

function getStorage(f: (prop: unknown) => void) {
  connectDB(function (db) {
    const rows: Record<string, unknown> = {};
    const store = db
      .transaction([storeName], "readonly")
      .objectStore(storeName);

    store.openCursor().onsuccess = function (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const cursor = e.target?.result;
      if (cursor) {
        cursor.continue();
      } else {
        f(rows);
      }
    };
  });
}

function setElement(element: unknown) {
  connectDB(function (db) {
    const request = db
      .transaction([storeName], "readwrite")
      .objectStore(storeName)
      .put(element);
    request.onerror = logerr;
    request.onsuccess = function () {
      return request.result;
    };
  });
}

function delElement(element: IDBValidKey | IDBKeyRange) {
  connectDB(function (db) {
    const request = db
      .transaction([storeName], "readwrite")
      .objectStore(storeName)
      .delete(element);
    request.onerror = logerr;
    request.onsuccess = function () {
      console.log("Element deleted from DB:", element);
    };
  });
}

export const DB = {
  getStorage,
  getElement,
  delElement,
};
