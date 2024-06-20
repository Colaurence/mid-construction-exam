const app = require('./app');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

require('./database/user');
require('./database/task');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
