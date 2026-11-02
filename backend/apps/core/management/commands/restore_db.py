import os
import subprocess
from pathlib import Path
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings

class Command(BaseCommand):
    help = 'Restore PostgreSQL database from a backup file'

    def add_arguments(self, parser):
        parser.add_argument('backup_file', type=str, help='Filename or full path to backup .sql file')

    def handle(self, *args, **options):
        file_arg = options['backup_file']
        backup_path = Path(file_arg)
        if not backup_path.is_absolute():
            backup_path = Path(settings.BACKUP_DIR) / file_arg

        if not backup_path.exists():
            raise CommandError(f"Backup file not found: {backup_path}")

        pg_bin = Path(settings.POSTGRES_BIN_PATH)
        pg_restore_exe = pg_bin / 'pg_restore.exe'

        db_settings = settings.DATABASES['default']
        db_name = db_settings['NAME']
        db_user = db_settings['USER']
        db_host = db_settings['HOST']
        db_port = str(db_settings['PORT'])
        db_password = db_settings['PASSWORD']

        self.stdout.write(f"Restoring database {db_name} from: {backup_path.name}...")

        env = os.environ.copy()
        env['PGPASSWORD'] = db_password

        cmd = [
            str(pg_restore_exe),
            '-h', db_host,
            '-p', db_port,
            '-U', db_user,
            '-d', db_name,
            '--clean',
            '--if-exists',
            str(backup_path)
        ]

        try:
            result = subprocess.run(cmd, env=env, check=True, capture_output=True, text=True)
            self.stdout.write(self.style.SUCCESS(f"[OK] Database restored successfully from {backup_path.name}"))
        except subprocess.CalledProcessError as e:
            # pg_restore may return warnings as exit code 1
            if "errors ignored on restore" in e.stderr.lower() or not e.stderr:
                self.stdout.write(self.style.SUCCESS(f"[OK] Restore completed with non-fatal warnings."))
            else:
                self.stderr.write(self.style.ERROR(f"Restore failed: {e.stderr}"))
                raise CommandError(e.stderr)
