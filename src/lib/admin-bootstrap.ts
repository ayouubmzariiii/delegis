import 'server-only';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, promoteToStaff } from './db';

const same = (a: string, b: string) => crypto.timingSafeEqual(crypto.createHash('sha256').update(a).digest(), crypto.createHash('sha256').update(b).digest());

/**
 * First way into the back-office on a fresh deployment: signing in with ADMIN_EMAIL and ADMIN_PASSWORD
 * (Vercel environment variables) creates that staff account, or turns the existing one into staff with
 * that password. Team members are then added from Admin → Équipe. Returns null for any other login.
 */
export async function bootstrapAdmin(email: string, password: string) {
  const want = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const secret = process.env.ADMIN_PASSWORD;
  if (!want || !secret || secret.length < 12 || email !== want || !same(password, secret)) return null;
  const hash = await bcrypt.hash(secret, 10);
  const user = await findUserByEmail(email);
  if (!user) return createUser({ email, name: 'Administrateur Delegis', company: 'Delegis', role: 'staff', passwordHash: hash });
  if (user.role !== 'staff' || !(await bcrypt.compare(secret, user.passwordHash))) return promoteToStaff(user.id, hash);
  return user;
}
