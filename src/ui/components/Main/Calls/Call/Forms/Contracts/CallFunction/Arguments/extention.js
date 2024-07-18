import { ViewPlugin } from '@uiw/react-codemirror';
import cn from './Arguments.module.css';

const createPanel = (view) => {
  const panel = document.createElement('div');
  panel.className = cn.cmPanel;

  const copyButton = document.createElement('button');
  copyButton.innerText = 'Copy';
  copyButton.onclick = () => {
    navigator.clipboard.writeText(view.state.doc.toString());
  };

  const formatButton = document.createElement('button');
  formatButton.innerText = 'Format';
  formatButton.onclick = () => {
    const formattedText = formatCode(view.state.doc.toString());
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: formattedText }
    });
  };

  panel.appendChild(copyButton);
  panel.appendChild(formatButton);

  return panel;
}

function formatCode(code) {
  return code; // For now, just returning the original code
}

export const panelPlugin = ViewPlugin.fromClass(class {
  constructor(view) {
    this.panel = createPanel(view);
    view.dom.insertBefore(this.panel, view.dom.firstChild);
    console.log(view);
    // view.dom;
  }
  destroy() {
    this.panel.remove();
  }
});
