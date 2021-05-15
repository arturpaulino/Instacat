import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';



export const isLogged = async () => {
  const userAuth = await AsyncStorage.getItem('userAuth');
  
  console.log('isLogged ', userAuth)
  return userAuth !== null;
};

export const setUserAuth = async (uid) => {
  await AsyncStorage.setItem('userAuth', uid);
};

export const getUserAuth = async () => {
  const userAuth = await AsyncStorage.getItem('userAuth');
  return userAuth;
}

export const cleanUserAuth = async () => {
  await AsyncStorage.removeItem('userAuth');
  await auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

export const updateUser = async (data) => {
  const { id, email, password, name, imageProfile } = data
  // console.log('data singUp', data)

  if (id == undefined || id.toString() === "") {

    throw new Error("Id do usuario invalida.")
  }

  try {
    await firestore()
      .collection('users')
      .doc(id)
      .update({
        name,
        img: imageProfile.uri,
      })
    const userdata =
    {
      id,
      name,
      email,
      img: imageProfile.uri,
    }

    if ((password != undefined) && (password.toString() === "")) {
      const user = await auth().currentUser;
      console.log('user id', user, password)

      user.updatePassword(password).then(function () {
        // Update successful.
      }).catch(function (error) {
        console.log(error)
        throw new Error("Erro em trocar a senha.")
      })
    }

    return { registerSuccess: true, user: userdata }

  } catch (e) {
    await cleanUserAuth()
    Alert.alert('Erro ao Criar um usuário', e.message);
    return { registerSuccess: false, user: [] }
  }
}


export const singUp = async (data) => {
  const { email, password, name, imageProfile } = data
  console.log('data singUp', data)

  try {
    const userInfos = await auth().createUserWithEmailAndPassword(
      email,
      password,
    )
    userdata =
    {
      id: userInfos.user.uid,
      name: name,
      email: email,
      img: imageProfile.uri
    }

    await firestore()
      .collection('users')
      .doc(userInfos.user.uid)
      .set({
        name,
        img: imageProfile.uri,
      })

    setUserAuth(userInfos.user.uid);
    return { registerSuccess: true, user: userdata }
  } catch (e) {
    await cleanUserAuth()
    Alert.alert('Erro ao Criar um usuário', e.message);
    return { registerSuccess: false, user: [] }
  }
}

export const singIn = async (data) => {
  const { email, password } = data;
  let userdata = [];

  try {
    const userInfos = await auth().signInWithEmailAndPassword(
      email,
      password,
    )

    setUserAuth(userInfos.user.uid);
    const snapshot = await firestore().collection('users').get();

    snapshot.forEach(doc => {
      userdata =
      {
        id: userInfos.user.uid,
        name: doc.data().name,
        email: email,
        img: doc.data().img,
      }

    });

    return { loginSuccess: true, user: userdata };
  } catch (e) {
//    const x = await cleanUser()
    console.log('singIn ', e.message)
    return { loginSuccess: false, user: [] }
  }
}

export const sendPassword = async (email) => {
  if (email == null || email.toString() === '') {
    throw Error('Email é um paramentro obrigatorio')
  }
  console.log('emai', email)

  auth().sendPasswordResetEmail(email).then(function () {
    Alert.alert('Email de recuperação de senha enviado com scuesso')
  }).catch(function (error) {
    Alert.alert('Conta não localizada')
  });
}


export const getImgProfile = async (userId) => {
  ('getImgProfile')

  if (userId == null || userId.toString() === '') {
    throw Error('UserID é um paramentro obrigatorio')
  }

  const url = await storage()
    .ref("profile/" + userId + ".png")
    .getDownloadURL();
  console.log('getImgProfile ', url);
  return url;
}
export const salveImgProfile = async (image, userId) => {


  if (userId == null || userId.toString() === '') {
    throw Error('UserID é um paramentro obrigatorio')
  }


  if (image.uri == null || image.uri.toString() === '') {
    throw Error('UserID é um paramentro obrigatorio')
  }

  const reference = storage().ref("profile/" + userId + ".png");
  const task = reference.putFile(image.uri);

  task.on('state_changed', taskSnapshot => {
    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
  });

  task.then(() => {
    console.log('Image uploaded to the bucket!');
  });
}
