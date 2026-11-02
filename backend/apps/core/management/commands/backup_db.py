import os
import subprocess
from datetime import datetime
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings

class Command(BaseCommand):
    help = 'Create an automated PostgreSQL database backup with rotation'

    def add_arguments(self, parser):
        parser.add_arguments = parser.add_argument(
            '--tag',
            type=str,
            default='manual',
            help='Tag for the backup file (e.g. daily, hourly, manual)'
        )

    def handle(self, *args, **options):
        tag = options.get('tag', 'manual')
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_dir = Path(settings.BACKUP_DIR)
        backup_dir.mkdir(parents=True, exist_ok=True)
        
        backup_filename = f"inceptum_db_{tag}_{timestamp}.sql"
        backup_path = backup_dir / backup_filename

        pg_bin = Path(settings.POSTGRES_BIN_PATH)
        pg_dump_exe = pg_bin / 'pg_dump.exe'

        db_settings = settings.DATABASES['default']
        db_name = db_settings['NAME']
        db_user = db_settings['USER']
        db_host = db_settings['HOST']
        db_port = str(db_settings['PORT'])
        db_password = db_settings['PASSWORD']

        self.stdout.write(f"Initiating PostgreSQL backup for database: {db_name}...")

        env = os.environ.copy()
        env['PGPASSWORD'] = db_password

        cmd = [
            str(pg_dump_exe),
            '-h', db_host,
            '-p', db_port,
            '-U', db_user,
            '--format=c',  # Custom compressed archive format
            '--file', str(backup_path),
            db_name
        ]

        try:
            result = subprocess.run(cmd, env=env, check=True, capture_output=True, text=True)
            size_mb = backup_path.stat().st_size / (1024 * 1024)
            self.stdout.write(self.style.SUCCESS(
                f"[OK] Backup created successfully: {backup_path.name} ({size_mb:.2f} MB)"
            ))

            # Audit log
            try:
                from audit_logs.models import AuditLog
                AuditLog.objects.create(
                    action=AuditLog.ActionType.SETTINGS,
                    title='Avtomatik zaxira nusxa (Backup) yaratildi',
                    description=f"Fayl: {backup_path.name}, Hajmi: {size_mb:.2f} MB",
                    ip_address='127.0.0.1'
                )
            except Exception:
                pass

        except subprocess.CalledProcessError as e:
            self.stderr.write(self.style.ERROR(f"❌ Backup failed: {e.stderr}"))
            raise e
