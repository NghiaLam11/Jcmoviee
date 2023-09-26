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
const useUpdateMovie = (movie: any, comment: string) => {
  // const idUser = JSON.parse(localStorage.getItem("idUser") || "");
  // const movieDetailStore = useMoviesDetailStore();
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
    // .then(() => {
    //   useGetMovieDetail(movie.id);
    // })
    .catch((error) => {
      console.log(error);
    });
};
const useGetUsers = async () => {
  console.log("USE GET USER");
  const loaderStore = useLoaderStore();
  const querySnapshot = await getDocs(collection(db, "users"));
  // console.log(querySnapshot.docs)
  const store = useUserStore();

  // ID from local storage
  const idUser = JSON.parse(localStorage.getItem("idUser") || "");
  querySnapshot.forEach((doc) => {
    const docSnapshot = ref<any>({ ...doc.data(), id: doc.id });
    store.users.push(docSnapshot.value);
    console.log("AAAAAAAAAAAAAAAAAA");

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
    console.log("CCCCCCCCCc");
    if (store.user?.watchings.length === 0) {
      store.user?.watchings.push(movie.movies);
    }
    store.user?.watchings.forEach((watching: any) => {
      if (watching.id !== movie.movies.id) {
        store.user?.watchings.push(movie.movies);
        console.log("BBBBBBBBBB");
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
  const loaderStore = useLoaderStore();
  loaderStore.loader = true;
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
  const usersStore = useUserStore();
  const loaderStore = useLoaderStore();
  loaderStore.loader = true;
  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user, "USERRR");
      console.log(usersStore.users, "USERSSS");
      usersStore.users?.forEach((userStore) => {
        if (userStore.email === user.email) {
          localStorage.setItem("idUser", JSON.stringify(userStore.id));
          usersStore.user = userStore;
          console.log(userStore, "USERSTORE");
          console.log(
            JSON.parse(localStorage.getItem("idUser") || ""),
            "EMPTY"
          );
        }
      });
      // Signed in

      // ...
    })
    .then(() => {
      useGetUsers();
      console.log(usersStore.user, "CHANGE USER STORE");
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
  useUpdateMovie,
  useAddUser,
  useUpdatePassword,
};
