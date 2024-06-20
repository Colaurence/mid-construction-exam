const db = require('./index');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status INTEGER DEFAULT 0, -- 0 for pending, 1 for completed
      userId TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);
});
