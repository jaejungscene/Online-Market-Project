const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database(
    './database.sqlite3', 
    sqlite3.OPEN_READWRITE, 
    (err) => {
        if(err)    {console.error(err);}
        else    {console.log('Connected to the database.');}
    }
);


/**
 * Create querys below
 */
db.serialize(() => {
  db.each(
    `DELETE FROM Products WHERE name=\'갓 키보드\';`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});






db.close((err) => {
  if(err)   {console.error(err);}
  else  {console.log('Close the database connection.');}
});