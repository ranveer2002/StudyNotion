const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create subsection

exports.createSubSection = async (req, res) => {
  try {
    //data detch
    const { sectionId, title, description } = req.body;
    //extract file video
    const video = req.files.video;
    //validate
    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        error: error.message,
      });
    }
    //upload video to cloudinary
    const uploadDeatils = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    //create subsection
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDeatils.duration}`,
      description: description,
      videoUrl: uploadDeatils.secure_url,
    });

    //update section with
    const updatedSection = await Section.findByIdAndUpdate(
      {_id : sectionId},
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    ).populate("subSection");

    //return res
    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data:updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating subsection",
      error: error.message,
    });
  }
};

//update subsection
//not working because of ids string value
exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId,subSectionId ,title, description,timeDuration } = req.body;
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }

    if (title !== undefined) {
      subSection.title = title
    }
    if (timeDuration !== undefined) {
      subSection.timeDuration = timeDuration
    }

    if (description !== undefined) {
      subSection.description = description
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()
    
    const updatedSection = await Section.findById(sectionId).populate("subSection");

    return res.json({
      success: true,
      data: updatedSection,
      message: "Section updated successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }
    
    const updatedSection = await Section.findById(sectionId).populate("subSection");
    return res.json({
      success: true,
      data:updatedSection,
      message: "SubSection deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}
