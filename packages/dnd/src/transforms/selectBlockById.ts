import {
  type TEditor,
  findNode,
  getRange,
  select,
} from '@udecode/plate-common';

/** Select the block above the selection by id and focus the editor. */
export const selectBlockById = (editor: TEditor, id: string) => {
  const path = findNode(editor, { at: [], match: { id } })?.[1];

  if (!path) return;

  select(editor, getRange(editor, path));
  editor.tf.focus();
};
