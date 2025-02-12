import 'dotenv/config';
import app from './src/app.js';  // ✅ `.js` extension zaroori hai

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
