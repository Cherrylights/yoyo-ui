import React from 'react';
import AutoComplete, { DataSourceType } from './AutoComplete';
import { action } from '@storybook/addon-actions';

export default {
  title: 'AutoComplete',
  component: AutoComplete,
  parameters: {
    info: { inline: true },
  },
};

const style: React.CSSProperties = { padding: '20px 40px' };

interface LakerPlayerProps {
  value: string;
  number: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

export const SimpleAutoComplete = () => {
  const lakersWithNumber = [
    { value: 'bradley', number: 12 },
    { value: 'pope', number: 7 },
    { value: 'caruso', number: 5 },
    { value: 'cook', number: 26 },
    { value: 'cousins', number: 55 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 1 },
    { value: 'howard', number: 43 },
    { value: 'kuzma', number: 21 },
    { value: 'McGee', number: 4 },
    { value: 'rando', number: 0 },
  ];
  const fetchResults = (query: string) => {
    return lakersWithNumber.filter((player) => player.value.includes(query));
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>;
    return (
      <>
        <p>Name: {itemWithNumber.value}</p>
        <p>Number: {itemWithNumber.number}</p>
      </>
    );
  };
  return (
    <div style={style}>
      <AutoComplete
        fetchSuggestions={fetchResults}
        onSelect={action('selected')}
        renderOption={renderOption}
      />
    </div>
  );
};

export const AsyncAutoComplete = () => {
  const fetchResults = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        const formatItems = items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
        return formatItems;
      });
  };

  const renderOption = (item: DataSourceType) => {
    const githubItem = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <p>Login: {githubItem.login}</p>
        <p>URL: {githubItem.url}</p>
      </>
    );
  };

  return (
    <div style={style}>
      <AutoComplete
        fetchSuggestions={fetchResults}
        onSelect={action('selected')}
        renderOption={renderOption}
      />
    </div>
  );
};
