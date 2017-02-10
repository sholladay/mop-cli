'use strict';

const fs = require('fs');
const path = require('path');

const readdir = (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, fileNames) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(fileNames);
        });
    });
};

const stat = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, status) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(status);
        });
    });
};

const childrenDirs = (dirPath) => {
    return readdir(dirPath)
        .then((fileNames) => {
            return fileNames.map((fileName) => {
                return path.join(dirPath, fileName);
            });
        })
        .then((filePaths) => {
            return Promise.all(filePaths.map((filePath) => {
                return stat(filePath).then((status) => {
                    return {
                        path        : filePath,
                        isDirectory : status.isDirectory()
                    };
                });
            }));
        })
        .then((files) => {
            return files
                .filter((file) => {
                    return file.isDirectory;
                })
                .map((file) => {
                    return file.path;
                });
        });
};

module.exports = childrenDirs;
