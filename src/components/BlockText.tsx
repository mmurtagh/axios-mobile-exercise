import React from 'react';
import styled from 'styled-components/native';
import { observer } from 'mobx-react-lite';

import { Paragraph } from './components';
import { spacing } from '../utils/styling';
import { SupportedBlockType } from '../stores/Story';

const BlockParagraph = styled(Paragraph)`
  margin-bottom: ${spacing()};
  flex: 1;
`;

const Container = styled.View`
  flexDirection: row;
`;

const Bullet = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #444;
  margin-top: ${spacing('sm')};
  margin-right: ${spacing()};
`;

/**
 * @name: BlockText
 * @description: Renders a block of text either unstyled or as an unordered list item
 * @param block: The Block object representing the block of text
 */
export const BlockText = observer(({ block }: { block: Block }) => {
  return (
    <Container>
      {block.type === SupportedBlockType.UNORDERED_LIST_ITEM && (
        <Bullet testID="bullet" />
      )}
      <BlockParagraph testID="block-paragraph">{block.text}</BlockParagraph>
    </Container>
  );
});
