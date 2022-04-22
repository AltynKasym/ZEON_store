// import React, { Component } from "react";
// import { StyleSheet, SafeAreaView } from "react-native";
// import { Image, FlatList } from "native-base";
// import EventGalleryHeader from "../components/EventGalleryHeader.js";
// import {
//   getStorage,
//   ref,
//   getDownloadURL,
//   list,
//   listAll,
// } from "firebase/storage";
// import { LongPressGestureHandler, State } from "react-native-gesture-handler";

// export default class GetPhoto extends Component {
//   constructor(props) {
//     super(props);
//     this.storage = getStorage();
//     this.pathToImages = "/eventimages/";
//     this.eventImageSource = this.props.route.params.eventData.key;
//     this.imagesRef = this.pathToImages + this.eventImageSource;
//     this.state = {
//       isLoading: true,
//       images: [],
//       event: {
//         adress: this.props.route.params.eventData.adress,
//         hosts: this.props.route.params.eventData.hosts,
//         description: this.props.route.params.eventData.description,
//         eventtitle: this.props.route.params.eventData.eventtitle,
//         invitecode: this.props.route.params.eventData.invitecode,
//         key: this.props.route.params.eventData.key,
//         timestamp: this.props.route.params.eventData.timestamp,
//       },
//     };
//   }

//   componentDidMount() {
//     this.getEventImageData();
//   }

//   componentWillUnmount() {}

//   getEventImageData() {
//     const images = [];
//     const event = {
//       adress: this.props.route.params.eventData.adress,
//       description: this.props.route.params.eventData.description,
//       eventtitle: this.props.route.params.eventData.eventtitle,
//       key: this.props.route.params.eventData.key,
//       timestamp: this.props.route.params.eventData.timestamp,
//     };

//     listAll(ref(this.storage, this.imagesRef))
//       .then((res) => {
//         res.items.forEach((itemRef) => {
//           // console.log(itemRef._location.path_)

//           getDownloadURL(itemRef)
//             .then((url) => {
//               const indexOfToken = url.indexOf("&token=");
//               const token = url.slice(indexOfToken + 7);
//               images.push({
//                 imageUrl: url,
//                 imageToken: token,
//               });
//               this.setState({
//                 images,
//                 isLoading: false,
//                 event,
//               });
//               // console.log(this.state.images)
//             })
//             .catch((error) => {
//               switch (error.code) {
//                 case "storage/object-not-found":
//                   break;
//                 case "storage/unauthorized":
//                   break;
//                 case "storage/canceled":
//                   break;
//                 case "storage/unknown":
//                   break;
//               }
//             });
//         });
//       })
//       .catch((error) => {});
//   }

//   onLongPress = (event) => {
//     if (event.nativeEvent.state === State.ACTIVE) {
//       alert("I've been pressed for 800 milliseconds");
//     }
//   };

//   render() {
//     return (
//       <SafeAreaView style={styles.container}>
//         <FlatList
//           _dark={{ bg: "blueGray.900" }}
//           _light={{ bg: "blueGray.50" }}
//           style={styles.list}
//           numColumns={2}
//           ListHeaderComponent={<EventGalleryHeader data={this.state.event} />}
//           data={this.state.images}
//           keyExtractor={(item) => item.imageToken}
//           renderItem={({ item }) => (
//             <LongPressGestureHandler
//               onHandlerStateChange={this.onLongPress}
//               minDurationMs={800}
//             >
//               <Image
//                 style={{
//                   marginRight: 2,
//                   marginTop: 2,
//                   width: "50%",
//                   opacity: 1,
//                 }}
//                 source={{ uri: item.imageUrl }}
//                 alt="Alternate Text"
//                 size="xl"
//               />
//             </LongPressGestureHandler>
//           )}
//         />
//       </SafeAreaView>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 25,
//   },
//   image: {
//     maxHeight: 450,
//     width: "100%",
//     height: 200,
//     overflow: "hidden",
//   },
//   list: {
//     alignSelf: "center",
//   },
//   gallery: {
//     flex: 1,
//     width: "100%",
//     flexDirection: "row",
//   },
// });
