export interface Category {
  filter(
    arg0: (
      category: Category
    ) => (searchElement: unknown, fromIndex?: number) => boolean
  ): unknown;
  id: number;
  title: string;
  createdAt: string;
}

// export const dummyCategory: Category[] = [
//   {
//     id: 1,
//     title: "Category 1",
//     createdAt: "Jan 11, 2023 09:15 AM",
//   },
//   {
//     id: 2,
//     title: "Category 2",
//     createdAt: "Jan 11, 2023 09:15 AM",
//   },
//   {
//     id: 3,
//     title: "Category 3",
//     createdAt: "Jan 11, 2023 09:15 AM",
//   },
// ];
