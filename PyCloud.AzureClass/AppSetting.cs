using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PyCloud.AzureClass
{
    public static class AppSetting
    {
        #region ConnectionString
        public const string StorageConnectionString = "DefaultEndpointsProtocol=https;AccountName=pythonclouds;AccountKey=hr1ker23rPumD2xXmIWn7sjQfdtGTwv5b/nPjmJ+xLIgja5zs817ruN7HOw4N+fB+naWZv2Sti48JfIO6HJ7hA==;EndpointSuffix=core.windows.net";
        public const string ServiceBusConnectionString = "Endpoint=sb://transcriber.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=OOF/0KZpNp1s3GSLWqgFrlVOnl1sv5EuEbD8mrgaLuM=";
        #endregion
        #region Queue Names
        public const string GeneralQueue = "generalqueue";
        #endregion
        #region Storage Container Names
        public const string BlobThumbImageContainer = "imagethumb";
        public const string BlobDownloadsContainer = "downloads";
        public const string BlobProtoTextContainer = "prototext";
        public const string BlobPreProtoTextContainer = "preprototext";
        public const string BlobEndPoint = "https://imagedataset.blob.core.windows.net/";
        public const string BlobZipContainer = "zipfiles";
        #endregion
        #region FileShare Names
        public const string DropRawInboundShare = "rawinbound";
        public const string PermanantShare = "permanant";
        public const string DeliveryShare = "delivery";
        #endregion
        #region StorageTable
        public const string StorageTableRawDocument = "RawDocument";
        #endregion
        #region EmailSetup
        public const string FromEmail = "support@imagedataset.com";
        public const string FromEmailPassword = "Vivek@9aug";
        public const string SmtpAddress = "smtpout.asia.secureserver.net";
        public const int PortNo = 25;
        public const string PortalHost = "http://haarcascadeapi.cloudapp.net/#/";


        #endregion
    }
}