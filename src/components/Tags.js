import React from 'react';
import styled from 'styled-components/macro';
import classnames from 'classnames';

const TagsContainer = styled.ul`
  display: block;
  margin; 0;
  padding: 0;
  list-style: none;
`;

const Tag = styled.li`
  display: inline-block;
  height: 26px;
  padding: 0 10px;
  margin-right: 5px;
  background-color: #666;
  line-height: 26px;
  border-radius: 3px;
  color: white;
  font-size: 13px;

  &:last-child {
    margin: 0;
  }

  &.small {
    height: 20px;
    line-height: 20px;
    font-size: 11px;
  }

  &.medium {
    height: 26px;
    line-height: 26px;
    font-size: 13px;
  }

  &.large {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
  }
`;

const Tags = ({ tags, limit, className = '', size = 'medium' }) => {
  const tagClassNames = classnames({
    [size]: true
  });
  return (
    <TagsContainer className={className}>
      {tags.map(({ name }) => (
        <Tag className={tagClassNames}>{name}</Tag>
      ))}
    </TagsContainer>
  );
};

export default Tags;