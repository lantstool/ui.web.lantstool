/**
 * Hard-wrap `text` into rows of at most `cols` characters by inserting real '\n'.
 * Returns { text, lineNumbers, breakOffsets }:
 *  lineNumbers  — original line number per row, or null on continuation rows;
 *  breakOffsets — original offsets where we inserted a break.
 * EXAMPLE: buildWrapModel('ABCDEF', 3) → { text: 'ABC\nDEF', lineNumbers: [1, null], breakOffsets: [3] }
 */
const buildWrapModel = (text, cols) => {
  const logicalLines = text.split('\n');
  // Return unwrapped, one number per line
  if (!cols || cols < 1) {
    return { text, lineNumbers: logicalLines.map((_, i) => i + 1), breakOffsets: [] };
  }

  const rows = [];
  const lineNumbers = [];
  const breakOffsets = [];
  let originalLineStart = 0; // original offset where the current logical line starts

  for (let lineIndex = 0; lineIndex < logicalLines.length; lineIndex++) {
    const line = logicalLines[lineIndex];
    if (line.length <= cols) {
      rows.push(line);
      lineNumbers.push(lineIndex + 1);
    } else {
      let chunkStart = 0;
      let isFirstRow = true;
      while (chunkStart < line.length) {
        let chunkEnd = Math.min(chunkStart + cols, line.length);
        // Don't break right after '\' — it would split a JSON escape (\") and corrupt
        // the parse. Back up over trailing backslashes.
        if (chunkEnd < line.length) {
          while (chunkEnd > chunkStart + 1 && line[chunkEnd - 1] === '\\') chunkEnd--;
        }
        rows.push(line.slice(chunkStart, chunkEnd));
        lineNumbers.push(isFirstRow ? lineIndex + 1 : null);
        isFirstRow = false;
        // Record the break only when more chunks follow.
        if (chunkEnd < line.length) breakOffsets.push(originalLineStart + chunkEnd);
        chunkStart = chunkEnd;
      }
    }
    originalLineStart += line.length + 1; // +1 for the original '\n' between lines
  }
  return { text: rows.join('\n'), lineNumbers, breakOffsets };
};

// Build the wrap model with `cols` chosen to fit the editor's content width:
// (clientWidth − line-number/fold gutters) / character width.
export const buildModel = (view, original) => {
  const charWidth = view.defaultCharacterWidth;
  const clientWidth = view.scrollDOM.clientWidth;
  // Gutter = line-number column (min 30px, ~9px/digit + padding) + fold gutter (~18px).
  // charWidth is exact for monospace; floor() with a 4px reserve guarantees the fit.
  const gutterFor = (lineCount) =>
    Math.max(30, String(Math.max(1, lineCount)).length * 9 + 10) + 18;
  const colsFor = (gutterWidth) =>
    Math.max(20, Math.floor((clientWidth - gutterWidth - 4) / charWidth));
  const cols = colsFor(gutterFor(original.split('\n').length));
  return buildWrapModel(original, cols);
};

// Reconstruct the original text for a wrapped-doc range, dropping the '\n' we inserted
// at continuation rows. Used by the copy handler.
export const unwrapRange = (state, from, to, lineNumbers) => {
  if (!lineNumbers) return state.sliceDoc(from, to);

  const startLine = state.doc.lineAt(from);
  const endLine = state.doc.lineAt(to);
  let result = '';

  for (let lineNumber = startLine.number; lineNumber <= endLine.number; lineNumber++) {
    const line = state.doc.line(lineNumber);
    result += state.sliceDoc(Math.max(from, line.from), Math.min(to, line.to));
    if (lineNumber < endLine.number) {
      // add '\n' only if the next row starts a real logical line, not our inserted break
      result += lineNumbers[lineNumber] == null ? '' : '\n';
    }
  }
  return result;
};
// Map a wrapped-doc position to its original-text offset:
// subtract the inserted '\n' (continuation rows) before `pos`.
export const wrappedPosToOriginal = (state, pos, lineNumbers) => {
  if (!lineNumbers) return pos;
  const lineNumber = state.doc.lineAt(pos).number;
  let insertedBreaks = 0;
  for (let row = 2; row <= lineNumber; row++) {
    if (lineNumbers[row - 1] == null) insertedBreaks++;
  }
  return pos - insertedBreaks;
};

// Map an original-text offset to its wrapped-doc position:
// add the inserted '\n' at or before `origPos`. Binary search over ascending `breakOffsets`.
export const originalPosToWrapped = (origPos, breakOffsets) => {
  if (!breakOffsets || !breakOffsets.length) return origPos;
  let low = 0;
  let high = breakOffsets.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (breakOffsets[mid] <= origPos) low = mid + 1;
    else high = mid;
  }
  return origPos + low;
};
