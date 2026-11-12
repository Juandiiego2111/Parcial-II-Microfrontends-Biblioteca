import { InMemoryBookRepository } from './in-memory-book.repository';

describe('InMemoryBookRepository', () => {
  let repository: InMemoryBookRepository;

  beforeEach(() => {
    repository = new InMemoryBookRepository();
  });

  it('findAll debe retornar los libros de ejemplo', async () => {
    const books = await repository.findAll();

    expect(books).toHaveLength(5);
    expect(books[0]).toEqual({
      id: 1,
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      year: 2008,
      available: true,
    });
  });

  it('findById debe retornar el libro cuando el id existe', async () => {
    const book = await repository.findById(2);

    expect(book).toBeDefined();
    expect(book?.id).toBe(2);
  });

  it('findById debe lanzar error cuando el libro no existe', async () => {
    await expect(repository.findById(99)).rejects.toThrow('Libro con id 99 no encontrado');
  });

  it('create debe registrar un libro nuevo con id y disponible', async () => {
    const created = await repository.create({
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      year: 2008,
    });

    expect(created.id).toBe(6);
    expect(created.available).toBe(true);

    const books = await repository.findAll();
    expect(books).toHaveLength(6);
  });
});
