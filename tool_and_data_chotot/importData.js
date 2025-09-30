import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

async function main() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('xepo_db');
  const collection = db.collection('Post');

  const filePath = path.join(process.cwd(), 'data.json'); // file JSON cùng folder
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const posts = JSON.parse(rawData);

  const postsWithCategory = posts.map(post => ({ ...post, category: 'Thú cưng' }));

  const result = await collection.insertMany(postsWithCategory);

  console.log(`✅ Đã import ${result.insertedCount} post thành công!`);

  await client.close();
}

main().catch(console.error);
