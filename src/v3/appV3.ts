import connectionPool from "../Dbconfig";
import BookRepositoryV3 from "./BookRepositoryV3";
import BookServiceV3 from "./BookServiceV3";
import AsyncLocalConnectStorage, {getConnectionStorage} from "./Localstorage";

const pool = connectionPool
const repository = new BookRepositoryV3(getConnectionStorage());
const service = new BookServiceV3(repository);

async function doTask() {
    const promises: any[] = [];
    for (let i = 0; i < 500; i++) {
        promises.push(service.save("hello" + i));
    }
    await Promise.all(promises);
    const result = await service.findAll();
    if (result) {
        console.log(result[0].length);
    }
    await pool.query("truncate table book")
}

doTask().then(() => process.exit());