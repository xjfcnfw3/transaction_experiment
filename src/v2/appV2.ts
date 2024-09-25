import connectionPool from "../Dbconfig";
import BookRepositoryV2 from "./BookRepositoryV2";
import BookServiceV2 from "./BookServiceV2";

const pool = connectionPool
const repository = new BookRepositoryV2();
const service = new BookServiceV2(repository);

async function doTask() {
    let promises: any[] = [];
    for (let i = 0; i < 500; i++) {
        promises.push(service.save("hello" + i));
    }
    try {
        await Promise.all(promises);
    } catch (error) {
        console.error(error);
    }
    await pool.query("truncate table book")
}

doTask().then(() => process.exit());