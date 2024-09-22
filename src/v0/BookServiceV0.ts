import BookRepositoryV0 from "./BookRepositoryV0";

export default class BookServiceV0 {

    constructor(private readonly bookRepository: BookRepositoryV0) {
    }

    public async save(name : string) {
        await this.bookRepository.save(name);
    }

    public async findAll() {
        return this.bookRepository.findAllBooks();
    }
}