const mongoose = require("mongoose");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const User = require("../models/User");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subSectionId);
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" });
    }

    // // Find the course progress document for the user and course
    // let courseProgress = await CourseProgress.findOne({
    //   courseID: courseId,
    //   userId: userId,
    // });
    
    // console.log("course prposs....",courseProgress);
    // if (!courseProgress) {
    //   // If course progress doesn't exist, create a new one
    //   courseProgress = await CourseProgress.create({
    //     courseID: courseId,
    //     userID: userId,
    //     completedVideos: [subSectionId],
    //   });

    // } else {
    //   // If course progress exists, check if the subsection is already completed
    //   if (courseProgress.completedVideos.includes(subSectionId)) {
    //     return res.status(400).json({ error: "Subsection already completed" });
    //   }

    //   // Push the subsection into the completedVideos array
    //   courseProgress.completedVideos.push(subSectionId);
    // }

    // // Save the updated course progress
    // await courseProgress.save();
    

    // Use `findOneAndUpdate` to atomically find and update the document, or create if not exists
    const update = {
      $addToSet: { completedVideos: subSectionId }, // Use $addToSet to avoid duplicates
    };
    const options = {
      new: true, // Return the modified document
      upsert: true, // Create a new document if one doesn't exist
      setDefaultsOnInsert: true // Apply schema default values on upsert
    };

    const courseProgress = await CourseProgress.findOneAndUpdate(
      { courseID: courseId, userID: userId },
      update,
      options
    );
    
    await User.findByIdAndUpdate(courseId,{
      courseProgress: courseProgress._id
    })

    return res.status(200).json({ message: "Course progress updated" ,data:courseProgress});
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body
//   const userId = req.user.id

//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID not provided." })
//   }

//   try {
//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })
//       .populate({
//         path: "courseID",
//         populate: {
//           path: "courseContent",
//         },
//       })
//       .exec()

//     if (!courseProgress) {
//       return res
//         .status(400)
//         .json({ error: "Can not find Course Progress with these IDs." })
//     }
//     console.log(courseProgress, userId)
//     let lectures = 0
//     courseProgress.courseID.courseContent?.forEach((sec) => {
//       lectures += sec.subSection.length || 0
//     })

//     let progressPercentage =
//       (courseProgress.completedVideos.length / lectures) * 100

//     // To make it up to 2 decimal point
//     const multiplier = Math.pow(10, 2)
//     progressPercentage =
//       Math.round(progressPercentage * multiplier) / multiplier

//     return res.status(200).json({
//       data: progressPercentage,
//       message: "Succesfully fetched Course progress",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }
