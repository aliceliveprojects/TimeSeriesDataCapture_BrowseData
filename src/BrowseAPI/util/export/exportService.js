'use strict';

const uuidv4 = require('uuid/v4');
const errorApi = require('../error/error');
const fs = require('fs-extra');
const { Pool } = require('pg')
const copyTo = require('pg-copy-streams').to;
const copyFrom = require('pg-copy-streams').from;
const databaseService = require('../database/database');

const Minizip = require('minizip-asm.js'); //locker/unlocker

const snapshotDirectory = "./snapshots";
const reservedDirectory = "/reserved";
const exportedDirectory = "/exported";
const importedDirectory = "/imported";

const dataDirectory = "/T-Data";
const annotationDirectory = "/remarks";

if (!fs.existsSync(snapshotDirectory)) {
  fs.mkdirSync(snapshotDirectory);
}
if (!fs.existsSync(snapshotDirectory + reservedDirectory)) {
  fs.mkdirSync(snapshotDirectory + reservedDirectory);
}
if (!fs.existsSync(snapshotDirectory + exportedDirectory)) {
  fs.mkdirSync(snapshotDirectory + exportedDirectory);
}
if (!fs.existsSync(snapshotDirectory + importedDirectory)) {
  fs.mkdirSync(snapshotDirectory + importedDirectory);
}
const extension = ".csv"


const STATUS = {
  RESERVED: "RESERVED",
  PROGRESSING: "PROGRESSING",
  EXPORTED: "EXPORTED"
}
const zipExtension = ".7z"

exports.reserveExport = function (secret) {
  let isValidSecret = checkSecretValidity(secret)

  if (!isValidSecret) {
    throw (errorApi.create400Error("invalid secret"));
  } else {
    let exportRequestId = uuidv4();
    //create file and save secret etc..
    let exportRequestDir = snapshotDirectory + reservedDirectory + "/" + exportRequestId;
    fs.mkdirSync(exportRequestDir);

    let cfg = {
      id: exportRequestId,
      secret: secret,
      status: STATUS.RESERVED,
      created: (new Date()).getTime(),
      logs: []
    };
    //write config to json file
    fs.appendFile(exportRequestDir + '/config.json', JSON.stringify(cfg, null, 2), function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    })

    return {
      exportRequestId: exportRequestId
    }
  }
}

exports.requestExport = async function (exportRequestId,runIds) {
  /* find uuid. find folder of that uuid. get secret. kick off export with specified secret and uuid.
  * save exported files to the uuid directory, then zip with secret.
  */
  let config = await getExportConfig(exportRequestId)

  if (config === undefined) {
    throw (errorApi.createError(404, "failed to find reserved export with that id."));
  } else {
    if (config.status != STATUS.RESERVED) {
      throw (errorApi.create400Error("Export request already attempted on this id."));
    } else {
      //perfect request - start export
      var fileId = await exportSnapshot(exportRequestId,runIds);

      return {
        message: "Exportation process has begun. Check the progress using exportProgress interface.",
        fileId: fileId
      }
    }
  }

 
}

exports.getExportProgress = async function (exportRequestId) {
  /**
   * return either the progress and fileId if available of the export.
   */
  let config = await getExportConfig(exportRequestId)

  if (config === undefined) {
    throw (errorApi.createError(404, "failed to find reserved export with that id."));
  } else {
    if (config.status == STATUS.RESERVED) {
      throw (errorApi.create400Error("Export not yet requested."));
    } else {
      //perfect request - start export
      let progressObj = {};
      if (config.status) {
        progressObj.status = config.status
      }

      if (config.progress) {
        progressObj.progress = config.progress
      }

      if (config.status == STATUS.EXPORTED) {
        progressObj.fileId = config.fileId;
      }

      return progressObj
    }
  }
}

exports.getExport = async function (fileId, res) {
  let file = fileId + zipExtension;
  let filePath = snapshotDirectory + exportedDirectory + "/" + fileId + "/";
  let lockedFile = "runs";

  if (!fs.existsSync(filePath)) {
    throw (errorApi.createError(404, "failed to find reserved export with that id."));
  } else {

    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Content-Description": "File Transer",
      "Content-Disposition": "attachment; filename=" + file + zipExtension,
      "Access-Control-Expose-Headers": "Content-Type,Content-Description,Content-Disposition"
    });

    var filestream = fs.createReadStream(filePath + lockedFile+zipExtension);
    filestream.pipe(res);
  }
}

exports.deleteExport = async function (fileId, exportRequestId) {
  if ((!fileId) && (!exportRequestId)) {
    throw (errorApi.create400Error("Must provide either a fileID OR an exportRequestId."));
  } else if ((fileId) && (exportRequestId)) {
    throw (errorApi.create400Error("Must provide either a fileID OR an exportRequestId. Not Both."));
  } else {
    let messageObj = {
      messages: []
    }
    if (fileId) {
      let fileDir = snapshotDirectory + exportedDirectory + "/" + fileId;
      if (fs.existsSync(fileDir)) {
        fs.remove(fileDir);
        messageObj.messages.push('successfully deleted export with fileId: ' + fileId);
      } else {
        throw (errorApi.createError(404, "failed to find export with fileId: " + fileId));
      }
    }
    if (exportRequestId) {
      let fileDir = snapshotDirectory + reservedDirectory + "/" + exportRequestId
      if (fs.existsSync(fileDir)) {
        fs.remove(fileDir);
        messageObj.messages.push('successfully deleted reserved snapshot with exportRequestId: ' + exportRequestId);
      } else {
        throw (errorApi.createError(404, "failed to find reserved export with exportRequestId: " + exportRequestId));
      }
    }
    return messageObj
  }
}




function checkSecretValidity(secret) {
  return (secret.length > 3) && (!secret.includes(" "));
}

//request config.json
function getExportConfig(exportRequestId) {
  let filePath = snapshotDirectory + reservedDirectory + "/" + exportRequestId + "/config.json";

  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, 'utf8', function (error, content) {
      if (error) {
        let error = { statusCode: 403, message: "failed to find reserved export with the given id." }
        reject(error);
      } else {
        let configObj = undefined;
        if (content) {
          configObj = JSON.parse(content);
          //console.log(configObj);
        }
        resolve(configObj);
      }
    });
  });
}

async function exportSnapshot(exportRequestId, runIds) {
  /**
   * 1. Get a list of the tables from databse >
   * 2. Get DB Schema >
   * 2. Extract all tables >
   * 3. store a Mapping of all course_id's with a new uuid
   * 4. find and replace all course_id's with new uuid across all extracted files.
   * 5. zip and lock with secret
   * 6. done.
   */

  await updateSnapshotConfig(exportRequestId, 'status', STATUS.PROGRESSING, "Export process begun");


  let filePath = snapshotDirectory + reservedDirectory + "/" + exportRequestId + "/export/";
  var test = fs.existsSync(filePath);
  if (fs.existsSync(filePath)) {
    fs.readdirSync(filePath).forEach(function (file, index) {
      var currentFile = filePath + "/" + file;
      if (fs.lstatSync(currentFile).isDirectory()) { // recurse
        deleteFolderRecursive(currentFile);
      } else { // delete file
        fs.unlinkSync(currentFile);
      }
    });
    fs.rmdirSync(filePath);
  }

  fs.mkdirSync(filePath);
  await updateSnapshotConfig(exportRequestId, undefined, undefined, "Export directory created"); 


  var runPromises = runIds.map(getRunData,{exportRequestId : exportRequestId});
  var runs = await Promise.all(runPromises);
  
   for(var i=0,n=runs.length;i<n;i++){
    fs.mkdirSync(filePath + runs[i][0].id);
    fs.mkdirSync(filePath + '/' + runs[i][0].id + dataDirectory);

    let fileStream = fs.createWriteStream(filePath + runs[i][0].id + dataDirectory +'/Temperature_Log' + extension);
    await copyRunArrayToCsvFile(runs[i][0].runData,fileStream);
    await updateSnapshotConfig(exportRequestId,undefined,undefined,runs[i][0].id + ' data copied')

    
    let annotationFolderPath = filePath + '/' + runs[i][0].id + annotationDirectory;
    fs.mkdirSync(annotationFolderPath);
    await copyAnnotationsToTextFile(runs[i][0].annotations,annotationFolderPath);

    await updateSnapshotConfig(exportRequestId, "progress",(i/runs.length) * 100,undefined);
  }
  

   var fileId = await compress(exportRequestId);
   await updateSnapshotConfig(exportRequestId,"fileId",fileId,undefined);
   await updateSnapshotConfig(exportRequestId, "status", STATUS.EXPORTED, "Fin");
   return fileId;
}





async function getRunData(runId) {
  try {
    var result = await databaseService.getRun(runId, true);
    await updateSnapshotConfig(this.exportRequestId,undefined,undefined,runId + ' data retrieved')
    return result
  } catch (error) {
    throw (error);
  }

}


//updates snapshot config
async function updateSnapshotConfig(exportRequestId, property, value, logMessage) {
  let config = await getExportConfig(exportRequestId)
  var changelog = ""
  if (property && value) {
    if (typeof property === 'string' || property instanceof String) {
      config[property] = value;
      var changelog = " - [" + property + " CHANGED TO: " + value + "]"
    }
  }
  if (logMessage) {
    config.logs.push(new Date() + " : " + logMessage + changelog);
  } else {
    config.logs.push(new Date() + " : " + changelog);
  }

  return new Promise((resolve, reject) => {
    let exportRequestDir = snapshotDirectory + reservedDirectory + "/" + exportRequestId;
    fs.writeFile(exportRequestDir + '/config.json', JSON.stringify(config, null, 2), function (err) {
      if (err) {
        // append failed
        reject(err)
      } else {
        // done
        resolve();
      }
    })
  })
}


function copyAnnotationsToTextFile(annotations,folderPath){
  var annotationIds = Object.keys(annotations);

  for(var i=0,n=annotationIds.length;i<n;i++){
    let fileStream = fs.createWriteStream(folderPath + '/Remark'+i + '.txt');
    
    fileStream.write(copyAnnotationObjectToText(annotations[annotationIds[i]]));
  }
}

function copyAnnotationObjectToText(annotation){
  return 'Remark added after ' + annotation.xcoordinate + ' seconds \n \n' + annotation.description;
}

function copyRunArrayToCsvFile(runData,fileStream){
  var data = runDataArraytoCSVString(runData);
  //var test = new TextDecoder().decode(data);
  //console.log(test);
  fileStream.write(data);
}

function runDataArraytoCSVString(runData){
  
  var csv = '';
  
  var headers = Object.keys(runData);

  for(var i=0,n=headers.length;i<n;i++){
    csv += headers[i] + ' '
  }

  csv += ' \n ';
  csv += 's C C C C V C ';
  csv += ' \n ';

  for(var i=0,n=runData[headers[0]].length;i<n;i++){
    for(var o=0,m=headers.length;o<m;o++){
      csv +=runData[headers[o]][i] + ' ';
    }
    csv += ' \n ';
  }
  return csv;
}



async function compressAndLock(exportRequestId) {
  let fileId = uuidv4(); // id where the export will be zipped to.

  const reserveFolderDirectory = snapshotDirectory + reservedDirectory + "/" + exportRequestId + "/export/";
  const exportFolderDirectory = snapshotDirectory + exportedDirectory + "/" + fileId;
  const secret = (await getExportConfig(exportRequestId)).secret;

  return new Promise(async (resolve, reject) => {
    try {
      fs.mkdirSync(exportFolderDirectory);
      var myZip = new Minizip();

      //push all files to myZip with password
      await updateSnapshotConfig(exportRequestId, undefined, undefined, "Pushing files to export"); //log
      fs.readdirSync(reserveFolderDirectory).forEach((file, index, files) => {
        var text = fs.readFileSync(reserveFolderDirectory + file);
        myZip.append("/" + file, text,undefined);

        //await updateSnapshotConfig(exportRequestId, "progress", Math.floor((((index+1) / files.length)* 50)+50)+"%", "A file was appended to the export."); //log
        // unable to await in this loop, unsure why.
      });
      await updateSnapshotConfig(exportRequestId, "progress", "100%", "All files were appended to the export."); //log


      //save zip
      fs.writeFileSync(exportFolderDirectory + "/locked" + zipExtension, new Buffer(myZip.zip()));

      resolve(fileId)
    } catch (err) {
      reject(err)
    }
  });
}

async function compress(exportRequestId){
  let fileId = uuidv4(); // id where the export will be zipped to.

  const reserveFolderDirectory = snapshotDirectory + reservedDirectory + "/" + exportRequestId + "/export";
  const exportFolderDirectory = snapshotDirectory + exportedDirectory + "/" + fileId;
 

  return new Promise(async (resolve, reject) => {
    try {
      fs.mkdirSync(exportFolderDirectory);
      var myZip = new Minizip();

      //push all files to myZip with password
      await updateSnapshotConfig(exportRequestId, undefined, undefined, "Pushing files to export"); //log
      fs.readdirSync(reserveFolderDirectory).forEach((file, index, files) => {
        var text = fs.readFileSync(reserveFolderDirectory + '/'+file + dataDirectory + '/Temperature_Log.csv');
        myZip.append("/" + file + dataDirectory + '/Temperature_Log.csv',text,undefined);

        fs.readdirSync(reserveFolderDirectory +'/'+file + annotationDirectory).forEach((annotationFile,annotationIndex,annotationFiles) => {
          var text = fs.readFileSync(reserveFolderDirectory  +'/'+file + annotationDirectory + '/' + annotationFile);
          myZip.append("/" + file + annotationDirectory + '/' + annotationFile,text,undefined);
        });
       
      });
      await updateSnapshotConfig(exportRequestId, "progress", "100%", "All files were appended to the export."); //log


      //save zip
      fs.writeFileSync(exportFolderDirectory + "/runs" + zipExtension, new Buffer(myZip.zip()));

      resolve(fileId)
    } catch (err) {
      reject(err)
    }
  });
}

async function unlockAndDecompress(data, secret, path) {
  var myImportZip = new Minizip(data);

  let options = { encoding: "utf8" }
  if (secret) {
    options.password = secret;
  }
  try {
    myImportZip.list(options).forEach(file => {
      let zipSubFileData = myImportZip.extract(file.filepath, options);
      //console.log("attempting to write file:", file.filepath, "to:", path);
      fs.writeFileSync(path + "/" + file.filepath, zipSubFileData)
    })
  } catch (error) {
    throw (error)
  }
}