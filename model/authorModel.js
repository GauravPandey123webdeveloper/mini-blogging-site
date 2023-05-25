const authorModel = require("../model/authorModel");

const createAuthor = async (req, res) => {
  const author = new authorModel(req.body);
  try {
    const authorData = await author.save();
    res.status(201).json(authorData);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = createAuthor;
