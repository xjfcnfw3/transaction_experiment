import connectionPool from "../Dbconfig";
import BookRepositoryV1 from "./BookRepositoryV1";
import BookServiceV1 from "./BookServiceV1";

const pool = connectionPool
const repository = new BookRepositoryV1();
const service = new BookServiceV1(repository, pool);

async function doTask() {
    await service.save("hello");
    console.log(await service.findAll());
    await pool.query("truncate table book")
}

doTask().then(() => process.exit());