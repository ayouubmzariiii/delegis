/** Domain types shared by the data layer, demo seed and UI (no server-only imports here). */

export type User = {
  id: string;
  email: string;
  name: string;
  company: string;
  passwordHash: string;
  /** 'staff' = Delegis team member using the back-office. */
  role: 'client' | 'staff';
  createdAt: string;
  phone?: string;
  vatNumber?: string;
  software?: string;
};

/** A client company managed under one account (e.g. a fiduciary's customer). */
export type Client = {
  id: string;
  userId: string;
  name: string;
  vatNumber?: string;
  software?: string;
  sector?: string;
  createdAt: string;
};

export type StoredFile = { name: string; size: number; stored: string };

export type DossierStatus = 'received' | 'processing' | 'done';
export type TimelineStep = 'received' | 'encoding' | 'review' | 'delivered';

export type Dossier = {
  id: string;
  userId: string;
  clientId: string;
  name: string;
  period: string;
  type: 'dossier' | 'document';
  files: StoredFile[];
  status: DossierStatus;
  createdAt: string;
  /** Who handles it on the Delegis side. */
  assignee?: string;
  timeline?: { step: TimelineStep; at: string }[];
};

export type Message = {
  id: string;
  userId: string;
  clientId: string;
  author: 'client' | 'team';
  authorName: string;
  body: string;
  createdAt: string;
  dossierId?: string;
  files?: StoredFile[];
};

export type RequestItem = {
  id: string;
  userId: string;
  clientId: string;
  dossierId?: string;
  title: string;
  detail: string;
  status: 'open' | 'answered';
  createdAt: string;
  dueAt?: string;
  answer?: { at: string; note: string; files: StoredFile[] };
};

export type Deliverable = {
  id: string;
  userId: string;
  clientId: string;
  title: string;
  kind: 'report' | 'vat' | 'ledger' | 'peppol';
  period: string;
  createdAt: string;
  fileName: string;
  /** Storage reference (see lib/storage). */
  stored: string;
  size: number;
};

export type Invoice = {
  id: string;
  userId: string;
  clientId: string;
  number: string;
  period: string;
  amount: number;
  status: 'paid' | 'due';
  issuedAt: string;
  dueAt: string;
  /** Storage reference of the invoice PDF. */
  stored?: string;
};

export type Notification = {
  id: string;
  userId: string;
  clientId: string;
  kind: 'message' | 'request' | 'status' | 'document' | 'invoice';
  text: string;
  href: string;
  createdAt: string;
  read: boolean;
};

export type Lead = { id: string; createdAt: string; locale: string; data: Record<string, string> };

/** Everything a client sees in the portal. */
export type Workspace = {
  clients: Client[];
  dossiers: Dossier[];
  messages: Message[];
  requests: RequestItem[];
  deliverables: Deliverable[];
  invoices: Invoice[];
  notifications: Notification[];
};
