#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
speed.py — wrapper sobre el Speedtest CLI oficial de Ookla.

Reemplaza a la vieja librería "speedtest-cli" (Python puro), que en enlaces
de varios cientos de Mbps / Gbps queda limitada por el propio intérprete de
Python y a veces selecciona servidores muy lejanos. Este script invoca el
binario oficial `speedtest` (instalado desde packagecloud.io/ookla) con
salida `--format=json` y reconstruye exactamente los mismos mensajes en
español (▢ ...) que ya imprimía el script anterior, para que el bot que lo
llama no necesite ningún cambio.

Requisitos:
    El binario `speedtest` de Ookla debe estar instalado y en el PATH.
"""

import argparse
import json
import os
import platform
import shutil
import subprocess
import sys
import tarfile
import tempfile
import urllib.request

__version__ = '3.1.0-ookla-wrapper'

OOKLA_VERSION = '1.2.0'
# Carpeta local (junto al script) donde se guarda el binario descargado.
# No requiere permisos de root ni tocar /etc, /usr, etc. — funciona en
# contenedores con filesystem de sistema en solo lectura (p. ej. Pterodactyl).
LOCAL_BIN_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.speedtest-bin')
LOCAL_BIN_PATH = os.path.join(LOCAL_BIN_DIR, 'speedtest')

ARCH_MAP = {
    'x86_64': 'x86_64',
    'amd64': 'x86_64',
    'aarch64': 'aarch64',
    'arm64': 'aarch64',
    'armv7l': 'armhf',
    'armv6l': 'armel',
    'i386': 'i386',
    'i686': 'i386',
}


def printer(string, quiet=False, **kwargs):
    if not quiet:
        print(string, **kwargs)
        sys.stdout.flush()


def install_ookla_binary():
    """Descarga el binario estático oficial de Ookla (sin apt, sin root) y
    lo deja listo en LOCAL_BIN_PATH."""
    sys.stderr.write('▢ Speedtest (Ookla) no encontrado, descargando binario...\n')
    sys.stderr.flush()

    machine = platform.machine().lower()
    arch = ARCH_MAP.get(machine)
    if not arch:
        raise SystemExit(
            '▢ *Error:* arquitectura "%s" no soportada para la descarga '
            'automática del binario de Ookla.' % machine
        )

    url = (
        'https://install.speedtest.net/app/cli/'
        'ookla-speedtest-%s-linux-%s.tgz' % (OOKLA_VERSION, arch)
    )

    os.makedirs(LOCAL_BIN_DIR, exist_ok=True)

    try:
        with tempfile.NamedTemporaryFile(suffix='.tgz', delete=False) as tmp:
            tmp_path = tmp.name
        urllib.request.urlretrieve(url, tmp_path)

        with tarfile.open(tmp_path, 'r:gz') as tar:
            member = next(
                (m for m in tar.getmembers() if os.path.basename(m.name) == 'speedtest'),
                None
            )
            if not member:
                raise SystemExit('▢ *Error:* el archivo descargado no contiene el binario "speedtest".')
            member.name = 'speedtest'
            tar.extract(member, path=LOCAL_BIN_DIR)
    except (OSError, IOError, tarfile.TarError) as exc:
        raise SystemExit('▢ *Error al descargar/extraer Speedtest:* %s' % exc)
    finally:
        try:
            os.remove(tmp_path)
        except OSError:
            pass

    os.chmod(LOCAL_BIN_PATH, 0o755)

    if not os.path.isfile(LOCAL_BIN_PATH):
        raise SystemExit('▢ *Error:* no se pudo dejar listo el binario de Speedtest.')

    sys.stderr.write('▢ Speedtest (Ookla) descargado correctamente.\n')
    return LOCAL_BIN_PATH


def find_ookla_binary():
    path = shutil.which('speedtest')
    if path:
        return path
    if os.path.isfile(LOCAL_BIN_PATH) and os.access(LOCAL_BIN_PATH, os.X_OK):
        return LOCAL_BIN_PATH
    return install_ookla_binary()


def run_ookla(server_id=None, timeout=60):
    """Ejecuta el Speedtest CLI oficial y devuelve el dict ya parseado."""
    binary = find_ookla_binary()
    cmd = [binary, '--accept-license', '--accept-gdpr', '--format=json']
    if server_id:
        cmd += ['--server-id', str(server_id)]

    try:
        proc = subprocess.run(
            cmd, capture_output=True, text=True, timeout=timeout
        )
    except subprocess.TimeoutExpired:
        raise SystemExit('▢ *Error:* la prueba de velocidad tardó demasiado y fue cancelada.')

    if proc.returncode != 0:
        msg = proc.stderr.strip() or proc.stdout.strip() or 'error desconocido'
        raise SystemExit('▢ *Error al ejecutar Speedtest:* %s' % msg)

    try:
        return json.loads(proc.stdout.strip().splitlines()[-1])
    except (ValueError, IndexError):
        raise SystemExit('▢ *Error:* no se pudo interpretar la salida de Speedtest.')


def bits_to_unit(bits_per_sec, units):
    """units: ('Mbit', 8) para bits, ('MByte', 1) para bytes, etc."""
    label, divisor = units
    return (bits_per_sec / 1000.0 / 1000.0) / divisor, label


def parse_args():
    parser = argparse.ArgumentParser(
        description='Wrapper en español del Speedtest CLI oficial de Ookla.'
    )
    parser.add_argument('--bytes', dest='units', action='store_const',
                         const=('MByte/s', 8), default=('Mbit/s', 1),
                         help='Mostrar velocidades en MegaBytes/s en vez de Megabits/s')
    parser.add_argument('--simple', action='store_true',
                         help='Salida simple: solo latencia, descarga y subida')
    parser.add_argument('--json', action='store_true',
                         help='Salida en formato JSON crudo (tal cual la entrega Ookla)')
    parser.add_argument('--share', action='store_true',
                         help='Generar y mostrar enlace para compartir el resultado')
    parser.add_argument('--secure', action='store_true',
                         help='(sin efecto, Ookla CLI siempre usa HTTPS) mantenido '
                              'por compatibilidad con llamadas existentes')
    parser.add_argument('--server', type=int, default=None,
                         help='ID de servidor específico contra el que testear')
    parser.add_argument('--list', action='store_true',
                         help='Listar servidores cercanos disponibles')
    parser.add_argument('--version', action='store_true',
                         help='Mostrar versión y salir')
    parser.add_argument('--check', action='store_true',
                         help='Verificar si el binario de Ookla está instalado '
                              '(y descargarlo si falta) sin correr un test')
    return parser.parse_args()


def show_version():
    binary = find_ookla_binary()
    proc = subprocess.run([binary, '--version'], capture_output=True, text=True)
    printer('speed.py %s (wrapper)\n%s' % (__version__, proc.stdout.strip()))
    sys.exit(0)


def list_servers():
    binary = find_ookla_binary()
    proc = subprocess.run([binary, '--servers', '--format=json'],
                           capture_output=True, text=True)
    try:
        data = json.loads(proc.stdout.strip().splitlines()[-1])
    except (ValueError, IndexError):
        raise SystemExit('▢ *Error:* no se pudo obtener la lista de servidores.')

    for s in data.get('servers', []):
        printer('%5s) %s (%s, %s) [%.2f km]' % (
            s.get('id'), s.get('sponsor', s.get('name', '')),
            s.get('name', ''), s.get('country', ''),
            float(s.get('distance', 0))
        ))
    sys.exit(0)


def main():
    args = parse_args()
    quiet = args.simple or args.json

    if args.version:
        show_version()

    if args.check:
        binary = find_ookla_binary()
        proc = subprocess.run([binary, '--version'], capture_output=True, text=True)
        printer('▢ *Binario:* %s\n▢ *Versión:*\n%s' % (binary, proc.stdout.strip()))
        return

    if args.list:
        list_servers()

    printer('_*< INFO - SPEEDTEST />*_\n', quiet)
    printer('▢ *Iniciando prueba...*', quiet)
    printer('▢ *Buscando servidor...*', quiet)
    printer('▢ *Se selecionó el mejor servidor...*', quiet)

    result = run_ookla(server_id=args.server)

    if args.json:
        printer(json.dumps(result, ensure_ascii=False))
        return

    isp = result.get('isp', 'N/D')
    server = result.get('server', {})
    ping = result.get('ping', {})
    download = result.get('download', {})
    upload = result.get('upload', {})
    result_url = result.get('result', {}).get('url', 'N/D')

    dl_value, dl_label = bits_to_unit(download.get('bandwidth', 0) * 8, args.units)
    ul_value, ul_label = bits_to_unit(upload.get('bandwidth', 0) * 8, args.units)
    latency = ping.get('latency', 0)

    if args.simple:
        printer('▢ Latencia: %.2f ms\n▢ Descarga: %.2f %s\n\n▢ Subida: %.2f %s' % (
            latency, dl_value, dl_label, ul_value, ul_label
        ))
        return

    printer('\n▢ *ISP:* %s' % isp, quiet)
    printer('▢ *Servidor:* %s\n▢ *Ubicación:* %s, %s [%.2f km]\n▢ *Latencia:* %.3f ms' % (
        server.get('name', 'N/D'),
        server.get('location', 'N/D'), server.get('country', ''),
        float(server.get('distance', 0) or 0), latency
    ), quiet)

    printer('--------------------------------------------------------------------------', quiet)
    printer('▢ *Descarga:* %.2f %s' % (dl_value, dl_label), quiet)
    printer('▢ *Subida:* %.2f %s' % (ul_value, ul_label), quiet)

    if args.share:
        printer('\n▢ *Compartir resultado:* %s' % result_url, quiet)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        sys.stderr.write('\n▢ *Cancelando...*\n')
        sys.exit(1)
