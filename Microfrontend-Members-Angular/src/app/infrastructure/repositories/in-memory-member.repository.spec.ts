import { InMemoryMemberRepository } from './in-memory-member.repository';

describe('InMemoryMemberRepository', () => {
  let repository: InMemoryMemberRepository;

  beforeEach(() => {
    repository = new InMemoryMemberRepository();
  });

  it('findAll debe retornar los socios de ejemplo', async () => {
    const members = await repository.findAll();

    expect(members).toHaveLength(5);
    expect(members[0].id).toBe(1);
    expect(members[0].fullName).toBe('David Mora Duque');
  });

  it('findById debe retornar el socio cuando el id existe', async () => {
    const member = await repository.findById(3);

    expect(member).toBeDefined();
    expect(member?.id).toBe(3);
  });

  it('findById debe lanzar error cuando el socio no existe', async () => {
    await expect(repository.findById(99)).rejects.toThrow('Socio con id 99 no encontrado');
  });

  it('create debe registrar un socio nuevo', async () => {
    const created = await repository.create({
      fullName: 'Ana Garcia',
      email: 'ana@email.com',
      phone: '3001112233',
    });

    expect(created.id).toBe(6);
    expect(created.active).toBe(true);

    const members = await repository.findAll();
    expect(members).toHaveLength(6);
  });
});
