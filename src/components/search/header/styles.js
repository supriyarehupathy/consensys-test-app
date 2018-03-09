import { StyleSheet } from 'aphrodite/no-important';
import { SEARCH_IMAGE } from '../../../common/constants';
import { getImageUrl } from '../../../common/utils';

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0',
    border: `solid 1px #ccc`,
    width: '100%',
    top: '0',
    zIndex: '999',
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  iconsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: '12%',
  },
  searchField: {
    backgroundColor: '#fff',
    border: `solid 1px #ccc`,
    width: '97%',
    height: '30px',
    padding: '5px 15px',
    backgroundImage: `url(${getImageUrl(SEARCH_IMAGE)})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '98%',
    backgroundSize: '2%',
  },
  headerWrapper: {
    width: '100%',
    margin: '0 auto',
    display: 'flex',
  },
  clearFilter: {
    position: 'absolute',
    left: '89%',
    top: '13.5%',
    width: '10px',
    cursor: 'pointer',
  },
});

export default styles;
