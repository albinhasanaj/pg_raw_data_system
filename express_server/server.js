const express = require('express');
const app = express();
const dataRoutes = require('./routes/dataRoutes');
const newsRoutes = require('./routes/newsRoutes');

app.use(express.json());

app.use('/', dataRoutes);
app.use('/', newsRoutes);

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Express API running on port ${PORT}`));
