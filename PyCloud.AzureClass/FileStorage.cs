// --------------------------------------------------------------------------------------------------------------------
// <copyright file="FileStorage.cs" company="">
//   
// </copyright>
// <summary>
//   The file storage.
// </summary>
// --------------------------------------------------------------------------------------------------------------------
namespace PyCloud.AzureClass
{
    using System;
    using System.IO;
    using System.Linq;
    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.File;
    /// <summary>
    ///     Azure File Storage.
    /// </summary>
    public class FileStorage
    {
        /// <summary>
        ///     Initializes a new instance of the <see cref="FileStorage"/> class.
        /// </summary>
        /// <param name="storageConnectionString">
        ///     The storage Connection String.
        /// </param>
        /// <param name="shareName">
        ///     The share Name.
        /// </param>
        public FileStorage(string storageConnectionString, string shareName)
        {
            // Retrieve the storage account from the connection string.
            var storageAccount = CloudStorageAccount.Parse(storageConnectionString);

            var fileClient = storageAccount.CreateCloudFileClient();

            this.Share = fileClient.GetShareReference(shareName);
            this.Share.CreateIfNotExists();
        }

        /// <summary>
        ///     Gets or sets Azure CloudFileShare
        /// </summary>
        protected CloudFileShare Share { get; set; }

        /// <summary>
        ///     Create Shared Access Uri for a file.
        /// </summary>
        /// <param name="filePath">
        ///     Relative Path to File
        /// </param>
        /// <param name="timeToExpire">
        ///     Time to Expire SharedAccessUri
        /// </param>
        /// <returns>
        ///     Shared Access Uri for the File.
        /// </returns>
        public string CreateSasUri(string ProjectId, string filePath, TimeSpan timeToExpire)
        {
            if (this.Share.Exists())
            {
                var sasConstraints = new SharedAccessFilePolicy
                {
                    SharedAccessStartTime = DateTime.UtcNow.AddMinutes(-5),
                    SharedAccessExpiryTime = DateTime.UtcNow.Add(timeToExpire),
                    Permissions = SharedAccessFilePermissions.Read
                };

                // Get a reference to the root directory for the share.
                var rootDir = this.Share.GetRootDirectoryReference();

                // Get a reference to the directory we created previously.
                var sampleDir = rootDir.GetDirectoryReference(ProjectId);

                // Ensure that the directory exists.
                if (sampleDir.Exists())
                {
                    // Get a reference to the file we created previously.
                    var file = sampleDir.GetFileReference(Path.GetFileName(filePath));

                    // Ensure that the file exists.
                    if (file.Exists())
                    {
                        var sasToken = file.GetSharedAccessSignature(sasConstraints);
                        var fileSasUri = new Uri(file.StorageUri.PrimaryUri + sasToken);
                        return fileSasUri.AbsoluteUri;
                    }
                }
            }

            throw new FileNotFoundException($"File: {filePath} not found on storage.");
        }

        /// <summary>
        /// List all Files and Folder in given folder path
        /// </summary>
        /// <param name="folderPath"></param>
        /// <returns></returns>
        public string[] ListAllFilesAndDirectories(string folderPath)
        {
            if (this.Share.Exists())
            {
                // Get a reference to the root directory for the share.
                var rootDir = this.Share.GetRootDirectoryReference();

                // Get a reference to the directory we created previously.
                var sampleDir = rootDir.GetDirectoryReference(folderPath);
                sampleDir.CreateIfNotExists();
                // Ensure that the directory exists.
                if (sampleDir.Exists())
                {
                    var list = sampleDir.ListFilesAndDirectories().ToList();
                    return list.Select(x => x as CloudFile).Where(x => x != null).Select(x => x.Name).ToArray();
                }
            }

            throw new FileNotFoundException($"{folderPath} not found on storage.");
        }

        public bool UploadImage(string ProjectId, string fileName, byte[] imageBytes)
        {
            try
            {
                // Get a reference to the root directory for the share.
                var rootDir = this.Share.GetRootDirectoryReference();
                // Get a reference to the directory we created previously.
                var sampleDir = rootDir.GetDirectoryReference(ProjectId);
                sampleDir.CreateIfNotExists();
                // Ensure that the directory exists.
                CloudFile destFile = sampleDir.GetFileReference(fileName);
                if (destFile.Exists())
                    return false;
                //destFile.UploadFromStream(IboundStream);
                destFile.UploadFromByteArray(imageBytes, 0, imageBytes.Length);
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        

        public string DownloadSasUri(string ProjectId, string fileName, TimeSpan timeToExpire)
        {
            if (this.Share.Exists())
            {
                var sasConstraints = new SharedAccessFilePolicy
                {
                    SharedAccessStartTime = DateTime.UtcNow.AddMinutes(-5),
                    SharedAccessExpiryTime = DateTime.UtcNow.Add(timeToExpire),
                    Permissions = SharedAccessFilePermissions.Read
                };

                // Get a reference to the root directory for the share.
                var rootDir = this.Share.GetRootDirectoryReference();

                // Get a reference to the directory we created previously.
                var sampleDir = rootDir.GetDirectoryReference(ProjectId);

                // Ensure that the directory exists.
                if (sampleDir.Exists())
                {
                    // Get a reference to the file we created previously.
                    var file = sampleDir.GetFileReference(fileName);

                    // Ensure that the file exists.
                    if (file.Exists())
                    {
                        var sasToken = file.GetSharedAccessSignature(sasConstraints);
                        var fileSasUri = new Uri(file.StorageUri.PrimaryUri + sasToken);
                        return fileSasUri.AbsoluteUri;
                    }
                }
            }

            throw new FileNotFoundException($"File: {fileName} not found on storage.");
        }

        public void DeleteFile(string IESubscriberId, string fileName)
        {
            if (this.Share.Exists())
            {
                // Get a reference to the root directory for the share.
                var rootDir = this.Share.GetRootDirectoryReference();

                // Get a reference to the directory we created previously.
                var sampleDir = rootDir.GetDirectoryReference(IESubscriberId);

                // Ensure that the directory exists.
                if (sampleDir.Exists())
                {
                    // Get a reference to the file we created previously.
                    var file = sampleDir.GetFileReference(fileName);

                    // Ensure that the file exists.
                    if (file.Exists())
                    {
                        file.Delete();
                    }
                }
            }

        }

        public string ReadFile(string folderPath, string fileName)
        {
            if (this.Share.Exists())
            {
                // Get a reference to the root directory for the share.
                var rootDir = this.Share.GetRootDirectoryReference();

                // Get a reference to the directory we created previously.
                var sampleDir = rootDir.GetDirectoryReference(folderPath);

                // Ensure that the directory exists.
                if (sampleDir.Exists())
                {
                    // Get a reference to the file we created previously.
                    var file = sampleDir.GetFileReference(fileName);

                    // Ensure that the file exists.
                    if (file.Exists())
                    {
                      return  file.DownloadText();
                    }
                    
                }
            }
            return "";

        }

        public string UpdateFile(string folderPath, string fileName, string text)
        {
            if (this.Share.Exists())
            {
                // Get a reference to the root directory for the share.
                var rootDir = this.Share.GetRootDirectoryReference();

                // Get a reference to the directory we created previously.
                var sampleDir = rootDir.GetDirectoryReference(folderPath);

                // Ensure that the directory exists.
                if (sampleDir.Exists())
                {
                    // Get a reference to the file we created previously.
                    var file = sampleDir.GetFileReference(fileName);

                    // Ensure that the file exists.
                    if (file.Exists())
                    {
                        file.UploadText(text);
                    }

                }
            }
            return "";

        }

    }
}