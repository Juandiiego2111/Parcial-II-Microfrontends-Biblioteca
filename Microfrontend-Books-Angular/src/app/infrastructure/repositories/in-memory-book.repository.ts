import { Book, NewBook } from '../../domain/entities/book.entity';
import { BookRepository } from '../../domain/repositories/book.repository';

/**
 * Repositorio en memoria del catálogo de libros.
 *
 * @remarks
 * Es una implementación del puerto `BookRepository` usada únicamente en el modo
 * demostración (GitHub Pages, build `ghpages`). Mantiene una lista de libros con
 * datos de ejemplo y permite el CRUD en memoria durante la sesión.
 */
export class InMemoryBookRepository extends BookRepository {
  private readonly books: Book[] = [
    {
      id: 1,
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      year: 2008,
      available: true,
    },
    {
      id: 2,
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
      isbn: '978-0201633610',
      year: 1994,
      available: true,
    },
    {
      id: 3,
      title: 'Clean Architecture: A Craftsman Guide to Software Structure and Design',
      author: 'Robert C. Martin',
      isbn: '978-0134494166',
      year: 2017,
      available: true,
    },
    {
      id: 4,
      title: 'Refactoring: Improving the Design of Existing Code',
      author: 'Martin Fowler',
      isbn: '978-0134757599',
      year: 2018,
      available: true,
    },
    {
      id: 5,
      title: 'Domain-Driven Design: Tackling Complexity in the Heart of Software',
      author: 'Eric Evans',
      isbn: '978-0321125217',
      year: 2003,
      available: true,
    },
  ];

  private nextId: number = 6;

  async findAll(): Promise<Book[]> {
    return [...this.books];
  }

  async findById(id: number): Promise<Book> {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new Error(`Libro con id ${id} no encontrado`);
    }
    return { ...book };
  }

  async create(book: NewBook): Promise<Book> {
    const newBook: Book = {
      id: this.nextId++,
      ...book,
      available: true,
    };
    this.books.push(newBook);
    return { ...newBook };
  }
}
