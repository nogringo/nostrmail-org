// Tiny dependency-free syntax highlighters for the generated .env and
// docker-compose.yml. Pure string -> HTML-string so they can be unit tested.
// The caller keeps the raw text separately (data-raw) for copy-to-clipboard,
// so the markup these add never has to round-trip back to text.

function esc(s) {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Highlight a dotenv file: comments, KEY, =, and numeric values. */
export function highlightEnv(text) {
	return text.split('\n').map((line) => {
		if (/^\s*#/.test(line)) return `<span class="tok-comment">${esc(line)}</span>`;
		const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)(=)(.*)$/);
		if (!m) return esc(line);
		const v = m[3];
		const val = v !== '' && /^\d+$/.test(v) ? `<span class="tok-number">${esc(v)}</span>` : esc(v);
		return `<span class="tok-key">${esc(m[1])}</span><span class="tok-punct">=</span>${val}`;
	}).join('\n');
}

function yamlVal(v) {
	if (v === '') return '';
	if (/^".*"$/.test(v)) return `<span class="tok-string">${esc(v)}</span>`;
	if (/^-?\d+$/.test(v) || v === 'true' || v === 'false') return `<span class="tok-number">${esc(v)}</span>`;
	return esc(v);
}

/** Highlight the compose YAML we generate: comments, keys, list dashes, scalars. */
export function highlightYaml(text) {
	return text.split('\n').map((line) => {
		if (/^\s*#/.test(line)) return `<span class="tok-comment">${esc(line)}</span>`;
		let m = line.match(/^(\s*)(- )(.*)$/);
		if (m) return `${m[1]}<span class="tok-punct">-</span> ${yamlVal(m[3])}`;
		m = line.match(/^(\s*)([A-Za-z0-9_.\/-]+)(:)(\s?)(.*)$/);
		if (m) return `${m[1]}<span class="tok-key">${esc(m[2])}</span><span class="tok-punct">:</span>${m[4]}${yamlVal(m[5])}`;
		return esc(line);
	}).join('\n');
}
