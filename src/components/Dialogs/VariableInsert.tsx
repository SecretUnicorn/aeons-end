import React, { useState } from 'react';

import {
  Avatar,
  Badge,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Popover,
  TextField,
  Tooltip,
} from '@mui/material';

import { ContentState, EditorState, Modifier } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

type VariablesInsertProps = {
  data: any;
  label: string;
  type: 'insert' | 'replace' | 'html_insert';
  description: string;
  onChange?: (arg0: EditorState) => void;
  editorState?: EditorState;
};

export const VariablesInsert = (props: VariablesInsertProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'insert-popover' : undefined;
  const data = props.data;
  const buttonLabel = props.label;
  const type = props.type;
  const description = props.description;

  const addText = () => {
    if (type === 'insert') {
      const { editorState, onChange } = props;
      console.log({
        selection: editorState!.getSelection(),
        content: editorState!.getCurrentContent(),
        style: editorState!.getCurrentInlineStyle(),
      });
      const contentState = Modifier.replaceText(
        editorState!.getCurrentContent(),
        editorState!.getSelection(),
        data,
        editorState!.getCurrentInlineStyle(),
      );
      onChange!(EditorState.push(editorState!, contentState, 'insert-characters'));
      closePopover();
    } else if (type === 'replace') {
      const { editorState, onChange } = props;
      const blocksFromHtml = htmlToDraft(data);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      onChange!(EditorState.push(editorState!, contentState, 'insert-fragment'));
      closePopover();
    } else if (type === 'html_insert') {
      const { editorState, onChange } = props;
      const blocksFromHtml = htmlToDraft(data);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = Modifier.replaceWithFragment(
        editorState!.getCurrentContent(),
        editorState!.getSelection(),
        ContentState.createFromBlockArray(contentBlocks, entityMap).getBlockMap(),
      );
      onChange!(EditorState.push(editorState!, contentState, 'insert-fragment'));
      closePopover();
    }
  };

  const openPopover = (event: React.ChangeEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  return (
    <div className="rdw-inline-wrapper">
      <Tooltip title={description} arrow>
        <Chip
          avatar={<Avatar>{type === 'insert' || type === 'html_insert' ? 'V' : 'T'}</Avatar>}
          label={buttonLabel}
          color={type === 'insert' || type === 'html_insert' ? 'primary' : 'secondary'}
          clickable
          className="bordered-option-classname extra-toolbar-option"
          onClick={addText}
          style={{ alignItems: 'center' }}
        />
      </Tooltip>
    </div>
  );
};
