const { contentDB } = require("../database")
const { nanoid } = require("nanoid")

const contentControllers = {
  getAllContents: (req, res) => {
    if (!contentDB.length) {
      res.status(404).json({
        message: "No content found"
      })
      return
    }

    res.status(200).json({
      message: "Get content",
      result: contentDB
    })
  },
  getContentById: (req, res) => {
    const contentId = req.params.id

    const findIndex = contentDB.findIndex(val => {
      return val.id == contentId
    })

    if (findIndex == -1) {
      res.status(404).json({
        message: "content not found"
      })
      return
    }

    const foundContent = contentDB[findIndex]

    res.status(200).json({
      message: "content found",
      result: foundContent
    });
  },
  createNewContent: (req, res) => {
    const newContentData = req.body;

    if (!newContentData) {
      res.status(400).json({
        message: "content data is required"
      })
      return;
    }

    if (!newContentData.username) {
      res.status(400).json({
        message: "Employee username is required"
      })
      return;
    }

    if (!newContentData.location) {
      res.status(400).json({
        message: "Employee location is required"
      })
      return;
    }

    if (!newContentData.caption) {
      res.status(400).json({
        message: "Employee caption is required"
      })
      return;
    }

    if (!newContentData.number_of_likes) {
      res.status(400).json({
        message: "Employee likes is required"
      })
      return;
    }

    newContentData.id = nanoid();

    contentDB.push(newContentData);

    res.status(201).json({
      message: "Created content",
      result: newContentData
    })
  },
  editContentById: (req, res) => {
    const contentId = req.params.id
    const editContentData = req.body;

    const findIndex = contentDB.findIndex(val => {
      return val.id == contentId
    })

    if (findIndex == -1) {
      res.status(404).json({
        message: "content not found"
      })
      return
    }

    contentDB[findIndex] = {
      ...contentDB[findIndex],
      ...editContentData
    }

    res.status(200).json({
      message: "Edited content",
      result: contentDB[findIndex]
    })
  },
  deleteEmployeeById: (req, res) => {
    const contentId = req.params.id

    const findIndex = contentDB.findIndex(val => {
      return val.id == contentId
    })

    if (findIndex == -1) {
      res.status(404).json({
        message: "content not found"
      })
      return
    }

    contentDB.splice(findIndex, 1)

    res.status(200).json({
      message: "Deleted content"
    })
  }
}

module.exports = contentControllers