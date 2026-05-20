const mongoose = require('mongoose');

const footerSettingsSchema = new mongoose.Schema({
  brandDescription: { 
    type: String, 
    default: 'Leading the way in tech retail and custom solutions.' 
  },
  products: { 
    type: [String], 
    default: ['Full Stack Gear', '3D Printing', 'IoT Devices', 'LED Lighting'] 
  },
  services: { 
    type: [String], 
    default: ['Data Recovery', 'Dev Consulting', 'Prototyping', 'Customer Support'] 
  },
  copyrightText: { 
    type: String, 
    default: 'TechFusion Store. All rights reserved.' 
  }
}, { timestamps: true });

module.exports = mongoose.model('FooterSettings', footerSettingsSchema);
