import { Observable, of, throwError } from 'rxjs';
import { Loan, NewLoan } from '../../domain/entities/loan.entity';
import { LoanRepository } from '../../domain/repositories/loan.repository';

/**
 * Repositorio en memoria de préstamos.
 *
 * @remarks
 * Es una implementación del puerto `LoanRepository` usada únicamente en el modo
 * demostración (GitHub Pages, build `ghpages`). Mantiene una lista de préstamos con
 * datos de ejemplo coherentes con los libros y socios de ejemplo, y permite el
 * registro de préstamos nuevos en memoria durante la sesión.
 */
export class InMemoryLoanRepository extends LoanRepository {
  private readonly loans: Loan[] = [
    {
      id: 1,
      bookTitle: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      memberName: 'David Mora Duque',
      loanDate: '2026-09-20',
      dueDate: '2026-10-04',
      status: 'RETURNED',
    },
    {
      id: 2,
      bookTitle: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      memberName: 'Juan Diego Rodriguez',
      loanDate: '2026-10-01',
      dueDate: '2026-10-15',
      status: 'ACTIVE',
    },
    {
      id: 3,
      bookTitle: 'Clean Architecture: A Craftsman Guide to Software Structure and Design',
      memberName: 'Juan Pablo Devia',
      loanDate: '2026-10-05',
      dueDate: '2026-10-19',
      status: 'ACTIVE',
    },
  ];

  private nextId: number = 4;

  list(): Observable<Loan[]> {
    return of([...this.loans]);
  }

  getById(id: number): Observable<Loan> {
    const loan = this.loans.find((l) => l.id === id);
    if (!loan) {
      return throwError(() => new Error(`Préstamo con id ${id} no encontrado`));
    }
    return of({ ...loan });
  }

  create(newLoan: NewLoan): Observable<Loan> {
    const loan: Loan = {
      id: this.nextId++,
      bookTitle: newLoan.bookTitle,
      memberName: newLoan.memberName,
      loanDate: new Date().toISOString().slice(0, 10),
      dueDate: newLoan.dueDate,
      status: 'ACTIVE',
    };
    this.loans.push(loan);
    return of({ ...loan });
  }
}
