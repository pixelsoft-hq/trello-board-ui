import { v4 as uuidv4 } from "uuid";
export const cardColumns = [
  {
    id: uuidv4(),
    title: "Backlog",
    items: [{ id: uuidv4(), title: "Item1", description: "Item1 Description" }],
  },
  {
    id: uuidv4(),
    title: "In Progress",
    items: [{ id: uuidv4(), title: "Item2", description: "Item2 Description" }],
  },
];
