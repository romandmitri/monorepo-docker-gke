import {Kysely, Migrator, PostgresDialect} from "kysely";
import {defineConfig, getKnexTimestampPrefix, TSFileMigrationProvider} from "kysely-ctl";
import {Pool} from "pg";

// Do NOT need <Database> interface here because migrations should be frozen in time.
const db = new Kysely<any>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: process.env.REPPO_MIGRATE_DATABASE_URL,
		}),
	}),
	log: ['query', 'error'],
});

// TODO: reidenzon - Resolve path?!
// const migrationFolder = path.resolve(__dirname, '"/src/migrations"'),
const migrationFolder = "/src/migrations";

// https://www.npmjs.com/package/kysely-ctl
export default defineConfig({
	kysely: db,
	migrations: {
		getMigrationPrefix: getKnexTimestampPrefix,
		migrator: () => new Migrator({
			db: db,
			provider: new TSFileMigrationProvider({
				migrationFolder: migrationFolder,
			}),
		}),
	},
});
