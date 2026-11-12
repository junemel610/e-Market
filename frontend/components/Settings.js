import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

const AMBER = '#F59E0B';
const CREAM = '#F8FAFC';
const MUTED = '#94A3B8';

const Settings = ({ navigation }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [selectedRating, setSelectedRating] = useState(1);
  const [isFeedbackMessageModalVisible, setIsFeedbackMessageModalVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const toggleDarkMode = () => {
    setDarkModeEnabled((prevDarkMode) => !prevDarkMode);
  };

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
    <View style={[styles.page, darkModeEnabled && styles.darkModePage]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, darkModeEnabled && styles.darkModeCard]}>
          <View style={styles.headerRow}>
            <Text style={styles.heading}>Settings</Text>
            <Text style={styles.appVersion}>v1.0.0</Text>
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingText, darkModeEnabled && styles.darkModeText]}>
              Dark mode (this screen only)
            </Text>
            <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
          </View>

          <TouchableOpacity style={styles.buttonRow} onPress={togglePolicies} activeOpacity={0.85}>
            <Text style={[styles.buttonText, darkModeEnabled && styles.darkModeText]}>
              View app policies
            </Text>
            <Icon name="chevron-right" size={18} color={MUTED} />
          </TouchableOpacity>

          {showPolicies && (
            <View style={[styles.policiesCard, darkModeEnabled && styles.darkModeCard]}>
              <Text style={[styles.policiesText, darkModeEnabled && styles.darkModeText]}>
                Sellers should provide the right items to consumers. Consumers should not scam sellers.
              </Text>
              <Text style={[styles.policiesFooter, darkModeEnabled && styles.darkModeMuted]}>
                From Team Nebula
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.buttonRow} onPress={toggleCommentBox} activeOpacity={0.85}>
            <Text style={[styles.buttonText, darkModeEnabled && styles.darkModeText]}>
              Send feedback
            </Text>
            <Icon name="chevron-right" size={18} color={MUTED} />
          </TouchableOpacity>

          {showCommentBox && (
            <View style={[styles.commentCard, darkModeEnabled && styles.darkModeCard]}>
              <TextInput
                placeholder="Write what you think…"
                value={userComment}
                onChangeText={(text) => setUserComment(text)}
                style={[styles.commentInput, darkModeEnabled && styles.darkModeInput]}
                multiline
                numberOfLines={4}
              />
              <View style={styles.ratingCard}>
                <Text style={[styles.ratingLabel, darkModeEnabled && styles.darkModeText]}>
                  Rate TSe-Market (1-5)
                </Text>
                <Slider
                  minimumValue={1}
                  maximumValue={5}
                  step={1}
                  value={selectedRating}
                  onValueChange={(value) => setSelectedRating(value)}
                  thumbStyle={styles.sliderThumb}
                  trackStyle={styles.sliderTrack}
                  minimumTrackTintColor={AMBER}
                  maximumTrackTintColor='rgba(255,255,255,0.2)'
                />
                <Text style={[styles.ratingValue, darkModeEnabled && styles.darkModeText]}>
                  {selectedRating}
                </Text>
              </View>
              <TouchableOpacity style={[styles.button, styles.buttonFill]} onPress={submitComment} activeOpacity={0.85}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.buttonRow} onPress={goToSignIn} activeOpacity={0.85}>
            <Icon name="logout" size={20} color="#FCA5A5" />
            <Text style={[styles.buttonText, { color: '#FCA5A5' }]}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        isVisible={isFeedbackMessageModalVisible}
        onBackdropPress={() => setIsFeedbackMessageModalVisible(false)}
        style={styles.modalOverlay}
      >
        <View style={[styles.feedbackModal, darkModeEnabled && styles.darkModeModal]}>
          <Text style={[styles.feedbackModalText, darkModeEnabled && styles.darkModeText]}>
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
    backgroundColor: '#1E1B4B',
    padding: 20,
  },
  darkModePage: {
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#4338CA',
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  darkModeCard: {
    backgroundColor: '#1E293B',
    borderColor: 'rgba(255,255,255,0.08)',
  },
  darkModePage: {
    backgroundColor: '#0F172A',
  },
  darkModeText: {
    color: CREAM,
  },
  darkModeMuted: {
    color: MUTED,
  },
  darkModeInput: {
    color: CREAM,
  },
  darkModeModal: {
    backgroundColor: '#1E293B',
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
    color: CREAM,
  },
  appVersion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FBBF24',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 15,
    fontWeight: '600',
    color: CREAM,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: CREAM,
  },
  policiesCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  policiesText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
    marginBottom: 8,
  },
  policiesFooter: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FBBF24',
    textAlign: 'right',
  },
  commentCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  commentInput: {
    fontSize: 15,
    color: CREAM,
    backgroundColor: '#3730A3',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
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
    color: CREAM,
    marginBottom: 12,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: CREAM,
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
    color: '#FBBF24',
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
    shadowColor: '#B45309',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  feedbackModal: {
    backgroundColor: '#4338CA',
    borderRadius: 20,
    padding: 32,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 10,
  },
  feedbackModalText: {
    fontSize: 15,
    fontWeight: '600',
    color: CREAM,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
