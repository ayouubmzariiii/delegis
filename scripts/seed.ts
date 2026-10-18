/**
 * Seeds the demo into the configured database and storage.
 *   local:      npm run db:seed            (PGlite in ./data/pglite, files in ./data/uploads)
 *   production: DATABASE_URL=… BLOB_READ_WRITE_TOKEN=… npm run db:seed
 */
import { seedDemo } from '@/lib/seed';

const started = Date.now();
seedDemo({ log: (s) => console.log('  ' + s) })
  .then(() => {
    console.log(`Demo seeded in ${((Date.now() - started) / 1000).toFixed(1)} s.`);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
