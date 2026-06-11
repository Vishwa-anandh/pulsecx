import { spawn } from 'child_process';
import path from 'path';
import os from 'os';

const agyPath = path.join(os.homedir(), '.local', 'bin', 'agy.exe');
const child = spawn(agyPath, ['--print', 'hello', '--dangerously-skip-permissions'], { 
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, TERM: 'xterm-256color', FORCE_COLOR: '1', NO_COLOR: '0' }
});

child.stdout.on('data', (data) => process.stdout.write(data));
child.stderr.on('data', (data) => process.stderr.write(data));
child.on('close', (code) => console.log('Exited with code', code));
