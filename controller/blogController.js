const blogModel = require("../model/blogModel");
const authorModel = require("../model/authorModel");

const createBlog = async (req, res) => {
  const { title, body, authorId, tags, category, subcategory } = req.body;

  try {
    // Check if the author exists
    const author = await authorModel.findById(authorId);
    if (!author) {
      return res
        .status(400)
        .json({ error: "Invalid authorId. Author does not exist." });
    }
    // Create the blog document
    const blogData = await blogModel.create(blog);
    res.status(201).send({ status: true, data: blogData });
    // Save the blog document
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getBlog = async function (req, res) {
  const { authorId, category, tag, subcategory } = req.query;
  const filteredObject = {};
  if (authorId) {
    filteredObject.authorId = authorId;
  }
  if (category) {
    filteredObject.category = category;
  }
  if (tag) {
    filteredObject.tags = { $in: [tag] };
  }
  if (subcategory) {
    filteredObject.subcategory = { $in: [subcategory] };
  }
  try {
    const blogs = await blogModel.find({
      isDleted: false,
      isPublished: true,
      ...filteredObject,
    });
    if (blogs.length === 0) {
      return res.status(404).json({ error: "No blogs found." });
    }
    res.status(200).json({ status: true, data: blogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createBlog, getBlog };
