import { Member, NewMember } from '../../domain/entities/member.entity';
import { MemberRepository } from '../../domain/repositories/member.repository';

/**
 * Repositorio en memoria de socios.
 *
 * @remarks
 * Es una implementación del puerto `MemberRepository` usada únicamente en el modo
 * demostración (GitHub Pages, build `ghpages`). Mantiene una lista de socios con
 * datos de ejemplo y permite el CRUD en memoria durante la sesión.
 */
export class InMemoryMemberRepository extends MemberRepository {
  private readonly members: Member[] = [
    {
      id: 1,
      fullName: 'David Mora Duque',
      email: 'david.mora@uceva.edu.co',
      phone: '3001234567',
      active: true,
    },
    {
      id: 2,
      fullName: 'Juan Diego Rodriguez',
      email: 'juand.rodriguez@uceva.edu.co',
      phone: '3002345678',
      active: true,
    },
    {
      id: 3,
      fullName: 'Juan Pablo Devia',
      email: 'juanp.devia@uceva.edu.co',
      phone: '3003456789',
      active: true,
    },
    {
      id: 4,
      fullName: 'Maria Fernanda Lopez',
      email: 'maria.lopez@uceva.edu.co',
      phone: '3004567890',
      active: true,
    },
    {
      id: 5,
      fullName: 'Carlos Alberto Ruiz',
      email: 'carlos.ruiz@uceva.edu.co',
      phone: '3005678901',
      active: true,
    },
  ];

  private nextId: number = 6;

  async findAll(): Promise<Member[]> {
    return [...this.members];
  }

  async findById(id: number): Promise<Member> {
    const member = this.members.find((m) => m.id === id);
    if (!member) {
      throw new Error(`Socio con id ${id} no encontrado`);
    }
    return { ...member };
  }

  async create(member: NewMember): Promise<Member> {
    const newMember: Member = {
      id: this.nextId++,
      ...member,
      active: true,
    };
    this.members.push(newMember);
    return { ...newMember };
  }
}
