// --------------------------------------------------------------------------------------------------------------------
// <copyright file="TableStorage.cs" company="">
//   
// </copyright>
// <summary>
//   Simple Table storage generic helper class
// </summary>
// --------------------------------------------------------------------------------------------------------------------
namespace PyCloud.AzureClass
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Linq.Expressions;

    using Microsoft.WindowsAzure.Storage;
    using Microsoft.WindowsAzure.Storage.Table;

    /// <summary>
    /// Simple Table storage generic helper class
    /// </summary>
    /// <typeparam name="T">
    /// TableEntity which will be managed.
    /// </typeparam>
    public class TableStorage<T>
        where T : TableEntity, new()
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TableStorage{T}"/> class.
        /// </summary>
        /// <param name="tableName">
        /// The table name.
        /// </param>
        /// <param name="storageConnectionString">
        /// The storage connection string.
        /// </param>
        public TableStorage(string tableName, string storageConnectionString)
        {
            // Retrieve the storage account from the connection string.
            var storageAccount = CloudStorageAccount.Parse(storageConnectionString);

            // Create the table client.
            var tableClient = storageAccount.CreateCloudTableClient();

            // Create the table if it doesn't exist.
            this.Table = tableClient.GetTableReference(tableName);
            this.TableNewlyCreated = this.Table.CreateIfNotExists();
        }

        public bool TableNewlyCreated { get; } = false;

        /// <summary>
        ///     Gets handle to the Azure table.
        /// </summary>
        /// <value>
        ///     The table.
        /// </value>
        private CloudTable Table { get; }

        /// <summary>
        /// Inserts the specified data.
        /// </summary>
        /// <param name="data">
        /// The data.
        /// </param>
        /// <returns>
        /// The <see cref="TableResult"/>.
        /// </returns>
        public TableResult Insert(T data)
        {
            // Create the TableOperation that inserts the customer entity.
            var insertOperation = TableOperation.Insert(data);

            // Execute the insert operation.
            return this.Table.Execute(insertOperation);
        }
        public TableResult InsertOrReplace(T data)
        {
            // Create the TableOperation that inserts the customer entity.
            var insertOrReplace = TableOperation.InsertOrReplace(data);

            // Execute the insert operation.
            return this.Table.Execute(insertOrReplace);
        }
        /// <summary>
        /// Inserts a list of table entries as a batch.
        /// </summary>
        /// <param name="data">
        /// The data.
        /// </param>
        public void InsertBatch(List<T> data)
        {
            // Create the batch operation.
            var batchOperation = new TableBatchOperation();

            // Add both customer entities to the batch insert operation.
            foreach (var d in data)
            {
                batchOperation.Insert(d);
            }

            // Execute the batch operation.
            this.Table.ExecuteBatch(batchOperation);
        }

        /// <summary>
        /// Gets all data corresponding to a column and its value
        /// </summary>
        /// <param name="columnName">
        /// The column name.
        /// </param>
        /// <param name="value">
        /// The value.
        /// </param>
        /// <returns>
        /// A list of T that has the corresponding partition key
        /// </returns>
        public List<T> GetAll(string columnName, string value)
        {
            // Construct the query operation for all customer entities where PartitionKey="Smith".
            var query =
                new TableQuery<T>().Where(TableQuery.GenerateFilterCondition(columnName, QueryComparisons.Equal, value));

            // Print the fields for each customer.
            return this.Table.ExecuteQuery(query).ToList();
        }

        /// <summary>
        /// Gets the single.
        /// </summary>
        /// <param name="partitionKey">
        /// The partition key.
        /// </param>
        /// <param name="rowKey">
        /// The row key.
        /// </param>
        /// <returns>
        /// The <see cref="T"/>.
        /// </returns>
        public T GetSingle(string partitionKey, string rowKey)
        {
            try
            {
                // Create a retrieve operation that takes a customer entity.
                var retrieveOperation = TableOperation.Retrieve<T>(partitionKey, rowKey);

                // Execute the retrieve operation.
                var retrievedResult = this.Table.Execute(retrieveOperation);

                T result = null;

                // Print the phone number of the result.
                if (retrievedResult.Result != null)
                {
                    result = retrievedResult.Result as T;
                }
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
           
        }

        /// <summary>
        ///     The replace.
        /// </summary>
        /// <param name="partitionKey">
        /// The partition key.
        /// </param>
        /// <param name="rowKey">
        /// The row key.
        /// </param>
        /// <param name="replacementData">
        /// The replacement data.
        /// </param>
        /// <param name="insertOrReplace">
        /// The insert or replace.
        /// </param>
        public void Replace(string partitionKey, string rowKey, T replacementData, bool insertOrReplace)
        {
            // Create a retrieve operation that takes a customer entity.
            var retrieveOperation = TableOperation.Retrieve<T>(partitionKey, rowKey);

            // Execute the operation.
            var retrievedResult = this.Table.Execute(retrieveOperation);

            // Assign the result to a CustomerEntity object.
            var updateEntity = retrievedResult.Result as T;

            if (updateEntity != null)
            {
                replacementData.PartitionKey = updateEntity.PartitionKey;
                replacementData.RowKey = updateEntity.RowKey;

                // Create the InsertOrReplace TableOperation
                var updateOperation = insertOrReplace
                                          ? TableOperation.InsertOrReplace(replacementData)
                                          : TableOperation.Replace(replacementData);

                // Execute the operation.
                this.Table.Execute(updateOperation);

                Trace.WriteLine("Entity updated.");
            }
            else
            {
                Trace.WriteLine("Entity could not be retrieved.");
            }
        }

        /// <summary>
        /// Deletes the entry.
        /// </summary>
        /// <param name="partitionKey">
        /// The partition key.
        /// </param>
        /// <param name="rowKey">
        /// The row key.
        /// </param>
        public void DeleteEntry(string partitionKey, string rowKey)
        {
            // Create a retrieve operation that expects a customer entity.
            var retrieveOperation = TableOperation.Retrieve<T>(partitionKey, rowKey);

            // Execute the operation.
            var retrievedResult = this.Table.Execute(retrieveOperation);

            // Assign the result to a CustomerEntity.
            var deleteEntity = retrievedResult.Result as T;

            // Create the Delete TableOperation.
            if (deleteEntity != null)
            {
                var deleteOperation = TableOperation.Delete(deleteEntity);

                // Execute the operation.
                this.Table.Execute(deleteOperation);

                Trace.WriteLine("Entity deleted.");
            }
            else
            {
                Trace.WriteLine("Could not retrieve the entity.");
            }
        }

        /// <summary>
        ///     Deletes the table.
        /// </summary>
        public void DeleteTable()
        {
            // Delete the table it if exists.
            this.Table.DeleteIfExists();
        }

        /// <summary>
        /// The update.
        /// </summary>
        /// <param name="partitionKey">
        /// The partition key.
        /// </param>
        /// <param name="rowKey">
        /// The row key.
        /// </param>
        /// <param name="replacementData">
        /// The replacement data.
        /// </param>
        public void Update(string partitionKey, string rowKey, T replacementData)
        {
            try
            {
                TableOperation updateOperation = TableOperation.Replace(replacementData);
                this.Table.Execute(updateOperation);
            }
            catch (Exception ex)
            {
                
            }
        }

        /// <summary>
        /// The get all.
        /// </summary>
        /// <param name="query">
        /// The query.
        /// </param>
        /// <returns>
        /// The <see>
        ///         <cref>List</cref>
        ///     </see>
        /// </returns>
        public List<T> GetAll(dynamic query)
        {
            List<T> results = new List<T>();

            // Print the fields for each customer.
            var data = this.Table.ExecuteQuery(query);
            foreach (var entity in data)
            {
                results.Add(entity);
            }

            return results;
        }

        /// <summary>
        ///     Query TableStorage
        /// </summary>
        /// <param name="expression">
        ///     Query Expression
        /// </param>
        /// <returns>
        ///     <see cref="IQueryable"/>
        /// </returns>
        public IQueryable<T> Query(Expression<Func<T, bool>> expression)
        {
            return this.Table.CreateQuery<T>().Where(expression);
        }

        public void DeleteByPartitionKey(string partitionKey)
        {
            try
            {
                var batchOperation = new TableBatchOperation();


                var projectionQuery = new TableQuery<DynamicTableEntity>()
                    .Where(TableQuery.GenerateFilterCondition("PartitionKey",
                        QueryComparisons.Equal, partitionKey))
                    .Select(new string[] {"RowKey"});

                foreach (var e in this.Table.ExecuteQuery(projectionQuery))
                {
                    batchOperation.Delete(e);
                }

                this.Table.ExecuteBatch(batchOperation);
            }
            catch (Exception ex)
            {
                

            }
        }
    }
}