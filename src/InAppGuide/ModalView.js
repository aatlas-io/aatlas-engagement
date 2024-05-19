/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Image,
  StyleSheet,
  Modal,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import { normalizeFont } from '../fontsHelper';
import Carousel from 'react-native-reanimated-carousel';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import Button from '../components/Button';

const ModalView = ({ appConfig, visible, setVisible }) => {
  const insets = useSafeAreaInsets();
  const carouselRef = useRef();
  const width = Dimensions.get('window').width;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    inAppGuide: {
      in_app_guides,
      background_color,
      title_color,
      description_color,
      button_background_color,
      button_text_color,
      pagination_active_color,
      pagination_inactive_color,
    },
  } = appConfig;

  const renderItem = ({ item: { title, image, description } }) => (
    <View
      style={[
        styles.centeredView,
        {
          paddingTop: insets.top + 20,
          ...(background_color
            ? { backgroundColor: background_color }
            : undefined),
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: title_color }]}>{title}</Text>
      </View>
      <View style={{ height: 12 }} />
      <Image
        style={{ width: width - 60, height: width - 60, borderRadius: 10 }}
        source={{ uri: image }}
        resizeMode="cover"
      />
      <View style={{ height: 12 }} />
      <ScrollView>
        <Text style={[styles.description, { color: description_color }]}>
          {description}
        </Text>
      </ScrollView>
      <View style={{ height: 12 }} />
    </View>
  );

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View
        style={[
          styles.centeredView,
          {
            paddingBottom: insets.bottom || 12,
            ...(background_color
              ? { backgroundColor: background_color }
              : 'undefined'),
          },
        ]}
      >
        <Carousel
          ref={carouselRef}
          loop={false}
          width={width}
          data={in_app_guides}
          onSnapToItem={setSelectedIndex}
          renderItem={renderItem}
        />
        <View
          style={[
            styles.paginationContainer,
            background_color
              ? { backgroundColor: background_color }
              : undefined,
          ]}
        >
          <AnimatedDotsCarousel
            length={in_app_guides.length}
            currentIndex={selectedIndex}
            maxIndicators={6}
            interpolateOpacityAndColor={true}
            activeIndicatorConfig={{
              color: pagination_active_color,
              margin: 3,
              opacity: 1,
              size: 8,
            }}
            inactiveIndicatorConfig={{
              color: pagination_inactive_color,
              margin: 3,
              opacity: 0.5,
              size: 8,
            }}
            decreasingDots={[
              {
                config: { color: 'grey', margin: 3, opacity: 0.5, size: 6 },
                quantity: 1,
              },
              {
                config: { color: 'grey', margin: 3, opacity: 0.5, size: 4 },
                quantity: 1,
              },
            ]}
          />
        </View>
        <View style={{ height: 8 }} />
        <View style={styles.buttonsContainer}>
          <Button
            containerStyle={[
              styles.button,
              button_background_color
                ? { backgroundColor: button_background_color }
                : undefined,
            ]}
            onPress={() => {
              if (selectedIndex === in_app_guides.length - 1) {
                setSelectedIndex(0);
                setVisible(!visible);
              } else {
                carouselRef?.current?.next?.();
              }
            }}
          >
            <Text
              style={[
                styles.buttonText,
                button_text_color ? { color: button_text_color } : undefined,
              ]}
            >
              {selectedIndex === in_app_guides.length - 1 ? 'Done' : 'Continue'}
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  headerText: {
    fontSize: normalizeFont(24),
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  description: {
    fontSize: normalizeFont(16),
    fontFamily: 'Avenir',
    flexWrap: 'wrap',
  },
  buttonsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Avenir',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  paginationContainer: {
    height: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalView;
