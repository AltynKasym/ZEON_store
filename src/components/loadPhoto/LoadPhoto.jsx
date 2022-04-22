import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  list,
  listAll,
} from "firebase/storage";

// const db = getStorage(app);

function LoadPhoto() {
  const [image, setImage] = useState([]);
  const storage = getStorage();
  const about_us = ref(storage, "about_us/");

  const listImage = () => {
    listAll(about_us)
      .then((res) => {
        res.items.forEach((itemref) => {
          getDownloadURL(itemref)
            .then((url) => {
              console.log(url);
              setImage((image) => [...image, url]);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    listImage();
  }, []);

  // listAll(listRef)
  //   .then((res) => {
  //     res.items.forEach((itemRef) => {
  //       const downloadUrl = getDownloadURL(ref(storage, itemRef));
  //       downloadUrl
  //         .then((url) => {
  //           const indexOfToken = url.indexOf("&token=");
  //           const token = url.slice(indexOfToken + 7);
  //           const image = {
  //             imageUrl: url,
  //             imageToken: token,
  //           };
  //           eventImages.push(image);
  //         })
  //         .catch((error) => {});
  //       console.log(eventImages);
  //       setImageData(eventImages); // <---- Add the images to the imageData state
  //     });
  //   })
  //   .catch((error) => {});

  //   const [fileUrl, setFileUrl] = React.useState(null);
  //   const [users, setUsers] = React.useState([]);

  //   const onFileChange = async (e) => {
  //     const file = e.target.files[0];
  //     const storageRef = app.storage().ref();
  //     const fileRef = storageRef.child(file.name);
  //     await fileRef.put(file);
  //     setFileUrl(await fileRef.getDownloadURL());
  //   };

  //   const onSubmit = async (e) => {
  //     e.preventDefault();
  //     const username = e.target.username.value;
  //     if (!username || !fileUrl) {
  //       return;
  //     }
  //     await db.collection("users").doc(username).set({
  //       name: username,
  //       avatar: fileUrl,
  //     });
  //   };

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       const usersCollection = await db.collection("users").get();
  //       setUsers(
  //         usersCollection.docs.map((doc) => {
  //           return doc.data();
  //         })
  //       );
  //     };
  //     fetchUsers();
  //   }, []);

  return (
    <>
      {image.map((item) => (
        <img src={item} alt="" />
      ))}
      {/* <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <input type="text" name="username" placeholder="NAME" />
        <button>Submit</button>
      </form>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.name}>
              <img width="100" height="100" src={user.avatar} alt={user.name} />
              <p>{user.name}</p>
            </li>
          );
        })}
      </ul> */}
    </>
  );
}

export default LoadPhoto;
