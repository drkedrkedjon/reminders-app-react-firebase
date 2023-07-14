import { storage } from "./firebase";
import { ref } from "firebase/storage";

// Points to the root reference
export const storageRef = ref(storage);
// Points to 'images'
export const imagesRef = ref(storageRef, "images");
