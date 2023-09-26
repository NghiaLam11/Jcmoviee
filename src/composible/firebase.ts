import { auth, db } from "../firebase";
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
        console.log(doc.id, " => ", { ...doc.data(), id: doc.id });
      });
      store.movies = docSnapshot.value;
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
    console.log(doc.id, id, " => ", { ...doc.data(), id: doc.id });
  });
  store.movieDetail = map.get(id);
  loaderStore.loader = false;
};
// const useUpdateMovie = (movie: any) => {
//   const idUser = JSON.parse(localStorage.getItem("idUser") || "");
//   const docRef = doc(db, "movies", movie.movies.id);
//   const data = ref<any>("");

//   if (movie.type === "favourite") {
//     movie.movies?.userFavourite.push(idUser);
//     data.value = {
//       userFavourite: movie.movies?.userFavourite,
//     };
//   } else if (movie.type === "unfavourite") {
//     const indexOfMovie = ref<any>("");
//     movie.movies?.userFavourite.indexOf(idUser);
//     movie.movies?.userFavourite.splice(indexOfMovie.value, 1);
//     data.value = {
//       userFavourite: movie.movies?.userFavourite,
//     };
//   }

//   updateDoc(docRef, data.value)
//     .then(() => {
//       console.log(
//         "A New Document Field has been added to an existing document"
//       );
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
const useGetUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  // console.log(querySnapshot.docs)
  const store = useUserStore();
  // ID from local storage
  const idUser = JSON.parse(localStorage.getItem("idUser") || "");
  querySnapshot.forEach((doc) => {
    if (doc.id === idUser) {
      const docSnapshot = ref<any>({ ...doc.data(), id: doc.id });
      store.user = docSnapshot.value;
    }
  });
};
const useAddUser = (user: any) => {
  const dbRef = collection(db, "users");
  const data = {
    name: "JcAuthor",
    email: user.email,
    favourites: [],
    bio: "English",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/jcmoviee.appspot.com/o/lion.png?alt=media&token=592f82a0-6474-493b-a081-5858e6a98667",
    watched: [],
    watchings: [],
  };
  addDoc(dbRef, data)
    .then((docRef) => {
      localStorage.setItem("idUser", JSON.stringify(docRef.id));
      console.log(docRef.id, "Document has been added successfully");
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

  console.log("000");

  if (movie.type === "favourite") {
    store.user?.favourites.push(movie.movies);
    data.value = {
      favourites: store.user?.favourites,
    };
  } else if (movie.type === "unfavourite") {
    console.log("1111");
    const indexOfMovie = ref<any>("");
    store.user?.favourites.forEach((favourite: any, index: number) => {
      if (favourite.id === movie.movies.id) {
        indexOfMovie.value = index;
      }
    });
    console.log(indexOfMovie.value, "indexOfMovie");
    store.user?.favourites.splice(indexOfMovie.value, 1);
    console.log(store.user?.favourites, "favourites");
    data.value = {
      favourites: store.user?.favourites,
    };
  } else if (movie.type === "watching") {
    store.user?.watchings.forEach((watching: any) => {
      if (watching.id !== movie.movies.id) {
        store.user?.watchings.push(movie.movies);
      }
    });

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
    .then((docRef) => {
      console.log(
        "A New Document Field has been added to an existing document",
        docRef
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
  createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(() => {
      // Signed up and add user to the database
      useAddUser(user);
      console.log(user, " => ", "Created");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
};
const useLogInUser = (user: any) => {
  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
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
      // Sign-out successful.
      console.log("Sign-out successful");
    })
    .catch((error) => {
      // An error happened.
      console.log(error.message);
    });
};

export {
  useGetMovies,
  // useUpdateMovie,
  useGetUsers,
  useGetNews,
  useCreateUser,
  useLogInUser,
  useLogInAnonymous,
  useLogOutUser,
  useGetMovieDetail,
  useUpdateUser,
  useAddUser,
  useUpdatePassword,
};
