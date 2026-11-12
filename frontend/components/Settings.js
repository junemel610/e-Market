import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

const WHITE = '#FFFFFF';
const AMBER = '#F59E0B';
const GRAY = '#BEBEBE';
const BLACK = '#111111';
const CARD = '#F3F4F6';

const Settings = ({ navigation }) => {
  const [showPolicies, setShowPolicies] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [selectedRating, setSelectedRating] = useState(1);
  const [isFeedbackMessageModalVisible, setIsFeedbackMessageModalVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const togglePolicies = () => {
    setShowPolicies((prev) => !prev);
  };

  const toggleCommentBox = () => {
    setShowCommentBox((prev) => !prev);
  };

  const submitComment = () => {
    setFeedbackMessage('Feedback is not sent because this demo has no feedback service. Your draft is still here.');
    setIsFeedbackMessageModalVisible(true);
  };

  const goToSignIn = async () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            Alert.alert('Logged out', 'See you next time.');
            navigation.navigate('Account Sign-In');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.heading}>Settings</Text>
            <Text style={styles.appVersion}>v1.0.0</Text>
          </View>

          <TouchableOpacity style={styles.buttonRow} onPress={togglePolicies} activeOpacity={0.85}>
            <Text style={styles.buttonText}>View app policies</Text>
            <Icon name="chevron-right" size={18} color={GRAY} />
          </TouchableOpacity>

          {showPolicies && (
            <View style={styles.policiesCard}>
              <Text style={styles.policiesText}>
                Sellers should provide the right items to consumers. Consumers should not scam sellers.
              </Text>
              <Text style={styles.policiesFooter}>
                From Team Nebula
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.buttonRow} onPress={toggleCommentBox} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Send feedback</Text>
            <Icon name="chevron-right" size={18} color={GRAY} />
          </TouchableOpacity>

          {showCommentBox && (
            <View style={styles.commentCard}>
              <TextInput
                placeholder="Write what you think…"
                value={userComment}
                onChangeText={(text) => setUserComment(text)}
                style={styles.commentInput}
                multiline
                numberOfLines={4}
              />
              <View style={styles.ratingCard}>
                <Text style={styles.ratingLabel}>Rate TSe-Market (1-5)</Text>
                <Slider
                  minimumValue={1}
                  maximumValue={5}
                  step={1}
                  value={selectedRating}
                  onValueChange={(value) => setSelectedRating(value)}
                  thumbStyle={styles.sliderThumb}
                  trackStyle={styles.sliderTrack}
                  minimumTrackTintColor={AMBER}
                  maximumTrackTintColor='rgba(0,0,0,0.1)'
                />
                <Text style={styles.ratingValue}>
                  {selectedRating}
                </Text>
              </View>
              <TouchableOpacity style={[styles.button, styles.buttonFill]} onPress={submitComment} activeOpacity={0.85}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.buttonRow} onPress={goToSignIn} activeOpacity={0.85}>
            <Icon name="logout" size={20} color="#DC2626" />
            <Text style={[styles.buttonText, { color: '#DC2626' }]}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        isVisible={isFeedbackMessageModalVisible}
        onBackdropPress={() => setIsFeedbackMessageModalVisible(false)}
        style={styles.modalOverlay}
      >
        <View style={styles.feedbackModal}>
          <Text style={styles.feedbackModalText}>
            {feedbackMessage}
          </Text>
          <TouchableOpacity style={[styles.button, styles.buttonFill]} onPress={() => setIsFeedbackMessageModalVisible(false)} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: WHITE,
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: GRAY,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: BLACK,
  },
  appVersion: {
    fontSize: 14,
    fontWeight: '600',
    color: AMBER,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: BLACK,
  },
  policiesCard: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  policiesText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginBottom: 8,
  },
  policiesFooter: {
    fontSize: 13,
    fontWeight: '600',
    color: AMBER,
    textAlign: 'right',
  },
  commentCard: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  commentInput: {
    fontSize: 15,
    color: BLACK,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    textAlignVertical: 'top',
    minHeight: 120,
    marginBottom: 16,
  },
  ratingCard: {
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: BLACK,
    marginBottom: 12,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: WHITE,
    borderWidth: 2,
    borderColor: AMBER,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '800',
    color: AMBER,
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFill: {
    backgroundColor: AMBER,
  },
  feedbackModal: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 32,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
  },
  feedbackModalText: {
    fontSize: 15,
    fontWeight: '600',
    color: BLACK,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
