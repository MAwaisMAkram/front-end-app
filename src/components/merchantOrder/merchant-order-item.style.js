import {StyleSheet} from 'react-native';
import {COLOR} from '../../config/color';
import {FONT_SIZE} from '../../constants/ui';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLOR.GREY[150],
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    offset: {
      width: 0,
      height: 3,
    },
    shadowCshadowolor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 8,
  },
  iconPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLOR.GREY[700],
    backgroundColor: COLOR.GREY[100],
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
    paddingTop: 30,
  },
  textPrimary: {
    fontSize: FONT_SIZE.LG,
    fontWeight: '400',
    color: COLOR.GREY.DARK,
  },
  textSecondary: {
    fontSize: 8,
    fontWeight: '400',
    color: COLOR.GREY.DARK,
    marginTop: 4,
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: COLOR.WHITE,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 3,
    marginBottom: 3,
    shadowOpacity: 0.3,
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    borderColor: COLOR.GREY.MUTED,
  },
  btnContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
    paddingTop: 15,
  },
  textDev: {
    color: COLOR.WARNING,
    fontWeight: 'bold',
  },
});

export default styles;
