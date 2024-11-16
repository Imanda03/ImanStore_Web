export interface ProductProps {
  id: number;
  title: string;
  type: "Item" | "Service";
  price: string;
  status: "Published" | "Draft" | "Inactive";
  totalSales: number;
  totalRevenue: string;
  createdAt: string;
  imageUrl: string;
  category: string;
  category_id?: number;
}

// export const dummyProducts: ProductProps[] = [
//   {
//     id: 1,
//     title: "Chart Library - Free 90+ Charts UI KIT",
//     type: "Item",
//     price: "200 USD",
//     status: "Published",
//     totalSales: 10,
//     totalRevenue: "2,000 USD",
//     createdAt: "Jan 12, 2023 3:40 PM",
//     imageUrl: "/api/placeholder/50/50",
//     category: "Foods",
//   },
//   {
//     id: 2,
//     title: "SEO Consultation Session",
//     type: "Service",
//     price: "200 USD / Day",
//     status: "Draft",
//     totalSales: 0,
//     totalRevenue: "--",
//     createdAt: "Jan 12, 2023 1:05 PM",
//     imageUrl: "/api/placeholder/50/50",
//     category: "Foods",
//   },
//   {
//     id: 3,
//     title: "Sony A7III Mirrorless Camera",
//     type: "Item",
//     price: "250 USD",
//     status: "Published",
//     totalSales: 15,
//     totalRevenue: "3,750 USD",
//     createdAt: "Jan 11, 2023 11:50 AM",
//     imageUrl: "/api/placeholder/50/50",
//     category: "Baby Products",
//   },
//   {
//     id: 4,
//     title: '"The Great Gatsby" Book Purchase',
//     type: "Item",
//     price: "250 USD",
//     status: "Inactive",
//     totalSales: 15,
//     totalRevenue: "3,750 USD",
//     createdAt: "Jan 11, 2023 09:15 AM",
//     imageUrl: "/api/placeholder/50/50",
//     category: "Baby Products",
//   },
//   {
//     id: 5,
//     title: "Personal Financial Analysis",
//     type: "Service",
//     price: "320.000 IDR / Month",
//     status: "Published",
//     totalSales: 20,
//     totalRevenue: "6,400,000 IDR",
//     createdAt: "Jan 11, 2023 08:45 AM",
//     imageUrl: "/api/placeholder/50/50",
//     category: "Baby Products",
//   },
// ];
