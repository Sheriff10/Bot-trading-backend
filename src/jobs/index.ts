import cron from "node-cron";
import { fundUsersWithRoi } from "./helper/result-funding";

cron.schedule("0 */3 * * *", async () => {
  console.log(`[${new Date().toISOString()}] Running task every 3 hours`);

  try {
    // Your logic here
    await fundUsersWithRoi();
  } catch (error) {
    console.error("Cron task error:", error);
  }
});
