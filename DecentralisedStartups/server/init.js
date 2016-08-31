
Meteor.startup(function () {
    UploadServer.init({
        tmpDir: process.env.PWD + '/public/tmp',
        uploadDir: process.env.PWD + '/public/',
        checkCreateDirectories: true, //create the directories for you
        getDirectory:function(fileInfo,formData){
            console.log("GETTING DIRECTORY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log("THE FILE INFO IS:::::::::::");
            console.log(fileInfo);
            console.log("THE FORM DATA ARE:::::::");
            console.log(formData);
            return formData.contentType +'/';
        },
        getFileName: function(fileInfo,formData){
            console.log("GETFILENAME: getting tghe file name:");
            console.log(fileInfo);
            return fileInfo.name;
        }
    });
    

});
