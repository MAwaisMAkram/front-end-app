import {ScaledSheet} from 'react-native-size-matters';
import {COLOR} from '../../../config/color';

const styles = ScaledSheet.create({
  container: {
    // marginTop: 20,
    flex: 1,
    backgroundColor: COLOR.WHITE,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
  contentContainer: {
    marginTop: 10,
    flex: 1,
    // paddingHorizontal: 16,
  },
  list: {
    // marginTop: 10,
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  itemSeperator: {
    height: 8,
  },
  sliderContainer: {height: 200, margin: 10},
});
export default styles;
