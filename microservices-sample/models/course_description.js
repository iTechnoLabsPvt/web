const path = require('path')
const courseEnv = require('dotenv').config({ path: path.resolve(__dirname, '../env/course_description.env') })
var mongoose = require('mongoose')
var CourseScheme = mongoose.Schema({
    publisher: {
        type: String,
        required: true,
    },    
    course_logo: {
        type: String,
        required: true,
    },
    course_id: {
        required: true,
        type: String
    },
    course_name: {
        required: true,
        type: String
    },
    course_type: {
        type: String
    },
    course_language: {
        required: true,
        type: String
    },
    course_overview: {
        required: true,
        type: String
    },
    course_description: {
        required: true,
        type: String
    },
    course_status: {
        required: true,
        type: String
    }   
},
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)




module.exports = mongoose.model(courseEnv.parsed.collection_name, CourseScheme)