

module.exports = function (app) {
    var Course = require('../controllers/courseController');
   

    const Authenticatetoken = require('../middleware/Authenticate.js');

    //new api integrated
    app.post('/s/add-new-course',Authenticatetoken, Course.add_course);
    app.post('/s/get-course-info',Authenticatetoken, Course.get_course_info);
   
}