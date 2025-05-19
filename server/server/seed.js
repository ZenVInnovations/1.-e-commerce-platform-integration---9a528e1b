require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const products = [
  {
    name: 'Downfill Jacket',
    description: ' Stay warm and stylish with our premium downfill jacket, designed for ultimate insulation and comfort. Lightweight and packable, it is perfect for cold weather adventures or everyday wear',
    price: 49.99,
    image: 'https://example.com/wand.jpg',
  },
  {
    name: 'Leather Boots',
    description: 'Durable leather boots for rugged adventures.',
    price: 129.99,
    image: 'https://example.com/shield.jpg',
  },
  {
    name: 'Gold Necklace',
    description: 'Elevate your style with our exquisite gold necklace, crafted to add a touch of elegance to any outfit. Perfect for both everyday wear and special occasions, this timeless piece is a must-have accessory.',
    price: 199.99,
    image: 'https://example.com/cloak.jpg',
  },
];

async function seed() {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database seeded!');
  mongoose.disconnect();
}

seed();
