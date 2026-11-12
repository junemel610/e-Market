import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { Slider } from 'react-native-elements';
import theme from '../src/theme';

const Settings = ({ navigation }) => {
  const [showPolicies, setShowPolicies] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [selectedRating, setSelectedRating] = useState(1);
  const [isFeedbackMessageModalVisible, setIsFeedbackMessageModalVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const togglePolicies = () => setShowPolicies((prev) => !prev);
  const toggleCommentBox = () => setShowCommentBox((prev) => !prev);

  const submitComment = () => {
    setFeedbackMessage('Feedback received. Thank you for helping TSe-Market improve.');
    setIsFeedbackMessageModalVisible(true);
  };

  const goToSignIn = async () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
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
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.pageHeadingBand}>
            <Text accessibilityRole="header" style={styles.title}>Settings</Text>
            <Text style={styles.appVersion}>v1.0.0</Text>
          </View>

          <Pressable style={styles.buttonRow} onPress={togglePolicies} activeOpacity={0.85}>
            <Text style={styles.buttonText}>View app policies</Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color={theme.colors.textLight} />
          </Pressable>

          {showPolicies && (
            <View style={styles.policiesCard}>
              <Text style={styles.policiesText}>
                Sellers should provide the right items to consumers. Consumers should not scam sellers.
              </Text>
              <Text style={styles.policiesFooter}>From Team Nebula</Text>
            </View>
          )}

          <Pressable style={styles.buttonRow} onPress={toggleCommentBox} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Send feedback</Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color={theme.colors.textLight} />
          </Pressable>

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
                  minimumTrackTintColor={theme.colors.primary}
                  maximumTrackTintColor='rgba(17,17,17,0.1)'
                />
                <Text style={styles.ratingValue}>{selectedRating}</Text>
              </View>
              <Pressable style={[styles.button, styles.buttonFill]} onPress={submitComment} activeOpacity={0.85}>
                <Text style={styles.buttonText}>Submit</Text>
              </Pressable>
            </View>
          )}

          <Pressable style={styles.buttonRow} onPress={goToSignIn} activeOpacity={0.85}>
            <MaterialCommunityIcons name="logout" size={20} color={theme.colors.danger} />
            <Text style={[styles.buttonText, { color: theme.colors.danger }]}>Log out</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.modalOverlay} />
      <View style={[styles.feedbackModal, isFeedbackMessageModalVisible && styles.modalVisible]}>
        <Text style={styles.feedbackModalText}>{feedbackMessage}</Text>
        <Pressable style={[styles.button, styles.buttonFill]} onPress={() => setIsFeedbackMessageModalVisible(false)} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Close</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { flexGrow: 1, alignItems: 'center', paddingBottom: theme.spacing.xl },
  content: { width: '100%', maxWidth: theme.layout.maxContentWidth, alignSelf: 'center', padding: theme.spacing.lg, gap: theme.spacing.md },
  pageHeadingBand: { marginHorizontal: -theme.spacing.lg, marginTop: -theme.spacing.lg, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.md, backgroundColor: theme.colors.primary },
  title: { color: theme.colors.onPrimary, fontSize: theme.fontSize['2xl'], fontWeight: theme.fontWeight.bold },
  appVersion: { fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold, color: theme.colors.onPrimary },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    minHeight: 52,
    marginBottom: theme.spacing.sm,
  },
  buttonText: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: BLACK },
  policiesCard: {
    backgroundColor: theme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  policiesText: { fontSize: theme.fontSize.sm, color: '#333333', lineHeight: 20, marginBottom: theme.spacing.xs },
  policiesFooter: { fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.bold, color: AMBER, textAlign: 'right' },
  commentCard: {
    backgroundColor: theme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  commentInput: {
    fontSize: theme.fontSize.base,
    color: BLACK,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    textAlignVertical: 'top',
    minHeight: 120,
    marginBottom: theme.spacing.md,
  },
  ratingCard: { marginBottom: theme.spacing.md },
  ratingLabel: { fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.bold, color: BLACK, marginBottom: theme.spacing.sm },
  sliderThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: theme.colors.surface, borderWidth: 2, borderColor: AMBER },
  sliderTrack: { height: 6, borderRadius: 3 },
  ratingValue: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: AMBER, marginTop: theme.spacing.xs, textAlign: 'center' },
  button: { borderRadius: 10, paddingVertical: theme.spacing.md, minHeight: 52, alignItems: 'center', justifyContent: 'center' },
  buttonFill: { backgroundColor: AMBER },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackModal: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: theme.spacing.xl,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
    transform: [{ scale: 0.9 }],
    opacity: 0,
  },
  modalVisible: { transform: [{ scale: 1 }], opacity: 1 },
  feedbackModalText: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: BLACK, textAlign: 'center', marginBottom: theme.spacing.md, lineHeight: 22 },
});
