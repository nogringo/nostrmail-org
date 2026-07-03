// Pure generators for the /self-host configurator: turn a {dir, smtp, policy,
// domain} selection into a merged .env and docker-compose.yml, the facet set
// used for show/hide, and a plain-English stack summary. No DOM here so it can
// be unit tested in Node and imported by the page's client script alike.
//
// The .env carries EVERY variable from each selected component's .env.example
// (merged into one file, with merged-stack values). The compose loads it with
// `env_file: .env`; only the handful of values that two services cannot share
// in one file stay pinned in the compose: the in-container PORT (webhook 8080
// vs nmail-api 3000), DATA_DIR, and postgres infra vars.

/**
 * @typedef {{ dir: 'inbound'|'outbound'|'both', smtp: 'provider'|'selfhost', policy: boolean, domain?: string }} State
 */

/** @param {State} s */
export function deriveFacets(s) {
	const f = new Set();
	if (s.dir !== 'outbound') f.add('inbound');
	if (s.dir !== 'inbound') f.add('outbound');
	if (f.has('outbound')) f.add(s.smtp === 'selfhost' ? 'smtp-selfhost' : 'smtp-provider');
	if (s.policy) {
		f.add('policy');
		if (f.has('inbound')) f.add('policy-inbound');
		if (f.has('outbound')) f.add('policy-outbound');
	}
	return f;
}

/** @param {State} s */
export function buildEnv(s) {
	const inbound = s.dir !== 'outbound';
	const outbound = s.dir !== 'inbound';
	const selfhost = outbound && s.smtp === 'selfhost';
	const policy = s.policy;
	const domain = s.domain || 'example.com';
	const L = [];

	if (inbound) {
		L.push('# ============================================================');
		L.push('#  haraka-webhook: inbound SMTP receiver (port 25)');
		L.push('# ============================================================');
		L.push('');
		L.push('# Where Haraka POSTs received mail (internal service URL)');
		L.push('WEBHOOK_URL=http://webhook:8080/mime');
		L.push('');
		L.push('# Shared signing secret, use the SAME value for the webhook below');
		L.push('# (generate with: openssl rand -hex 32)');
		L.push('WEBHOOK_SIGNING_KEY=replace-with-a-random-hex-secret');
		L.push('');
		L.push('# Recipient policy, accept only your domain(s), or set true for any');
		L.push('ACCEPT_ALL_RECIPIENTS=false');
		L.push('ACCEPTED_DOMAINS=' + domain);
		L.push('');
		L.push('# Opportunistic STARTTLS on port 25 (leave the two *_PATH blank to disable)');
		L.push('SMTP_TLS_CERT_DIR=./certs');
		L.push('SMTP_TLS_CERT_PATH=');
		L.push('SMTP_TLS_KEY_PATH=');
		L.push('');
		if (policy) {
			L.push('# Inbound policy API (nmail-api)');
			L.push('WEBHOOK_DECISION_URL=http://nmail-api:3000/inbound/decision');
			L.push('# Must match INBOUND_DECISION_TOKEN in the nmail-api section');
			L.push('WEBHOOK_DECISION_TOKEN=replace-with-the-inbound-decision-token');
			L.push('WEBHOOK_DECISION_PAYLOAD_MODE=minimal');
		} else {
			L.push('# Inbound policy API (optional), payload detail: minimal | summary | full');
			L.push('WEBHOOK_DECISION_PAYLOAD_MODE=minimal');
		}
		L.push('');
		L.push('# Spool directory + delivery/retry tuning (milliseconds)');
		L.push('SPOOL_DIR=/var/spool/haraka-webhook');
		L.push('WEBHOOK_TIMEOUT_MS=60000');
		L.push('RETRY_SCAN_INTERVAL_MS=5000');
		L.push('RETRY_INTERVAL_MS=30000');
		L.push('RETRY_MAX_INTERVAL_MS=3600000');
		L.push('');
		L.push('# ============================================================');
		L.push('#  nostr-mail-inbound-webhook: publishes mail to Nostr');
		L.push('# ============================================================');
		L.push('');
		L.push('# In-container port (kept internal; reached as webhook:8080)');
		L.push('PORT=8080');
		L.push('');
		L.push('# Nostr private key that signs the published events (nsec or hex)');
		L.push('NOSTR_PRIVATE_KEY=nsec1...');
		L.push('');
		L.push('# Same value as WEBHOOK_SIGNING_KEY above');
		L.push('WEBHOOK_SIGNING_KEY=replace-with-a-random-hex-secret');
		L.push('');
		L.push('# Reject webhook signatures older/newer than this many seconds');
		L.push('SIGNATURE_TOLERANCE_SECONDS=900');
		L.push('');
		L.push('# Relays to bootstrap recipient lookups and publishing');
		L.push('BOOTSTRAP_NOSTR_RELAYS=wss://relay.damus.io,wss://nos.lol,wss://purplepag.es');
		L.push('# Optional fallback DM relays (comma-separated)');
		L.push('DEFAULT_DM_RELAYS=');
		L.push('# Optional Blossom servers for large attachments (comma-separated)');
		L.push('DEFAULT_BLOSSOM_SERVERS=');
		L.push('');
		L.push('# Max decoded message size in bytes (64 MB)');
		L.push('MAX_MIME_BYTES=67108864');
		L.push('');
	}

	if (outbound) {
		L.push('# ============================================================');
		L.push('#  bridge-nostr-smtp: delivers Nostr mail to legacy email');
		L.push('# ============================================================');
		L.push('');
		L.push('# Nostr identity the bridge receives gift-wrapped mail as (nsec or hex)');
		L.push('NSEC=nsec1...');
		L.push('# Relays to listen on (comma-separated)');
		L.push('RELAYS=wss://relay.damus.io,wss://nos.lol,wss://purplepag.es');
		L.push('# Drop gift wraps older than this many days');
		L.push('MAX_GIFTWRAP_AGE_DAYS=4');
		L.push('');
		L.push('# Database + resolved .eml storage (inside the data volume)');
		L.push('DB_PATH=/data/bridge.db');
		L.push('EML_DIR=/data/eml');
		L.push('');
		L.push('# SMTP smarthost');
		L.push('SMTP_HOST=' + (selfhost ? 'mail.' + domain : 'smtp.your-provider.com'));
		L.push('SMTP_PORT=587');
		L.push('# true for implicit TLS (port 465); false uses STARTTLS');
		L.push('SMTP_SECURE=false');
		L.push('SMTP_USERNAME=postmaster@' + domain);
		L.push('SMTP_PASSWORD=your-smtp-password');
		L.push('# Hostname announced in EHLO');
		L.push('SMTP_CLIENT_DOMAIN=' + domain);
		L.push('');
		if (policy) {
			L.push('# Outbound policy API (nmail-api)');
			L.push('DECISION_URL=http://nmail-api:3000/outbound/decision');
			L.push('# Must match OUTBOUND_DECISION_TOKEN in the nmail-api section');
			L.push('DECISION_TOKEN=replace-with-the-outbound-decision-token');
			L.push('DECISION_PAYLOAD_MODE=minimal');
		} else {
			L.push('# Outbound policy API (optional), leave URL blank to allow all');
			L.push('DECISION_URL=');
			L.push('DECISION_TOKEN=');
			L.push('DECISION_PAYLOAD_MODE=minimal');
		}
		L.push('');
	}

	if (policy) {
		L.push('# ============================================================');
		L.push('#  nmail-api + postgres: accounts, rate limits, NIP-05');
		L.push('#  (nmail-api listens on 3000, pinned in docker-compose.yml)');
		L.push('# ============================================================');
		L.push('');
		L.push('# Postgres password, also update DATABASE_URL below if you change it');
		L.push('POSTGRES_PASSWORD=change-me');
		L.push('# Connection string the API uses to reach postgres');
		L.push('DATABASE_URL=postgres://nmail:change-me@postgres:5432/nmail');
		L.push('');
		L.push('# Token required by the inbound SMTP policy (openssl rand -hex 32)');
		L.push('INBOUND_DECISION_TOKEN=replace-with-the-inbound-decision-token');
		if (outbound) {
			L.push('# Token required by the outbound (Nostr to SMTP) policy');
			L.push('OUTBOUND_DECISION_TOKEN=replace-with-the-outbound-decision-token');
		}
		L.push('');
		L.push('# Max .eml body accepted by /outbound/decision in bytes (32 MB)');
		L.push('OUTBOUND_MAX_BODY_BYTES=33554432');
		L.push('# Password that enables the admin console at /admin');
		L.push('ADMIN_PASSWORD=change-me-admin');
		L.push('');
	}

	return L.join('\n').trim() + '\n';
}

/** @param {State} s */
export function buildCompose(s) {
	const inbound = s.dir !== 'outbound';
	const outbound = s.dir !== 'inbound';
	const policy = s.policy;
	const L = ['services:'];
	const vols = [];

	if (inbound) {
		L.push('  haraka-webhook:');
		L.push('    image: ghcr.io/nogringo/haraka-webhook:latest');
		L.push('    restart: unless-stopped');
		L.push('    env_file: .env');
		L.push('    ports:');
		L.push('      - "25:25/tcp"');
		L.push('    volumes:');
		L.push('      - haraka-spool:/var/spool/haraka-webhook');
		L.push('      - ${SMTP_TLS_CERT_DIR:-./certs}:/certs:ro');
		vols.push('haraka-spool');
		L.push('');
		L.push('  webhook:');
		L.push('    image: ghcr.io/nogringo/nostr-mail-inbound-webhook:latest');
		L.push('    restart: unless-stopped');
		L.push('    env_file: .env');
		L.push('    environment:');
		L.push('      DATA_DIR: /data');
		L.push('    volumes:');
		L.push('      - inbound-data:/data');
		vols.push('inbound-data');
		L.push('');
	}

	if (outbound) {
		L.push('  bridge:');
		L.push('    image: ghcr.io/nogringo/bridge-nostr-smtp:latest');
		L.push('    restart: unless-stopped');
		L.push('    env_file: .env');
		L.push('    volumes:');
		L.push('      - bridge-data:/data');
		vols.push('bridge-data');
		L.push('');
	}

	if (policy) {
		L.push('  nmail-api:');
		L.push('    image: ghcr.io/nogringo/nmail-api:main');
		L.push('    restart: unless-stopped');
		L.push('    env_file: .env');
		L.push('    depends_on:');
		L.push('      postgres:');
		L.push('        condition: service_healthy');
		L.push('    ports:');
		L.push('      - "3000:3000"');
		L.push('    environment:');
		L.push('      PORT: "3000"');
		L.push('');
		L.push('  postgres:');
		L.push('    image: postgres:18-alpine');
		L.push('    restart: unless-stopped');
		L.push('    environment:');
		L.push('      POSTGRES_DB: nmail');
		L.push('      POSTGRES_USER: nmail');
		L.push('      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-change-me}');
		L.push('    healthcheck:');
		L.push('      test: ["CMD-SHELL", "pg_isready -U nmail -d nmail"]');
		L.push('      interval: 10s');
		L.push('      timeout: 5s');
		L.push('      retries: 10');
		L.push('    volumes:');
		L.push('      - nmail-postgres:/var/lib/postgresql');
		vols.push('nmail-postgres');
		L.push('');
	}

	L.push('volumes:');
	vols.forEach((v) => L.push('  ' + v + ':'));
	return L.join('\n') + '\n';
}

/** @param {State} s */
export function stackSummary(s) {
	const inbound = s.dir !== 'outbound';
	const outbound = s.dir !== 'inbound';
	const names = [];
	if (inbound) names.push('haraka-webhook', 'nostr-mail-inbound-webhook');
	if (outbound) names.push('bridge-nostr-smtp');
	if (outbound && s.smtp === 'selfhost') names.push('postfix-rspamd-docker');
	if (s.policy) names.push('nmail-api');
	return `You'll deploy ${names.length} component${names.length > 1 ? 's' : ''}: ${names.join(', ')}.`;
}
