import BookRepositoryV2 from "./BookRepositoryV2";
import {Transactional} from "./Transaction";

export default class BookServiceV2 {

    constructor(private readonly bookRepository: BookRepositoryV2) {
    }

    @Transactional
    public async save(name : string) : Promise<void> {
        await this.bookRepository.save(name);
    }

    @Transactional
    public async findAll(): Promise<any[]> {
        return this.bookRepository.findAllBooks();
    }
}