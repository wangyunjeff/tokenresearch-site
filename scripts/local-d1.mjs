import { DatabaseSync } from 'node:sqlite';
import { readFileSync,readdirSync,mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
export function localD1(filename){
 if(filename!==':memory:')mkdirSync(dirname(resolve(filename)),{recursive:true});
 const db=new DatabaseSync(filename);
 db.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;');
 const migrations=fileURLToPath(new URL('../drizzle/',import.meta.url));
 db.exec('CREATE TABLE IF NOT EXISTS local_migrations (name TEXT PRIMARY KEY)');
 for(const name of readdirSync(migrations).filter(n=>n.endsWith('.sql')).sort()){
  if(!db.prepare('SELECT name FROM local_migrations WHERE name = ?').get(name)){
   db.exec('BEGIN');try{db.exec(readFileSync(migrations+'/'+name,'utf8'));db.prepare('INSERT INTO local_migrations VALUES (?)').run(name);db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}
  }
 }
 return {prepare(sql){let args=[];return {bind(...a){args=a;return this;},async first(){return db.prepare(sql).get(...args)??null;},async all(){return {results:db.prepare(sql).all(...args)};},async run(){return {meta:db.prepare(sql).run(...args)};}};},close(){db.close();}};
}
