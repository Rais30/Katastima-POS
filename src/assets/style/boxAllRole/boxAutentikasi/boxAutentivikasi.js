import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  utama: {
    flex: 1,
    backgroundColor: 'white',
  },
  headher: {
    backgroundColor: 'blue',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 100,
  },
  gambar: {
    width: 170,
    height: 170,
  },
  body: {
    backgroundColor: 'white',
    borderTopLeftRadius: 80,
    bottom: 70,
    // height: '100%',
    // alignItems: 'center',
  },
  boxInput: {
    backgroundColor: '#C0C0C0',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 8,
  },
  input: {
    padding: 10,
  },
  boxTeks: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  teksKlik: {
    fontSize: 16,
    color: 'blue',
  },
  tombol: {
    backgroundColor: 'blue',
    padding: 8,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
    // marginBottom: 140,
  },
  teksTombol: {
    fontSize: 19,
    color: 'white',
  },
});
