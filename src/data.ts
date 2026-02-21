export interface Member {
  id: string;
  name: string;
  email: string;
  plan: string;
  dueDate: string;
  status: 'active' | 'overdue' | 'pending';
  avatar: string;
}

export const initialMembers: Member[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana.garcia@example.com',
    plan: 'Premium Anual',
    dueDate: '2024-03-15',
    status: 'active',
    avatar: 'https://picsum.photos/seed/ana/100/100'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos.r@example.com',
    plan: 'Básico Mensual',
    dueDate: '2024-02-28',
    status: 'overdue',
    avatar: 'https://picsum.photos/seed/carlos/100/100'
  },
  {
    id: '3',
    name: 'Lucía Méndez',
    email: 'lucia.m@example.com',
    plan: 'Estudiante Trimestral',
    dueDate: '2024-03-10',
    status: 'pending',
    avatar: 'https://picsum.photos/seed/lucia/100/100'
  },
  {
    id: '4',
    name: 'Miguel Ángel Torres',
    email: 'miguel.t@example.com',
    plan: 'Premium Mensual',
    dueDate: '2024-03-20',
    status: 'active',
    avatar: 'https://picsum.photos/seed/miguel/100/100'
  },
  {
    id: '5',
    name: 'Sofía Valdés',
    email: 'sofia.v@example.com',
    plan: 'Básico Semestral',
    dueDate: '2024-02-25',
    status: 'overdue',
    avatar: 'https://picsum.photos/seed/sofia/100/100'
  }
];
