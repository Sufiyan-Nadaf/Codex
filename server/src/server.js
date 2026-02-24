import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { startAutomationJobs } from './jobs/automationJob.js';

await connectDB();
startAutomationJobs();
app.listen(env.port, () => console.log(`Server running on ${env.port}`));
