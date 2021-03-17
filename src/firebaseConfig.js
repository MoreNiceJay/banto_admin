import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCp1W_SX3O3or111PAjhmzKAM-CQzsXC6I",
  authDomain: "banto-partners.firebaseapp.com",
  databaseURL: "https://banto-partners.firebaseio.com",
  projectId: "banto-partners",
  storageBucket: "banto-partners.appspot.com",
  messagingSenderId: "925365863671",
  appId: "1:925365863671:web:71ff10bb56658f1bf07ff2",
  measurementId: "G-JWN30XVQT4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;

const google_provider = new firebase.auth.GoogleAuthProvider();
const fb_provider = new firebase.auth.FacebookAuthProvider();
const twitter_provider = new firebase.auth.TwitterAuthProvider();
const github_provider = new firebase.auth.GithubAuthProvider();

export { google_provider, fb_provider, twitter_provider, github_provider };
