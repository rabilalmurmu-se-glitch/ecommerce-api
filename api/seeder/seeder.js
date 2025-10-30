import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { Product } from "../models/product.js";



export const seedDatabase = async () => {
  try {

    // Clear existing data (optional)
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing users & products");

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    console.log("Admin user created:", adminUser.email);

    // Create sample products
    const products = [
      {
        name: "Wireless Headphones",
        description: "Noise-cancelling over-ear Bluetooth headphones",
        price: 120.99,
        stock: 25,
      },
      {
        name: "Smart Watch",
        description: "Fitness tracker with heart rate and sleep monitor",
        price: 75.5,
        stock: 50,
      },
      {
        name: "Gaming Mouse",
        description: "RGB wireless gaming mouse with 6 buttons",
        price: 45.0,
        stock: 100,
      },
      {
        name: "Mechanical Keyboard",
        description: "Blue switch RGB mechanical keyboard",
        price: 89.99,
        stock: 40,
      },
      {
        name: "Laptop Stand",
        description: "Adjustable aluminum laptop stand for desk setup",
        price: 29.99,
        stock: 60,
      },
    ];

    await Product.insertMany(products);
    console.log("📦 5 sample products added!");

    console.log("✅ Database seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

