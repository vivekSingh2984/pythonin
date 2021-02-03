using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Threading.Tasks;

namespace PyCloud.AzureClass
{
    public class BlobStorage
    {
        private readonly CloudBlobContainer blobContainer;
        public BlobStorage(string storageConnectionString, string containerName)
        {
            var storageAccount = CloudStorageAccount.Parse(storageConnectionString);
            var blobClient = storageAccount.CreateCloudBlobClient();
            blobContainer = blobClient.GetContainerReference(containerName);
            blobContainer.CreateIfNotExists();
            blobContainer.SetPermissions(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
        }
        public async Task<string> UploadImage(byte[] imageBytes, string fileName)
        {
            var blockBlob = blobContainer.GetBlockBlobReference(fileName);
            blockBlob.Properties.ContentType = "image/jpg";
            await blockBlob.UploadFromByteArrayAsync(imageBytes, 0, imageBytes.Length);
            return "";
        }
        public async Task<string> UploadDataFile(byte[] fileBytes, string fileName)
        {
            var blockBlob = blobContainer.GetBlockBlobReference(fileName);
            blockBlob.Properties.ContentType = "text";
            await blockBlob.UploadFromByteArrayAsync(fileBytes, 0, fileBytes.Length);
            return "";
        }
        public void UploadToBlobStorage(string zipPath, string zipName)
        {
            // Create the blob in the container 
            var blockBlob = blobContainer.GetBlockBlobReference(zipName);
            blockBlob.UploadFromFile(zipPath);
        }


        public void DownloadImage(string fileName, string path)
        {
            try
            {
                if (!System.IO.Directory.Exists(path))
                    System.IO.Directory.CreateDirectory(path);
                CloudBlob blob = blobContainer.GetBlobReference(fileName);
                blob.DownloadToFile(path + fileName, System.IO.FileMode.Create);
            }
            catch (Exception ex)
            {
               
            }

        }
    }
}
