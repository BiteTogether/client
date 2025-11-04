import React, { useCallback, useRef, forwardRef } from 'react';
import debounce from 'lodash.debounce';
import { t } from 'i18next';
import { COLORS } from 'utils/constants';
import styled from 'styled-components/native';
import { searchFriend } from 'services/api/friendsApi';
import { Icon } from '@rneui/themed';
import { TouchableOpacity, TextInput } from 'react-native';

interface FriendSearchBarProps {
  value: string;
  type: 'search-friends' | 'search-requests';
  //eslint-disable-next-line no-unused-vars
  setSearch: (text: string) => void;
  //eslint-disable-next-line no-unused-vars
  setFriendSearch: (results: any) => void;
}

const FriendSearchBar: React.FC<FriendSearchBarProps> = ({ value, type, setSearch, setFriendSearch }) => {
  const searchInputRef = useRef<TextInput>(null);
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (text: string) => {
      if (type === 'search-friends' && text.trim() !== '') {
        try {
          const response = await searchFriend(text);
          if (response.data) {
            setFriendSearch(response.data);
          } else {
            setFriendSearch(null);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }, 400),
    [type, setFriendSearch]
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  const handleClearSearch = () => {
    setSearch('');
    setFriendSearch(null);
  };

  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
  };

  return (
    <SearchBarWrapper>
      <TouchableOpacity onPress={handleFocusSearch}>
        <Icon
          key="search"
          name="search"
          type="feather"
          size={20}
          color="black"
        />
      </TouchableOpacity>
      <SearchBar
        ref={searchInputRef}
        placeholder={t('search_friends')}
        value={value}
        onChangeText={handleSearch}
        placeholderTextColor="#888"
        autoCapitalize="none"
      />
      {value !== '' && (
        <TouchableOpacity onPress={handleClearSearch}>
          <Icon
            key="x"
            name="x"
            type="feather"
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      )}
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.View`
  margin-horizontal: 16px;
  margin-top: 16px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding-horizontal: 12px;
  background-color: ${COLORS.GRAY_BUTTON_BG};
`;

const StyledTextInput = styled(TextInput)`
  min-height: 36px;
  font-size: 15px;
  padding-left: 8px;
  flex: 1;
`;

const SearchBar = forwardRef<TextInput, React.ComponentProps<typeof TextInput>>((props, ref) => (
  <StyledTextInput ref={ref} {...props} />
));
SearchBar.displayName = 'SearchBar';

export default FriendSearchBar;
