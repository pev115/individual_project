TabularTables = {};

TabularTables.Hashes = new Tabular.Table({
    name: "Transactions",
    collection: Transactions,
    columns: [
        {data: "transactionHash", title: "Transaction Hash"},
        {data: "date", title: "Date"}
    ]
});