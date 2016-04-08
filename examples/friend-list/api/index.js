import friends from './friends';

// mock api search
export default function search(query, callback) {
  const results = friends.filter(friend => {
    let keep = false;

    Object.keys(friend).forEach(key => {
      const val = friend[key].toString();

      if (val.toLowerCase().includes(query.toLowerCase())) {
        keep = true;
      }
    });

    return keep;
  });

  // setting a more realistic (random) timeout
  setTimeout(() => {
    // ~ 1 in 5 requests should fail
    const error = Math.floor(Math.random() * 5) === 1;

    if (error) {
      callback({ message: `Request for '${query}' failed.` });
    } else {
      callback(false, results);
    }
  }, Math.floor(Math.random() * 250));
}
