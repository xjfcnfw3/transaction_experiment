import BookRepositoryV3 from "./BookRepositoryV3";
import {Transactional} from "./Transaction";

export default class BookServiceV3 {

    constructor(private readonly bookRepository: BookRepositoryV3) {
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