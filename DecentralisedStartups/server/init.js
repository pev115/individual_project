Meteor.startup(function () {
    UploadServer.init({
        tmpDir: process.env.PWD + '/public/tmp',
        uploadDir: process.env.PWD + '/public/',
        checkCreateDirectories: true //create the directories for you
    });
});
