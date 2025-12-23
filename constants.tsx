
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Fashion', icon: '👕' },
  { id: '2', name: 'Groceries', icon: '🛒' },
  { id: '3', name: 'Electronics', icon: '📱' },
  { id: '4', name: 'Home Decor', icon: '🏠' },
  { id: '5', name: 'Beauty', icon: '💄' },
  { id: '6', name: 'Health', icon: '💊' },
];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  const fashionItems = [
    { name: 'Aarong Premium Cotton Panjabi', price: 3200, discount: 2800, img: 'https://images.unsplash.com/photo-1621508650742-1e9d89998492?auto=format&fit=crop&q=80&w=600' },
    { name: 'Dhakai Jamdani Saree (Sky Blue)', price: 9500, img: 'https://images.unsplash.com/photo-1610030469614-2f2f7f185622?auto=format&fit=crop&q=80&w=600' },
    { name: 'Traditional Tangail Silk Saree', price: 6500, discount: 5800, img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600' },
    { name: 'Mens Slim Fit Chino Pant', price: 1450, img: 'https://images.unsplash.com/photo-1473966968600-fa804b86820a?auto=format&fit=crop&q=80&w=600' },
    { name: 'Semi-Long Designer Panjabi', price: 2100, img: 'https://images.unsplash.com/photo-1597983073453-ef90a472c792?auto=format&fit=crop&q=80&w=600' },
    { name: 'Handloom Cotton Lungi', price: 850, img: 'https://images.unsplash.com/photo-1582533089852-02402220abd7?auto=format&fit=crop&q=80&w=600' },
    { name: 'Designer Polo Shirt (Black)', price: 950, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600' },
    { name: 'Embroidery Salwar Kameez', price: 4200, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600' },
    { name: 'Classic Denim Jacket', price: 2400, img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=600' },
    { name: 'Silk Hijab Collection', price: 450, img: 'https://images.unsplash.com/photo-1563200774-4f0144f8f3a3?auto=format&fit=crop&q=80&w=600' }
  ];

  const groceryItems = [
    { name: 'Radhuni Biryani Masala 40g', price: 45, img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=600' },
    { name: 'Teer Soyabean Oil 5L', price: 820, img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600' },
    { name: 'Fresh Miniket Rice 25kg', price: 1650, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600' },
    { name: 'Musur Dal (Premium) 1kg', price: 145, img: 'https://images.unsplash.com/photo-1518013391915-e4435946320a?auto=format&fit=crop&q=80&w=600' },
    { name: 'PRAN Frooto Mango 1L', price: 95, img: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=600' },
    { name: 'Ispahani Mirzapore Tea', price: 420, img: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=600' },
    { name: 'Aarong Ghee 400g', price: 680, img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&q=80&w=600' },
    { name: 'Molasses (Date Palm Gur)', price: 250, img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=600' },
    { name: 'Chanachur Mix 500g', price: 140, img: 'https://images.unsplash.com/photo-1601050633647-8f8f5f3a07b7?auto=format&fit=crop&q=80&w=600' },
    { name: 'Banglar Mishti Roshogolla', price: 450, img: 'https://images.unsplash.com/photo-1589113103503-4945391cadbb?auto=format&fit=crop&q=80&w=600' }
  ];

  const electronicsItems = [
    { name: 'Walton Primo S8 Smartphone', price: 16500, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600' },
    { name: 'Sony Bravia 43" Smart TV', price: 48000, img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=600' },
    { name: 'HP Core i5 Laptop', price: 62000, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600' },
    { name: 'Wireless Noise Canceling HP', price: 3500, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600' },
    { name: 'Gaming Mechanical Keyboard', price: 4200, img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600' }
  ];

  const mapToProduct = (item: any, cat: string): Product => ({
    id: `prod-${Math.random().toString(36).substr(2, 9)}`,
    name: item.name,
    price: item.price,
    discountPrice: item.discount,
    description: `High-quality ${item.name} from Tracketo's verified merchants. Authentic Bangladeshi product with nationwide delivery from Mohammadpur.`,
    category: cat,
    images: [item.img],
    vendorId: 'v-tracketo',
    vendorName: 'Bangla Direct',
    vendorVerified: true,
    rating: 4.2 + Math.random() * 0.8,
    reviewsCount: Math.floor(Math.random() * 500),
    stock: 20 + Math.floor(Math.random() * 30),
    specifications: { 'Origin': 'Bangladesh', 'Dispatch': 'Dhaka Mohammadpur' }
  });

  fashionItems.forEach(i => products.push(mapToProduct(i, 'Fashion')));
  groceryItems.forEach(i => products.push(mapToProduct(i, 'Groceries')));
  electronicsItems.forEach(i => products.push(mapToProduct(i, 'Electronics')));

  // Fill up to 45 with variations
  while(products.length < 45) {
    const base = products[Math.floor(Math.random() * products.length)];
    products.push({ ...base, id: `extra-${products.length}` });
  }

  return products;
};

export const MOCK_PRODUCTS: Product[] = generateProducts();
