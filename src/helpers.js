import process from 'node:process';
import path from 'node:path'

export default (name) => path.resolve(process.cwd(), name);
