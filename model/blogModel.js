const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: "Blog title is required"
    },
    body: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
        required: "Blog body is required"
    },
    authorId: {
        type: objectId,
        required: "Author id is required",
        ref: 'AuthorCollection'
    },
    tags: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        trim: true,
        required: "Blog category is required"
    },
    subcategory: [{
        type: String,
        trim: true
    }],
    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("blogCollection", blogSchema);
