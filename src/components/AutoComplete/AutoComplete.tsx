import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import Input, { InputProps } from '../Input/Input';
import Icon from '../Icon/Icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import classnames from 'classnames';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => React.ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 500);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setSuggestions(data);
          setLoading(false);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debouncedValue, fetchSuggestions]);

  const highlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }

    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // Enter
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      // Up arrow
      case 38:
        highlight(highlightIndex - 1);
        break;
      // Down arrow
      case 40:
        highlight(highlightIndex + 1);
        break;
      // Esc
      case 27:
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };

  const renderTemplate = (item: DataSourceType) => {
    if (renderOption) {
      return renderOption(item);
    } else {
      return item.value;
    }
  };

  const generateDropdown = () => {
    return (
      <ul className="suggestion-list">
        {suggestions.map((item, index) => (
          <li
            className={classnames('suggestion-item', {
              'is-active': highlightIndex === index,
            })}
            key={index}
            onClick={() => {
              handleSelect(item);
            }}
          >
            {renderTemplate(item)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        {...restProps}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {loading && (
        <ul>
          <Icon icon="spinner" spin />
        </ul>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
