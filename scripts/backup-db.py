"""SQLite online backup. Usage: python3 scripts/backup-db.py SOURCE DESTINATION"""
import os
import sqlite3
import sys
from pathlib import Path

if len(sys.argv) != 3:
    raise SystemExit(__doc__)
source, destination = map(Path, sys.argv[1:])
if not source.is_file():
    raise SystemExit('Source database does not exist')
# Exclusive creation prevents replacing a previous backup.
fd = os.open(destination, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
os.close(fd)
try:
    with sqlite3.connect(source.resolve().as_uri() + '?mode=ro', uri=True) as src:
        with sqlite3.connect(destination) as dst:
            src.backup(dst)
            if dst.execute('PRAGMA integrity_check').fetchone()[0] != 'ok':
                raise RuntimeError('Backup integrity check failed')
except Exception:
    destination.unlink(missing_ok=True)
    raise
print('Backup created and integrity checked')
