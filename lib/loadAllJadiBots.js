/*

    CÓDIGO SIMPLE PARA LA RECARGA DE JADIBOTS AL INICIAR, SE PUEDE EXTENDER Y MEJORAR DE ACUERDO A TÚS NECESIDADES.

    SI QUIERES QUE MANEJE MÁS EVENTOS LOS TIENES QUE AGREGAR AQUI.

    CÓDIGO HECHO POR: DanixlJs - si asi es, el nuvsito ese.
    [https://github.com/DanixlJs]

    DEJA LOS CRÉDITOS HDP

*/
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import pino from 'pino'
import { makeWASocket } from "./simple.js";
import { makeCacheableSignalKeyStore, useMultiFileAuthState, fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import { handler } from "../handler.js";
const __dirname = path.join(fileURLToPath(import.meta.url));
export default async function loadAllJadiBots() {
	const authJadi = path.join(__dirname, "../../jadibts");
	const sesions = await fs.readdir(authJadi);
	if (sesions.length !== 0) {
        console.log("Cargando " + sesions.length + " Sesiones de la carpeta 'jadibts'"); // que asco tiene 'bts' :v
		for (const sesion of sesions) {
			const auth = path.join(authJadi, sesion);
			try {
				await fs.access(path.join(auth, "creds.json"));
			} catch {
				continue;
			}
			await connect(auth);
		}
	} else {
        console.log("Sin JadiBots que cargar.");
    }
}
async function connect(sesionFile, retries = 0) {
	const { state, saveCreds } = await useMultiFileAuthState(sesionFile);
	const { version } = await fetchLatestBaileysVersion();
	const conn = makeWASocket({
		markOnlineOnConnect: true,
		defaultQueryTimeoutMs: undefined,
		auth: {
			creds: state.creds,
			keys: makeCacheableSignalKeyStore(state.keys, pino({
				level: "silent"
			}).child({
				level: "silent"
			}))
		},
		logger: pino({
			level: "silent"
		}),
		browser: ["Ubuntu", "Edge", "20.0.4"],
		syncFullHistory: true,
		printQRInTerminal: false,
		patchMessageBeforeSending: async message => {
			try {
				await sock.uploadPreKeysToServerIfRequired();
			} catch (err) {
				console.error(err);
			}
			return message;
		},
		generateHighQualityLinkPreview: true,
		version
	});
	conn.ev.on("creds.update", saveCreds);
	conn.ev.on("connection.update", async update => {
		const { connection, lastDisconnect } = update;
		if (connection === "close") {
			const code = new Boom(lastDisconnect?.error)?.output?.statusCode;
			// ojo al ingles de la más alta calidad 🗿
			switch (code) {
				case 401: //logout
				case 500: //bad sesion?
				case 403: //forbiden
				case 405: //conn end
					try {
						console.log("error inesperado") 
						//await fs.rm(sesionFile, { recursive: true, force: true });
					} catch (err) {
						console.error(err);
					}
					break;
				default:
					if (retries < 6) {
						await connect(sesionFile, retries + 1);
					} else {
						try {
							//await fs.rm(sesionFile, { recursive: true, force: true });
						} catch (err) {
							console.error(err);
						}
					}
					break;
			}
		} else if (connection === "open") {
			global.conns.push(conn);
		}
	});
	conn.ev.on("messages.upsert", handler);
}
