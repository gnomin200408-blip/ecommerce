export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
};

export type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export type Review = {
  rating: number;
  comment: string;
  date: string; // or Date if you parse it
  reviewerName: string;
  reviewerEmail: string;
};

export type Meta = {
  createdAt: string; // or Date
  updatedAt: string; // or Date
  barcode: string;
  qrCode: string;
};
export type ProductApiResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
