import React from 'react';
import styled from 'styled-components/native';
import { observer } from 'mobx-react-lite';

import { Story } from '../stores/Story';
import { Caption } from './components';
import { spacing } from '../utils/styling';

const StyledCaption = styled(Caption)`
  padding-top: ${spacing()};
`;

/** 
 * @name: DetailCaption
 * @description: Text displaying a stores topic and published date in relation
 * to the current time
 * @example: Science - 4 hours ago
 * @param story: The story the caption refers to
*/
export const DetailCaption = observer(({ story }: { story: Story }) => {
  const topic = story.primaryTopicName;
  const time = story.publishedDate.fromNow();
  const captionText = topic ? `${time} - ${topic}` : time;

  return (
    <StyledCaption testID="styled-caption">{captionText}</StyledCaption>
  );
});
