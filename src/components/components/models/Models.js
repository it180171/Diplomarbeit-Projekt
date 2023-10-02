export class Config {
    /**
     * 
     * @param {Package[]} packages 
     * @param {Description[]} descriptions 
     * @param {Installable[]} installables 
     * @param {ExecutablePath[]} executablePaths 
     * @param {SyncTemplate[]} syncTemplates 
     */
    constructor(packages, descriptions, installables, executablePaths, syncTemplates) {
        this.packages = packages;
        this.descriptions = descriptions;
        this.installables = installables;
        this.executablePaths = executablePaths;
        this.syncTemplates = syncTemplates;
    }
}

export class Package {
    constructor(id, name, contextMenuApplicationName, description, iconUrl, startPath, startArguments, releaseNotes, sortOrder, installableIds) {
        this.id = id;
        this.name = name;
        this.contextMenuApplicationName = contextMenuApplicationName;
        this.description = description;
        this.iconUrl = iconUrl;
        this.startPath = startPath;
        this.startArguments = startArguments;
        this.releaseNotes = releaseNotes;
        this.sortOrder = sortOrder;
        this.installableIds = installableIds;
    }
}

export class Description {
    constructor(id, packageId, description, cultureCode) {
        this.id = id;
        this.packageId = packageId;
        this.description = description;
        this.cultureCode = cultureCode;
    }
}

export class PackageInstallable {
    constructor() {

    }
}

export class Installable {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export class ExecutablePath {
    constructor(id, installableId, applicationName, executablePath, iconPath) {
        this.id = id;
        this.installableId = installableId;
        this.applicationName = applicationName;
        this.executablePath = executablePath;
        this.iconPath = iconPath;
    }
}

export class SyncTemplate {
    constructor(id, installableId, addPaths, ignorePaths) {
        this.id = id;
        this.installableId = installableId;
        this.addPaths = addPaths;
        this.ignorePaths = ignorePaths;
    }
}

export class SyncPath {
    constructor(destination, isFolder) {
        this.destination = destination;
        this.isFolder = isFolder;
    }
}

export class InstallableVersion {
    constructor(id, name, fileName, blobSas, versionIdentifier, fileLength, md5Hash, versionDate, fullV) {
        this.id = id;
        this.name = name;
        this.fileName = fileName;
        this.blobSas = blobSas;
        this.versionIdentifier = versionIdentifier;
        this.fileLength = fileLength;
        this.md5Hash = md5Hash;
        this.versionDate = versionDate;
        this.fullV = fullV;
    }
}