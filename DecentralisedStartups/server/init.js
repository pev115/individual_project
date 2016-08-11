
/*TODO:Check if I can use another path than the public-> the url is different i need to have
a /upload/ anyways
 */

Meteor.startup(function () {
    UploadServer.init({
        tmpDir: process.env.PWD + '/public/tmp',
        uploadDir: process.env.PWD + '/public/',
        checkCreateDirectories: true, //create the directories for you
        getDirectory:function(fileInfo,formData){
            console.log("checking hook");
            console.log(fileInfo);
            console.log(formData);
            return formData.DAO_Id+'/';
        },
        getFileName: function(fileInfo,formData){
            console.log("getting here");
            console.log(fileInfo);
            return fileInfo.name;
        },
        finished:function(fileInfo, formData){
            console.log("finished hook!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(fileInfo);
            console.log("Checking formdata");
            console.log(formData);
            /*TODO: I may have introduced a bug with path*/
            console.log("insertobject");
            var insertObject = {name:fileInfo.name,proposalID:formData.ID,DAO_Id:formData.DAO_Id,path:'/'+fileInfo.path};
            console.log(insertObject);
            Products.insert(insertObject);
        }
        
    });
});
