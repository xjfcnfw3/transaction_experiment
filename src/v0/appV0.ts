import connectionPool from "../Dbconfig";
import BookRepositoryV0 from "./BookRepositoryV0";
import BookServiceV0 from "./BookServiceV0";

const pool = connectionPool
const repository = new BookRepositoryV0(pool);
const service = new BookServiceV0(repository);

async function doTask() {
    await service.save("hello");
    console.log(await service.findAll());
    await pool.query("truncate table book")
}

doTask().then(() => process.exit());