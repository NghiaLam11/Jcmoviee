import { auth, db, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  updatePassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  useLoaderStore,
  useMoviesDetailStore,
  useMoviesStore,
  useUserStore,
} from "./pinia";
import { ref } from "vue";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const useGetMovies = () => {
  const loaderStore = useLoaderStore();
  loaderStore.loader = true;
  const store = useMoviesStore();
  const docSnapshot = ref<any>([]);
  getDocs(collection(db, "movies"))
    .then((doc) => {
      doc.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        docSnapshot.value.push({ ...doc.data(), id: doc.id });
      });
      store.movies = docSnapshot.value;
      store.moviesSort = docSnapshot.value;
    })
    .then(() => {
      loaderStore.loader = false;
    });
};
const useGetMovieDetail = async (id: any) => {
  const loaderStore = useLoaderStore();
  loaderStore.loader = true;
  const store = useMoviesDetailStore();
  const map = new Map();
  const querySnapshot = await getDocs(collection(db, "movies"));
  const docSnapshot = ref<any>([]);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    docSnapshot.value.push({ ...doc.data(), id: doc.id });
    map.set(doc.id, { ...doc.data(), id: doc.id });
  });
  store.movieDetail = map.get(id);
  loaderStore.loader = false;
};
const useUpdateMovie = (movie: any, comment: string) => {
  const userStore = useUserStore();
  const docRef = doc(db, "movies", movie.id);
  movie.comments.unshift({
    name: userStore.user?.name,
    avatar: userStore.user?.avatar,
    date:
      new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString(),
    comment,
  });
  const data = ref<any>({
    comments: movie.comments,
  });

  updateDoc(docRef, data.value)
    .then(() => {
      console.log(
        "A New Document Field has been added to an existing document"
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
const useGetUsers = async () => {
  const loaderStore = useLoaderStore();
  const querySnapshot = await getDocs(collection(db, "users"));
  const store = useUserStore();

  // ID from local storage
  const idUser = JSON.parse(localStorage.getItem("idUser") || "");
  querySnapshot.forEach((doc) => {
    const docSnapshot = ref<any>({ ...doc.data(), id: doc.id });
    store.users.push(docSnapshot.value);

    if (doc.id === idUser) {
      store.user = docSnapshot.value;
    }
  });
  loaderStore.loader = false;
};
const useAddUser = (user: any) => {
  const dbRef = collection(db, "users");
  const loaderStore = useLoaderStore();
  loaderStore.loader = true;
  const data = {
    name: user.name,
    email: user.email,
    favourites: [],
    bio: "This is a bio.",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/jcmoviee.appspot.com/o/lamhiennghia%20(1).png?alt=media&token=d25f8b26-9fcf-4688-9a5e-d554883dead9&_gl=1*1yk1l5f*_ga*MTg3MDczNTI2NS4xNjg1NTA5OTY0*_ga_CW55HF8NVT*MTY5NTk5MzMyMC4zNy4xLjE2OTU5OTMzNzkuMS4wLjA",
    watched: [],
    watchings: [],
  };
  addDoc(dbRef, data)
    .then((docRef) => {
      localStorage.setItem("idUser", JSON.stringify(docRef.id));
      console.log("Document has been added successfully");
      loaderStore.loader = false;
    })
    .catch((error) => {
      console.log(error);
    });
};
const useUpdateUser = (movie: any) => {
  const store = useUserStore();
  const idUser = JSON.parse(localStorage.getItem("idUser") || "");
  const docRef = doc(db, "users", idUser);
  const data = ref<any>("");

  if (movie.type === "favourite") {
    store.user?.favourites.push(movie.movies);
    data.value = {
      favourites: store.user?.favourites,
    };
  } else if (movie.type === "unfavourite") {
    const indexOfMovie = ref<any>("");
    store.user?.favourites.forEach((favourite: any, index: number) => {
      if (favourite.id === movie.movies.id) {
        indexOfMovie.value = index;
      }
    });
    store.user?.favourites.splice(indexOfMovie.value, 1);
    data.value = {
      favourites: store.user?.favourites,
    };
  } else if (movie.type === "watching") {
    // IF NONE MOVIES => PUSH STRAIGHT TO STORE
    if (store.user?.watchings.length === 0) {
      store.user?.watchings.push(movie.movies);
    }
    // CHECK
    const checkHasWatching = store.user?.watchings
      .map((watching: any) => {
        return watching.id;
      })
      .indexOf(movie.movies.id);
    if (checkHasWatching === -1) {
      store.user?.watchings.push(movie.movies);
    }
    data.value = {
      watchings: store.user?.watchings,
    };
  } else if (movie.type === "watched") {
    store.user?.watched.push(movie.movies);
    data.value = {
      watched: store.user?.watched,
    };
  }

  updateDoc(docRef, data.value)
    .then(() => {
      console.log(
        "A New Document Field has been added to an existing document"
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
const useGetNews = async () => {
  const querySnapshot = await getDocs(collection(db, "news"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};
const useCreateUser = (user: any) => {
  const loaderStore = useLoaderStore();
  loaderStore.loader = true;
  createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(() => {
      // Signed up and add user to the database
      useAddUser(user);
      console.log(" => ", "Created");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
};
const useLogInUser = (user: any) => {
  const usersStore = useUserStore();
  const loaderStore = useLoaderStore();
  loaderStore.loader = true;
  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      const user = userCredential.user;
      usersStore.users?.forEach((userStore) => {
        if (userStore.email === user.email) {
          localStorage.setItem("idUser", JSON.stringify(userStore.id));
          usersStore.user = userStore;
        }
      });
    })
    .then(() => {
      useGetUsers();
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};
const useLogInAnonymous = () => {
  signInAnonymously(auth)
    .then(() => {
      // Signed in..
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
};
const useUpdatePassword = (newPassword: any) => {
  const user = auth.currentUser;
  if (user !== null) {
    updatePassword(user, newPassword)
      .then(() => {
        // Update successful.
      })
      .catch((error) => {
        console.log(error);
        // An error ocurred
        // ...
      });
  }
};
const useLogOutUser = () => {
  signOut(auth)
    .then(() => {
      localStorage.setItem("idUser", JSON.stringify(""));

      // Sign-out successful.
      console.log("Sign-out successful");
    })
    .catch((error) => {
      // An error happened.
      console.log(error.message);
    });
};
const useDeleteOldAvatar = (avatar: any) => {
  // Create a reference to the file to delete
  const desertRef = storageRef(storage, `avatars/${avatar.fileName}`);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      console.log("Deleted file " + avatar.fileName);
      // File deleted successfully
    })
    .catch((error) => {
      console.log(error.message);
      // Uh-oh, an error occurred!
    });
};
const useUpdateAvatar = (updateUser: any) => {
  const loaderStore = useLoaderStore();
  loaderStore.loader = true;
  const storeUser = useUserStore();
  const idUser = JSON.parse(localStorage.getItem("idUser") || "");
  const docRef = doc(db, "users", idUser);
  if (updateUser.file !== undefined) {
    if (updateUser.fileName !== "") {
      useDeleteOldAvatar({ fileName: storeUser.user?.avatarName });
    }
    const avatarRef = storageRef(storage, `avatars/${updateUser.fileName}`);
    uploadBytes(avatarRef, updateUser.file).then((snapshot) => {
      console.log("Uploaded a blob or file!");

      const avatarRef = storageRef(storage, snapshot.metadata.fullPath);

      // Get the download URL
      getDownloadURL(avatarRef).then((url) => {
        // Insert url into an <img> tag to "download"
        const data = ref({
          avatar: url,
          name: updateUser.name,
          bio: updateUser.bio,
          avatarName: updateUser.fileName,
        });
        updateDoc(docRef, data.value)
          .then(() => {
            console.log(
              "A New Document Field has been added to an existing document"
            );
            useGetUsers();
            // loaderStore.loader = false;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  } else {
    const data = ref({
      name: updateUser.name,
      bio: updateUser.bio,
    });
    updateDoc(docRef, data.value)
      .then(() => {
        console.log(
          "A New Document Field has been added to an existing document"
        );
        useGetUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
export {
  useGetMovies,
  useUpdateAvatar,
  // useUpdateMovie,
  useGetUsers,
  useGetNews,
  useCreateUser,
  useLogInUser,
  useLogInAnonymous,
  useLogOutUser,
  useGetMovieDetail,
  useUpdateUser,
  useUpdateMovie,
  useAddUser,
  useUpdatePassword,
};
