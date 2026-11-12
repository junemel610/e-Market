import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      dataSource: [],
      dataBackup: [],
      isModalVisible: false,
    };
  }

  componentDidMount() {
    var data = [
      {
        name: 'T-Square',
        author: 'Nebula Admin',
        img: require('../assets/1.jpg'),
        description:
          'T-Square from TIPC 3rd Year Architecture.',
      },
    ];

    this.setState({
      dataBackup: data,
      dataSource: data,
    });
  }

  filterItem = query => {
    const normalizedQuery = query.trim().toLowerCase();
    const dataSource = normalizedQuery
      ? this.state.dataBackup.filter(item => item.name.toLowerCase().includes(normalizedQuery))
      : this.state.dataBackup;
    this.setState({ query, dataSource });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  separator = () => {
    return (
      <View style={{ height: 10, width: '100%', backgroundColor: '#e5e5e5' }} />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#ff5b77" />
        <View style={styles.header}>
          <TextInput
            placeholder="Search Items Here"
            placeholderTextColor="gray"
            value={this.state.query}
            accessibilityLabel="Search items"
            returnKeyType="search"
            onChangeText={this.filterItem}
            style={styles.input}
          />
        </View>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={() => this.separator()}
          ListEmptyComponent={(
            <Text style={styles.emptyState}>
              {this.state.query ? 'No items match your search.' : 'No items are available yet.'}
            </Text>
          )}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.bookContainer}>
                <Image style={styles.image} source={item.img} />
                <View style={styles.dataContainer}>
                  <Text numberOfLines={1} style={styles.title}>
                    {item.name}
                  </Text>
                  <Text numberOfLines={4} style={styles.description}>
                    {item.description}
                  </Text>
                  <Text style={styles.author}>{item.author}</Text>
                  <TouchableOpacity
                    style={styles.iconNav}
                    onPress={this.toggleModal}
                    accessibilityRole="button"
                    accessibilityLabel={`Check if ${item.name} can be added to My Bag`}
                  >
                    <Icon name="plus" style={{ fontSize: 15, color: 'black' }} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalContent}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Adding items to My Bag is not connected yet.</Text>
              <TouchableOpacity onPress={this.toggleModal}>
                <Text style={styles.modalText2}>Great!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    width: '100%',
    backgroundColor: '#545F71',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 45,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 10,
  },
  emptyState: {
    padding: 24,
    textAlign: 'center',
    color: '#545F71',
    fontSize: 16,
  },
  bookContainer: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 10,
  },
  image: {
    height: 130,
    width: 150, 
  },
  dataContainer: {
    flex: 1,
    padding: 10,
    maxWidth: width - 100,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  author: {
    fontSize: 14,
  },
  iconNav: {
    backgroundColor: '#EFD02C',
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#545F71',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 18,
    color: 'white'
  },
  modalText2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 18,
    color: 'black',
    backgroundColor: '#EFD02C',
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
  },
});
