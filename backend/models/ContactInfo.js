const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  ourLocation: { type: String, default: '123 Fusion Ave, Tech City, CA 90210' },
  salesLine: { type: String, default: '+1 (555) 123-4567' },
  generalInquiry: { type: String, default: 'info@techfusion.com' },
  supportCenter: { type: String, default: 'support@techfusion.com' },
}, { timestamps: true });

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
