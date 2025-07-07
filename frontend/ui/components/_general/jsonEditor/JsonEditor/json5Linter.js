import { json5ParseCache } from 'codemirror-json5';
import JSON5 from 'json5';

/**
 * We rewrite the libs fn json5ParseLinter to avoid an error when the value is an
 * empty string
 */

const handleParseError = (doc, e) => {
  let pos = 0;
  if ('lineNumber' in e && 'columnNumber' in e) {
    pos = Math.min(doc.line(e.lineNumber).from + e.columnNumber - 1, doc.length);
  }

  return [
    {
      from: pos,
      to: pos,
      message: e.message,
      severity: 'error',
    },
  ];
};

/**
 * JSON5 linting support
 *
 * @param structureLinter Perform additional linting on the parsed object
 **/
export const json5ParseLinter = (structureLinter) => {
  return (view) => {
    let doc = view.state.doc;
    if (doc.toString() === '') return [];

    let cached = view.state.field(json5ParseCache, false);

    if (cached) {
      if (cached.err) {
        return handleParseError(doc, cached.err);
      } else if (cached.obj !== undefined) {
        return structureLinter?.(view, cached.obj) ?? [];
      }
    }

    try {
      let parsed = JSON5.parse(doc.toString());
      return structureLinter?.(view, parsed) ?? [];
    } catch (e) {
      return handleParseError(doc, e);
    }
  };
};
