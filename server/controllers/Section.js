const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
  try {
    //data fetch
    console.log("inside the section creation");
    const { sectionName, courseId } = req.body;
    //validation
    if (!sectionName || !courseId) {
      console.log("inside condition");
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //create section
    console.log("creating section ....")
    const newSection = await Section.create({ sectionName });
    console.log("created section & updating in course")
    //update course with section id
    //HW: use populate to replace section ,subsection both in updatedcourse
    const updatedCourse = await Course.findByIdAndUpdate(
      {_id: courseId },
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    }).exec();
    
    //res return
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating section",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId , courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

    const course = await Course.findByIdAndUpdate(courseId).populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    }).exec();

		res.status(200).json({
			success: true,
			message: section,
      data: course
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
}; 