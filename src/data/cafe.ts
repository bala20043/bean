import sigCaramel from "@/assets/sig-caramel.jpg";
import sigCappuccino from "@/assets/sig-cappuccino.jpg";
import sigSpanish from "@/assets/sig-spanish.jpg";
import sigMocha from "@/assets/sig-mocha.jpg";
import menuFlatWhite from "@/assets/menu-flatwhite.jpg";
import menuColdBrew from "@/assets/menu-coldbrew.jpg";
import menuChai from "@/assets/menu-chai.jpg";
import menuMatcha from "@/assets/menu-matcha.jpg";
import menuCroissant from "@/assets/menu-croissant.jpg";
import menuAvocado from "@/assets/menu-avocado.jpg";
import menuSandwich from "@/assets/menu-sandwich.jpg";
import menuLava from "@/assets/menu-lava.jpg";
import menuTiramisu from "@/assets/menu-tiramisu.jpg";
import menuCheesecake from "@/assets/menu-cheesecake.jpg";

export type Category = "coffee" | "tea" | "snacks" | "desserts";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  signature?: boolean;
};

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "coffee", label: "Coffee" },
  { id: "tea", label: "Tea" },
  { id: "snacks", label: "Snacks" },
  { id: "desserts", label: "Desserts" },
];

export const menuItems: MenuItem[] = [
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    description: "Velvety espresso layered with sweet caramel and silky milk foam.",
    price: 180,
    category: "coffee",
    image: sigCaramel,
    signature: true,
  },
  {
    id: "classic-cappuccino",
    name: "Classic Cappuccino",
    description: "Balanced double shot under a cloud of microfoam and cocoa dust.",
    price: 150,
    category: "coffee",
    image: sigCappuccino,
    signature: true,
  },
  {
    id: "spanish-latte",
    name: "Spanish Latte",
    description: "Rich espresso blended with sweetened condensed milk and cinnamon.",
    price: 190,
    category: "coffee",
    image: sigSpanish,
    signature: true,
  },
  {
    id: "mocha-bliss",
    name: "Mocha Bliss",
    description: "Dark chocolate, espresso and steamed milk, finished with drizzle.",
    price: 200,
    category: "coffee",
    image: sigMocha,
    signature: true,
  },
  {
    id: "flat-white",
    name: "Flat White",
    description: "Bold double ristretto with a velvety touch of steamed milk.",
    price: 160,
    category: "coffee",
    image: menuFlatWhite,
  },
  {
    id: "cold-brew",
    name: "24-Hour Cold Brew",
    description: "Slow-steeped overnight for a smooth, low-acid finish over ice.",
    price: 170,
    category: "coffee",
    image: menuColdBrew,
  },
  {
    id: "iced-masala-chai",
    name: "Iced Masala Chai",
    description: "Spiced black tea over ice with a hint of lemon and honey.",
    price: 140,
    category: "tea",
    image: menuChai,
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    description: "Ceremonial-grade matcha whisked with steamed oat milk.",
    price: 170,
    category: "tea",
    image: menuMatcha,
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    description: "Flaky, golden and baked fresh in-house every morning.",
    price: 120,
    category: "snacks",
    image: menuCroissant,
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    description: "Smashed avocado on sourdough with chilli flakes and toasted seeds.",
    price: 240,
    category: "snacks",
    image: menuAvocado,
  },
  {
    id: "grilled-sandwich",
    name: "Grilled Cheese Sandwich",
    description: "Aged cheddar and vine tomato pressed on rustic sourdough.",
    price: 220,
    category: "snacks",
    image: menuSandwich,
  },
  {
    id: "molten-lava-cake",
    name: "Molten Lava Cake",
    description: "Warm dark chocolate cake with a gooey molten heart.",
    price: 220,
    category: "desserts",
    image: menuLava,
  },
  {
    id: "tiramisu",
    name: "Classic Tiramisu",
    description: "Espresso-soaked layers with mascarpone and dusted cocoa.",
    price: 250,
    category: "desserts",
    image: menuTiramisu,
  },
  {
    id: "blueberry-cheesecake",
    name: "Blueberry Cheesecake",
    description: "Baked cheesecake with a berry swirl on a buttery crust.",
    price: 260,
    category: "desserts",
    image: menuCheesecake,
  },
];

export const signatureItems = menuItems.filter((item) => item.signature);

export const offers = [
  {
    id: "morning",
    tag: "Morning",
    title: "Morning Brew Combo",
    description: "A freshly brewed coffee plus a warm butter croissant to start the day.",
    highlight: "₹220",
  },
  {
    id: "student",
    tag: "Students",
    title: "Student Special",
    description: "10% off any menu item, every day — just show a valid student ID.",
    highlight: "10% OFF",
  },
  {
    id: "weekend",
    tag: "Weekend",
    title: "Weekend Treat",
    description: "Any signature coffee paired with a dessert of your choice.",
    highlight: "₹340",
  },
];

export const cafeInfo = {
  address: "14 Marina Walk, Bandra West, Mumbai 400050",
  phone: "+91 98200 45678",
  email: "hello@brewandbean.in",
  weekdays: "Mon–Fri · 7:00 – 22:00",
  weekends: "Sat–Sun · 8:00 – 23:00",
};

export const formatPrice = (value: number) => `₹${value.toLocaleString("en-IN")}`;
