import { foldService } from '@codemirror/language';

export const commentFolderExtension = foldService.of((state, start) => {
  const line = state.doc.lineAt(start);
  const startText = line.text.trim();

  if (!startText.startsWith("/*")) return null;

  let end = null;
  for (let pos = line.to + 1; pos < state.doc.length; ) {
    const l = state.doc.lineAt(pos);
    if (l.text.includes("*/")) {
      end = l.to;
      break;
    }
    pos = l.to + 1;
  }

  if (end && end > line.from) {
    return { from: line.from, to: end };
  }

  return null;
});

export const singleLineCommentFolder = foldService.of((state, start) => {
  const doc = state.doc;
  const firstLine = doc.lineAt(start);

  if (!firstLine.text.trim().startsWith("//")) return null;

  let from = firstLine.from;
  let to = firstLine.to;

  for (let pos = firstLine.to + 1; pos < doc.length; ) {
    const line = doc.lineAt(pos);
    const text = line.text.trim();

    if (!text.startsWith("//")) break;

    to = line.to;
    pos = to + 1;
  }

  if (to > from) {
    return { from, to };
  }

  return null;
});
