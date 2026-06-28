const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    user: { type: String, required: true },
    severity: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    image: { type: String },
    date: { type: Date, default: Date.now }
});

const issueSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // ISS-XXX
    title: { type: String, required: true },
    desc: { type: String },
    category: { type: String },
    location: { type: String },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    ward: { type: String },
    authority: { type: String },
    image: { type: String },
    isAnonymous: { type: Boolean, default: false },
    reportedBy: { type: String }, // username
    
    // AI & Gamification Fields
    urgency: { type: String, default: 'Medium' },
    mlPriority: { type: String },
    mlDuplicate: { type: Boolean, default: false },
    priorityScore: { type: Number, default: 0 },
    duplicateCount: { type: Number, default: 0 },
    
    // Workflow Pipeline
    workflowStage: { 
        type: String, 
        enum: ['Reported', 'Under Scrutiny', 'Community Verification', 'Approved', 'Assigned', 'In Progress', 'Resolved', 'Closed', 'Rejected'],
        default: 'Reported'
    },
    verifications: [verificationSchema],
    trustScore: { type: Number, default: 0 }, // Confidence from community
    severityConsensus: { type: String, default: 'Pending' },
    
    // Legacy Status (mapped for compatibility if needed)
    status: { type: String, default: 'pending' },
    approved: { type: Boolean, default: false },

    // Tracking
    stageTimestamps: {
        reportedAt: { type: Date, default: Date.now },
        verifiedAt: { type: Date },
        approvedAt: { type: Date },
        assignedAt: { type: Date },
        resolvedAt: { type: Date },
        closedAt: { type: Date }
    },

    upvotes: { type: Number, default: 0 },
    comments: [{
        user: String,
        text: String,
        date: { type: Date, default: Date.now }
    }],
    
    aiRawOutput: { type: String },
    aiDuplicateRaw: { type: String },
    
    authenticityScore: { type: Number, default: 100 },
    authenticityClassification: { type: String, default: 'Likely Genuine' },
    authenticityReason: { type: String },
    
    date: { type: String }, // YYYY-MM-DD
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', issueSchema);
