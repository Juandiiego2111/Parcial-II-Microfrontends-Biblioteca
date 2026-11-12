import { firstValueFrom } from 'rxjs';
import { InMemoryLoanRepository } from './in-memory-loan.repository';

describe('InMemoryLoanRepository', () => {
  let repository: InMemoryLoanRepository;

  beforeEach(() => {
    repository = new InMemoryLoanRepository();
  });

  it('list debe retornar los préstamos de ejemplo', async () => {
    const loans = await firstValueFrom(repository.list());

    expect(loans).toHaveLength(3);
    expect(loans[0].id).toBe(1);
  });

  it('getById debe retornar el préstamo cuando el id existe', async () => {
    const loan = await firstValueFrom(repository.getById(2));

    expect(loan).toBeDefined();
    expect(loan?.id).toBe(2);
  });

  it('getById debe lanzar error cuando el préstamo no existe', async () => {
    await expect(firstValueFrom(repository.getById(99))).rejects.toThrow('Préstamo con id 99 no encontrado');
  });

  it('create debe registrar un préstamo nuevo con estado ACTIVE', async () => {
    const created = await firstValueFrom(
      repository.create({
        bookTitle: 'Rayuela',
        memberName: 'Carlos Alberto Ruiz',
        dueDate: '2026-11-15',
      }),
    );

    expect(created.id).toBe(4);
    expect(created.status).toBe('ACTIVE');

    const loans = await firstValueFrom(repository.list());
    expect(loans).toHaveLength(4);
  });
});
