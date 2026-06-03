// Hard-wrap: insert real newlines into long lines so each visual row becomes a
// real document line with an exact, fixed height. This keeps the outer
// container as the scroll element and makes pixel scroll restoration precise
// (no CodeMirror height estimation involved — every line is exactly lineHeight).
//
// Raw '\n' inside a JSON string is tolerated by the lezer-json5 grammar
// (its string body matches any char except `"`/`\`), so syntax highlighting
// and folding stay intact. We only disable the strict JSON5 linter.
//
// Returns:
//   text        — the wrapped text
//   lineNumbers — per output line: the logical (original) 1-based line number,
//                 or null for continuation rows (so the gutter can blank them,
//                 mimicking native soft-wrap).
const buildWrapModel = (text, cols) => {
  if (typeof text !== 'string') return { text: '', lineNumbers: [] };
  const logical = text.split('\n');

  if (!cols || cols < 1) {
    return { text, lineNumbers: logical.map((_, i) => i + 1) };
  }

  const outLines = [];
  const lineNumbers = [];

  for (let li = 0; li < logical.length; li++) {
    const line = logical[li];
    if (line.length <= cols) {
      outLines.push(line);
      lineNumbers.push(li + 1);
      continue;
    }
    let i = 0;
    let first = true;
    while (i < line.length) {
      let end = Math.min(i + cols, line.length);
      // Never break right after a backslash. The inserted newline would merge
      // with it as a JSON5 line-continuation and unescape the next char — e.g.
      // splitting \" into \ + newline + " ends the string early and corrupts
      // the parse (keys then highlight as strings). Back up over trailing
      // backslashes so escape sequences stay intact.
      if (end < line.length) {
        while (end > i + 1 && line[end - 1] === '\\') end--;
      }
      outLines.push(line.slice(i, end));
      lineNumbers.push(first ? li + 1 : null);
      first = false;
      i = end;
    }
  }
  return { text: outLines.join('\n'), lineNumbers };
};


// Build the wrap model with columns that fit the editor's content width.
// Two passes: the line-number gutter widens with the (post-wrap) line count,
// so we estimate its final width up front. Otherwise hard-wrapped lines slightly
// overflow and lineWrapping breaks the tail onto ragged stub rows.
export const buildModel = (view, original) => {
  if (typeof original !== 'string') return { text: '', lineNumbers: [] };
  const charW = view.defaultCharacterWidth || 8;
  const clientWidth = view.scrollDOM.clientWidth;
  // Accurate gutter: line-number column (min 30px, ~9px/digit + padding) + the
  // fold-marker gutter (~18px). lineWrapping is OFF so a line must never exceed
  // the width (it would h-scroll, not wrap) — but charW is exact for monospace
  // and floor() guarantees the fit, so only a tiny 4px slack is needed.
  const gutterFor = (lines) => Math.max(30, String(Math.max(1, lines)).length * 9 + 10) + 18;
  const colsFor = (gutterW) => Math.max(20, Math.floor((clientWidth - gutterW - 4) / charW));

  let cols = colsFor(gutterFor(original.split('\n').length));
  let model = buildWrapModel(original, cols);
  console.log(model.lineNumbers.length);
  cols = colsFor(gutterFor(model.lineNumbers.length));
  return buildWrapModel(original, cols);
};

// Rebuild the ORIGINAL text for a wrapped-doc range [from, to): drop the line
// breaks WE inserted (the break before a continuation row, lineNumbers[i]===null)
// while keeping the document's real newlines. Used by the copy handler so a
// mouse selection across a wrap point yields the unbroken value (e.g. an account
// id split as "alice\1234.testnet" copies back as one string).
export const unwrapRange = (state, from, to, lineNumbers) => {
  if (!lineNumbers) return state.sliceDoc(from, to);

  const startLine = state.doc.lineAt(from);
  const endLine = state.doc.lineAt(to);
  let result = '';

  for (let n = startLine.number; n <= endLine.number; n++) {
    const line = state.doc.line(n);
    result += state.sliceDoc(Math.max(from, line.from), Math.min(to, line.to));
    if (n < endLine.number) {
      // line n+1 (output index n) is a continuation → the break is ours → drop it
      result += lineNumbers[n] == null ? '' : '\n';
    }
  }
  return result;
};
