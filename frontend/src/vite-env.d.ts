/// <reference types="vite/client" />

type Blog = {
  author: {
    name: string;
    email: string;
    password: string;
  };
  comment: [];
  content: string;
  file: [string];
  title: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};
