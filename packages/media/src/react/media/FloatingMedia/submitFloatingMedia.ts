import {
  type PluginConfig,
  type SlateEditor,
  type WithRequiredKey,
  isUrl,
  setNodes,
} from '@udecode/plate-common';

import type {
  MediaPluginOptions,
  TMediaElement,
} from '../../../lib/media/types';

import {
  floatingMediaActions,
  floatingMediaSelectors,
} from './FloatingMediaStore';

export const submitFloatingMedia = (
  editor: SlateEditor,
  {
    element,
    plugin,
  }: {
    element: TMediaElement;
    plugin: WithRequiredKey;
  }
) => {
  let url = floatingMediaSelectors.url();

  if (url === element.url) {
    floatingMediaActions.reset();

    return true;
  }

  const { isUrl: _isUrl = isUrl, transformUrl } =
    editor.getOptions<PluginConfig<any, MediaPluginOptions>>(plugin);
  const isValid = _isUrl(url);

  if (!isValid) return;
  if (transformUrl) {
    url = transformUrl(url);
  }

  setNodes<TMediaElement>(editor, {
    url,
  });

  floatingMediaActions.reset();

  editor.tf.focus(editor.selection!);

  return true;
};
