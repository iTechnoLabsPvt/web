var Course = require('../models/course_description');
var fs = require('fs');
var path = require('path')
const moment = require('moment');
const processFile = require("../middleware/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const googleCloudStorage = new Storage({ keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE_NAME });
const googleCloudBucket = googleCloudStorage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

exports.add_course = async (req, res) => {

		await processFile(req, res);
		//if (!req.body.publisher) return res.send({ status: 0, message: 'Publisher id is required' })
		if (!req.file) return res.send({ status: 0, message: 'Course logo is required' })
		if (!req.body.course_name) return res.send({ status: 0, message: 'Course name is required' })
		if (!req.body.course_type) return res.send({ status: 0, message: 'Course field is required' })
		if (!req.body.course_language) return res.send({ status: 0, message: 'Course field is required' })
		if (!req.body.course_overview) return res.send({ status: 0, message: 'Course field is required' })
		if (!req.body.course_description) return res.send({ status: 0, message: 'Course description is required' })
		
		try {
            var course_start = 1000000000
            var count = await Course.find().count()
            var course_id  = course_start + count;
            const fileName = moment().unix() + "_" + req.file.originalname;
            const blob = googleCloudBucket.file(req.user.user_id+'/'+course_id+'/'+fileName);
            const blobStream = blob.createWriteStream({
                resumable: false,
            });

            blobStream.on("error", (err) => {
                return {
                    statusCode: 500,
                    data: {
                        message: err.message
                    }
                };
            });

            blobStream.on("finish", async (data) => {
                const publicUrl = format(`https://storage.googleapis.com/${googleCloudBucket.name}/${blob.name}`);
                let result;
                try {
                    await googleCloudBucket.file(req.file.originalname).makePublic();
                } 
                catch (err){
                    result = {
                        message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
                        url: publicUrl
                    };

                }
        
                result = {
                    message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
                    url: publicUrl
                };
				
				
                var addCourse = await new Course({
					publisher: req.user.user_id,
					course_logo: publicUrl,
					course_name: req.body.course_name,
					course_id   : course_id,
					course_type: req.body.course_type,
					course_language: req.body.course_language,
					course_overview: req.body.course_overview,
					course_description: req.body.course_description,
					course_status: 'draft',
				})
				addCourse.save(function (err, data) {
					if (err) {
						return res.send({ status: 0, message: 'something went wrong' })
					}
					else {
						return res.send({ status: 1, message: "Course added", data: data})
					}
				})
            });
        
            blobStream.end(req.file.buffer);

        } catch (err) {
            console.log(err);
        
            res.status(500).send({
              message: `Could not upload the file: ${req.file.originalname}. ${err}`,
            });
        }
	

}

exports.get_course_info = async(req,res) => {
    let data = await Course.findOne({course_id : req.body.course_id})
    return res.send({status :1, message: 'course details', data: data})
}



















