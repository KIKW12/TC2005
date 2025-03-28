// controllers/uploads.controller.js
const path = require('path');

exports.getUploadForm = (request, response, next) => {
    response.render('upload_form', {
        pageTitle: 'Upload File',
        isLoggedIn: request.session.isLoggedIn
    });
};

exports.postUpload = (request, response, next) => {
    if (!request.file) {
        return response.status(422).render('upload_form', {
            pageTitle: 'Upload File',
            isLoggedIn: request.session.isLoggedIn,
            errorMessage: 'Attached file is not an image or no file was selected.'
        });
    }
    
    const filePath = request.file.path;
    console.log('File uploaded successfully: ', filePath);
    
    // Redirect or render a success page
    response.render('upload_success', {
        pageTitle: 'Upload Successful',
        isLoggedIn: request.session.isLoggedIn,
        filePath: filePath
    });
};