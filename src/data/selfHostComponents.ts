// Manifest of the components that make up a self-hosted Nostr Mail bridge.
// Drives the adaptive "Your stack" summary, the deploy ordering, and the help
// links on /self-host. The full setup content for each component is authored
// inline in src/pages/self-host.astro and tagged with data-component=<id>.

export type Facet =
	| 'inbound'
	| 'outbound'
	| 'smtp-provider'
	| 'smtp-selfhost'
	| 'policy';

export type BridgeComponent = {
	id: string;        // stable id, used in DOM ids and data-component
	name: string;      // display name
	role: string;      // one-line description for the "Your stack" list
	showFor: Facet[];  // which active facets require this component
	order: number;     // canonical deploy order (lower = earlier)
	repoUrl: string;   // GitHub repository
};

export const components: BridgeComponent[] = [
	{
		id: 'nmail-api',
		name: 'nmail-api',
		role: 'Accounts, rate limits & NIP-05 identity',
		showFor: ['policy'],
		order: 10,
		repoUrl: 'https://github.com/nogringo/nmail-api',
	},
	{
		id: 'postfix-rspamd-docker',
		name: 'postfix-rspamd-docker',
		role: 'Self-hosted SMTP smarthost (Postfix + Rspamd)',
		showFor: ['smtp-selfhost'],
		order: 20,
		repoUrl: 'https://github.com/nogringo/postfix-rspamd-docker',
	},
	{
		id: 'haraka-webhook',
		name: 'haraka-webhook',
		role: 'Inbound SMTP receiver (port 25) → webhook',
		showFor: ['inbound'],
		order: 30,
		repoUrl: 'https://github.com/nogringo/haraka-webhook',
	},
	{
		id: 'nostr-mail-inbound-webhook',
		name: 'nostr-mail-inbound-webhook',
		role: 'Publishes inbound email to Nostr',
		showFor: ['inbound'],
		order: 40,
		repoUrl: 'https://github.com/nogringo/nostr-mail-inbound-webhook',
	},
	{
		id: 'bridge-nostr-smtp',
		name: 'bridge-nostr-smtp',
		role: 'Delivers Nostr mail to legacy email over SMTP',
		showFor: ['outbound'],
		order: 50,
		repoUrl: 'https://github.com/nogringo/bridge-nostr-smtp',
	},
];
