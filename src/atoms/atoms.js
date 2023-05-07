import { atom } from "recoil";

export const imgState = atom({
  key: "image",
  default: "",
});

export const taggedPeople = atom({
  key: "taggedPeople",
  default: [],
});

export const taggedProducts = atom({
  key: "taggedProducts",
  default: [],
});

export const locationAtom = atom({
  key: "location",
  default: "",
});

export const captionAtom = atom({
  key: "caption",
  default: "",
});

export const likesAtom = atom({
  key: "likes",
  default: 0,
});

export const usernameAtom = atom({
  key: "username",
  default: "",
});

export const commentsAtom = atom({
  key: "comments",
  default: [],
});

export const elapsedTimeAtom = atom({
  key: "elapsedTime",
  default: 0,
});

