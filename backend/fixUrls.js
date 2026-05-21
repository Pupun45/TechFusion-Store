/**
 * URL Migration Script
 * Fixes all products and gallery items in MongoDB that have localhost URLs.
 * Run once after deploying the backend:  node fixUrls.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://beheraj542_db_user:wy4yA51uIVRFop6G@cluster1.bcy9igb.mongodb.net/TechFusion?retryWrites=true&w=majority';
const NEW_BASE = process.env.BACKEND_URL || 'https://techfusion-store.api.ionode.cloud';

// Patterns to replace (any localhost variant)
const BAD_PATTERNS = [
  /http:\/\/localhost:\d+/g,
  /https:\/\/localhost:\d+/g,
];

function fixUrl(url) {
  if (!url || typeof url !== 'string') return url;
  let fixed = url;
  for (const pattern of BAD_PATTERNS) {
    fixed = fixed.replace(pattern, NEW_BASE);
  }
  return fixed;
}

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB:', mongoose.connection.name);

  // --- Fix Products ---
  const Product = mongoose.model('Product', new mongoose.Schema({
    images: [String],
    videos: [String],
  }, { strict: false }));

  const products = await Product.find();
  let productFixed = 0;

  for (const p of products) {
    const newImages = (p.images || []).map(fixUrl);
    const newVideos = (p.videos || []).map(fixUrl);

    const changed =
      JSON.stringify(newImages) !== JSON.stringify(p.images) ||
      JSON.stringify(newVideos) !== JSON.stringify(p.videos);

    if (changed) {
      await Product.updateOne({ _id: p._id }, { $set: { images: newImages, videos: newVideos } });
      console.log(`  ✔ Fixed product: ${p._id}`);
      productFixed++;
    }
  }
  console.log(`Products fixed: ${productFixed} / ${products.length}`);

  // --- Fix Gallery ---
  const Gallery = mongoose.model('Gallery', new mongoose.Schema({
    image: String,
    video: String,
  }, { strict: false }));

  const items = await Gallery.find();
  let galleryFixed = 0;

  for (const g of items) {
    const newImage = fixUrl(g.image);
    const newVideo = fixUrl(g.video);

    const changed = newImage !== g.image || newVideo !== g.video;

    if (changed) {
      await Gallery.updateOne({ _id: g._id }, { $set: { image: newImage, video: newVideo } });
      console.log(`  ✔ Fixed gallery item: ${g._id}`);
      galleryFixed++;
    }
  }
  console.log(`Gallery items fixed: ${galleryFixed} / ${items.length}`);

  await mongoose.disconnect();
  console.log('\n✅ Migration complete. All localhost URLs have been updated to:', NEW_BASE);
}

run().catch(err => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});
