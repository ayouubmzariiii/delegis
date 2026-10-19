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
  /** Staff only: job title and office shown to the firms they manage. */
  title?: string;
  city?: string;
  /** Firms only: the Delegis account manager assigned by an admin. */
  managerId?: string;
};

/** Public profile of a Delegis team member (no credentials). */
export type TeamMember = Pick<User, 'id' | 'name' | 'email' | 'phone' | 'title' | 'city'>;

/** A client company of the accounting firm (the account). Dossiers are always filed for one of them. */
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

export type AccessKind = 'software' | 'bank' | 'tax' | 'other';

/**
 * Credentials a firm shares for one of its clients (accounting software, bank, MyMinfin…),
 * or a request from Delegis for such access. The secret is encrypted at rest and never sent to the portal.
 */
export type Access = {
  id: string;
  userId: string;
  clientId: string;
  label: string;
  kind: AccessKind;
  url?: string;
  login?: string;
  hasSecret: boolean;
  notes: string;
  status: 'requested' | 'provided' | 'revoked';
  requestNote?: string;
  requestedBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
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
  accesses: Access[];
};
