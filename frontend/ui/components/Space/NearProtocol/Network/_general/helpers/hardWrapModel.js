/**
 * Hard-wrap `text` into rows of at most `cols` characters by inserting real '\n'.
 *
 * @param {string} text
 * @param {number} cols  max columns; falsy/<1 disables wrapping
 * @returns {{ text: string, lineNumbers: (number|null)[], breakOffsets: number[] }}
 *   lineNumbers[i] = 1-based logical line number, or null for a continuation row;
 *   breakOffsets[i] = original-text offset where a '\n' was inserted.
 * @example
 * buildWrapModel('ABCDEF', 3) // → { text: 'ABC\nDEF', lineNumbers: [1, null], breakOffsets: [3] }
 */
const buildWrapModel = (text, cols) => {
  if (typeof text !== 'string') return { text: '', lineNumbers: [], breakOffsets: [] };
  const logical = text.split('\n');

  if (!cols || cols < 1) {
    return { text, lineNumbers: logical.map((_, i) => i + 1), breakOffsets: [] };
  }

  const outLines = [];
  const lineNumbers = [];
  const breakOffsets = [];
  let origBase = 0; // original offset of the start of the current logical line

  for (let li = 0; li < logical.length; li++) {
    const line = logical[li];
    if (line.length <= cols) {
      outLines.push(line);
      lineNumbers.push(li + 1);
    } else {
      let i = 0;
      let firstLine = true;
      while (i < line.length) {
        let end = Math.min(i + cols, line.length);
        // Don't break right after '\' — it would split a JSON escape (\") and
        // corrupt the parse. Back up over trailing backslashes.
        if (end < line.length) {
          while (end > i + 1 && line[end - 1] === '\\') end--;
        }
        outLines.push(line.slice(i, end));
        lineNumbers.push(firstLine ? li + 1 : null);
        firstLine = false;
        // A break is inserted after this chunk only when more chunks follow.
        if (end < line.length) breakOffsets.push(origBase + end);
        i = end;
      }
    }
    origBase += line.length + 1; // +1 for the original '\n' between logical lines
  }
  return { text: outLines.join('\n'), lineNumbers, breakOffsets };
};

// Build the wrap model with `cols` chosen to fit the editor's content width:
// (clientWidth − line-number/fold gutters) / character width.
export const buildModel = (view, original) => {
  if (typeof original !== 'string') return { text: '', lineNumbers: [], breakOffsets: [] };
  const charW = view.defaultCharacterWidth;
  const clientWidth = view.scrollDOM.clientWidth;
  // Gutter = line-number column (min 30px, ~9px/digit + padding) + fold gutter
  // (~18px). charW is exact for monospace and floor() guarantees the fit (4px reserve).
  const gutterFor = (lines) => Math.max(30, String(Math.max(1, lines)).length * 9 + 10) + 18;
  const colsFor = (gutterW) => Math.max(20, Math.floor((clientWidth - gutterW - 4) / charW));
  const cols = colsFor(gutterFor(original.split('\n').length));
  return buildWrapModel(original, cols);
};

// Reconstruct the original text for a wrapped-doc range, dropping the '\n' we
// inserted at continuation rows. Used by the copy handler.
export const unwrapRange = (state, from, to, lineNumbers) => {
  if (!lineNumbers) return state.sliceDoc(from, to);

  const startLine = state.doc.lineAt(from);
  const endLine = state.doc.lineAt(to);
  let result = '';

  for (let n = startLine.number; n <= endLine.number; n++) {
    const line = state.doc.line(n);
    result += state.sliceDoc(Math.max(from, line.from), Math.min(to, line.to));
    if (n < endLine.number) {
      result += lineNumbers[n] == null ? '' : '\n';
    }
  }
  return result;
};
// Map a wrapped-doc position to its original-text offset:
// subtract the number of inserted '\n' (continuation rows) before `pos`.
export const wrappedPosToOriginal = (state, pos, lineNumbers) => {
  if (!lineNumbers) return pos;
  const lineNo = state.doc.lineAt(pos).number;
  let inserted = 0;
  for (let n = 2; n <= lineNo; n++) {
    if (lineNumbers[n - 1] == null) inserted++;
  }
  return pos - inserted;
};

// Map an original-text offset to its wrapped-doc position
// add the number of inserted '\n' at or before `origPos`.
// Binary search over the ascending `breakOffsets`.
export const originalPosToWrapped = (origPos, breakOffsets) => {
  if (!breakOffsets || !breakOffsets.length) return origPos;
  let lo = 0;
  let hi = breakOffsets.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (breakOffsets[mid] <= origPos) lo = mid + 1;
    else hi = mid;
  }
  return origPos + lo;
};
