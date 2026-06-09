// Back a tentative break up over trailing backslashes so it can't split a JSON
// escape (\"). Only matters mid-line — the last chunk has no following break.
const safeBreakEnd = (line, start, end) => {
  if (end >= line.length) return end;
  let safeEnd = end;

  while (safeEnd > start + 1 && line[safeEnd - 1] === '\\') safeEnd--;
  return safeEnd;
};

// Append one logical line's rows/numbers/breaks.
// LineNumber on the first row, null on continuation rows.
const appendWrappedLine = (
  line,
  lineNumber,
  columns,
  lineStart,
  rows,
  lineNumbers,
  breakOffsets,
) => {
  if (line.length <= columns) {
    rows.push(line);
    lineNumbers.push(lineNumber);
    return;
  }
  let chunkStart = 0;

  while (chunkStart < line.length) {
    const chunkEnd = safeBreakEnd(line, chunkStart, Math.min(chunkStart + columns, line.length));

    rows.push(line.slice(chunkStart, chunkEnd));
    lineNumbers.push(chunkStart === 0 ? lineNumber : null);

    if (chunkEnd < line.length) breakOffsets.push(lineStart + chunkEnd);
    chunkStart = chunkEnd;
  }
};

/**
 * Hard-wrap `text` into rows of at most `columns` characters by inserting real '\n'.
 * Returns { text, lineNumbers, breakOffsets }:
 *  text - hard-wrapped text;
 *  lineNumbers  - original line number per row, or null on continuation rows;
 *  breakOffsets - original offsets where we inserted a break.
 * EXAMPLE: buildWrapModel('ABCDEF', 3) → { text: 'ABC\nDEF', lineNumbers: [1, null], breakOffsets: [3] }
 */
const buildWrapModel = (text, columns) => {
  const logicalLines = text.split('\n');
  // Return unwrapped, one number per line
  if (!columns || columns < 1) {
    return { text, lineNumbers: logicalLines.map((_, index) => index + 1), breakOffsets: [] };
  }

  const rows = [];
  const lineNumbers = [];
  const breakOffsets = [];

  let lineNumber = 1; // 1-based number of the current logical line
  let originalLineStart = 0; // original offset where the current logical line starts

  for (const line of logicalLines) {
    appendWrappedLine(
      line,
      lineNumber,
      columns,
      originalLineStart,
      rows,
      lineNumbers,
      breakOffsets,
    );
    originalLineStart += line.length + 1; // +1 for the original '\n' between lines
    lineNumber++;
  }
  return { text: rows.join('\n'), lineNumbers, breakOffsets };
};

// Build the wrap model with `columns` chosen to fit the editor's content width.
export const buildModel = (view, original) => {
  const charWidth = view.defaultCharacterWidth;
  const clientWidth = view.scrollDOM.clientWidth;

  // Gutter = line-number column (min 30px, ~9px/digit + padding) + fold gutter (~18px).
  const gutterFor = (lineCount) =>
    Math.max(30, String(Math.max(1, lineCount)).length * 9 + 10) + 18;

  // Columns that fit: (content width − gutter) / monospace char width.
  const columnsFor = (gutterWidth) => Math.floor((clientWidth - gutterWidth) / charWidth);

  const columns = columnsFor(gutterFor(original.split('\n').length));
  return buildWrapModel(original, columns);
};

// Reconstruct the original text for a wrapped doc range, dropping the '\n' we inserted
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
// Map a wrapped-doc position to its original text offset:
// subtract the inserted '\n' (continuation rows) before `wrappedPosition`.
export const wrappedPosToOriginal = (state, wrappedPosition, lineNumbers) => {
  if (!lineNumbers) return wrappedPosition;
  const lineNumber = state.doc.lineAt(wrappedPosition).number;
  let insertedBreaks = 0;

  for (let row = 2; row <= lineNumber; row++) {
    if (lineNumbers[row - 1] == null) insertedBreaks++;
  }
  return wrappedPosition - insertedBreaks;
};

// Map an original text offset to its wrapped doc position:
// add the inserted '\n' at or before `originalPosition`. Binary search over ascending `breakOffsets`.
export const originalPosToWrapped = (originalPosition, breakOffsets) => {
  if (!breakOffsets || !breakOffsets.length) return originalPosition;
  let low = 0;
  let high = breakOffsets.length;

  while (low < high) {
    const mid = (low + high) >> 1;
    if (breakOffsets[mid] <= originalPosition) low = mid + 1;
    else high = mid;
  }
  return originalPosition + low;
};
