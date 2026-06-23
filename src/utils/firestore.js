import {
  collection, addDoc, getDocs, doc, deleteDoc,
  updateDoc, query, orderBy, serverTimestamp, getDoc
} from 'firebase/firestore'
import { db } from '../firebase'

const COLLECTION = 'memos'

export async function saveMemo(memo) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...memo,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function getMemos() {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getMemo(id) {
  const docRef = doc(db, COLLECTION, id)
  const snap = await getDoc(docRef)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export async function updateMemo(id, data) {
  const docRef = doc(db, COLLECTION, id)
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() })
}

export async function deleteMemo(id) {
  await deleteDoc(doc(db, COLLECTION, id))
}
